'use client';

import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { CompareProvider } from '@/context/CompareContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <CompareProvider>{children}</CompareProvider>
    </CartProvider>
  );
}
