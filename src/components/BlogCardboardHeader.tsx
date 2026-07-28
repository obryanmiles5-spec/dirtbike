'use client';

import React from 'react';
import { BlogPost } from '@/data/blogs';
import { Zap, Cpu, Wrench, ShieldCheck, Compass, Layers, Award, Flame, FileText } from 'lucide-react';

interface BlogCardboardHeaderProps {
  post: BlogPost;
  index?: number;
  compact?: boolean;
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'Battery & Tech': Cpu,
  'Trail Guides': Compass,
  'Maintenance': Wrench,
  'Street Legal': ShieldCheck,
  'Comparisons': Layers,
  'Buyer Guides': Award,
  'Pit Bikes': Zap,
  'Laws & Regulations': ShieldCheck,
  'Speed & Specs': Flame,
};

const CATEGORY_TAGS: Record<string, string> = {
  'blog-72v-vs-80v': '72V / 80V ARCHITECTURE • FOC SINE-WAVE',
  'blog-trail-prep-guide': 'BACKCOUNTRY SINGLETRACK • REGEN BRAKING',
  'blog-maintenance-checklist': 'ZERO OIL / ZERO VALVES • 90% SAVINGS',
  'blog-street-legal-conversion': 'DOT LIGHT KIT • MSO TITLE DMV',
  'blog-surron-vs-voltx': '12.5kW PEAK • 65+ MPH GPS TEST',
  'blog-best-electric-dirt-bikes-2026': '2026 ADULT E-MOTO BUYER GUIDE',
  'blog-stark-varg-vs-e-motos': '80HP MOTOCROSS vs 130LB TRAIL',
  'blog-electric-mini-pit-bikes': 'YOUTH SPEED LIMITER • BACKYARD SHRED',
  'blog-lithium-battery-care': 'BMS BALANCING • 21700 NMC CELLS',
  'blog-rawrr-mantis-vs-surron': 'TRIPLE MATCHUP • UNDER $4,500',
  'blog-e-dirt-bike-laws-usa': '50-STATE DMV REGULATION GUIDE',
  'blog-50mph-fastest-ebikes': '50+ MPH HIGH-OUTPUT DUAL SPORT',
};

export const BlogCardboardHeader: React.FC<BlogCardboardHeaderProps> = ({ post, index, compact = false }) => {
  const IconComponent = CATEGORY_ICONS[post.category] || FileText;
  const specTag = CATEGORY_TAGS[post.id] || 'VOLT-X POWERTRAIN LABS';
  const postIndexNumber = index !== undefined ? String(index + 1).padStart(2, '0') : 'SPEC';

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-5 sm:p-6 flex flex-col justify-between border border-zinc-800/90 overflow-hidden select-none rounded-xl">
      {/* Cardboard Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#a3e635 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '16px 16px, 32px 32px, 32px 32px'
        }}
      />

      {/* Diagonal Watermark Text */}
      <div className="absolute -right-6 -bottom-6 text-zinc-900/60 font-mono font-black text-6xl sm:text-8xl tracking-tighter uppercase pointer-events-none">
        VOLT-X
      </div>

      {/* Top Header Row */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-lime-400/10 border border-lime-400/30 flex items-center justify-center text-lime-400 shrink-0">
            <IconComponent className="w-4 h-4" />
          </div>
          <span className="font-mono text-[10px] sm:text-xs font-bold text-lime-400 tracking-wider uppercase bg-lime-950/80 border border-lime-500/30 px-2.5 py-1 rounded-md">
            {post.category}
          </span>
        </div>

        <div className="font-mono text-[10px] sm:text-xs font-black text-zinc-400 bg-zinc-900/90 border border-zinc-800 px-2.5 py-1 rounded">
          GUIDE #{postIndexNumber}
        </div>
      </div>

      {/* Center Spec Title Cardboard Box */}
      <div className="relative z-10 my-auto py-3">
        <div className="inline-block bg-zinc-900/90 border-l-2 border-lime-400 px-3 py-1 mb-2 rounded-r">
          <span className="font-mono text-[10px] sm:text-xs text-lime-300/90 font-bold uppercase tracking-widest">
            {specTag}
          </span>
        </div>
        <h3 className={`font-black text-white uppercase tracking-tight font-sans line-clamp-2 ${compact ? 'text-base sm:text-lg' : 'text-lg sm:text-2xl'}`}>
          {post.title}
        </h3>
      </div>

      {/* Bottom Technical Bar */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-zinc-800/80 font-mono text-[10px] text-zinc-400">
        <span className="uppercase tracking-wider">VOLT-X ENGINEERING LABS</span>
        <span className="text-lime-400 font-bold">{post.readTime}</span>
      </div>
    </div>
  );
};
