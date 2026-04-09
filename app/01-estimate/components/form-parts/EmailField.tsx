/**
 * Email Field Component
 * 
 * Purpose:
 * - Specialized input field for email addresses
 * - Auto-detects mobile email keyboards (@ symbol visible)
 * - Validates email format through HTML input type="email"
 * 
 * Usage:
 * - Use this component for email inputs in forms
 * - Always provides email-specific UX on mobile devices
 */

'use client';

interface EmailFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export default function EmailField({
  label,
  value,
  onChange,
  required,
}: EmailFieldProps) {
  return (
    <div className="w-full flex flex-col">
      <label className="block text-sm font-poppins text-gray-900 mb-2 font-medium">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </label>
      <input
        type="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-4 py-3 text-base font-inter font-normal border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  );
}
