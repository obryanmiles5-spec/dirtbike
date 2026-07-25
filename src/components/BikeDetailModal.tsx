'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Zap, 
  Battery, 
  Gauge, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  Star, 
  Check, 
  Plus, 
  ShoppingCart, 
  SlidersHorizontal,
  ChevronRight,
  Calculator,
  RotateCcw,
  Users,
  Flame,
  CheckCircle2,
  Package,
  Wrench,
  Clock,
  Sparkles,
  ArrowRight,
  Eye,
  Award,
  Layers
} from 'lucide-react';
import { Bike, Accessory } from '../types';
import { BIKES_DATA, ACCESSORIES_DATA } from '../data/bikes';
import { useCart } from '../context/CartContext';
import { useCompare } from '../context/CompareContext';

interface BikeDetailModalProps {
  bike: Bike | null;
  onClose: () => void;
  onOpenTestRide?: (bikeName: string) => void;
  onSelectBike?: (bike: Bike) => void;
}

export const BikeDetailModal: React.FC<BikeDetailModalProps> = ({
  bike,
  onClose,
  onOpenTestRide,
  onSelectBike
}) => {
  if (!bike) return null;

  const { addToCart } = useCart();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();

  const [activeImage, setActiveImage] = useState(bike.image);
  const [selectedAccessories, setSelectedAccessories] = useState<Accessory[]>([]);
  const [activeTab, setActiveTab] = useState<'specs' | 'battery' | 'included' | 'financing' | 'reviews'>('specs');
  const [financingMonths, setFinancingMonths] = useState<12 | 24 | 36>(24);
  const [viewerCount, setViewerCount] = useState<number>(18);

  // Synchronize active image when bike changes
  useEffect(() => {
    if (bike) {
      setActiveImage(bike.image);
      setSelectedAccessories([]);
      // Generate realistic viewer count between 12 and 29
      setViewerCount(Math.floor(Math.random() * 18) + 12);
    }
  }, [bike]);

  // Subtle real-time viewer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setViewerCount((prev) => {
        const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, or +1
        const next = prev + delta;
        return next < 12 ? 12 : next > 32 ? 32 : next;
      });
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const isCompared = isInCompare(bike.id);

  const toggleAccessory = (acc: Accessory) => {
    if (selectedAccessories.some(a => a.id === acc.id)) {
      setSelectedAccessories(prev => prev.filter(a => a.id !== acc.id));
    } else {
      setSelectedAccessories(prev => [...prev, acc]);
    }
  };

  const accessoryTotalPrice = selectedAccessories.reduce((sum, a) => sum + a.price, 0);
  const grandTotal = bike.price + accessoryTotalPrice;

  // Financing calculation
  const monthlyPayment = Math.round(grandTotal / financingMonths);

  const handleAddToCart = () => {
    addToCart(bike, selectedAccessories, 1);
    onClose();
  };

  // Get Related Products (exclude current bike, pick 3 or 4)
  const relatedBikes = BIKES_DATA.filter(b => b.id !== bike.id).slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-6xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col text-white font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="sticky top-0 z-20 px-4 sm:px-6 py-3 bg-[#0B0B0B]/95 backdrop-blur-md border-b border-zinc-800 flex items-center justify-between font-mono">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="px-2.5 py-1 rounded bg-lime-400 text-zinc-950 text-xs font-black uppercase tracking-wider">
              {bike.specs.peakPowerKW}kW PEAK OUTPUT
            </span>
            <span className="text-xs font-black text-zinc-300 uppercase tracking-wider hidden md:inline">
              {bike.categoryLabel}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (isCompared) removeFromCompare(bike.id);
                else addToCompare(bike);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer ${
                isCompared 
                  ? 'bg-lime-400 text-zinc-950' 
                  : 'bg-zinc-900 text-zinc-300 border border-zinc-800 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isCompared ? 'COMPARING' : 'COMPARE'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-10 flex-1 bg-[#0B0B0B]">
          
          {/* Main Product Display Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Image Gallery & Badges */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Main Image Stage */}
              <div className="relative aspect-[4/3] bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800 group">
                <img
                  src={activeImage}
                  alt={bike.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                />

                <div className="absolute top-3 left-3 bg-zinc-950/90 backdrop-blur-md px-3 py-1.5 rounded-md border border-zinc-800 text-xs font-mono text-lime-400 font-bold">
                  {bike.specs.batteryVoltage}V {bike.specs.batteryAh}Ah High-Output Battery Pack
                </div>

                {/* Customers Online Live Badge */}
                <div className="absolute bottom-3 left-3 bg-zinc-950/90 backdrop-blur-md px-3 py-1.5 rounded-md border border-amber-500/40 text-amber-400 text-xs font-mono font-bold flex items-center gap-2 shadow-lg">
                  <Flame className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
                  <span>🔥 {viewerCount} RIDERS ONLINE VIEWING THIS MACHINE</span>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-2">
                {bike.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImage === img ? 'border-lime-400 scale-102 shadow-lg shadow-lime-400/20' : 'border-zinc-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Gallery ${idx}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Quick Spec Highlights Strip */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-zinc-950 rounded-xl border border-zinc-800 font-mono">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-lime-400/10 rounded-lg text-lime-400">
                    <Zap className="w-5 h-5 fill-lime-400/20" />
                  </div>
                  <div>
                    <div className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider font-sans">PEAK OUTPUT</div>
                    <div className="text-sm font-black text-white">{bike.specs.peakPowerKW} kW</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-x border-zinc-800 px-3">
                  <div className="p-2.5 bg-lime-400/10 rounded-lg text-lime-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider font-sans">MAX RANGE</div>
                    <div className="text-sm font-black text-white">{bike.specs.rangeMilesMax} MILES</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-lime-400/10 rounded-lg text-lime-400">
                    <Gauge className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider font-sans">TOP SPEED</div>
                    <div className="text-sm font-black text-white">{bike.specs.topSpeedMph} MPH</div>
                  </div>
                </div>
              </div>

              {/* Urgency Crate Dispatch Banner */}
              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-3 text-xs text-emerald-400 font-mono font-bold">
                <Truck className="w-5 h-5 shrink-0 text-emerald-400" />
                <div>
                  <span className="text-white font-black">IN STOCK:</span> Dispatches in 24 Hours from Reno, NV Distribution Center. Includes steel crate freight & 100% assembly inspection.
                </div>
              </div>

            </div>

            {/* Right Column: Buying Box & Specifications Specifications */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                {/* Rating & Stock */}
                <div className="flex items-center justify-between text-xs mb-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="font-mono text-sm">{bike.rating.toFixed(2)}</span>
                    <span className="text-zinc-500 font-mono">({bike.reviewCount} Rider Reviews)</span>
                  </div>

                  <span className="px-2 py-0.5 rounded bg-lime-400/20 text-lime-400 border border-lime-400/40 font-mono text-[10px] font-bold uppercase">
                    READY TO SHIP
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-sans">{bike.name}</h1>
                <p className="text-xs text-zinc-300 mt-2 leading-relaxed">{bike.description}</p>

                {/* Pricing Block */}
                <div className="mt-4 p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                  <div>
                    <div className="text-[9px] text-zinc-400 uppercase font-black tracking-widest font-mono">FACTORY DIRECT PRICE</div>
                    <div className="text-3xl font-black text-white font-mono tracking-tight">
                      ${grandTotal.toLocaleString()}
                    </div>
                    {accessoryTotalPrice > 0 && (
                      <div className="text-[11px] text-lime-400 font-medium font-mono mt-0.5">
                        Base ${bike.price.toLocaleString()} + ${accessoryTotalPrice.toLocaleString()} Accessories
                      </div>
                    )}
                  </div>

                  <div className="text-right font-mono">
                    <div className="text-[10px] text-zinc-400 uppercase font-bold">Financing From</div>
                    <div className="text-lg font-black text-lime-400">${monthlyPayment}/mo</div>
                    <div className="text-[9px] text-zinc-400 font-sans">via Affirm or Shop Pay</div>
                  </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex border-b border-zinc-800 mt-6 gap-2 overflow-x-auto scrollbar-none font-mono">
                  {(
                    [
                      { id: 'specs', label: 'Tech Specs' },
                      { id: 'battery', label: 'Battery & Charger' },
                      { id: 'included', label: 'In The Box' },
                      { id: 'financing', label: 'Financing' },
                      { id: 'reviews', label: 'Rider Reviews' },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`pb-2.5 px-2 text-xs font-black uppercase tracking-wider transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                        activeTab === tab.id
                          ? 'border-lime-400 text-lime-400'
                          : 'border-transparent text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Content Panels */}
                <div className="pt-4 min-h-[240px]">
                  {activeTab === 'specs' && (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-sans">
                      <div className="flex justify-between py-1.5 border-b border-zinc-800/80">
                        <span className="text-zinc-400">Peak Motor Power</span>
                        <span className="font-mono font-bold text-white">{bike.specs.peakPowerKW} kW ({Math.round(bike.specs.peakPowerKW * 1.34)} HP)</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-zinc-800/80">
                        <span className="text-zinc-400">Peak Wheel Torque</span>
                        <span className="font-mono font-bold text-white">{bike.specs.peakTorqueNm} Nm</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-zinc-800/80">
                        <span className="text-zinc-400">Battery Capacity</span>
                        <span className="font-mono font-bold text-lime-400">{bike.specs.batteryCapacity}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-zinc-800/80">
                        <span className="text-zinc-400">Battery Voltage</span>
                        <span className="font-mono font-bold text-white">{bike.specs.batteryVoltage} Volts</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-zinc-800/80">
                        <span className="text-zinc-400">Max Trail Range</span>
                        <span className="font-mono font-bold text-white">{bike.specs.rangeMilesMin} - {bike.specs.rangeMilesMax} Miles</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-zinc-800/80">
                        <span className="text-zinc-400">Curb Weight</span>
                        <span className="font-mono font-bold text-white">{bike.specs.weightLbs} LBS</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-zinc-800/80">
                        <span className="text-zinc-400">Top Speed</span>
                        <span className="font-mono font-bold text-white">{bike.specs.topSpeedMph} MPH</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-zinc-800/80">
                        <span className="text-zinc-400">Ground Clearance</span>
                        <span className="font-mono font-bold text-white">{bike.specs.groundClearanceInches} Inches</span>
                      </div>
                      {bike.specs.seatCapacity && (
                        <div className="col-span-2 flex justify-between py-1.5 border-b border-zinc-800/80 bg-emerald-950/40 px-2 rounded-lg">
                          <span className="text-emerald-400 font-bold uppercase">Passenger Capacity</span>
                          <span className="font-mono font-bold text-emerald-300">{bike.specs.seatCapacity}</span>
                        </div>
                      )}
                      <div className="col-span-2 flex justify-between py-1.5 border-b border-zinc-800/80">
                        <span className="text-zinc-400">Chassis & Frame</span>
                        <span className="font-medium text-white">Forged 6061-T6 Aircraft Aluminum Alloy</span>
                      </div>
                      <div className="col-span-2 flex justify-between py-1.5 border-b border-zinc-800/80">
                        <span className="text-zinc-400">Suspension System</span>
                        <span className="font-medium text-white">{bike.specs.suspension}</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'battery' && (
                    <div className="space-y-3 text-xs font-sans">
                      <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                        <div className="flex items-center justify-between font-mono font-bold text-lime-400">
                          <span>BATTERY SYSTEM SPECIFICATIONS</span>
                          <span>{bike.specs.batteryVoltage}V NOMINAL</span>
                        </div>
                        <p className="text-zinc-300 leading-relaxed text-[11px]">
                          Powered by premium 21700 high-discharge lithium-ion cells with integrated Smart BMS (Battery Management System) protecting against overcharge, thermal spikes, and cell imbalances.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                        <div className="p-2.5 bg-zinc-950 rounded-lg border border-zinc-800">
                          <span className="text-zinc-400 block text-[9px] uppercase">Charge Time</span>
                          <strong className="text-white text-xs">{bike.specs.chargeTimeHours} Hours (0-100%)</strong>
                        </div>
                        <div className="p-2.5 bg-zinc-950 rounded-lg border border-zinc-800">
                          <span className="text-zinc-400 block text-[9px] uppercase">Charger Included</span>
                          <strong className="text-white text-xs">600W Fast Charger (120V)</strong>
                        </div>
                        <div className="p-2.5 bg-zinc-950 rounded-lg border border-zinc-800">
                          <span className="text-zinc-400 block text-[9px] uppercase">Pack Removability</span>
                          <strong className="text-lime-400 text-xs">Quick-Swap Lock Key Fob</strong>
                        </div>
                        <div className="p-2.5 bg-zinc-950 rounded-lg border border-zinc-800">
                          <span className="text-zinc-400 block text-[9px] uppercase">Lifecycle Rating</span>
                          <strong className="text-white text-xs">1,500 Full Charge Cycles</strong>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'included' && (
                    <div className="space-y-2 text-xs">
                      <p className="text-zinc-400 font-mono text-[11px] mb-2">EVERY STEEL FREIGHT CRATE SHIPMENT INCLUDES:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                          <span className="text-zinc-200 font-medium">95% Pre-Assembled Machine</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                          <span className="text-zinc-200 font-medium">600W 120V Fast Charger & Cable</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                          <span className="text-zinc-200 font-medium">Heavy Duty Tool Roll & Torque Wrench</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                          <span className="text-zinc-200 font-medium">MSO / VIN Certificate for DMV Registration</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                          <span className="text-zinc-200 font-medium">2 Custom Key Fobs + Battery Lock Keys</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                          <span className="text-zinc-200 font-medium">2-Year Factory Battery Warranty</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'financing' && (
                    <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4 text-xs">
                      <div className="flex items-center gap-2 text-lime-400 font-black uppercase font-mono">
                        <Calculator className="w-4 h-4" />
                        <span>AFFIRM & SHOP PAY INSTANT FINANCING</span>
                      </div>

                      <div className="space-y-2">
                        <label className="text-zinc-400 font-medium">Select Desired Loan Duration:</label>
                        <div className="grid grid-cols-3 gap-2">
                          {([12, 24, 36] as const).map((m) => (
                            <button
                              key={m}
                              onClick={() => setFinancingMonths(m)}
                              className={`py-2 rounded-lg text-xs font-black font-mono transition-colors cursor-pointer ${
                                financingMonths === m
                                  ? 'bg-lime-400 text-zinc-950'
                                  : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                              }`}
                            >
                              {m} Months
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 bg-zinc-900 rounded-lg space-y-1">
                        <div className="flex justify-between text-zinc-400 font-sans">
                          <span>Monthly Installment:</span>
                          <span className="text-lime-400 font-black font-mono text-base">${monthlyPayment} / month</span>
                        </div>
                        <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                          <span>0% APR Qualified Options</span>
                          <span>Instant Soft Check (No Credit Score Hit)</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                      <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="font-bold text-white">Jason M. (Reno, NV)</span>
                          <span className="text-emerald-400 font-bold">VERIFIED BUYER</span>
                        </div>
                        <div className="flex text-amber-400 gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => <Star key={star} className="w-3 h-3 fill-amber-400" />)}
                        </div>
                        <p className="text-[11px] text-zinc-300 italic">
                          "The acceleration is terrifying in Sport Mode. Unboxed the freight crate, took 15 mins to torque handle bars, and rode all afternoon!"
                        </p>
                      </div>

                      <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="font-bold text-white">Travis B. (Moab, UT)</span>
                          <span className="text-emerald-400 font-bold">VERIFIED BUYER</span>
                        </div>
                        <div className="flex text-amber-400 gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => <Star key={star} className="w-3 h-3 fill-amber-400" />)}
                        </div>
                        <p className="text-[11px] text-zinc-300 italic">
                          "Conquered slickrock trails effortlessly. Zero noise, insane battery life, and super lightweight for mountain riding."
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-zinc-800">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-3.5 px-4 rounded-lg bg-lime-400 hover:bg-lime-300 text-zinc-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-lime-400/20 transition-all cursor-pointer font-mono"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>RESERVE & BUY NOW</span>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenTestRide?.(bike.name);
                    }}
                    className="w-full py-3.5 px-4 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-zinc-700 transition-colors cursor-pointer font-mono"
                  >
                    <span>BOOK RENO TEST RIDE</span>
                    <ChevronRight className="w-4 h-4 text-lime-400" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono px-1">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-lime-400" /> Insured Freight Crate
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-lime-400" /> 2-Yr Factory Warranty
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* RELATED PRODUCTS SECTION (UNDER SINGLE PRODUCT PAGE) */}
          <div className="pt-10 border-t border-zinc-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-black uppercase tracking-widest text-lime-400">YOU MAY ALSO BE INTERESTED IN</span>
                <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-1 font-sans">
                  RELATED HIGH-OUTPUT MACHINES
                </h3>
              </div>
              <span className="text-xs font-mono text-zinc-500 hidden sm:inline">SIMILAR E-MOTO POWER CLASS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedBikes.map((relBike) => (
                <div
                  key={relBike.id}
                  onClick={() => {
                    if (onSelectBike) {
                      onSelectBike(relBike);
                    }
                  }}
                  className="bg-zinc-950 rounded-xl border border-zinc-800/90 hover:border-lime-400/80 p-4 transition-all group cursor-pointer shadow-lg space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-zinc-900">
                      <img
                        src={relBike.image}
                        alt={relBike.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2 bg-zinc-950/90 text-lime-400 text-[10px] font-mono font-black px-2 py-0.5 rounded border border-zinc-800">
                        {relBike.specs.peakPowerKW}kW MOTOR
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-black text-white uppercase font-sans group-hover:text-lime-400 transition-colors line-clamp-1">
                        {relBike.name}
                      </h4>
                      <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5 font-sans">
                        {relBike.tagline}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-1 text-[10px] font-mono text-zinc-400 pt-2 border-t border-zinc-900">
                      <span>{relBike.specs.batteryVoltage}V Battery</span>
                      <span className="text-right">{relBike.specs.rangeMilesMax} Mi Range</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                    <span className="text-lg font-black text-white font-mono">${relBike.price.toLocaleString()}</span>
                    <button className="px-3 py-1.5 rounded bg-lime-400/10 hover:bg-lime-400 text-lime-400 hover:text-zinc-950 font-mono font-bold text-[11px] border border-lime-400/30 transition-colors flex items-center gap-1">
                      <span>INSPECT</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
