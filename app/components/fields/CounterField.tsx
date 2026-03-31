'use client';

interface CounterFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  icon?: string;
  time?: number;
}

export default function CounterField({
  label,
  value,
  onChange,
  icon,
  time,
}: CounterFieldProps) {
  const handleDecrement = () => onChange(Math.max(0, value - 1));
  const handleIncrement = () => onChange(value + 1);

  return (
    <div className="flex items-start sm:items-center justify-between border border-gray-200 rounded-lg p-3 sm:p-4 gap-2">
      <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
        {icon && (
          <div className="flex-shrink-0">
            <img
              src={icon}
              alt={label}
              className="w-14 h-14 sm:w-20 sm:h-20 object-cover rounded"
            />
          </div>
        )}
        <div className="min-w-0">
          <h3 className="text-sm sm:text-base text-gray-900 font-medium break-words">{label}</h3>
          {time && <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">{time} min</p>}
        </div>
      </div>
      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
        <button
          onClick={handleDecrement}
          disabled={value === 0}
          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
        >
          −
        </button>
        <span className="w-5 sm:w-6 text-center text-base sm:text-lg font-semibold text-gray-900">{value}</span>
        <button
          onClick={handleIncrement}
          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md bg-slate-100 hover:bg-slate-200 text-[#48546A] font-semibold text-sm"
        >
          +
        </button>
      </div>
    </div>
  );
}
