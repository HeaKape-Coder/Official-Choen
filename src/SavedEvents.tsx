import React, { useState } from 'react';
import { Search, ArrowLeft, Bookmark } from 'lucide-react';
import { EventCard } from './components/EventCard';
import { useAuth } from './components/AuthContext';

interface SavedEventsProps {
  onBack?: () => void;
  onEventClick?: (event: any) => void;
  eventsData?: any[];
}

export default function SavedEvents({ onBack, onEventClick, eventsData = [] }: SavedEventsProps) {
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { savedEventIds } = useAuth();

  // Filter events that are saved by the user
  const savedEvents = eventsData.filter(event => savedEventIds.includes(event.id));

  const handleSearch = () => {
    setSearchQuery(searchInput.trim());
  };

  const filterBySearch = (items: any[], query: string) => {
    if (!query.trim()) return items;
    const lowerQuery = query.toLowerCase();
    return items.filter(item => 
      item.title && item.title.toLowerCase().includes(lowerQuery)
    );
  };

  const filteredEvents = filterBySearch(savedEvents, searchQuery);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div 
        className="pt-12 pb-8"
        style={{
          background: 'linear-gradient(135deg, #022413 0%, #1a4d3a 100%)',
        }}
      >
        <div className="max-w-[1440px] mx-auto px-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-3 text-white hover:text-[#3E996C] transition-colors mb-6"
          >
            <ArrowLeft size={28} />
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '24px' }}>
              BACK
            </span>
          </button>
          <h1 
            style={{ 
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '48px',
              color: 'white',
              letterSpacing: '3px',
              textAlign: 'center'
            }}
          >
            SAVED EVENTS
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1440px] mx-auto px-8 py-12">
        {/* Search Bar */}
        <div className="mb-12 flex gap-4 max-w-2xl mx-auto">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search saved events..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full px-6 py-4 rounded-full border-2 border-[#3E996C] focus:outline-none focus:border-[#022413] transition-colors"
              style={{ 
                fontFamily: "'Open Sans', sans-serif",
                fontSize: '16px'
              }}
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-8 py-4 bg-[#3E996C] text-white rounded-full hover:bg-[#022413] transition-colors flex items-center gap-2"
            style={{ 
              fontFamily: "'Open Sans', sans-serif",
              fontSize: '16px'
            }}
          >
            <Search size={20} />
            Search
          </button>
        </div>

        {/* Saved Events Display */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <EventCard
                key={index}
                {...event}
                onViewDetails={() => onEventClick?.(event)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Bookmark size={80} className="mx-auto mb-6 text-gray-300" />
            <h2 
              style={{ 
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '28px',
                color: '#022413',
                marginBottom: '12px'
              }}
            >
              {searchQuery ? 'No Events Found' : 'No Saved Events'}
            </h2>
            <p 
              style={{ 
                fontFamily: "'Open Sans', sans-serif",
                fontSize: '16px',
                color: '#666'
              }}
            >
              {searchQuery 
                ? 'Try searching with different keywords'
                : 'Save events from the Announcement page to see them here'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
