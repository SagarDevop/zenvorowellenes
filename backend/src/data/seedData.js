const initialProducts = [
  // 1. Shilajit Gummies
  {
    id: 'prod_1',
    name: 'ZENVORO Shilajit Gummies (Strength, Stamina & Vitality)',
    shortName: 'ZENVORO Shilajit Gummies',
    brand: 'ZENVORO',
    category: 'inner_power',
    section: 'best_sellers',
    size: '30 Gummies',
    price: 999,
    originalPrice: 1499,
    discountPercent: 33,
    rating: 4.9,
    reviewCount: '1.8k',
    image: '/images/products/shilazeetgummy.jpeg',
    backImage: '/images/products/shelazeetgumy back.jpeg',
    images: [
      '/images/products/shilazeetgummy.jpeg',
      '/images/products/shelazeetgumy back.jpeg'
    ],
    badge: 'BEST SELLER',
    inStock: true,
    description: 'Made with pure Himalayan Shilajit for peak performance. Enriched with 250mg purified Shilajit resin per chewable gummy in delicious tamarind flavour. Boosts overall well-being, male health, and stamina.'
  },
  // 2. Ashwagandha Gummies
  {
    id: 'prod_2',
    name: 'ZENVORO Ashwagandha Gummies (Stress Relief & Vitality)',
    shortName: 'ZENVORO Ashwagandha Gummies',
    brand: 'ZENVORO',
    category: 'brain_focus',
    section: 'best_sellers',
    size: '30 Gummies',
    price: 899,
    originalPrice: 1299,
    discountPercent: 30,
    rating: 4.8,
    reviewCount: '1.2k',
    image: '/images/products/Aswgantha gummy.jpeg',
    backImage: '/images/products/Aswagantha gummy back.jpeg',
    images: [
      '/images/products/Aswgantha gummy.jpeg',
      '/images/products/Aswagantha gummy back.jpeg'
    ],
    badge: 'STRESS RELIEF',
    inStock: true,
    description: 'Formulated with premium Ashwagandha extract (150mg) enhanced with BioPerine® (5mg) and Vitamin B6 (1.2mg) for maximum absorption. Relieves everyday stress, calms the mind, and fuels sustained energy.'
  },
  // 3. Multivitamin Gummies
  {
    id: 'prod_3',
    name: 'ZENVORO Multivitamin Gummies (Complete Daily Nutrition)',
    shortName: 'ZENVORO Multivitamin Gummies',
    brand: 'ZENVORO',
    category: 'deep_recovery',
    section: 'best_sellers',
    size: '30 Gummies',
    price: 799,
    originalPrice: 1199,
    discountPercent: 33,
    rating: 4.9,
    reviewCount: '980',
    image: '/images/products/Multivitamin gummy.jpeg',
    backImage: '/images/products/multivitamin gummy back.jpeg',
    images: [
      '/images/products/Multivitamin gummy.jpeg',
      '/images/products/multivitamin gummy back.jpeg'
    ],
    badge: 'DAILY NUTRITION',
    inStock: true,
    description: 'Comprehensive daily health supplement packed with essential Vitamins (A, B-Complex, C, D2) and vital Minerals (Iron, Magnesium, Zinc, Selenium). Boosts immune defense, vision health, and all-day vitality.'
  }
];

const initialCategories = [
  { id: 'inner_power', name: 'Shilajit Gummies', icon: 'Zap' },
  { id: 'brain_focus', name: 'Ashwagandha', icon: 'Brain' },
  { id: 'deep_recovery', name: 'Multivitamins', icon: 'Moon' },
  { id: 'trio_ritual', name: 'The Gummy Trio', icon: 'Sparkles' }
];

const initialBanners = {
  announcement: {
    text: '✨ Exclusive Launch Offer: Flat 20% OFF with code POWER20 | Free Express Shipping across India',
    code: 'POWER20',
    discount: '20% OFF'
  },
  hero: {
    badge: '100% VEGETARIAN AYURVEDIC GUMMIES',
    title: 'Elevate Your Inner Power',
    subtitle: 'Pure Himalayan Shilajit, Stress-Relief Ashwagandha & Complete Daily Multivitamins',
    ctaText: 'EXPLORE THE TRIO >',
    image: '/images/products/shilazeetgummy.jpeg'
  }
};

const initialCart = [
  { productId: 'prod_1', quantity: 1 }
];

module.exports = { initialProducts, initialCategories, initialBanners, initialCart };

