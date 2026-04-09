export interface SubmitButtonProps {
  isSubmitting: boolean;
  disabled?: boolean;
}

export default function SubmitButton({ isSubmitting, disabled }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting || disabled}
      className="w-full btn-primary px-6 py-3 sm:py-4 disabled:opacity-50 disabled:cursor-not-allowed text-base"
    >
      {isSubmitting ? 'Processing Booking...' : 'Confirm Booking'}
    </button>
  );
}
