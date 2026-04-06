'use client';

import { useState } from 'react';

interface OptionsCounterFieldProps {
  label: string;
  options: Array<{ label: string; value: string | number; time?: number; icon?: string; price?: number; description?: string; helpText?: string }>;
  value: Record<string, number>;
  onChange: (value: Record<string, number>) => void;
  showTime?: boolean;
}

export default function OptionsCounterField({
  label,
  options,
  value,
  onChange,
  showTime = true,
}: OptionsCounterFieldProps) {
  const [selectedModal, setSelectedModal] = useState<string | null>(null);

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
              className="flex items-center justify-between border border-gray-200 rounded-lg p-4 gap-3"
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="flex flex-col items-start gap-2 flex-shrink-0">
                  {option.icon && (
                    <div className="flex-shrink-0">
                      <img
                        src={option.icon}
                        alt={String(option.label)}
                        className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded"
                      />
                    </div>
                  )}
                  {option.description && (
                    <button
                      onClick={() => setSelectedModal(String(option.value))}
                      className="px-2 py-1 text-xs font-semibold rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 cursor-pointer"
                      title="More info"
                    >
                      More Info
                    </button>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-base sm:text-base text-gray-900 font-medium">{option.label}</h4>
                  {option.helpText && <p className="text-xs sm:text-xs text-gray-600">{option.helpText}</p>}
                  {showTime && option.time && <p className="text-sm sm:text-sm text-gray-500">{option.time} min</p>}
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
                <span className="w-8 h-8 flex items-center justify-center font-semibold text-base">{count}</span>
                <button
                  onClick={() => handleIncrement(String(option.value))}
                  className="w-8 h-8 sm:w-8 sm:h-8 flex items-center justify-center rounded-md hover:bg-gray-100 text-sm font-semibold"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
          <div className="bg-white w-full h-screen rounded-t-lg p-8 animate-slideup overflow-y-auto">
            {options
              .filter((opt) => String(opt.value) === selectedModal)
              .map((option) => (
                <div key={option.value}>
                  <div className="flex items-start gap-6 mb-6">
                    {option.icon && (
                      <img
                        src={option.icon}
                        alt={String(option.label)}
                        className="w-20 h-20 object-cover rounded flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{option.label}</h3>
                      {option.price && <p className="text-xl font-semibold text-[#48546A]">£{option.price}</p>}
                    </div>
                  </div>
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed whitespace-pre-wrap">
                    {option.description}
                  </p>
                  <button
                    onClick={() => setSelectedModal(null)}
                    className="w-full bg-[#48546A] text-white py-3 rounded-lg font-medium text-lg"
                  >
                    Close
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
