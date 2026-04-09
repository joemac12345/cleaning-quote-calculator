import { FormFieldProps } from './types';
import ErrorMessage from './ErrorMessage';

// Format phone numbers as user types (UK format)
// Removes non-digits and formats: 07123456789 -> 07123 456789
const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  
  if (digits.length === 0) return '';
  if (digits.length <= 4) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  if (digits.length <= 11) return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  
  return digits.slice(0, 11);
};

// Validate email format
const isValidEmail = (email: string): boolean => {
  return /^[^\s@]*@?[^\s@]*$/.test(email) && (email.includes('@') ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) : true);
};

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
    'w-full px-4 py-3 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary transition text-base font-inter font-normal';
  const errorClasses = error ? 'border-error' : 'border-gray-300';

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange(formatted);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

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
      ) : type === 'tel' ? (
        <input
          type="text"
          inputMode="numeric"
          value={value}
          onChange={handlePhoneChange}
          className={`${baseClasses} ${errorClasses}`}
          placeholder={placeholder}
          disabled={disabled}
        />
      ) : type === 'email' ? (
        <input
          type="email"
          value={value}
          onChange={handleEmailChange}
          className={`${baseClasses} ${errorClasses}`}
          placeholder={placeholder}
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
