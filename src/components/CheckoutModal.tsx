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
  Wallet,
  ExternalLink
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { OrderDetails } from '../types';
import { formatImageUrl } from '../lib/imageUtils';

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
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'apple_pay' | 'bank_transfer' | 'bitcoin' | 'cashapp' | 'chime' | 'zelle' | 'crypto'>('credit_card');

  // Complete WooCommerce Billing & Shipping Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    country: 'United States',
    street: '',
    street2: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
    shipToDifferentAddress: false,
    shippingFirstName: '',
    shippingLastName: '',
    shippingCompany: '',
    shippingCountry: 'United States',
    shippingStreet: '',
    shippingStreet2: '',
    shippingCity: '',
    shippingState: '',
    shippingZip: '',
    orderNotes: ''
  });

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  // Reset modal step and completed order whenever modal visibility toggles
  React.useEffect(() => {
    if (!isOpen) {
      setStep('details');
      setCompletedOrder(null);
    }
  }, [isOpen]);

  const handleClose = () => {
    setStep('details');
    setCompletedOrder(null);
    onClose();
  };

  if (!isOpen) return null;

  const discountAmount = subtotal * discountRate;
  
  // Calculate shipping according to rules:
  // - Accessories / Battery: $0
  // - Dirt bikes (electric-dirt-bikes): $250
  // - E-bikes (e-bikes): $150
  const calculatedShipping = cart.reduce((sum, item) => {
    const cat = item.bike?.category;
    const name = (item.bike?.name || '').toLowerCase();
    const qty = item.quantity || 1;

    if (cat === 'accessories' || cat === 'battery') {
      return sum;
    }
    if (cat === 'electric-dirt-bikes' || name.includes('dirt bike') || name.includes('dirt')) {
      return sum + 250 * qty;
    }
    if (cat === 'e-bikes' || name.includes('e-bike') || name.includes('ebike')) {
      return sum + 150 * qty;
    }
    return sum + 250 * qty;
  }, 0);

  const shippingCost = deliveryMethod === 'freight_crate' ? calculatedShipping : 0;
  const taxAmount = (subtotal - discountAmount) * 0.07;
  const grandTotal = subtotal - discountAmount + shippingCost + taxAmount;

  const getPaymentMethodTitle = (method: string): string => {
    switch (method) {
      case 'credit_card': return 'Credit Card (Fincra Encrypted Portal)';
      case 'apple_pay': return 'Apple Pay';
      case 'bank_transfer': return 'Direct Bank Wire / ACH Transfer';
      case 'bitcoin': return 'Bitcoin (BTC) Crypto';
      case 'cashapp': return 'Cash App ($Cashtag)';
      case 'chime': return 'Chime Pay Friends';
      case 'zelle': return 'Zelle Instant Transfer';
      default: return 'Direct Gateway Payment';
    }
  };

  const getDeliveryMethodTitle = (method: string): string => {
    return method === 'freight_crate'
      ? '50-State Insured Crate Freight'
      : 'Certified Dealer Prep (Reno, NV)';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    setFormData({ ...formData, [target.name]: value });
  };

  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // If Credit Card method, open the Fincra checkout link
    if (paymentMethod === 'credit_card') {
      try {
        window.open('https://l.fincra.com/4Sf', '_blank');
      } catch (err) {
        console.error('Failed to open payment link:', err);
      }
    }

    const orderId = `VX-${Math.floor(100000 + Math.random() * 900000)}`;
    const trackingNumber = `1Z-VOLT-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    
    const billingAddress = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      company: formData.company || undefined,
      street: formData.street,
      street2: formData.street2 || undefined,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      country: formData.country,
      phone: formData.phone,
      email: formData.email
    };

    const shippingAddress = formData.shipToDifferentAddress ? {
      firstName: formData.shippingFirstName || formData.firstName,
      lastName: formData.shippingLastName || formData.lastName,
      company: formData.shippingCompany || formData.company || undefined,
      street: formData.shippingStreet,
      street2: formData.shippingStreet2 || undefined,
      city: formData.shippingCity,
      state: formData.shippingState,
      zip: formData.shippingZip,
      country: formData.shippingCountry || 'United States'
    } : {
      firstName: formData.firstName,
      lastName: formData.lastName,
      company: formData.company || undefined,
      street: formData.street,
      street2: formData.street2 || undefined,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      country: formData.country
    };

    const newOrder: OrderDetails = {
      orderId,
      customerName: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone,
      company: formData.company || undefined,
      orderNotes: formData.orderNotes || undefined,
      shipToDifferentAddress: formData.shipToDifferentAddress,
      billingAddress,
      shippingAddress,
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        company: formData.company || undefined,
        email: formData.email,
        phone: formData.phone,
        address: formData.street,
        address2: formData.street2 || undefined,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        country: formData.country
      },
      deliveryMethod,
      deliveryMethodTitle: getDeliveryMethodTitle(deliveryMethod),
      paymentMethod,
      paymentMethodTitle: getPaymentMethodTitle(paymentMethod),
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

    try {
      // Post order notification to Next.js server route & send email
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      });
      const data = await res.json();
      if (data?.emailStatus) {
        newOrder.emailStatus = data.emailStatus;
      }
    } catch (err) {
      console.warn('Order API dispatch notice:', err);
    }

    setCompletedOrder(newOrder);
    setIsProcessing(false);
    setStep('confirmation');
    clearCart();
    if (onOrderSuccess) onOrderSuccess(newOrder);
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
            onClick={handleClose}
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
                  <h4 className="text-xs font-black text-white uppercase tracking-wider mb-3 font-mono">1. BILLING DETAILS (WOOCOMMERCE STANDARD)</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-zinc-400 mb-1 block">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        placeholder="John"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white focus:border-lime-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-zinc-400 mb-1 block">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        placeholder="Doe"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white focus:border-lime-400 focus:outline-none"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-[11px] text-zinc-400 mb-1 block">Company Name (Optional)</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Acme Motors LLC"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white focus:border-lime-400 focus:outline-none"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-[11px] text-zinc-400 mb-1 block">Country / Region *</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:border-lime-400 focus:outline-none"
                      >
                        <option value="United States">United States (US)</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom (UK)</option>
                        <option value="Australia">Australia</option>
                        <option value="Mexico">Mexico</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="text-[11px] text-zinc-400 mb-1 block">Street Address *</label>
                      <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        required
                        placeholder="House number and street name"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white focus:border-lime-400 focus:outline-none mb-2"
                      />
                      <input
                        type="text"
                        name="street2"
                        value={formData.street2}
                        onChange={handleInputChange}
                        placeholder="Apartment, suite, unit, etc. (optional)"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white focus:border-lime-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-zinc-400 mb-1 block">Town / City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        placeholder="Reno"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white focus:border-lime-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-zinc-400 mb-1 block">State & ZIP Code *</label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                          placeholder="NV"
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-2 text-xs text-white focus:border-lime-400 focus:outline-none font-mono"
                        />
                        <input
                          type="text"
                          name="zip"
                          value={formData.zip}
                          onChange={handleInputChange}
                          required
                          placeholder="89501"
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-2 text-xs text-white focus:border-lime-400 focus:outline-none font-mono"
                        />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <label className="text-[11px] text-zinc-400 mb-1 block">Phone Number * (Required for Freight Driver Appointment)</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="(505) 652-1743"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white focus:border-lime-400 focus:outline-none"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-[11px] text-zinc-400 mb-1 block">Email Address * (for Order Receipt & Crate Tracking)</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="john@example.com"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white focus:border-lime-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Separate Shipping Address Checkbox */}
                <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer text-xs font-bold text-white">
                    <input
                      type="checkbox"
                      name="shipToDifferentAddress"
                      checked={formData.shipToDifferentAddress}
                      onChange={handleInputChange}
                      className="w-4 h-4 rounded border-zinc-700 text-lime-400 focus:ring-lime-400 bg-zinc-900"
                    />
                    <span>Ship to a different address?</span>
                  </label>

                  {formData.shipToDifferentAddress && (
                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-zinc-900 animate-in fade-in duration-150">
                      <div>
                        <label className="text-[11px] text-zinc-400 mb-1 block">Shipping First Name</label>
                        <input
                          type="text"
                          name="shippingFirstName"
                          value={formData.shippingFirstName}
                          onChange={handleInputChange}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:border-lime-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-zinc-400 mb-1 block">Shipping Last Name</label>
                        <input
                          type="text"
                          name="shippingLastName"
                          value={formData.shippingLastName}
                          onChange={handleInputChange}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:border-lime-400 focus:outline-none"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="text-[11px] text-zinc-400 mb-1 block">Shipping Street Address</label>
                        <input
                          type="text"
                          name="shippingStreet"
                          value={formData.shippingStreet}
                          onChange={handleInputChange}
                          placeholder="Shipping house number and street name"
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:border-lime-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-zinc-400 mb-1 block">Shipping City</label>
                        <input
                          type="text"
                          name="shippingCity"
                          value={formData.shippingCity}
                          onChange={handleInputChange}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:border-lime-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-zinc-400 mb-1 block">State & ZIP</label>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            name="shippingState"
                            value={formData.shippingState}
                            onChange={handleInputChange}
                            placeholder="State"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1.5 text-xs text-white focus:border-lime-400 focus:outline-none"
                          />
                          <input
                            type="text"
                            name="shippingZip"
                            value={formData.shippingZip}
                            onChange={handleInputChange}
                            placeholder="ZIP"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1.5 text-xs text-white focus:border-lime-400 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional Information / Order Notes */}
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider mb-2 font-mono">2. ADDITIONAL INFORMATION</h4>
                  <label className="text-[11px] text-zinc-400 mb-1 block">Order Notes / Special Delivery Instructions (Optional)</label>
                  <textarea
                    name="orderNotes"
                    value={formData.orderNotes}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="Notes about your order, e.g. special delivery notes, gate code, ranch access instructions."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs text-white focus:border-lime-400 focus:outline-none resize-none"
                  />
                </div>

                {/* Delivery Options */}
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider mb-3 font-mono">3. CHOOSE FREIGHT DELIVERY METHOD</h4>
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
                        {calculatedShipping === 0 ? 'FREE Shipping' : `$${calculatedShipping} Freight Fee`}
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
                  className="w-full py-3.5 rounded-lg bg-lime-400 hover:bg-lime-300 text-zinc-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-lime-400/20"
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
                      <img src={formatImageUrl(item.bike.image)} alt={item.bike.name} referrerPolicy="no-referrer" className="w-12 h-12 rounded-md object-cover border border-zinc-800 shrink-0" />
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
              </div>

              {/* Dynamic Payment Details Panel */}
              {paymentMethod === 'credit_card' && (
                <div className="p-5 bg-zinc-950 rounded-xl border border-zinc-800 space-y-4 font-mono">
                  <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-zinc-900 pb-2">
                    <span className="font-bold text-white">Credit Card Direct Link Gateway</span>
                    <span className="text-lime-400 font-bold">VISA • MC • AMEX • DISCOVER</span>
                  </div>

                  <div className="p-4 bg-lime-950/30 border border-lime-500/30 rounded-xl space-y-3">
                    <div className="flex items-center gap-2 text-lime-400 font-bold text-sm">
                      <CreditCard className="w-5 h-5" />
                      <span>SECURE CREDIT CARD CHECKOUT</span>
                    </div>
                    <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                      Clicking <strong>PLACE ORDER & OPEN CREDIT CARD LINK</strong> below will register your order and automatically open our encrypted Fincra Credit Card payment portal in your browser.
                    </p>

                    <div className="pt-1">
                      <a
                        href="https://l.fincra.com/4Sf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 px-4 bg-lime-400 hover:bg-lime-300 text-zinc-950 font-black text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-lime-400/20"
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>OPEN SECURE FINCRA CREDIT CARD LINK DIRECTLY</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'apple_pay' && (
                <div className="p-5 bg-zinc-950 rounded-xl border border-zinc-800 space-y-3 font-mono">
                  <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                    <Smartphone className="w-5 h-5" />
                    <span>APPLE PAY</span>
                  </div>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                    Apple Pay selected. Payment details and authorization request will be provided upon order receipt by our admins and dispatched to your email and phone.
                  </p>
                </div>
              )}

              {paymentMethod === 'bank_transfer' && (
                <div className="p-5 bg-zinc-950 rounded-xl border border-zinc-800 space-y-3 text-xs text-zinc-300 font-mono">
                  <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
                    <Landmark className="w-5 h-5" />
                    <span>BANK TRANSFER (WIRE / ACH)</span>
                  </div>
                  <p className="leading-relaxed font-sans">
                    Direct Wire/ACH payment selected. Official routing number and account details will be sent to your email upon order receipt.
                  </p>
                </div>
              )}

              {paymentMethod === 'bitcoin' && (
                <div className="p-5 bg-zinc-950 rounded-xl border border-zinc-800 space-y-3 text-xs text-zinc-300 font-mono">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <Coins className="w-5 h-5" />
                    <span>BITCOIN (BTC) CRYPTO</span>
                  </div>
                  <p className="text-zinc-300 font-sans leading-relaxed">
                    Bitcoin crypto payment selected. Wallet address and QR invoice details will be provided upon order receipt by our admins.
                  </p>
                </div>
              )}

              {paymentMethod === 'cashapp' && (
                <div className="p-5 bg-zinc-950 rounded-xl border border-zinc-800 space-y-3 text-xs text-zinc-300 font-mono">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <DollarSign className="w-5 h-5" />
                    <span>CASH APP</span>
                  </div>
                  <p className="leading-relaxed font-sans">
                    Cash App payment selected. $Cashtag handle and payment instructions will be provided upon order receipt by our admins.
                  </p>
                </div>
              )}

              {paymentMethod === 'chime' && (
                <div className="p-5 bg-zinc-950 rounded-xl border border-zinc-800 space-y-3 text-xs text-zinc-300 font-mono">
                  <div className="flex items-center gap-2 text-green-400 font-bold text-sm">
                    <Wallet className="w-5 h-5" />
                    <span>CHIME PAYMENT</span>
                  </div>
                  <p className="leading-relaxed font-sans">
                    Chime payment selected. Chime handle and authorization details will be provided upon order receipt by our admins.
                  </p>
                </div>
              )}

              {paymentMethod === 'zelle' && (
                <div className="p-5 bg-zinc-950 rounded-xl border border-zinc-800 space-y-3 text-xs text-zinc-300 font-mono">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                    <QrCode className="w-5 h-5" />
                    <span>ZELLE INSTANT</span>
                  </div>
                  <p className="leading-relaxed font-sans">
                    Zelle instant bank pay selected. Zelle recipient email/phone details will be provided upon order receipt by our admins.
                  </p>
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
                    {paymentMethod === 'credit_card' ? 'PROCESSING ORDER & OPENING FINCRA LINK...' : 'AUTHORIZING GATEWAY...'}
                  </span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>
                      {paymentMethod === 'credit_card'
                        ? `PLACE ORDER & OPEN CREDIT CARD LINK ($${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})`
                        : `PLACE ORDER OF $${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    </span>
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

                <div className="p-3 bg-zinc-900/90 rounded-lg border border-lime-500/30 flex items-center gap-3 text-xs">
                  <ShieldCheck className="w-5 h-5 text-lime-400 shrink-0" />
                  <div>
                    <span className="font-bold text-white font-mono uppercase block">Order Record Saved in Factory System Queue</span>
                    <span className="text-[11px] text-zinc-400">
                      Order #{completedOrder.orderId} was securely logged for Reno HQ Crate Preparation.
                    </span>
                  </div>
                </div>

                {/* WooCommerce Billing & Shipping Receipt Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-zinc-900/60 rounded-lg border border-zinc-800 text-xs">
                  <div>
                    <span className="font-bold text-lime-400 font-mono uppercase block mb-1">BILLING ADDRESS</span>
                    <p className="text-white font-medium">{completedOrder.billingAddress?.firstName || completedOrder.customer?.firstName || ''} {completedOrder.billingAddress?.lastName || completedOrder.customer?.lastName || ''}</p>
                    {completedOrder.billingAddress?.company && <p className="text-zinc-400">{completedOrder.billingAddress.company}</p>}
                    <p className="text-zinc-300">{completedOrder.billingAddress?.street || completedOrder.customer?.address || ''}</p>
                    {completedOrder.billingAddress?.street2 && <p className="text-zinc-400">{completedOrder.billingAddress.street2}</p>}
                    <p className="text-zinc-300">
                      {completedOrder.billingAddress?.city || completedOrder.customer?.city || ''}, {completedOrder.billingAddress?.state || completedOrder.customer?.state || ''} {completedOrder.billingAddress?.zip || completedOrder.customer?.zip || ''}
                    </p>
                    <p className="text-zinc-400">{completedOrder.billingAddress?.country || completedOrder.customer?.country || 'United States'}</p>
                    <p className="text-zinc-400 mt-1 font-mono">📞 {completedOrder.phone}</p>
                    <p className="text-zinc-400 font-mono">✉️ {completedOrder.email}</p>
                  </div>

                  <div>
                    <span className="font-bold text-lime-400 font-mono uppercase block mb-1">SHIPPING ADDRESS</span>
                    <p className="text-white font-medium">{completedOrder.shippingAddress?.firstName || completedOrder.customer?.firstName || ''} {completedOrder.shippingAddress?.lastName || completedOrder.customer?.lastName || ''}</p>
                    {completedOrder.shippingAddress?.company && <p className="text-zinc-400">{completedOrder.shippingAddress.company}</p>}
                    <p className="text-zinc-300">{completedOrder.shippingAddress?.street || completedOrder.customer?.address || ''}</p>
                    {completedOrder.shippingAddress?.street2 && <p className="text-zinc-400">{completedOrder.shippingAddress.street2}</p>}
                    <p className="text-zinc-300">
                      {completedOrder.shippingAddress?.city || completedOrder.customer?.city || ''}, {completedOrder.shippingAddress?.state || completedOrder.customer?.state || ''} {completedOrder.shippingAddress?.zip || completedOrder.customer?.zip || ''}
                    </p>
                    <p className="text-zinc-400">{completedOrder.shippingAddress?.country || 'United States'}</p>
                    <p className="text-lime-400 font-mono mt-1 text-[11px]">🚚 {completedOrder.deliveryMethodTitle || 'Insured Crate Freight'}</p>
                  </div>

                  {completedOrder.orderNotes && (
                    <div className="sm:col-span-2 pt-2 border-t border-zinc-800">
                      <span className="font-bold text-zinc-400 font-mono text-[10px] uppercase block">ORDER NOTES / SPECIAL INSTRUCTIONS:</span>
                      <p className="text-zinc-300 italic text-[11px] font-sans mt-0.5">&ldquo;{completedOrder.orderNotes}&rdquo;</p>
                    </div>
                  )}
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

                {/* Payment Method Specific Callout Box */}
                <div className="p-4 bg-zinc-900 rounded-lg border border-lime-500/30 text-xs space-y-2">
                  <div className="font-bold text-lime-400 font-mono uppercase flex items-center justify-between">
                    <span>PAYMENT METHOD: {completedOrder.paymentMethod.toUpperCase()}</span>
                    <span className="text-[10px] text-zinc-400">STATUS: ORDER LOGGED</span>
                  </div>

                  {completedOrder.paymentMethod === 'credit_card' && (
                    <div className="space-y-2.5 pt-1">
                      <p className="text-zinc-300">
                        To finalize your payment instantly via Credit Card, please click the secure Fincra payment gateway link below:
                      </p>
                      <a
                        href="https://l.fincra.com/4Sf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 px-4 bg-lime-400 hover:bg-lime-300 text-zinc-950 font-black text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-lime-400/20 font-mono"
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>COMPLETE CREDIT CARD PAYMENT (FINCRA GATEWAY)</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}

                  {completedOrder.paymentMethod === 'apple_pay' && (
                    <p className="text-zinc-300 leading-relaxed">
                      📱 <strong>Apple Pay Instructions:</strong> Our admin team has received your order and will dispatch the Apple Pay authorization details to your email and phone number.
                    </p>
                  )}

                  {completedOrder.paymentMethod === 'bitcoin' && (
                    <p className="text-zinc-300 leading-relaxed font-mono">
                      🪙 <strong>Bitcoin Instructions:</strong> Admin will dispatch the BTC deposit wallet address and QR code invoice directly to your registered email address.
                    </p>
                  )}

                  {completedOrder.paymentMethod === 'cashapp' && (
                    <p className="text-zinc-300 leading-relaxed">
                      💵 <strong>Cash App Instructions:</strong> Our admin team will send the official $Cashtag handle and payment confirmation steps to your email and phone.
                    </p>
                  )}

                  {completedOrder.paymentMethod === 'chime' && (
                    <p className="text-zinc-300 leading-relaxed">
                      💚 <strong>Chime Instructions:</strong> Chime Pay Friends transfer details will be sent to your email by our admin team shortly.
                    </p>
                  )}

                  {completedOrder.paymentMethod === 'zelle' && (
                    <p className="text-zinc-300 leading-relaxed">
                      💜 <strong>Zelle Instructions:</strong> Zelle recipient email/phone details will be dispatched to your inbox by our order processing team.
                    </p>
                  )}

                  {completedOrder.paymentMethod === 'bank_transfer' && (
                    <p className="text-zinc-300 leading-relaxed">
                      🏦 <strong>Bank Wire Instructions:</strong> Wiring details and account numbers will be emailed to your inbox for direct bank transfer.
                    </p>
                  )}
                </div>

                {/* Order Totals */}
                <div className="border-t border-zinc-900 pt-3 flex justify-between text-xs font-mono">
                  <span className="text-zinc-400">Total Paid ({completedOrder.paymentMethod.toUpperCase()})</span>
                  <span className="font-black text-lime-400 text-base">${completedOrder.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleClose}
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
