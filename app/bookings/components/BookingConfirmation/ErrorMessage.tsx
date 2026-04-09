export interface ErrorMessageProps {
  message?: string;
  isSubmitError?: boolean;
}

export default function ErrorMessage({
  message,
  isSubmitError = false,
}: ErrorMessageProps) {
  if (!message) return null;

  if (isSubmitError) {
    return (
      <div className="bg-error bg-opacity-10 border border-error rounded-lg p-4">
        <p className="text-error text-small">{message}</p>
      </div>
    );
  }

  return <p className="text-error text-small mt-1">{message}</p>;
}
