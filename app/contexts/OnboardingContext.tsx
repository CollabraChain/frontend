
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OnboardingContextType {
  currentScreen: number;
  isCompleted: boolean;
  showWalletConnection: boolean;
  setCurrentScreen: (screen: number) => void;
  setIsCompleted: (completed: boolean) => void;
  setShowWalletConnection: (show: boolean) => void;
  nextScreen: () => void;
  completeOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

interface OnboardingProviderProps {
  children: ReactNode;
  totalScreens: number;
}

export const OnboardingProvider = ({ children, totalScreens }: OnboardingProviderProps) => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showWalletConnection, setShowWalletConnection] = useState(false);

  const nextScreen = () => {
    if (currentScreen === totalScreens - 1) {
      setShowWalletConnection(true);
    } else {
      setCurrentScreen(prev => prev + 1);
    }
  };

  const completeOnboarding = () => {
    setIsCompleted(true);
    localStorage.setItem('collabrachain_onboarding_completed', 'true');
  };

  return (
    <OnboardingContext.Provider
      value={{
        currentScreen,
        isCompleted,
        showWalletConnection,
        setCurrentScreen,
        setIsCompleted,
        setShowWalletConnection,
        nextScreen,
        completeOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
