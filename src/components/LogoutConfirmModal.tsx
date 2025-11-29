import React from 'react';
import { X, LogOut } from 'lucide-react';

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutConfirmModal({ isOpen, onClose, onConfirm }: LogoutConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={onClose}
      style={{ 
        animation: 'fadeIn 0.3s ease-out',
        backgroundColor: 'rgba(2, 36, 19, 0.2)'
      }}
    >
      <div 
        className="bg-white rounded-[33px] w-[450px] mx-4 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'slideUp 0.4s ease-out' }}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-[#022413] hover:text-[#3E996C] transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className="p-10">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-[#FEF3F2] flex items-center justify-center">
              <LogOut size={40} className="text-[#D92D20]" />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 
              style={{ 
                fontFamily: "'Orbitron', sans-serif", 
                fontSize: '24px',
                color: '#022413',
                letterSpacing: '1px',
                marginBottom: '12px'
              }}
            >
              LOGOUT
            </h2>
            <p 
              style={{ 
                fontFamily: "'Open Sans', sans-serif", 
                fontSize: '14px',
                color: '#666',
                lineHeight: '1.6'
              }}
            >
              Are you sure you want to logout? <br />
              You will need to login again to access your account.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-[20px] border-2 border-[#022413] hover:bg-gray-50 transition-colors"
              style={{
                backgroundColor: 'white',
                color: '#022413',
                fontFamily: "'Open Sans', sans-serif",
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-3 rounded-[20px] hover:bg-[#B91C1C] transition-colors"
              style={{
                backgroundColor: '#D92D20',
                color: 'white',
                fontFamily: "'Open Sans', sans-serif",
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
