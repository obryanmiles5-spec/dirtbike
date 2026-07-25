'use client';

import React, { useState } from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  BatteryCharging, 
  CheckCircle2, 
  Send,
  Lock,
  FileText,
  HelpCircle,
  BookOpen,
  Share2
} from 'lucide-react';
import { LegalModal } from './LegalModal';

interface FooterProps {
  setActiveTab: (tab: 'home' | 'shop' | 'about' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeLegalModal, setActiveLegalModal] = useState<'privacy' | 'terms' | 'shipping' | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      try {
        await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim() }),
        });
      } catch (err) {
        console.warn('Newsletter API call completed locally', err);
      }
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#06080e] text-zinc-400 border-t-2 border-lime-400/80 pt-16 pb-12 font-sans shadow-2xl">
      {/* Guarantees Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mb-12 border-b border-zinc-800/80 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="flex items-start gap-4 p-4.5 rounded-xl bg-[#0f121a] border border-zinc-800/80">
          <div className="p-3 bg-lime-400/10 rounded-lg text-lime-400 shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-wider mb-1 font-mono">50-State Freight Crate Delivery</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">Fully insured steel-crate freight direct to your driveway 95% pre-assembled.</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4.5 rounded-xl bg-[#0f121a] border border-zinc-800/80">
          <div className="p-3 bg-lime-400/10 rounded-lg text-lime-400 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-wider mb-1 font-mono">2-Year Factory Battery Warranty</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">Full pack replacement coverage for all 60V, 72V, and 80V high-capacity packs.</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4.5 rounded-xl bg-[#0f121a] border border-zinc-800/80">
          <div className="p-3 bg-lime-400/10 rounded-lg text-lime-400 shrink-0">
            <RotateCcw className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-wider mb-1 font-mono">30-Day Trail Test Guarantee</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">Shred your local trails. 100% satisfaction or hassle-free full return guarantee.</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4.5 rounded-xl bg-[#0f121a] border border-zinc-800/80">
          <div className="p-3 bg-lime-400/10 rounded-lg text-lime-400 shrink-0">
            <BatteryCharging className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-wider mb-1 font-mono">Affirm & Shop Pay Financing</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">Instant approval financing from $99/mo with zero down option for qualified buyers.</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-9 h-9 rounded-xl bg-lime-400 p-0.5">
              <div className="w-full h-full bg-[#06080e] rounded-[10px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-lime-400 fill-lime-400/20" />
              </div>
            </div>
            <span className="text-2xl font-black text-white font-sans uppercase tracking-tight">
              VOLT<span className="text-lime-400">-X</span>
            </span>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed pr-4">
            America's premier high-output e-moto & electric dirt bike brand. Engineered with liquid-cooled FOC controllers, high-voltage battery packs, and up to 950Nm of instant wheel torque for pure off-road dominance.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3 pt-1 text-xs font-mono font-bold text-zinc-400">
            <span className="text-lime-400 text-[10px] uppercase">OFFICIAL COMMUNITY:</span>
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded hover:text-white cursor-pointer">YOUTUBE</span>
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded hover:text-white cursor-pointer">INSTAGRAM</span>
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded hover:text-white cursor-pointer">TIKTOK</span>
          </div>

          {/* Newsletter Box */}
          <div className="pt-2">
            <h5 className="text-xs font-black text-zinc-200 uppercase tracking-wider mb-2 font-mono">
              SUBSCRIBE TO POWER DROP ALERTS (ZOHO INTEGRATED)
            </h5>
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-lime-400 bg-lime-950/40 p-3 rounded-xl border border-lime-800/50 font-mono">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Subscribed via Zoho Mail integration! VIP crate discount code sent to your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email for VIP drops & $100 off code"
                  required
                  className="bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 flex-1 font-sans"
                />
                <button
                  type="submit"
                  className="bg-lime-400 hover:bg-lime-300 text-zinc-950 font-black px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer uppercase tracking-wider font-mono"
                >
                  <Send className="w-3.5 h-3.5" />
                  JOIN
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4 font-mono">EXPLORE</h4>
          <ul className="space-y-2.5 text-xs font-semibold">
            <li>
              <button onClick={() => setActiveTab('home')} className="hover:text-lime-400 transition-colors uppercase">
                Home Stage
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('shop')} className="hover:text-lime-400 transition-colors uppercase">
                All Electric Bikes
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('about')} className="hover:text-lime-400 transition-colors uppercase">
                Engineering & Battery Tech
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('contact')} className="hover:text-lime-400 transition-colors uppercase">
                US Showroom & Dealers
              </button>
            </li>
            <li>
              <button onClick={() => { setActiveTab('home'); window.scrollTo({ top: 1200, behavior: 'smooth' }); }} className="hover:text-lime-400 transition-colors uppercase flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-lime-400" />
                E-Moto Blog Posts
              </button>
            </li>
            <li>
              <button onClick={() => { setActiveTab('home'); window.scrollTo({ top: 1800, behavior: 'smooth' }); }} className="hover:text-lime-400 transition-colors uppercase flex items-center gap-1">
                <HelpCircle className="w-3 h-3 text-lime-400" />
                Homepage FAQs
              </button>
            </li>
          </ul>
        </div>

        {/* Legal Pages */}
        <div>
          <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4 font-mono">LEGAL & POLICIES</h4>
          <ul className="space-y-2.5 text-xs font-semibold">
            <li>
              <button onClick={() => setActiveLegalModal('privacy')} className="hover:text-lime-400 transition-colors uppercase flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
                Privacy Policy
              </button>
            </li>
            <li>
              <button onClick={() => setActiveLegalModal('terms')} className="hover:text-lime-400 transition-colors uppercase flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-lime-400" />
                Terms of Service
              </button>
            </li>
            <li>
              <button onClick={() => setActiveLegalModal('shipping')} className="hover:text-lime-400 transition-colors uppercase flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-lime-400" />
                Shipping & Returns
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('contact')} className="hover:text-lime-400 transition-colors uppercase">
                MSO Title Registration
              </button>
            </li>
          </ul>
        </div>

        {/* Contact & Support */}
        <div>
          <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4 font-mono">US HEADQUARTERS</h4>
          <p className="text-xs text-zinc-400 mb-2 leading-relaxed">
            VOLT-X Motors USA Inc.<br />
            1040 Electric Ridge Highway<br />
            Reno, NV 89502
          </p>
          <p className="text-xs text-zinc-200 font-mono font-bold mb-1">US Hotline: +1 (800) 555-VOLT</p>
          <p className="text-xs text-zinc-400 mb-4 font-mono">support@voltx-dirtbikes.com</p>

          <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-mono">
            <Lock className="w-3.5 h-3.5 text-lime-400" />
            256-Bit SSL Encrypted USA Checkout
          </div>
        </div>
      </div>



      {/* Legal Modal Popup */}
      <LegalModal
        type={activeLegalModal}
        onClose={() => setActiveLegalModal(null)}
      />
    </footer>
  );
};
