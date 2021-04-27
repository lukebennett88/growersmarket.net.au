import * as React from 'react';
import { DeepMap, FieldError } from 'react-hook-form';

import { ErrorMessage } from './error-message';

type TextareaProps = {
  name: string;
  label: string;
  rows?: number;
  errors: DeepMap<Record<string, unknown>, FieldError>;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ name, label, rows = 3, errors }, ref) => {
    const hasErrors = Boolean(errors?.[name]);
    return (
      <div>
        <label htmlFor={name} className="block">
          <span className="text-sm font-semibold tracking-wider uppercase">
            {label}
          </span>
          <textarea
            id={name}
            name={name}
            rows={rows}
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

export { Textarea };
