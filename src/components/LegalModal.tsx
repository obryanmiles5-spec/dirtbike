'use client';

import React from 'react';
import { X, ShieldCheck, FileText, Truck } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | 'shipping' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const content = {
    privacy: {
      title: "Privacy Policy & Data Security",
      icon: ShieldCheck,
      body: `At VOLT-X Motors USA Inc., we prioritize the protection of your personal and financial data.

1. **Information Collection:** We collect order details, shipping addresses, and email contact information solely to process e-moto freight crate orders, issue manufacturer VIN/MSO documentation, and process warranty claims.
2. **Encryption Standards:** All payment transactions are secured using 256-bit SSL encryption via compliant payment gateways (Affirm, Shop Pay, Visa/Mastercard). We never store raw credit card credentials on our servers.
3. **No Third-Party Sales:** Your contact information is never sold, leased, or rented to external marketing firms.`
    },
    terms: {
      title: "Terms of Service & Vehicle Purchase Agreement",
      icon: FileText,
      body: `By placing an order for a VOLT-X electric dirt bike, you agree to the following terms:

1. **Off-Road & Competition Use:** Unless designated as a DOT Street Legal Supermoto, all high-output machines are sold for off-road competition, closed-course trail riding, or private land use.
2. **Safety Equipment:** Riders assume full responsibility for wearing proper safety gear (DOT/ECE full-face helmets, chest protectors, knee braces, and gloves).
3. **MSO Registration:** VOLT-X provides a Manufacturer's Statement of Origin (MSO) with every machine to facilitate state DMV titling.`
    },
    shipping: {
      title: "50-State Freight Crate Shipping & Return Policy",
      icon: Truck,
      body: `VOLT-X delivers heavy-duty steel crate freight directly to residential driveways in all 50 U.S. states.

1. **Dispatch Timeline:** In-stock models dispatch from our Reno, NV distribution warehouse within 24 to 48 business hours. Delivery transit time averages 3 to 5 business days.
2. **Delivery Process:** Freight carriers provide liftgate service and schedule a delivery window. Inspect the outer crate upon arrival.
3. **30-Day Trail Test & Returns:** Bikes returned in new or like-new condition within 30 days of delivery receive a full refund minus round-trip freight shipping charges.`
    }
  }[type];

  const Icon = content.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative my-8 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/80 font-mono">
          <div className="flex items-center gap-2 text-lime-400 font-bold text-xs uppercase tracking-wider">
            <Icon className="w-4 h-4 text-lime-400" />
            <span>{content.title}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs text-zinc-300 leading-relaxed whitespace-pre-line">
          {content.body}
        </div>

        <div className="p-4 border-t border-zinc-800 bg-zinc-900/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-lime-400 text-zinc-950 font-black text-xs uppercase font-mono cursor-pointer"
          >
            CLOSE WINDOW
          </button>
        </div>
      </div>
    </div>
  );
};
