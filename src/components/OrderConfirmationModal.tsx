import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  CheckCircle2,
  Package,
  Truck,
  Copy,
  Check,
  Printer,
  ArrowRight,
  ShieldCheck,
  Clock,
} from 'lucide-react';

export const OrderConfirmationModal: React.FC = () => {
  const {
    placedOrderConfirmation,
    setPlacedOrderConfirmation,
    setCurrentView,
  } = useShop();

  const [copiedTracking, setCopiedTracking] = useState(false);

  if (!placedOrderConfirmation) return null;

  const order = placedOrderConfirmation;

  const handleCopyTracking = () => {
    navigator.clipboard.writeText(order.trackingNumber);
    setCopiedTracking(true);
    setTimeout(() => setCopiedTracking(false), 2500);
  };

  const handleViewOrders = () => {
    setPlacedOrderConfirmation(null);
    setCurrentView('orders');
  };

  const handleContinueShopping = () => {
    setPlacedOrderConfirmation(null);
    setCurrentView('catalog');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Header */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 text-center space-y-3 relative">
          <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <div className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
              Payment &amp; Booking Confirmed
            </div>
            <h2 className="text-2xl font-bold font-display text-white">
              Thank you, {order.customer.fullName.split(' ')[0]}!
            </h2>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              We've dispatched your order confirmation receipt to <strong className="text-white">{order.customer.email}</strong>.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700 px-3.5 py-1.5 rounded-lg text-xs font-mono text-slate-200 mt-2">
            <span>Order Reference:</span>
            <span className="font-bold text-amber-400">{order.id}</span>
          </div>
        </div>

        {/* Scrollable Receipt & Tracking Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {/* Tracking & ETA Card */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                  Carrier &amp; Tracking ID
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs font-bold text-slate-900">{order.carrier}</span>
                  <span className="text-xs font-mono text-slate-600">({order.trackingNumber})</span>
                  <button
                    onClick={handleCopyTracking}
                    className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors cursor-pointer"
                    title="Copy tracking number"
                  >
                    {copiedTracking ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="sm:text-right">
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                  Estimated Delivery
                </div>
                <div className="text-xs font-bold text-emerald-800 font-mono">
                  {order.estimatedDelivery}
                </div>
              </div>
            </div>

            {/* 4-Step Visual Progress Bar */}
            <div className="pt-3 border-t border-slate-200/80">
              <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                <div className="space-y-1">
                  <div className="h-1.5 w-full bg-emerald-500 rounded-full" />
                  <span className="font-bold text-slate-900">Confirmed</span>
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 w-full bg-amber-400 rounded-full" />
                  <span className="font-medium text-slate-600">Packaging</span>
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 w-full bg-slate-200 rounded-full" />
                  <span className="text-slate-400">Dispatched</span>
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 w-full bg-slate-200 rounded-full" />
                  <span className="text-slate-400">Delivered</span>
                </div>
              </div>
            </div>
          </div>

          {/* Purchased Items List */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-bold text-slate-900">
              Purchased Items ({order.items.length})
            </h3>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
              {order.items.map((it) => (
                <div key={it.product.id} className="p-3 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={it.product.image}
                      alt={it.product.name}
                      className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0"
                    />
                    <div>
                      <div className="font-semibold text-slate-900">{it.product.name}</div>
                      <div className="text-[11px] text-slate-400">
                        Qty: {it.quantity} · ${it.product.price.toFixed(2)} each
                      </div>
                    </div>
                  </div>
                  <div className="font-mono font-bold text-slate-900 tabular-nums">
                    ${(it.product.price * it.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Destination & Payment Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">Shipping Address:</span>
              <div className="text-slate-600 leading-relaxed">
                {order.customer.fullName}<br />
                {order.customer.address}<br />
                {order.customer.city}, {order.customer.postalCode}, {order.customer.country}<br />
                Tel: {order.customer.phone}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">Payment Summary:</span>
              <div className="space-y-1 text-slate-600">
                <div className="flex justify-between">
                  <span>Method:</span>
                  <span className="font-medium text-slate-900 capitalize">
                    {order.paymentMethod.replace(/_/g, ' ')}
                  </span>
                </div>
                {order.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount applied:</span>
                    <span className="font-mono tabular-nums">-${order.discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="font-medium text-slate-900">
                    {order.shippingFee === 0 ? 'Free' : `$${order.shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-slate-950 pt-1 border-t border-slate-200">
                  <span>Total Paid:</span>
                  <span className="font-mono tabular-nums text-sm">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-4 py-2 border border-slate-300 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>

          <div className="w-full sm:w-auto flex items-center gap-2">
            <button
              onClick={handleViewOrders}
              className="flex-1 sm:flex-initial px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-900 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Go to My Orders
            </button>
            <button
              onClick={handleContinueShopping}
              className="flex-1 sm:flex-initial px-5 py-2 bg-slate-900 hover:bg-slate-950 text-white text-xs font-semibold rounded-lg transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
