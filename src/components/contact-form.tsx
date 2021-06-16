import { useRouter } from 'next/router';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';

import { Input } from './form-elements/input';
import { Textarea } from './form-elements/textarea';

interface FormData {
  full_name: string;
  email_address: string;
  subject: string;
  message: string;
}

function ContactForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onBlur', reValidateMode: 'onChange' });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const router = useRouter();

  const onSubmit = async (data: FormData, event: React.SyntheticEvent) => {
    event.preventDefault();

    setIsSubmitting(true);

    const { email_address, full_name, message, subject } = data;

    fetch('/api/post-contact-form', {
      method: 'POST',
      body: JSON.stringify({
        email_address,
        full_name,
        message,
        subject,
      }),
    })
      .then(() => router.push('/success'))
      // eslint-disable-next-line no-console
      .catch((error) => console.error(error))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid max-w-xl gap-4 mt-8"
    >
      <Input
        label="Full Name"
        {...register('full_name', { required: true })}
        errors={errors}
      />
      <Input
        label="Email Address"
        type="email"
        {...register('email_address', { required: true })}
        errors={errors}
      />
      <Input
        label="Subject"
        {...register('subject', { required: true })}
        errors={errors}
      />
      <Textarea
        label="Message"
        {...register('message', { required: true })}
        errors={errors}
      />
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`inline-flex items-center justify-center space-x-3 cta${
            isSubmitting ? ' opacity-75' : ''
          }`}
        >
          <span>Submit</span>
          {isSubmitting && (
            <FaSpinner className="w-6 opacity-50 h-7 animate-spin" />
          )}
        </button>
      </div>
    </form>
  );
}

export { ContactForm };
