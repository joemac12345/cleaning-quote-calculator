import Button from './Button';

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  isLastStep: boolean;
  onSubmit?: () => void;
}

export default function FormNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  isLastStep,
  onSubmit,
}: FormNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 z-50">
      <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8 p-4 sm:p-6 w-full">
        <div className="flex gap-3 sm:gap-4">
          <Button
            label="← Previous"
            onClick={onPrevious}
            variant="outline"
            size="md"
            disabled={currentStep === 1}
            fullWidth
          />
          <Button
            label={isLastStep ? 'Submit →' : 'Next →'}
            onClick={isLastStep ? onSubmit : onNext}
            variant="primary"
            size="md"
            fullWidth
          />
        </div>
      </div>
    </div>
  );
}
