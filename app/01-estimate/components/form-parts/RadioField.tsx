'use client';

import Image from 'next/image';

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
    <fieldset className="w-full">
      <legend className="block text-sm font-poppins text-gray-900 mb-3 font-medium">{label}</legend>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {options.map((option) => {
          const isSelected = String(value) === String(option.value);
          return (
            <label
              key={option.value}
              className={`flex flex-col items-center gap-3 p-4 sm:p-6 border rounded-lg cursor-pointer transition relative ${
                isSelected
                  ? 'border-primary bg-slate-50'
                  : 'border-gray-300 bg-white hover:border-primary'
              }`}
            >
              {/* Radio button - top left */}
              <input
                type="radio"
                checked={isSelected}
                onChange={() => onChange(String(option.value))}
                className="absolute top-2 left-2 sm:top-3 sm:left-3 w-5 h-5 text-primary accent-primary cursor-pointer"
              />

              {/* Icon - centered */}
              {option.icon && (
                <Image
                  src={option.icon}
                  alt={String(option.label)}
                  width={112}
                  height={112}
                  className="w-20 h-20 sm:w-28 sm:h-28 object-contain"
                  sizes="(max-width: 640px) 80px, 112px"
                />
              )}

              {/* Text - below icon */}
              <div className="text-center">
                <p className="text-sm sm:text-base font-poppins font-light text-gray-900">{option.label}</p>
                {showTime && option.time && option.time > 0 && <p className="text-xs sm:text-sm mt-1 font-inter font-normal text-gray-600">{option.time} min</p>}
              </div>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
