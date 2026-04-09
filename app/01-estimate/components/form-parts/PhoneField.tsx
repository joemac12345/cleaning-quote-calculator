/**
 * Phone Field Component
 * 
 * Purpose:
 * - Specialized input field for phone numbers
 * - Auto-shows numeric keypad on mobile devices
 * - HTML validation through type="tel"
 * 
 * Usage:
 * - Use this component for phone number inputs in forms
 * - Always provides phone-specific UX on mobile devices
 */

'use client';

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
  return (
    <div className="w-full flex flex-col">
      <label className="hidden">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </label>
      <input
        type="tel"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-4 py-3 text-base font-inter font-normal border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
        placeholder={label}
      />
    </div>
  );
}
