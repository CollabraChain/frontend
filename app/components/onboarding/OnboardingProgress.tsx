
import React from 'react';

interface OnboardingProgressProps {
  currentScreen: number;
  totalScreens: number;
}

const OnboardingProgress = ({ currentScreen, totalScreens }: OnboardingProgressProps) => {
  return (
    <div className="flex justify-center gap-2 mb-8">
      {Array.from({ length: totalScreens }, (_, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full transition-colors ${
            index <= currentScreen ? 'bg-trust-blue' : 'bg-neutral-200'
          }`}
        />
      ))}
    </div>
  );
};

export default OnboardingProgress;
