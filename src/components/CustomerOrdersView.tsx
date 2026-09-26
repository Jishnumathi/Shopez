import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Order, OrderStatus } from '../types';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShoppingBag,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Receipt,
  RotateCcw,
} from 'lucide-react';

export const CustomerOrdersView: React.FC = () => {
  const { orders, setCurrentView, addToCart, setIsCartOpen } = useShop();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(orders[0]?.id || null);

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">
            Confirmed
          </span>
        );
      case 'processing':
        return (
          <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            In Packaging
          </span>
        );
      case 'shipped':
        return (
          <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-indigo-50 text-indigo-800 border border-indigo-200">
            Shipped &amp; In Transit
          </span>
        );
      case 'delivered':
        return (
          <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            Delivered
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-rose-50 text-rose-800 border border-rose-200">
            Cancelled
          </span>
        );
    }
  };

  const handleReorder = (order: Order) => {
    order.items.forEach((it) => {
      addToCart(it.product, it.quantity);
    });
    setIsCartOpen(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Title & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
        <div>
          <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
            Customer Hub
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-display">
            My Orders &amp; Shipment Tracking
          </h1>
        </div>

        <button
          onClick={() => setCurrentView('catalog')}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Browse Storefront</span>
        </button>
      </div>

      {/* Orders List */}
      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => {
            const isExpanded = expandedOrderId === order.id;

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all"
              >
                {/* Order Summary Strip */}
                <div
                  onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/60 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                      <Package className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-slate-900">
                          {order.id}
                        </span>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                        <span>{new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span aria-hidden="true">·</span>
                        <span>{order.items.reduce((s, it) => s + it.quantity, 0)} items</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono font-semibold text-slate-900 tabular-nums">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReorder(order);
                      }}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reorder</span>
                    </button>

                    <div className="text-slate-400 p-1">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details: Timeline & Items */}
                {isExpanded && (
                  <div className="p-6 border-t border-slate-200 bg-slate-50/40 space-y-6">
                    {/* Carrier & Tracking */}
                    <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-[11px] text-slate-400 uppercase font-semibold">
                          Carrier &amp; Tracking
                        </span>
                        <div className="text-xs font-bold text-slate-900 mt-0.5">
                          {order.carrier} — <span className="font-mono">{order.trackingNumber}</span>
                        </div>
                      </div>

                      <div className="sm:text-right">
                        <span className="text-[11px] text-slate-400 uppercase font-semibold">
                          Estimated Delivery
                        </span>
                        <div className="text-xs font-bold text-emerald-800 font-mono mt-0.5">
                          {order.estimatedDelivery}
                        </div>
                      </div>
                    </div>

                    {/* Timeline Events */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        Shipment Timeline
                      </h4>

                      <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                        {order.timeline.map((event, idx) => (
                          <div key={idx} className="relative">
                            <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center text-white" />
                            <div className="text-xs font-bold text-slate-900">{event.title}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">{event.note}</div>
                            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                              {new Date(event.timestamp).toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Items Purchased */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        Package Contents
                      </h4>
                      <div className="divide-y divide-slate-100 bg-white rounded-xl border border-slate-200 overflow-hidden">
                        {order.items.map((it) => (
                          <div key={it.product.id} className="p-3 flex items-center justify-between gap-3 text-xs">
                            <div className="flex items-center gap-3">
                              <img
                                src={it.product.image}
                                alt={it.product.name}
                                className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0"
                              />
                              <div>
                                <span className="font-semibold text-slate-900 block">{it.product.name}</span>
                                <span className="text-[11px] text-slate-500">Qty: {it.quantity}</span>
                              </div>
                            </div>
                            <span className="font-mono font-bold text-slate-900 tabular-nums">
                              ${(it.product.price * it.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-20 text-center flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">No orders found yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mb-6">
            When you complete a purchase, your tracking numbers, order receipts, and status updates will be displayed here.
          </p>
          <button
            onClick={() => setCurrentView('catalog')}
            className="px-5 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Explore Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
