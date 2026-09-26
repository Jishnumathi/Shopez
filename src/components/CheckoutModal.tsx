import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { OrderCustomer } from '../types';
import {
  X,
  Lock,
  CreditCard,
  Truck,
  ShieldCheck,
  Check,
  Phone,
  Building,
  User,
  Mail,
  MapPin,
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    discountSavings,
    shippingFee,
    estimatedTax,
    cartTotal,
    appliedDiscount,
    placeOrder,
  } = useShop();

  const [customer, setCustomer] = useState<OrderCustomer>({
    fullName: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 492-8812',
    address: '428 Mercer Street, Apt 3A',
    city: 'New York',
    postalCode: '10013',
    country: 'United States',
    notes: 'Please buzz code #4410 at gate.',
  });

  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'apple_pay' | 'cash_on_delivery'>('credit_card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 9211');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvc, setCardCvc] = useState('782');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen || cart.length === 0) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      placeOrder(customer, paymentMethod);
      setIsProcessing(false);
      setIsCheckoutOpen(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-display">
                Secure Express Checkout
              </h2>
              <div className="text-[11px] text-slate-500">
                256-bit TLS Encrypted Transaction · ShopEZ Buyer Guarantee
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmitOrder} className="overflow-y-auto flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Customer & Shipping Details (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* 1. Customer & Shipping Contact */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs uppercase tracking-wider font-bold text-slate-900 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-600" />
                    <span>1. Shipping Information</span>
                  </h3>
                  <span className="text-[11px] text-slate-400">All fields required</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Recipient Name
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.fullName}
                      onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={customer.email}
                        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                        placeholder="jane@example.com"
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number (for Courier SMS)
                      </label>
                      <input
                        type="tel"
                        required
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.address}
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                      placeholder="Street name, suite or apartment number"
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={customer.city}
                        onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                        placeholder="City"
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        required
                        value={customer.postalCode}
                        onChange={(e) => setCustomer({ ...customer, postalCode: e.target.value })}
                        placeholder="Postal code"
                        className="w-full text-xs font-mono px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        required
                        value={customer.country}
                        onChange={(e) => setCustomer({ ...customer, country: e.target.value })}
                        placeholder="Country"
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Delivery Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      value={customer.notes || ''}
                      onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                      placeholder="Gate code, safe place to leave parcel, etc."
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Payment Method */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="text-xs uppercase tracking-wider font-bold text-slate-900 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-slate-600" />
                  <span>2. Payment Method</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit_card')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-colors cursor-pointer ${
                      paymentMethod === 'credit_card'
                        ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mb-2" />
                    <div>
                      <div className="text-xs font-bold">Credit / Debit</div>
                      <div className="text-[10px] opacity-80">Visa, Mastercard, Amex</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple_pay')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-colors cursor-pointer ${
                      paymentMethod === 'apple_pay'
                        ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                    }`}
                  >
                    <span className="text-base font-bold mb-2"> Pay</span>
                    <div>
                      <div className="text-xs font-bold">Digital Wallet</div>
                      <div className="text-[10px] opacity-80">1-Touch authorization</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash_on_delivery')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-colors cursor-pointer ${
                      paymentMethod === 'cash_on_delivery'
                        ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                    }`}
                  >
                    <Truck className="w-5 h-5 mb-2" />
                    <div>
                      <div className="text-xs font-bold">Cash on Delivery</div>
                      <div className="text-[10px] opacity-80">Pay upon parcel arrival</div>
                    </div>
                  </button>
                </div>

                {/* Sub-inputs based on payment type */}
                {paymentMethod === 'credit_card' && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="•••• •••• •••• 9211"
                        className="w-full text-xs font-mono px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          Expiry (MM/YY)
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full text-xs font-mono px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          Security CVC
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          placeholder="•••"
                          className="w-full text-xs font-mono px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'cash_on_delivery' && (
                  <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1.5">
                    <div className="font-semibold flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-amber-700" />
                      <span>Cash on Delivery Verification</span>
                    </div>
                    <p className="text-[11px] text-amber-800 leading-relaxed">
                      Our dispatch driver will collect the exact amount (${cartTotal.toFixed(2)}) in cash or via mobile QR code upon delivery. A verification SMS will be sent to {customer.phone}.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Order Summary Breakdown (5 cols) */}
            <div className="lg:col-span-5 bg-slate-50/80 p-5 rounded-xl border border-slate-200 space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-xs uppercase tracking-wider font-bold text-slate-900 mb-3">
                  Order Summary ({cart.length} items)
                </h3>

                {/* Items preview list */}
                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {cart.map((it) => (
                    <div key={it.product.id} className="flex items-center gap-3 text-xs">
                      <img
                        src={it.product.image}
                        alt={it.product.name}
                        className="w-10 h-10 rounded-md object-cover bg-white border border-slate-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-slate-900 truncate">{it.product.name}</div>
                        <div className="text-[11px] text-slate-400">Qty: {it.quantity}</div>
                      </div>
                      <div className="font-mono font-medium text-slate-800 tabular-nums">
                        ${(it.product.price * it.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 pt-4 mt-4 border-t border-slate-200 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Merchandise Subtotal</span>
                    <span className="font-mono tabular-nums">${cartSubtotal.toFixed(2)}</span>
                  </div>

                  {discountSavings > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Promo Savings ({appliedDiscount?.code})</span>
                      <span className="font-mono tabular-nums">-${discountSavings.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Standard Shipping</span>
                    <span className="font-mono tabular-nums">
                      {shippingFee === 0 ? <span className="text-emerald-700 font-medium">Free</span> : `$${shippingFee.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Estimated Sales Tax</span>
                    <span className="font-mono tabular-nums">${estimatedTax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-slate-950 pt-2 border-t border-slate-200">
                    <span>Total Amount Due</span>
                    <span className="font-mono tabular-nums">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="space-y-3 pt-4">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 px-4 bg-slate-950 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>Securing Authorization...</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Confirm &amp; Place Order (${cartTotal.toFixed(2)})</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>30-Day Money Back Guarantee · Fast Dispatch</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
