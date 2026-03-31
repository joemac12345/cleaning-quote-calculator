'use client';

interface RadioFieldProps {
  label: string;
  options: Array<{ label: string; value: string | number; time?: number; icon?: string }>;
  value: string;
  onChange: (value: string) => void;
  showTime?: boolean;
}

export default function RadioField({
  label,
  options,
  value,
  onChange,
  showTime = true,
}: RadioFieldProps) {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3">
        {options.map((option) => {
          const isSelected = String(value) === String(option.value);
          return (
            <label
              key={option.value}
              className={`flex flex-col items-center gap-3 p-4 sm:p-6 border rounded-lg cursor-pointer transition relative ${
                isSelected
                  ? 'border-[#48546A] bg-slate-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              {/* Radio button - top left */}
              <input
                type="radio"
                checked={isSelected}
                onChange={() => onChange(String(option.value))}
                className="absolute top-2 left-2 sm:top-3 sm:left-3 w-5 h-5 text-[#48546A] accent-[#48546A]"
              />

              {/* Icon - centered */}
              {option.icon && (
                <img
                  src={option.icon}
                  alt={String(option.label)}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
                />
              )}

              {/* Text - below icon */}
              <div className="text-center">
                <p className="text-base sm:text-base text-gray-900 font-medium">{option.label}</p>
                {showTime && option.time && <p className="text-sm sm:text-sm text-gray-500 mt-1">{option.time} min</p>}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
