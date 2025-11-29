import React from 'react';
import { X } from 'lucide-react';

interface EventDetails {
  date: string;
  title: string;
  description: string;
  image: string;
  eventTime?: string;
  eventDate?: string;
  benefits?: string[];
  location?: string;
  fbLink?: string;
  type: 'event' | 'update';
}

interface DetailedEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventDetails | null;
}

export function DetailedEventModal({ isOpen, onClose, event }: DetailedEventModalProps) {
  if (!isOpen || !event) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm p-4"
      onClick={onClose}
      style={{ 
        animation: 'fadeIn 0.3s ease-out',
        backgroundColor: 'rgba(2, 36, 19, 0.2)'
      }}
    >
      <div 
        className="bg-white rounded-[33px] max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'slideUp 0.4s ease-out' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X size={24} />
        </button>

        {/* Image */}
        <div className="w-full h-[300px] bg-gray-200 overflow-hidden rounded-t-[33px]">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Date Badge */}
          <div
            className="inline-block px-4 py-2 bg-[#3E996C] text-white rounded-full mb-4"
            style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px', fontWeight: '600' }}
          >
            {event.date}
          </div>

          {/* Title */}
          <h2
            style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '32px', color: '#022413' }}
            className="mb-4"
          >
            {event.title}
          </h2>

          {/* Description */}
          <p
            style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '16px', color: '#363636', lineHeight: '1.6' }}
            className="mb-6"
          >
            {event.description}
          </p>

          {/* Event Details */}
          {event.type === 'event' && (
            <div className="space-y-4 mb-6">
              {event.eventDate && (
                <div>
                  <h3
                    style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '16px', color: '#022413' }}
                    className="mb-2"
                  >
                    Event Date
                  </h3>
                  <p
                    style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px', color: '#363636' }}
                  >
                    {event.eventDate}
                  </p>
                </div>
              )}

              {event.eventTime && (
                <div>
                  <h3
                    style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '16px', color: '#022413' }}
                    className="mb-2"
                  >
                    Event Time
                  </h3>
                  <p
                    style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px', color: '#363636' }}
                  >
                    {event.eventTime}
                  </p>
                </div>
              )}

              {event.location && (
                <div>
                  <h3
                    style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '16px', color: '#022413' }}
                    className="mb-2"
                  >
                    Location
                  </h3>
                  <p
                    style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px', color: '#363636' }}
                  >
                    {event.location}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Benefits */}
          {event.benefits && event.benefits.length > 0 && (
            <div className="mb-6">
              <h3
                style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '16px', color: '#022413' }}
                className="mb-3"
              >
                {event.type === 'event' ? 'Event Benefits' : 'What\'s Included'}
              </h3>
              <ul className="space-y-2">
                {event.benefits.map((benefit, index) => (
                  <li
                    key={index}
                    style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px', color: '#363636' }}
                    className="flex items-start"
                  >
                    <span className="text-[#3E996C] mr-2">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            {event.fbLink && (
              <a
                href={event.fbLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 bg-[#3E996C] text-white rounded-lg hover:bg-[#2d7450] transition-colors text-center"
                style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '16px', fontWeight: '600' }}
              >
                View on Facebook
              </a>
            )}
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '16px', fontWeight: '600' }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
