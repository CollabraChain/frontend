
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import { OnboardingScreenData } from '@/config/onboardingScreens';

interface OnboardingScreenProps {
  screenData: OnboardingScreenData;
  isLastScreen: boolean;
  onNext: () => void;
  onSkip: () => void;
}

const OnboardingScreen = ({ screenData, isLastScreen, onNext, onSkip }: OnboardingScreenProps) => {
  const Icon = screenData.icon;

  return (
    <>
      {/* Icon with animation */}
      <div className={`mb-6 ${screenData.animation}`}>
        <div className="w-20 h-20 mx-auto bg-trust-blue/10 rounded-full flex items-center justify-center mb-4">
          <Icon className="w-10 h-10 text-trust-blue" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          {screenData.title}
        </h1>
        <p className="text-lg text-trust-blue font-medium">
          {screenData.subtitle}
        </p>
        <p className="text-muted-foreground leading-relaxed">
          {screenData.content}
        </p>
      </div>

      {/* Action buttons */}
      <div className="space-y-3">
        <Button
          onClick={onNext}
          className="w-full bg-trust-blue hover:bg-trust-blue/90 text-white"
          size="lg"
        >
          {isLastScreen ? (
            <>
              <Shield className="w-4 h-4 mr-2" />
              Connect Wallet
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
        
        {!isLastScreen && (
          <Button
            onClick={onSkip}
            variant="ghost"
            className="w-full"
            size="lg"
          >
            Skip Introduction
          </Button>
        )}
      </div>
    </>
  );
};

export default OnboardingScreen;
