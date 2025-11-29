import React from 'react';

interface NewsCardProps {
  date: string;
  title: string;
  description: string;
  isNew?: boolean;
  image?: string;
  onSeeMore?: () => void;
}

export function NewsCard({ date, title, description, isNew, image, onSeeMore }: NewsCardProps) {
  return (
    <div className="flex bg-white border border-black overflow-hidden h-[176px]">
      {/* Image Section */}
      <div 
        className="w-[246px] shrink-0 bg-cover bg-center"
        style={{ 
          backgroundImage: image ? `url(${image})` : 'none',
          backgroundColor: image ? 'transparent' : '#6B6B6B'
        }}
      ></div>
      
      {/* Content Section */}
      <div className="flex-1 p-6 flex flex-col justify-center relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p 
              style={{ 
                fontFamily: "'Open Sans', sans-serif", 
                fontSize: '14px',
                fontWeight: '300',
                color: 'black',
                letterSpacing: '0.28px',
                marginBottom: '8px'
              }}
            >
              {date}
            </p>
            <h3 
              style={{ 
                fontFamily: "'Orbitron', sans-serif", 
                fontSize: '30px',
                color: 'black',
                marginBottom: '8px'
              }}
            >
              {title}
            </h3>
            <p 
              style={{ 
                fontFamily: "'Open Sans', sans-serif", 
                fontSize: '14px',
                color: 'black',
                letterSpacing: '0.28px',
                lineHeight: '1.4'
              }}
            >
              {description}
            </p>
          </div>
          
          <div className="ml-6 text-right flex flex-col items-end justify-between h-full">
            {isNew && (
              <div 
                style={{ 
                  fontFamily: "'Open Sans', sans-serif", 
                  fontSize: '20px',
                  fontWeight: '700',
                  color: 'black',
                  letterSpacing: '0.4px'
                }}
              >
                NEW
              </div>
            )}
            <button 
              onClick={onSeeMore}
              style={{ 
                fontFamily: "'Open Sans', sans-serif", 
                fontSize: '16px',
                fontWeight: '400',
                color: 'black',
                letterSpacing: '0.32px',
                textDecoration: 'underline',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
              className="hover:text-[#3E996C] hover:font-semibold transition-all"
            >
              see more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
