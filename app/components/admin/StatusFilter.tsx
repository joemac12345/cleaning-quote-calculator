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
    <div className="w-full overflow-x-auto -mx-3 sm:mx-0 px-3 sm:px-0">
      <div className="flex gap-2 pb-2 min-w-min sm:min-w-full sm:flex-wrap">
        {includeAllOption && (
          <button
            onClick={() => onChange('')}
            className={`px-3 sm:px-4 py-3 sm:py-2 rounded-lg font-semibold transition text-sm sm:text-sm whitespace-nowrap flex-shrink-0 ${
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
            className={`px-3 sm:px-4 py-3 sm:py-2 rounded-lg font-semibold transition text-sm sm:text-sm whitespace-nowrap flex-shrink-0 ${
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
    </div>
  );
}
