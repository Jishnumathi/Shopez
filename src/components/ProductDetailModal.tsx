import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import {
  X,
  Star,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Tag,
  ThumbsUp,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const {
    addToCart,
    cart,
    setIsCartOpen,
    setIsCheckoutOpen,
    applyDiscountCode,
    availableDiscounts,
    getProductReviews,
    addReview,
    upvoteReview,
  } = useShop();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');
  const [showReviewForm, setShowReviewForm] = useState(false);

  // New review form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmittedMsg, setReviewSubmittedMsg] = useState('');

  const productReviews = getProductReviews(product.id);
  const isItemInCart = cart.some((c) => c.product.id === product.id);

  const handleAddToCart = () => {
    if (product.inStock) {
      addToCart(product, quantity);
    }
  };

  const handleBuyNow = () => {
    if (product.inStock) {
      addToCart(product, quantity);
      setIsCartOpen(false);
      setIsCheckoutOpen(true);
      onClose();
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim() || !reviewTitle.trim()) {
      return;
    }

    addReview({
      productId: product.id,
      userName: reviewerName.trim(),
      rating: reviewRating,
      title: reviewTitle.trim(),
      comment: reviewComment.trim(),
    });

    setReviewSubmittedMsg('Thank you! Your verified review has been published.');
    setReviewerName('');
    setReviewTitle('');
    setReviewComment('');
    setShowReviewForm(false);
    setTimeout(() => setReviewSubmittedMsg(''), 5000);
  };

  // Review breakdown stats
  const totalReviews = productReviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
    const count = productReviews.filter((r) => r.rating === star).length;
    const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
    return { star, count, percentage };
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Title & Close button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider text-slate-700">{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span>{product.category}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close product view"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-8">
          {/* Top Section: Gallery + Contiguous Purchase Module */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Gallery Left (5 cols) */}
            <div className="md:col-span-6 space-y-4">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#F6F6F5] border border-slate-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-slate-900 rounded-md border border-slate-200 shadow-xs">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] text-slate-600">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-slate-700" />
                  <span>Free Over $75</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-slate-700" />
                  <span>2-Yr Warranty</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex flex-col items-center gap-1">
                  <RotateCcw className="w-4 h-4 text-slate-700" />
                  <span>30-Day Returns</span>
                </div>
              </div>
            </div>

            {/* Contiguous Purchase Module Right (6 cols) */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-950 font-display leading-snug">
                  {product.name}
                </h1>

                {/* Rating & Review Counter */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${
                          s <= Math.round(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-slate-900 font-mono tabular-nums">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-slate-400">·</span>
                  <a
                    href="#reviews-section"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab('reviews');
                    }}
                    className="text-xs text-slate-600 hover:text-slate-900 underline font-medium cursor-pointer"
                  >
                    {product.reviewCount} customer reviews
                  </a>
                </div>

                {/* Pricing & Savings */}
                <div className="flex items-baseline gap-3 pt-1">
                  <span className="text-2xl font-bold text-slate-950 font-mono tabular-nums">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-slate-400 line-through font-mono tabular-nums">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {product.discountPercent && (
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-mono">
                      Save {product.discountPercent}%
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div className="text-xs flex items-center gap-2 pt-1">
                  {product.inStock ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span className="text-emerald-800 font-medium">
                        In Stock ({product.stockQuantity} units available)
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                      <span className="text-rose-800 font-medium">Currently Sold Out</span>
                    </>
                  )}
                </div>

                {/* Available Discounts Box */}
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 text-xs space-y-2">
                  <div className="flex items-center justify-between font-semibold text-amber-950">
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-amber-700" />
                      <span>Available Discounts</span>
                    </span>
                    <span className="text-[11px] text-amber-800 font-normal">Click to apply</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {availableDiscounts.slice(0, 3).map((disc) => (
                      <button
                        key={disc.code}
                        onClick={() => applyDiscountCode(disc.code)}
                        className="bg-white hover:bg-amber-100/60 border border-amber-300/80 text-amber-950 px-2 py-1 rounded text-[11px] font-mono font-medium transition-colors flex items-center gap-1 cursor-pointer"
                        title={disc.description}
                      >
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        <span>{disc.code}</span>
                        <span className="text-amber-700 text-[10px]">
                          ({disc.percentage ? `${disc.percentage}% off` : `$${disc.fixedAmount} off`})
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Short Description */}
                <p className="text-xs text-slate-600 leading-relaxed pt-1">{product.description}</p>
              </div>

              {/* Purchase Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-slate-50">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 text-slate-600 hover:bg-slate-200 text-sm font-semibold transition-colors cursor-pointer"
                      disabled={!product.inStock}
                    >
                      -
                    </button>
                    <span className="px-3 py-2 text-xs font-mono font-semibold text-slate-900 bg-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stockQuantity, q + 1))}
                      className="px-3 py-2 text-slate-600 hover:bg-slate-200 text-sm font-semibold transition-colors cursor-pointer"
                      disabled={!product.inStock || quantity >= product.stockQuantity}
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Bag */}
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="flex-1 py-2.5 px-4 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{isItemInCart ? 'Add More to Bag' : 'Add to Bag'}</span>
                  </button>
                </div>

                {/* Instant Buy Now */}
                <button
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-lg transition-colors shadow-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Buy Now — Instant Secure Checkout
                </button>
              </div>
            </div>
          </div>

          {/* Middle Navigation Tabs: Features & Specs vs Reviews */}
          <div className="border-t border-slate-200 pt-6">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Features &amp; Highlights
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'specs'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Technical Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>Customer Reviews</span>
                <span className="font-mono text-[11px] opacity-80">({productReviews.length})</span>
              </button>
            </div>

            {/* Tab 1: Features */}
            {activeTab === 'overview' && (
              <div className="py-6 space-y-4">
                <h3 className="text-sm font-semibold text-slate-900">Engineered Highlights</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tab 2: Specs */}
            {activeTab === 'specs' && (
              <div className="py-6">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Specification Sheet</h3>
                <div className="rounded-lg border border-slate-200 overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <tbody className="divide-y divide-slate-200">
                      {product.specs.map((s, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                          <th className="py-2.5 px-4 font-medium text-slate-500 w-1/3">{s.label}</th>
                          <td className="py-2.5 px-4 text-slate-900 font-mono tabular-nums">{s.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 3: Customer Reviews */}
            {activeTab === 'reviews' && (
              <div id="reviews-section" className="py-6 space-y-6">
                {/* Success alert if user submitted review */}
                {reviewSubmittedMsg && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>{reviewSubmittedMsg}</span>
                  </div>
                )}

                {/* Summary Score & Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-5 rounded-xl bg-slate-50 border border-slate-200">
                  {/* Score Left */}
                  <div className="md:col-span-4 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-4">
                    <div className="text-4xl font-bold text-slate-900 font-display font-mono">
                      {product.rating.toFixed(1)}
                    </div>
                    <div className="flex items-center text-amber-400 my-1.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${
                            s <= Math.round(product.rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-xs text-slate-500">Based on {productReviews.length} verified ratings</div>

                    <button
                      onClick={() => setShowReviewForm(!showReviewForm)}
                      className="mt-4 px-3.5 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{showReviewForm ? 'Cancel Review' : 'Write a Review'}</span>
                    </button>
                  </div>

                  {/* Distribution Right */}
                  <div className="md:col-span-8 flex flex-col justify-center space-y-1.5">
                    {ratingDistribution.map((item) => (
                      <div key={item.star} className="flex items-center gap-3 text-xs">
                        <span className="w-12 text-slate-600 font-medium">{item.star} stars</span>
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="w-8 text-right font-mono text-slate-400 tabular-nums">
                          {item.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Write Review Form */}
                {showReviewForm && (
                  <form
                    onSubmit={handleReviewSubmit}
                    className="p-5 bg-white border border-slate-300 rounded-xl space-y-4 shadow-sm"
                  >
                    <h4 className="text-sm font-bold text-slate-900">Share Your Experience</h4>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Overall Rating
                      </label>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setReviewRating(star)}
                            className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                star <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                              }`}
                            />
                          </button>
                        ))}
                        <span className="text-xs font-semibold text-slate-700 ml-2 font-mono">
                          {reviewRating} of 5 stars
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          value={reviewerName}
                          onChange={(e) => setReviewerName(e.target.value)}
                          placeholder="e.g. Maya Lin"
                          className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Review Headline
                        </label>
                        <input
                          type="text"
                          required
                          value={reviewTitle}
                          onChange={(e) => setReviewTitle(e.target.value)}
                          placeholder="e.g. Exceptional finish and acoustic depth"
                          className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Detailed Feedback
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="What did you think about the materials, performance, packaging, or durability?"
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        Submit Verified Review
                      </button>
                    </div>
                  </form>
                )}

                {/* Reviews List */}
                <div className="space-y-4">
                  {productReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-xl border border-slate-200/90 bg-white space-y-2 hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{rev.userName}</span>
                          {rev.verifiedPurchase && (
                            <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-0.5">
                              <ShieldCheck className="w-3 h-3 text-emerald-600" />
                              <span>Verified Buyer</span>
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">{rev.date}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center text-amber-400">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-3.5 h-3.5 ${
                                s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                              }`}
                            />
                          ))}
                        </div>
                        <h5 className="text-xs font-bold text-slate-800">{rev.title}</h5>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>

                      <div className="pt-2 flex items-center justify-end">
                        <button
                          onClick={() => upvoteReview(rev.id)}
                          className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>Helpful ({rev.helpfulCount})</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
