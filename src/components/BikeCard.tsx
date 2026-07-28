'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Star, 
  ShoppingCart, 
  Eye, 
  SlidersHorizontal,
  Check
} from 'lucide-react';
import { Bike } from '../types';
import { useCart } from '../context/CartContext';
import { useCompare } from '../context/CompareContext';
import { formatImageUrl } from '../lib/imageUtils';

interface BikeCardProps {
  bike: Bike;
  onSelectBike?: (bike: Bike) => void;
}

export const BikeCard: React.FC<BikeCardProps> = ({ bike, onSelectBike }) => {
  const { addToCart } = useCart();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();

  const isCompared = isInCompare(bike.id);

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCompared) {
      removeFromCompare(bike.id);
    } else {
      addToCompare(bike);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(bike);
  };

  const handleCardClick = () => {
    if (onSelectBike) {
      onSelectBike(bike);
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative bg-[#0B0B0B] rounded-xl border border-zinc-800/90 hover:border-lime-400/60 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-lime-400/10 cursor-pointer"
    >
      {/* Top Badges Overlay */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-1.5 flex-wrap">
          {bike.isTwoSeater && (
            <span className="px-2.5 py-1 rounded-md bg-emerald-500 text-zinc-950 font-black text-[10px] uppercase tracking-wider shadow-md">
              2-SEATER BENCH
            </span>
          )}
          {bike.isBestSeller && (
            <span className="px-2.5 py-1 rounded-md bg-amber-400 text-zinc-950 font-black text-[10px] uppercase tracking-wider shadow-md">
              BEST SELLER
            </span>
          )}
          {bike.isNew && (
            <span className="px-2.5 py-1 rounded-md bg-lime-400 text-zinc-950 font-black text-[10px] uppercase tracking-wider shadow-md">
              2026 EDITION
            </span>
          )}
          <span className="px-2.5 py-1 rounded-md bg-zinc-950/90 text-zinc-300 border border-zinc-700/80 text-[10px] font-bold uppercase tracking-wider">
            {bike.categoryLabel}
          </span>
        </div>

        {/* Compare Toggle */}
        <button
          onClick={handleCompareToggle}
          className={`pointer-events-auto flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer ${
            isCompared 
              ? 'bg-lime-400 text-zinc-950' 
              : 'bg-zinc-950/80 hover:bg-zinc-800 text-zinc-300 border border-zinc-700'
          }`}
          title={isCompared ? 'Remove from compare' : 'Compare this bike'}
        >
          {isCompared ? <Check className="w-3 h-3 stroke-[3]" /> : <SlidersHorizontal className="w-3 h-3" />}
          {isCompared ? 'COMPARING' : 'COMPARE'}
        </button>
      </div>

      {/* Product Image Container */}
      <Link href={`/product/${bike.id}`} className="relative aspect-[4/3] bg-zinc-950 overflow-hidden block">
        <img
          src={formatImageUrl(bike.image)}
          alt={bike.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />

        {/* Gradient vignette at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent opacity-90" />

        {/* Hover Quick View Overlay */}
        <div className="absolute inset-0 bg-zinc-950/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <span className="px-4 py-2.5 rounded-lg bg-zinc-900 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 border border-zinc-700 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-all">
            <Eye className="w-4 h-4 text-lime-400" />
            INSPECT SPECS
          </span>
        </div>
      </Link>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs mb-1.5">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="font-bold text-zinc-200">{bike.rating.toFixed(2)}</span>
            <span className="text-zinc-500 font-mono">({bike.reviewCount} reviews)</span>
          </div>

          {/* Title & Tagline */}
          <h3 className="text-lg font-black text-white group-hover:text-lime-400 transition-colors uppercase tracking-tight line-clamp-1">
            <Link href={`/product/${bike.id}`}>
              {bike.name}
            </Link>
          </h3>
          <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
            {bike.tagline}
          </p>
        </div>

        {/* Price & Add to Cart Footer */}
        <div className="flex flex-col gap-3 pt-2 border-t border-zinc-800/80">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white font-mono tracking-tight">
                ${bike.price.toLocaleString()}
              </span>
              {bike.originalPrice && (
                <span className="text-xs text-zinc-500 line-through font-mono">
                  ${bike.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <div className="text-[11px] text-zinc-400 font-medium font-sans flex items-center gap-1 mt-0.5">
              <span className="text-lime-400 font-bold">Free Crate Freight Delivery</span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-lime-400 hover:bg-lime-300 text-zinc-950 font-black text-xs uppercase tracking-wider shadow-md shadow-lime-400/20 transition-all transform active:scale-[0.98] cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>ADD TO CART</span>
          </button>
        </div>
      </div>
    </div>
  );
};
