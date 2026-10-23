import React from 'react';

export const Skeleton = ({
  width,
  height,
  borderRadius = '4px',
  className = '',
  style = {}
}) => {
  return (
    <div
      className={`fk-skeleton ${className}`}
      style={{
        width: width || '100%',
        height: height || '16px',
        borderRadius,
        ...style
      }}
    />
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="product-card skeleton-card" style={{ pointerEvents: 'none' }}>
      <div className="product-media-container" style={{ background: '#FAF6F0', height: '170px' }}>
        <Skeleton width="100%" height="100%" borderRadius="10px 10px 0 0" />
      </div>
      <div className="product-details" style={{ padding: '10px' }}>
        <Skeleton width="45%" height="10px" borderRadius="10px" style={{ marginBottom: '8px' }} />
        <Skeleton width="85%" height="13px" borderRadius="4px" style={{ marginBottom: '6px' }} />
        <Skeleton width="60%" height="11px" borderRadius="4px" style={{ marginBottom: '10px' }} />
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <Skeleton width="50px" height="15px" borderRadius="4px" />
          <Skeleton width="40px" height="12px" borderRadius="4px" />
          <Skeleton width="45px" height="12px" borderRadius="10px" />
        </div>
      </div>
    </div>
  );
};

export const HeroBannerSkeleton = () => {
  return (
    <div style={{ padding: '0 14px', margin: '10px 0' }}>
      <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '14px', overflow: 'hidden' }}>
        <Skeleton width="100%" height="100%" borderRadius="14px" />
      </div>
    </div>
  );
};

export const DealsForYouSkeleton = () => {
  return (
    <div style={{ margin: '14px 14px', padding: '14px', background: '#FFFFFF', borderRadius: '14px', border: '1px solid #ECE1D3' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <Skeleton width="110px" height="14px" borderRadius="4px" />
        <Skeleton width="80px" height="20px" borderRadius="20px" />
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
        <Skeleton width="100px" height="100px" borderRadius="10px" />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center' }}>
          <Skeleton width="90%" height="14px" borderRadius="4px" />
          <Skeleton width="60%" height="12px" borderRadius="4px" />
          <Skeleton width="45%" height="16px" borderRadius="4px" />
        </div>
      </div>
    </div>
  );
};

export const HomeSkeleton = () => {
  return (
    <div className="home-skeleton-container" aria-label="Loading content...">
      {/* Top Strip */}
      <Skeleton width="100%" height="28px" borderRadius="6px" />

      {/* Hero Banner */}
      <HeroBannerSkeleton />

      {/* Category Pills Strip */}
      <div style={{ display: 'flex', gap: '8px', overflow: 'hidden', padding: '0 14px' }}>
        <Skeleton width="85px" height="32px" borderRadius="20px" />
        <Skeleton width="100px" height="32px" borderRadius="20px" />
        <Skeleton width="95px" height="32px" borderRadius="20px" />
        <Skeleton width="90px" height="32px" borderRadius="20px" />
      </div>

      {/* Deals For You */}
      <DealsForYouSkeleton />

      {/* Section Heading */}
      <div style={{ padding: '0 14px', display: 'flex', justifyContent: 'space-between' }}>
        <Skeleton width="140px" height="16px" borderRadius="4px" />
        <Skeleton width="60px" height="14px" borderRadius="4px" />
      </div>

      {/* 3 Products Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px', padding: '0 14px' }}>
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    </div>
  );
};

export const PdpSkeleton = () => {
  return (
    <div className="pdp-skeleton-container" aria-label="Loading product...">
      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '40px' }}>
        <Skeleton width="36px" height="36px" borderRadius="50%" />
        <Skeleton width="120px" height="16px" borderRadius="4px" />
        <div style={{ display: 'flex', gap: '8px' }}>
          <Skeleton width="36px" height="36px" borderRadius="50%" />
          <Skeleton width="36px" height="36px" borderRadius="50%" />
        </div>
      </div>

      {/* Product Image Showcase */}
      <div style={{ width: '100%', aspectRatio: '1/1', borderRadius: '16px', overflow: 'hidden' }}>
        <Skeleton width="100%" height="100%" borderRadius="16px" />
      </div>

      {/* Brand & Badge row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
        <Skeleton width="90px" height="18px" borderRadius="20px" />
        <Skeleton width="110px" height="18px" borderRadius="20px" />
      </div>

      {/* Title */}
      <Skeleton width="90%" height="18px" borderRadius="4px" />
      <Skeleton width="70%" height="18px" borderRadius="4px" />

      {/* Price block */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '6px' }}>
        <Skeleton width="70px" height="24px" borderRadius="4px" />
        <Skeleton width="50px" height="16px" borderRadius="4px" />
        <Skeleton width="65px" height="18px" borderRadius="12px" />
      </div>

      {/* Variant options */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
        <Skeleton width="130px" height="42px" borderRadius="8px" />
        <Skeleton width="130px" height="42px" borderRadius="8px" />
      </div>

      {/* Highlights */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
        <Skeleton width="100%" height="12px" borderRadius="4px" />
        <Skeleton width="95%" height="12px" borderRadius="4px" />
        <Skeleton width="88%" height="12px" borderRadius="4px" />
      </div>

      {/* Frequently Bought Together Combo Box */}
      <div style={{ padding: '14px', background: '#FFFFFF', borderRadius: '14px', border: '1px solid #ECE1D3', marginTop: '10px' }}>
        <Skeleton width="150px" height="16px" borderRadius="4px" style={{ marginBottom: '12px' }} />
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Skeleton width="70px" height="70px" borderRadius="8px" />
          <Skeleton width="20px" height="20px" borderRadius="50%" />
          <Skeleton width="70px" height="70px" borderRadius="8px" />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <Skeleton width="100%" height="14px" borderRadius="4px" />
            <Skeleton width="70%" height="16px" borderRadius="4px" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const CategoriesSkeleton = () => {
  return (
    <div className="categories-skeleton-container" aria-label="Loading categories...">
      {/* Left Sidebar */}
      <div style={{ width: '85px', background: '#FAF6F0', borderRight: '1px solid #ECE1D3', padding: '10px 6px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Skeleton width="100%" height="60px" borderRadius="8px" />
        <Skeleton width="100%" height="60px" borderRadius="8px" />
        <Skeleton width="100%" height="60px" borderRadius="8px" />
        <Skeleton width="100%" height="60px" borderRadius="8px" />
      </div>

      {/* Right Product Grid */}
      <div style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Skeleton width="100%" height="40px" borderRadius="8px" />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    </div>
  );
};
