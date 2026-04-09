/**
 * Phone Field Component
 * 
 * Purpose:
 * - Specialized input field for phone numbers
 * - Auto-shows numeric keypad on mobile devices
 * - Auto-formats phone numbers as user types (UK format)
 * - HTML validation through type="tel"
 * 
 * Usage:
 * - Use this component for phone number inputs in forms
 * - Always provides phone-specific UX on mobile devices
 */

'use client';

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

interface PhoneFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export default function PhoneField({
  label,
  value,
  onChange,
  required,
}: PhoneFieldProps) {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange(formatted);
  };

  return (
    <div className="w-full flex flex-col">
      <label className="hidden">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </label>
      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={handlePhoneChange}
        required={required}
        className="w-full px-4 py-3 text-base font-inter font-normal border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
        placeholder={label}
      />
    </div>
  );
}
