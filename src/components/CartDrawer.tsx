import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Trash2,
  ArrowRight,
  ShoppingBag,
  Tag,
  Check,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    appliedDiscount,
    discountSavings,
    shippingFee,
    estimatedTax,
    cartTotal,
    applyDiscountCode,
    removeDiscountCode,
    availableDiscounts,
    setIsCheckoutOpen,
  } = useShop();

  const [inputCode, setInputCode] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCode = (codeToApply?: string) => {
    const code = codeToApply || inputCode;
    if (!code.trim()) return;

    const res = applyDiscountCode(code);
    setPromoFeedback(res);
    if (res.success) {
      setInputCode('');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const freeShippingThreshold = 75;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-slate-900" />
              <h2 className="text-base font-bold text-slate-900 font-display">Shopping Bag</h2>
              <span className="text-xs text-slate-500 font-mono">({cart.length} items)</span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          {cart.length > 0 && (
            <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-200/80 text-xs">
              {amountToFreeShipping > 0 ? (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-slate-600">
                    <span>
                      Add <strong className="text-slate-900 font-mono">${amountToFreeShipping.toFixed(2)}</strong> more for free standard delivery
                    </span>
                    <span className="font-mono text-[11px]">{freeShippingProgress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-300"
                      style={{ width: `${freeShippingProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>You've unlocked free carbon-neutral shipping!</span>
                </div>
              )}
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 rounded-xl border border-slate-200/80 bg-white hover:border-slate-300 transition-colors"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg bg-slate-100 shrink-0 border border-slate-100"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-slate-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-500">{item.product.brand}</div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-slate-200 rounded-md overflow-hidden bg-slate-50">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 text-slate-600 hover:bg-slate-200 text-xs font-bold transition-colors cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-mono font-medium text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stockQuantity}
                          className="px-2 py-1 text-slate-600 hover:bg-slate-200 text-xs font-bold transition-colors disabled:opacity-30 cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      {/* Line Price */}
                      <div className="text-xs font-bold text-slate-900 font-mono tabular-nums">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Your bag is currently empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mb-6">
                  Explore our curated objects and discover artisanal pieces ready for your home or studio.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Start Exploring
                </button>
              </div>
            )}
          </div>

          {/* Footer & Checkout Area (if cart has items) */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50/70 space-y-4">
              {/* Promo Code Input & Available Suggestions */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Discount code (e.g. SHOPEZ15)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                      className="w-full pl-8 pr-3 py-1.5 text-xs uppercase font-mono border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-slate-900"
                    />
                  </div>
                  <button
                    onClick={() => handleApplyCode()}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                {/* Promo Feedback message */}
                {promoFeedback && (
                  <div
                    className={`text-[11px] p-2 rounded-lg flex items-center gap-1.5 ${
                      promoFeedback.success
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}
                  >
                    {promoFeedback.success ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    )}
                    <span>{promoFeedback.message}</span>
                  </div>
                )}

                {/* Applied Discount Tag */}
                {appliedDiscount && (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs">
                    <span className="font-mono text-emerald-900 font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      {appliedDiscount.code} applied (-${discountSavings.toFixed(2)})
                    </span>
                    <button
                      onClick={removeDiscountCode}
                      className="text-xs text-rose-600 hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {/* Quick Coupon Suggestions */}
                {!appliedDiscount && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[11px] text-slate-500 mr-1 flex items-center">Available:</span>
                    {availableDiscounts.slice(0, 2).map((d) => (
                      <button
                        key={d.code}
                        onClick={() => handleApplyCode(d.code)}
                        className="px-2 py-0.5 text-[10px] font-mono bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-900 border border-slate-200 rounded transition-colors cursor-pointer"
                      >
                        {d.code}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">${cartSubtotal.toFixed(2)}</span>
                </div>

                {discountSavings > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount Savings</span>
                    <span className="font-mono tabular-nums">-${discountSavings.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-mono tabular-nums">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-medium">Free</span>
                    ) : (
                      `$${shippingFee.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Tax (7.5%)</span>
                  <span className="font-mono tabular-nums">${estimatedTax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm font-bold text-slate-950 pt-2 border-t border-slate-200">
                  <span>Total</span>
                  <span className="font-mono tabular-nums text-base">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedCheckout}
                className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-950 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
