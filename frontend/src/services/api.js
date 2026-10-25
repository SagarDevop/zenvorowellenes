// ZENVORO Luxury Wellness - Client-side Database & API Layer
const STORAGE_CART_KEY = 'zenvoro_cart_v2';

export const STATIC_CATEGORIES = [
  { id: 'inner_power', name: 'Shilajit Gummies', icon: 'Zap' },
  { id: 'brain_focus', name: 'Ashwagandha', icon: 'Brain' },
  { id: 'deep_recovery', name: 'Multivitamins', icon: 'Moon' },
  { id: 'trio_ritual', name: 'The Gummy Trio', icon: 'Sparkles' }
];

export const STATIC_BANNERS = {
  announcement: {
    text: 'Diwali Festive Special: Extra 5% OFF with code INFLUENCER5 • Free Express Shipping across India',
    code: 'INFLUENCER5',
    discount: '5% OFF'
  },
  heroSlides: [
    {
      id: 'banner_shilajit',
      title: 'ZENVORO Shilajit Gummies',
      productId: 'prod_1',
      image: '/images/banners/Zenvoro Shilajit Gummy Premium Ad.png'
    },
    {
      id: 'banner_ashwagandha',
      title: 'ZENVORO Ashwagandha Gummies',
      productId: 'prod_2',
      image: '/images/banners/Zenvoro Ashwagandha Gummies Wellness Ad.png'
    },
    {
      id: 'banner_multivitamin',
      title: 'ZENVORO Multivitamin Gummies',
      productId: 'prod_3',
      image: '/images/banners/Zenvoro Multivitamin Gummies Wellness Ad.jpg'
    }
  ],
  hero: {
    badge: '100% VEGETARIAN AYURVEDIC GUMMIES',
    title: 'Elevate Your Inner Power',
    subtitle: 'Pure Himalayan Shilajit, Stress-Relief Ashwagandha & Complete Daily Multivitamins',
    ctaText: 'EXPLORE THE TRIO',
    image: '/images/products/shilazeetgummy.jpeg'
  }
};

export const STATIC_PRODUCTS = [
  // Product 1: Shilajit Gummies
  {
    id: 'prod_1',
    name: 'ZENVORO Shilajit Gummies (Strength, Stamina & Vitality)',
    shortName: 'ZENVORO Shilajit Gummies',
    brand: 'ZENVORO',
    category: 'inner_power',
    section: 'best_sellers',
    size: '30 Gummies',
    price: 399,
    originalPrice: 499,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: '1,840',
    ratingsCount: '4,920',
    image: '/images/products/shilazeetgummy.jpeg',
    backImage: '/images/products/shelazeetgumy back.jpeg',
    images: [
      '/images/products/shilazeetgummy.jpeg',
      '/images/products/shelazeetgumy back.jpeg'
    ],
    badge: '20% OFF',
    inStock: true,
    assured: true,
    companionId: 'prod_2',
    comboDiscount: 399,
    comboSavingsPercent: 25,
    description: 'Made with pure Himalayan Shilajit for peak performance. Enriched with 250mg purified Shilajit resin per chewable gummy in delicious tamarind flavour. Boosts overall well-being, male health, and stamina.',
    marketplaceLinks: {
      amazon: 'https://www.amazon.in/s?k=Zenvoro+Shilajit+Gummies',
      flipkart: 'https://www.flipkart.com/search?q=Zenvoro+Shilajit+Gummies',
      meesho: 'https://www.meesho.com/search?q=Zenvoro+Gummies'
    },
    availableSizes: [
      { size: '30 Gummies (1 Bottle)', price: 399, originalPrice: 499, discount: '20% off' },
      { size: '60 Gummies (Pack of 2)', price: 779, originalPrice: 998, discount: '22% off' },
      { size: '90 Gummies (Pack of 3)', price: 1149, originalPrice: 1497, discount: '23% off' }
    ],
    highlights: [
      '250mg Purified Himalayan Shilajit Resin per chewable gummy',
      'Rich in natural Fulvic Acid & 84+ essential ionic trace minerals',
      'Boosts physical stamina, energy, male health & vitality',
      'Delicious Natural Tamarind Flavour with zero bitter aftertaste',
      'Ayurvedic Proprietary Medicine, 100% Vegetarian & Lab Certified'
    ],
    specifications: {
      'Form': 'Chewable Herbal Gummies',
      'Quantity': '30 Gummies (Bottle)',
      'Key Ingredient': 'Shilajit Resin (Asphaltum punjabianum) 250mg',
      'Flavour': 'Tamarind Flavour',
      'Dosage': 'Two gummies daily or as directed by the physician',
      'Diet Type': '100% Vegetarian (Green Dot)',
      'Country of Origin': 'India',
      'Shelf Life': '24 Months'
    },
    reviews: [
      {
        id: 'rev_1',
        author: 'Vikramaditya Rathore',
        location: 'Mumbai, Maharashtra',
        rating: 5,
        date: '2 days ago',
        title: 'Delicious taste and great energy boost!',
        comment: 'I hated the bitter taste of Shilajit resin, but these gummies taste amazing with tamarind flavor. Within 4 days my afternoon fatigue was completely gone. 10/10 product!'
      },
      {
        id: 'rev_2',
        author: 'Arjun Singhania',
        location: 'Bengaluru, Karnataka',
        rating: 5,
        date: '1 week ago',
        title: 'Authentic Shilajit benefits in gummy form',
        comment: 'Very convenient to take daily. The packaging is premium and the gummies are soft and fresh. Highly recommended.'
      }
    ]
  },

  // Product 2: Ashwagandha Gummies
  {
    id: 'prod_2',
    name: 'ZENVORO Ashwagandha Gummies (Stress Relief & Vitality)',
    shortName: 'ZENVORO Ashwagandha Gummies',
    brand: 'ZENVORO',
    category: 'brain_focus',
    section: 'best_sellers',
    size: '30 Gummies',
    price: 424,
    originalPrice: 499,
    discountPercent: 15,
    rating: 4.8,
    reviewCount: '1,210',
    ratingsCount: '3,450',
    image: '/images/products/Aswgantha gummy.jpeg',
    backImage: '/images/products/Aswagantha gummy back.jpeg',
    images: [
      '/images/products/Aswgantha gummy.jpeg',
      '/images/products/Aswagantha gummy back.jpeg'
    ],
    badge: '15% OFF',
    inStock: true,
    assured: true,
    companionId: 'prod_3',
    comboDiscount: 299,
    comboSavingsPercent: 22,
    description: 'Formulated with premium Ashwagandha extract (150mg) enhanced with BioPerine® (5mg) and Vitamin B6 (1.2mg) for maximum absorption. Relieves everyday stress, calms the mind, and fuels sustained energy.',
    availableSizes: [
      { size: '30 Gummies (1 Bottle)', price: 424, originalPrice: 499, discount: '15% off' },
      { size: '60 Gummies (Pack of 2)', price: 829, originalPrice: 998, discount: '17% off' }
    ],
    highlights: [
      '150mg Premium Ashwagandha Extract per chewable gummy',
      'Infused with 5mg BioPerine® (Piperine) for accelerated bio-absorption',
      'Enriched with Vitamin B6 (63.16% RDA) for nerve health & relaxation',
      'Clinically proven adaptogen to lower cortisol & anxiety levels',
      'Natural Mixed Fruit Flavour, 100% Vegetarian, Gelatin-Free'
    ],
    specifications: {
      'Form': 'Chewable Nutraceutical Gummies',
      'Quantity': '30 Gummies (Bottle)',
      'Key Ingredients': 'Ashwagandha 150mg, BioPerine® 5mg, Vitamin B6 1.2mg',
      'Flavour': 'Natural Mixed Fruit Flavour',
      'Dosage': 'Take 1 Gummy daily or as directed by Healthcare Professional',
      'Diet Type': '100% Vegetarian',
      'Country of Origin': 'India',
      'Shelf Life': '24 Months'
    },
    reviews: [
      {
        id: 'rev_3',
        author: 'Rohan Mehta',
        location: 'Gurugram, Haryana',
        rating: 5,
        date: '3 days ago',
        title: 'Calms stress and helps sleep peacefully',
        comment: 'Taking one gummy after work has made a huge difference. Stress dissolves easily and I wake up fresh without feeling groggy.'
      },
      {
        id: 'rev_4',
        author: 'Ananya Deshmukh',
        location: 'Pune, Maharashtra',
        rating: 5,
        date: '5 days ago',
        title: 'Great fruit taste, effective results',
        comment: 'Love the mixed fruit flavor. Helped immensely with work stress.'
      }
    ]
  },

  // Product 3: Multivitamin Gummies
  {
    id: 'prod_3',
    name: 'ZENVORO Multivitamin Gummies (Complete Daily Nutrition)',
    shortName: 'ZENVORO Multivitamin Gummies',
    brand: 'ZENVORO',
    category: 'deep_recovery',
    section: 'best_sellers',
    size: '30 Gummies',
    price: 424,
    originalPrice: 499,
    discountPercent: 15,
    rating: 4.9,
    reviewCount: '980',
    ratingsCount: '2,860',
    image: '/images/products/Multivitamin gummy.jpeg',
    backImage: '/images/products/multivitamin gummy back.jpeg',
    images: [
      '/images/products/Multivitamin gummy.jpeg',
      '/images/products/multivitamin gummy back.jpeg'
    ],
    badge: '15% OFF',
    inStock: true,
    assured: true,
    companionId: 'prod_1',
    comboDiscount: 299,
    comboSavingsPercent: 20,
    description: 'Comprehensive daily health supplement packed with essential Vitamins (A, B-Complex, C, D2) and vital Minerals (Iron, Magnesium, Zinc, Selenium). Boosts immune defense, vision health, and all-day vitality.',
    availableSizes: [
      { size: '30 Gummies (1 Bottle)', price: 424, originalPrice: 499, discount: '15% off' },
      { size: '60 Gummies (Pack of 2)', price: 829, originalPrice: 998, discount: '17% off' }
    ],
    highlights: [
      'Complete spectrum of essential multivitamins & trace minerals',
      'Fortified with Vitamin A, B-Complex (B1, B2, B6, Biotin), C & D2',
      'Loaded with Zinc, Magnesium, Iron & Selenium for immune barrier',
      'Promotes healthy vision, hair, skin, and muscular wellness',
      'Delicious Mix Fruit Flavour that makes daily nutrition fun & effortless'
    ],
    specifications: {
      'Form': 'Chewable Health Supplement Gummies',
      'Quantity': '30 Gummies (Bottle)',
      'Vitamins': 'Vitamin A, B1, B2, B3, B6, Biotin, Vitamin C, Vitamin D2',
      'Minerals': 'Iron, Magnesium, Manganese, Iodine, Zinc, Selenium',
      'Flavour': 'Delicious Mix Fruit Flavour',
      'Dosage': 'Children (4-6 yr): 1 Gummy / Adults: 2 Gummies daily',
      'Diet Type': '100% Vegetarian',
      'Country of Origin': 'India',
      'Shelf Life': '24 Months'
    },

    reviews: [
      {
        id: 'rev_5',
        author: 'Kavita Chawla',
        location: 'New Delhi, Delhi',
        rating: 5,
        date: '4 days ago',
        title: 'Best tasting daily multivitamin!',
        comment: 'My whole family loves these gummies. It covers all daily essentials from Vitamin A to Zinc, and taking vitamins has never been this tasty and enjoyable.'
      },
      {
        id: 'rev_6',
        author: 'Siddharth Nair',
        location: 'Hyderabad, Telangana',
        rating: 5,
        date: '1 week ago',
        title: 'Energy and immunity boost in a gummy',
        comment: 'Noticed a clear improvement in my daily energy and immunity. 100% vegetarian and gentle on the stomach.'
      }
    ]
  }
];

function getStoredCart() {
  try {
    const raw = localStorage.getItem(STORAGE_CART_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('[Cart] LocalStorage read error:', e);
  }
  return [
    { productId: 'prod_1', quantity: 1 }
  ];
}

function saveStoredCart(cart) {
  try {
    localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(cart));
  } catch (e) {
    console.warn('[Cart] LocalStorage write error:', e);
  }
}

export const api = {
  // Fetch products optionally filtered by section, category or search query
  getProducts: async ({ section, category, search } = {}) => {
    let list = [...STATIC_PRODUCTS];
    if (section && section !== 'all') list = list.filter((p) => p.section === section || section === 'best_sellers');
    if (category) {
      if (category === 'trio_ritual') {
        // Return all 3 products for the complete ritual
        return list;
      }
      list = list.filter((p) => p.category === category);
    }
    if (search) {
      list = list.filter((p) => 
        p.name.toLowerCase().includes(search.toLowerCase()) || 
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    return list;
  },

  // Get single product by ID
  getProductById: async (id) => {
    return STATIC_PRODUCTS.find((p) => p.id === id) || null;
  },

  // Get similar products
  getSimilarProducts: async (productId) => {
    return STATIC_PRODUCTS.filter((p) => p.id !== productId);
  },

  // Get combo details for Frequently Bought Together
  getComboDetails: async (productId) => {
    const mainProduct = STATIC_PRODUCTS.find((p) => p.id === productId) || STATIC_PRODUCTS[0];
    const companionProduct = STATIC_PRODUCTS.find((p) => p.id === mainProduct.companionId) ||
      STATIC_PRODUCTS.find((p) => p.id !== productId) || STATIC_PRODUCTS[1];

    if (!companionProduct) return null;

    const combinedOriginal = (mainProduct.originalPrice || mainProduct.price) + (companionProduct.originalPrice || companionProduct.price);
    const comboPrice = mainProduct.price + companionProduct.price;
    const combinedStandardPrice = comboPrice;
    const totalSavings = Math.max(0, combinedOriginal - comboPrice);

    return {
      mainProduct,
      companionProduct,
      combinedOriginal,
      combinedStandardPrice,
      comboPrice,
      totalSavings,
      discount: 0
    };
  },

  // Fetch categories
  getCategories: async () => {
    return STATIC_CATEGORIES;
  },

  // Fetch banners & offer strip data
  getBanners: async () => {
    return STATIC_BANNERS;
  },

  // Get current Cart
  getCart: async () => {
    const items = getStoredCart();
    const count = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    return {
      totalCount: count,
      data: items
    };
  },

  // Get fully populated cart with products and totals
  getCartFullDetails: async () => {
    const rawItems = getStoredCart();
    let totalMRP = 0;
    let totalPrice = 0;
    let totalCount = 0;

    const items = rawItems
      .map((item) => {
        const product = STATIC_PRODUCTS.find((p) => p.id === item.productId);
        if (!product) return null;
        const qty = item.quantity || 1;
        const originalPrice = product.originalPrice || product.price;
        const currentPrice = product.price;
        const itemMRP = originalPrice * qty;
        const itemTotal = currentPrice * qty;
        const itemSavings = itemMRP - itemTotal;

        totalMRP += itemMRP;
        totalPrice += itemTotal;
        totalCount += qty;

        return {
          productId: item.productId,
          quantity: qty,
          product,
          itemMRP,
          itemTotal,
          itemSavings
        };
      })
      .filter(Boolean);

    const totalDiscount = Math.max(totalMRP - totalPrice, 0);

    return {
      items,
      totalCount,
      totalMRP,
      totalPrice,
      totalDiscount
    };
  },

  // Add single item to cart
  addToCart: async (productId, quantity = 1) => {
    const cart = getStoredCart();
    const existing = cart.find((item) => item.productId === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }
    saveStoredCart(cart);
    const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    return {
      success: true,
      totalCount: count,
      data: cart
    };
  },

  // Update item quantity
  updateCartQuantity: async (productId, quantity) => {
    let cart = getStoredCart();
    if (quantity <= 0) {
      cart = cart.filter((item) => item.productId !== productId);
    } else {
      const existing = cart.find((item) => item.productId === productId);
      if (existing) {
        existing.quantity = quantity;
      } else {
        cart.push({ productId, quantity });
      }
    }
    saveStoredCart(cart);
    const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    return {
      success: true,
      totalCount: count,
      data: cart
    };
  },

  // Remove single item from cart
  removeFromCart: async (productId) => {
    const cart = getStoredCart().filter((item) => item.productId !== productId);
    saveStoredCart(cart);
    const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    return {
      success: true,
      totalCount: count,
      data: cart
    };
  },

  // Clear entire cart
  clearCart: async () => {
    saveStoredCart([]);
    return {
      success: true,
      totalCount: 0,
      data: []
    };
  },

  // Add multiple items (Combo) to cart
  addComboToCart: async (items = []) => {
    const cart = getStoredCart();
    items.forEach(({ productId, quantity = 1 }) => {
      const existing = cart.find((item) => item.productId === productId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({ productId, quantity });
      }
    });
    saveStoredCart(cart);
    const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    return {
      success: true,
      totalCount: count,
      data: cart
    };
  }
};
