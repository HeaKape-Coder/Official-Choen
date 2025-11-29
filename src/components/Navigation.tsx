import React, { useState } from 'react';
import { User } from 'lucide-react';
import { useAuth } from './AuthContext';
import { AuthModal } from './AuthModal';
import { NotificationDropdown } from './NotificationDropdown';
import { ImageWithFallback } from './figma/ImageWithFallback';
import choenLogo from 'figma:asset/d9344b3f7a7e36a129c41be2cc53437b4563bbd0.png';

interface NavigationProps {
  currentPage?: 'home' | 'market' | 'announcement' | 'profile';
  onNavigate?: (page: 'home' | 'market' | 'announcement' | 'profile') => void;
  eventsData?: any[];
}

export function Navigation({ currentPage = 'home', onNavigate, eventsData = [] }: NavigationProps) {
  const { user, isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: 'home' | 'market' | 'announcement' | 'profile') => {
    e.preventDefault();
    
    // Handle My Account - check if authenticated
    if (page === 'profile' && !isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <nav className="bg-[#022413] text-white py-4 px-8 sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Brand Profile - Left Side */}
        <button 
          onClick={() => onNavigate?.('home')}
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="w-[75px] h-[75px] rounded-full flex items-center justify-center overflow-hidden">
            <img
              src={choenLogo}
              alt="Choen Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span style={{ fontFamily: "'Sedan SC', serif", fontSize: '24px', fontWeight: '400', letterSpacing: '1.68px' }}>CHOEN</span>
        </button>

        {/* Navigation Links - Right Side */}
        <div className="flex items-center gap-8">
          <a 
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            style={{ 
              fontFamily: "'Open Sans', sans-serif", 
              fontSize: '20px', 
              fontWeight: currentPage === 'home' ? '700' : '400',
              letterSpacing: '1.4px' 
            }}
            className="hover:text-[#3E996C] transition-colors"
          >
            HOME
          </a>
          <a 
            href="#market"
            onClick={(e) => handleNavClick(e, 'market')}
            style={{ 
              fontFamily: "'Open Sans', sans-serif", 
              fontSize: '20px',
              fontWeight: currentPage === 'market' ? '700' : '400',
              letterSpacing: '1.4px' 
            }}
            className="hover:text-[#3E996C] transition-colors"
          >
            MARKET
          </a>
          <a 
            href="#announcement"
            onClick={(e) => handleNavClick(e, 'announcement')}
            style={{ 
              fontFamily: "'Open Sans', sans-serif", 
              fontSize: '20px',
              fontWeight: currentPage === 'announcement' ? '700' : '400',
              letterSpacing: '1.4px' 
            }}
            className="hover:text-[#3E996C] transition-colors"
          >
            ANNOUNCEMENT
          </a>
          
          {/* Auth Button or User Profile */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-4">
              {/* User Profile Button */}
              <button 
                onClick={() => onNavigate?.('profile')}
                className="flex items-center gap-3 bg-[#3E996C] px-6 py-3 rounded-[200px] hover:bg-[#2d7450] transition-colors"
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden">
                  {user.profileImage ? (
                    <ImageWithFallback
                      src={user.profileImage}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={16} color="#022413" />
                  )}
                </div>
                <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px', letterSpacing: '1.4px', fontWeight: '600' }}>
                  {user.name}
                </span>
              </button>
              
              {/* Notification Dropdown */}
              <NotificationDropdown 
                onNavigateToOrders={() => onNavigate?.('profile')}
                eventsData={eventsData}
              />
            </div>
          ) : (
            <button 
              onClick={() => setShowAuthModal(true)}
              style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '16px', letterSpacing: '1.6px', fontWeight: '600' }}
              className="bg-[#002714] px-8 py-3 rounded-[200px] hover:bg-[#3E996C] transition-colors border border-white"
            >
              SIGN IN
            </button>
          )}
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </nav>
  );
}
