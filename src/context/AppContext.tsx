'use client';
import React, { createContext, useContext, useState } from 'react';
import { Bike } from '../types';

interface AppContextType {
  selectedBike: Bike | null;
  setSelectedBike: (bike: Bike | null) => void;
  isQuizOpen: boolean;
  setIsQuizOpen: (isOpen: boolean) => void;
  isTestRideOpen: boolean;
  setIsTestRideOpen: (isOpen: boolean) => void;
  testRideBikeName: string | undefined;
  setTestRideBikeName: (name: string | undefined) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isTestRideOpen, setIsTestRideOpen] = useState(false);
  const [testRideBikeName, setTestRideBikeName] = useState<string | undefined>(undefined);

  return (
    <AppContext.Provider value={{
      selectedBike, setSelectedBike,
      isQuizOpen, setIsQuizOpen,
      isTestRideOpen, setIsTestRideOpen,
      testRideBikeName, setTestRideBikeName
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
