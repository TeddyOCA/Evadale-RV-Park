import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export function StepIndicator({ currentStep, totalSteps, stepLabels }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between step-indicator">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div
              key={stepNumber}
              className={`step flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-colors ${
                isCompleted || isCurrent
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
              data-testid={`step-indicator-${stepNumber}`}
            >
              {isCompleted ? (
                <Check className="w-5 h-5" />
              ) : (
                <span>{stepNumber}</span>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-4 bg-muted rounded-full h-2 relative overflow-hidden">
        <div
          className="progress-fill bg-primary h-full rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          data-testid="progress-bar"
        />
      </div>
      <div className="flex justify-between text-sm text-muted-foreground mt-2">
        {stepLabels.map((label, index) => (
          <span key={index} data-testid={`step-label-${index + 1}`}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
