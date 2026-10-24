import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

export const DiwaliBanner = ({ onSelectProduct }) => {
  const navigate = useNavigate();
  const [imgLoaded, setImgLoaded] = useState(false);

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
        {/* Shimmer skeleton until banner image loads */}
        {!imgLoaded && (
          <div className="fk-skeleton" style={{ position: 'absolute', inset: 0, zIndex: 1 }} />
        )}
        {/* Crisp Full-Artwork Diwali Special Shilajit Banner */}
        <img
          src="/images/banners/diwali_shilajit_banner.jpg"
          alt="Diwali Special Festive Offer - Pure Himalayan Shilajit Gummies"
          className="diwali-banner-img"
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          style={{ opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.25s ease' }}
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
