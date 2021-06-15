import * as React from 'react';
import { DeepMap, FieldError } from 'react-hook-form';

import { ErrorMessage } from './error-message';

type InputProps = {
  autoComplete?: string;
  errors: DeepMap<Record<string, unknown>, FieldError>;
  label: string;
  name: string;
  required?: boolean;
  type?: 'text' | 'email' | 'number' | 'password' | 'search' | 'tel';
  props?: unknown[];
} & (
  | { description: string; descriptionId: string }
  | { description?: never; descriptionId?: never }
);

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      autoComplete,
      description,
      descriptionId,
      errors,
      label,
      name,
      required,
      type = 'text',
      ...props
    },
    ref
  ) => (
    <div>
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      {description ? (
        <span id={descriptionId} className="text-sm text-gray-500">
          {description}
        </span>
      ) : null}
      <div className="w-full mt-1">
        <input
          aria-describedby={description ? descriptionId : undefined}
          ref={ref}
          id={name}
          name={name}
          placeholder={label}
          type={type}
          required={required}
          autoComplete={autoComplete}
          className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus-within:ring-opacity-50"
          {...props}
        />
      </div>
      <ErrorMessage errors={errors} name={name} label={label} />
    </div>
  )
);

Input.displayName = 'Input';

export { Input };
