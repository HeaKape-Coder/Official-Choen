import React, { useState } from 'react';
import { MessageCircle, Facebook, Instagram, Phone, Mail } from 'lucide-react';
import { useAuth } from './AuthContext';
import { AuthModal } from './AuthModal';
import { TermsModal } from './TermsModal';
import footerBg from 'figma:asset/75c8da4efc1ad651898e04befbbee434151c86ba.png';
import choenLogo from 'figma:asset/d9344b3f7a7e36a129c41be2cc53437b4563bbd0.png';

interface FooterProps {
  onNavigate?: (page: 'home' | 'market' | 'announcement' | 'profile') => void;
  onMarketTabChange?: (tab: string) => void;
  onAnnouncementTabChange?: (tab: 'events' | 'updates' | 'reviews') => void;
}

export function Footer({ onNavigate, onMarketTabChange, onAnnouncementTabChange }: FooterProps) {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleNavigationClick = (e: React.MouseEvent, link: string) => {
    e.preventDefault();
    if (!onNavigate) return;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    switch (link) {
      case 'Home':
        onNavigate('home');
        break;
      case 'Market':
        onNavigate('market');
        break;
      case 'Announcement':
        onNavigate('announcement');
        break;
      case 'My Account':
        if (isAuthenticated) {
          onNavigate('profile');
        } else {
          setShowAuthModal(true);
        }
        break;
    }
  };

  const handleQuickLinkClick = (e: React.MouseEvent, link: string) => {
    e.preventDefault();
    if (!onNavigate) return;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    switch (link) {
      case 'Game Credits':
        if (onMarketTabChange) onMarketTabChange('game-credits');
        onNavigate('market');
        break;
      case 'Handcrafted & Gifts':
        if (onMarketTabChange) onMarketTabChange('flower-bouquets');
        onNavigate('market');
        break;
      case 'Premium Accounts':
        if (onMarketTabChange) onMarketTabChange('premium-accounts');
        onNavigate('market');
        break;
      case 'Events':
        if (onAnnouncementTabChange) onAnnouncementTabChange('events');
        onNavigate('announcement');
        break;
      case 'Updates':
        if (onAnnouncementTabChange) onAnnouncementTabChange('updates');
        onNavigate('announcement');
        break;
      case 'Reviews':
        if (onAnnouncementTabChange) onAnnouncementTabChange('reviews');
        onNavigate('announcement');
        break;
      case 'Terms & Policy':
        setShowTermsModal(true);
        break;
    }
  };

  const navigationLinks = ['Home', 'Market', 'Announcement', 'My Account'];
  const quickLinks = ['Game Credits', 'Handcrafted & Gifts', 'Premium Accounts', 'Events', 'Updates', 'Reviews', 'Terms & Policy'];

  return (
    <>
      <footer className="relative overflow-hidden" style={{ 
        backgroundImage: `url(${footerBg})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}>
        {/* Green Overlay */}
        <div className="absolute inset-0 z-0" style={{ backgroundColor: 'rgba(2, 36, 19, 0.65)' }}></div>

        <div className="text-white pt-12 pb-8 relative z-10">
          <div className="max-w-[1440px] mx-auto px-16">
            {/* Three Column Layout */}
            <div className="grid grid-cols-[350px_1fr_350px] gap-12 mb-8">
              {/* Left Column: Logo & Social Media */}
              <div className="flex flex-col items-center">
                {/* Logo */}
                <div className="mb-6">
                  <div className="w-[125px] h-[125px] rounded-full overflow-hidden flex items-center justify-center">
                    <img src={choenLogo} alt="Choen Logo" className="w-full h-full object-cover" />
                  </div>
                </div>
                
                {/* Brand Name */}
                <div className="mb-4">
                  <p style={{ fontFamily: "'Sedan SC', serif", fontSize: '55px', textAlign: 'center' }}>
                    CHOEN
                  </p>
                </div>

                {/* Social Media Icons */}
                <div className="flex gap-4">
                  <a 
                    href="https://www.facebook.com/choen.lobby" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-[47px] h-[47px] rounded-full border-2 border-white flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <Facebook className="w-6 h-6 text-white group-hover:text-[#3E996C] transition-colors" strokeWidth={2} />
                  </a>
                  <a 
                    href="https://www.instagram.com/choen_store?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-[47px] h-[47px] rounded-full border-2 border-white flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <Instagram className="w-6 h-6 text-white group-hover:text-[#3E996C] transition-colors" strokeWidth={2} />
                  </a>
                  <a 
                    href="https://discord.gg/fWXnfv9zUK" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-[47px] h-[47px] rounded-full border-2 border-white flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <MessageCircle className="w-6 h-6 text-white group-hover:text-[#3E996C] transition-colors" strokeWidth={2} />
                  </a>
                </div>
              </div>

              {/* Center Column: Navigation & Quick Links */}
              <div className="grid grid-cols-2 gap-16 pl-16">
                {/* Navigation */}
                <div>
                  <h4 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '30px', marginBottom: '12px' }}>
                    Navigation
                  </h4>
                  <div className="w-[190px] h-[1.5px] bg-white mb-3"></div>
                  <ul className="space-y-1">
                    {navigationLinks.map((link) => (
                      <li key={link}>
                        <a 
                          href="#" 
                          onClick={(e) => handleNavigationClick(e, link)}
                          style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '18px', letterSpacing: '0.36px' }}
                          className="inline-block hover:border-b-2 hover:border-white transition-all cursor-pointer"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '30px', marginBottom: '12px' }}>
                    Quick Links
                  </h4>
                  <div className="w-[190px] h-[1.5px] bg-white mb-3"></div>
                  <ul className="space-y-2">
                    {quickLinks.map((link) => (
                      <li key={link}>
                        <a 
                          href="#" 
                          onClick={(e) => handleQuickLinkClick(e, link)}
                          style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '18px', letterSpacing: '0.36px' }}
                          className="inline-block hover:border-b-2 hover:border-white transition-all cursor-pointer"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Contact Us */}
              <div>
                <h4 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '45px', marginBottom: '24px' }}>
                  Contact Us
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-[30px] h-[30px] bg-white rounded-full flex-shrink-0 flex items-center justify-center">
                      <Phone className="w-4 h-4 text-[#022413]" strokeWidth={2.5} />
                    </div>
                    <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '20px', letterSpacing: '0.4px' }}>
                      +63 956 741 6946
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-[30px] h-[30px] bg-white rounded-full flex-shrink-0 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-[#022413]" strokeWidth={2.5} />
                    </div>
                    <a 
                      href="mailto:choen@gmail.com" 
                      style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '20px', letterSpacing: '0.4px' }}
                      className="inline-block hover:border-b-2 hover:border-white transition-all"
                    >
                      choen@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-[2px] bg-white my-6"></div>

            {/* Copyright */}
            <div>
              <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '20px', letterSpacing: '0.4px', textAlign: 'center' }}>
                © 2025 Choen. All rights reserved. | Your digital playground for game credits, gifts, and services.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      
      {/* Terms Modal */}
      <TermsModal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)} />
    </>
  );
}
