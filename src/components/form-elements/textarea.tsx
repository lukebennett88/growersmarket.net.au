import * as React from 'react';
import { DeepMap, FieldError } from 'react-hook-form';

import { ErrorMessage } from './error-message';

type TextareaProps = {
  errors: DeepMap<Record<string, unknown>, FieldError>;
  label: string;
  name: string;
  required?: boolean;
  rows?: number;
  props?: unknown[];
} & (
  | { description: string; descriptionId: string }
  | { description?: never; descriptionId?: never }
);

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      description,
      descriptionId,
      errors,
      label,
      name,
      required,
      rows = 4,
      ...props
    },
    ref
  ) => (
    <div>
      <div className="flex justify-between">
        <label htmlFor={name} className="sr-only">
          {label}
        </label>
        {description ? (
          <span id={descriptionId} className="text-sm text-gray-500">
            {description}
          </span>
        ) : null}
      </div>
      <div className="mt-1">
        <textarea
          aria-describedby={description ? descriptionId : undefined}
          ref={ref}
          id={name}
          name={name}
          placeholder={label}
          rows={rows}
          required={required}
          className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus-within:ring-opacity-50"
          {...props}
        />
      </div>
      <ErrorMessage errors={errors} name={name} label={label} />
    </div>
  )
);

export { Textarea };
