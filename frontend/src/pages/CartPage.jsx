import React, { useState } from 'react';
import {
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  ShieldCheck,
  CheckCircle2,
  ShoppingBag,
  ChevronRight,
  Zap,
  Truck,
  Sparkles,
  Star,
  Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCartWishlist } from '../context/CartWishlistContext';
import { STATIC_PRODUCTS } from '../services/api';

export const CartPage = ({
  onBack,
  onSelectProduct,
  onExploreCatalog
}) => {
  const navigate = useNavigate();
  const {
    cartData,
    updateCartQuantity,
    removeFromCart,
    addToCart,
    clearCart,
    showToast
  } = useCartWishlist();

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  const handleSelectProduct = (product) => {
    if (onSelectProduct) onSelectProduct(product);
    else navigate(`/product/${product.id}`);
  };

  const handleExplore = () => {
    if (onExploreCatalog) onExploreCatalog();
    else navigate('/');
  };

  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const finalPrice = cartData.totalPrice;
  const totalSavings = cartData.totalDiscount;

  // Recommended products: products not yet in cart (or all if all are in cart)
  const cartProductIds = new Set(cartData.items.map((i) => i.productId));
  const candidateProducts = STATIC_PRODUCTS.filter((p) => !cartProductIds.has(p.id));
  const recommendedProducts = candidateProducts.length > 0 ? candidateProducts : STATIC_PRODUCTS;

  const handlePlaceOrder = () => {
    if (cartData.items.length === 0) return;
    navigate('/customer-details');
  };

  const renderRecommendations = () => (
    <div className="cart-recommendations-section">
      <div className="cart-rec-header">
        <div className="cart-rec-title-wrap">
          <Sparkles size={16} color="#85532F" />
          <h3 className="cart-rec-title">You might be interested in</h3>
        </div>
        <span className="cart-rec-badge">Recommended</span>
      </div>

      <div className="cart-rec-scroll">
        {recommendedProducts.map((product) => {
          const isAdded = cartProductIds.has(product.id);
          return (
            <div key={product.id} className="cart-rec-card">
              <div>
                <div
                  className="cart-rec-img-box"
                  onClick={() => handleSelectProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="cart-rec-img"
                    loading="lazy"
                  />
                  {product.rating && (
                    <div className="cart-rec-rating">
                      <span>{product.rating}</span>
                      <Star size={9} fill="#FFFFFF" color="#FFFFFF" />
                    </div>
                  )}
                </div>

                {product.badge && (
                  <span className="cart-rec-badge-tag">{product.badge}</span>
                )}

                <h4
                  className="cart-rec-name"
                  onClick={() => handleSelectProduct(product)}
                  title={product.name}
                >
                  {product.shortName || product.name}
                </h4>

                <div className="cart-rec-price-row">
                  <span className="cart-rec-price">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="cart-rec-mrp">₹{product.originalPrice}</span>
                  )}
                  {product.discountPercent && (
                    <span className="cart-rec-discount">{product.discountPercent}% off</span>
                  )}
                </div>
              </div>

              <button
                type="button"
                className={`cart-rec-add-btn ${isAdded ? 'added' : ''}`}
                onClick={() => {
                  if (!isAdded) {
                    addToCart(product.id, 1);
                  }
                }}
                disabled={isAdded}
                aria-label={isAdded ? `${product.name} added` : `Add ${product.name} to cart`}
              >
                {isAdded ? (
                  <>
                    <Check size={13} strokeWidth={2.5} />
                    <span>ADDED</span>
                  </>
                ) : (
                  <>
                    <Plus size={13} strokeWidth={2.5} />
                    <span>ADD</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="cart-page-view">
      {/* 1. Flipkart-style Top Bar */}
      <header className="page-top-header">
        <button
          type="button"
          className="page-back-btn"
          onClick={handleBack}
          aria-label="Back"
        >
          <ArrowLeft size={22} />
        </button>
        <div className="page-header-title-box">
          <span className="page-header-title">My Cart</span>
          <span className="page-header-subtitle">
            {cartData.totalCount} {cartData.totalCount === 1 ? 'item' : 'items'}
          </span>
        </div>
      </header>

      {/* 2. Empty State or Cart Items */}
      {cartData.items.length === 0 && !orderSuccess ? (
        <div className="cart-empty-view">
          <div className="cart-empty-icon-box">
            <ShoppingBag size={56} color="#9E887B" />
          </div>
          <h2 className="cart-empty-title">Your Wellness Cart is Empty</h2>
          <p className="cart-empty-subtitle">
            Looks like you haven't added any sacred formulations yet. Explore the ZENVORO Inner Power collection!
          </p>
          <button
            type="button"
            className="cart-shop-now-btn"
            onClick={handleExplore}
          >
            Explore Sacred Rituals
          </button>

          <div style={{ marginTop: '24px', width: '100%', textAlign: 'left' }}>
            {renderRecommendations()}
          </div>
        </div>
      ) : orderSuccess ? (
        <div className="cart-order-success-card">
          <div className="order-success-icon-box">
            <CheckCircle2 size={54} color="#85532F" />
          </div>
          <h2 className="order-success-title">Order Placed Successfully</h2>
          <div className="order-id-badge">Order ID: #{orderId}</div>
          <p className="order-success-note">
            Thank you for choosing ZENVORO. Your Inner Power pack is being prepared with utmost artisanal care!
          </p>
          <div className="order-summary-box">
            <div className="order-summary-row">
              <span>Delivery by:</span>
              <strong>Tomorrow by 5:00 PM (Express)</strong>
            </div>
            <div className="order-summary-row">
              <span>Delivery Address:</span>
              <span>Connaught Place, New Delhi - 110001</span>
            </div>
            <div className="order-summary-row">
              <span>Payment Mode:</span>
              <strong style={{ color: '#85532F' }}>Cash on Delivery (COD) / UPI</strong>
            </div>
          </div>
          <button
            type="button"
            className="cart-shop-now-btn"
            onClick={() => {
              setOrderSuccess(false);
              handleExplore();
            }}
          >
            Continue Exploring
          </button>
        </div>
      ) : (
        <div className="cart-content-container">
          {/* Cart Item Cards List */}
          <div className="cart-items-list">
            {cartData.items.map(({ productId, product, quantity, itemTotal, itemMRP, itemSavings }) => (
              <div key={productId} className="cart-item-card">
                <div className="cart-item-top-row">
                  <div
                    className="cart-item-img-wrap"
                    onClick={() => handleSelectProduct(product)}
                  >
                    <img src={product.image} alt={product.name} className="cart-item-img" />
                  </div>

                  <div className="cart-item-info">
                    <div className="cart-item-brand-row">
                      <span className="cart-item-brand">ZENVORO</span>
                      <span className="cart-assured-pill">
                        <Zap size={10} fill="#CBA243" color="#CBA243" />
                        <span>Certified</span>
                      </span>
                    </div>

                    <h3
                      className="cart-item-name"
                      onClick={() => handleSelectProduct(product)}
                    >
                      {product.name}
                    </h3>

                    {product.size && (
                      <div className="cart-item-variant">Size: {product.size}</div>
                    )}

                    <div className="cart-item-price-row">
                      <span className="cart-item-price">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="cart-item-mrp">₹{product.originalPrice}</span>
                      )}
                      {product.discountPercent && (
                        <span className="cart-item-discount">{product.discountPercent}% off</span>
                      )}
                    </div>

                    <div className="cart-delivery-tag">
                      <Truck size={13} color="#059669" />
                      <span>Free Delivery by Tomorrow</span>
                    </div>
                  </div>
                </div>

                {/* Stepper & Actions */}
                <div className="cart-item-actions-row">
                  <div className="cart-stepper">
                    <button
                      type="button"
                      className="cart-stepper-btn"
                      onClick={() => updateCartQuantity(productId, quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="cart-stepper-qty">{quantity}</span>
                    <button
                      type="button"
                      className="cart-stepper-btn"
                      onClick={() => updateCartQuantity(productId, quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    type="button"
                    className="cart-remove-btn"
                    onClick={() => removeFromCart(productId)}
                  >
                    <Trash2 size={15} />
                    <span>REMOVE</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Price Details Breakdown Card (Flipkart Exact) */}
          <div className="cart-section-card cart-price-details-card">
            <h3 className="cart-price-heading">
              PRICE DETAILS ({cartData.totalCount} {cartData.totalCount === 1 ? 'Item' : 'Items'})
            </h3>

            <div className="cart-breakdown-row">
              <span>Total MRP</span>
              <span>₹{cartData.totalMRP}</span>
            </div>

            <div className="cart-breakdown-row discount">
              <span>Discount on MRP</span>
              <span className="green-text">- ₹{cartData.totalDiscount}</span>
            </div>

            <div className="cart-breakdown-row">
              <span>Delivery Charges</span>
              <span className="green-text">
                <del style={{ color: '#94A3B8', marginRight: '4px' }}>₹40</del> FREE
              </span>
            </div>

            <div className="cart-total-amount-row">
              <span>Total Amount</span>
              <span className="cart-final-total-price">₹{finalPrice}</span>
            </div>

            <div className="cart-savings-note">
              You will save ₹{totalSavings} on this order
            </div>
          </div>

          {/* Trust & Assurance Strip */}
          <div className="cart-trust-banner">
            <ShieldCheck size={20} color="#0D9488" />
            <span>Safe and Secure Payments • 100% Authentic Products</span>
          </div>

          {/* Flipkart-Style Recommendations Section */}
          {renderRecommendations()}
        </div>
      )}

      {/* 4. Flipkart Sticky Bottom Checkout Bar */}
      {cartData.items.length > 0 && !orderSuccess && (
        <div className="cart-bottom-checkout-bar">
          <div className="checkout-bar-price-col">
            <span className="checkout-bar-price">₹{finalPrice}</span>
            <span className="checkout-bar-link">Total Amount</span>
          </div>

          <button
            type="button"
            className="cart-place-order-btn"
            onClick={handlePlaceOrder}
          >
            <span>PLACE ORDER</span>
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};
