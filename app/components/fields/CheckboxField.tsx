'use client';

interface CheckboxFieldProps {
  label: string;
  options: Array<{ label: string; value: string | number; time?: number; icon?: string; price?: number }>;
  value: Record<string, number>;
  onChange: (value: Record<string, number>) => void;
  showTime?: boolean;
}

export default function CheckboxField({
  label,
  options,
  value,
  onChange,
  showTime = true,
}: CheckboxFieldProps) {
  const handleIncrement = (optionValue: string) => {
    const newValue = { ...value, [optionValue]: (value[optionValue] || 0) + 1 };
    onChange(newValue);
  };

  const handleDecrement = (optionValue: string) => {
    const newValue = { ...value, [optionValue]: Math.max(0, (value[optionValue] || 0) - 1) };
    onChange(newValue);
  };

  return (
    <div>
      <div className="space-y-3">
        {options.map((option) => {
          const count = value[String(option.value)] || 0;
          return (
            <div
              key={option.value}
              className="flex items-start sm:items-center justify-between border border-gray-200 rounded-lg p-4 gap-2"
            >
              <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
                {option.icon && (
                  <div className="flex-shrink-0">
                    <img
                      src={option.icon}
                      alt={String(option.label)}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <h4 className="text-base sm:text-base text-gray-900 font-medium break-words">{option.label}</h4>
                  {option.price && <p className="text-[#48546A] font-semibold text-base sm:text-base">£{option.price}</p>}
                  {showTime && option.time && <p className="text-sm sm:text-sm text-gray-500 mt-1">{option.time} min</p>}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => handleDecrement(String(option.value))}
                  disabled={count === 0}
                  className="w-8 h-8 sm:w-8 sm:h-8 flex items-center justify-center rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
                >
                  −
                </button>
                <span className="w-6 text-center text-lg sm:text-lg font-semibold text-gray-900">{count}</span>
                <button
                  onClick={() => handleIncrement(String(option.value))}
                  className="w-8 h-8 sm:w-8 sm:h-8 flex items-center justify-center rounded-md bg-slate-100 hover:bg-slate-200 text-[#48546A] font-semibold text-sm"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
