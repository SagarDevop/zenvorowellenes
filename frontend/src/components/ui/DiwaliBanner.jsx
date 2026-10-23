import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { ImageWithSkeleton } from './ImageWithSkeleton';

export const DiwaliBanner = ({ onSelectProduct }) => {
  const navigate = useNavigate();

  const handleBannerClick = () => {
    if (onSelectProduct) {
      onSelectProduct({ id: 'prod_1' });
    } else {
      navigate('/product/prod_1');
    }
  };

  return (
    <section className="diwali-banner-section" aria-label="Diwali Special Offer">
      <div
        className="diwali-banner-card"
        onClick={handleBannerClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleBannerClick();
          }
        }}
      >
        {/* Crisp Full-Artwork Diwali Special Shilajit Banner */}
        <ImageWithSkeleton
          src="/images/banners/diwali_shilajit_banner.jpg"
          alt="Diwali Special Festive Offer - Pure Himalayan Shilajit Gummies"
          className="diwali-banner-img"
          loading="lazy"
        />

        {/* Festive Golden Glow Border / Indicator */}
        <div className="diwali-banner-glow" />

        {/* Subtle Floating Festive Pill */}
        <div className="diwali-festive-badge">
          <span className="diwali-diya-icon">🪔</span>
          <span>DIWALI OFFER — 33% OFF</span>
        </div>

        {/* Action Button Indicator */}
        <div className="diwali-cta-pill">
          <span>Explore Offer</span>
          <ArrowRight size={13} strokeWidth={2.8} />
        </div>
      </div>
    </section>
  );
};
