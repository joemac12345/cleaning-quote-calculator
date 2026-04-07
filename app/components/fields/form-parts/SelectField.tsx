'use client';

interface SelectFieldProps {
  label: string;
  options: Array<{ label: string; value: string | number; icon?: string }>;
  value: string;
  onChange: (value: string) => void;
}

export default function SelectField({
  label,
  options,
  value,
  onChange,
}: SelectFieldProps) {
  return (
    <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#48546A] focus:border-transparent"
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
  );
}
