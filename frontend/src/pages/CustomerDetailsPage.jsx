import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  ShoppingBag,
  Truck,
  Tag,
  Copy,
  ExternalLink,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useCartWishlist } from '../context/CartWishlistContext';
import { api, STATIC_PRODUCTS } from '../services/api';
import { WHATSAPP_BUSINESS_NUMBER } from '../config/whatsapp';
import '../styles/customer-details.css';

const INDIAN_STATES = [
  'Delhi',
  'Maharashtra',
  'Karnataka',
  'Tamil Nadu',
  'Uttar Pradesh',
  'Gujarat',
  'Haryana',
  'Telangana',
  'West Bengal',
  'Rajasthan',
  'Madhya Pradesh',
  'Punjab',
  'Kerala',
  'Andhra Pradesh',
  'Bihar',
  'Odisha',
  'Assam',
  'Jharkhand',
  'Uttarakhand',
  'Himachal Pradesh',
  'Goa',
  'Chandigarh',
  'Jammu & Kashmir',
  'Other'
];

export const CustomerDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { cartData, showToast } = useCartWishlist();

  const buyNowId = searchParams.get('buyNow');
  const [buyNowItem, setBuyNowItem] = useState(location.state?.buyNowItem || null);
  const [loading, setLoading] = useState(Boolean(buyNowId && !location.state?.buyNowItem));
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');

  // Customer Form State with LocalStorage persistence
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem('zenvoro_customer_details');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return {
      fullName: '',
      mobile: '',
      streetAddress: '',
      landmark: '',
      city: '',
      state: 'Delhi',
      pincode: ''
    };
  });

  const [errors, setErrors] = useState({});
  const [handoffData, setHandoffData] = useState(null);

  // If buyNow query param is present but state was lost (e.g. refresh), load product from API
  useEffect(() => {
    if (buyNowId && !buyNowItem) {
      setLoading(true);
      api.getProductById(buyNowId).then((prod) => {
        if (prod) {
          setBuyNowItem({
            product: prod,
            variant: prod.availableSizes?.[0] || null,
            quantity: 1
          });
        }
        setLoading(false);
      });
    }
  }, [buyNowId, buyNowItem]);

  // Persist form data on change
  const handleInputChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    try {
      localStorage.setItem('zenvoro_customer_details', JSON.stringify(updated));
    } catch (e) {
      // ignore
    }

    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Resolve active items for this checkout session
  const activeItems = React.useMemo(() => {
    if (buyNowItem && buyNowItem.product) {
      const prod = buyNowItem.product;
      const variant = buyNowItem.variant;
      const qty = buyNowItem.quantity || 1;
      const unitPrice = variant?.price || prod.price;
      const originalPrice = variant?.originalPrice || prod.originalPrice || prod.price;
      const subtotal = unitPrice * qty;
      const itemMRP = originalPrice * qty;

      return [
        {
          id: prod.id,
          name: prod.name,
          shortName: prod.shortName || prod.name,
          variant: variant?.size || prod.size || '30 Gummies',
          quantity: qty,
          unitPrice,
          originalPrice,
          subtotal,
          itemMRP,
          image: prod.image
        }
      ];
    }

    // Default to Cart items
    if (cartData?.items && cartData.items.length > 0) {
      return cartData.items.map((item) => {
        const prod = item.product || STATIC_PRODUCTS.find((p) => p.id === item.productId) || {};
        const qty = item.quantity || 1;
        const unitPrice = prod.price || 0;
        const originalPrice = prod.originalPrice || prod.price || 0;
        const subtotal = item.itemTotal || unitPrice * qty;
        const itemMRP = item.itemMRP || originalPrice * qty;

        return {
          id: item.productId,
          name: prod.name || 'Ayurvedic Formulation',
          shortName: prod.shortName || prod.name || 'Ayurvedic Formulation',
          variant: prod.size || '30 Gummies',
          quantity: qty,
          unitPrice,
          originalPrice,
          subtotal,
          itemMRP,
          image: prod.image
        };
      });
    }

    return [];
  }, [buyNowItem, cartData]);

  // Price Calculations (Influencer Coupon Support)
  const subtotal = activeItems.reduce((acc, item) => acc + item.subtotal, 0);
  const totalMRP = activeItems.reduce((acc, item) => acc + item.itemMRP, 0);
  const productDiscounts = Math.max(0, totalMRP - subtotal);
  const deliveryCharges = 0; // Free Express Delivery
  const couponDiscount = appliedCoupon ? Math.round(subtotal * 0.05) : 0;
  const finalTotal = Math.max(0, subtotal - couponDiscount);
  const totalSavings = productDiscounts + couponDiscount;

  const handleApplyCoupon = (e) => {
    e?.preventDefault();
    const cleanCode = couponCode.trim().toUpperCase();
    if (['INFLUENCER5', 'INFLUENCER', 'CREATOR5', 'ZEN5', 'SPECIAL5'].includes(cleanCode)) {
      setAppliedCoupon('INFLUENCER5');
      showToast('🎉 Influencer Coupon Applied: Extra 5% OFF!');
    } else if (cleanCode) {
      showToast('Invalid coupon code. Try INFLUENCER5');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon('');
    setCouponCode('');
    showToast('Coupon removed');
  };

  // Form Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter a valid full name';
    }

    const cleanMobile = formData.mobile.replace(/[\s\-\+]/g, '').replace(/^91/, '').replace(/^0/, '');
    if (!cleanMobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      newErrors.mobile = 'Enter a valid 10-digit Indian mobile number';
    }

    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = 'Complete street address is required';
    } else if (formData.streetAddress.trim().length < 6) {
      newErrors.streetAddress = 'Please include House/Flat No., Street, and Area';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    const cleanPin = formData.pincode.replace(/\s/g, '');
    if (!cleanPin) {
      newErrors.pincode = 'PIN code is required';
    } else if (!/^\d{6}$/.test(cleanPin)) {
      newErrors.pincode = 'Enter a valid 6-digit Indian PIN code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // WhatsApp Message Generator
  const buildWhatsAppMessage = (orderRef) => {
    let msg = `Hello ZENVORO Wellness Maison,\nI would like to place an order.\nOrder Reference: ${orderRef}\n\n`;

    msg += `CUSTOMER DETAILS\n`;
    msg += `Name: ${formData.fullName.trim()}\n`;
    msg += `Mobile: ${formData.mobile.trim()}\n`;
    msg += `Address: ${formData.streetAddress.trim()}\n`;
    if (formData.landmark && formData.landmark.trim()) {
      msg += `Landmark: ${formData.landmark.trim()}\n`;
    }
    msg += `City: ${formData.city.trim()}\n`;
    msg += `State: ${formData.state.trim()}\n`;
    msg += `Pincode: ${formData.pincode.trim()}\n\n`;

    msg += `ORDER ITEMS\n`;
    activeItems.forEach((item, index) => {
      msg += `${item.name}\n`;
      msg += `Variant: ${item.variant}\n`;
      msg += `Quantity: ${item.quantity}\n`;
      msg += `Unit Price: ₹${item.unitPrice}\n`;
      msg += `Subtotal: ₹${item.subtotal}\n`;
      if (index < activeItems.length - 1) {
        msg += `\n`;
      }
    });

    msg += `\n\nPRICE SUMMARY\n`;
    msg += `Subtotal: ₹${subtotal}\n`;
    msg += `Product Discounts: ₹${productDiscounts}\n`;
    if (couponDiscount > 0) {
      msg += `Coupon (${appliedCoupon} - 5% OFF): -₹${couponDiscount}\n`;
    }
    msg += `Delivery Charges: ${deliveryCharges === 0 ? 'FREE' : '₹' + deliveryCharges}\n`;
    msg += `Final Order Total: ₹${finalTotal}\n\n`;

    msg += `Please confirm product availability, the final payable amount, and delivery details.`;

    return msg;
  };

  // Order Submission & WhatsApp Opening
  const handleConfirmOrderWhatsApp = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast('Please fill all required details');
      return;
    }

    if (activeItems.length === 0) {
      showToast('Your order contains no items');
      return;
    }

    const orderRef = 'ZV-' + Math.floor(100000 + Math.random() * 900000);
    const message = buildWhatsAppMessage(orderRef);
    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encoded}`;

    // Store handoff status for the customer (safe & non-destructive)
    setHandoffData({
      orderRef,
      message,
      whatsappUrl
    });

    // Attempt to open WhatsApp in a new tab/app safely
    try {
      const opened = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      if (!opened) {
        // Fallback if popup blocked
        window.location.href = whatsappUrl;
      }
    } catch (err) {
      window.location.href = whatsappUrl;
    }
  };

  const handleCopyMessage = () => {
    if (handoffData?.message) {
      navigator.clipboard?.writeText?.(handoffData.message);
      showToast('Order details copied to clipboard');
    }
  };

  if (loading) {
    return (
      <div className="customer-details-view" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#85532F', fontWeight: 600 }}>Loading order details...</p>
      </div>
    );
  }

  if (activeItems.length === 0) {
    return (
      <div className="customer-details-view">
        <header className="cd-header">
          <div className="cd-header-inner">
            <div className="cd-header-left">
              <button type="button" className="cd-back-btn" onClick={() => navigate('/')} aria-label="Back">
                <ArrowLeft size={20} />
              </button>
              <div className="cd-header-titles">
                <span className="cd-page-title">Delivery Details</span>
                <span className="cd-page-subtitle">WhatsApp Order</span>
              </div>
            </div>
          </div>
        </header>

        <div className="cd-main-container" style={{ display: 'flex', justifyContent: 'center', padding: '60px 16px' }}>
          <div className="cd-card" style={{ textAlign: 'center', maxWidth: '420px', padding: '32px 20px' }}>
            <ShoppingBag size={42} color="#85532F" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 6px 0' }}>No Items to Order</h3>
            <p style={{ fontSize: '13px', color: '#78716C', margin: '0 0 20px 0' }}>
              Your cart or selected purchase has no active items. Please browse our sacred formulations.
            </p>
            <button
              type="button"
              className="cd-whatsapp-btn"
              style={{ background: '#85532F' }}
              onClick={() => navigate('/categories')}
            >
              Browse Sacred Rituals
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="customer-details-view">
      {/* 1. Header */}
      <header className="cd-header">
        <div className="cd-header-inner">
          <div className="cd-header-left">
            <button
              type="button"
              className="cd-back-btn"
              onClick={() => navigate(-1)}
              aria-label="Back"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="cd-header-titles">
              <span className="cd-page-title">Delivery Details</span>
              <span className="cd-page-subtitle">WhatsApp Order</span>
            </div>
          </div>

          <div className="cd-secure-tag">
            <ShieldCheck size={13} />
            <span>100% Secure</span>
          </div>
        </div>
      </header>

      {/* 2. Main Two-Column Layout */}
      <main className="cd-main-container">
        {/* Left Column: Customer Details Form */}
        <div className="cd-form-column">
          {/* Post-Handoff Notification Banner (When WhatsApp has been initiated) */}
          {handoffData && (
            <section className="cd-handoff-banner" aria-live="polite">
              <div className="cd-handoff-top">
                <CheckCircle2 size={18} color="#15803D" />
                <h4 className="cd-handoff-title">Order Prepared for WhatsApp!</h4>
              </div>
              <p className="cd-handoff-desc">
                Your order reference is <strong className="cd-handoff-ref">{handoffData.orderRef}</strong>.
                Please press <strong>"Send"</strong> in WhatsApp to confirm your order with ZENVORO Concierge.
                Your cart and order details remain safely preserved.
              </p>
              <div className="cd-handoff-actions">
                <a
                  href={handoffData.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cd-handoff-btn-whatsapp"
                >
                  <MessageSquare size={14} />
                  <span>Open WhatsApp Again</span>
                </a>
                <button
                  type="button"
                  className="cd-handoff-btn-copy"
                  onClick={handleCopyMessage}
                >
                  <Copy size={13} />
                  <span>Copy Order Text</span>
                </button>
              </div>
            </section>
          )}

          <div className="cd-card">
            <div className="cd-card-header">
              <h3 className="cd-card-title">1. Delivery Information</h3>
            </div>

            <form onSubmit={handleConfirmOrderWhatsApp} className="cd-form-grid" noValidate>
              {/* Full Name */}
              <div className="cd-field-group">
                <label className="cd-label" htmlFor="cd-name">
                  <span>Full Name <span className="cd-required-star">*</span></span>
                </label>
                <input
                  id="cd-name"
                  type="text"
                  className={`cd-input ${errors.fullName ? 'has-error' : ''}`}
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  autoComplete="name"
                />
                {errors.fullName && (
                  <span className="cd-error-msg">
                    <AlertCircle size={11} /> {errors.fullName}
                  </span>
                )}
              </div>

              {/* Mobile Number */}
              <div className="cd-field-group">
                <label className="cd-label" htmlFor="cd-mobile">
                  <span>Indian Mobile Number <span className="cd-required-star">*</span></span>
                </label>
                <div className="cd-phone-wrapper">
                  <span className="cd-phone-prefix">+91</span>
                  <input
                    id="cd-mobile"
                    type="tel"
                    maxLength={10}
                    className={`cd-input ${errors.mobile ? 'has-error' : ''}`}
                    placeholder="10-digit mobile number"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value.replace(/\D/g, ''))}
                    autoComplete="tel"
                  />
                </div>
                {errors.mobile && (
                  <span className="cd-error-msg">
                    <AlertCircle size={11} /> {errors.mobile}
                  </span>
                )}
              </div>

              {/* Street Address */}
              <div className="cd-field-group">
                <label className="cd-label" htmlFor="cd-address">
                  <span>Complete Street Address <span className="cd-required-star">*</span></span>
                </label>
                <textarea
                  id="cd-address"
                  rows={2}
                  className={`cd-textarea ${errors.streetAddress ? 'has-error' : ''}`}
                  placeholder="House/Flat No., Building name, Street, Area"
                  value={formData.streetAddress}
                  onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                  autoComplete="street-address"
                />
                {errors.streetAddress && (
                  <span className="cd-error-msg">
                    <AlertCircle size={11} /> {errors.streetAddress}
                  </span>
                )}
              </div>

              {/* Landmark */}
              <div className="cd-field-group">
                <label className="cd-label" htmlFor="cd-landmark">
                  <span>Landmark (Optional)</span>
                </label>
                <input
                  id="cd-landmark"
                  type="text"
                  className="cd-input"
                  placeholder="Nearby mall, hospital or notable landmark"
                  value={formData.landmark}
                  onChange={(e) => handleInputChange('landmark', e.target.value)}
                />
              </div>

              {/* City and State Row */}
              <div className="cd-field-row">
                <div className="cd-field-group">
                  <label className="cd-label" htmlFor="cd-city">
                    <span>City <span className="cd-required-star">*</span></span>
                  </label>
                  <input
                    id="cd-city"
                    type="text"
                    className={`cd-input ${errors.city ? 'has-error' : ''}`}
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    autoComplete="address-level2"
                  />
                  {errors.city && (
                    <span className="cd-error-msg">
                      <AlertCircle size={11} /> {errors.city}
                    </span>
                  )}
                </div>

                <div className="cd-field-group">
                  <label className="cd-label" htmlFor="cd-state">
                    <span>State <span className="cd-required-star">*</span></span>
                  </label>
                  <select
                    id="cd-state"
                    className={`cd-select ${errors.state ? 'has-error' : ''}`}
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    autoComplete="address-level1"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <span className="cd-error-msg">
                      <AlertCircle size={11} /> {errors.state}
                    </span>
                  )}
                </div>
              </div>

              {/* PIN Code */}
              <div className="cd-field-group">
                <label className="cd-label" htmlFor="cd-pin">
                  <span>6-Digit Indian PIN Code <span className="cd-required-star">*</span></span>
                </label>
                <input
                  id="cd-pin"
                  type="text"
                  maxLength={6}
                  className={`cd-input ${errors.pincode ? 'has-error' : ''}`}
                  placeholder="e.g. 110001"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value.replace(/\D/g, ''))}
                  autoComplete="postal-code"
                />
                {errors.pincode && (
                  <span className="cd-error-msg">
                    <AlertCircle size={11} /> {errors.pincode}
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Order Summary & WhatsApp Action */}
        <div className="cd-summary-column">
          <div className="cd-card">
            <div className="cd-card-header">
              <h3 className="cd-card-title">2. Order Summary ({activeItems.length} {activeItems.length === 1 ? 'Item' : 'Items'})</h3>
            </div>

            {/* Order Items List */}
            <div className="cd-items-list no-scrollbar">
              {activeItems.map((item) => (
                <div key={`${item.id}-${item.variant}`} className="cd-item-row">
                  <img src={item.image} alt={item.name} className="cd-item-img" />
                  <div className="cd-item-info">
                    <h4 className="cd-item-name" title={item.name}>{item.shortName}</h4>
                    <div className="cd-item-meta">
                      <span>Variant: <strong>{item.variant}</strong></span>
                      <span>•</span>
                      <span>Qty: <strong>{item.quantity}</strong></span>
                    </div>
                  </div>
                  <div className="cd-item-price-box">
                    <span className="cd-item-price">₹{item.subtotal}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Influencer Coupon Box */}
            <div className="cd-coupon-box">
              {appliedCoupon ? (
                <div className="cd-coupon-applied-row">
                  <span className="cd-coupon-code-chip">
                    <Tag size={12} />
                    {appliedCoupon} (5% OFF)
                  </span>
                  <button type="button" className="cd-coupon-remove" onClick={handleRemoveCoupon}>
                    Remove
                  </button>
                </div>
              ) : (
                <form className="cd-coupon-form" onSubmit={handleApplyCoupon}>
                  <input
                    type="text"
                    className="cd-coupon-input"
                    placeholder="Enter Coupon (e.g. INFLUENCER5)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button type="submit" className="cd-coupon-btn">
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Price Details Breakdown */}
            <div className="cd-price-lines">
              <div className="cd-price-line">
                <span>Subtotal ({activeItems.length} items)</span>
                <span>₹{totalMRP}</span>
              </div>

              {productDiscounts > 0 && (
                <div className="cd-price-line discount">
                  <span>Product Discount</span>
                  <span>-₹{productDiscounts}</span>
                </div>
              )}

              {couponDiscount > 0 && (
                <div className="cd-price-line discount">
                  <span>Influencer Coupon ({appliedCoupon})</span>
                  <span>-₹{couponDiscount}</span>
                </div>
              )}

              <div className="cd-price-line">
                <span>Delivery Charges</span>
                <span className="cd-free-badge">FREE</span>
              </div>

              <div className="cd-price-line total">
                <span>Final Order Total</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>

            {totalSavings > 0 && (
              <div className="cd-savings-strip">
                <CheckCircle2 size={13} color="#15803D" />
                <span>Total Savings: ₹{totalSavings}</span>
              </div>
            )}

            {/* WhatsApp Order Button */}
            <button
              type="button"
              className="cd-whatsapp-btn"
              onClick={handleConfirmOrderWhatsApp}
            >
              <MessageSquare size={18} fill="#FFFFFF" />
              <span>Confirm Order on WhatsApp</span>
            </button>

            {/* Return Action */}
            <button
              type="button"
              className="cd-return-btn"
              onClick={() => {
                if (buyNowItem) {
                  navigate(`/product/${buyNowItem.product.id}`);
                } else {
                  navigate('/cart');
                }
              }}
            >
              <span>{buyNowItem ? 'Return to Product Page' : 'Return to Cart'}</span>
            </button>

            <div className="cd-trust-footnote">
              <Truck size={14} color="#85532F" />
              <span>Express Pan-India Delivery • Direct from Maison</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
