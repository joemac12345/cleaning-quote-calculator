import { FormFieldProps } from './types';
import ErrorMessage from './ErrorMessage';

export default function FormField({
  label,
  type,
  value,
  onChange,
  error,
  placeholder,
  disabled = false,
  rows = 3,
  required = false,
}: FormFieldProps) {
  const baseClasses =
    'w-full px-4 py-2 border rounded-lg font-inter text-primary focus:outline-none focus:ring-2 focus:ring-primary transition';
  const errorClasses = error ? 'border-red-500' : 'border-gray-300';

  return (
    <div>
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseClasses} ${errorClasses} resize-none`}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseClasses} ${errorClasses}`}
          placeholder={placeholder}
          disabled={disabled}
        />
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  );
}
