import React, { useState, useEffect } from 'react';
import { Mail, User, Smartphone, CreditCard, Check, Tag } from 'lucide-react';
import { useAuth } from './AuthContext';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    gameImage: string;
    gameName: string;
    eventDetail: string;
    subtitle: string;
    diamonds: number;
    extraDiamonds: number;
    price: string;
    category: string;
  } | null;
}

export function PurchaseModal({ isOpen, onClose, product }: PurchaseModalProps) {
  const { user, addOrder, redeemedDiscounts, setHasNewNotification } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState<'gcash' | 'maya'>('gcash');
  const [agreeToPolicy, setAgreeToPolicy] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const [formData, setFormData] = useState({
    accountId: '',
    username: '',
    phoneNumber: '',
    name: '',
  });

  // Get applicable discounts based on product category
  const getApplicableDiscounts = () => {
    if (!product) return [];
    
    const categoryDiscountMap: { [key: string]: string[] } = {
      'game-credits': ['GAME CREDITS'],
      'flower-bouquets': ['HANDCRAFTED & GIFTS'],
      'crochets': ['HANDCRAFTED & GIFTS'],
      'fuzzy-wire': ['HANDCRAFTED & GIFTS'],
      'premium-accounts': ['SERVICES - PREMIUM'],
    };
    
    const applicableTypes = categoryDiscountMap[product.category] || [];
    return redeemedDiscounts.filter(discountId => {
      // discountId format: "type-code"
      const type = discountId.split('-')[0];
      return applicableTypes.some(appType => type === appType.replace(/ /g, ''));
    });
  };

  const applicableDiscounts = getApplicableDiscounts();

  // Calculate discounted price
  const calculatePrice = () => {
    if (!product) return { original: '0', final: '0', discount: 0 };
    
    const originalPrice = parseFloat(product.price.replace(/[₱,]/g, ''));
    let discountPercent = 0;
    
    if (selectedDiscount) {
      // Extract discount percentage from the discount ID
      // Assuming discount ID format includes percentage, e.g., "GAMECREDITS-20OFF"
      // For simplicity, we'll use a fixed discount based on category
      if (product.category === 'game-credits') discountPercent = 15;
      else if (product.category === 'premium-accounts') discountPercent = 20;
      else discountPercent = 10;
    }
    
    const finalPrice = originalPrice * (1 - discountPercent / 100);
    
    return {
      original: `₱${originalPrice.toFixed(2)}`,
      final: `₱${finalPrice.toFixed(2)}`,
      discount: discountPercent
    };
  };

  const pricing = calculatePrice();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const isGameCredit = product?.category === 'game-credits';

    if (isGameCredit) {
      // Account ID/Game ID: ONLY 8 DIGITS
      if (!formData.accountId) {
        newErrors.accountId = 'Account ID is required';
      } else if (!/^\d{8}$/.test(formData.accountId)) {
        newErrors.accountId = 'Account ID must be exactly 8 digits';
      }

      // Username/IGN: any length
      if (!formData.username) {
        newErrors.username = 'Username is required';
      }
    }

    // Phone Number: starts with 09, length 11 (with 09), ONLY DIGITS
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^09\d{9}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must start with 09 and be 11 digits';
    }

    // Full name: No numbers or special characters, must be above 2 letters
    if (!formData.name) {
      newErrors.name = 'Full name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name must contain only letters';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (!agreeToPolicy) {
      alert('Please agree to the terms and policy to continue.');
      return;
    }

    if (!product) return;

    // Show processing message
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      // Create order with 5-minute timer
      const orderDate = new Date();
      const completionTime = orderDate.getTime() + (5 * 60 * 1000); // 5 minutes from now
      
      const newOrder = {
        id: `ORD-${Date.now()}`,
        product: product.gameName,
        status: 'processing' as const,
        date: orderDate.toLocaleString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        }),
        price: pricing.final,
        paymentMethod: paymentMethod.toUpperCase(),
        userInputs: {
          ...formData,
          email: user?.email,
        },
        completionTime,
        category: product.category,
      };
      
      addOrder(newOrder);
      
      // Set notification flag after purchase
      setHasNewNotification(true);
      
      setIsProcessing(false);
      // Reset form
      setFormData({
        accountId: '',
        username: '',
        phoneNumber: '',
        name: '',
      });
      setAgreeToPolicy(false);
      setPaymentMethod('gcash');
      setSelectedDiscount(null);
      onClose();
    }, 2000);
  };

  if (!isOpen || !product) return null;

  // Check if product is a game credit
  const isGameCredit = product.category === 'game-credits';

  return (
    <>
      <div 
        className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"
        onClick={onClose}
        style={{ 
          animation: 'fadeIn 0.3s ease-out',
          backgroundColor: 'rgba(2, 36, 19, 0.2)'
        }}
      >
        <div 
          className="bg-white rounded-[33px] max-w-5xl w-full mx-4 shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
          style={{ animation: 'slideUp 0.4s ease-out' }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          <div className="flex">
            {/* Left Side - Product Image */}
            <div className="w-[45%] bg-[#022413] flex items-center justify-center p-8">
              <div className="w-full">
                <img
                  src={product.gameImage}
                  alt={product.gameName}
                  className="w-full h-[500px] object-cover rounded-2xl"
                />
              </div>
            </div>

            {/* Right Side - Product Info & Form */}
            <div className="w-[55%] p-12">
              <h2 
                style={{ 
                  fontFamily: "'Sedan SC', serif", 
                  fontSize: '40px',
                  color: '#022413',
                  marginBottom: '8px',
                  letterSpacing: '2px'
                }}
              >
                Complete Purchase
              </h2>
              
              <p style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '14px',
                color: '#666',
                marginBottom: '24px'
              }}>
                {product.subtitle}
              </p>

              {/* Product Details */}
              <div className="mb-6 p-4 bg-gray-50 rounded-2xl">
                <h3 style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#022413',
                  marginBottom: '4px'
                }}>
                  {product.gameName}
                </h3>
                <p style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '14px',
                  color: '#666',
                  marginBottom: '8px'
                }}>
                  {product.eventDetail}
                </p>
                {isGameCredit && (
                  <p style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#3E996C'
                  }}>
                    {product.diamonds} + {product.extraDiamonds} Diamonds
                  </p>
                )}
                {selectedDiscount && pricing.discount > 0 && (
                  <div className="mt-2 space-y-1">
                    <p style={{
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: '16px',
                      color: '#666',
                      textDecoration: 'line-through'
                    }}>
                      {pricing.original}
                    </p>
                    <p style={{
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: '14px',
                      color: '#3E996C',
                      fontWeight: '600'
                    }}>
                      {pricing.discount}% OFF Applied
                    </p>
                  </div>
                )}
                <p style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#022413',
                  marginTop: '4px'
                }}>
                  {pricing.final}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email (static/greyed out) */}
                <div className="relative">
                  <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                    <Mail size={18} color="#999" />
                  </div>
                  <div className="absolute left-14 top-1/2 transform -translate-y-1/2 h-8 w-px bg-gray-300"></div>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full pl-20 pr-5 py-3 border-2 border-gray-300 rounded-[20px] bg-gray-100 cursor-not-allowed"
                    style={{ 
                      fontFamily: "'Open Sans', sans-serif", 
                      fontSize: '14px',
                      color: '#999',
                    }}
                  />
                </div>

                {/* Game Account Details (only for game credits) */}
                {isGameCredit && (
                  <>
                    <div>
                      <div className="relative">
                        <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                          <User size={18} color="#022413" />
                        </div>
                        <div className="absolute left-14 top-1/2 transform -translate-y-1/2 h-8 w-px bg-black"></div>
                        <input
                          type="text"
                          required
                          value={formData.accountId}
                          onChange={(e) => {
                            setFormData({...formData, accountId: e.target.value});
                            setErrors({...errors, accountId: ''});
                          }}
                          placeholder="Account ID / Game ID (8 digits)"
                          className={`w-full pl-20 pr-5 py-3 border-2 rounded-[20px] bg-white ${
                            errors.accountId ? 'border-red-500' : 'border-[#363636]'
                          }`}
                          style={{ 
                            fontFamily: "'Open Sans', sans-serif", 
                            fontSize: '14px',
                            color: '#264837',
                          }}
                        />
                      </div>
                      {errors.accountId && (
                        <p className="text-red-500 text-xs mt-1 ml-2" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                          {errors.accountId}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="relative">
                        <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                          <User size={18} color="#022413" />
                        </div>
                        <div className="absolute left-14 top-1/2 transform -translate-y-1/2 h-8 w-px bg-black"></div>
                        <input
                          type="text"
                          required
                          value={formData.username}
                          onChange={(e) => {
                            setFormData({...formData, username: e.target.value});
                            setErrors({...errors, username: ''});
                          }}
                          placeholder="Username / IGN"
                          className={`w-full pl-20 pr-5 py-3 border-2 rounded-[20px] bg-white ${
                            errors.username ? 'border-red-500' : 'border-[#363636]'
                          }`}
                          style={{ 
                            fontFamily: "'Open Sans', sans-serif", 
                            fontSize: '14px',
                            color: '#264837',
                          }}
                        />
                      </div>
                      {errors.username && (
                        <p className="text-red-500 text-xs mt-1 ml-2" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                          {errors.username}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {/* Apply Discount */}
                {applicableDiscounts.length > 0 && (
                  <div className="pt-2">
                    <label style={{
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#022413',
                      display: 'block',
                      marginBottom: '12px'
                    }}>
                      Apply Discount (Optional)
                    </label>
                    <div className="flex gap-3 flex-wrap">
                      <button
                        type="button"
                        onClick={() => setSelectedDiscount(null)}
                        className={`flex-1 min-w-[120px] py-3 px-4 rounded-[20px] border-2 transition-all ${
                          selectedDiscount === null
                            ? 'border-[#3E996C] bg-[#3E996C] text-white' 
                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                        }`}
                        style={{
                          fontFamily: "'Open Sans', sans-serif",
                          fontSize: '14px',
                          fontWeight: '600'
                        }}
                      >
                        No Discount
                      </button>
                      {applicableDiscounts.map((discount, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedDiscount(discount)}
                          className={`flex-1 min-w-[120px] py-3 px-4 rounded-[20px] border-2 transition-all flex items-center justify-center gap-2 ${
                            selectedDiscount === discount
                              ? 'border-[#3E996C] bg-[#3E996C] text-white' 
                              : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                          }`}
                          style={{
                            fontFamily: "'Open Sans', sans-serif",
                            fontSize: '14px',
                            fontWeight: '600'
                          }}
                        >
                          <Tag size={16} />
                          Use Discount
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Payment Method */}
                <div className="pt-2">
                  <label style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#022413',
                    display: 'block',
                    marginBottom: '12px'
                  }}>
                    Payment Method
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('gcash')}
                      className={`flex-1 py-3 px-4 rounded-[20px] border-2 transition-all ${
                        paymentMethod === 'gcash' 
                          ? 'border-[#3E996C] bg-[#3E996C] text-white' 
                          : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                      style={{
                        fontFamily: "'Open Sans', sans-serif",
                        fontSize: '14px',
                        fontWeight: '600'
                      }}
                    >
                      GCash
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('maya')}
                      className={`flex-1 py-3 px-4 rounded-[20px] border-2 transition-all ${
                        paymentMethod === 'maya' 
                          ? 'border-[#3E996C] bg-[#3E996C] text-white' 
                          : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                      style={{
                        fontFamily: "'Open Sans', sans-serif",
                        fontSize: '14px',
                        fontWeight: '600'
                      }}
                    >
                      Maya
                    </button>
                  </div>
                </div>

                {/* GCash/Maya Additional Fields */}
                <div>
                  <div className="relative">
                    <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                      <Smartphone size={18} color="#022413" />
                    </div>
                    <div className="absolute left-14 top-1/2 transform -translate-y-1/2 h-8 w-px bg-black"></div>
                    <input
                      type="tel"
                      required
                      value={formData.phoneNumber}
                      onChange={(e) => {
                        setFormData({...formData, phoneNumber: e.target.value});
                        setErrors({...errors, phoneNumber: ''});
                      }}
                      placeholder="Phone Number (09XXXXXXXXX)"
                      className={`w-full pl-20 pr-5 py-3 border-2 rounded-[20px] bg-white ${
                        errors.phoneNumber ? 'border-red-500' : 'border-[#363636]'
                      }`}
                      style={{ 
                        fontFamily: "'Open Sans', sans-serif", 
                        fontSize: '14px',
                        color: '#264837',
                      }}
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1 ml-2" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                      <User size={18} color="#022413" />
                    </div>
                    <div className="absolute left-14 top-1/2 transform -translate-y-1/2 h-8 w-px bg-black"></div>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({...formData, name: e.target.value});
                        setErrors({...errors, name: ''});
                      }}
                      placeholder="Full Name (letters only, min 3 characters)"
                      className={`w-full pl-20 pr-5 py-3 border-2 rounded-[20px] bg-white ${
                        errors.name ? 'border-red-500' : 'border-[#363636]'
                      }`}
                      style={{ 
                        fontFamily: "'Open Sans', sans-serif", 
                        fontSize: '14px',
                        color: '#264837',
                      }}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1 ml-2" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Agree to Policy */}
                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="agreePolicy"
                    checked={agreeToPolicy}
                    onChange={(e) => setAgreeToPolicy(e.target.checked)}
                    className="w-5 h-5 mt-0.5 rounded border-2 border-[#264837] accent-[#3E996C] cursor-pointer"
                  />
                  <label 
                    htmlFor="agreePolicy"
                    className="cursor-pointer"
                    style={{
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: '13px',
                      color: '#264837',
                      lineHeight: '1.4'
                    }}
                  >
                    I agree to the terms and conditions and privacy policy of Choen Digital Marketplace
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!agreeToPolicy}
                  className={`w-full py-4 rounded-[20px] transition-all duration-300 transform shadow-lg ${
                    agreeToPolicy 
                      ? 'bg-[#264837] hover:bg-[#3E996C] hover:scale-105 text-white' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  style={{ 
                    fontFamily: "'Open Sans', sans-serif", 
                    fontSize: '16px', 
                    letterSpacing: '1.6px',
                    fontWeight: '600'
                  }}
                >
                  Confirm Purchase
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Processing Modal */}
      {isProcessing && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-[60] backdrop-blur-sm"
          style={{ 
            backgroundColor: 'rgba(2, 36, 19, 0.4)'
          }}
        >
          <div 
            className="bg-white rounded-[33px] p-16 max-w-md w-full mx-4 shadow-2xl text-center"
            style={{ animation: 'slideUp 0.4s ease-out' }}
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#3E996C] flex items-center justify-center">
              <Check size={48} color="white" strokeWidth={3} />
            </div>
            <h3 
              style={{ 
                fontFamily: "'Sedan SC', serif", 
                fontSize: '32px',
                color: '#022413',
                marginBottom: '12px',
                letterSpacing: '1.5px'
              }}
            >
              Processing Order
            </h3>
            <p style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: '16px',
              color: '#666',
              lineHeight: '1.6'
            }}>
              Your order is being processed. Check notifications for updates!
            </p>
            <div className="mt-8">
              <div className="w-12 h-12 border-4 border-[#3E996C] border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </>
  );
}
