import * as React from 'react';
import { useForm } from 'react-hook-form';

import { Input, Textarea } from '@components/form-elements';

function ContactForm() {
  const { handleSubmit, register, errors } = useForm({ mode: 'onBlur' });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  return (
    <form className="grid gap-4 mt-8">
      <Input
        name="full_name"
        label="Full Name"
        register={register}
        errors={errors}
        className="w-full border-transparent focus:ring-2 focus:ring-blue-500 focus-within:ring-opacity-50"
      />
      <Input
        name="email_address"
        label="Email Address"
        type="email"
        register={register}
        errors={errors}
        className="w-full border-transparent focus:ring-2 focus:ring-blue-500 focus-within:ring-opacity-50"
      />
      <Input
        name="subject"
        label="Subject"
        register={register}
        errors={errors}
        className="w-full border-transparent focus:ring-2 focus:ring-blue-500 focus-within:ring-opacity-50"
      />
      <Textarea
        name="message"
        label="Message"
        register={register}
        errors={errors}
        className="w-full border-transparent focus:ring-2 focus:ring-blue-500 focus-within:ring-opacity-50"
      />
      <div>
        <button type="submit" className="cta">
          Submit
        </button>
      </div>
    </form>
  );
}

export { ContactForm };
