import React from 'react';
import { useShop } from '../context/ShopContext';
import { heroImg } from '../data/mockData';
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Sparkles } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { setSelectedCategory, applyDiscountCode } = useShop();

  const handleApplyPromo = () => {
    applyDiscountCode('SHOPEZ15');
  };

  return (
    <section className="relative overflow-hidden bg-stone-900 text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-2">
              <span>Effortless Retail Collection 2026</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              <span>Individual &amp; Home</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15] text-balance font-display">
              Designed for daily ritual, crafted for enduring utility.
            </h1>

            <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-xl">
              Discover a curated catalog of precision audio, artisanal homeware, and desk essentials.
              Backed by verified customer reviews, transparent discounts, and effortless checkout.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#catalog-grid"
                className="px-6 py-3 bg-white text-stone-950 font-medium text-sm rounded-lg hover:bg-stone-100 transition-colors inline-flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Browse Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={handleApplyPromo}
                className="px-5 py-3 border border-stone-700 bg-stone-800/80 text-stone-200 text-sm font-medium rounded-lg hover:bg-stone-800 hover:text-white transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Claim 15% Discount</span>
              </button>
            </div>

            {/* Quiet metadata line with typographic separators */}
            <div className="flex items-center gap-3 text-xs text-stone-400 pt-4 border-t border-stone-800/80">
              <span>Direct-from-Maker</span>
              <span aria-hidden="true">·</span>
              <span>45-Day Satisfaction Trial</span>
              <span aria-hidden="true">·</span>
              <span>Carbon-Neutral Delivery</span>
            </div>
          </div>

          {/* Right Column: Hero Showcase Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-800 bg-stone-950 aspect-[16/10]">
              <img
                src={heroImg}
                alt="ShopEZ curated retail collection"
                className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-stone-300 bg-stone-900/85 backdrop-blur-md px-4 py-2.5 rounded-lg border border-stone-700/60">
                <span className="font-medium text-white">Flagship Studio Acoustic &amp; Craft Showcase</span>
                <span className="font-mono text-amber-400">SEZ-EDITION 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Adjacent Proof Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-stone-800/60">
          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-white">Fast, Free Shipping</div>
              <div className="text-xs text-stone-400 mt-0.5">Complimentary delivery over $75 with instant tracking</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-white">Verified Customer Reviews</div>
              <div className="text-xs text-stone-400 mt-0.5">100% authentic feedback from verified purchasers</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <RotateCcw className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-white">Effortless Returns</div>
              <div className="text-xs text-stone-400 mt-0.5">Prepaid return labels and 30-day money back guarantee</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-white">Built for Shoppers &amp; Sellers</div>
              <div className="text-xs text-stone-400 mt-0.5">Transparent order tracking and merchant analytics</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
