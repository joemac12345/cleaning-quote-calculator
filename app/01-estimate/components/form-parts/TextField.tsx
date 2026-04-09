'use client';

interface TextFieldProps {
  label: string;

  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export default function TextField({
  label,
  value,
  onChange,
  required,
}: TextFieldProps) {
  return (
    <div className="w-full flex flex-col">
      <label className="hidden">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-4 py-3 text-base font-inter font-normal border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  );
}
