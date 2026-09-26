import React from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, Truck, RotateCcw, CreditCard, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setSelectedCategory, setCurrentView } = useShop();

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentView('catalog');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Manifesto Col (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white font-display">
                ShopEZ
              </span>
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
            </div>

            <p className="text-stone-400 leading-relaxed max-w-sm">
              Your one-stop destination for effortless online shopping. Connecting discerning shoppers with independent makers, studio artisans, and industrial craft innovators.
            </p>

            <div className="pt-2 text-[11px] text-stone-500 space-y-1">
              <div>Encrypted 256-Bit Checkout Security</div>
              <div>ISO 27001 Certified Merchant Infrastructure</div>
            </div>
          </div>

          {/* Catalog Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Curated Collections
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() => handleCategoryClick('Audio & Tech')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Audio &amp; Acoustics
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Work & Desk')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Workplace &amp; Desk
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Home & Living')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Living &amp; Ceramic Craft
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Timepieces & Leather')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Timepieces &amp; Leather
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Wellness')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Bath &amp; Botanical Oils
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Protection & Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Customer Services
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() => setCurrentView('orders')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Track Existing Shipment
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors">30-Day Hassle-Free Returns</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors">Warranty &amp; Care Guides</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors">Carbon-Neutral Freight</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors">Cash on Delivery Verification</span>
              </li>
            </ul>
          </div>

          {/* Seller Platform Link */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Merchant Hub
            </h4>
            <p className="text-stone-400 text-xs leading-relaxed">
              Sell with ShopEZ. Gain instant access to our real-time order dashboard and customer reach.
            </p>
            <button
              onClick={() => setCurrentView('seller_dashboard')}
              className="mt-2 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-white font-semibold rounded-lg text-xs transition-colors cursor-pointer inline-block"
            >
              Open Seller Portal
            </button>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment icons */}
        <div className="mt-12 pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            &copy; {new Date().getFullYear()} ShopEZ Inc. All rights reserved. Designed for effortless commerce.
          </div>

          <div className="flex items-center gap-4 text-stone-400">
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-emerald-500" />
              <span>SSL Secured</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>Visa</span>
            <span aria-hidden="true">·</span>
            <span>Mastercard</span>
            <span aria-hidden="true">·</span>
            <span>Apple Pay</span>
            <span aria-hidden="true">·</span>
            <span>Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
