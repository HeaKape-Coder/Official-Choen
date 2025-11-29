import React, { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useAuth } from './AuthContext';
import { AuthModal } from './AuthModal';

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate: string;
  image: string;
  status: 'current' | 'closed' | 'soon';
  onViewDetails?: () => void;
  fullDescription?: string;
  eventTime?: string;
  eventDate?: string;
  benefits?: string[];
  location?: string;
  fbLink?: string;
  type?: 'event' | 'update';
}

export function EventCard({ id, title, description, date, endDate, image, status, onViewDetails, fullDescription, eventTime, eventDate, benefits, location, fbLink, type }: EventCardProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated, savedEventIds, saveEvent, unsaveEvent } = useAuth();
  const isSaved = savedEventIds.includes(id);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Check if user is authenticated
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    // Toggle save state
    if (isSaved) {
      unsaveEvent(id);
    } else {
      saveEvent(id);
    }
  };

  const getStatusBadge = () => {
    const statusConfig = {
      current: { text: 'ONGOING', bg: '#3E996C' },
      closed: { text: 'CLOSED', bg: '#9F9F9F' },
      soon: { text: 'COMING SOON', bg: '#022413' }
    };
    
    const config = statusConfig[status] || statusConfig.current;
    
    return (
      <div 
        className="px-4 py-1.5 rounded-md inline-block"
        style={{ 
          backgroundColor: config.bg,
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '12px',
          color: 'white',
          fontWeight: '600',
          letterSpacing: '0.5px'
        }}
      >
        {config.text}
      </div>
    );
  };

  return (
    <>
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-[#E5E5E5] flex flex-col h-full">
        {/* Image */}
        <div className="relative h-[240px] overflow-hidden flex-shrink-0">
          <ImageWithFallback 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
          {/* Save Button */}
          <button
            onClick={handleSave}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-md"
            title={isAuthenticated ? (isSaved ? 'Remove from saved' : 'Save event') : 'Sign in to save'}
          >
            <Bookmark 
              className={`w-5 h-5 ${isSaved ? 'fill-[#3E996C] text-[#3E996C]' : 'text-[#022413]'}`}
              strokeWidth={2}
            />
          </button>
        </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Status Badge */}
        <div className="mb-3">
          {getStatusBadge()}
        </div>

        {/* Title */}
        <h3 
          className="mb-2"
          style={{ 
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '20px',
            color: '#022413',
            fontWeight: '600'
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <p 
          className="mb-4 flex-grow"
          style={{ 
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '14px',
            color: '#4A4A4A',
            lineHeight: '1.6',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {description}
        </p>

        {/* Date Range */}
        <div 
          className="mb-4 flex-shrink-0"
          style={{ 
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '13px',
            color: '#6B6B6B'
          }}
        >
          {date} - {endDate}
        </div>

        {/* View Details Button */}
        <button 
          onClick={() => {
            if (onViewDetails) {
              onViewDetails();
            }
          }}
          className="w-full py-2.5 rounded-md transition-all hover:shadow-md hover:bg-[#2d7450]"
          style={{
            backgroundColor: '#3E996C',
            color: 'white',
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '14px',
            fontWeight: '600',
            letterSpacing: '0.5px'
          }}
        >
          VIEW DETAILS
        </button>
      </div>
    </div>

    {/* Auth Modal */}
    <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}
