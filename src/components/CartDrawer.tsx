'use client';

import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Tag, 
  Truck,
  Zap,
  Lock
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatImageUrl } from '../lib/imageUtils';

interface CartDrawerProps {
  onOpenCheckout: () => void;
  onExploreShop: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onOpenCheckout,
  onExploreShop
}) => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    subtotal, 
    appliedPromo, 
    discountRate, 
    applyPromoCode, 
    removePromoCode 
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoMsg, setPromoMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isCartOpen) return null;

  const discountAmount = subtotal * discountRate;
  
  // Calculate shipping according to rules:
  // - Accessories / Battery: $0
  // - Dirt bikes (electric-dirt-bikes): $250
  // - E-bikes (e-bikes): $150
  const estimatedShipping = cart.reduce((sum, item) => {
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

  const estimatedTax = (subtotal - discountAmount) * 0.07;
  const grandTotal = subtotal - discountAmount + estimatedShipping + estimatedTax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    const res = applyPromoCode(promoInput);
    if (res.success) {
      setPromoMsg({ type: 'success', text: res.message });
      setPromoInput('');
    } else {
      setPromoMsg({ type: 'error', text: res.message });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div className="flex-1 cursor-pointer" onClick={() => setIsCartOpen(false)} />

      {/* Slide-over Panel */}
      <div className="w-full max-w-md bg-zinc-900 border-l border-zinc-800 text-white flex flex-col h-full shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Cart Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-lime-400/10 rounded-lg text-lime-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-sm uppercase tracking-wider text-white">YOUR BEAST CART</h3>
              <p className="text-xs text-zinc-400 font-mono">{cart.length} item(s) in queue</p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Freight Delivery Banner */}
        <div className="bg-lime-950/40 border-b border-lime-800/40 px-4 py-2.5 text-xs flex items-center justify-between text-lime-400 font-mono">
          <span className="flex items-center gap-1.5 font-bold">
            <Truck className="w-4 h-4 text-lime-400" />
            FREE SHIPPING ON ACCESSORIES | $250 DIRT BIKES / $150 E-BIKES
          </span>
          <span className="font-bold">{estimatedShipping === 0 ? 'FREE SHIP' : `$${estimatedShipping}`}</span>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#0B0B0B]">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-600 border border-zinc-800">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-black text-white text-base uppercase tracking-wider">YOUR CART IS EMPTY</h4>
                <p className="text-xs text-zinc-400 max-w-xs mt-1 leading-relaxed">
                  Ready for instant electric wheelies? Dominate the dirt track or street asphalt with VOLT-X machines.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onExploreShop();
                }}
                className="px-6 py-3 rounded-lg bg-lime-400 hover:bg-lime-300 text-zinc-950 font-black text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                EXPLORE MACHINES
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const itemAccTotal = item.selectedAccessories.reduce((acc, a) => acc + a.price, 0);
              const singleItemPrice = item.bike.price + itemAccTotal;
              const lineTotal = singleItemPrice * item.quantity;

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3 relative group"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={formatImageUrl(item.bike.image)}
                      alt={item.bike.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 object-cover rounded-lg border border-zinc-800 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-black text-sm text-white uppercase tracking-wider truncate">{item.bike.name}</h4>
                      <p className="text-[11px] text-lime-400 font-mono font-bold">
                        {item.bike.specs.batteryVoltage}V {item.bike.specs.batteryAh}Ah | {item.bike.specs.peakPowerKW}kW
                      </p>

                      {/* Accessories attached */}
                      {item.selectedAccessories.length > 0 && (
                        <div className="mt-1.5 space-y-0.5">
                          <span className="text-[9px] text-zinc-400 font-black uppercase tracking-wider font-mono">Factory Upgrades:</span>
                          {item.selectedAccessories.map((acc) => (
                            <div key={acc.id} className="text-[10px] text-zinc-300 flex justify-between font-mono">
                              <span>+ {acc.name}</span>
                              <span className="text-zinc-400">${acc.price}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-zinc-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quantity & Item Line Total */}
                  <div className="flex items-center justify-between pt-2 border-t border-zinc-900 text-xs">
                    <div className="flex items-center gap-1 bg-zinc-900 rounded-lg p-1 border border-zinc-800">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-zinc-800 rounded text-zinc-300 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 font-mono font-bold text-white text-xs">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-zinc-800 rounded text-zinc-300 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-mono font-black text-base text-white">${lineTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Promo Code & Order Summary Footer */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-zinc-800 bg-zinc-950 space-y-4">
            
            {/* Promo Code Box */}
            <div>
              {appliedPromo ? (
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-lime-950/40 border border-lime-800/60 text-xs text-lime-400 font-mono">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Tag className="w-3.5 h-3.5 text-lime-400" />
                    <span>PROMO APPLIED: {appliedPromo} ({discountRate * 100}% OFF)</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-zinc-400 hover:text-white underline text-[10px] cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="PROMO CODE (E.G. VOLTX2026)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 uppercase font-mono focus:outline-none focus:border-lime-400"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-black uppercase text-zinc-200 cursor-pointer font-mono"
                  >
                    APPLY
                  </button>
                </form>
              )}

              {promoMsg && (
                <p className={`text-[10px] mt-1 font-mono ${promoMsg.type === 'success' ? 'text-lime-400' : 'text-rose-400'}`}>
                  {promoMsg.text}
                </p>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-zinc-400 border-t border-zinc-900 pt-3 font-sans">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-zinc-200">${subtotal.toLocaleString()}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-lime-400">
                  <span>Discount ({appliedPromo})</span>
                  <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>50-State Crate Freight</span>
                <span className="font-mono text-zinc-200">
                  {estimatedShipping === 0 ? <span className="text-lime-400 font-bold">FREE</span> : `$${estimatedShipping}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated US State Sales Tax (7%)</span>
                <span className="font-mono text-zinc-200">${estimatedTax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between pt-2 border-t border-zinc-800 text-sm font-black text-white">
                <span>ORDER TOTAL</span>
                <span className="font-mono text-lime-400 text-lg">${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>

            {/* Payment Methods Callout */}
            <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between font-mono">
              <span>Instant Dispatch Direct Checkout</span>
              <span className="text-lime-400 font-bold">Fincra • Cards • Crypto</span>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                onOpenCheckout();
              }}
              className="w-full py-3.5 rounded-lg bg-lime-400 hover:bg-lime-300 text-zinc-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-lime-400/20 transition-all transform active:scale-98 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>PROCEED TO SECURE CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-400 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
              <span>256-BIT SSL ENCRYPTION • 30-DAY TRAIL GUARANTEE</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
