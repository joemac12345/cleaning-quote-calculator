import ErrorMessage from './ErrorMessage';

export interface ConfirmationCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  disabled?: boolean;
}

export default function ConfirmationCheckbox({
  checked,
  onChange,
  error,
  disabled,
}: ConfirmationCheckboxProps) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="confirmation"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 w-5 h-5 cursor-pointer accent-primary flex-shrink-0"
          disabled={disabled}
        />
        <label htmlFor="confirmation" className="flex-1 cursor-pointer">
          <p className="text-base text-primary leading-relaxed">
            I confirm that the details above are correct. The cleaning team will contact me within 24 hours to confirm Details
          </p>
        </label>
      </div>
      {error && <ErrorMessage message={error} />}
    </div>
  );
}
