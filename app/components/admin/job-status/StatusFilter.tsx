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
  return (
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
          className={`relative px-4 py-3 rounded-lg font-semibold transition text-sm whitespace-nowrap flex-shrink-0 flex items-center gap-2 mt-3 ${
            value === ''
              ? 'text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          style={{
            backgroundColor: value === '' ? '#4B5368' : undefined,
          }}
        >
          All
          {counts && (
            <span className="absolute -top-3 -left-2 text-xs font-bold px-2 py-0.5 rounded-full bg-pink-500 text-white shadow-md">
              {Object.values(counts).reduce((a, b) => a + b, 0)}
            </span>
          )}
        </button>
      )}

      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`relative px-4 py-3 rounded-lg font-semibold transition text-sm whitespace-nowrap flex-shrink-0 flex items-center gap-2 mt-3 ${
            value === option.value
              ? 'text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          style={{
            backgroundColor: value === option.value ? '#4B5368' : undefined,
          }}
        >
          {option.label}
          {counts && counts[option.value] !== undefined && (
            <span className="absolute -top-3 -left-2 text-xs font-bold px-2 py-0.5 rounded-full bg-pink-500 text-white shadow-md">
              {counts[option.value]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
