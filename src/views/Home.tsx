'use client';
import React from 'react';
import Link from 'next/link';
import { BIKES_DATA } from '../data/bikes';
import { BLOG_POSTS_DATA } from '../data/blogs';
import { BikeCard } from '../components/BikeCard';
import { BlogCardboardHeader } from '../components/BlogCardboardHeader';
import { useAppContext } from '../context/AppContext';
import { TrustPilotSlider } from '../components/TrustPilotSlider';
import { Bike } from '../types';
import { formatImageUrl, handleImageError } from '../lib/imageUtils';
import { ArrowRight, BookOpen, Calendar, Clock, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQS_DATA } from '../data/faqs';

interface HomeProps {
  onSelectBike?: (bike: Bike) => void;
  onNavigateToShop?: (category?: string) => void;
}

export const Home: React.FC<HomeProps> = () => {
  const { setSelectedBike } = useAppContext();
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0);
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
          <Link href="/shop" className="px-8 py-4 bg-lime-400 hover:bg-lime-300 text-zinc-950 font-black text-sm uppercase rounded-lg shadow-lg shadow-lime-400/20 transition-transform hover:scale-105 cursor-pointer">
            Shop All Models
          </Link>
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
            <Link 
              href="/shop/electric-dirt-bikes" 
              className="relative group overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 cursor-pointer p-8 aspect-square flex items-end block"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 to-transparent z-10" />
              <img 
                src={dirtBikesCategoryUrl} 
                alt="Electric Dirt Bikes" 
                onError={(e) => handleImageError(e, '/Electric-Dirt-Bikes.webp')}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <h3 className="text-2xl font-black text-white uppercase z-20 relative">Electric Dirt Bikes</h3>
            </Link>

            <Link 
              href="/shop/e-bikes" 
              className="relative group overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 cursor-pointer p-8 aspect-square flex items-end block"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 to-transparent z-10" />
              <img 
                src={eBikesCategoryUrl} 
                alt="E-Bikes" 
                onError={(e) => handleImageError(e, '/E-Bikes.jpg')}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <h3 className="text-2xl font-black text-white uppercase z-20 relative">E-Bikes</h3>
            </Link>

            <Link 
              href="/shop/accessories" 
              className="relative group overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 cursor-pointer p-8 aspect-square flex items-end block"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 to-transparent z-10" />
              <img 
                src={accessoriesCategoryUrl} 
                alt="Accessories" 
                onError={(e) => handleImageError(e, '/Accessories.png')}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 bg-white" 
              />
              <h3 className="text-2xl font-black text-white uppercase z-20 relative">Accessories</h3>
            </Link>
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
          <Link 
            href="/shop" 
            className="px-8 py-4 bg-lime-400 hover:bg-lime-300 text-zinc-950 font-black text-sm uppercase rounded-lg shadow-lg shadow-lime-400/20 transition-transform hover:scale-105 cursor-pointer"
          >
            Shop All Models
          </Link>
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

      {/* Homepage FAQs (4 Accordion-Style Questions for GEO & Conversion) */}
      <section 
        className="py-20 px-4 border-t border-zinc-800 relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('https://lh3.googleusercontent.com/d/1J34hpKzSuKLkr5yD_OhP4b87ikWvGwf-')` }}
      >
        <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-[1px]"></div>
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 bg-lime-400/10 border border-lime-400/30 px-3 py-1 rounded-md text-lime-400 text-xs font-mono font-bold uppercase">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              E-Moto & Surron Buyers Guide FAQs
            </h2>
            <p className="text-zinc-400 text-sm font-mono max-w-2xl mx-auto">
              Clear answers on speed, battery range, street legal setup, and purchasing adult electric dirt bikes with nationwide freight delivery.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS_DATA.slice(0, 4).map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.id}
                  className="bg-[#0f121a] rounded-xl border border-zinc-800 overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-900/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-lime-400/10 text-lime-400 font-mono font-black text-xs flex items-center justify-center shrink-0">
                        0{index + 1}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight">
                        {faq.question}
                      </h3>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-lime-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-zinc-500 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans border-t border-zinc-800/60 mt-1 pl-15">
                      <div className="pt-3 border-l-2 border-lime-400/40 pl-4">
                        {faq.answer}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center pt-2">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-lime-400 hover:text-lime-300 uppercase tracking-wider bg-zinc-900 border border-zinc-800 px-5 py-3 rounded-lg hover:border-lime-400/40 transition-colors"
            >
              <span>EXPLORE ALL FREQUENTLY ASKED QUESTIONS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Homepage Blog Posts Section (4 posts in 1 row) */}
      <section className="py-20 bg-zinc-950 px-4 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-lime-400/10 border border-lime-400/30 px-3 py-1 rounded-md text-lime-400 text-xs font-mono font-bold uppercase mb-3">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Tech & Trail Guides</span>
              </div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tight">
                Latest E-Moto Guides
              </h2>
              <p className="text-zinc-400 text-sm font-mono mt-1">
                Expert insights on battery tech, trail prep, maintenance, and street conversion
              </p>
            </div>

            <Link
              href="/blog"
              prefetch={false}
              className="inline-flex items-center gap-2 text-lime-400 hover:text-lime-300 font-mono font-bold text-xs uppercase tracking-wider bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-4 py-2.5 rounded-lg transition-colors shrink-0"
            >
              <span>View All 12 Guides</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BLOG_POSTS_DATA.slice(0, 4).map((post, index) => (
              <article
                key={post.id}
                className="bg-[#0f121a] rounded-2xl border border-zinc-800/80 overflow-hidden flex flex-col justify-between hover:border-lime-400/50 transition-all group shadow-xl"
              >
                <div>
                  <div className="relative aspect-[16/9] overflow-hidden bg-zinc-900">
                    <BlogCardboardHeader post={post} index={index} compact={true} />
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-lime-400" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-lime-400" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-lime-400 transition-colors uppercase leading-snug line-clamp-2">
                      <Link href={`/blog/${post.id}`} prefetch={false}>
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 font-sans">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-zinc-800/60 mt-4">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">
                    {post.category}
                  </span>

                  <Link
                    href={`/blog/${post.id}`}
                    prefetch={false}
                    className="text-xs font-black text-lime-400 hover:text-lime-300 uppercase tracking-wider flex items-center gap-1 font-mono"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
