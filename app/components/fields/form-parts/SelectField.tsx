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
    <div className="w-full">
      <label className="block text-sm font-poppins text-gray-900 mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 font-inter font-normal focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
