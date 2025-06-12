
import React from 'react';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const steps = [
  { id: 1, title: 'Project Type', description: 'Choose template' },
  { id: 2, title: 'Details', description: 'Project info' },
  { id: 3, title: 'Milestones', description: 'Plan phases' },
  { id: 4, title: 'Budget', description: 'Set payments' },
  { id: 5, title: 'Team', description: 'Add members' },
  { id: 6, title: 'Contract', description: 'Configure terms' },
  { id: 7, title: 'Review', description: 'Final check' }
];

const ProgressIndicator = ({ currentStep, totalSteps }: ProgressIndicatorProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              {/* Step Circle */}
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                step.id < currentStep
                  ? 'bg-trust-blue border-trust-blue text-white'
                  : step.id === currentStep
                  ? 'border-trust-blue text-trust-blue bg-trust-blue/10'
                  : 'border-muted-foreground/30 text-muted-foreground'
              }`}>
                {step.id < currentStep ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </div>
              
              {/* Step Label */}
              <div className="mt-2 text-center">
                <div className={`text-sm font-medium ${
                  step.id <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {step.description}
                </div>
              </div>
            </div>
            
            {/* Connector */}
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 mt-5 ${
                step.id < currentStep ? 'bg-trust-blue' : 'bg-muted-foreground/30'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
