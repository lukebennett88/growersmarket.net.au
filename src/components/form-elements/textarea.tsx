/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import { Error } from './error';

interface TextareaProps {
  className?: string;
  errors?: any;
  label: string;
  name: string;
  placeholder?: string;
  register: any;
  required?: boolean;
  rows?: number;
}

/**
 * Reusable HTML input component
 * @param className Forwards to the className prop on the textarea element
 * @param errors Object containing any errors in the form
 * @param label Label for the textarea
 * @param name Used for both the `id` and `name` of the textarea
 * @param placeholder Placeholder text for the textarea, falls back to label if not provided
 * @param register The register function from `react-hook-form`
 * @param required Boolean for if field is required. Set to true by default
 * @param rows Number of rows that the textarea should be
 */

function Textarea({
  className,
  errors,
  label,
  name,
  placeholder,
  register,
  required = true,
  rows = 6,
}: TextareaProps) {
  return (
    <div>
      <label htmlFor={name}>
        <span className="sr-only">
          {label}
          {required && ' *'}
        </span>
        <textarea
          aria-invalid={!!errors?.[name]}
          name={name}
          id={name}
          placeholder={placeholder || label}
          required={required}
          rows={rows}
          ref={register({
            required: <Error message={`${label} is a required field`} />,
          })}
          className={className}
        />
      </label>
      {errors[name]?.message}
    </div>
  );
}

export { Textarea };
