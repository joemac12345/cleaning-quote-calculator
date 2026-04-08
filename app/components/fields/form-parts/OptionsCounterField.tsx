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
            box-shadow: 0 0 0 0 rgba(236, 72, 153, 0.7);
          }
          70% {
            box-shadow: 0 0 0 8px rgba(236, 72, 153, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(236, 72, 153, 0);
          }
        }
        .animate-pulse-ring {
          animation: pulse-ring 2s infinite;
        }
      `}</style>
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
                      <div 
                        className="flex-shrink-0 relative cursor-pointer hover:opacity-75 transition-opacity"
                        onClick={() => option.description && setSelectedModal(String(option.value))}
                        title="Click for more information"
                      >
                        <Image
                          src={option.icon}
                          alt={String(option.label)}
                          width={48}
                          height={48}
                          className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded"
                          sizes="(max-width: 640px) 40px, 48px"
                        />
                        {option.description && (
                          <div className="absolute -top-1 -left-1 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold leading-none animate-pulse-ring">
                            ?
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <h4 className="text-sm sm:text-base text-[#4B5368] font-medium break-words">{option.label}</h4>
                    {option.helpText && <p className="text-xs sm:text-xs text-[#4B5368] break-words">{option.helpText}</p>}
                    {showTime && option.time && <p className="text-sm sm:text-sm text-gray-500">{option.time} min</p>}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleDecrement(String(option.value))}
                    disabled={count === 0}
                    className="w-8 h-8 sm:w-8 sm:h-8 flex items-center justify-center rounded-md bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
                  >
                    −
                  </button>
                  <span className="w-8 h-8 flex items-center justify-center font-semibold text-sm text-[#4B5368]">{count}</span>
                  <button
                    onClick={() => handleIncrement(String(option.value))}
                    className="w-8 h-8 sm:w-8 sm:h-8 flex items-center justify-center rounded-md bg-gray-50 hover:bg-gray-100 text-sm font-semibold"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selectedModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-[9999] justify-center">
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
                      <h3 className="text-xl sm:text-2xl font-bold text-[#4B5368] mb-2">{option.label}</h3>
                      {option.price && <div className="inline-block bg-pink-500 text-white px-3 py-2 rounded-lg"><p className="text-lg sm:text-xl font-semibold">£{option.price.toFixed(2)}</p></div>}
                    </div>
                  </div>
                  <p className="text-base sm:text-lg text-[#4B5368] mb-8 leading-relaxed whitespace-pre-wrap">
                    {option.description}
                  </p>
                  <button
                    onClick={() => setSelectedModal(null)}
                    className="w-full bg-[#48546A] text-white py-3 rounded-lg font-medium text-base sm:text-lg"
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
