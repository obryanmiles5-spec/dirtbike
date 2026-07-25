'use client';

import React, { useState } from 'react';
import { X, Calendar, MapPin, CheckCircle2, Bike as BikeIcon, Clock } from 'lucide-react';
import { BIKES_DATA } from '../data/bikes';

interface TestRideModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultBikeName?: string;
}

export const TestRideModal: React.FC<TestRideModalProps> = ({
  isOpen,
  onClose,
  defaultBikeName
}) => {
  const [selectedBike, setSelectedBike] = useState(defaultBikeName || BIKES_DATA[0].name);
  const [location, setLocation] = useState('Reno HQ Test Track & Showroom');
  const [date, setDate] = useState('2026-08-01');
  const [timeSlot, setTimeSlot] = useState('10:00 AM');
  const [name, setName] = useState('Alex Rider');
  const [email, setEmail] = useState('alex.rider@offroad.com');
  const [phone, setPhone] = useState('+1 (555) 392-8801');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-zinc-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-auto text-white p-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-cyan-500/10 rounded-xl text-cyan-400">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-white">Book an Electric Test Ride</h3>
                <p className="text-xs text-zinc-400">Feel 950Nm instant electric torque on real dirt trails</p>
              </div>
            </div>

            <div>
              <label className="text-[11px] text-zinc-400 mb-1 block">Select Model to Ride</label>
              <select
                value={selectedBike}
                onChange={(e) => setSelectedBike(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
              >
                {BIKES_DATA.map((b) => (
                  <option key={b.id} value={b.name}>{b.name} ({b.specs.peakPowerKW}kW Peak)</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] text-zinc-400 mb-1 block">Test Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="Reno HQ Test Track & Showroom">Reno HQ Off-Road Park (NV)</option>
                <option value="SoCal Dirt Park Mobile Rig">SoCal Mobile Demo Rig (CA)</option>
                <option value="Denver Mountain Demo Facility">Denver Mountain Demo Track (CO)</option>
                <option value="Home Delivery VIP Demo ($50)">VIP Doorstep Demo Rig ($50 Fee)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-zinc-400 mb-1 block">Preferred Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-zinc-400 mb-1 block">Preferred Time Slot</label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="01:00 PM">01:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-zinc-400 mb-1 block">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-zinc-400 mb-1 block">Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-black text-xs uppercase tracking-wider transition-colors cursor-pointer mt-2"
            >
              Confirm Test Ride Reservation
            </button>
          </form>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center mx-auto border border-cyan-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Test Ride Booked!</h3>
              <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
                We reserved a <span className="text-cyan-400 font-bold">{selectedBike}</span> for you at <span className="text-white font-bold">{location}</span> on <span className="font-mono text-cyan-300">{date} at {timeSlot}</span>.
              </p>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs cursor-pointer"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
