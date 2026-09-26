import { Product, Review, DiscountCode, Order } from '../types';

import heroImg from '../assets/images/hero_shopez_lifestyle_1790398062520.jpg';
import headphonesImg from '../assets/images/product_headphones_studio_1790398076502.jpg';
import coffeeImg from '../assets/images/product_ceramic_pourover_1790398093106.jpg';
import keyboardImg from '../assets/images/product_mechanical_keyboard_1790398106425.jpg';
import watchImg from '../assets/images/product_minimalist_timepiece_1790398118426.jpg';

export { heroImg };

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'AuraStudio Wireless ANC Headphones',
    category: 'Audio & Tech',
    brand: 'Acoustiq Lab',
    price: 289,
    originalPrice: 349,
    discountPercent: 17,
    rating: 4.9,
    reviewCount: 128,
    inStock: true,
    stockQuantity: 42,
    image: headphonesImg,
    images: [headphonesImg],
    description: 'Precision-engineered circumaural headphones featuring 40mm beryllium drivers, active hybrid noise cancellation, and 45-hour playback on a single charge. Finished in anodized matte graphite with breathable memory foam ear cushions.',
    features: [
      'Hybrid Dual-Feed Active Noise Cancellation (-38dB attenuation)',
      '40mm custom beryllium acoustic drivers with ultra-low distortion',
      'Multipoint Bluetooth 5.3 connectivity with LDAC lossless audio',
      'Up to 45 hours battery life with 15-minute quick charge for 6 hours playback',
      'Dual beamforming array microphones for crystal clear voice capture'
    ],
    specs: [
      { label: 'Acoustic Structure', value: 'Closed-Back Dynamic' },
      { label: 'Frequency Response', value: '10Hz – 42kHz' },
      { label: 'Impedance', value: '32 Ohms' },
      { label: 'Weight', value: '265g' },
      { label: 'Connectivity', value: 'Bluetooth 5.3 & 3.5mm analog' }
    ],
    isFeatured: true,
    isNew: true,
    badge: 'Bestseller',
    salesCount: 312,
    sellerId: 'seller-ez-flagship',
    createdAt: '2026-08-10'
  },
  {
    id: 'prod-002',
    name: 'Kanso Artisanal Pour-Over Dripper & Carafe',
    category: 'Home & Living',
    brand: 'Muku Craft',
    price: 68,
    originalPrice: 85,
    discountPercent: 20,
    rating: 4.8,
    reviewCount: 94,
    inStock: true,
    stockQuantity: 28,
    image: coffeeImg,
    images: [coffeeImg],
    description: 'Hand-thrown charcoal stoneware coffee dripper with interior spiral extraction grooves, paired with a heat-resistant 600ml borosilicate glass decanter. Designed for steady brew rates and exceptional cup clarity.',
    features: [
      'High-fired mineral stoneware retain heat evenly during 3-minute pours',
      '600ml dual-wall borosilicate thermal decanter with drip-free spout',
      'Precision spiral ribs calibrated for flat-bottom and conical filters',
      'Tactile raw unglazed exterior with glazed easy-rinse interior'
    ],
    specs: [
      { label: 'Capacity', value: '600ml (1–4 cups)' },
      { label: 'Material', value: 'Japanese Stoneware & Borosilicate Glass' },
      { label: 'Dishwasher Safe', value: 'Yes (Carafe & Dripper)' },
      { label: 'Dimensions', value: '14.5cm H x 12cm D' }
    ],
    isFeatured: true,
    badge: 'Artisanal Pick',
    salesCount: 215,
    sellerId: 'seller-ez-flagship',
    createdAt: '2026-08-18'
  },
  {
    id: 'prod-003',
    name: 'Atelier CNC Machined Mechanical Keyboard',
    category: 'Work & Desk',
    brand: 'Grid & Key',
    price: 195,
    originalPrice: 229,
    discountPercent: 15,
    rating: 4.9,
    reviewCount: 167,
    inStock: true,
    stockQuantity: 19,
    image: keyboardImg,
    images: [keyboardImg],
    description: 'Heavyweight anodized 6063 aluminum keyboard chassis with gasket-mounted FR4 plate, pre-lubed silent tactile linear switches, and thick dye-sublimated PBT keycaps in warm neutral cream and sage tones.',
    features: [
      'Gasket-mount silicone dampening structure for deep, muted acoustic profile',
      'Hot-swappable 5-pin PCB supporting all standard MX-style switches',
      'South-facing RGB backlighting with per-key customization',
      'Braided detachable USB-C cable and 2.4GHz low-latency wireless dongle',
      'Custom solid brass internal weight bar for zero desk slippage'
    ],
    specs: [
      { label: 'Layout', value: '75% Compact (82 keys + rotary knob)' },
      { label: 'Case Material', value: 'CNC 6063 Anodized Aluminum' },
      { label: 'Keycaps', value: '1.6mm Dye-Sub PBT Cherry Profile' },
      { label: 'Weight', value: '1.82 kg' },
      { label: 'Polling Rate', value: '1000Hz wired / 2.4G' }
    ],
    isFeatured: true,
    badge: 'Staff Favorite',
    salesCount: 440,
    sellerId: 'seller-ez-flagship',
    createdAt: '2026-07-25'
  },
  {
    id: 'prod-004',
    name: 'Vanguard Titanium Minimalist Field Watch',
    category: 'Timepieces & Leather',
    brand: 'Horologik Studio',
    price: 340,
    originalPrice: 420,
    discountPercent: 19,
    rating: 4.9,
    reviewCount: 88,
    inStock: true,
    stockQuantity: 14,
    image: watchImg,
    images: [watchImg],
    description: 'Understated 38mm Grade 2 titanium field watch featuring an anti-reflective sapphire crystal, Japanese automatic 24-jewel movement, and hand-stitched Horween saddle brown leather strap.',
    features: [
      'Ultralight aerospace Grade 2 titanium case with sandblasted matte finish',
      'Scratch-resistant double-domed sapphire crystal with anti-glare AR coating',
      'Japanese NH35 automatic mechanical movement (41-hour reserve)',
      '100m / 10 ATM water resistance with screw-down crown',
      'Super-LumiNova BGW9 indices for crisp low-light legibility'
    ],
    specs: [
      { label: 'Case Diameter', value: '38.0mm' },
      { label: 'Thickness', value: '10.8mm' },
      { label: 'Lug-to-Lug', value: '45.0mm' },
      { label: 'Strap Width', value: '20mm Horween Chromexcel' },
      { label: 'Movement', value: 'Automatic Self-Winding' }
    ],
    isFeatured: true,
    isNew: true,
    badge: 'Limited Run',
    salesCount: 168,
    sellerId: 'seller-ez-flagship',
    createdAt: '2026-08-30'
  },
  {
    id: 'prod-005',
    name: 'Brushed Brass Horizon Task Desk Lamp',
    category: 'Work & Desk',
    brand: 'Luminaire Form',
    price: 145,
    originalPrice: 175,
    discountPercent: 17,
    rating: 4.7,
    reviewCount: 62,
    inStock: true,
    stockQuantity: 31,
    image: keyboardImg, // shares clean desktop aesthetic
    images: [keyboardImg],
    description: 'Precision balanced cantilever desk lamp in solid spun brass and weighted cast base. Stepless touch dimming with museum-grade 98 CRI LED array that prevents screen glare and eye fatigue.',
    features: [
      'Museum-grade 98 CRI warm light with no visible flicker or blue-spike',
      'Dual articulated friction joints machined to 0.05mm tolerance',
      'Capacitive stepless touch dimmer with brightness memory',
      'Integrated hidden USB-C 18W fast charging port in base'
    ],
    specs: [
      { label: 'Materials', value: 'Solid Spun Brass & Cast Iron Base' },
      { label: 'Color Temp', value: '2700K – 3200K Warm Neutral' },
      { label: 'Power Consumption', value: '11W Max' },
      { label: 'Cord Length', value: '2.2m Braided Textile Cord' }
    ],
    isFeatured: false,
    salesCount: 129,
    sellerId: 'seller-ez-flagship',
    createdAt: '2026-09-02'
  },
  {
    id: 'prod-006',
    name: 'Komorebi Japanese Hinoki Wood Bath Salt & Oil Set',
    category: 'Wellness',
    brand: 'Aroma Botanica',
    price: 52,
    originalPrice: 65,
    discountPercent: 20,
    rating: 4.8,
    reviewCount: 79,
    inStock: true,
    stockQuantity: 55,
    image: coffeeImg,
    images: [coffeeImg],
    description: 'Harvested from sustainably managed cypress groves in Nagano. Natural mineral salts infused with steam-distilled pure Hinoki essential oil and cold-pressed botanical carrier extracts.',
    features: [
      '100% natural wild-harvested Japanese Hinoki wood essential oil',
      'Trace mineral Epsom & solar sea salt blend relaxes muscle tension',
      'Contains no synthetic fragrances, parabens, or preservatives',
      'Packaged in recyclable amber apothecary glass with cork scoop'
    ],
    specs: [
      { label: 'Net Weight', value: '450g Bath Salts + 30ml Pure Oil' },
      { label: 'Origin', value: 'Nagano Prefecture, Japan' },
      { label: 'Scent Profile', value: 'Resinous Pine, Citrus Peel, Cedar' },
      { label: 'Usage', value: 'Approx. 12 full restorative baths' }
    ],
    isFeatured: false,
    badge: 'Popular',
    salesCount: 280,
    sellerId: 'seller-ez-flagship',
    createdAt: '2026-09-05'
  },
  {
    id: 'prod-007',
    name: 'Raw Edge Heavyweight Merino Knit Sweater',
    category: 'Apparel & Wear',
    brand: 'Knit Studio Nord',
    price: 178,
    originalPrice: 210,
    discountPercent: 15,
    rating: 4.9,
    reviewCount: 112,
    inStock: true,
    stockQuantity: 24,
    image: headphonesImg,
    images: [headphonesImg],
    description: 'Spun from 100% traceable New Zealand extra-fine Merino wool in a relaxed drop-shoulder cut. Naturally temperature-regulating, odor-resistant, and ultra-soft next to bare skin.',
    features: [
      '7-gauge heavy fisherman rib knit structure with reinforced cuffs',
      '19.5-micron ultra-fine wool fibers prevent itch and static buildup',
      'Seamless 3D knit body construction for zero internal friction points',
      'Fully pre-shrunk with environmentally certified non-toxic washes'
    ],
    specs: [
      { label: 'Composition', value: '100% Extrafine Merino Wool' },
      { label: 'Fit', value: 'Relaxed Boxy Fit' },
      { label: 'Care', value: 'Hand Wash Cold or Dry Clean' },
      { label: 'Certification', value: 'Responsible Wool Standard (RWS)' }
    ],
    isFeatured: false,
    badge: 'Eco Choice',
    salesCount: 195,
    sellerId: 'seller-ez-flagship',
    createdAt: '2026-08-15'
  },
  {
    id: 'prod-008',
    name: 'Brutalist Concrete Sculptural Desk Tray',
    category: 'Work & Desk',
    brand: 'Monolith Objet',
    price: 44,
    originalPrice: 55,
    discountPercent: 20,
    rating: 4.6,
    reviewCount: 47,
    inStock: true,
    stockQuantity: 39,
    image: watchImg,
    images: [watchImg],
    description: 'Cast from fine-aggregate micro-cement with natural textural pores and water-repellent matte seal. Features recessed wells for pens, keys, and daily EDC pocket tools.',
    features: [
      'Hand-poured fine aggregate cement with cork underlayment pad',
      'Stain-resistant micro-silicate matte coating prevents oil absorption',
      'Weighted 680g mass anchors pens and desk tools without movement',
      'Each piece exhibits unique organic porous surface striations'
    ],
    specs: [
      { label: 'Dimensions', value: '24cm L x 10cm W x 2.2cm H' },
      { label: 'Weight', value: '680g' },
      { label: 'Material', value: 'Architectural Micro-Cement & Natural Cork' }
    ],
    isFeatured: false,
    salesCount: 134,
    sellerId: 'seller-ez-flagship',
    createdAt: '2026-08-22'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-101',
    productId: 'prod-001',
    userName: 'Elena Rostova',
    rating: 5,
    date: 'September 18, 2026',
    title: 'Flawless tonal balance and astonishing battery endurance',
    comment: 'The noise cancellation is easily on par with the flagship Sony and Apple models, but the acoustic tuning is significantly more balanced and transparent. Highs are silky without fatigue, and low bass extension is tight and articulate. Battery lasts all week on my commute.',
    verifiedPurchase: true,
    helpfulCount: 38
  },
  {
    id: 'rev-102',
    productId: 'prod-001',
    userName: 'Marcus Chen',
    rating: 5,
    date: 'September 12, 2026',
    title: 'Exquisite build quality and memory foam comfort',
    comment: 'I wear these for 7-8 hours daily while coding. The headband clamp force is calibrated to perfection — zero pressure points on the crown of my head. The matte graphite finish feels premium and resists fingerprints.',
    verifiedPurchase: true,
    helpfulCount: 24
  },
  {
    id: 'rev-103',
    productId: 'prod-001',
    userName: 'David Miller',
    rating: 4,
    date: 'August 29, 2026',
    title: 'Superb sound, slightly snug case',
    comment: 'Soundstage is expansive and spatial separation on jazz tracks is incredible. The hardshell case is a touch snug when packing the cables, but the headphones themselves are world-class.',
    verifiedPurchase: true,
    helpfulCount: 9
  },
  {
    id: 'rev-104',
    productId: 'prod-002',
    userName: 'Hannah Lindqvist',
    rating: 5,
    date: 'September 15, 2026',
    title: 'A morning ritual masterpiece',
    comment: 'The heat retention of the stoneware makes a perceptible difference in sweet extraction. Flow rate is consistent and predictable. The borosilicate decanter pours without a single stray drip. Highly recommended for specialty coffee lovers.',
    verifiedPurchase: true,
    helpfulCount: 19
  },
  {
    id: 'rev-105',
    productId: 'prod-003',
    userName: 'Julian Vance',
    rating: 5,
    date: 'September 20, 2026',
    title: 'The acoustic profile is pure satisfaction',
    comment: 'Heavy, solid, and zero pinging sound. The gasket mounting creates a deep marbly clack that makes writing documentation almost therapeutic. Keycaps are thick with crisp legends. Best keyboard on my desk in five years.',
    verifiedPurchase: true,
    helpfulCount: 42
  },
  {
    id: 'rev-106',
    productId: 'prod-004',
    userName: 'Soren K.',
    rating: 5,
    date: 'September 22, 2026',
    title: 'Disappears on the wrist, gets compliments everywhere',
    comment: 'Grade 2 titanium is feather-light. The dial proportions are textbook minimalism. Accuracy has been +4 seconds/day straight out of the presentation box.',
    verifiedPurchase: true,
    helpfulCount: 17
  }
];

export const INITIAL_DISCOUNT_CODES: DiscountCode[] = [
  {
    code: 'SHOPEZ15',
    percentage: 15,
    minSubtotal: 50,
    description: '15% off orders over $50 across the entire catalog',
    active: true,
    usageCount: 428
  },
  {
    code: 'FREESHIP',
    freeShipping: true,
    minSubtotal: 35,
    description: 'Complimentary expedited standard shipping on orders over $35',
    active: true,
    usageCount: 651
  },
  {
    code: 'SAVE30',
    fixedAmount: 30,
    minSubtotal: 160,
    description: '$30 off orders above $160 for premium bundles',
    active: true,
    usageCount: 189
  },
  {
    code: 'WELCOME10',
    percentage: 10,
    minSubtotal: 0,
    description: '10% off your order with no minimum spend',
    active: true,
    usageCount: 890
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'SEZ-84920',
    date: '2026-09-24T14:30:00Z',
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 1
      },
      {
        product: INITIAL_PRODUCTS[1],
        quantity: 1
      }
    ],
    subtotal: 357,
    discountAmount: 53.55,
    appliedCode: 'SHOPEZ15',
    shippingFee: 0,
    tax: 24.28,
    total: 327.73,
    customer: {
      fullName: 'Sophia Martinez',
      email: 'sophia.m@example.com',
      phone: '+1 (555) 234-8901',
      address: '742 Evergreen Terrace, Apt 4B',
      city: 'Seattle',
      postalCode: '98101',
      country: 'United States',
      notes: 'Please leave with reception if absent.'
    },
    paymentMethod: 'credit_card',
    paymentLast4: '4242',
    status: 'shipped',
    trackingNumber: 'TRK-948102948',
    carrier: 'FedEx Express Direct',
    estimatedDelivery: 'Sep 27, 2026',
    timeline: [
      {
        status: 'confirmed',
        timestamp: '2026-09-24T14:30:00Z',
        title: 'Order Confirmed',
        note: 'Payment processed securely via Stripe'
      },
      {
        status: 'processing',
        timestamp: '2026-09-24T16:15:00Z',
        title: 'Order Packaged',
        note: 'Inspected and packed in sustainable kraft box'
      },
      {
        status: 'shipped',
        timestamp: '2026-09-25T09:40:00Z',
        title: 'Dispatched from Hub',
        note: 'Carrier scanned package at West Coast logistics depot'
      }
    ]
  },
  {
    id: 'SEZ-84918',
    date: '2026-09-23T10:15:00Z',
    items: [
      {
        product: INITIAL_PRODUCTS[2],
        quantity: 1
      }
    ],
    subtotal: 195,
    discountAmount: 19.5,
    appliedCode: 'WELCOME10',
    shippingFee: 0,
    tax: 14.04,
    total: 189.54,
    customer: {
      fullName: 'Jonathan Pierce',
      email: 'jpierce@techfirm.io',
      phone: '+1 (555) 876-1234',
      address: '1088 Mission St, Suite 1200',
      city: 'San Francisco',
      postalCode: '94103',
      country: 'United States'
    },
    paymentMethod: 'apple_pay',
    status: 'delivered',
    trackingNumber: 'TRK-883910247',
    carrier: 'UPS Ground Air',
    estimatedDelivery: 'Sep 25, 2026',
    timeline: [
      {
        status: 'confirmed',
        timestamp: '2026-09-23T10:15:00Z',
        title: 'Order Placed',
        note: 'Authorized via Apple Pay'
      },
      {
        status: 'processing',
        timestamp: '2026-09-23T11:30:00Z',
        title: 'Fulfillment Completed',
        note: 'Ready for carrier pickup'
      },
      {
        status: 'shipped',
        timestamp: '2026-09-23T15:20:00Z',
        title: 'In Transit',
        note: 'Departed Richmond Sort Facility'
      },
      {
        status: 'delivered',
        timestamp: '2026-09-25T13:10:00Z',
        title: 'Package Delivered',
        note: 'Delivered to mailroom signature confirmed'
      }
    ]
  },
  {
    id: 'SEZ-84922',
    date: '2026-09-25T18:05:00Z',
    items: [
      {
        product: INITIAL_PRODUCTS[3],
        quantity: 1
      }
    ],
    subtotal: 340,
    discountAmount: 30,
    appliedCode: 'SAVE30',
    shippingFee: 0,
    tax: 24.8,
    total: 334.8,
    customer: {
      fullName: 'Clara Oswald',
      email: 'clara.design@studio.co',
      phone: '+1 (555) 443-9821',
      address: '450 North Michigan Ave',
      city: 'Chicago',
      postalCode: '60611',
      country: 'United States'
    },
    paymentMethod: 'credit_card',
    paymentLast4: '8821',
    status: 'processing',
    trackingNumber: 'TRK-990214811',
    carrier: 'FedEx Priority',
    estimatedDelivery: 'Sep 28, 2026',
    timeline: [
      {
        status: 'confirmed',
        timestamp: '2026-09-25T18:05:00Z',
        title: 'Order Verified',
        note: 'Payment captured securely'
      },
      {
        status: 'processing',
        timestamp: '2026-09-25T19:00:00Z',
        title: 'Quality Inspection',
        note: 'Serial number verified and packaged in velvet pouch'
      }
    ]
  },
  {
    id: 'SEZ-84925',
    date: '2026-09-25T20:45:00Z',
    items: [
      {
        product: INITIAL_PRODUCTS[5],
        quantity: 2
      },
      {
        product: INITIAL_PRODUCTS[7],
        quantity: 1
      }
    ],
    subtotal: 148,
    discountAmount: 22.2,
    appliedCode: 'SHOPEZ15',
    shippingFee: 0,
    tax: 10.06,
    total: 135.86,
    customer: {
      fullName: 'Liam Hemsworth',
      email: 'liam.h@wellness.org',
      phone: '+1 (555) 619-3320',
      address: '22 Ocean Blvd',
      city: 'San Diego',
      postalCode: '92109',
      country: 'United States'
    },
    paymentMethod: 'cash_on_delivery',
    status: 'confirmed',
    trackingNumber: 'TRK-pending',
    carrier: 'Standard Courier',
    estimatedDelivery: 'Sep 29, 2026',
    timeline: [
      {
        status: 'confirmed',
        timestamp: '2026-09-25T20:45:00Z',
        title: 'Cash on Delivery Order Placed',
        note: 'Phone verification confirmed by customer'
      }
    ]
  }
];
