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
}

export function StatusFilter({
  value,
  onChange,
  options,
  includeAllOption = true,
}: StatusFilterProps) {
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
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
          className={`px-4 py-3 rounded-lg font-semibold transition text-sm whitespace-nowrap flex-shrink-0 ${
            value === ''
              ? 'text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          style={{
            backgroundColor: value === '' ? '#4B5368' : undefined,
          }}
        >
          All
        </button>
      )}

      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-4 py-3 rounded-lg font-semibold transition text-sm whitespace-nowrap flex-shrink-0 ${
            value === option.value
              ? 'text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          style={{
            backgroundColor: value === option.value ? '#4B5368' : undefined,
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
