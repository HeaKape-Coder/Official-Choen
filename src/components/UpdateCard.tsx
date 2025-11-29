import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface UpdateCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  onSeeMore?: () => void;
  fullDescription?: string;
  eventTime?: string;
  eventDate?: string;
  benefits?: string[];
  location?: string;
  fbLink?: string;
  type?: 'event' | 'update';
}

export function UpdateCard({ id, title, description, image, date, onSeeMore, fullDescription, eventTime, eventDate, benefits, location, fbLink, type }: UpdateCardProps) {
  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all"
      style={{ border: '2px solid #9F9F9F' }}
    >
      {/* Square Image Container */}
      <div className="relative w-full pt-[100%] overflow-hidden">
        <ImageWithFallback 
          src={image} 
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col" style={{ minHeight: '220px' }}>
        {/* Date */}
        <div 
          className="mb-2"
          style={{ 
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '12px',
            color: '#6B6B6B'
          }}
        >
          {date}
        </div>

        {/* Title */}
        <h3 
          className="mb-3"
          style={{ 
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '18px',
            color: '#022413',
            fontWeight: '600',
            lineHeight: '1.3',
            minHeight: '48px'
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <p 
          className="mb-4 flex-1"
          style={{ 
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '14px',
            color: '#4A4A4A',
            lineHeight: '1.6',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '64px'
          }}
        >
          {description}
        </p>

        {/* See More Button */}
        <button 
          onClick={() => {
            if (onSeeMore) {
              onSeeMore();
            }
          }}
          className="w-full py-2.5 rounded-md border-2 transition-all hover:bg-[#3E996C] hover:text-white hover:border-[#3E996C]"
          style={{
            borderColor: '#022413',
            color: '#022413',
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '13px',
            fontWeight: '600',
            letterSpacing: '0.5px'
          }}
        >
          SEE MORE
        </button>
      </div>
    </div>
  );
}
