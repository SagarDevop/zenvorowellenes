import React, { useState } from 'react';
import { Tag, Check } from 'lucide-react';

export const OfferStrip = () => {
  return (
    <div className="promo-strip" role="region" aria-label="Special Offers">
      <div className="promo-left">
        <Tag size={13} color="#85532F" strokeWidth={2.4} />
        <span className="promo-short-text">Diwali Festive Special Live • Free Express Delivery across India</span>
      </div>
    </div>
  );
};
