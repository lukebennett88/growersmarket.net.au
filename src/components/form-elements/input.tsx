import * as React from 'react';
import { DeepMap, FieldError } from 'react-hook-form';

import { ErrorMessage } from './error-message';

interface InputProps {
  errors: DeepMap<Record<string, unknown>, FieldError>;
  label: string;
  name: string;
  type?: 'email' | 'number' | 'password' | 'search' | 'tel';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ errors, label, name, type = 'text' }, ref) => {
    const hasErrors = Boolean(errors?.[name]);
    return (
      <div>
        <label htmlFor={name} className="block">
          <span className="text-sm font-semibold tracking-wider uppercase">
            {label}
          </span>
          <input
            id={name}
            name={name}
            type={type}
            ref={ref}
            aria-invalid={hasErrors}
            className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus-within:ring-opacity-50"
          />
        </label>
        <ErrorMessage errors={errors} name={name} label={label} />
      </div>
    );
  }
);

export { Input };
