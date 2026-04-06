'use client';

interface StatusOption {
  value: string;
  label: string;
}

interface StatusSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: StatusOption[];
  includeAllOption?: boolean;
  label?: string;
}

export function StatusSelector({
  value,
  onChange,
  options,
  includeAllOption = true,
  label = 'Status',
}: StatusSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
        style={{ borderColor: '#4B5368' }}
      >
        {includeAllOption && <option value="">All</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
