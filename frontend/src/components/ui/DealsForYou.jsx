import React, { useState, useEffect } from 'react';
import { Timer, ChevronRight, Star, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DealsForYou = ({ products = [], onSelectProduct, onViewAll }) => {
  const navigate = useNavigate();

  // Dynamic live countdown timer ticking down to midnight
  const [timeLeft, setTimeLeft] = useState(() => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(23, 59, 59, 999);
    const diff = Math.max(0, midnight - now);
    return {
      hours: String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
      minutes: String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, '0'),
      seconds: String(Math.floor((diff / 1000) % 60)).padStart(2, '0')
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(23, 59, 59, 999);
      const diff = Math.max(0, midnight - now);
      setTimeLeft({
        hours: String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
        minutes: String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, '0'),
        seconds: String(Math.floor((diff / 1000) % 60)).padStart(2, '0')
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Spotlight specifically on Ashwagandha Gummy as requested
  const ashwaProduct = products?.find(
    (p) => p.id === 'prod_2' || p.category === 'brain_focus' || p.name?.toLowerCase().includes('ashwagandha')
  ) || {
    id: 'prod_2',
    name: 'ZENVORO Ashwagandha Gummies (Stress Relief & Vitality)',
    shortName: 'ZENVORO Ashwagandha Gummies',
    category: 'brain_focus',
    price: 380,
    originalPrice: 499,
    discountPercent: 24,
    rating: 4.8,
    reviewCount: '1.2k',
    image: '/images/products/Aswgantha gummy.jpeg',
    badge: '24% OFF',
    size: '30 Gummies'
  };

  const handleCardClick = (product) => {
    if (onSelectProduct) {
      onSelectProduct(product);
    } else {
      navigate(`/product/${product.id}`);
    }
  };

  const savingsAmount = ashwaProduct.originalPrice ? ashwaProduct.originalPrice - ashwaProduct.price : 119;

  return (
    <section className="deals-for-you-section" aria-label="Deal for You">
      {/* Flipkart-Style Deals Header */}
      <div className="deals-header-card">
        <div className="deals-header-left">
          <div className="deals-title-row">
            <h2 className="deals-main-title">Deal for You</h2>
            <span className="deals-live-badge">
              <Zap size={11} fill="#FFFFFF" color="#FFFFFF" />
              LIVE
            </span>
          </div>

          {/* Flipkart Ticking Countdown Timer */}
          <div className="deals-timer-wrap">
            <Timer size={13} className="deals-timer-icon" />
            <span className="deals-timer-label">Ends in</span>
            <div className="deals-digits-group">
              <span className="deals-digit-box">{timeLeft.hours}h</span>
              <span className="deals-colon">:</span>
              <span className="deals-digit-box">{timeLeft.minutes}m</span>
              <span className="deals-colon">:</span>
              <span className="deals-digit-box sec">{timeLeft.seconds}s</span>
            </div>
          </div>
        </div>

        {/* View Deal Arrow Button */}
        <button
          type="button"
          className="deals-view-all-btn"
          onClick={() => handleCardClick(ashwaProduct)}
          aria-label="View Deal"
          title="View Deal"
        >
          <ChevronRight size={18} strokeWidth={2.5} />
        </button>
      </div>

      {/* Flipkart-Style Single Ashwagandha Spotlight Deal Card */}
      <article
        className="deal-spotlight-card"
        onClick={() => handleCardClick(ashwaProduct)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick(ashwaProduct);
          }
        }}
      >
        {/* Left / Top Product Image */}
        <div className="deal-spotlight-media">
          <img
            src={ashwaProduct.image}
            alt={ashwaProduct.name}
            className="deal-spotlight-img"
            loading="lazy"
          />

          <span className="deal-spotlight-badge">
            FLAT {ashwaProduct.discountPercent || 24}% OFF
          </span>

          <div className="deal-rating-pill">
            <span>{ashwaProduct.rating || '4.8'}</span>
            <Star size={9.5} fill="#FFFFFF" color="#FFFFFF" />
          </div>
        </div>

        {/* Deal Info & Pricing */}
        <div className="deal-spotlight-info">
          <span className="deal-spotlight-sub-badge">STRESS RELIEF & CALM</span>

          <h3 className="deal-spotlight-name" title={ashwaProduct.name}>
            {ashwaProduct.name}
          </h3>

          <p className="deal-spotlight-desc">
            150mg Ashwagandha + BioPerine® + Vitamin B6 • 30 Chewable Gummies
          </p>

          <div className="deal-pricing-row">
            <span className="deal-price-current">₹{ashwaProduct.price}</span>
            {ashwaProduct.originalPrice && (
              <span className="deal-price-mrp">₹{ashwaProduct.originalPrice}</span>
            )}
            <span className="deal-price-discount">{ashwaProduct.discountPercent}% off</span>
          </div>

          <div className="deal-spotlight-footer">
            <span className="deal-savings-badge">
              Save ₹{savingsAmount} Today
            </span>

            <button
              type="button"
              className="deal-claim-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick(ashwaProduct);
              }}
            >
              <span>Grab</span>
              <ChevronRight size={13} strokeWidth={2.8} />
            </button>
          </div>
        </div>
      </article>
    </section>
  );
};
