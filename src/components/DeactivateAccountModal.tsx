import React, { useState } from 'react';
import { X, AlertTriangle, Eye, EyeOff } from 'lucide-react';

interface DeactivateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeactivateAccountModal({ isOpen, onClose }: DeactivateAccountModalProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleDeactivate = () => {
    // Validate password length
    if (password.length < 8 || password.length > 15) {
      setError('Password must be 8-15 characters');
      return;
    }

    // TODO: In a real application with backend:
    // - Verify the entered password matches the user's current password
    // - If valid, deactivate the account in the database
    // - Log the user out and redirect to home page
    
    // For now, just show a message
    alert('Account deactivation would be processed here. This feature requires backend integration.');
    setPassword('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(4px)',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
        style={{ animation: 'slideUp 0.3s ease-out' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#D92D20] to-[#B91C1C] px-8 py-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-1 transition-colors"
          >
            <X size={24} />
          </button>
          <div className="flex items-center gap-3">
            <AlertTriangle size={32} className="text-white" />
            <h2 
              style={{ 
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '24px',
                color: 'white',
                fontWeight: '700'
              }}
            >
              DEACTIVATE ACCOUNT
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-6">
          <p 
            style={{ 
              fontFamily: "'Open Sans', sans-serif",
              fontSize: '14px',
              color: '#666',
              marginBottom: '24px'
            }}
          >
            This action cannot be undone. Please enter your current password to confirm account deactivation.
          </p>

          {/* Password Input */}
          <div className="mb-6">
            <label 
              style={{ 
                fontFamily: "'Open Sans', sans-serif",
                fontSize: '14px',
                fontWeight: '600',
                color: '#022413',
                display: 'block',
                marginBottom: '8px'
              }}
            >
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#D92D20] focus:outline-none transition-colors"
                style={{ 
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '14px'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {error && (
              <p 
                style={{ 
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '12px',
                  color: '#D92D20',
                  marginTop: '6px'
                }}
              >
                {error}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-lg border-2 border-gray-300 hover:bg-gray-50 transition-colors"
              style={{ 
                fontFamily: "'Open Sans', sans-serif",
                fontSize: '14px',
                fontWeight: '600',
                color: '#666'
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleDeactivate}
              disabled={!password}
              className="flex-1 px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: password ? '#D92D20' : '#ccc',
                color: 'white',
                fontFamily: "'Open Sans', sans-serif",
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              Deactivate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
