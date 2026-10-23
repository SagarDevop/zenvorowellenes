import React from 'react';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Zap
} from 'lucide-react';
import { useCartWishlist } from '../../context/CartWishlistContext';

export const FlipkartPromoBanners = ({ onSelectProduct }) => {
  const { addComboToCart } = useCartWishlist();

  const handleAddTrioCombo = (e) => {
    e.stopPropagation();
    addComboToCart(
      [
        { productId: 'prod_1', quantity: 1 },
        { productId: 'prod_2', quantity: 1 },
        { productId: 'prod_3', quantity: 1 }
      ],
      'The Sacred Trio Box added to cart'
    );
  };

  return (
    <section className="fk-minimal-promo-section" aria-label="Special Offers and Guarantees">
      {/* 1. Full-Width Pure Visual Nature Forest Poster (No HTML text overlay) */}
      <div
        className="fk-trio-feature-banner"
        onClick={() => {
          if (onNavigateCategories) {
            onNavigateCategories();
          } else {
            handleAddTrioCombo();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Zenvoro Pure Himalayan Natural Wellness Poster"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (onNavigateCategories) onNavigateCategories();
            else handleAddTrioCombo();
          }
        }}
      >
        <img
          src="/images/banners/zenvoro_forest_ritual_banner.jpg"
          alt="Zenvoro Pure Himalayan Wellness - Natural Forest Ritual"
          className="fk-trio-bg-img"
          loading="lazy"
        />
      </div>

      {/* 2. Spacious, Clean 4-Item Trust & Assurance Strip */}
      <div className="fk-minimal-trust-strip">
        <div className="fk-min-trust-item">
          <ShieldCheck size={18} color="#85532F" />
          <span>100% Himalayan Certified</span>
        </div>
        <div className="fk-min-trust-item">
          <Truck size={18} color="#85532F" />
          <span>Free Express Air Delivery</span>
        </div>
        <div className="fk-min-trust-item">
          <RotateCcw size={18} color="#85532F" />
          <span>7-Day Quality Assured</span>
        </div>
        <div className="fk-min-trust-item">
          <Zap size={18} color="#85532F" />
          <span>Instant 5% Prepaid UPI Off</span>
        </div>
      </div>
    </section>
  );
};
