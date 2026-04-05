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
    <div className="flex gap-4 mt-12">
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
  );
}
