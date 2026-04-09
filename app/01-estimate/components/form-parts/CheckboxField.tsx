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
    <fieldset className="w-full border-0">
      <legend className="hidden">{label}</legend>
      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition"
          >
            <input
              type="checkbox"
              checked={value.includes(option.value)}
              onChange={(e) => handleChange(option.value, e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-primary cursor-pointer accent-primary"
            />
            <span className="text-gray-900 font-inter font-normal">{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
