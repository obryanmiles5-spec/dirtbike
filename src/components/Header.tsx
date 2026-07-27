'use client';

import React, { useState } from 'react';
import { 
  Zap, 
  ShoppingCart, 
  SlidersHorizontal, 
  Search, 
  Menu, 
  X, 
  Compass, 
  Bike as BikeIcon, 
  PhoneCall, 
  Info,
  CalendarCheck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCompare } from '../context/CompareContext';

interface HeaderProps {
  activeTab: 'home' | 'shop' | 'about' | 'contact' | 'electric-dirt-bikes' | 'e-bikes' | 'accessories';
  setActiveTab: (tab: 'home' | 'shop' | 'about' | 'contact' | 'electric-dirt-bikes' | 'e-bikes' | 'accessories') => void;
  onOpenSearch?: () => void;
  onOpenTestRide?: () => void;
  onOpenQuiz?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenTestRide,
  onOpenQuiz
}) => {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { compareList, setIsCompareModalOpen } = useCompare();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  const announcements = [
    { text: "FREE 50-STATE FREIGHT CRATE DELIVERY ON ALL E-MOTO ORDERS", code: "CODE: VOLTX100 ($100 OFF)", highlight: "FREE FREIGHT" },
    { text: "2026 APEX 60 & STEALTH PRO 72 IN STOCK FOR NEXT-DAY RENO DISPATCH", code: "FAST DISPATCH", highlight: "READY TO SHIP" },
    { text: "NO-INTEREST FINANCING AS LOW AS $99/MO VIA AFFIRM & SHOP PAY", code: "0% DOWN AVAILABLE", highlight: "INSTANT FINANCING" }
  ];

  // Auto-rotate announcement bar
  React.useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'shop', label: 'Shop', icon: BikeIcon },
    { id: 'about', label: 'About', icon: Info },
    { id: 'contact', label: 'Contact', icon: PhoneCall },
    { id: 'electric-dirt-bikes', label: 'Electric Dirt Bikes', icon: BikeIcon },
    { id: 'e-bikes', label: 'E-Bikes', icon: Zap },
    { id: 'accessories', label: 'Accessories', icon: Zap },
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-[#161821]/95 backdrop-blur-md border-b border-lime-500/25 text-white transition-all shadow-xl">
      {/* Revolution Slider Style Top Announcement Bar */}
      <div className="bg-[#0c0e14] px-4 py-2 text-xs border-b border-zinc-800/90 text-zinc-300 flex items-center justify-between font-mono max-w-7xl mx-auto">
        <button 
          onClick={() => setAnnouncementIndex((prev) => (prev - 1 + announcements.length) % announcements.length)}
          className="text-zinc-500 hover:text-lime-400 text-xs px-1 select-none cursor-pointer"
          aria-label="Previous announcement"
        >
          &lsaquo;
        </button>

        <div className="flex items-center justify-center gap-2 overflow-hidden text-center transition-all duration-500">
          <span className="inline-flex items-center gap-1.5 font-black uppercase tracking-wider text-lime-400 bg-lime-950/60 px-2 py-0.5 rounded border border-lime-500/30 text-[10px]">
            <Zap className="w-3.5 h-3.5 text-lime-400 animate-pulse fill-lime-400" />
            {announcements[announcementIndex].highlight}
          </span>
          <span className="text-[11px] font-bold text-zinc-200 hidden sm:inline">
            {announcements[announcementIndex].text}
          </span>
          <span className="text-[10px] font-black text-lime-300 underline bg-zinc-900 px-2 py-0.5 rounded border border-zinc-700">
            {announcements[announcementIndex].code}
          </span>
        </div>

        <button 
          onClick={() => setAnnouncementIndex((prev) => (prev + 1) % announcements.length)}
          className="text-zinc-500 hover:text-lime-400 text-xs px-1 select-none cursor-pointer"
          aria-label="Next announcement"
        >
          &rsaquo;
        </button>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-lime-400 p-0.5 shadow-lg shadow-lime-400/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#161821] rounded-[10px] flex items-center justify-center">
              <Zap className="w-6 h-6 text-lime-400 fill-lime-400/20" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter text-white uppercase font-sans leading-none">
              VOLT<span className="text-lime-400">-X</span>
            </span>
            <span className="text-[9px] font-black text-zinc-400 tracking-widest uppercase mt-0.5 font-mono">
              US E-MOTO & POWERSPORTS
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-900/90 p-1.5 rounded-xl border border-zinc-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-lime-400 text-zinc-950 font-black shadow-md shadow-lime-400/20'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-800/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons: Search, Order Now CTA, Cart */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-lime-400 transition-colors cursor-pointer"
            title="Search electric dirt bikes by power, battery or spec"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Prominent ORDER NOW CTA */}
          <button
            onClick={() => setActiveTab('shop')}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-zinc-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-lime-400/20 transition-all transform hover:scale-105 cursor-pointer font-mono"
          >
            <BikeIcon className="w-4 h-4" />
            <span>ORDER NOW</span>
          </button>

          {/* Bike Compare Drawer Button */}
          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="relative p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-lime-400 transition-colors cursor-pointer"
            title="Compare bikes side by side"
          >
            <SlidersHorizontal className="w-5 h-5" />
            {compareList.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-lime-400 text-zinc-950 text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-lime-400/50 font-mono">
                {compareList.length}
              </span>
            )}
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-black border border-zinc-800 transition-all cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5 text-lime-400" />
            <span className="hidden lg:inline text-xs uppercase tracking-wider font-mono font-bold">CART</span>
            {totalItemsCount > 0 && (
              <span className="bg-lime-400 text-zinc-950 text-xs font-black px-2 py-0.5 rounded-full font-mono">
                {totalItemsCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B0B0B] border-b border-zinc-800 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2.5 p-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-lime-400 text-zinc-950'
                      : 'bg-zinc-900 text-zinc-200 hover:bg-zinc-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-zinc-800 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenTestRide?.();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-lime-400 font-bold text-xs uppercase tracking-wider border border-lime-400/30"
            >
              <CalendarCheck className="w-4 h-4" />
              Book a US Dealer Test Ride
            </button>
            <button
              onClick={() => {
                onOpenQuiz?.();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-zinc-900 text-zinc-200 text-xs font-bold uppercase tracking-wider border border-zinc-800"
            >
              <Zap className="w-3.5 h-3.5 text-lime-400" />
              Take 30-Sec Bike Finder Quiz
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
