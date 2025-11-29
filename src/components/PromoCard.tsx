import React, { useState } from 'react';
import { ShoppingCart, Check, Smartphone, User as UserIcon } from 'lucide-react';
import { useAuth } from './AuthContext';
import { AuthModal } from './AuthModal';

interface PromoCardProps {
  title: string;
  features: string[];
  image?: string;
}

export function PromoCard({ title, features, image }: PromoCardProps) {
  const { isAuthenticated, user, addOrder } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'gcash' | 'maya'>('gcash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const handleBuyClick = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      setShowPopup(true);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Phone Number: starts with 09, length 11 (with 09), ONLY DIGITS
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^09\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must start with 09 and be 11 digits';
    }

    // Full name: No numbers or special characters, must be above 2 letters
    if (!formData.name) {
      newErrors.name = 'Full name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name must contain only letters';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    // Address: Required
    if (!formData.address) {
      newErrors.address = 'Address is required';
    } else if (formData.address.length < 10) {
      newErrors.address = 'Address must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsProcessing(true);
    
    setTimeout(() => {
      // Create order with 5-minute timer
      const orderDate = new Date();
      const completionTime = orderDate.getTime() + (5 * 60 * 1000); // 5 minutes from now
      
      const newOrder = {
        id: `ORD-${Date.now()}`,
        product: title,
        status: 'processing' as const,
        date: orderDate.toLocaleString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        }),
        price: 'Contact for pricing',
        paymentMethod: paymentMethod.toUpperCase(),
        userInputs: {
          ...formData,
          email: user?.email,
        },
        completionTime,
        category: 'promo',
      };
      
      addOrder(newOrder);
      
      setIsProcessing(false);
      setShowPopup(false);
      setFormData({ name: '', phone: '', address: '' });
      setPaymentMethod('gcash');
      setErrors({});
    }, 2000);
  };

  return (
    <>
      <div 
        className="flex flex-col items-center transition-transform duration-300 hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Promo Image - Above the card */}
        {image && (
          <div className="mb-6">
            <div className={`transition-transform duration-300 ${isHovered ? 'scale-110 -rotate-3' : 'scale-100 rotate-0'}`}>
              <img 
                src={image} 
                alt={title}
                className="w-64 h-64 object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        )}
        
        {/* Card Details */}
        <div className="w-full bg-gradient-to-br from-[#3E996C] to-[#2d7450] rounded-[24px] p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
          <h3 
            style={{ 
              fontFamily: "'Orbitron', sans-serif", 
              fontSize: '28px',
              color: 'white',
              textAlign: 'center',
              marginBottom: '32px',
              lineHeight: '1.2'
            }}
          >
            {title}
          </h3>
          
          <div className="space-y-4 mb-10">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 group">
                <div className="w-[24px] h-[24px] rounded-full bg-white shrink-0 mt-0.5 group-hover:bg-[#022413] transition-colors duration-300 flex items-center justify-center">
                  <div className="w-[10px] h-[10px] rounded-full bg-[#3E996C]"></div>
                </div>
                <p style={{ 
                  fontFamily: "'Open Sans', sans-serif", 
                  fontSize: '15px',
                  color: 'white',
                  lineHeight: '1.6',
                  fontWeight: '400'
                }}>
                  {feature}
                </p>
              </div>
            ))}
          </div>
          
          {/* Centered Button */}
          <div className="flex justify-center">
            <button 
              onClick={handleBuyClick}
              className="bg-[#022413] text-white px-12 py-4 rounded-[200px] hover:bg-white hover:text-[#022413] transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-3 group"
              style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '16px', letterSpacing: '1.6px', fontWeight: '700' }}
            >
              <ShoppingCart size={20} className="group-hover:scale-110 transition-transform duration-300" />
              BUY PROMO
            </button>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => setShowPopup(true)}
      />

      {/* Popup Form */}
      {showPopup && !isProcessing && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm" 
          onClick={() => setShowPopup(false)}
          style={{
            animation: 'fadeIn 0.3s ease-out',
            backgroundColor: 'rgba(2, 36, 19, 0.2)'
          }}
        >
          <div 
            className="bg-white rounded-[33px] p-10 max-w-lg w-full mx-4 shadow-2xl transform transition-all max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: 'slideUp 0.4s ease-out'
            }}
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#3E996C] rounded-full mb-4">
                <ShoppingCart size={32} className="text-white" />
              </div>
              <h3 
                style={{ 
                  fontFamily: "'Sedan SC', serif", 
                  fontSize: '36px',
                  color: '#022413',
                  marginBottom: '8px'
                }}
              >
                Order Promo
              </h3>
              <p style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: '14px',
                color: '#666'
              }}>
                Fill in your details to complete your order
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label 
                  style={{ 
                    fontFamily: "'Open Sans', sans-serif", 
                    fontSize: '14px',
                    color: '#022413',
                    fontWeight: '600',
                    display: 'block',
                    marginBottom: '8px'
                  }}
                >
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <UserIcon size={18} color="#022413" />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({...formData, name: e.target.value});
                      setErrors({...errors, name: ''});
                    }}
                    placeholder="Letters only, min 3 characters"
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg ${
                      errors.name ? 'border-red-500' : 'border-[#3E996C]'
                    }`}
                    style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1 ml-2" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label 
                  style={{ 
                    fontFamily: "'Open Sans', sans-serif", 
                    fontSize: '14px',
                    color: '#022413',
                    fontWeight: '600',
                    display: 'block',
                    marginBottom: '8px'
                  }}
                >
                  Phone Number *
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Smartphone size={18} color="#022413" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({...formData, phone: e.target.value});
                      setErrors({...errors, phone: ''});
                    }}
                    placeholder="09XXXXXXXXX"
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg ${
                      errors.phone ? 'border-red-500' : 'border-[#3E996C]'
                    }`}
                    style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1 ml-2" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label 
                  style={{ 
                    fontFamily: "'Open Sans', sans-serif", 
                    fontSize: '14px',
                    color: '#022413',
                    fontWeight: '600',
                    display: 'block',
                    marginBottom: '8px'
                  }}
                >
                  Delivery Address *
                </label>
                <textarea
                  required
                  value={formData.address}
                  onChange={(e) => {
                    setFormData({...formData, address: e.target.value});
                    setErrors({...errors, address: ''});
                  }}
                  placeholder="Complete delivery address (min 10 characters)"
                  className={`w-full px-4 py-3 border-2 rounded-lg resize-none ${
                    errors.address ? 'border-red-500' : 'border-[#3E996C]'
                  }`}
                  rows={3}
                  style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1 ml-2" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    {errors.address}
                  </p>
                )}
              </div>

              {/* Payment Method */}
              <div>
                <label style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#022413',
                  display: 'block',
                  marginBottom: '8px'
                }}>
                  Payment Method *
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('gcash')}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
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
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
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

              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3.5 rounded-[200px] hover:bg-gray-300 transition-all duration-300 transform hover:scale-105"
                  style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '15px', fontWeight: '600', letterSpacing: '0.5px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#3E996C] text-white py-3.5 rounded-[200px] hover:bg-[#022413] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '15px', fontWeight: '700', letterSpacing: '0.5px' }}
                >
                  Submit Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
