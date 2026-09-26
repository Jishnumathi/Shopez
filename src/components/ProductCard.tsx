import React from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Star, ShoppingBag, Eye, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setSelectedProduct, addToCart, cart } = useShop();

  const isItemInCart = cart.some((c) => c.product.id === product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.inStock) {
      addToCart(product, 1);
    }
  };

  return (
    <article
      onClick={() => setSelectedProduct(product)}
      className="group relative flex flex-col bg-white rounded-xl border border-slate-200/90 overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-slate-300"
    >
      {/* Product Image Stage (65-70% visual weight) */}
      <div className="relative aspect-[4/3] w-full bg-[#F6F6F5] overflow-hidden flex items-center justify-center">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400 p-6 text-center">
            <span className="font-display font-medium text-slate-600">{product.name}</span>
            <span className="text-xs mt-1 text-slate-500">{product.brand}</span>
          </div>
        )}

        {/* Subtle Single Text Tag (NO pill cluster) */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold text-slate-800 tracking-wide rounded-md shadow-xs border border-slate-200">
            {product.badge}
          </div>
        )}

        {/* Stock Status Alert if low */}
        {product.inStock && product.stockQuantity <= 5 && (
          <div className="absolute top-3 right-3 bg-amber-50/95 backdrop-blur-sm px-2 py-0.5 text-[10px] font-medium text-amber-800 rounded border border-amber-200">
            Only {product.stockQuantity} left
          </div>
        )}

        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center">
            <span className="px-3 py-1 bg-slate-900 text-white text-xs font-medium rounded-md">
              Sold Out
            </span>
          </div>
        )}

        {/* Hover Quick Actions Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className="flex-1 py-2 px-3 bg-slate-900/90 hover:bg-slate-950 backdrop-blur-md text-white text-xs font-medium rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isItemInCart ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="p-2 bg-white/90 hover:bg-white text-slate-700 rounded-lg shadow-sm transition-colors cursor-pointer"
            aria-label="View product details"
            title="View product details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Brand & Category quiet metadata */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-medium uppercase tracking-wider text-[11px] text-slate-400">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-slate-700">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-mono text-xs font-medium tabular-nums">{product.rating.toFixed(1)}</span>
              <span className="text-slate-400 text-[11px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="text-sm font-semibold text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </div>

        {/* Price & Savings */}
        <div className="flex items-baseline justify-between pt-2 border-t border-slate-100">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-slate-950 font-mono tabular-nums">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through font-mono tabular-nums">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {product.discountPercent && product.discountPercent > 0 && (
            <span className="text-xs font-semibold text-emerald-700 font-mono">
              Save {product.discountPercent}%
            </span>
          )}
        </div>
      </div>
    </article>
  );
};
