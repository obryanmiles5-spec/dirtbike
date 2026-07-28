'use client';
import React from 'react';
import { BIKES_DATA } from '../data/bikes';
import { BikeCard } from '../components/BikeCard';
import { useAppContext } from '../context/AppContext';
import { useRouter } from 'next/navigation';
import { TrustPilotSlider } from '../components/TrustPilotSlider';
import { Bike } from '../types';
import { formatImageUrl, handleImageError } from '../lib/imageUtils';

interface HomeProps {
  onSelectBike: (bike: Bike) => void;
  onNavigateToShop?: (category?: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigateToShop }) => {
  const { setSelectedBike } = useAppContext();
  const router = useRouter();
  const featuredBikes = BIKES_DATA.filter(b => b.isBestSeller || b.featuredOrder).slice(0, 4);

  // User provided Google Drive Image URLs
  const heroImageUrl = formatImageUrl("https://drive.google.com/file/d/1u-qBXsWULSLejzlyVcqrMMEBmAcAWVW_/view?usp=sharing");
  const promoBannerUrl = formatImageUrl("https://drive.google.com/file/d/1fWwpbpsHO166xmDquxG46vbeLYyY9Wdx/view?usp=sharing");
  const apexProImageUrl = formatImageUrl("https://drive.google.com/file/d/11YkHk3-AusbvrJMKn7qjOKTutFre_N19/view?usp=sharing");

  // Category Google Drive Image URLs
  const dirtBikesCategoryUrl = formatImageUrl("https://drive.google.com/file/d/1_A1QGYkqUF1KaK1nlkVWvsuOd6T4FFrx/view?usp=sharing");
  const eBikesCategoryUrl = formatImageUrl("https://drive.google.com/file/d/1vHmGS2-Vdhi0Xvu1ccnXE8Xq95odMmQX/view?usp=sharing");
  const accessoriesCategoryUrl = formatImageUrl("https://drive.google.com/file/d/1Jqi-X3WdAL1yPFm9zILMT9h5rkcwWnrp/view?usp=sharing");

  return (
    <div className="flex flex-col">
      <section className="relative w-full min-h-screen bg-zinc-950 flex flex-col items-center justify-center overflow-hidden">
        <img 
          src={heroImageUrl} 
          alt="Untamed Power" 
          onError={(e) => handleImageError(e, '/hero-cover.jpg')}
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent flex flex-col items-center justify-end pb-12 sm:pb-32 text-center px-4">
          <h1 className="text-5xl sm:text-7xl font-black text-white uppercase tracking-tighter mb-6 drop-shadow-lg">
            Untamed Power. <br/> <span className="text-lime-400">Zero Emissions.</span>
          </h1>
          <p className="text-zinc-200 text-sm sm:text-base max-w-2xl font-mono mb-10 drop-shadow">
            The next generation of high-performance electric dirt bikes. Precision engineered for the track, the trail, and the streets.
          </p>
          <button onClick={() => router.push('/shop')} className="px-8 py-4 bg-lime-400 hover:bg-lime-300 text-zinc-950 font-black text-sm uppercase rounded-lg shadow-lg shadow-lime-400/20 transition-transform hover:scale-105 cursor-pointer">
            Shop All Models
          </button>
        </div>
      </section>

      <section className="py-20 bg-zinc-900/50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tight">Shop by Category</h2>
              <p className="text-zinc-400 text-sm font-mono mt-2">Find exactly what you're looking for</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
            <div 
              onClick={() => router.push('/shop?category=electric-dirt-bikes')} 
              className="relative group overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 cursor-pointer p-8 aspect-square flex items-end"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 to-transparent z-10" />
              <img 
                src={dirtBikesCategoryUrl} 
                alt="Electric Dirt Bikes" 
                onError={(e) => handleImageError(e, '/Electric-Dirt-Bikes.webp')}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <h3 className="text-2xl font-black text-white uppercase z-20 relative">Electric Dirt Bikes</h3>
            </div>
            <div 
              onClick={() => router.push('/shop?category=e-bikes')} 
              className="relative group overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 cursor-pointer p-8 aspect-square flex items-end"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 to-transparent z-10" />
              <img 
                src={eBikesCategoryUrl} 
                alt="E-Bikes" 
                onError={(e) => handleImageError(e, '/E-Bikes.jpg')}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <h3 className="text-2xl font-black text-white uppercase z-20 relative">E-Bikes</h3>
            </div>
            <div 
              onClick={() => router.push('/shop?category=accessories')} 
              className="relative group overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 cursor-pointer p-8 aspect-square flex items-end"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 to-transparent z-10" />
              <img 
                src={accessoriesCategoryUrl} 
                alt="Accessories" 
                onError={(e) => handleImageError(e, '/Accessories.png')}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 bg-white" 
              />
              <h3 className="text-2xl font-black text-white uppercase z-20 relative">Accessories</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full h-[60vh] sm:h-[80vh]">
        <img 
          src={promoBannerUrl} 
          alt="Promo Banner" 
          onError={(e) => handleImageError(e, '/promo-banner.jpg')}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <button 
            onClick={() => router.push('/shop')} 
            className="px-8 py-4 bg-lime-400 hover:bg-lime-300 text-zinc-950 font-black text-sm uppercase rounded-lg shadow-lg shadow-lime-400/20 transition-transform hover:scale-105 cursor-pointer"
          >
            Shop All Models
          </button>
        </div>
      </section>

      <section className="py-20 bg-zinc-950 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tight">Featured Models</h2>
              <p className="text-zinc-400 text-sm font-mono mt-2">Our top-performing machines</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBikes.length === 0 ? (
              <div className="col-span-full py-12 text-center border border-dashed border-zinc-800 rounded-xl">
                <p className="text-zinc-500 font-mono text-sm uppercase">No Featured Products Currently</p>
              </div>
            ) : featuredBikes.map((bike) => (
              <BikeCard key={bike.id} bike={bike} onSelectBike={setSelectedBike} />
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-zinc-950 py-20 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white uppercase tracking-tight mb-4">The Apex Pro</h2>
            <p className="text-zinc-400 font-mono text-sm max-w-2xl mx-auto">Engineered to dominate any terrain. The perfect balance of power, agility, and endurance.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Left Column */}
            <div className="order-2 lg:order-1 flex flex-col gap-12 text-center lg:text-right">
              <div>
                <h3 className="text-xl font-bold text-white uppercase mb-2">Instant Torque</h3>
                <p className="text-zinc-400 text-sm">Experience immediate acceleration with our custom-tuned electric motor, delivering peak torque from 0 RPM.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white uppercase mb-2">Aero-Grade Frame</h3>
                <p className="text-zinc-400 text-sm">Ultra-lightweight aluminum alloy frame designed to withstand the harshest jumps without adding bulk.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white uppercase mb-2">Adjustable Suspension</h3>
                <p className="text-zinc-400 text-sm">Fully tunable front and rear shocks for a customized ride feel, adapting instantly to varying track conditions.</p>
              </div>
            </div>
            
            {/* Center Image */}
            <div className="order-1 lg:order-2 flex justify-center relative">
              <div className="absolute inset-0 bg-lime-500/10 rounded-full blur-3xl -z-10 transform scale-75"></div>
              <img 
                src={apexProImageUrl} 
                alt="Apex Pro" 
                onError={(e) => handleImageError(e, '/featured-cover.jpg')}
                className="w-full max-w-md h-auto max-h-[70vh] object-contain mx-auto rounded-xl relative z-10"
              />
            </div>
            
            {/* Right Column */}
            <div className="order-3 flex flex-col gap-12 text-center lg:text-left">
              <div>
                <h3 className="text-xl font-bold text-white uppercase mb-2">Extended Range</h3>
                <p className="text-zinc-400 text-sm">High-capacity lithium-ion battery pack provides up to 60 miles of aggressive trail riding on a single charge.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white uppercase mb-2">Quick Swap Battery</h3>
                <p className="text-zinc-400 text-sm">Get back on the track in seconds. Tool-less battery removal system for endless riding sessions.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white uppercase mb-2">Smart Dash</h3>
                <p className="text-zinc-400 text-sm">High-contrast LED display showing speed, battery life, motor temp, and riding mode at a glance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustPilotSlider />
    </div>
  );
};

