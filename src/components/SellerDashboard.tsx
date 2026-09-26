import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { OrderStatus, Product, ProductCategory, DiscountCode } from '../types';
import {
  TrendingUp,
  DollarSign,
  Package,
  ShoppingBag,
  Users,
  CheckCircle2,
  Clock,
  Truck,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit3,
  Tag,
  ArrowUpRight,
  ArrowDownRight,
  X,
  Sparkles,
  BarChart3,
  Layers,
  AlertTriangle,
} from 'lucide-react';

export const SellerDashboard: React.FC = () => {
  const {
    sellerAnalytics,
    orders,
    updateOrderStatus,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    availableDiscounts,
    addDiscountCode,
    setCurrentView,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'analytics' | 'orders' | 'inventory' | 'discounts'>('analytics');
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [orderSearch, setOrderSearch] = useState('');

  // Modals state
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAddPromoModal, setShowAddPromoModal] = useState(false);
  const [dispatchModalOrder, setDispatchModalOrder] = useState<string | null>(null);
  const [carrierInput, setCarrierInput] = useState('FedEx Priority Express');
  const [trackingInput, setTrackingInput] = useState(`TRK-${Math.floor(100000000 + Math.random() * 900000000)}`);

  // New Product form state
  const [newProdName, setNewProdName] = useState('');
  const [newProdBrand, setNewProdBrand] = useState('ShopEZ Studio');
  const [newProdCategory, setNewProdCategory] = useState<ProductCategory>('Home & Living');
  const [newProdPrice, setNewProdPrice] = useState(79);
  const [newProdOriginalPrice, setNewProdOriginalPrice] = useState(99);
  const [newProdStock, setNewProdStock] = useState(25);
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdBadge, setNewProdBadge] = useState('New Release');

  // New Coupon form state
  const [newPromoCode, setNewPromoCode] = useState('');
  const [newPromoPercent, setNewPromoPercent] = useState(20);
  const [newPromoMinSubtotal, setNewPromoMinSubtotal] = useState(50);
  const [newPromoDesc, setNewPromoDesc] = useState('20% off orders over $50');

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const matchesFilter = orderFilter === 'all' || o.status === orderFilter;
    const matchesSearch =
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer.fullName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer.email.toLowerCase().includes(orderSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    // Use one of the existing high quality image assets as fallback or default
    const fallbackImg = products[0]?.image || '';

    addProduct({
      name: newProdName.trim(),
      brand: newProdBrand.trim(),
      category: newProdCategory,
      price: Number(newProdPrice),
      originalPrice: newProdOriginalPrice ? Number(newProdOriginalPrice) : undefined,
      discountPercent: newProdOriginalPrice > newProdPrice
        ? Math.round(((newProdOriginalPrice - newProdPrice) / newProdOriginalPrice) * 100)
        : undefined,
      inStock: newProdStock > 0,
      stockQuantity: Number(newProdStock),
      image: fallbackImg,
      images: [fallbackImg],
      description: newProdDesc.trim() || 'Precision-crafted retail object with premium material finishes.',
      features: [
        'Ethically sourced sustainable materials',
        'Engineered for long-term reliability and daily tactile pleasure',
        'Includes official certificate of authenticity'
      ],
      specs: [
        { label: 'Category', value: newProdCategory },
        { label: 'Origin', value: 'Studio Handcrafted' },
        { label: 'Warranty', value: '2-Year Standard Coverage' }
      ],
      badge: newProdBadge.trim() || undefined,
      isFeatured: true
    });

    setShowAddProductModal(false);
    setNewProdName('');
    setNewProdDesc('');
  };

  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromoCode.trim()) return;

    addDiscountCode({
      code: newPromoCode.trim().toUpperCase(),
      percentage: Number(newPromoPercent),
      minSubtotal: Number(newPromoMinSubtotal),
      description: newPromoDesc.trim(),
      active: true,
      usageCount: 0
    });

    setShowAddPromoModal(false);
    setNewPromoCode('');
  };

  const handleConfirmDispatch = (orderId: string) => {
    updateOrderStatus(orderId, 'shipped', carrierInput, trackingInput);
    setDispatchModalOrder(null);
  };

  const maxRevenue = Math.max(...sellerAnalytics.dailySales.map((d) => d.revenue), 3000);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Seller Portal Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-600 font-semibold mb-1">
            <span>ShopEZ Merchant Hub</span>
            <span aria-hidden="true">·</span>
            <span>Flagship Storefront ID: #EZ-FL-991</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-display">
            Seller Dashboard &amp; Operations
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('catalog')}
            className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Switch to Shopper View
          </button>

          <button
            onClick={() => setShowAddProductModal(true)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Top Level Metric KPIs (6-metric grid) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Gross Revenue</span>
            <div className="p-1 rounded-md bg-emerald-50 text-emerald-700">
              <DollarSign className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            ${sellerAnalytics.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium pt-1">
            <TrendingUp className="w-3 h-3" />
            <span>+14.2% vs previous period</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Orders Fulfilled</span>
            <div className="p-1 rounded-md bg-blue-50 text-blue-700">
              <Package className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            {sellerAnalytics.totalOrders}
          </div>
          <div className="text-[11px] text-slate-500 pt-1">
            <span className="font-semibold text-slate-800">{sellerAnalytics.unitsSold}</span> total units sold
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Average Order Value</span>
            <div className="p-1 rounded-md bg-indigo-50 text-indigo-700">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            ${sellerAnalytics.avgOrderValue.toFixed(2)}
          </div>
          <div className="text-[11px] text-slate-500 pt-1">
            Across direct &amp; bundle checkouts
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Return Rate</span>
            <div className="p-1 rounded-md bg-amber-50 text-amber-700">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            {sellerAnalytics.returnRate}%
          </div>
          <div className="text-[11px] text-emerald-700 font-medium pt-1">
            Well below industry avg (3.5%)
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 mb-6 pb-2">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'analytics'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Insightful Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Order Management ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'inventory'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Catalog &amp; Inventory ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('discounts')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'discounts'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Promotions &amp; Discounts</span>
        </button>
      </div>

      {/* Tab 1: Insightful Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sales Velocity Chart Left (8 cols) */}
            <div className="lg:col-span-8 p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    Revenue Trajectory (Past 7 Days)
                  </h3>
                  <div className="text-xs text-slate-500">
                    Real-time transaction capture from web storefront
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-sm bg-slate-900"></span>
                  <span>Gross ($)</span>
                </div>
              </div>

              {/* Bar Chart Visualization */}
              <div className="h-60 pt-6 flex items-end justify-between gap-3 border-b border-slate-100 pb-2">
                {sellerAnalytics.dailySales.map((day, idx) => {
                  const barHeight = Math.max(15, Math.round((day.revenue / maxRevenue) * 100));
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded shadow-xs tabular-nums">
                        ${day.revenue}
                      </div>
                      <div
                        className="w-full bg-slate-800 group-hover:bg-amber-500 rounded-t-md transition-all duration-300"
                        style={{ height: `${barHeight}%` }}
                      />
                      <span className="text-[11px] text-slate-500 font-mono mt-1">{day.date}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span>Peak day: Sep 24 ($2,740.00 / 9 orders)</span>
                <span>Average daily pace: $1,970.00</span>
              </div>
            </div>

            {/* Category Revenue Share Right (4 cols) */}
            <div className="lg:col-span-4 p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-display">
                Revenue by Category
              </h3>
              <div className="space-y-3 pt-2">
                {sellerAnalytics.categoryBreakdown.map((item) => (
                  <div key={item.category} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-slate-700">{item.category}</span>
                      <span className="font-mono text-slate-900 tabular-nums">
                        ${item.revenue.toFixed(0)} ({item.share}%)
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-slate-900 rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(5, item.share)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Selling Products Breakdown */}
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">
              Top Velocity Products
            </h3>
            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Item Details</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Units Sold</th>
                    <th className="py-3 px-4">Current Stock</th>
                    <th className="py-3 px-4">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.slice(0, 5).map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-9 h-9 rounded-md object-cover bg-slate-100 shrink-0"
                          />
                          <div>
                            <span className="font-semibold text-slate-900 block">{prod.name}</span>
                            <span className="text-[11px] text-slate-400">{prod.brand}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{prod.category}</td>
                      <td className="py-3 px-4 font-mono font-medium text-slate-900 tabular-nums">
                        ${prod.price.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-900 tabular-nums">
                        {prod.salesCount} units
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`font-mono font-medium tabular-nums ${
                            prod.stockQuantity <= 5 ? 'text-amber-700 font-bold' : 'text-slate-700'
                          }`}
                        >
                          {prod.stockQuantity} in stock
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-800 tabular-nums">
                        ★ {prod.rating.toFixed(1)} ({prod.reviewCount})
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Efficient Order Management */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {/* Controls: Search and Status Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {['all', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map((st) => (
                <button
                  key={st}
                  onClick={() => setOrderFilter(st)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize whitespace-nowrap transition-colors cursor-pointer ${
                    orderFilter === st
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
                  }`}
                >
                  {st === 'all' ? 'All Orders' : st}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Order ID, Customer..."
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white w-64 focus:outline-none focus:border-slate-900"
              />
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Order ID &amp; Date</th>
                    <th className="py-3 px-4">Customer &amp; Location</th>
                    <th className="py-3 px-4">Items</th>
                    <th className="py-3 px-4">Amount &amp; Payment</th>
                    <th className="py-3 px-4">Fulfillment Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-50/60">
                        <td className="py-3 px-4">
                          <span className="font-mono font-bold text-slate-900 block">{ord.id}</span>
                          <span className="text-[11px] text-slate-400">
                            {new Date(ord.date).toLocaleDateString()}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <span className="font-semibold text-slate-900 block">{ord.customer.fullName}</span>
                          <span className="text-[11px] text-slate-500">
                            {ord.customer.city}, {ord.customer.country}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <div className="text-slate-700">
                            {ord.items.reduce((s, it) => s + it.quantity, 0)} units
                          </div>
                          <div className="text-[11px] text-slate-400 truncate max-w-xs">
                            {ord.items.map((i) => `${i.product.name} (x${i.quantity})`).join(', ')}
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <span className="font-mono font-bold text-slate-900 tabular-nums block">
                            ${ord.total.toFixed(2)}
                          </span>
                          <span className="text-[10px] text-slate-500 uppercase font-medium">
                            {ord.paymentMethod.replace(/_/g, ' ')}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold capitalize ${
                              ord.status === 'delivered'
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : ord.status === 'shipped'
                                ? 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                                : ord.status === 'processing'
                                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                : ord.status === 'confirmed'
                                ? 'bg-blue-50 text-blue-800 border border-blue-200'
                                : 'bg-rose-50 text-rose-800 border border-rose-200'
                            }`}
                          >
                            {ord.status}
                          </span>
                          {ord.trackingNumber && ord.trackingNumber !== 'TRK-pending' && (
                            <span className="block text-[10px] font-mono text-slate-400 mt-0.5">
                              {ord.trackingNumber}
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                          {ord.status === 'confirmed' && (
                            <button
                              onClick={() => updateOrderStatus(ord.id, 'processing')}
                              className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded text-[11px] transition-colors cursor-pointer"
                            >
                              Pack Order
                            </button>
                          )}

                          {ord.status === 'processing' && (
                            <button
                              onClick={() => setDispatchModalOrder(ord.id)}
                              className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded text-[11px] transition-colors cursor-pointer"
                            >
                              Dispatch Parcel
                            </button>
                          )}

                          {ord.status === 'shipped' && (
                            <button
                              onClick={() => updateOrderStatus(ord.id, 'delivered')}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded text-[11px] transition-colors cursor-pointer"
                            >
                              Mark Delivered
                            </button>
                          )}

                          {ord.status !== 'cancelled' && ord.status !== 'delivered' && (
                            <button
                              onClick={() => updateOrderStatus(ord.id, 'cancelled')}
                              className="px-2 py-1 text-slate-400 hover:text-rose-600 rounded text-[11px] transition-colors cursor-pointer"
                              title="Cancel order"
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400">
                        No orders match your current filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Catalog & Inventory Management */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 font-display">
              Active Stock &amp; Catalog Management
            </h3>
            <button
              onClick={() => setShowAddProductModal(true)}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Item</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Stock Level</th>
                    <th className="py-3 px-4">Adjust Inventory</th>
                    <th className="py-3 px-4 text-right">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-50/60">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                          />
                          <div>
                            <span className="font-semibold text-slate-900 block">{prod.name}</span>
                            <span className="text-[11px] text-slate-400">{prod.brand}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-slate-600">{prod.category}</td>

                      <td className="py-3 px-4">
                        <div className="font-mono font-bold text-slate-900 tabular-nums">
                          ${prod.price.toFixed(2)}
                        </div>
                        {prod.originalPrice && (
                          <div className="text-[10px] text-slate-400 line-through font-mono tabular-nums">
                            ${prod.originalPrice.toFixed(2)}
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[11px] font-mono font-semibold ${
                            prod.stockQuantity <= 5
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {prod.stockQuantity} units
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1 border border-slate-200 rounded-lg w-fit overflow-hidden bg-slate-50">
                          <button
                            onClick={() =>
                              updateProduct(prod.id, {
                                stockQuantity: Math.max(0, prod.stockQuantity - 5),
                                inStock: prod.stockQuantity - 5 > 0,
                              })
                            }
                            className="px-2 py-1 text-slate-600 hover:bg-slate-200 font-bold transition-colors cursor-pointer"
                            title="Decrease 5"
                          >
                            -5
                          </button>
                          <span className="px-2 font-mono font-semibold text-slate-900 bg-white">
                            {prod.stockQuantity}
                          </span>
                          <button
                            onClick={() =>
                              updateProduct(prod.id, {
                                stockQuantity: prod.stockQuantity + 10,
                                inStock: true,
                              })
                            }
                            className="px-2 py-1 text-slate-600 hover:bg-slate-200 font-bold transition-colors cursor-pointer"
                            title="Add 10"
                          >
                            +10
                          </button>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => deleteProduct(prod.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded transition-colors cursor-pointer"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Promotions & Discount Codes */}
      {activeTab === 'discounts' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                Active Promotional Campaigns &amp; Coupons
              </h3>
              <p className="text-xs text-slate-500">
                Coupons applied at checkout automatically adjust subtotals and free delivery tiers.
              </p>
            </div>
            <button
              onClick={() => setShowAddPromoModal(true)}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Discount Voucher</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {availableDiscounts.map((disc) => (
              <div
                key={disc.code}
                className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-900 rounded-md font-mono font-bold text-xs tracking-wider">
                    {disc.code}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Active
                  </span>
                </div>

                <p className="text-xs text-slate-600 min-h-8 leading-snug">{disc.description}</p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Min: ${disc.minSubtotal}</span>
                  <span>Used: {disc.usageCount} times</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Dispatch Parcel Carrier Entry */}
      {dispatchModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-900">
                Dispatch Order #{dispatchModalOrder}
              </h3>
              <button
                onClick={() => setDispatchModalOrder(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Logistics Carrier</label>
              <input
                type="text"
                value={carrierInput}
                onChange={(e) => setCarrierInput(e.target.value)}
                placeholder="FedEx, DHL Express, USPS..."
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tracking Number</label>
              <input
                type="text"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                placeholder="TRK-1092841"
                className="w-full text-xs font-mono px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDispatchModalOrder(null)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmDispatch(dispatchModalOrder)}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Confirm Dispatch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add New Product */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-slate-900 font-display">
                Create Catalog Listing
              </h3>
              <button
                onClick={() => setShowAddProductModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="e.g. Sculptural Ceramic Water Carafe"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Brand Name</label>
                  <input
                    type="text"
                    required
                    value={newProdBrand}
                    onChange={(e) => setNewProdBrand(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as ProductCategory)}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-slate-900 cursor-pointer"
                  >
                    <option value="Audio & Tech">Audio &amp; Tech</option>
                    <option value="Home & Living">Home &amp; Living</option>
                    <option value="Work & Desk">Work &amp; Desk</option>
                    <option value="Timepieces & Leather">Timepieces &amp; Leather</option>
                    <option value="Apparel & Wear">Apparel &amp; Wear</option>
                    <option value="Wellness">Wellness</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Retail Price ($)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full text-xs font-mono px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">MSRP ($)</label>
                  <input
                    type="number"
                    min={1}
                    value={newProdOriginalPrice}
                    onChange={(e) => setNewProdOriginalPrice(Number(e.target.value))}
                    className="w-full text-xs font-mono px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Stock Units</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(Number(e.target.value))}
                    className="w-full text-xs font-mono px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Listing Tag (Badge)</label>
                <input
                  type="text"
                  value={newProdBadge}
                  onChange={(e) => setNewProdBadge(e.target.value)}
                  placeholder="e.g. New Release, Staff Pick"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  placeholder="Materials, design intent, dimensions, tactile notes..."
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Publish to Storefront
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Promo Code */}
      {showAddPromoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-slate-900 font-display">
                Create Discount Code
              </h3>
              <button
                onClick={() => setShowAddPromoModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePromo} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Promo Code</label>
                <input
                  type="text"
                  required
                  value={newPromoCode}
                  onChange={(e) => setNewPromoCode(e.target.value.toUpperCase())}
                  placeholder="e.g. FLASH25"
                  className="w-full text-xs font-mono uppercase px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Discount %</label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={100}
                    value={newPromoPercent}
                    onChange={(e) => setNewPromoPercent(Number(e.target.value))}
                    className="w-full text-xs font-mono px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Min Subtotal ($)</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={newPromoMinSubtotal}
                    onChange={(e) => setNewPromoMinSubtotal(Number(e.target.value))}
                    className="w-full text-xs font-mono px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Customer Description</label>
                <input
                  type="text"
                  required
                  value={newPromoDesc}
                  onChange={(e) => setNewPromoDesc(e.target.value)}
                  placeholder="e.g. 20% off all studio pieces over $50"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddPromoModal(false)}
                  className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Activate Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
