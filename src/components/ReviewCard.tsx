import React from 'react';
import { Star, Quote, Facebook } from 'lucide-react';

interface ReviewCardProps {
  name: string;
  comment: string;
  rating: number;
  profileImage?: string;
  reviewLink?: string;
}

export function ReviewCard({ name, comment, rating, profileImage, reviewLink }: ReviewCardProps) {
  const handleClick = () => {
    if (reviewLink) {
      window.open(reviewLink, '_blank');
    }
  };

  return (
    <div 
      className="bg-white rounded-[20px] p-6 relative shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer flex flex-col h-full"
      onClick={handleClick}
    >
      {/* Quote Icon */}
      <Quote size={38} className="text-[#3E996C] mb-4 flex-shrink-0" fill="#3E996C" />
      
      {/* Comment - grows to fill available space */}
      <p 
        style={{ 
          fontFamily: "'Open Sans', sans-serif", 
          fontSize: '12px',
          color: 'black',
          letterSpacing: '0.24px',
          lineHeight: '1.5',
          marginBottom: '24px',
        }}
        className="flex-grow"
      >
        {comment}
      </p>
      
      {/* Rating - fixed position */}
      <div className="flex gap-1 mb-4 flex-shrink-0">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={20} 
            fill={i < rating ? "#FFD700" : "#E0E0E0"} 
            className={i < rating ? "text-[#FFD700]" : "text-[#E0E0E0]"} 
          />
        ))}
      </div>
      
      {/* Profile Section - always at bottom */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {profileImage && (
          <div 
            className="w-[85px] h-[85px] rounded-full bg-cover bg-center flex-shrink-0"
            style={{
              backgroundImage: `url(${profileImage})`,
            }}
          ></div>
        )}
        <div className="flex-1 min-w-0">
          <p 
            style={{ 
              fontFamily: "'Orbitron', sans-serif", 
              fontSize: '20px',
              fontWeight: '700',
              color: 'black'
            }}
            className="truncate"
          >
            {name.split(' ')[0]}
          </p>
        </div>
        <Facebook size={50} className="text-[#3E996C] hover:text-[#022413] transition-colors flex-shrink-0" />
      </div>
    </div>
  );
}
