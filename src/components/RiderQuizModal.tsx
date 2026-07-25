'use client';

import React, { useState } from 'react';
import { X, Zap, Compass, CheckCircle2, ArrowRight, RotateCcw } from 'lucide-react';
import { BIKES_DATA } from '../data/bikes';
import { Bike } from '../types';

interface RiderQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBike: (bike: Bike) => void;
}

export const RiderQuizModal: React.FC<RiderQuizModalProps> = ({
  isOpen,
  onClose,
  onSelectBike
}) => {
  const [step, setStep] = useState(1);
  const [terrain, setTerrain] = useState<'trail' | 'track' | 'street' | 'youth' | 'two_seater'>('trail');
  const [rangeReq, setRangeReq] = useState<'short' | 'medium' | 'extreme'>('medium');
  const [powerLevel, setPowerLevel] = useState<'light' | 'heavy' | 'monster'>('heavy');

  if (!isOpen) return null;

  // Algorithm to pick best matching bike
  const getRecommendedBike = (): Bike => {
    if (terrain === 'two_seater') {
      return BIKES_DATA.find(b => b.id === 'volttrail-duo' || b.isTwoSeater) || BIKES_DATA[0];
    }
    if (terrain === 'youth') {
      return BIKES_DATA.find(b => b.category === 'youth_stealth') || BIKES_DATA[0];
    }
    if (terrain === 'street') {
      return BIKES_DATA.find(b => b.id === 'lbx-road' || b.category === 'urban_supermoto') || BIKES_DATA[0];
    }
    if (powerLevel === 'monster' || terrain === 'track') {
      return BIKES_DATA.find(b => b.id === 'stark-mx' || b.id === 'eride-pro-3') || BIKES_DATA[0];
    }
    if (powerLevel === 'light') {
      return BIKES_DATA.find(b => b.id === 'lbx') || BIKES_DATA[0];
    }
    return BIKES_DATA.find(b => b.id === 'eride-pro-ss-2' || b.id === 'ultra-bee') || BIKES_DATA[0];
  };

  const recommendedBike = getRecommendedBike();

  const resetQuiz = () => {
    setStep(1);
    setTerrain('trail');
    setRangeReq('medium');
    setPowerLevel('heavy');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-zinc-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-auto text-white p-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-cyan-500/10 rounded-xl text-cyan-400">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-white">Interactive Bike Finder Quiz</h3>
            <p className="text-xs text-zinc-400">Step {step} of 3</p>
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-white">Question 1: Where do you plan to ride most?</h4>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => { setTerrain('trail'); setStep(2); }}
                className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-cyan-500 text-left transition-all cursor-pointer group"
              >
                <div className="font-bold text-xs text-white group-hover:text-cyan-400">Backcountry Trails & Woods</div>
                <p className="text-[10px] text-zinc-400 mt-1">Singletrack, log hops, and mountain climbs.</p>
              </button>

              <button
                onClick={() => { setTerrain('track'); setStep(2); }}
                className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-cyan-500 text-left transition-all cursor-pointer group"
              >
                <div className="font-bold text-xs text-white group-hover:text-cyan-400">MX Motocross Tracks</div>
                <p className="text-[10px] text-zinc-400 mt-1">High jumps, berms, and aggressive racing.</p>
              </button>

              <button
                onClick={() => { setTerrain('street'); setStep(2); }}
                className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-cyan-500 text-left transition-all cursor-pointer group"
              >
                <div className="font-bold text-xs text-white group-hover:text-cyan-400">Urban & Street Supermoto</div>
                <p className="text-[10px] text-zinc-400 mt-1">Street legal commute with dual-sport agility.</p>
              </button>

              <button
                onClick={() => { setTerrain('youth'); setStep(2); }}
                className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-cyan-500 text-left transition-all cursor-pointer group"
              >
                <div className="font-bold text-xs text-white group-hover:text-cyan-400">Youth / Beginner Kid Rider</div>
                <p className="text-[10px] text-zinc-400 mt-1">Ages 8-15 with safety governor limits.</p>
              </button>

              <button
                onClick={() => { setTerrain('two_seater'); setStep(2); }}
                className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 hover:border-emerald-400 text-left transition-all cursor-pointer group col-span-2"
              >
                <div className="font-bold text-xs text-emerald-300 group-hover:text-emerald-200">2-Seater / Riding with a Passenger</div>
                <p className="text-[10px] text-zinc-300 mt-1">Dual sit carrier bench, rear passenger pegs & 450 lbs load capacity.</p>
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-white">Question 2: What is your desired battery range per charge?</h4>
            <div className="space-y-2.5">
              <button
                onClick={() => { setRangeReq('short'); setStep(3); }}
                className="w-full p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-cyan-500 text-left transition-all cursor-pointer flex justify-between items-center"
              >
                <div>
                  <div className="font-bold text-xs text-white">35 to 50 Miles</div>
                  <p className="text-[10px] text-zinc-400">Standard 60V battery pack, light & agile.</p>
                </div>
                <span className="font-mono text-xs text-cyan-400 font-bold">Quick Rides</span>
              </button>

              <button
                onClick={() => { setRangeReq('medium'); setStep(3); }}
                className="w-full p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-cyan-500 text-left transition-all cursor-pointer flex justify-between items-center"
              >
                <div>
                  <div className="font-bold text-xs text-white">50 to 75 Miles</div>
                  <p className="text-[10px] text-zinc-400">72V high-capacity 45Ah swappable battery.</p>
                </div>
                <span className="font-mono text-xs text-cyan-400 font-bold">All-Day Trail</span>
              </button>

              <button
                onClick={() => { setRangeReq('extreme'); setStep(3); }}
                className="w-full p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-cyan-500 text-left transition-all cursor-pointer flex justify-between items-center"
              >
                <div>
                  <div className="font-bold text-xs text-white">75 to 90+ Miles</div>
                  <p className="text-[10px] text-zinc-400">400V 6.0kWh ultra-dense battery monster pack.</p>
                </div>
                <span className="font-mono text-xs text-cyan-400 font-bold">Maximum Endurance</span>
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-white">Question 3: How much motor power / acceleration do you crave?</h4>
            <div className="space-y-2.5">
              <button
                onClick={() => { setPowerLevel('light'); setStep(4); }}
                className="w-full p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-cyan-500 text-left transition-all cursor-pointer flex justify-between items-center"
              >
                <div>
                  <div className="font-bold text-xs text-white">Light & Easy (3kW - 6kW)</div>
                  <p className="text-[10px] text-zinc-400">Smooth, manageable acceleration for relaxed fun.</p>
                </div>
                <span className="font-mono text-xs text-cyan-400 font-bold">48 MPH Top</span>
              </button>

              <button
                onClick={() => { setPowerLevel('heavy'); setStep(4); }}
                className="w-full p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-cyan-500 text-left transition-all cursor-pointer flex justify-between items-center"
              >
                <div>
                  <div className="font-bold text-xs text-white">Aggressive Trail Punch (12kW - 22kW)</div>
                  <p className="text-[10px] text-zinc-400">Furious instant wheel lift for steep hill climbs.</p>
                </div>
                <span className="font-mono text-xs text-cyan-400 font-bold">65-75 MPH Top</span>
              </button>

              <button
                onClick={() => { setPowerLevel('monster'); setStep(4); }}
                className="w-full p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-cyan-500 text-left transition-all cursor-pointer flex justify-between items-center"
              >
                <div>
                  <div className="font-bold text-xs text-white">Extreme MX Racing (60kW / 80HP)</div>
                  <p className="text-[10px] text-zinc-400">Outperforms 450cc gas bikes with 950Nm torque.</p>
                </div>
                <span className="font-mono text-xs text-cyan-400 font-bold">85+ MPH Top</span>
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5 text-center">
            <div className="p-3 bg-cyan-950/60 border border-cyan-500/30 rounded-2xl text-cyan-300 text-xs font-bold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Matching Electric Dirt Bike Recommendation</span>
            </div>

            <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 text-left space-y-3">
              <img src={recommendedBike.image} alt={recommendedBike.name} referrerPolicy="no-referrer" className="w-full h-36 object-cover rounded-xl border border-zinc-800" />
              <div>
                <h4 className="font-black text-lg text-white">{recommendedBike.name}</h4>
                <p className="text-xs text-zinc-400 mt-0.5">{recommendedBike.tagline}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 py-2 border-y border-zinc-800 text-center font-mono text-xs">
                <div>
                  <div className="text-[9px] text-zinc-500 uppercase font-bold">Power</div>
                  <div className="text-cyan-400 font-bold">{recommendedBike.specs.peakPowerKW}kW</div>
                </div>
                <div className="border-x border-zinc-800">
                  <div className="text-[9px] text-zinc-500 uppercase font-bold">Battery</div>
                  <div className="text-white font-bold">{recommendedBike.specs.batteryVoltage}V</div>
                </div>
                <div>
                  <div className="text-[9px] text-zinc-500 uppercase font-bold">Max Range</div>
                  <div className="text-white font-bold">{recommendedBike.specs.rangeMilesMax} mi</div>
                </div>
              </div>

              <div className="flex items-center justify-between font-mono font-black text-lg text-white">
                <span>${recommendedBike.price.toLocaleString()}</span>
                <span className="text-xs font-sans text-cyan-400 font-bold">100% Match</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={resetQuiz}
                className="p-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold cursor-pointer"
                title="Start Over"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  onClose();
                  onSelectBike(recommendedBike);
                }}
                className="flex-1 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Inspect Recommended Bike</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
