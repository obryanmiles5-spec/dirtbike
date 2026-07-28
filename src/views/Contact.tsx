'use client';

import React, { useState } from 'react';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Calendar,
  AlertCircle,
  ChevronDown
} from 'lucide-react';
import { FAQS_DATA } from '../data/faqs';
import { useAppContext } from '../context/AppContext';
import { submitContactAction, ContactActionState } from '../app/actions/contact';

interface ContactProps {
  onOpenTestRide?: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenTestRide: propOpenTestRide }) => {
  const { setIsTestRideOpen } = useAppContext();
  const handleOpenTestRide = () => {
    if (propOpenTestRide) propOpenTestRide();
    else setIsTestRideOpen(true);
  };

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Sales Inquiry & Shipping Options',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionResult, setActionResult] = useState<ContactActionState | null>(null);
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setActionResult(null);

    try {
      let res: any = null;
      try {
        const formData = new FormData();
        formData.append('name', formState.name);
        formData.append('email', formState.email);
        formData.append('phone', formState.phone);
        formData.append('subject', formState.subject);
        formData.append('message', formState.message);
        res = await submitContactAction({ success: false }, formData);
      } catch (_saErr) {
        // Direct API route fallback
        const apiRes = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formState),
        });
        res = await apiRes.json();
      }

      if (res && res.success) {
        setActionResult({
          success: true,
          message: res.message || 'Your inquiry has been successfully dispatched to our Reno HQ team!'
        });
      } else {
        setActionResult({
          success: false,
          error: res?.error || 'Transmission failed. Please check your network and try again.'
        });
      }
    } catch (err: any) {
      setActionResult({
        success: false,
        error: err?.message || 'Transmission failed. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-white bg-[#0B0B0B]">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-mono font-black uppercase tracking-widest text-lime-400">DIRECT FACTORY LINE</span>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">CONTACT VOLT-X MOTORSPORTS</h1>
        <p className="text-xs text-zinc-400">
          Have questions regarding battery voltage, 2-seater sit carrier specs, custom tuning, or 50-state freight crate shipping? Our Reno factory technicians are standing by.
        </p>
      </div>

      {/* Grid: Contact Form + HQ Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Form Column */}
        <div className="lg:col-span-7 bg-zinc-950 p-6 sm:p-8 rounded-xl border border-zinc-800 space-y-6">
          <h3 className="font-black text-sm uppercase tracking-wider text-white font-mono">SEND US A DIRECT INQUIRY</h3>

          {actionResult?.success ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 bg-lime-400/20 text-lime-400 rounded-full flex items-center justify-center mx-auto border border-lime-400/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h4 className="font-black text-base uppercase text-white">DISPATCH RECEIVED!</h4>
                <p className="text-xs text-zinc-300">
                  {actionResult.message || 'Our Reno powersports team received your inquiry and will respond via email shortly.'}
                </p>
                <p className="text-[11px] text-zinc-400 font-mono">
                  Confirmation sent to: <span className="text-lime-400 font-bold">{formState.email}</span>
                </p>
              </div>
              <button
                onClick={() => {
                  setActionResult(null);
                  setFormState({ name: '', email: '', phone: '', subject: 'Sales Inquiry & Shipping Options', message: '' });
                }}
                className="px-5 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono font-bold text-white transition-colors cursor-pointer"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {actionResult?.error && (
                <div className="p-3 bg-red-950/60 border border-red-500/50 rounded-lg flex items-center gap-2.5 text-xs text-red-300 font-mono">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{actionResult.error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] text-zinc-400 mb-1 block font-mono">Your Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Alex Rider"
                    required
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:border-lime-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-zinc-400 mb-1 block font-mono">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="alex.rider@offroad.com"
                    required
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:border-lime-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] text-zinc-400 mb-1 block font-mono">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    placeholder="+1 (555) 392-8801"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:border-lime-400 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-zinc-400 mb-1 block font-mono">Subject Topic</label>
                  <select
                    name="subject"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:border-lime-400 focus:outline-none font-mono"
                  >
                    <option value="Sales Inquiry & Shipping Options">Sales Inquiry & Freight Crate</option>
                    <option value="Book a Local Test Ride">Book a Local Test Ride</option>
                    <option value="Custom Battery & High-Output Build">Custom Battery & Powertrain Tuning</option>
                    <option value="Fleet & Commercial Rental Orders">Fleet & Commercial Orders</option>
                    <option value="Tech Support & Warranty">Tech Support & US Factory Warranty</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-zinc-400 mb-1 block font-mono">Your Dispatch Message *</label>
                <textarea
                  rows={4}
                  name="message"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Hi VOLT-X team, I am interested in the Stealth Pro 72V..."
                  required
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:border-lime-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-lg bg-lime-400 hover:bg-lime-300 text-zinc-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-lime-400/20 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'SENDING VIA ZOHO MAIL...' : 'SEND INQUIRY'}</span>
              </button>
            </form>
          )}
        </div>

        {/* HQ Details Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800 space-y-6">
            <h3 className="font-black text-sm uppercase tracking-wider text-white font-mono">SHOWROOM & DIRT TEST TRACK HQ</h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-lime-400/10 rounded-lg text-lime-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-white uppercase font-sans">Reno Headquarters & Dirt Oval</div>
                  <div className="text-zinc-400 mt-0.5 font-mono">1040 Electric Ridge Blvd, Reno, NV 89502</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-lime-400/10 rounded-lg text-lime-400 shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-white uppercase font-sans">Factory Support Hotline</div>
                  <div className="text-zinc-400 mt-0.5 font-mono">
                    <a href="tel:505-652-1743" className="hover:text-lime-400 underline">505-652-1743</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-lime-400/10 rounded-lg text-lime-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-white uppercase font-sans">Factory Direct Email</div>
                  <div className="text-zinc-400 mt-0.5 font-mono">
                    <a href="mailto:contact@voltdirtbike.com" className="hover:text-lime-400 underline">contact@voltdirtbike.com</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-lime-400/10 rounded-lg text-lime-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-white uppercase font-sans">Showroom & Track Hours</div>
                  <div className="text-zinc-400 mt-0.5 font-mono">Mon - Sat: 9:00 AM - 6:00 PM PST</div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-800">
              <button
                onClick={handleOpenTestRide}
                className="w-full py-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-lime-400 font-mono font-bold text-xs flex items-center justify-center gap-2 border border-lime-400/30 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>SCHEDULE TEST RIDE SESSION</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* FAQ SECTION */}
      <div className="space-y-6 pt-6">
        <h3 className="font-black text-xl text-white text-center uppercase tracking-wider font-mono">FREQUENTLY ASKED QUESTIONS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FAQS_DATA.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-zinc-950 rounded-xl border border-zinc-800 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full p-4 text-left font-bold text-xs text-white flex items-center justify-between gap-3 cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-lime-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-zinc-400 border-t border-zinc-800/60 pt-2 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default Contact;
