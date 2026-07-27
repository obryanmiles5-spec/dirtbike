'use client';
import React from 'react';
import { 
  Star, 
  ShoppingCart,
  Eye,
  Check
} from 'lucide-react';
import { Bike } from '../types';
import { useCart } from '../context/CartContext';
import { useCompare } from '../context/CompareContext';

interface BikeCardProps {
  bike: Bike;
  onSelectBike: (bike: Bike) => void;
}

export const BikeCard: React.FC<BikeCardProps> = ({ bike, onSelectBike }) => {
  const { addToCart } = useCart();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const isCompared = isInCompare(bike.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(bike);
  };

  return (
    <div 
      onClick={() => onSelectBike(bike)}
      className="group bg-zinc-950 rounded-lg border border-zinc-800 overflow-hidden flex flex-col transition-all duration-200 hover:border-lime-400/60 hover:shadow-lg hover:shadow-lime-400/10 cursor-pointer"
    >
      {/* Product Image Container */}
      <div className="relative aspect-square bg-[#0B0B0B] overflow-hidden">
        <img
          src={bike.image}
          alt={bike.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {bike.originalPrice && (
            <span className="bg-lime-400 text-zinc-950 font-bold text-[10px] uppercase px-2 py-0.5 rounded-sm shadow-sm inline-block w-fit">
              Sale!
            </span>
          )}
          {bike.isBestSeller && (
            <span className="bg-amber-400 text-zinc-950 font-bold text-[10px] uppercase px-2 py-0.5 rounded-sm shadow-sm inline-block w-fit">
              Top Seller
            </span>
          )}
        </div>

        {/* Hover Action */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectBike(bike);
            }}
            className="w-10 h-10 bg-zinc-900 border border-zinc-700 rounded-full flex items-center justify-center text-white shadow-md hover:bg-zinc-800 hover:text-lime-400 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
            title="Quick View"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Category */}
        <p className="text-[11px] text-zinc-500 uppercase font-bold mb-1 tracking-wider">
          {bike.categoryLabel}
        </p>
        
        {/* Title */}
        <h3 className="text-sm font-bold text-white line-clamp-2 mb-2 group-hover:text-lime-400 transition-colors uppercase tracking-tight">
          {bike.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3.5 h-3.5 ${i < Math.round(bike.rating) ? 'fill-amber-400' : 'fill-zinc-800 text-zinc-800'}`} />
            ))}
          </div>
          <span className="text-xs text-zinc-500 font-mono">({bike.reviewCount})</span>
        </div>

        <div className="mt-auto">
          {/* Price */}
          <div className="flex items-center gap-2 mb-4 font-mono">
            {bike.originalPrice && (
              <span className="text-sm text-zinc-500 line-through">
                ${bike.originalPrice.toLocaleString()}
              </span>
            )}
            <span className="text-lg font-black text-white">
              ${bike.price.toLocaleString()}
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-lime-400 hover:bg-lime-300 text-zinc-950 font-black text-xs uppercase tracking-wider rounded transition-colors shadow-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
