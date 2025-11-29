import React from 'react';

interface CraftServiceCardProps {
  image: string;
  title: string;
  description: string;
  productDescription: string;
  backgroundColor: string;
  onSeeMore?: () => void;
}

export function CraftServiceCard({ image, title, description, productDescription, backgroundColor, onSeeMore }: CraftServiceCardProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Image Section */}
      <div className="h-[278px] bg-[#6B6B6B] overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>
      
      {/* Text Section */}
      <div 
        className="h-[200px] flex flex-col items-center justify-center text-center px-6"
        style={{ backgroundColor, border: '1px solid white' }}
      >
        <h3 
          style={{ 
            fontFamily: "'Orbitron', sans-serif", 
            fontSize: '24px',
            color: 'white',
            marginBottom: '8px',
            lineHeight: '1.2'
          }}
        >
          {title}
        </h3>
        <p 
          style={{ 
            fontFamily: "'Open Sans', sans-serif", 
            fontSize: '13px',
            color: 'white',
            letterSpacing: '0.28px',
            opacity: 0.9,
            marginBottom: '8px'
          }}
        >
          {productDescription}
        </p>
        <p 
          style={{ 
            fontFamily: "'Open Sans', sans-serif", 
            fontSize: '12px',
            color: 'white',
            letterSpacing: '0.24px',
            opacity: 0.7
          }}
        >
          {description}
        </p>
        <button 
          onClick={onSeeMore}
          className="mt-4 px-6 py-2 rounded-[200px] border border-white text-white hover:bg-white transition-colors"
          style={{ 
            fontFamily: "'Open Sans', sans-serif", 
            fontSize: '16px', 
            letterSpacing: '1.6px',
            color: 'white'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.color = backgroundColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'white';
          }}
        >
          SEE MORE
        </button>
      </div>
    </div>
  );
}
