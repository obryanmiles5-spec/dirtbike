'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Zap, Battery, Cpu, Gauge, ArrowRight } from 'lucide-react';

interface AboutProps {
  onNavigateToShop?: () => void;
}

export const About: React.FC<AboutProps> = ({ onNavigateToShop }) => {
  const router = useRouter();

  const handleNavigate = () => {
    if (onNavigateToShop) {
      onNavigateToShop();
    } else {
      router.push('/shop');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-white bg-[#0B0B0B]">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono font-black uppercase tracking-widest text-lime-400">UNLEASHING UNTAMED POWER</span>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight">
          THE VOLT-X DOMINANCE
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
          Engineered in Reno, Nevada, VOLT-X was forged by trophy truck racers and electrical engineers with one aggressive goal: engineer high-output electric dirt bikes and passenger bench destroyers that crush traditional 450cc gas bikes in hole-shots, hill climbs, and single-track sprints.
        </p>
      </div>

      {/* Powertrain & Battery Technology Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
          <div className="p-3 bg-lime-400/10 rounded-lg text-lime-400 w-fit">
            <Battery className="w-6 h-6" />
          </div>
          <h3 className="font-black text-sm uppercase text-white font-sans">21700 High-C Cell Armor</h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            High-discharge Samsung 21700 lithium cells encased in CNC-machined aluminum battery armor with smart thermal cooling.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
          <div className="p-3 bg-lime-400/10 rounded-lg text-lime-400 w-fit">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="font-black text-sm uppercase text-white font-sans">FOC Instant Inverters</h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            Our Field-Oriented Control (FOC) controllers deliver sub-millisecond throttle response and 98% direct-drive efficiency.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
          <div className="p-3 bg-lime-400/10 rounded-lg text-lime-400 w-fit">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="font-black text-sm uppercase text-white font-sans">Dynamic Regenerative Brakes</h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            Thumb-actuated regenerative braking recharges up to 15% kinetic power during steep descent braking on mountain passes.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
          <div className="p-3 bg-lime-400/10 rounded-lg text-lime-400 w-fit">
            <Gauge className="w-6 h-6" />
          </div>
          <h3 className="font-black text-sm uppercase text-white font-sans">Stealth Trail Dominance</h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            Near-silent powertrain operation allows riders to shred state forests and backwoods trails without attracting noise complaints.
          </p>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="p-8 rounded-xl bg-zinc-950 border border-zinc-800 grid grid-cols-1 md:grid-cols-3 gap-8 text-center font-mono">
        <div>
          <div className="text-3xl sm:text-4xl font-black text-lime-400">12,000W+</div>
          <div className="text-xs text-zinc-400 mt-1 uppercase font-sans font-bold">Peak Motor Output</div>
        </div>
        <div>
          <div className="text-3xl sm:text-4xl font-black text-white">$0</div>
          <div className="text-xs text-zinc-400 mt-1 uppercase font-sans font-bold">Gasoline & Oil Maintenance</div>
        </div>
        <div>
          <div className="text-3xl sm:text-4xl font-black text-lime-400">0 - 50 MPH</div>
          <div className="text-xs text-zinc-400 mt-1 uppercase font-sans font-bold">In Under 3.2 Seconds</div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-xl bg-zinc-950 border border-zinc-800 text-center space-y-4">
        <h3 className="text-2xl font-black uppercase tracking-tight">READY TO SHRED THE TRAIL?</h3>
        <p className="text-xs text-zinc-400 max-w-md mx-auto">
          Explore our complete range of 60V, 72V, and 80V high-output electric dirt bikes & dual-sit carrier destroyers.
        </p>
        <Link
          href="/shop"
          className="px-8 py-3.5 rounded-lg bg-lime-400 hover:bg-lime-300 text-zinc-950 font-black text-xs uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-lime-400/20 transition-all"
        >
          <span>SHOP ALL MACHINES</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};

export default About;
