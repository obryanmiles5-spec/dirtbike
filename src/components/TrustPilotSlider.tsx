import React, { useEffect, useState, useRef } from 'react';
import { Star, Play, ShieldCheck, ThumbsUp, Youtube } from 'lucide-react';
import { formatImageUrl, handleImageError } from '../lib/imageUtils';

const REVIEWS = [
  { id: 1, name: "Marcus T.", rating: 5, date: "2 days ago", title: "Absolute Beast", text: "The Apex Pro exceeded all my expectations. Instant torque and the suspension handles jumps like nothing else." },
  { id: 2, name: "Sarah J.", rating: 5, date: "1 week ago", title: "Game Changer", text: "I've ridden gas bikes my whole life. This electric dirt bike just converted me. No maintenance, pure power." },
  { id: 3, name: "David L.", rating: 5, date: "2 weeks ago", title: "Incredible Range", text: "Did a 40-mile trail run and still had 30% battery left. The quick swap feature is also a lifesaver." },
  { id: 4, name: "Mike R.", rating: 5, date: "3 weeks ago", title: "Smooth and Silent", text: "The silence is golden. You can hear the tires gripping the dirt. Quality build all around." },
  { id: 5, name: "Elena V.", rating: 5, date: "1 month ago", title: "Best Purchase", text: "Worth every penny. The torque is insane. Highly recommend for any serious rider." },
  { id: 6, name: "Chris H.", rating: 5, date: "1 month ago", title: "Next Level Riding", text: "I can ride in my backyard without annoying the neighbors. Power is smooth and relentless." }
];

export const TrustPilotSlider: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const bgImageUrl = formatImageUrl(
    "https://drive.google.com/file/d/1lgSDp2p2Dv1uGSd6lEoDlf3Xy-wz_KZe/view?usp=sharing",
    "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1920&auto=format&fit=crop"
  );

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPos = 0;

    const scroll = () => {
      if (!isHovered) {
        scrollPos += 1;
        if (scrollPos >= scrollContainer.scrollWidth / 2) {
          scrollPos = 0;
        }
        scrollContainer.scrollLeft = scrollPos;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, [isHovered]);

  return (
    <div className="relative w-full py-20 border-t border-zinc-900 overflow-hidden bg-zinc-950">
      {/* Background Image Overlay - Restored & Vivid */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bgImageUrl} 
          alt="Rider Testimonials & Off-Road Dirt Bike Action Background" 
          onError={(e) => handleImageError(e, 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1920&auto=format&fit=crop')}
          className="w-full h-full object-cover opacity-40 mix-blend-luminosity scale-105 transform filter contrast-125" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/60 to-zinc-950/90"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 mb-16">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-lime-950/80 border border-lime-500/40 px-4 py-1.5 rounded-full text-lime-400 font-mono text-xs font-bold uppercase tracking-wider mb-3 shadow-lg shadow-lime-500/10">
            <Youtube className="w-4 h-4 text-red-500" />
            <span>FEATURED VIDEO REVIEW & RIDER FIELD TEST</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Real Riders. Real Off-Road Power.
          </h2>
          <p className="text-zinc-300 font-mono text-sm max-w-2xl mx-auto mt-2 drop-shadow">
            Watch our full 15-minute comprehensive video breakdown, trail performance testing, Surron & Rawrr comparisons, and real-world range benchmarks.
          </p>
        </div>

        {/* Video Embed Player Container - Loaded Eagerly Immediately on Page Load */}
        <div className="max-w-4xl mx-auto bg-zinc-900/90 border border-zinc-800 rounded-2xl p-3 sm:p-4 shadow-2xl shadow-lime-500/10 mb-16 backdrop-blur-md">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-zinc-800">
            <iframe
              className="w-full h-full border-0"
              src="https://www.youtube.com/embed/PbPKbyOgVo0?rel=0&modestbranding=1&enablejsapi=1"
              title="VOLT-X Electric Dirt Bike In-Depth Review & Trail Test - Surron & Rawrr Rival"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="eager"
            ></iframe>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-zinc-800 text-xs font-mono text-zinc-300">
            <div className="flex items-center gap-2 bg-zinc-950 p-2.5 rounded-lg border border-zinc-800/80">
              <Play className="w-4 h-4 text-lime-400 shrink-0" />
              <span>15-Min In-Depth Field Test</span>
            </div>
            <div className="flex items-center gap-2 bg-zinc-950 p-2.5 rounded-lg border border-zinc-800/80">
              <ThumbsUp className="w-4 h-4 text-lime-400 shrink-0" />
              <span>Torque & Hill Climb Test</span>
            </div>
            <div className="flex items-center gap-2 bg-zinc-950 p-2.5 rounded-lg border border-zinc-800/80">
              <ShieldCheck className="w-4 h-4 text-lime-400 shrink-0" />
              <span>Verified Owner Review</span>
            </div>
          </div>
        </div>

        {/* Trustpilot Stats Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Trustpilot Verified Reviews</h3>
          <div className="flex items-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-green-500 p-1 rounded-sm">
                <Star className="w-4 h-4 text-white fill-white" />
              </div>
            ))}
          </div>
          <p className="text-zinc-400 font-mono text-sm">
            Rated <strong>4.9 / 5.0</strong> based on 1,248 rider reviews on <span className="font-bold text-white">Trustpilot</span>
          </p>
        </div>

      </div>

      {/* Trustpilot Reviews Infinite Loop Slider */}
      <div 
        className="relative z-10 w-full overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-hidden whitespace-nowrap px-4 pb-4"
          style={{ width: '200%' }}
        >
          {/* Double the reviews to create a seamless loop */}
          {[...REVIEWS, ...REVIEWS].map((review, index) => (
            <div 
              key={`${review.id}-${index}`} 
              className="inline-flex flex-col bg-zinc-900/90 p-6 rounded-xl border border-zinc-800/80 w-80 shrink-0 whitespace-normal shadow-lg"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <div key={i} className="bg-green-500 p-0.5 rounded-sm">
                    <Star className="w-3.5 h-3.5 text-white fill-white" />
                  </div>
                ))}
              </div>
              <p className="text-zinc-500 text-xs mb-3 font-mono">{review.date}</p>
              <h4 className="text-white font-bold mb-2">{review.title}</h4>
              <p className="text-zinc-400 text-sm line-clamp-3 mb-4 flex-grow">{review.text}</p>
              <p className="text-zinc-300 font-bold text-sm">{review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


