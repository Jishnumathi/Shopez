import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Search, LayoutDashboard, Package, X, ArrowRight, Tag } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartCount,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
  } = useShop();

  const [showPromo, setShowPromo] = useState(true);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleNavClick = (view: 'catalog' | 'orders' | 'seller_dashboard', category?: string) => {
    setCurrentView(view);
    if (category) {
      setSelectedCategory(category);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Top Promotional Bar */}
      {showPromo && (
        <div className="bg-slate-950 text-slate-200 text-xs py-2 px-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex-1 text-center">
            <span className="font-medium text-amber-300">Spring Catalog Offer:</span>{' '}
            <span>Use code <code className="bg-white/10 px-1.5 py-0.5 rounded font-mono text-white">SHOPEZ15</code> for 15% off orders over $50 · Free shipping over $75</span>
          </div>
          <button
            onClick={() => setShowPromo(false)}
            className="text-slate-400 hover:text-white p-1 ml-2 transition-colors cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Bar Contract: 1 row, 3 zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('catalog', 'All')}
            className="text-2xl font-bold tracking-tight text-slate-900 font-display flex items-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer"
          >
            <span>ShopEZ</span>
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <button
            onClick={() => handleNavClick('catalog', 'All')}
            className={`transition-colors cursor-pointer ${
              currentView === 'catalog' ? 'text-slate-950 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            Storefront
          </button>

          <button
            onClick={() => handleNavClick('catalog', 'Audio & Tech')}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Audio & Tech
          </button>

          <button
            onClick={() => handleNavClick('catalog', 'Work & Desk')}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Work & Desk
          </button>

          <button
            onClick={() => handleNavClick('orders')}
            className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
              currentView === 'orders' ? 'text-slate-950 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Orders</span>
          </button>

          <button
            onClick={() => handleNavClick('seller_dashboard')}
            className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
              currentView === 'seller_dashboard' ? 'text-slate-950 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Seller Hub</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Search Trigger / Input */}
          <div className="relative">
            {showSearchInput ? (
              <div className="flex items-center border border-slate-300 rounded-lg px-2.5 py-1.5 bg-slate-50 w-48 sm:w-64 focus-within:border-slate-900 focus-within:bg-white transition-all">
                <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search products, brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full text-xs text-slate-800 bg-transparent focus:outline-none"
                />
                <button
                  onClick={() => {
                    setShowSearchInput(false);
                    setSearchQuery('');
                  }}
                  className="text-slate-400 hover:text-slate-600 ml-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setShowSearchInput(true);
                  if (currentView !== 'catalog') setCurrentView('catalog');
                }}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                aria-label="Open search"
                title="Search catalog"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Seller / Shopper View Switcher */}
          <button
            onClick={() =>
              setCurrentView(currentView === 'seller_dashboard' ? 'catalog' : 'seller_dashboard')
            }
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
              currentView === 'seller_dashboard'
                ? 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800'
                : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400 hover:bg-slate-50'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>{currentView === 'seller_dashboard' ? 'Shopper View' : 'Seller Mode'}</span>
          </button>

          {/* Cart Bag Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer flex items-center justify-center"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white font-mono text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
