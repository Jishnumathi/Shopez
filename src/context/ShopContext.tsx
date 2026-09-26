import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  ProductCategory,
  Review,
  CartItem,
  DiscountCode,
  Order,
  OrderStatus,
  OrderCustomer,
  SellerAnalytics,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_REVIEWS,
  INITIAL_DISCOUNT_CODES,
  INITIAL_ORDERS,
} from '../data/mockData';

interface ShopContextType {
  // Navigation & View
  currentView: 'catalog' | 'orders' | 'seller_dashboard';
  setCurrentView: (view: 'catalog' | 'orders' | 'seller_dashboard') => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  // Catalog & Filters
  products: Product[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: 'featured' | 'price_asc' | 'price_desc' | 'rating' | 'discount';
  setSortBy: (sort: 'featured' | 'price_asc' | 'price_desc' | 'rating' | 'discount') => void;
  inStockOnly: boolean;
  setInStockOnly: (val: boolean) => void;
  filteredProducts: Product[];

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  appliedDiscount: DiscountCode | null;
  discountSavings: number;
  shippingFee: number;
  estimatedTax: number;
  cartTotal: number;
  applyDiscountCode: (codeStr: string) => { success: boolean; message: string };
  removeDiscountCode: () => void;
  availableDiscounts: DiscountCode[];

  // Checkout & Orders
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  placedOrderConfirmation: Order | null;
  setPlacedOrderConfirmation: (order: Order | null) => void;
  placeOrder: (customer: OrderCustomer, paymentMethod: 'credit_card' | 'apple_pay' | 'cash_on_delivery') => Order;
  orders: Order[];
  updateOrderStatus: (orderId: string, status: OrderStatus, carrier?: string, trackingNumber?: string) => void;

  // Reviews
  reviews: Review[];
  getProductReviews: (productId: string) => Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'helpfulCount' | 'verifiedPurchase'>) => void;
  upvoteReview: (reviewId: string) => void;

  // Seller Dashboard Management
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewCount' | 'salesCount' | 'createdAt' | 'sellerId'>) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  addDiscountCode: (code: DiscountCode) => void;
  sellerAnalytics: SellerAnalytics;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'shopez_products_v1',
  CART: 'shopez_cart_v1',
  ORDERS: 'shopez_orders_v1',
  REVIEWS: 'shopez_reviews_v1',
  DISCOUNTS: 'shopez_discounts_v1',
  APPLIED_DISCOUNT: 'shopez_applied_discount_v1',
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [currentView, setCurrentView] = useState<'catalog' | 'orders' | 'seller_dashboard'>('catalog');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Products State
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'rating' | 'discount'>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Discounts
  const [availableDiscounts, setAvailableDiscounts] = useState<DiscountCode[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DISCOUNTS);
      return saved ? JSON.parse(saved) : INITIAL_DISCOUNT_CODES;
    } catch {
      return INITIAL_DISCOUNT_CODES;
    }
  });

  const [appliedDiscount, setAppliedDiscount] = useState<DiscountCode | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.APPLIED_DISCOUNT);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [placedOrderConfirmation, setPlacedOrderConfirmation] = useState<Order | null>(null);

  // Reviews State
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DISCOUNTS, JSON.stringify(availableDiscounts));
  }, [availableDiscounts]);

  useEffect(() => {
    if (appliedDiscount) {
      localStorage.setItem(STORAGE_KEYS.APPLIED_DISCOUNT, JSON.stringify(appliedDiscount));
    } else {
      localStorage.removeItem(STORAGE_KEYS.APPLIED_DISCOUNT);
    }
  }, [appliedDiscount]);

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(product.stockQuantity, item.quantity + quantity) }
            : item
        );
      }
      return [...prev, { product, quantity: Math.min(product.stockQuantity, quantity) }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const clamped = Math.min(item.product.stockQuantity, quantity);
          return { ...item, quantity: clamped };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedDiscount(null);
  };

  // Cart calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  let discountSavings = 0;
  if (appliedDiscount && cartSubtotal >= appliedDiscount.minSubtotal) {
    if (appliedDiscount.percentage) {
      discountSavings = Number(((cartSubtotal * appliedDiscount.percentage) / 100).toFixed(2));
    } else if (appliedDiscount.fixedAmount) {
      discountSavings = Math.min(cartSubtotal, appliedDiscount.fixedAmount);
    }
  }

  const shippingFee = appliedDiscount?.freeShipping || cartSubtotal >= 75 || cartSubtotal === 0 ? 0 : 9.99;
  const taxableAmount = Math.max(0, cartSubtotal - discountSavings);
  const estimatedTax = cartSubtotal > 0 ? Number((taxableAmount * 0.075).toFixed(2)) : 0;
  const cartTotal = Number((taxableAmount + shippingFee + estimatedTax).toFixed(2));

  // Discount code application
  const applyDiscountCode = (codeStr: string) => {
    const cleanCode = codeStr.trim().toUpperCase();
    const found = availableDiscounts.find((d) => d.code.toUpperCase() === cleanCode && d.active);

    if (!found) {
      return { success: false, message: `Coupon "${codeStr}" is not valid or has expired.` };
    }

    if (cartSubtotal < found.minSubtotal) {
      return {
        success: false,
        message: `Order subtotal must be at least $${found.minSubtotal} to use this coupon (Current: $${cartSubtotal.toFixed(2)}).`,
      };
    }

    setAppliedDiscount(found);
    return { success: true, message: `Coupon applied: ${found.description}` };
  };

  const removeDiscountCode = () => {
    setAppliedDiscount(null);
  };

  // Filtered & Sorted Products
  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStock = !inStockOnly || p.inStock;
    return matchesCat && matchesSearch && matchesStock;
  }).sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'discount') return (b.discountPercent || 0) - (a.discountPercent || 0);
    // default featured
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  // Place Order
  const placeOrder = (
    customer: OrderCustomer,
    paymentMethod: 'credit_card' | 'apple_pay' | 'cash_on_delivery'
  ): Order => {
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const orderId = `SEZ-${randomDigits}`;
    const nowIso = new Date().toISOString();

    const newOrder: Order = {
      id: orderId,
      date: nowIso,
      items: [...cart],
      subtotal: cartSubtotal,
      discountAmount: discountSavings,
      appliedCode: appliedDiscount?.code,
      shippingFee,
      tax: estimatedTax,
      total: cartTotal,
      customer,
      paymentMethod,
      paymentLast4: paymentMethod === 'credit_card' ? '9211' : undefined,
      status: 'confirmed',
      trackingNumber: `TRK-${Math.floor(100000000 + Math.random() * 900000000)}`,
      carrier: 'ShopEZ Express Direct',
      estimatedDelivery: '3–5 Business Days',
      timeline: [
        {
          status: 'confirmed',
          timestamp: nowIso,
          title: 'Order Placed & Confirmed',
          note: paymentMethod === 'cash_on_delivery'
            ? 'Cash on Delivery order booked with phone verification'
            : 'Payment authorized securely and verified',
        },
      ],
    };

    // Update product stock counts and sales count
    setProducts((prev) =>
      prev.map((prod) => {
        const cartMatch = cart.find((c) => c.product.id === prod.id);
        if (cartMatch) {
          const newQty = Math.max(0, prod.stockQuantity - cartMatch.quantity);
          return {
            ...prod,
            stockQuantity: newQty,
            inStock: newQty > 0,
            salesCount: prod.salesCount + cartMatch.quantity,
          };
        }
        return prod;
      })
    );

    // Save order
    setOrders((prev) => [newOrder, ...prev]);

    // Clear cart
    clearCart();
    setPlacedOrderConfirmation(newOrder);
    return newOrder;
  };

  // Update order status (for seller)
  const updateOrderStatus = (
    orderId: string,
    status: OrderStatus,
    carrier = 'ShopEZ Logistics',
    trackingNumber?: string
  ) => {
    const nowIso = new Date().toISOString();
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const updatedTimeline = [
            ...order.timeline,
            {
              status,
              timestamp: nowIso,
              title: `Status updated to ${status.charAt(0).toUpperCase() + status.slice(1)}`,
              note: `Carrier: ${carrier}${trackingNumber ? ` (Tracking: ${trackingNumber})` : ''}`,
            },
          ];
          return {
            ...order,
            status,
            carrier: carrier || order.carrier,
            trackingNumber: trackingNumber || order.trackingNumber,
            timeline: updatedTimeline,
          };
        }
        return order;
      })
    );
  };

  // Review functions
  const getProductReviews = (productId: string) => {
    return reviews.filter((r) => r.productId === productId);
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'date' | 'helpfulCount' | 'verifiedPurchase'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      helpfulCount: 0,
      verifiedPurchase: true,
    };

    setReviews((prev) => [newRev, ...prev]);

    // Recalculate product rating
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === reviewData.productId) {
          const existing = reviews.filter((r) => r.productId === p.id);
          const allRatings = [...existing.map((r) => r.rating), reviewData.rating];
          const newAvg = Number((allRatings.reduce((a, b) => a + b, 0) / allRatings.length).toFixed(1));
          return {
            ...p,
            rating: newAvg,
            reviewCount: p.reviewCount + 1,
          };
        }
        return p;
      })
    );
  };

  const upvoteReview = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  // Seller Product Management
  const addProduct = (
    productData: Omit<Product, 'id' | 'rating' | 'reviewCount' | 'salesCount' | 'createdAt' | 'sellerId'>
  ) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewCount: 0,
      salesCount: 0,
      sellerId: 'seller-ez-flagship',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (productId: string, updates: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, ...updates } : p)));
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct(null);
    }
  };

  const addDiscountCode = (code: DiscountCode) => {
    setAvailableDiscounts((prev) => [code, ...prev.filter((d) => d.code !== code.code)]);
  };

  // Live Seller Analytics
  const sellerAnalytics: SellerAnalytics = React.useMemo(() => {
    const totalRev = orders
      .filter((o) => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.total, 0);

    const totalOrdersCount = orders.length;

    const unitsCount = orders
      .filter((o) => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.items.reduce((s, it) => s + it.quantity, 0), 0);

    const aov = totalOrdersCount > 0 ? Number((totalRev / totalOrdersCount).toFixed(2)) : 0;

    const cancelledCount = orders.filter((o) => o.status === 'cancelled').length;
    const returnRate = totalOrdersCount > 0 ? Number(((cancelledCount / totalOrdersCount) * 100).toFixed(1)) : 1.4;

    // Categories breakdown
    const catMap: Record<ProductCategory, { revenue: number; units: number }> = {
      'Audio & Tech': { revenue: 0, units: 0 },
      'Home & Living': { revenue: 0, units: 0 },
      'Work & Desk': { revenue: 0, units: 0 },
      'Timepieces & Leather': { revenue: 0, units: 0 },
      'Apparel & Wear': { revenue: 0, units: 0 },
      'Wellness': { revenue: 0, units: 0 },
    };

    orders.forEach((ord) => {
      if (ord.status !== 'cancelled') {
        ord.items.forEach((it) => {
          const c = it.product.category;
          if (catMap[c]) {
            catMap[c].revenue += it.product.price * it.quantity;
            catMap[c].units += it.quantity;
          }
        });
      }
    });

    const categoryBreakdown = (Object.keys(catMap) as ProductCategory[]).map((cat) => {
      const data = catMap[cat];
      const share = totalRev > 0 ? Number(((data.revenue / totalRev) * 100).toFixed(1)) : 0;
      return {
        category: cat,
        revenue: Number(data.revenue.toFixed(2)),
        units: data.units,
        share,
      };
    });

    // Simulated 7-day sales
    const dailySales = [
      { date: 'Sep 19', revenue: 1420, orders: 4 },
      { date: 'Sep 20', revenue: 1890, orders: 6 },
      { date: 'Sep 21', revenue: 2310, orders: 8 },
      { date: 'Sep 22', revenue: 1650, orders: 5 },
      { date: 'Sep 23', revenue: 2190, orders: 7 },
      { date: 'Sep 24', revenue: 2740, orders: 9 },
      { date: 'Sep 25', revenue: totalRev > 3000 ? Math.round(totalRev * 0.4) : 1980, orders: orders.length },
    ];

    return {
      totalRevenue: Number(totalRev.toFixed(2)),
      totalOrders: totalOrdersCount,
      unitsSold: unitsCount,
      avgOrderValue: aov,
      returnRate,
      conversionRate: 3.8,
      dailySales,
      categoryBreakdown,
    };
  }, [orders]);

  return (
    <ShopContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedProduct,
        setSelectedProduct,
        products,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        inStockOnly,
        setInStockOnly,
        filteredProducts,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        appliedDiscount,
        discountSavings,
        shippingFee,
        estimatedTax,
        cartTotal,
        applyDiscountCode,
        removeDiscountCode,
        availableDiscounts,
        isCheckoutOpen,
        setIsCheckoutOpen,
        placedOrderConfirmation,
        setPlacedOrderConfirmation,
        placeOrder,
        orders,
        updateOrderStatus,
        reviews,
        getProductReviews,
        addReview,
        upvoteReview,
        addProduct,
        updateProduct,
        deleteProduct,
        addDiscountCode,
        sellerAnalytics,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
