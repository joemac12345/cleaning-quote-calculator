'use client';

interface CheckboxFieldProps {
  label: string;
  options: Array<{ label: string; value: string | number }>;
  value: (string | number)[];
  onChange: (value: (string | number)[]) => void;
}

export default function CheckboxField({
  label,
  options,
  value,
  onChange,
}: CheckboxFieldProps) {
  const handleChange = (optionValue: string | number, checked: boolean) => {
    if (checked) {
      onChange([...value, optionValue]);
    } else {
      onChange(value.filter((v) => v !== optionValue));
    }
  };

  return (
    <div>
      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
          >
            <input
              type="checkbox"
              checked={value.includes(option.value)}
              onChange={(e) => handleChange(option.value, e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-[#48546A] cursor-pointer"
            />
            <span className="text-gray-900 font-medium">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
