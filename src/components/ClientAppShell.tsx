'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BikeDetailModal } from '@/components/BikeDetailModal';
import { CartDrawer } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';
import { CompareModal } from '@/components/CompareModal';
import { TestRideModal } from '@/components/TestRideModal';
import { RiderQuizModal } from '@/components/RiderQuizModal';
import { Bike, OrderDetails } from '@/types';
import { useAppContext } from '@/context/AppContext';

export function ClientAppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const getTabFromPath = (path: string | null): 'home' | 'shop' | 'about' | 'contact' | 'electric-dirt-bikes' | 'e-bikes' | 'accessories' => {
    if (!path) return 'home';
    if (path.startsWith('/shop/electric-dirt-bikes')) return 'electric-dirt-bikes';
    if (path.startsWith('/shop/e-bikes')) return 'e-bikes';
    if (path.startsWith('/shop/accessories')) return 'accessories';
    if (path.startsWith('/shop/battery')) return 'accessories';
    if (path.startsWith('/shop')) return 'shop';
    if (path.startsWith('/about')) return 'about';
    if (path.startsWith('/contact')) return 'contact';
    return 'home';
  };

  const [activeTab, setActiveTabState] = useState<'home' | 'shop' | 'about' | 'contact' | 'electric-dirt-bikes' | 'e-bikes' | 'accessories'>('home');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { selectedBike, setSelectedBike, isQuizOpen, setIsQuizOpen, isTestRideOpen, setIsTestRideOpen, testRideBikeName, setTestRideBikeName } = useAppContext();

  useEffect(() => {
    setActiveTabState(getTabFromPath(pathname));
  }, [pathname]);

  const handleSetActiveTab = (tab: 'home' | 'shop' | 'about' | 'contact' | 'electric-dirt-bikes' | 'e-bikes' | 'accessories') => {
    setActiveTabState(tab);
    if (tab === 'home') router.push('/');
    else if (['electric-dirt-bikes', 'e-bikes', 'accessories'].includes(tab)) {
      router.push(`/shop/${tab}`);
    }
    else if (tab === 'shop') router.push('/shop');
    else if (tab === 'about') router.push('/about');
    else if (tab === 'contact') router.push('/contact');
  };

  const handleOpenSearch = () => {
    handleSetActiveTab('shop');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenTestRide = (bikeName?: string) => {
    setTestRideBikeName(bikeName);
    setIsTestRideOpen(true);
  };

  const handleOrderSuccess = (order: OrderDetails) => {
    console.log('Order created successfully:', order);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-lime-400 selection:text-zinc-950">
      <Header
        activeTab={activeTab}
        setActiveTab={handleSetActiveTab}
        onOpenSearch={handleOpenSearch}
        onOpenTestRide={() => handleOpenTestRide()}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      <main className="flex-1">
        {children}
      </main>

      <Footer setActiveTab={handleSetActiveTab} />
      
      <BikeDetailModal
        bike={selectedBike}
        onClose={() => setSelectedBike(null)}
        onOpenTestRide={(bName) => handleOpenTestRide(bName)}
        onSelectBike={(b) => setSelectedBike(b)}
      />

      <CartDrawer
        onOpenCheckout={() => setIsCheckoutOpen(true)}
        onExploreShop={() => handleSetActiveTab('shop')}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={handleOrderSuccess}
      />

      <CompareModal
        onSelectBike={(bike) => setSelectedBike(bike)}
      />

      <TestRideModal
        isOpen={isTestRideOpen}
        onClose={() => setIsTestRideOpen(false)}
        defaultBikeName={testRideBikeName}
      />

      <RiderQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectBike={(bike) => setSelectedBike(bike)}
      />
    </div>
  );
}
