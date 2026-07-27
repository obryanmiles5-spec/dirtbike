"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Bike } from '../types';

interface CompareContextType {
  compareList: Bike[];
  addToCompare: (bike: Bike) => void;
  removeFromCompare: (bikeId: string) => void;
  isInCompare: (bikeId: string) => boolean;
  clearCompare: () => void;
  isCompareModalOpen: boolean;
  setIsCompareModalOpen: (open: boolean) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compareList, setCompareList] = useState<Bike[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('voltx_compare');
        if (saved) setCompareList(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to parse compare list from localStorage', err);
      }
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded || typeof window === 'undefined') return;
    try {
      localStorage.setItem('voltx_compare', JSON.stringify(compareList));
    } catch (err) {
      console.error('Failed to save compare list', err);
    }
  }, [compareList, isLoaded]);

  const addToCompare = (bike: Bike) => {
    if (compareList.some(b => b.id === bike.id)) return;
    if (compareList.length >= 4) {
      alert('You can compare up to 4 bikes at a time.');
      return;
    }
    setCompareList(prev => [...prev, bike]);
  };

  const removeFromCompare = (bikeId: string) => {
    setCompareList(prev => prev.filter(b => b.id !== bikeId));
  };

  const isInCompare = (bikeId: string) => {
    return compareList.some(b => b.id === bikeId);
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  return (
    <CompareContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
        isCompareModalOpen,
        setIsCompareModalOpen,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};
