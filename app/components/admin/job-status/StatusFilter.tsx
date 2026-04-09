'use client';

interface StatusOption {
  value: string;
  label: string;
  icon?: string;
}

interface StatusFilterProps {
  value: string;
  onChange: (value: string) => void;
  options: StatusOption[];
  includeAllOption?: boolean;
  counts?: Record<string, number>;
}

export function StatusFilter({
  value,
  onChange,
  options,
  includeAllOption = true,
  counts = {},
}: StatusFilterProps) {
  const totalCount = Object.values(counts).reduce((a, b) => a + b, 0);
  const newCount = counts['new'] || 0;

  return (
    <>
      {/* Notification Bar */}
      {newCount > 0 && (
        <div className="bg-blue-50 border-b border-blue-200 px-6 py-3 mb-4">
          <p className="text-sm font-poppins font-semibold text-primary">
            📬 {newCount} new estimate{newCount !== 1 ? 's' : ''} waiting for review
          </p>
        </div>
      )}

      {/* Status Filter Buttons */}
      <div
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide px-4 py-2"
        style={{
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {includeAllOption && (
          <button
            onClick={() => onChange('')}
            className={`relative px-4 py-3 rounded-lg font-semibold transition text-sm whitespace-nowrap flex-shrink-0 flex items-center justify-center gap-2 mt-3 ${
              value === ''
                ? 'text-white shadow-md bg-primary'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>All</span>
            {counts && totalCount > 0 && (
              <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                value === '' ? 'bg-white text-primary' : 'bg-white bg-opacity-30'
              }`}>
                {totalCount}
              </span>
            )}
          </button>
        )}

        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`relative px-4 py-3 rounded-lg font-semibold transition text-sm whitespace-nowrap flex-shrink-0 flex items-center justify-center gap-2 mt-3 ${
              value === option.value
                ? 'text-white shadow-md bg-primary'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{option.label}</span>
            {counts && counts[option.value] !== undefined && counts[option.value] > 0 && (
              <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                value === option.value ? 'bg-white text-primary' : 'bg-white bg-opacity-30'
              }`}>
                {counts[option.value]}
              </span>
            )}
          </button>
        ))}
      </div>
    </>
  );
}
