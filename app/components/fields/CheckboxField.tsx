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
              className="flex items-center justify-between border border-gray-200 rounded-lg p-2"
            >
              <div className="flex items-center gap-3 flex-1">
                {option.icon && (
                  <div className="flex-shrink-0">
                    <img
                      src={option.icon}
                      alt={String(option.label)}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </div>
                )}
                <div>
                  <h4 className="text-gray-900 font-medium">{option.label}</h4>
                  {option.price && <p className="text-[#48546A] font-semibold">£{option.price}</p>}
                  {showTime && option.time && <p className="text-sm text-gray-500 mt-1">{option.time} minutes</p>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDecrement(String(option.value))}
                  disabled={count === 0}
                  className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  −
                </button>
                <span className="w-6 text-center text-lg font-semibold text-gray-900">{count}</span>
                <button
                  onClick={() => handleIncrement(String(option.value))}
                  className="w-8 h-8 flex items-center justify-center rounded-md bg-slate-100 hover:bg-slate-200 text-[#48546A]"
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
