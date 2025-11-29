import React, { useState } from 'react';
import { X, User, Lock } from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUsername: string;
  onSave: (username: string, password: string) => void;
}

export function EditProfileModal({ isOpen, onClose, currentUsername, onSave }: EditProfileModalProps) {
  const [username, setUsername] = useState(currentUsername);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate username (8-15 characters)
    if (username.length < 8 || username.length > 15) {
      setError('Username must be 8-15 characters');
      return;
    }

    // Validate password change if user is trying to change it
    if (newPassword || confirmPassword || currentPassword) {
      // TODO: In a real application with backend:
      // - Verify the currentPassword matches the stored password in database
      // - Only proceed if current password is correct
      // For now, we skip this validation since there's no database
      
      if (!currentPassword) {
        setError('Please enter your current password');
        return;
      }
      if (!newPassword) {
        setError('Please enter a new password');
        return;
      }
      if (newPassword.length < 8 || newPassword.length > 20) {
        setError('Password must be 8-20 characters');
        return;
      }
      if (newPassword !== confirmPassword) {
        setError('New passwords do not match');
        return;
      }
    }

    // Save changes
    onSave(username, newPassword);
    onClose();
  };

  const handleClose = () => {
    setUsername(currentUsername);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={handleClose}
      style={{ 
        animation: 'fadeIn 0.3s ease-out',
        backgroundColor: 'rgba(2, 36, 19, 0.2)'
      }}
    >
      <div 
        className="bg-white rounded-[33px] w-[500px] max-h-[90vh] overflow-auto mx-4 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'slideUp 0.4s ease-out' }}
      >
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 text-[#022413] hover:text-[#3E996C] transition-colors z-10"
        >
          <X size={28} />
        </button>

        <div className="p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 
              style={{ 
                fontFamily: "'Orbitron', sans-serif", 
                fontSize: '28px',
                color: '#022413',
                letterSpacing: '1.5px'
              }}
            >
              EDIT PROFILE
            </h2>
            <p 
              style={{ 
                fontFamily: "'Open Sans', sans-serif", 
                fontSize: '13px',
                color: '#666',
                marginTop: '8px'
              }}
            >
              Update your username and password
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label 
                style={{ 
                  fontFamily: "'Open Sans', sans-serif", 
                  fontSize: '13px',
                  color: '#022413',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px'
                }}
              >
                <User size={16} />
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#3E996C]"
                style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}
              />
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-6"></div>

            {/* Password Section */}
            <div>
              <h3 
                style={{ 
                  fontFamily: "'Orbitron', sans-serif", 
                  fontSize: '16px',
                  color: '#022413',
                  marginBottom: '12px'
                }}
              >
                CHANGE PASSWORD
              </h3>
              <p 
                style={{ 
                  fontFamily: "'Open Sans', sans-serif", 
                  fontSize: '12px',
                  color: '#666',
                  marginBottom: '16px'
                }}
              >
                Leave blank if you don't want to change your password
              </p>

              {/* Current Password */}
              <div className="mb-4">
                <label 
                  style={{ 
                    fontFamily: "'Open Sans', sans-serif", 
                    fontSize: '13px',
                    color: '#022413',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px'
                  }}
                >
                  <Lock size={16} />
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  maxLength={20}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#3E996C]"
                  style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}
                />
              </div>

              {/* New Password */}
              <div className="mb-4">
                <label 
                  style={{ 
                    fontFamily: "'Open Sans', sans-serif", 
                    fontSize: '13px',
                    color: '#022413',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px'
                  }}
                >
                  <Lock size={16} />
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  maxLength={20}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#3E996C]"
                  style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}
                  placeholder="8-20 characters"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label 
                  style={{ 
                    fontFamily: "'Open Sans', sans-serif", 
                    fontSize: '13px',
                    color: '#022413',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px'
                  }}
                >
                  <Lock size={16} />
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  maxLength={20}
                  disabled={!newPassword || newPassword.length < 8 || newPassword.length > 20}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#3E996C] disabled:bg-gray-100 disabled:cursor-not-allowed"
                  style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div 
                className="p-3 bg-red-50 border border-red-200 rounded-[15px]"
                style={{ 
                  fontFamily: "'Open Sans', sans-serif", 
                  fontSize: '13px',
                  color: '#dc2626'
                }}
              >
                {error}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-3 rounded-[20px] border-2 border-[#022413] transition-colors"
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
                type="submit"
                className="flex-1 py-3 rounded-[20px] transition-colors"
                style={{
                  backgroundColor: '#022413',
                  color: 'white',
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
