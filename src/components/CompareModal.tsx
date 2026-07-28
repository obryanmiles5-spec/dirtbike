'use client';

import React from 'react';
import { 
  X, 
  Zap, 
  Battery, 
  Gauge, 
  MapPin, 
  Trash2, 
  ShoppingCart, 
  Check, 
  SlidersHorizontal 
} from 'lucide-react';
import { useCompare } from '../context/CompareContext';
import { formatImageUrl } from '../lib/imageUtils';
import { useCart } from '../context/CartContext';
import { Bike } from '../types';

interface CompareModalProps {
  onSelectBike: (bike: Bike) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({ onSelectBike }) => {
  const { compareList, removeFromCompare, clearCompare, isCompareModalOpen, setIsCompareModalOpen } = useCompare();
  const { addToCart } = useCart();

  if (!isCompareModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-zinc-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-white">
        
        {/* Header */}
        <div className="px-6 py-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-xl text-cyan-400">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Side-by-Side Bike Specs Comparison</h3>
              <p className="text-xs text-zinc-400">Comparing {compareList.length} model(s)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {compareList.length > 0 && (
              <button
                onClick={clearCompare}
                className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                Clear All
              </button>
            )}

            <button
              onClick={() => setIsCompareModalOpen(false)}
              className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Table / Grid */}
        <div className="overflow-y-auto p-6 flex-1">
          {compareList.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-zinc-500">
                <SlidersHorizontal className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-white">No Bikes Selected for Comparison</h4>
                <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
                  Click the "Compare" button on any bike card in the shop to compare power, battery, range, and top speeds side by side.
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-[700px] grid grid-cols-5 gap-4 divide-x divide-zinc-800/80">
                
                {/* Spec Labels Column */}
                <div className="space-y-6 pt-28 text-xs font-bold text-zinc-400 pr-2">
                  <div className="h-10 flex items-center">Peak Motor Power</div>
                  <div className="h-10 flex items-center">Battery Pack</div>
                  <div className="h-10 flex items-center">Max Trail Range</div>
                  <div className="h-10 flex items-center">Top Speed</div>
                  <div className="h-10 flex items-center">Curb Weight</div>
                  <div className="h-10 flex items-center">Charge Time</div>
                  <div className="h-10 flex items-center">Vehicle MSRP</div>
                </div>

                {/* Compared Bikes Columns */}
                {compareList.map((bike) => (
                  <div key={bike.id} className="pl-4 space-y-6 flex flex-col justify-between">
                    {/* Bike Header Card */}
                    <div className="h-28 flex flex-col justify-between relative group">
                      <button
                        onClick={() => removeFromCompare(bike.id)}
                        className="absolute top-0 right-0 p-1 bg-zinc-800 rounded-lg text-zinc-400 hover:text-red-400 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-3">
                        <img src={formatImageUrl(bike.image)} alt={bike.name} referrerPolicy="no-referrer" className="w-12 h-12 rounded-xl object-cover border border-zinc-800" />
                        <div>
                          <h4 className="font-bold text-xs text-white line-clamp-1">{bike.name}</h4>
                          <span className="text-[10px] text-cyan-400 font-mono font-bold">{bike.categoryLabel}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setIsCompareModalOpen(false);
                          onSelectBike(bike);
                        }}
                        className="text-[11px] text-zinc-400 hover:text-cyan-400 underline font-medium cursor-pointer text-left"
                      >
                        View Full Specs &rarr;
                      </button>
                    </div>

                    {/* Spec Rows */}
                    <div className="h-10 flex items-center text-xs font-mono font-bold text-cyan-400">
                      {bike.specs.peakPowerKW} kW ({Math.round(bike.specs.peakPowerKW * 1.34)} HP)
                    </div>

                    <div className="h-10 flex items-center text-xs font-mono text-white">
                      {bike.specs.batteryVoltage}V {bike.specs.batteryAh}Ah
                    </div>

                    <div className="h-10 flex items-center text-xs font-mono text-white">
                      {bike.specs.rangeMilesMax} Miles
                    </div>

                    <div className="h-10 flex items-center text-xs font-mono text-white">
                      {bike.specs.topSpeedMph} MPH
                    </div>

                    <div className="h-10 flex items-center text-xs font-mono text-white">
                      {bike.specs.weightLbs} LBS
                    </div>

                    <div className="h-10 flex items-center text-xs font-mono text-white">
                      {bike.specs.chargeTimeHours} Hours
                    </div>

                    <div className="h-10 flex items-center text-sm font-mono font-black text-white">
                      ${bike.price.toLocaleString()}
                    </div>

                    {/* Add to Cart CTA */}
                    <button
                      onClick={() => {
                        addToCart(bike);
                        setIsCompareModalOpen(false);
                      }}
                      className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer mt-4"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Add to Cart
                    </button>
                  </div>
                ))}

              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
