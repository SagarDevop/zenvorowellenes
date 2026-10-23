import React, { useState } from 'react';

export const ImageWithSkeleton = ({
  src,
  alt = '',
  className = '',
  style = {},
  aspectRatio,
  loading = 'lazy',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`fk-image-wrapper ${className}`}
      style={{
        aspectRatio: aspectRatio || undefined,
        ...style
      }}
    >
      {/* Shimmer skeleton shown while image is loading */}
      {!isLoaded && !hasError && (
        <div className="fk-skeleton fk-image-skeleton" />
      )}

      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setIsLoaded(true);
          setHasError(true);
        }}
        className={`fk-image-element ${isLoaded ? 'loaded' : 'loading'}`}
        {...props}
      />
    </div>
  );
};
