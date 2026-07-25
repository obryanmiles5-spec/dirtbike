'use client';

import React, { useState } from 'react';
import { 
  Zap, 
  Battery, 
  Gauge, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Compass, 
  SlidersHorizontal,
  Star,
  CheckCircle2,
  VolumeX,
  Wrench,
  Sparkles,
  ChevronDown,
  Calendar,
  Building2,
  BookOpen,
  Clock,
  User,
  Users,
  Award
} from 'lucide-react';
import { BIKES_DATA } from '../data/bikes';
import { FAQS_DATA } from '../data/faqs';
import { BLOG_POSTS_DATA, BlogPost } from '../data/blogs';
import { BikeCard } from '../components/BikeCard';
import { BlogModal } from '../components/BlogModal';
import { Bike } from '../types';

interface HomeProps {
  onSelectBike: (bike: Bike) => void;
  onNavigateToShop: () => void;
  onOpenQuiz: () => void;
  onOpenTestRide: () => void;
}

export const Home: React.FC<HomeProps> = ({
  onSelectBike,
  onNavigateToShop,
  onOpenQuiz,
  onOpenTestRide
}) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-range');
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);

  const featuredBikes = BIKES_DATA.filter(b => b.isBestSeller || b.featuredOrder).slice(0, 4);
  // Custom instructions mandate exactly 4 FAQs on Homepage
  const homepageFaqs = FAQS_DATA.slice(0, 4);
  // Custom instructions mandate exactly 4 Blog Posts on Homepage
  const homepageBlogs = BLOG_POSTS_DATA.slice(0, 4);

  const categories = [
    {
      id: 'mx-racing',
      name: 'MX Racing (60kW+)',
      tagline: 'Pure competition motocross output',
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600',
      specs: '60kW • 950Nm • 62 MPH'
    },
    {
      id: 'trail-enduro',
      name: 'Trail & Enduro (72V)',
      tagline: 'Lightweight mountain singletrack dominators',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=600',
      specs: '25kW • 75 Mi Range • 138 lbs'
    },
    {
      id: 'street-legal',
      name: 'DOT Street Legal',
      tagline: 'Dual-sport supermotos with VIN titling',
      image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80&w=600',
      specs: 'DOT Headlights • 17-Digit VIN'
    },
    {
      id: 'youth-pit',
      name: 'Youth & Junior Pit',
      tagline: 'Compact high-safety electric dirt bikes',
      image: 'https://images.unsplash.com/photo-1547549082-6bc09f2049ae?auto=format&fit=crop&q=80&w=600',
      specs: 'Adjustable Speed Governor'
    },
    {
      id: '2-seater',
      name: '2-Seater Carrier Benches',
      tagline: 'Extended sit carrier benches for dual passengers',
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=600',
      specs: '450 lbs Payload • Rear Footpegs'
    }
  ];

  return (
    <div className="space-y-16 pb-16 bg-[#0B0B0B]">
      
      {/* 1. HERO SECTION WITH HIGH-OUTPUT VIVID E-MOTO BACKGROUND */}
      <section className="relative min-h-[75vh] sm:min-h-[82vh] flex items-center justify-center overflow-hidden border-b border-zinc-800">
        
        {/* Background Image with High Visibility & Clean Focus */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/d/1xzRvBHE2vH_mzaNj0UXULtoLwaaxk3kF"
            alt="Electric Dirt Bike Hero"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-95 transition-all duration-300 filter brightness-100 contrast-105"
          />
          {/* Subtle directional vignette for text legibility without blocking the bike image */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B]/85 via-[#0B0B0B]/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-[#0B0B0B]/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 sm:py-14 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Text Content Column - Compact & Positioned to preserve full image visibility on mobile */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-3.5">
            
            <p className="text-xs sm:text-sm text-zinc-200 max-w-lg leading-relaxed font-sans drop-shadow">
              Dominate dirt tracks, mountain passes, and backcountry singletrack with up to 60kW peak output, 950Nm torque, and 90 miles of quiet range.
            </p>

            {/* Quick Spec Highlights Strip (60kW / 90Mi / 2.8s) - Positioned lower down on mobile */}
            <div className="grid grid-cols-3 gap-3 pt-16 sm:pt-3 mt-12 sm:mt-0 border-t border-zinc-800/80 font-mono">
              <div>
                <div className="text-xl sm:text-2xl font-black text-white">60 kW</div>
                <div className="text-[10px] text-zinc-300 font-sans font-bold uppercase">Peak Output</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-lime-400">90 Mi</div>
                <div className="text-[10px] text-zinc-300 font-sans font-bold uppercase">Max Range</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-white">2.8s</div>
                <div className="text-[10px] text-zinc-300 font-sans font-bold uppercase">0-50 MPH</div>
              </div>
            </div>

            {/* CTAs - Joined in 1 line divided into 2, placed under the 60kW spec line */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                onClick={onNavigateToShop}
                className="w-full px-2 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-lime-400 hover:bg-lime-300 text-zinc-950 font-black text-[11px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xl shadow-lime-400/20 transition-all cursor-pointer font-mono whitespace-nowrap"
              >
                <span>SHOP MACHINES</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </button>

              <button
                onClick={onOpenQuiz}
                className="w-full px-2 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-white font-mono font-bold text-[11px] sm:text-xs border border-zinc-700/80 flex items-center justify-center gap-1.5 transition-all cursor-pointer backdrop-blur-md whitespace-nowrap"
              >
                <Compass className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                <span>30-SEC QUIZ</span>
              </button>
            </div>

          </div>

          {/* Hero Right Column (Empty to fully display hero bike image) */}
          <div className="lg:col-span-6 xl:col-span-7 hidden lg:block" />

        </div>
      </section>

      {/* 2. CATEGORIES SECTION (Visual Cards Navigating to Product Categories) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <span className="text-xs font-mono font-black uppercase tracking-widest text-lime-400">PRODUCT CATEGORIES</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-1 uppercase tracking-tight">
              EXPLORE E-MOTO POWER CLASSES
            </h2>
          </div>

          <button
            onClick={onNavigateToShop}
            className="text-xs font-mono font-bold text-lime-400 hover:text-lime-300 flex items-center gap-1 cursor-pointer"
          >
            <span>BROWSE ALL CATEGORIES</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Visual Cards Grid / Horizontal Scroll on Mobile */}
        <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-5 overflow-x-auto pb-4 sm:pb-0 scrollbar-none snap-x">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={onNavigateToShop}
              className="min-w-[210px] sm:min-w-0 flex-1 flex flex-col group cursor-pointer snap-start"
            >
              {/* WooCommerce 1:1 Aspect Ratio Image Banner */}
              <div className="w-full aspect-square relative rounded-xl overflow-hidden border border-zinc-800/90 group-hover:border-lime-400 transition-all shadow-lg bg-zinc-900 shrink-0">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Title & Info Card Separated Under Banner */}
              <div className="mt-2.5 p-3.5 bg-zinc-950/90 rounded-xl border border-zinc-800/80 group-hover:border-zinc-700 transition-colors space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-black text-white uppercase font-mono group-hover:text-lime-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-zinc-400 font-sans line-clamp-2 mt-1 leading-tight">{cat.tagline}</p>
                </div>

                <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono font-bold text-lime-400">
                  <span>{cat.specs}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-lime-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2.5 FEATURED E-MOTO SPOTLIGHT (Under Categories) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden border border-zinc-800/90 bg-zinc-950 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Image Column - WooCommerce 1:1 Aspect Ratio / Responsive Frame */}
            <div className="lg:col-span-6">
              <div className="w-full aspect-square relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-xl group">
                <img
                  src="https://lh3.googleusercontent.com/d/1lmtEnYEwwzw9kzH0IfWFfU_dXYFGdhft"
                  alt="Volt-X High Output Electric Dirt Bike Spotlight"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-105 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono bg-zinc-950/85 backdrop-blur-md border border-zinc-800 px-3.5 py-2 rounded-lg text-zinc-300">
                  <span className="text-lime-400 font-bold">VOLT-X APEX EDITION</span>
                  <span>60kW / 950Nm</span>
                </div>
              </div>
            </div>

            {/* Write-Up Column */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-950/80 border border-lime-400/40 text-lime-400 text-[11px] font-mono font-bold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 text-lime-400 fill-lime-400/20" />
                <span>POWERSPORTS ARCHITECTURE</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight font-mono leading-tight">
                ENGINEERED FOR EXTREME BACKCOUNTRY DOMINANCE
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
                Experience unrivaled off-road performance with our flagship electric powersports platform. Engineered with precision aviation-grade alloy framing, advanced thermal management, and ultra-high discharge lithium cells, this machine delivers instantaneous torque directly to the rear wheel without delay, noise, or track emissions.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2 font-mono">
                <div className="p-3.5 bg-zinc-900/80 rounded-xl border border-zinc-800">
                  <div className="text-xs text-zinc-400 uppercase font-bold">Power Delivery</div>
                  <div className="text-sm sm:text-base font-black text-white mt-0.5">Instant Direct Torque</div>
                </div>
                <div className="p-3.5 bg-zinc-900/80 rounded-xl border border-zinc-800">
                  <div className="text-xs text-zinc-400 uppercase font-bold">Chassis Specs</div>
                  <div className="text-sm sm:text-base font-black text-lime-400 mt-0.5">Forged Aircraft Alloy</div>
                </div>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onNavigateToShop}
                  className="px-6 py-3.5 rounded-lg bg-lime-400 hover:bg-lime-300 text-zinc-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 font-mono transition-all shadow-lg shadow-lime-400/20 cursor-pointer"
                >
                  <span>EXPLORE FEATURED MACHINES</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SPEC FILTERS SECTION WITH VIVID E-BIKE BACKGROUND */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden border border-zinc-800 p-6 sm:p-8 shadow-2xl">
          {/* Background Vivid Action Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1547549082-6bc09f2049ae?auto=format&fit=crop&q=80&w=2000"
              alt="Electric Bike Trail Action"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-65 filter contrast-125 saturate-125 brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-zinc-950/50" />
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight flex items-center gap-2 font-mono">
                  <SlidersHorizontal className="w-5 h-5 text-lime-400" />
                  FILTER DIRT BIKES BY BATTERY & MOTOR SPECS
                </h3>
                <p className="text-xs text-zinc-200 mt-1">Browse high-output e-motos tailored to your exact voltage and range demands.</p>
              </div>

              <button
                onClick={onNavigateToShop}
                className="px-5 py-3 rounded-lg bg-lime-400 hover:bg-lime-300 text-zinc-950 font-black text-xs uppercase tracking-wider cursor-pointer shrink-0 font-mono shadow-md"
              >
                OPEN FULL ARMORY SHOP &rarr;
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <button
                onClick={onNavigateToShop}
                className="p-4 rounded-xl bg-zinc-950/90 backdrop-blur-md border border-zinc-800 hover:border-lime-400 text-left transition-all cursor-pointer group shadow-lg"
              >
                <div className="text-[10px] text-zinc-400 font-mono font-bold uppercase">Battery Voltage</div>
                <div className="text-xs sm:text-sm font-black text-white group-hover:text-lime-400 mt-0.5 uppercase">72V & 80V High Volt</div>
              </button>

              <button
                onClick={onNavigateToShop}
                className="p-4 rounded-xl bg-zinc-950/90 backdrop-blur-md border border-zinc-800 hover:border-lime-400 text-left transition-all cursor-pointer group shadow-lg"
              >
                <div className="text-[10px] text-zinc-400 font-mono font-bold uppercase">Motor Power</div>
                <div className="text-xs sm:text-sm font-black text-white group-hover:text-lime-400 mt-0.5 uppercase">12kW - 60kW Peak</div>
              </button>

              <button
                onClick={onNavigateToShop}
                className="p-4 rounded-xl bg-zinc-950/90 backdrop-blur-md border border-zinc-800 hover:border-lime-400 text-left transition-all cursor-pointer group shadow-lg"
              >
                <div className="text-[10px] text-zinc-400 font-mono font-bold uppercase">Trail Range</div>
                <div className="text-xs sm:text-sm font-black text-white group-hover:text-lime-400 mt-0.5 uppercase">70+ Miles / Charge</div>
              </button>

              <button
                onClick={onNavigateToShop}
                className="p-4 rounded-xl bg-zinc-950/90 backdrop-blur-md border border-zinc-800 hover:border-lime-400 text-left transition-all cursor-pointer group shadow-lg"
              >
                <div className="text-[10px] text-zinc-400 font-mono font-bold uppercase">Weight Class</div>
                <div className="text-xs sm:text-sm font-black text-white group-hover:text-lime-400 mt-0.5 uppercase">&lt; 140 lbs Ultra-Light</div>
              </button>

              <button
                onClick={onNavigateToShop}
                className="p-4 rounded-xl bg-lime-950/90 backdrop-blur-md border border-lime-400/50 hover:border-lime-400 text-left transition-all cursor-pointer group col-span-2 sm:col-span-1 shadow-lg"
              >
                <div className="text-[10px] text-lime-400 font-mono font-bold uppercase">2-Seater / Passenger</div>
                <div className="text-xs sm:text-sm font-black text-white group-hover:text-lime-300 mt-0.5 uppercase">Dual Sit Carrier Bench</div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED BEST SELLERS GRID */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <span className="text-xs font-mono font-black uppercase tracking-widest text-lime-400">FEATURED E-MOTO LINEUP</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-1 uppercase tracking-tight">
              TOP PERFORMING ELECTRIC DIRT BIKES
            </h2>
          </div>

          <button
            onClick={onNavigateToShop}
            className="text-xs font-mono font-bold text-lime-400 hover:text-lime-300 flex items-center gap-1 cursor-pointer"
          >
            <span>VIEW ALL MACHINES</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBikes.map((bike) => (
            <BikeCard key={bike.id} bike={bike} onSelectBike={onSelectBike} />
          ))}
        </div>
      </section>

      {/* 5. WHY ELECTRIC VS GAS SECTION WITH VIVID E-MOTO ACTION DISPLAY */}
      <section className="relative py-16 sm:py-20 border-y border-zinc-800 bg-zinc-950/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-black uppercase tracking-widest text-lime-400">ELECTRIC VS GAS MOTOCROSS</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">WHY RIDERS ARE SWITCHING TO VOLT-X</h2>
            <p className="text-xs sm:text-sm text-zinc-300">Say goodbye to dirty oil changes, clogged carburetors, and trail noise bans.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Featured Image Card - 100% Visible & High Definition */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl group aspect-4/3 sm:aspect-16/10 lg:aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200"
                  alt="Rider on Electric Dirt Bike"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-105 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-zinc-950/90 backdrop-blur-md border border-zinc-800 rounded-xl flex items-center justify-between font-mono text-xs text-white">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-lime-400" />
                    <span className="font-bold">ZERO EMISSIONS & SILENT</span>
                  </div>
                  <span className="text-lime-400 font-bold">100% WHEEL TORQUE</span>
                </div>
              </div>
            </div>

            {/* Feature Cards Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
              <div className="p-5 sm:p-6 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2.5 shadow-xl hover:border-lime-400/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-lime-400/10 rounded-lg text-lime-400 shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-black text-white uppercase font-sans">100% Instant Wheel Torque</h3>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  No clutch slip or gear shifting required. Full torque is available from 0 RPM, allowing effortless wheel lifts over obstacles and steep mountain inclines.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2.5 shadow-xl hover:border-lime-400/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-lime-400/10 rounded-lg text-lime-400 shrink-0">
                    <VolumeX className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-black text-white uppercase font-sans">Whisper-Quiet Trail Access</h3>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  Ride early mornings or late evenings without disturbing neighbors. Access restricted forest trails where loud gas exhaust pipes are banned.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2.5 shadow-xl hover:border-lime-400/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-lime-400/10 rounded-lg text-lime-400 shrink-0">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-black text-white uppercase font-sans">90% Less Maintenance</h3>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  No engine oil changes, no spark plugs, no air filters to oil, and no valve adjustments. Just charge the battery, lube the chain, and go shred.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED TRAIL ACTION BANNER (BEFORE REVIEWS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl">
          <div className="relative min-h-[280px] sm:min-h-[380px] w-full overflow-hidden flex items-end">
            <img
              src="https://lh3.googleusercontent.com/d/1tyVP0pv8S4UvaRHB66cS5X-zO_tEjNnU"
              alt="Volt-X Backcountry E-Moto Action"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-105 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-transparent" />
            
            <div className="relative z-10 p-6 sm:p-8 w-full flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-950/90 border border-lime-400/50 text-lime-400 text-[11px] font-mono font-bold uppercase tracking-widest backdrop-blur-md">
                  <Zap className="w-3.5 h-3.5 text-lime-400 fill-lime-400/20" />
                  <span>EXTREME OFF-ROAD TESTING</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight font-mono">
                  PUSHED TO THE LIMITS ON REAL TRAILS
                </h3>
                <p className="text-xs sm:text-sm text-zinc-200 font-sans leading-relaxed drop-shadow">
                  Every VOLT-X machine is field-tested across rocky climbs, deep ruts, and forest singletracks to ensure maximum frame durability, thermal stability, and suspension response.
                </p>
              </div>

              <div className="shrink-0 font-mono">
                <button
                  onClick={onNavigateToShop}
                  className="px-5 py-3 rounded-lg bg-lime-400 hover:bg-lime-300 text-zinc-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-lime-400/20 transition-all cursor-pointer"
                >
                  <span>SEE ALL MODELS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. REAL-TIME TRUSTPILOT REVIEWS WIDGET */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="p-8 rounded-2xl bg-zinc-950/90 border border-zinc-800 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-zinc-800">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-500 text-zinc-950 p-2.5 rounded-xl font-black text-lg font-mono flex items-center gap-1.5">
                <span>4.9</span>
                <Star className="w-5 h-5 fill-zinc-950" />
              </div>
              <div>
                <div className="flex items-center gap-1 text-emerald-400">
                  <Star className="w-4 h-4 fill-emerald-400" />
                  <Star className="w-4 h-4 fill-emerald-400" />
                  <Star className="w-4 h-4 fill-emerald-400" />
                  <Star className="w-4 h-4 fill-emerald-400" />
                  <Star className="w-4 h-4 fill-emerald-400" />
                  <span className="text-xs font-mono font-bold text-white ml-2">TrustScore 4.9 out of 5</span>
                </div>
                <p className="text-xs text-zinc-400 mt-1 font-sans">Based on 1,280+ verified US rider crate orders on Trustpilot</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-emerald-950/50 border border-emerald-500/30 px-3.5 py-2 rounded-lg text-emerald-400 text-xs font-mono font-bold uppercase">
              <CheckCircle2 className="w-4 h-4" />
              <span>VERIFIED BUYER BADGES ENFORCED</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex text-emerald-400 gap-0.5">
                  <Star className="w-4 h-4 fill-emerald-400" />
                  <Star className="w-4 h-4 fill-emerald-400" />
                  <Star className="w-4 h-4 fill-emerald-400" />
                  <Star className="w-4 h-4 fill-emerald-400" />
                  <Star className="w-4 h-4 fill-emerald-400" />
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">2 days ago</span>
              </div>
              <p className="text-xs text-zinc-300 italic leading-relaxed font-sans">
                "Apex 60 delivered to Reno in 3 days. Unboxed the steel crate, attached handlebars, and was roosting dirt within 20 minutes. Torque is unreal."
              </p>
              <div className="text-[11px] font-mono font-bold text-white flex items-center justify-between pt-2 border-t border-zinc-800">
                <span>Marcus V.</span>
                <span className="text-emerald-400 text-[10px]">Verified Buyer</span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex text-emerald-400 gap-0.5">
                  <Star className="w-4 h-4 fill-emerald-400" />
                  <Star className="w-4 h-4 fill-emerald-400" />
                  <Star className="w-4 h-4 fill-emerald-400" />
                  <Star className="w-4 h-4 fill-emerald-400" />
                  <Star className="w-4 h-4 fill-emerald-400" />
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">5 days ago</span>
              </div>
              <p className="text-xs text-zinc-300 italic leading-relaxed font-sans">
                "The Stealth Pro 72 is so lightweight at 138 lbs that loading it onto my SUV rack is a breeze. Passed 65 miles on single charge."
              </p>
              <div className="text-[11px] font-mono font-bold text-white flex items-center justify-between pt-2 border-t border-zinc-800">
                <span>Elena R.</span>
                <span className="text-emerald-400 text-[10px]">Verified Buyer</span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex text-emerald-400 gap-0.5">
                  <Star className="w-4 h-4 fill-emerald-400" />
                  <Star className="w-4 h-4 fill-emerald-400" />
                  <Star className="w-4 h-4 fill-emerald-400" />
                  <Star className="w-4 h-4 fill-emerald-400" />
                  <Star className="w-4 h-4 fill-emerald-400" />
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">1 week ago</span>
              </div>
              <p className="text-xs text-zinc-300 italic leading-relaxed font-sans">
                "Got the 2-seater Cruiser Beast with extended sit carrier bench. Took my son across desert dunes comfortably. Excellent build!"
              </p>
              <div className="text-[11px] font-mono font-bold text-white flex items-center justify-between pt-2 border-t border-zinc-800">
                <span>David K.</span>
                <span className="text-emerald-400 text-[10px]">Verified Buyer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. HOMEPAGE FAQS (EXACTLY 4 FAQS WITH CLEAR VISIBLE FEATURED IMAGE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-black uppercase tracking-widest text-lime-400">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">EVERYTHING YOU NEED TO KNOW</h2>
            <p className="text-xs text-zinc-300 font-sans">Addressing key purchase details before you order your VOLT-X machine.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Dedicated Visible Image Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-xl group aspect-4/3 sm:aspect-16/10 lg:aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=1000"
                  alt="Electric Dirt Bike FAQs"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-105 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-zinc-950/90 backdrop-blur-md border border-zinc-800 rounded-xl flex items-center justify-between font-mono text-xs text-white">
                  <span className="text-lime-400 font-bold">24/7 TECHNICAL SUPPORT</span>
                  <span className="text-zinc-300">MSO TITLE READY</span>
                </div>
              </div>
            </div>

            {/* Accordion List */}
            <div className="lg:col-span-7 space-y-3 font-sans">
              {homepageFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-zinc-900/90 backdrop-blur-md rounded-xl border border-zinc-800 overflow-hidden transition-all shadow-xl"
                  >
                    <button
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      className="w-full p-4.5 text-left font-bold text-xs sm:text-sm text-white flex items-center justify-between gap-3 cursor-pointer hover:bg-zinc-800/80 transition-colors"
                    >
                      <span className="font-mono uppercase">{faq.question}</span>
                      <ChevronDown className={`w-4 h-4 text-lime-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isOpen && (
                      <div className="px-4.5 pb-4.5 text-xs text-zinc-300 leading-relaxed border-t border-zinc-800/80 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 8. BLOG POSTS SECTION (EXACTLY 4 RECENT BLOG POST PREVIEW CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <span className="text-xs font-mono font-black uppercase tracking-widest text-lime-400">POWERTRAIN JOURNAL & GUIDES</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-1 uppercase tracking-tight">
              LATEST E-MOTO BLOG ARTICLES
            </h2>
          </div>

          <span className="text-xs font-mono text-zinc-400 font-bold uppercase">4 RECENT POSTS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {homepageBlogs.map((post) => (
            <div
              key={post.id}
              className="bg-zinc-950/90 rounded-xl border border-zinc-800 overflow-hidden group hover:border-lime-400/80 transition-all flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-3">
                <div className="h-44 relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-lime-400 text-zinc-950 font-black text-[9px] px-2.5 py-1 rounded uppercase tracking-widest font-mono">
                    {post.category}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-3 text-[10px] font-mono text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-lime-400" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-lime-400" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-white uppercase font-sans line-clamp-2 group-hover:text-lime-400 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed font-sans">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <button
                  onClick={() => setSelectedBlogPost(post)}
                  className="w-full py-2.5 rounded bg-zinc-900 hover:bg-zinc-800 text-lime-400 font-mono font-bold text-xs border border-zinc-800 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <span>READ MORE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. 50-STATE FREIGHT & RENO SHOWROOM BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Dedicated Visible Image Card */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-xl group aspect-4/3 sm:aspect-16/10">
                <img
                  src="https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=1200"
                  alt="Electric Dirt Bike Crate Delivery"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-105 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-zinc-950/90 backdrop-blur-md border border-zinc-800 rounded-xl flex items-center justify-between font-mono text-xs text-white">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-lime-400" />
                    <span className="font-bold">HEAVY-DUTY STEEL CRATE</span>
                  </div>
                  <span className="text-lime-400 font-bold">95% PRE-ASSEMBLED</span>
                </div>
              </div>
            </div>

            {/* Information & Action Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-lime-400/20 border border-lime-400/40 text-lime-400 text-xs font-mono font-bold uppercase backdrop-blur-md">
                <Truck className="w-4 h-4" />
                <span>50-STATE DOORSTEP FREIGHT CRATE</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-mono">
                INSURED FACTORY CRATE SHIPMENT
              </h2>

              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">
                Every VOLT-X machine is dyno-tested at our Reno, NV headquarters and shipped in a heavy-duty steel frame crate directly to your garage door. Unbox, install handle bars, and ride in 15 minutes.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onOpenTestRide}
                  className="px-6 py-3.5 rounded-lg bg-lime-400 hover:bg-lime-300 text-zinc-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-lime-400/20 font-mono"
                >
                  <Calendar className="w-4 h-4" />
                  <span>BOOK RENO TEST RIDE</span>
                </button>

                <button
                  onClick={onNavigateToShop}
                  className="px-6 py-3.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 border border-zinc-700 cursor-pointer font-mono"
                >
                  <Building2 className="w-4 h-4 text-lime-400" />
                  <span>EXPLORE STOREFRONT</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Blog Article Reader Modal */}
      <BlogModal
        post={selectedBlogPost}
        onClose={() => setSelectedBlogPost(null)}
        onNavigateToShop={onNavigateToShop}
      />

    </div>
  );
};

export default Home;
