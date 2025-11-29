import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { AuthModal } from './AuthModal';

interface DiscountCardProps {
  id: string;
  timer: string;
  price: string;
  type: string;
  description: string;
  code: string;
}

export function DiscountCard({ id, timer, price, type, description, code }: DiscountCardProps) {
  const { isAuthenticated, redeemedDiscounts, redeemDiscount, addDiscount, setHasNewNotification } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const isRedeemed = redeemedDiscounts.includes(id);
  
  // Parse timer string and calculate initial time in seconds
  const parseTimer = (timerStr: string): number => {
    // Extract "in Xh" or "in Xm" format
    const hourMatch = timerStr.match(/in\s+(\d+)h/);
    const minMatch = timerStr.match(/in\s+(\d+)m/);
    
    if (hourMatch) {
      const hours = parseInt(hourMatch[1]);
      return hours * 3600; // Convert to seconds
    } else if (minMatch) {
      const minutes = parseInt(minMatch[1]);
      return minutes * 60; // Convert to seconds
    }
    return 3600; // Default to 1 hour if parsing fails
  };

  // Initialize timer from localStorage or use default
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const savedData = localStorage.getItem(`discount-timer-${id}`);
    if (savedData) {
      const { timeLeft: savedTimeLeft, timestamp } = JSON.parse(savedData);
      const elapsed = Math.floor((Date.now() - timestamp) / 1000);
      const remaining = savedTimeLeft - elapsed;
      return remaining > 0 ? remaining : 0;
    }
    return parseTimer(timer);
  });
  
  const [isExpired, setIsExpired] = useState(timeLeft <= 0);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      localStorage.removeItem(`discount-timer-${id}`);
      return;
    }

    // Save to localStorage
    localStorage.setItem(`discount-timer-${id}`, JSON.stringify({
      timeLeft,
      timestamp: Date.now()
    }));

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsExpired(true);
          localStorage.removeItem(`discount-timer-${id}`);
          return 0;
        }
        const newTime = prev - 1;
        // Update localStorage every 10 seconds
        if (newTime % 10 === 0) {
          localStorage.setItem(`discount-timer-${id}`, JSON.stringify({
            timeLeft: newTime,
            timestamp: Date.now()
          }));
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, id]);

  // Format time left for display
  const formatTimeLeft = (): string => {
    if (isExpired) return 'EXPIRED';
    
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    
    if (hours > 0) {
      return `in ${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `in ${minutes}m ${seconds}s`;
    } else {
      return `in ${seconds}s`;
    }
  };

  const handleRedeem = () => {
    if (isExpired || isRedeemed) return;
    
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    
    // Add to redeemed discounts and save to user's discount list
    redeemDiscount(id);
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + Math.floor(timeLeft / 3600));
    addDiscount({
      id,
      code,
      description,
      price,
      type,
      isExpired: false,
      expiryDate: expiryDate.toLocaleDateString()
    });
    
    // Set notification flag after redeeming discount
    setHasNewNotification(true);
  };

  return (
    <>
      <div className="w-[428.87px] h-[220px] rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(62,153,108,0.6)]">
      {/* Top Section - Discount Info */}
      <div className="bg-[#46B95F] px-6 py-5 h-[120px] flex flex-col justify-between relative">
        <div className="absolute top-5 right-6" style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px', color: 'white' }}>
          Ends {formatTimeLeft()}
        </div>
        <div className="flex flex-col mt-2">
          <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '52px', fontWeight: '700', color: 'white', lineHeight: '1' }}>
            {price}
          </span>
          <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '16px', fontWeight: '600', color: 'white', marginTop: '6px' }}>
            {type}
          </span>
        </div>
      </div>

      {/* Bottom Section - Code and Redeem */}
      <div className="bg-[#319652] px-6 py-5 h-[100px] flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.9)' }}>
            {description}
          </div>
          <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '18px', fontWeight: '600', color: 'white' }}>
            {code}
          </div>
        </div>
        <button
          onClick={handleRedeem}
          disabled={isExpired || isRedeemed}
          className={`px-5 py-2.5 rounded-md transition-all duration-300 border-2 ${
            isExpired || isRedeemed
              ? 'bg-gray-600 border-gray-600 cursor-not-allowed opacity-60' 
              : 'border-white bg-transparent hover:bg-white'
          }`}
          style={{ 
            fontFamily: "'Open Sans', sans-serif", 
            fontSize: '14px', 
            fontWeight: '600', 
            color: (isExpired || isRedeemed) ? '#999' : 'white' 
          }}
          onMouseEnter={(e) => {
            if (!isExpired && !isRedeemed) {
              e.currentTarget.style.color = '#319652';
            }
          }}
          onMouseLeave={(e) => {
            if (!isExpired && !isRedeemed) {
              e.currentTarget.style.color = 'white';
            }
          }}
        >
          {isExpired ? 'EXPIRED' : (isRedeemed ? 'REDEEMED!' : 'REDEEM')}
        </button>
      </div>
    </div>

    <AuthModal 
      isOpen={showAuthModal} 
      onClose={() => setShowAuthModal(false)}
      onSuccess={() => {
        handleRedeem();
      }}
    />
    </>
  );
}
