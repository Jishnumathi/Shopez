export type ProductCategory =
  | 'Audio & Tech'
  | 'Home & Living'
  | 'Work & Desk'
  | 'Timepieces & Leather'
  | 'Apparel & Wear'
  | 'Wellness';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number; // 1 - 5
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  brand: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockQuantity: number;
  image: string;
  images: string[];
  description: string;
  features: string[];
  specs: ProductSpec[];
  isFeatured?: boolean;
  isNew?: boolean;
  badge?: string;
  salesCount: number;
  sellerId: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface DiscountCode {
  code: string;
  percentage?: number;
  fixedAmount?: number;
  minSubtotal: number;
  description: string;
  freeShipping?: boolean;
  active: boolean;
  usageCount: number;
}

export type OrderStatus = 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  notes?: string;
}

export interface OrderTimelineEvent {
  status: OrderStatus;
  timestamp: string;
  title: string;
  note: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  appliedCode?: string;
  shippingFee: number;
  tax: number;
  total: number;
  customer: OrderCustomer;
  paymentMethod: 'credit_card' | 'apple_pay' | 'cash_on_delivery';
  paymentLast4?: string;
  status: OrderStatus;
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
  timeline: OrderTimelineEvent[];
}

export interface SellerAnalytics {
  totalRevenue: number;
  totalOrders: number;
  unitsSold: number;
  avgOrderValue: number;
  returnRate: number;
  conversionRate: number;
  dailySales: { date: string; revenue: number; orders: number }[];
  categoryBreakdown: { category: ProductCategory; revenue: number; units: number; share: number }[];
}
