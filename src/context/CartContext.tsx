"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Bike, Accessory, CartItem } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (bike: Bike, accessories?: Accessory[], quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  subtotal: number;
  totalItemsCount: number;
  appliedPromo: string | null;
  discountRate: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const PROMO_CODES: Record<string, number> = {
  'VOLT2026': 0.10,   // 10% off
  'SHRED100': 0.05,   // 5% off
  'FREESHIP': 0.08    // ~8% off
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('voltx_cart');
        if (saved) setCart(JSON.parse(saved));
        const savedPromo = localStorage.getItem('voltx_promo');
        if (savedPromo) setAppliedPromo(savedPromo);
      } catch (err) {
        console.error('Failed to parse cart from localStorage', err);
      }
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded || typeof window === 'undefined') return;
    try {
      localStorage.setItem('voltx_cart', JSON.stringify(cart));
    } catch (err) {
      console.error('Failed to save cart to localStorage', err);
    }
  }, [cart, isLoaded]);

  useEffect(() => {
    if (!isLoaded || typeof window === 'undefined') return;
    if (appliedPromo) {
      localStorage.setItem('voltx_promo', appliedPromo);
    } else {
      localStorage.removeItem('voltx_promo');
    }
  }, [appliedPromo, isLoaded]);

  const addToCart = (bike: Bike, accessories: Accessory[] = [], quantity: number = 1) => {
    setCart((prevCart) => {
      // Check if exact bike with same accessories exists
      const accIds = accessories.map(a => a.id).sort().join(',');
      const existingIndex = prevCart.findIndex(
        item => item.bike.id === bike.id && item.selectedAccessories.map(a => a.id).sort().join(',') === accIds
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItemId = `${bike.id}-${Date.now()}`;
        return [...prevCart, { id: newItemId, bike, quantity, selectedAccessories: accessories }];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const subtotal = cart.reduce((sum, item) => {
    const bikePrice = item.bike.price;
    const accPrice = item.selectedAccessories.reduce((accSum, acc) => accSum + acc.price, 0);
    return sum + (bikePrice + accPrice) * item.quantity;
  }, 0);

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const discountRate = appliedPromo ? (PROMO_CODES[appliedPromo.toUpperCase()] || 0) : 0;

  const applyPromoCode = (code: string) => {
    const formatted = code.trim().toUpperCase();
    if (PROMO_CODES[formatted] !== undefined) {
      setAppliedPromo(formatted);
      return { success: true, message: `Promo code ${formatted} applied! (${PROMO_CODES[formatted] * 100}% Discount)` };
    }
    return { success: false, message: 'Invalid promo code. Try "VOLT2026" for 10% off!' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        subtotal,
        totalItemsCount,
        appliedPromo,
        discountRate,
        applyPromoCode,
        removePromoCode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
