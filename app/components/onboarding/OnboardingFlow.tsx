'use client';
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useOnboarding } from '@/contexts/OnboardingContext';
import { onboardingScreens } from '@/config/onboardingScreens';
import OnboardingScreen from './OnboardingScreen';
import OnboardingProgress from './OnboardingProgress';
import WalletConnectionStep from './WalletConnectionStep';
import { useRouter } from 'next/navigation';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const router = useRouter();
  const {
    currentScreen,
    showWalletConnection,
    nextScreen,
    completeOnboarding,
  } = useOnboarding();

  const currentScreenData = onboardingScreens[currentScreen];
  const isLastScreen = currentScreen === onboardingScreens.length - 1;

  const handleWalletConnected = () => {
    setTimeout(() => {
      completeOnboarding();
      onComplete();
      router.push('/demo');
    }, 1500);
  };

  const handleSkip = () => {
    completeOnboarding();
    onComplete();
    router.push('/demo');
  };

  if (showWalletConnection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-trust-blue/5 to-energy-green/5 flex items-center justify-center p-4">
        <WalletConnectionStep
          onConnect={handleWalletConnected}
          onSkip={handleSkip}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-trust-blue/5 to-energy-green/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <OnboardingProgress
            currentScreen={currentScreen}
            totalScreens={onboardingScreens.length}
          />

          <OnboardingScreen
            screenData={currentScreenData}
            isLastScreen={isLastScreen}
            onNext={nextScreen}
            onSkip={handleSkip}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingFlow;
