import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface Step {
  label: string;
  description?: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center w-full mb-8">
      {steps.map((step, index) => {
        const isComplete = index < currentStep;
        const isActive = index === currentStep;
        const isPending = index > currentStep;

        return (
          <div key={index} className="flex items-center">
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={
                  isActive 
                    ? 'step-indicator-active' 
                    : isComplete 
                      ? 'step-indicator-complete' 
                      : 'step-indicator-pending'
                }
              >
                {isComplete ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </motion.div>
              <span className={`mt-2 text-xs font-medium ${
                isActive 
                  ? 'text-primary' 
                  : isComplete 
                    ? 'text-primary/70' 
                    : 'text-muted-foreground'
              }`}>
                {step.label}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div className={`w-16 h-0.5 mx-2 mt-[-20px] ${
                isComplete ? 'bg-primary/50' : 'bg-border'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
