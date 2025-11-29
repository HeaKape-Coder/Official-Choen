import React, { useState } from 'react';
import { Diamond } from 'lucide-react';
import { useAuth } from './AuthContext';
import { AuthModal } from './AuthModal';
import { PurchaseModal } from './PurchaseModal';
import mlDiamondIcon from 'figma:asset/ef6c54a0a98a4be6d02e7c583d3122e7aea23808.png';
import valorantIcon from 'figma:asset/b2fd3d42b543e147448b3ac64598bfff994db3b1.png';

interface GameCreditCardProps {
  gameImage: string;
  subtitle: string;
  gameName: string;
  eventDetail: string;
  diamonds: number;
  extraDiamonds: number;
  price: string;
  category?: string;
}

export function GameCreditCard({
  gameImage,
  subtitle,
  gameName,
  eventDetail,
  diamonds,
  extraDiamonds,
  price,
  category = 'game-credits',
}: GameCreditCardProps) {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      // Show purchase modal
      setShowPurchaseModal(true);
    }
  };

  return (
    <>
      <div
        className="w-full h-[347px] bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-300"
        style={{
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
          boxShadow: isHovered ? '0 12px 24px rgba(0,0,0,0.15)' : '0 4px 6px rgba(0,0,0,0.1)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
      {/* Game Image */}
      <div className="relative w-full h-[208.6px] overflow-hidden">
        <img
          src={gameImage}
          alt={gameName}
          className="w-full h-full object-cover"
          style={{ borderRadius: '15px 15px 0 0' }}
        />
      </div>

      {/* Card Content */}
      <div className="px-4 py-3">
        {/* Subtitle */}
        <div 
          style={{ 
            fontFamily: "'Orbitron', sans-serif", 
            fontSize: '12px',
            color: '#666',
            marginBottom: '2px'
          }}
        >
          {subtitle}
        </div>

        {/* Game Name */}
        <div 
          style={{ 
            fontFamily: "'Open Sans', sans-serif", 
            fontSize: '18px',
            fontWeight: '700',
            color: '#022413',
            marginBottom: '2px',
            lineHeight: '1.1'
          }}
        >
          {gameName}
        </div>

        {/* Event Detail */}
        <div 
          style={{ 
            fontFamily: "'Open Sans', sans-serif", 
            fontSize: '11px',
            color: '#666',
            marginBottom: '8px',
            lineHeight: '1.2'
          }}
        >
          {eventDetail}
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between mt-2">
          {(gameName === 'MOBILE LEGENDS' || gameName === 'VALORANT') && (
            <div className="flex items-center gap-1.5">
              {gameName === 'MOBILE LEGENDS' ? (
                <img src={mlDiamondIcon} alt="Diamond" className="w-[14px] h-[14px]" />
              ) : gameName === 'VALORANT' ? (
                <img src={valorantIcon} alt="Valorant Points" className="w-[14px] h-[14px]" />
              ) : null}
              <span 
                style={{ 
                  fontFamily: "'Open Sans', sans-serif", 
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#022413'
                }}
              >
                {diamonds}
              </span>
              <span 
                style={{ 
                  fontFamily: "'Open Sans', sans-serif", 
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#3E996C'
                }}
              >
                +{extraDiamonds}
              </span>
            </div>
          )}
          <div 
            style={{ 
              fontFamily: "'Open Sans', sans-serif", 
              fontSize: '28px',
              fontWeight: '700',
              color: '#022413',
              lineHeight: '1',
              marginLeft: (gameName === 'MOBILE LEGENDS' || gameName === 'VALORANT') ? '0' : 'auto'
            }}
          >
            {price}
          </div>
        </div>
      </div>
    </div>

    <AuthModal 
      isOpen={showAuthModal} 
      onClose={() => setShowAuthModal(false)}
      onSuccess={() => {
        setShowPurchaseModal(true);
      }}
    />
    
    <PurchaseModal 
      isOpen={showPurchaseModal}
      onClose={() => setShowPurchaseModal(false)}
      product={{
        gameImage,
        subtitle,
        gameName,
        eventDetail,
        diamonds,
        extraDiamonds,
        price,
        category,
      }}
    />
    </>
  );
}
