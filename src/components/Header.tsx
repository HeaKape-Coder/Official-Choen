import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface HeaderProps {
  backgroundImage: string;
  onSearch?: (query: string) => void;
}

export function Header({ backgroundImage, onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <div className="relative">
      {/* Header Image with Content */}
      <div 
        className="relative w-full h-[450px] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(2, 36, 19, 0.7), rgba(2, 36, 19, 0.7)), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="text-center text-white z-10 px-4">
          <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '36px', fontWeight: '400', letterSpacing: '2px' }}>
            WELCOME TO
          </div>
          <div style={{ fontFamily: "'Sedan SC', serif", fontSize: '100px', fontWeight: '400', marginTop: '-8px', lineHeight: '1' }}>
            CHOEN!
          </div>
          <div 
            style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '17px', fontWeight: '400', marginTop: '10px' }}
            className="max-w-4xl mx-auto opacity-90"
          >
            Your digital playground for game credits, creative gifts, and<br />
            custom services—all in one place.
          </div>
          
          {/* Search Bar */}
          <div className="mt-5 max-w-6xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for a game or products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    onSearch?.(searchQuery);
                  }
                }}
                className="w-full py-3.5 pl-4 pr-12 rounded-lg bg-white text-gray-800"
                style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '16px' }}
              />
              <button 
                onClick={() => searchQuery.trim() && onSearch?.(searchQuery)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#3E996C] transition-colors"
              >
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="bg-[#3E996C] py-4 overflow-hidden">
        <div className="marquee-container">
          <div className="marquee-content">
            <div className="marquee-group">
              <span className="marquee-item" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '24px', fontWeight: '500' }}>
                DIGITAL COMMISSIONS
              </span>
              <span className="marquee-star">★</span>
              <span className="marquee-item" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '24px', fontWeight: '500' }}>
                GAME CREDITS
              </span>
              <span className="marquee-star">★</span>
              <span className="marquee-item" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '24px', fontWeight: '500' }}>
                CROCHET
              </span>
              <span className="marquee-star">★</span>
              <span className="marquee-item" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '24px', fontWeight: '500' }}>
                BOUQUETTES
              </span>
              <span className="marquee-star">★</span>
            </div>
            <div className="marquee-group" aria-hidden="true">
              <span className="marquee-item" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '24px', fontWeight: '500' }}>
                DIGITAL COMMISSIONS
              </span>
              <span className="marquee-star">★</span>
              <span className="marquee-item" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '24px', fontWeight: '500' }}>
                GAME CREDITS
              </span>
              <span className="marquee-star">★</span>
              <span className="marquee-item" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '24px', fontWeight: '500' }}>
                CROCHET
              </span>
              <span className="marquee-star">★</span>
              <span className="marquee-item" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '24px', fontWeight: '500' }}>
                BOUQUETTES
              </span>
              <span className="marquee-star">★</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .marquee-container {
          white-space: nowrap;
          overflow: hidden;
          display: flex;
        }

        .marquee-content {
          display: flex;
          animation: marquee 30s linear infinite;
        }

        .marquee-group {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .marquee-item {
          color: white;
          margin: 0 30px;
        }

        .marquee-star {
          color: white;
          font-size: 20px;
          margin: 0 30px;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
