'use client';

import Image from 'next/image';

interface CounterFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  icon?: string;
  helpText?: string;
}

export default function CounterField({
  label,
  value,
  onChange,
  icon,
  helpText,
}: CounterFieldProps) {
  const handleDecrement = () => onChange(Math.max(0, value - 1));
  const handleIncrement = () => onChange(value + 1);

  return (
    <div className="flex items-center justify-between border border-gray-300 rounded-lg p-4 sm:p-5 gap-3 transition">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {icon && (
          <div className="flex-shrink-0">
            <Image
              src={icon}
              alt={label}
              width={80}
              height={80}
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover"
              sizes="(max-width: 640px) 64px, 80px"
            />
          </div>
        )}
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg font-poppins font-light text-gray-900 break-words">{label}</h3>
          {helpText && <p className="text-xs sm:text-sm text-gray-600 mt-2 font-inter font-normal">{helpText}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={handleDecrement}
          disabled={value === 0}
          className="w-8 h-8 sm:w-8 sm:h-8 flex items-center justify-center rounded-md bg-gray-50 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold text-primary"
        >
          −
        </button>
        <span className="w-6 text-center text-lg sm:text-xl font-semibold text-primary">{value}</span>
        <button
          onClick={handleIncrement}
          className="w-8 h-8 sm:w-8 sm:h-8 flex items-center justify-center rounded-md bg-gray-50 hover:bg-gray-100 transition font-semibold text-sm text-primary"
        >
          +
        </button>
      </div>
    </div>
  );
}
