import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, Check, RefreshCw } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Audio & Tech',
  'Home & Living',
  'Work & Desk',
  'Timepieces & Leather',
  'Apparel & Wear',
  'Wellness',
];

export const ProductGrid: React.FC = () => {
  const {
    filteredProducts,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    inStockOnly,
    setInStockOnly,
    searchQuery,
    setSearchQuery,
  } = useShop();

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setInStockOnly(false);
    setSortBy('featured');
  };

  return (
    <section id="catalog-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20">
      {/* Section Header & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
            Curated Catalog
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-display">
            Everyday Essentials &amp; Studio Artifacts
          </h2>
        </div>

        <div className="text-xs text-slate-500 font-mono tabular-nums">
          Showing <span className="font-semibold text-slate-900">{filteredProducts.length}</span> curated items
        </div>
      </div>

      {/* Filter & Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        {/* Interactive Category Segmented Tabs (allowed functional buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort and In-Stock Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* In-Stock Toggle */}
          <button
            onClick={() => setInStockOnly(!inStockOnly)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
              inStockOnly
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900'
            }`}
          >
            <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${inStockOnly ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300'}`}>
              {inStockOnly && <Check className="w-2.5 h-2.5 stroke-3" />}
            </div>
            <span>In Stock Only</span>
          </button>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-medium text-slate-800 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-slate-900 cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Search Notification if search is active */}
      {searchQuery && (
        <div className="mt-4 flex items-center justify-between bg-amber-50/80 border border-amber-200/80 px-4 py-2 rounded-lg text-xs text-amber-900">
          <span>Search results for: <strong className="font-semibold">"{searchQuery}"</strong></span>
          <button
            onClick={() => setSearchQuery('')}
            className="text-amber-800 hover:underline font-medium cursor-pointer"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mt-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-900 mb-1">No products match your criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mb-6">
            We couldn't find any items matching your selected category, search terms, or stock filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-medium rounded-lg hover:bg-slate-800 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </section>
  );
};
