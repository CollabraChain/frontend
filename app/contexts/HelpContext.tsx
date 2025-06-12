'use client';
import React, { createContext, useContext, useState } from 'react';

interface HelpContextType {
  isHelpOpen: boolean;
  currentScreen: string;
  openHelp: (screen: string) => void;
  closeHelp: () => void;
}

const HelpContext = createContext<HelpContextType | undefined>(undefined);

export const useHelp = () => {
  const context = useContext(HelpContext);
  if (!context) {
    throw new Error('useHelp must be used within a HelpProvider');
  }
  return context;
};

export const HelpProvider = ({ children }: { children: React.ReactNode }) => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('');

  const openHelp = (screen: string) => {
    console.log('openHelp', screen);
    setCurrentScreen(screen);
    setIsHelpOpen(true);
  };

  const closeHelp = () => {
    setIsHelpOpen(false);
  };

  return (
    <HelpContext.Provider value={{ isHelpOpen, currentScreen, openHelp, closeHelp }}>
      {children}
    </HelpContext.Provider>
  );
};
