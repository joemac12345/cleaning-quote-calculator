'use client';

interface TextFieldProps {
  label: string;
  type?: 'text' | 'email';
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export default function TextField({
  label,
  type = 'text',
  value,
  onChange,
  required,
}: TextFieldProps) {
  return (
    <div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-3 sm:px-4 py-3 sm:py-2 text-base sm:text-sm border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#48546A] focus:border-transparent"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  );
}
