'use client';

interface CounterFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  icon?: string;
  helpText?: string;
}

export default function CounterField({
  label,
  value,
  onChange,
  icon,
  helpText,
}: CounterFieldProps) {
  const handleDecrement = () => onChange(Math.max(0, value - 1));
  const handleIncrement = () => onChange(value + 1);

  return (
    <div className="flex items-center justify-between border border-gray-200 rounded-lg p-2 gap-1">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {icon && (
          <div className="flex-shrink-0">
            <img
              src={icon}
              alt={label}
              className="w-24 h-24 sm:w-28 sm:h-28 object-cover"
            />
          </div>
        )}
        <div className="min-w-0">
          <h3 className="text-lg sm:text-xl font-medium break-words" style={{ color: '#48546A' }}>{label}</h3>
          {helpText && <p className="text-sm sm:text-sm text-gray-600 mt-2">{helpText}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={handleDecrement}
          disabled={value === 0}
          className="w-8 h-8 sm:w-8 sm:h-8 flex items-center justify-center rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
          style={{ color: '#48546A' }}
        >
          −
        </button>
        <span className="w-6 text-center text-xl sm:text-2xl font-semibold" style={{ color: '#48546A' }}>{value}</span>
        <button
          onClick={handleIncrement}
          className="w-8 h-8 sm:w-8 sm:h-8 flex items-center justify-center rounded-md bg-gray-200 hover:bg-gray-300 font-semibold text-sm"
          style={{ color: '#48546A' }}
        >
          +
        </button>
      </div>
    </div>
  );
}
