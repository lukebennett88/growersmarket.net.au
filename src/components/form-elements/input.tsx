import * as React from 'react';

import { Error } from './error';

interface IInput {
  className?: string;
  errors?: any;
  label: string;
  name: string;
  placeholder?: string;
  register: any;
  required?: boolean;
  type?: string;
}

/**
 * Reusable HTML input component
 * @param className Forwards to the className prop on the input element
 * @param errors Object containing any errors in the form
 * @param label Label for the input
 * @param name Used for both the `id` and `name` of the input
 * @param placeholder Placeholder text for the input, falls back to label if not provided
 * @param register The register function from `react-hook-form`
 * @param required Boolean for if field is required. Set to true by default
 * @param type Input type. Defaults to 'text'
 */

function Input({
  className,
  errors,
  label,
  name,
  placeholder,
  register,
  required = true,
  type = 'text',
}: IInput) {
  const MIN_LENGTH = type === 'tel' ? 8 : 2;
  return (
    <div>
      <label htmlFor={name}>
        <span className="sr-only">
          {label}
          {required && ' *'}
        </span>
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder || label}
          required={required}
          aria-invalid={!!errors?.[name]}
          ref={register({
            required: required && (
              <Error message={`${label} is a required field`} />
            ),
            minLength: {
              value: MIN_LENGTH,
              message: (
                <Error
                  message={`${label} must be at least ${MIN_LENGTH} characters`}
                />
              ),
            },
          })}
          className={className}
        />
      </label>
      {errors[name]?.message}
    </div>
  );
}

export { Input };
