'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  Zap, 
  Battery, 
  Gauge, 
  MapPin, 
  RotateCcw,
  Bike as BikeIcon,
  ChevronDown,
  Filter
} from 'lucide-react';
import { BIKES_DATA } from '../data/bikes';
import { BikeCard } from '../components/BikeCard';
import { useAppContext } from '../context/AppContext';
import { Bike, BikeCategory, FilterState } from '../types';
import { matchesBatteryVoltageFilter } from '../lib/batteryUtils';

interface ShopProps {
  onSelectBike?: (bike: Bike) => void;
  initialSearchQuery?: string;
}

export const Shop: React.FC<ShopProps> = ({ onSelectBike, initialSearchQuery = '' }) => {
  const { setSelectedBike } = useAppContext();
  const handleSelectBike = onSelectBike || setSelectedBike;
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FilterState>({
    search: initialSearchQuery,
    category: (searchParams?.get('category') as BikeCategory) || 'all',
    minMotorKW: 0,
    maxMotorKW: 70,
    minRangeMiles: 0,
    minBatteryVoltage: 0,
    maxWeightLbs: 300,
    minPrice: 0,
    maxPrice: 20000,
    sortBy: 'featured'
  });

  useEffect(() => {
    const cat = searchParams?.get('category') as BikeCategory;
    if (cat && cat !== filters.category) {
      setFilters(prev => ({ ...prev, category: cat }));
    }
  }, [searchParams]);

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Main Category list
  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'electric-dirt-bikes', label: 'Electric Dirt Bikes' },
    { id: 'e-bikes', label: 'E-Bikes' },
    { id: 'accessories', label: 'Accessories & Batteries' }
  ];

  // Filtering Logic
  const filteredBikes = useMemo(() => {
    return BIKES_DATA.filter((bike) => {
      // Text search
      if (filters.search) {
        const queryTerms = filters.search.toLowerCase().trim().split(/\s+/).filter(Boolean);
        const searchableText = [
          bike.name,
          bike.tagline,
          bike.description,
          bike.category,
          bike.categoryLabel,
          bike.specs.batteryCapacity,
          bike.specs.frameType,
          bike.specs.brakes,
          bike.specs.suspension,
          bike.specs.wheelSize,
          bike.specs.seatCapacity || '',
          ...(bike.features || [])
        ].join(' ').toLowerCase();

        const matchesAllTerms = queryTerms.every(term => {
          if (term === '2-seater' || term === '2seater' || term === 'twoseater' || term === '2seat' || term === '2-seat') {
            return bike.isTwoSeater || searchableText.includes('2') || searchableText.includes('sit') || searchableText.includes('passenger');
          }
          return searchableText.includes(term);
        });

        if (!matchesAllTerms) return false;
      }

      // Category filter
      if (filters.category === 'accessories') {
        if (bike.category !== 'accessories' && bike.category !== 'battery') return false;
      } else if (filters.category !== 'all') {
        if (bike.category !== filters.category) return false;
      }

      // Motor Power (kW) - skip for general accessories unless explicitly filtering bikes
      if (filters.category !== 'accessories' && bike.specs.peakPowerKW < filters.minMotorKW) return false;

      // Battery Voltage (Bikes & Standalone Battery Packs)
      if (filters.minBatteryVoltage > 0) {
        if (!matchesBatteryVoltageFilter(bike, filters.minBatteryVoltage)) return false;
      }

      // Range (Miles) - skip for general accessories
      if (filters.category !== 'accessories' && bike.specs.rangeMilesMax < filters.minRangeMiles) return false;

      // Weight (lbs)
      if (bike.specs.weightLbs > filters.maxWeightLbs) return false;

      // Price
      if (bike.price < filters.minPrice || bike.price > filters.maxPrice) return false;

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'power-desc') return b.specs.peakPowerKW - a.specs.peakPowerKW;
      if (filters.sortBy === 'range-desc') return b.specs.rangeMilesMax - a.specs.rangeMilesMax;
      if (filters.sortBy === 'rating-desc') return b.rating - a.rating;
      return (a.featuredOrder || 99) - (b.featuredOrder || 99);
    });
  }, [filters]);

  const resetFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      minMotorKW: 0,
      maxMotorKW: 70,
      minRangeMiles: 0,
      minBatteryVoltage: 0,
      maxWeightLbs: 300,
      minPrice: 0,
      maxPrice: 20000,
      sortBy: 'featured'
    });
  };

  const hasActiveFilters = 
    filters.search !== '' ||
    filters.category !== 'all' ||
    filters.minMotorKW > 0 ||
    filters.minRangeMiles > 0 ||
    filters.minBatteryVoltage > 0 ||
    filters.maxWeightLbs < 300 ||
    filters.sortBy !== 'featured';

  return (
    <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-[#0B0B0B]">
      
      {/* Shop Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <span className="text-xs font-mono font-black uppercase tracking-widest text-lime-400">FACTORY DIRECT E-MOTO ARMORY</span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mt-1 uppercase tracking-tight font-sans">
            HIGH-OUTPUT ELECTRIC MACHINES
          </h1>
          <p className="text-xs text-zinc-400 max-w-xl mt-1">
            Browse our entire lineup. Filter by peak motor output (kW), battery voltage (60V/72V/80V), trail range, and curb weight.
          </p>
        </div>

        {/* Search Bar Input */}
        <div className="relative min-w-[280px]">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by model, 2-seater, battery..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 font-mono"
          />
          {filters.search && (
            <button
              onClick={() => setFilters({ ...filters, search: '' })}
              className="absolute right-3 top-2.5 text-zinc-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Layout: Desktop Sidebar Filters + 4-Column Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* DESKTOP FILTER SIDEBAR */}
        <div className="hidden lg:block lg:col-span-3 space-y-6 bg-zinc-950 p-5 rounded-xl border border-zinc-800 h-fit">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="font-black text-xs uppercase tracking-wider text-white font-mono flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-lime-400" />
              SEARCH FILTERS
            </h3>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[10px] text-lime-400 font-mono font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> CLEAR
              </button>
            )}
          </div>

          {/* 1. Category Filter */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono font-black uppercase tracking-wider text-zinc-400">CATEGORY</label>
            <div className="space-y-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilters({ ...filters, category: cat.id as any })}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer font-sans uppercase flex items-center justify-between ${
                    filters.category === cat.id
                      ? 'bg-lime-400 text-zinc-950 font-black shadow-md shadow-lime-400/20'
                      : 'text-zinc-300 bg-zinc-900/60 border border-zinc-800/80 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. SPEC FILTER: MOTOR POWER (kW) */}
          <div className="space-y-2 pt-3 border-t border-zinc-800">
            <div className="flex justify-between items-center text-xs">
              <label className="font-mono text-[10px] font-black uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-lime-400" /> MOTOR POWER (kW)
              </label>
              <span className="font-mono text-lime-400 font-bold">{filters.minMotorKW > 0 ? `${filters.minMotorKW}kW+` : 'Any'}</span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              step="3"
              value={filters.minMotorKW}
              onChange={(e) => setFilters({ ...filters, minMotorKW: Number(e.target.value) })}
              className="w-full accent-lime-400 bg-zinc-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
              <span>0 kW</span>
              <span>12 kW</span>
              <span>60 kW</span>
            </div>
          </div>

          {/* 3. SPEC FILTER: BATTERY VOLTAGE */}
          <div className="space-y-2.5 pt-3 border-t border-zinc-800">
            <div className="flex justify-between items-center text-xs">
              <label className="font-mono text-[10px] font-black uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Battery className="w-3.5 h-3.5 text-lime-400" />
                <span>BATTERY & PACK VOLTAGE</span>
              </label>
              {filters.minBatteryVoltage > 0 && (
                <span className="text-[10px] font-mono text-lime-400 font-bold bg-lime-400/10 px-1.5 py-0.5 rounded border border-lime-400/30">
                  {filters.minBatteryVoltage === 80 ? '80V+' : `${filters.minBatteryVoltage}V`}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-1.5 font-mono">
              {[
                { v: 0, label: 'ALL VOLTS' },
                { v: 48, label: '48V NOMINAL' },
                { v: 60, label: '60V E-MOTO' },
                { v: 72, label: '72V RACE' },
                { v: 80, label: '80V+ ULTRA' }
              ].map(({ v, label }) => {
                const isSelected = filters.minBatteryVoltage === v;
                return (
                  <button
                    key={v}
                    onClick={() => setFilters({ ...filters, minBatteryVoltage: v })}
                    className={`px-2.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex flex-col justify-center items-start text-left ${
                      isSelected
                        ? 'bg-lime-400 text-zinc-950 font-black shadow-md shadow-lime-400/20 border border-lime-400'
                        : 'bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white'
                    }`}
                  >
                    <span className="text-[11px] font-mono leading-none">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. SPEC FILTER: TRAIL RANGE (MILES) */}
          <div className="space-y-2 pt-3 border-t border-zinc-800">
            <div className="flex justify-between items-center text-xs">
              <label className="font-mono text-[10px] font-black uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-lime-400" /> MINIMUM RANGE
              </label>
              <span className="font-mono text-lime-400 font-bold">{filters.minRangeMiles > 0 ? `${filters.minRangeMiles} Mi+` : 'Any'}</span>
            </div>
            <input
              type="range"
              min="0"
              max="90"
              step="10"
              value={filters.minRangeMiles}
              onChange={(e) => setFilters({ ...filters, minRangeMiles: Number(e.target.value) })}
              className="w-full accent-lime-400 bg-zinc-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
              <span>0 Mi</span>
              <span>45 Mi</span>
              <span>90 Mi</span>
            </div>
          </div>

          {/* 5. SPEC FILTER: MAX WEIGHT (LBS) */}
          <div className="space-y-2 pt-3 border-t border-zinc-800">
            <div className="flex justify-between items-center text-xs">
              <label className="font-mono text-[10px] font-black uppercase tracking-wider text-zinc-400">MAX CURB WEIGHT</label>
              <span className="font-mono text-lime-400 font-bold">{filters.maxWeightLbs < 300 ? `< ${filters.maxWeightLbs} lbs` : 'Any'}</span>
            </div>
            <input
              type="range"
              min="100"
              max="300"
              step="20"
              value={filters.maxWeightLbs}
              onChange={(e) => setFilters({ ...filters, maxWeightLbs: Number(e.target.value) })}
              className="w-full accent-lime-400 bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>

        </div>

        {/* PRODUCT GRID (ALWAYS CARRIES 4 PRODUCTS IN ROW ON DESKTOP) & SORT CONTROLS */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Top Sort & Mobile Filter Toggle Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-zinc-950 p-4 rounded-xl border border-zinc-800">
            <div className="text-xs text-zinc-400 font-mono">
              SHOWING <span className="text-lime-400 font-black">{filteredBikes.length}</span> HIGH-OUTPUT MACHINE(S)
            </div>

            <div className="flex items-center gap-3 font-mono">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden px-3.5 py-2 rounded-lg bg-zinc-900 text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer border border-zinc-800"
              >
                <SlidersHorizontal className="w-4 h-4 text-lime-400" />
                FILTERS
              </button>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-zinc-400 hidden sm:inline">SORT BY:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                  className="bg-zinc-900 border border-zinc-800 text-white rounded-lg px-3 py-2 text-xs font-bold focus:outline-none focus:border-lime-400 font-mono"
                >
                  <option value="featured">FEATURED / TOP SELLERS</option>
                  <option value="power-desc">MOTOR POWER: HIGH TO LOW</option>
                  <option value="range-desc">BATTERY RANGE: HIGH TO LOW</option>
                  <option value="price-asc">PRICE: LOW TO HIGH</option>
                  <option value="price-desc">PRICE: HIGH TO LOW</option>
                  <option value="rating-desc">HIGHEST RIDER RATING</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filter Badges */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
              <span className="text-zinc-500 font-bold uppercase text-[10px]">ACTIVE FILTERS:</span>
              {filters.category !== 'all' && (
                <span className="px-2.5 py-1 rounded-md bg-zinc-900 text-lime-400 border border-zinc-800 font-bold flex items-center gap-1">
                  CATEGORY: {filters.category.toUpperCase()}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters({ ...filters, category: 'all' })} />
                </span>
              )}
              {filters.minMotorKW > 0 && (
                <span className="px-2.5 py-1 rounded-md bg-zinc-900 text-lime-400 border border-zinc-800 font-bold flex items-center gap-1">
                  MOTOR: {filters.minMotorKW}kW+
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters({ ...filters, minMotorKW: 0 })} />
                </span>
              )}
              {filters.minBatteryVoltage > 0 && (
                <span className="px-2.5 py-1 rounded-md bg-zinc-900 text-lime-400 border border-zinc-800 font-bold flex items-center gap-1">
                  BATTERY: {filters.minBatteryVoltage}V+
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters({ ...filters, minBatteryVoltage: 0 })} />
                </span>
              )}
              {filters.minRangeMiles > 0 && (
                <span className="px-2.5 py-1 rounded-md bg-zinc-900 text-lime-400 border border-zinc-800 font-bold flex items-center gap-1">
                  RANGE: {filters.minRangeMiles}MI+
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters({ ...filters, minRangeMiles: 0 })} />
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-xs text-zinc-400 hover:text-white underline cursor-pointer ml-2"
              >
                CLEAR ALL
              </button>
            </div>
          )}

          {/* Products Grid: ALWAYS 4 PRODUCTS IN A ROW ON DESKTOP / LARGE SCREENS */}
          {filteredBikes.length === 0 ? (
            <div className="p-12 text-center bg-zinc-950 rounded-xl border border-zinc-800 space-y-4">
              <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto text-zinc-500">
                <BikeIcon className="w-8 h-8 text-lime-400" />
              </div>
              <div>
                <h3 className="font-black text-base text-white uppercase font-mono">NO PRODUCTS AVAILABLE</h3>
                <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
                  Check back later for new inventory.
                </p>
              </div>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-lg bg-lime-400 hover:bg-lime-300 text-zinc-950 font-black text-xs uppercase cursor-pointer font-mono"
              >
                RESET ALL FILTERS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5">
              {filteredBikes.map((bike) => (
                <BikeCard key={bike.id} bike={bike} onSelectBike={handleSelectBike} />
              ))}
            </div>
          )}

        </div>

      </div>

      {/* MOBILE FILTER MODAL DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm lg:hidden flex justify-end">
          <div className="w-full max-w-xs bg-zinc-950 h-full p-6 border-l border-zinc-800 overflow-y-auto space-y-6 text-white font-sans">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h3 className="font-black text-sm uppercase font-mono flex items-center gap-2">
                <Filter className="w-4 h-4 text-lime-400" /> SEARCH FILTERS
              </h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-zinc-400 uppercase">Category</label>
              <div className="space-y-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setFilters({ ...filters, category: cat.id as any });
                      setMobileFilterOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold font-sans uppercase transition-all ${
                      filters.category === cat.id
                        ? 'bg-lime-400 text-zinc-950 font-black'
                        : 'bg-zinc-900 text-zinc-300 border border-zinc-800'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Motor Power */}
            <div className="space-y-2 pt-4 border-t border-zinc-800">
              <div className="flex justify-between text-xs font-mono">
                <label className="text-zinc-400 font-bold">MOTOR (kW)</label>
                <span className="text-lime-400 font-bold">{filters.minMotorKW > 0 ? `${filters.minMotorKW}kW+` : 'Any'}</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                step="3"
                value={filters.minMotorKW}
                onChange={(e) => setFilters({ ...filters, minMotorKW: Number(e.target.value) })}
                className="w-full accent-lime-400"
              />
            </div>

            {/* Mobile Battery & Pack Voltage */}
            <div className="space-y-2 pt-4 border-t border-zinc-800">
              <label className="text-xs font-mono font-bold text-zinc-400 uppercase flex items-center gap-1.5">
                <Battery className="w-3.5 h-3.5 text-lime-400" />
                <span>BATTERY & PACK VOLTAGE</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5 font-mono">
                {[
                  { v: 0, label: 'ALL VOLTS' },
                  { v: 48, label: '48V NOMINAL' },
                  { v: 60, label: '60V E-MOTO' },
                  { v: 72, label: '72V RACE' },
                  { v: 80, label: '80V+ ULTRA' }
                ].map(({ v, label }) => {
                  const isSelected = filters.minBatteryVoltage === v;
                  return (
                    <button
                      key={v}
                      onClick={() => setFilters({ ...filters, minBatteryVoltage: v })}
                      className={`px-2.5 py-2 rounded-lg text-xs font-bold transition-all flex flex-col justify-center items-start text-left ${
                        isSelected
                          ? 'bg-lime-400 text-zinc-950 font-black'
                          : 'bg-zinc-900 border border-zinc-800 text-zinc-300'
                      }`}
                    >
                      <span className="text-[11px] font-mono leading-none">{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="pt-6 space-y-2 border-t border-zinc-800">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-lime-400 text-zinc-950 font-black text-xs uppercase rounded-lg font-mono"
              >
                SHOW {filteredBikes.length} RESULTS
              </button>
              <button
                onClick={() => {
                  resetFilters();
                  setMobileFilterOpen(false);
                }}
                className="w-full py-2 bg-zinc-900 text-zinc-400 font-bold text-xs uppercase rounded-lg font-mono"
              >
                RESET FILTERS
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Shop;
