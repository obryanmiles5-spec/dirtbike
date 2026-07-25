'use client';

import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  CreditCard, 
  Truck, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  Coins, 
  Smartphone, 
  ArrowRight,
  Package,
  Calendar,
  Clock,
  Printer,
  ChevronLeft,
  Landmark,
  DollarSign,
  QrCode,
  Wallet
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { OrderDetails } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess?: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderSuccess
}) => {
  const { cart, subtotal, appliedPromo, discountRate, clearCart } = useCart();

  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [deliveryMethod, setDeliveryMethod] = useState<'freight_crate' | 'dealer_pickup'>('freight_crate');
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'apple_pay' | 'bank_transfer' | 'bitcoin' | 'cashapp' | 'chime' | 'zelle' | 'financing' | 'crypto'>('credit_card');

  // Shipping Form State
  const [formData, setFormData] = useState({
    firstName: 'Alex',
    lastName: 'Rider',
    email: 'alex.rider@offroad.com',
    phone: '+1 (555) 392-8801',
    street: '742 Trailhead Ridge Way',
    city: 'Reno',
    state: 'NV',
    zip: '89502',
    country: 'United States'
  });

  // Credit Card Form State
  const [cardData, setCardData] = useState({
    number: '4242 •••• •••• 4242',
    name: 'Alex Rider',
    expiry: '08/28',
    cvc: '882'
  });

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  if (!isOpen) return null;

  const discountAmount = subtotal * discountRate;
  const shippingCost = deliveryMethod === 'freight_crate' ? (subtotal >= 3500 ? 0 : 250) : 0;
  const taxAmount = (subtotal - discountAmount) * 0.07;
  const grandTotal = subtotal - discountAmount + shippingCost + taxAmount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `VX-${Math.floor(100000 + Math.random() * 900000)}`;
      const trackingNumber = `1Z-VOLT-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      
      const newOrder: OrderDetails = {
        orderId,
        customerName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: formData.country,
        },
        deliveryMethod,
        paymentMethod,
        items: [...cart],
        subtotal,
        shippingCost,
        taxAmount,
        discountAmount,
        totalAmount: grandTotal,
        promoCodeApplied: appliedPromo || undefined,
        orderDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        trackingNumber,
        status: 'Processing'
      };

      setCompletedOrder(newOrder);
      setIsProcessing(false);
      setStep('confirmation');
      clearCart();
      if (onOrderSuccess) onOrderSuccess(newOrder);

      // Post order notification to Next.js server route
      fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      }).catch((err) => console.warn('Order API dispatch completed', err));
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-zinc-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-white">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-lime-400/10 rounded-lg text-lime-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-sm uppercase tracking-wider text-white">256-BIT SSL ENCRYPTED GATEWAY</h3>
              <p className="text-xs text-zinc-400 font-mono">VOLT-X US Powersports Secure Checkout</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Steps Indicator */}
        {step !== 'confirmation' && (
          <div className="px-6 py-3 bg-zinc-900 border-b border-zinc-800 flex items-center justify-center gap-4 text-xs font-mono font-bold">
            <div className={`flex items-center gap-2 ${step === 'details' ? 'text-lime-400' : 'text-zinc-500'}`}>
              <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-black ${step === 'details' ? 'bg-lime-400 text-zinc-950' : 'bg-zinc-800'}`}>1</span>
              <span>SHIPPING & FREIGHT</span>
            </div>
            <span className="text-zinc-700">&rarr;</span>
            <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-lime-400' : 'text-zinc-500'}`}>
              <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-black ${step === 'payment' ? 'bg-lime-400 text-zinc-950' : 'bg-zinc-800'}`}>2</span>
              <span>PAYMENT & FINANCING</span>
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 flex-1 bg-[#0B0B0B]">
          {step === 'details' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Form Column */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider mb-3 font-mono">1. CONTACT & US SHIPPING ADDRESS</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-zinc-400 mb-1 block">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white focus:border-lime-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-zinc-400 mb-1 block">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white focus:border-lime-400 focus:outline-none"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-[11px] text-zinc-400 mb-1 block">Email Address (for Crate Tracking & Updates)</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white focus:border-lime-400 focus:outline-none"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-[11px] text-zinc-400 mb-1 block">Phone Number (Required for Freight Driver Appointment)</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white focus:border-lime-400 focus:outline-none"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-[11px] text-zinc-400 mb-1 block">US Street Address</label>
                      <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white focus:border-lime-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-zinc-400 mb-1 block">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white focus:border-lime-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-zinc-400 mb-1 block">State & ZIP</label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-2 text-xs text-white focus:border-lime-400 focus:outline-none font-mono"
                        />
                        <input
                          type="text"
                          name="zip"
                          value={formData.zip}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-2 text-xs text-white focus:border-lime-400 focus:outline-none font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Options */}
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider mb-3 font-mono">2. CHOOSE FREIGHT DELIVERY METHOD</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div
                      onClick={() => setDeliveryMethod('freight_crate')}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                        deliveryMethod === 'freight_crate'
                          ? 'bg-lime-950/40 border-lime-400 text-white'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Truck className="w-4 h-4 text-lime-400" />
                        <span className="font-bold text-xs">50-State Crate Freight</span>
                      </div>
                      <p className="text-[10px] text-zinc-400">Insured crate delivery directly to your home garage or ranch.</p>
                      <span className="text-xs font-mono font-bold text-lime-400 mt-2 block">
                        {subtotal >= 3500 ? 'FREE' : '$250 Crate Fee'}
                      </span>
                    </div>

                    <div
                      onClick={() => setDeliveryMethod('dealer_pickup')}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                        deliveryMethod === 'dealer_pickup'
                          ? 'bg-lime-950/40 border-lime-400 text-white'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Building2 className="w-4 h-4 text-lime-400" />
                        <span className="font-bold text-xs">Certified Dealer Prep</span>
                      </div>
                      <p className="text-[10px] text-zinc-400">Fully unboxed & dyno-tuned by certified tech near Reno, NV.</p>
                      <span className="text-xs font-mono font-bold text-lime-400 mt-2 block">
                        FREE Dealer Pickup
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setStep('payment')}
                  className="w-full py-3.5 rounded-lg bg-lime-400 hover:bg-lime-300 text-zinc-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>CONTINUE TO PAYMENT METHOD</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-5 bg-zinc-950 p-5 rounded-xl border border-zinc-800 space-y-4 h-fit">
                <h4 className="font-black text-xs uppercase tracking-wider text-zinc-400 border-b border-zinc-900 pb-2 font-mono">
                  BEAST SUMMARY ({cart.length} ITEMS)
                </h4>

                <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 text-xs">
                      <img src={item.bike.image} alt={item.bike.name} referrerPolicy="no-referrer" className="w-12 h-12 rounded-md object-cover border border-zinc-800 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white uppercase truncate">{item.bike.name}</div>
                        <div className="text-[10px] text-zinc-400 font-mono">Qty: {item.quantity}</div>
                      </div>
                      <div className="font-mono font-bold text-lime-400">
                        ${(item.bike.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5 text-xs text-zinc-400 border-t border-zinc-900 pt-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono text-zinc-200">${subtotal.toLocaleString()}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-lime-400 font-mono">
                      <span>Promo Discount ({appliedPromo})</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Crate Freight</span>
                    <span className="font-mono text-zinc-200">{shippingCost === 0 ? 'FREE' : `$${shippingCost}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>US Sales Tax (7%)</span>
                    <span className="font-mono text-zinc-200">${taxAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-zinc-800 text-sm font-black text-white">
                    <span>TOTAL DUE</span>
                    <span className="font-mono text-lime-400">${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {step === 'payment' && (
            <form onSubmit={handleProcessPayment} className="space-y-6 max-w-2xl mx-auto">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white cursor-pointer font-mono"
              >
                <ChevronLeft className="w-4 h-4" />
                BACK TO SHIPPING DETAILS
              </button>

              <h4 className="text-xs font-black text-white uppercase tracking-wider font-mono">
                SELECT SECURE PAYMENT GATEWAY
              </h4>

              {/* Payment Gateway Options Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'credit_card'
                      ? 'bg-lime-950/60 border-lime-400 text-white font-bold'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-lime-400" />
                  <span className="text-xs">Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'apple_pay'
                      ? 'bg-lime-950/60 border-lime-400 text-white font-bold'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-blue-400" />
                  <span className="text-xs">Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'bank_transfer'
                      ? 'bg-lime-950/60 border-lime-400 text-white font-bold'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <Landmark className="w-5 h-5 text-teal-400" />
                  <span className="text-xs">Bank Transfer</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bitcoin')}
                  className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'bitcoin'
                      ? 'bg-lime-950/60 border-lime-400 text-white font-bold'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <Coins className="w-5 h-5 text-amber-400" />
                  <span className="text-xs">Bitcoin</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cashapp')}
                  className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'cashapp'
                      ? 'bg-lime-950/60 border-lime-400 text-white font-bold'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs">Cashapp</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('chime')}
                  className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'chime'
                      ? 'bg-lime-950/60 border-lime-400 text-white font-bold'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <Wallet className="w-5 h-5 text-green-400" />
                  <span className="text-xs">Chime</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('zelle')}
                  className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'zelle'
                      ? 'bg-lime-950/60 border-lime-400 text-white font-bold'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-purple-400" />
                  <span className="text-xs">Zelle</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('financing')}
                  className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'financing'
                      ? 'bg-lime-950/60 border-lime-400 text-white font-bold'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-indigo-400" />
                  <span className="text-xs">Affirm 0% APR</span>
                </button>
              </div>

              {/* Dynamic Payment Details Panel */}
              {paymentMethod === 'credit_card' && (
                <div className="p-5 bg-zinc-950 rounded-xl border border-zinc-800 space-y-4">
                  <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-zinc-900 pb-2 font-mono">
                    <span className="font-bold text-white">Credit Card Payment</span>
                    <span className="text-lime-400 font-bold">VISA • MC • AMEX</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] text-zinc-400 mb-1 block">Card Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="number"
                          value={cardData.number}
                          onChange={handleCardChange}
                          required
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-xs text-white font-mono focus:border-lime-400 focus:outline-none"
                        />
                        <CreditCard className="w-4 h-4 text-zinc-500 absolute right-3 top-3" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-zinc-400 mb-1 block">Expiration Date</label>
                        <input
                          type="text"
                          name="expiry"
                          value={cardData.expiry}
                          onChange={handleCardChange}
                          placeholder="MM/YY"
                          required
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-xs text-white font-mono focus:border-lime-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-zinc-400 mb-1 block">Security Code (CVC)</label>
                        <input
                          type="text"
                          name="cvc"
                          value={cardData.cvc}
                          onChange={handleCardChange}
                          placeholder="123"
                          required
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-xs text-white font-mono focus:border-lime-400 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'apple_pay' && (
                <div className="p-5 bg-zinc-950 rounded-xl border border-zinc-800 text-center space-y-3">
                  <div className="flex items-center justify-center gap-2 text-blue-400 font-bold font-mono text-sm">
                    <Smartphone className="w-5 h-5" />
                    <span>APPLE PAY GATEWAY</span>
                  </div>
                  <p className="text-xs text-zinc-300">Apple Pay integration is enabled. Payment details will be authorized seamlessly during checkout.</p>
                </div>
              )}

              {paymentMethod === 'bank_transfer' && (
                <div className="p-5 bg-zinc-950 rounded-xl border border-zinc-800 space-y-3 text-xs text-zinc-300">
                  <div className="flex items-center gap-2 text-teal-400 font-bold font-mono text-sm">
                    <Landmark className="w-5 h-5" />
                    <span>BANK TRANSFER (ACH / WIRE)</span>
                  </div>
                  <p className="leading-relaxed">
                    Direct wire/ACH transfer payment option selected. Wiring instructions and account details will be sent upon checkout.
                  </p>
                </div>
              )}

              {paymentMethod === 'bitcoin' && (
                <div className="p-5 bg-zinc-950 rounded-xl border border-zinc-800 space-y-3 text-xs text-zinc-300 font-mono">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <Coins className="w-5 h-5" />
                    <span>BITCOIN (BTC) PAYMENT</span>
                  </div>
                  <p className="text-zinc-300 font-sans">
                    Crypto settlement selected. Wallet address and invoice details will be displayed after order confirmation.
                  </p>
                </div>
              )}

              {paymentMethod === 'cashapp' && (
                <div className="p-5 bg-zinc-950 rounded-xl border border-zinc-800 space-y-3 text-xs text-zinc-300">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono text-sm">
                    <DollarSign className="w-5 h-5" />
                    <span>CASH APP PAYMENT</span>
                  </div>
                  <p className="leading-relaxed">
                    Cash App payment selected. $Cashtag details and instructions will be provided upon order confirmation.
                  </p>
                </div>
              )}

              {paymentMethod === 'chime' && (
                <div className="p-5 bg-zinc-950 rounded-xl border border-zinc-800 space-y-3 text-xs text-zinc-300">
                  <div className="flex items-center gap-2 text-green-400 font-bold font-mono text-sm">
                    <Wallet className="w-5 h-5" />
                    <span>CHIME PAYMENT</span>
                  </div>
                  <p className="leading-relaxed">
                    Chime Pay Friends / Transfer option selected. Chime handle and authorization details will be provided upon checkout.
                  </p>
                </div>
              )}

              {paymentMethod === 'zelle' && (
                <div className="p-5 bg-zinc-950 rounded-xl border border-zinc-800 space-y-3 text-xs text-zinc-300">
                  <div className="flex items-center gap-2 text-purple-400 font-bold font-mono text-sm">
                    <QrCode className="w-5 h-5" />
                    <span>ZELLE PAYMENT</span>
                  </div>
                  <p className="leading-relaxed">
                    Zelle instant bank pay selected. Zelle recipient email/phone details will be provided upon order confirmation.
                  </p>
                </div>
              )}

              {paymentMethod === 'financing' && (
                <div className="p-5 bg-zinc-950 rounded-xl border border-zinc-800 space-y-3 text-xs text-zinc-300">
                  <div className="flex items-center gap-2 text-lime-400 font-bold font-mono">
                    <Building2 className="w-5 h-5" />
                    <span>INSTANT AFFIRM FINANCING (0% APR)</span>
                  </div>
                  <p className="leading-relaxed">
                    You will undergo soft identity authorization. Pre-approval happens in seconds without affecting credit score.
                  </p>
                  <div className="p-3 bg-zinc-900 rounded-lg text-xs font-mono text-lime-400">
                    Estimated Term: ${(grandTotal / 24).toFixed(2)}/mo for 24 Months
                  </div>
                </div>
              )}

              {/* Submit Payment Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-lg bg-lime-400 hover:bg-lime-300 text-zinc-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-lime-400/20 transition-all cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2 font-mono">
                    <span className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                    AUTHORIZING GATEWAY...
                  </span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>AUTHORIZE PAYMENT OF ${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-400 font-mono">
                <ShieldCheck className="w-4 h-4 text-lime-400" />
                <span>ZERO RISK • 30-DAY TRAIL TEST GUARANTEE • US FACTORY WARRANTY</span>
              </div>
            </form>
          )}

          {step === 'confirmation' && completedOrder && (
            <div className="max-w-2xl mx-auto text-center space-y-6 py-4">
              <div className="w-16 h-16 bg-lime-400/20 text-lime-400 rounded-full flex items-center justify-center mx-auto border border-lime-400/40 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">ORDER CONFIRMED!</h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Congratulations, <span className="text-lime-400 font-bold">{completedOrder.customerName}</span>. Your electric machine is being prepped for crate shipment.
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800 text-left space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                  <div>
                    <div className="text-[9px] text-zinc-400 uppercase font-black font-mono">ORDER ID</div>
                    <div className="text-base font-mono font-black text-lime-400">{completedOrder.orderId}</div>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-[9px] text-zinc-400 uppercase font-black">ESTIMATED CRATE DELIVERY</div>
                    <div className="text-xs font-bold text-white flex items-center gap-1 justify-end">
                      <Calendar className="w-3.5 h-3.5 text-lime-400" />
                      {completedOrder.estimatedDelivery}
                    </div>
                  </div>
                </div>

                {/* Shipment Tracker Simulation */}
                <div className="p-4 bg-zinc-900 rounded-lg space-y-3 font-mono">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span className="flex items-center gap-1.5">
                      <Package className="w-4 h-4 text-lime-400" /> FREIGHT CODE:
                    </span>
                    <span className="text-lime-400">{completedOrder.trackingNumber}</span>
                  </div>

                  <div className="relative pt-2">
                    <div className="h-1.5 bg-zinc-800 rounded-full w-full overflow-hidden">
                      <div className="h-full bg-lime-400 w-1/3 animate-pulse" />
                    </div>
                    <div className="flex justify-between text-[9px] text-zinc-400 mt-2 font-bold">
                      <span className="text-lime-400">Order Placed</span>
                      <span>Factory Prep</span>
                      <span>En Route Freight</span>
                      <span>Delivered</span>
                    </div>
                  </div>
                </div>

                {/* Order Totals */}
                <div className="border-t border-zinc-900 pt-3 flex justify-between text-xs font-mono">
                  <span className="text-zinc-400">Total Paid ({completedOrder.paymentMethod.toUpperCase()})</span>
                  <span className="font-black text-lime-400 text-base">${completedOrder.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-lg bg-lime-400 hover:bg-lime-300 text-zinc-950 font-black text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  RETURN TO STORE
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
