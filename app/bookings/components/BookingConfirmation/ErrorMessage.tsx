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
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700 text-small">{message}</p>
      </div>
    );
  }

  return <p className="text-red-500 text-small mt-1">{message}</p>;
}
