'use client';

import { useState } from 'react';
import Image from 'next/image';

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
    <>
      <style>{`
        @keyframes pulse-ring {
          0% {
            box-shadow: 0 0 0 0 rgba(72, 84, 106, 0.7);
          }
          70% {
            box-shadow: 0 0 0 8px rgba(72, 84, 106, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(72, 84, 106, 0);
          }
        }
        .animate-pulse-ring {
          animation: pulse-ring 2s infinite;
        }
      `}</style>
      <fieldset className="w-full border-0">
        <legend className="block text-sm font-poppins text-gray-900 mb-4 font-medium">{label}</legend>
        <div className="space-y-4">
          {options.map((option) => {
            const count = value[String(option.value)] || 0;
            return (
              <div
                key={option.value}
                className="flex items-center justify-between border border-gray-300 rounded-lg p-5 sm:p-6 gap-4 transition"
              >
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="flex flex-col items-start gap-2 flex-shrink-0">
                    {option.icon && (
                      <div 
                        className="flex-shrink-0 relative cursor-pointer hover:opacity-75 transition-opacity"
                        onClick={() => option.description && setSelectedModal(String(option.value))}
                        title="Click for more information"
                      >
                        <Image
                          src={option.icon}
                          alt={String(option.label)}
                          width={56}
                          height={56}
                          className="w-12 h-12 sm:w-12 sm:h-12 object-cover rounded"
                          sizes="(max-width: 640px) 48px, 48px"
                        />
                        {option.description && (
                          <div className="absolute -top-1 -left-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold leading-none animate-pulse-ring">
                            ?
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <h4 className="text-base sm:text-base text-gray-900 font-poppins font-light break-words">{option.label}</h4>
                    {option.helpText && <p className="text-xs sm:text-xs text-gray-600 break-words font-inter font-normal">{option.helpText}</p>}
                    {showTime && option.time && <p className="text-xs sm:text-xs text-gray-500 font-inter font-normal">{option.time} min</p>}
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <button
                    onClick={() => handleDecrement(String(option.value))}
                    disabled={count === 0}
                    className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center rounded-md bg-gray-50 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
                  >
                    −
                  </button>
                  <span className="w-10 h-10 flex items-center justify-center font-semibold text-base text-primary">{count}</span>
                  <button
                    onClick={() => handleIncrement(String(option.value))}
                    className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center rounded-md bg-gray-50 hover:bg-gray-100 transition text-sm font-semibold"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </fieldset>

      {/* Modal */}
      {selectedModal && (
        <div className="fixed inset-0 flex items-end z-[9999] justify-center">
          <div className="bg-white w-full max-w-2xl h-screen rounded-t-lg p-8 animate-slideup overflow-y-auto">
            {options
              .filter((opt) => String(opt.value) === selectedModal)
              .map((option) => (
                <div key={option.value}>
                  <div className="flex items-start gap-6 mb-6">
                    {option.icon && (
                      <img
                        src={option.icon}
                        alt={String(option.label)}
                        className="w-24 h-24 object-cover rounded flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl sm:text-2xl font-poppins font-light text-gray-900 mb-2">{option.label}</h3>
                      {option.price && <div className="inline-block bg-primary text-white px-3 py-2 rounded-lg"><p className="text-lg sm:text-xl font-semibold">£{option.price.toFixed(2)}</p></div>}
                    </div>
                  </div>
                  <p className="body-text mb-8 leading-relaxed whitespace-pre-wrap">
                    {option.description}
                  </p>
                  <button
                    onClick={() => setSelectedModal(null)}
                    className="w-full btn-primary"
                  >
                    Close
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
