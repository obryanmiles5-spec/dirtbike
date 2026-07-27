'use client';

import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { CompareProvider } from '@/context/CompareContext';
import { AppProvider } from '@/context/AppContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <CartProvider>
        <CompareProvider>{children}</CompareProvider>
      </CartProvider>
    </AppProvider>
  );
}
