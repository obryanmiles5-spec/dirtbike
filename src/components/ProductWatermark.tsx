'use client';

import React from 'react';

interface ProductWatermarkProps {
  size?: 'sm' | 'md' | 'lg';
  position?: 'overlay' | 'corner' | 'full';
  className?: string;
}

export const ProductWatermark: React.FC<ProductWatermarkProps> = ({
  size = 'md',
  position = 'full',
  className = ''
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden z-10 flex flex-col justify-between p-2 sm:p-3 ${className}`}
      aria-hidden="true"
    >
      {/* Top watermark badge */}
      <div className="flex items-center justify-between w-full opacity-60">
        <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 text-[9px] font-mono font-bold text-lime-400 uppercase tracking-widest shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
          <span>VOLT-X ORIGINAL</span>
        </div>
        <span className="text-[8px] font-mono font-black text-white/30 tracking-widest uppercase">
          RENO NV USA
        </span>
      </div>

      {/* Center diagonal watermark seal */}
      <div className="absolute inset-0 flex items-center justify-center opacity-25 mix-blend-screen pointer-events-none transform -rotate-12">
        <div className="flex flex-col items-center justify-center text-center">
          <img
            src="/voltx-logo-avatar.svg"
            alt=""
            className={`${
              size === 'sm' ? 'w-16 h-16' : size === 'lg' ? 'w-40 h-40' : 'w-24 h-24'
            } filter drop-shadow-[0_0_8px_rgba(163,230,53,0.5)]`}
          />
          <span className="text-[10px] sm:text-xs font-mono font-black tracking-[0.3em] text-lime-400/90 uppercase mt-1">
            VOLT-X MOTORSPORTS
          </span>
        </div>
      </div>

      {/* Bottom watermark copyright signature */}
      <div className="flex items-center justify-between w-full opacity-50">
        <span className="text-[8px] font-mono font-bold text-white/40 tracking-wider">
          © VOLT-X PROPRIETARY
        </span>
        <div className="flex items-center gap-1 text-[8px] font-mono font-black text-lime-400/80 bg-zinc-950/70 px-1.5 py-0.5 rounded border border-lime-400/20">
          <span>AUTHENTIC PRODUCT</span>
        </div>
      </div>
    </div>
  );
};
