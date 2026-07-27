import React, { useEffect, useState, useRef } from 'react';
import { Star } from 'lucide-react';

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
    <div className="relative w-full py-20 border-t border-zinc-900 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/reviews-bg.jpg" alt="Reviews Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-zinc-950/80"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 mb-10 flex flex-col items-center">
        <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Excellent</h2>
        <div className="flex items-center gap-2 mb-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-green-500 p-1">
              <Star className="w-5 h-5 text-white fill-white" />
            </div>
          ))}
        </div>
        <p className="text-zinc-400 font-mono text-sm">Based on 1,248 reviews on <span className="font-bold text-white">Trustpilot</span></p>
      </div>

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
              className="inline-flex flex-col bg-zinc-950 p-6 rounded-xl border border-zinc-800 w-80 shrink-0 whitespace-normal"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <div key={i} className="bg-green-500 p-0.5">
                    <Star className="w-4 h-4 text-white fill-white" />
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
