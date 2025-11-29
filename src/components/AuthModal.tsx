import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, Facebook, Apple } from 'lucide-react';
import { useAuth } from './AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login, setHasNewNotification } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // For Login
    if (isLogin) {
      // TODO: In a real application with backend:
      // - Check if email exists in database
      // - Verify password matches stored password
      // - Only login if credentials are valid
      // For now, we accept any credentials for demo purposes
      
      // Validate password length
      if (formData.password.length < 8 || formData.password.length > 20) {
        setError('Password must be 8-20 characters');
        return;
      }
      
      login(formData.email, formData.password, formData.name);
    } 
    // For Signup
    else {
      // Validate name (8-15 characters)
      if (formData.name.length < 8 || formData.name.length > 15) {
        setError('Name must be 8-15 characters');
        return;
      }
      
      // Validate password length (8-20 characters)
      if (formData.password.length < 8 || formData.password.length > 20) {
        setError('Password must be 8-20 characters');
        return;
      }
      
      // Check if passwords match
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      
      // TODO: In a real application with backend:
      // - Save email, name, and hashed password to database
      // - Send verification email if needed
      // For now, we just create the account locally
      
      login(formData.email, formData.password, formData.name);
    }
    
    // Set notification flag after login
    setHasNewNotification(true);
    
    // Reset form
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    });
    
    if (onSuccess) {
      onSuccess();
    }
    onClose();
  };

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
        className="bg-white rounded-[33px] p-12 max-w-2xl w-full mx-4 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'slideUp 0.4s ease-out' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Title */}
        <h2 
          style={{ 
            fontFamily: "'Sedan SC', serif", 
            fontSize: '56px',
            color: '#022413',
            textAlign: 'center',
            marginBottom: '16px',
            letterSpacing: '4px'
          }}
        >
          {isLogin ? 'LOG IN' : 'SIGN UP'}
        </h2>
        
        <p style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '16px',
          color: '#264837',
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          {isLogin ? 'Welcome back! Please login to continue' : 'Create an account to enjoy all the services!'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="relative">
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
              <Mail size={20} color="#022413" />
            </div>
            <div className="absolute left-14 top-1/2 transform -translate-y-1/2 h-10 w-px bg-black"></div>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Enter your email"
              className="w-full pl-20 pr-5 py-4 border-2 border-[#363636] rounded-[20px] bg-white"
              style={{ 
                fontFamily: "'Open Sans', sans-serif", 
                fontSize: '16px',
                color: '#264837',
                letterSpacing: '1.12px'
              }}
            />
          </div>

          {/* Name Input (only for signup) */}
          {!isLogin && (
            <div className="relative">
              <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                <User size={20} color="#022413" />
              </div>
              <div className="absolute left-14 top-1/2 transform -translate-y-1/2 h-10 w-px bg-black"></div>
              <input
                type="text"
                required={!isLogin}
                value={formData.name}
                onChange={(e) => {
                  setFormData({...formData, name: e.target.value});
                  setError('');
                }}
                placeholder="Enter your name (8-15 characters)"
                className="w-full pl-20 pr-5 py-4 border-2 border-[#363636] rounded-[20px] bg-white"
                style={{ 
                  fontFamily: "'Open Sans', sans-serif", 
                  fontSize: '16px',
                  color: '#264837',
                  letterSpacing: '1.12px'
                }}
              />
            </div>
          )}

          {/* Password Input */}
          <div className="relative">
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
              <Lock size={20} color="#022413" />
            </div>
            <div className="absolute left-14 top-1/2 transform -translate-y-1/2 h-10 w-px bg-black"></div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.password}
              onChange={(e) => {
                setFormData({...formData, password: e.target.value});
                setError('');
              }}
              placeholder="Enter your password (8-20 characters)"
              maxLength={20}
              className="w-full pl-20 pr-14 py-4 border-2 border-[#363636] rounded-[20px] bg-white"
              style={{ 
                fontFamily: "'Open Sans', sans-serif", 
                fontSize: '16px',
                color: '#264837',
                letterSpacing: '1.12px'
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password (only for signup) */}
          {!isLogin && (
            <div className="relative">
              <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                <Lock size={20} color="#022413" />
              </div>
              <div className="absolute left-14 top-1/2 transform -translate-y-1/2 h-10 w-px bg-black"></div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required={!isLogin}
                value={formData.confirmPassword}
                onChange={(e) => {
                  setFormData({...formData, confirmPassword: e.target.value});
                  setError('');
                }}
                placeholder="Confirm Password"
                maxLength={20}
                disabled={!formData.password || formData.password.length < 8 || formData.password.length > 20}
                className="w-full pl-20 pr-14 py-4 border-2 border-[#363636] rounded-[20px] bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                style={{ 
                  fontFamily: "'Open Sans', sans-serif", 
                  fontSize: '16px',
                  color: '#264837',
                  letterSpacing: '1.12px'
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                disabled={!formData.password || formData.password.length < 8 || formData.password.length > 20}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div 
              className="p-3 bg-red-50 border border-red-200 rounded-[15px] text-center"
              style={{ 
                fontFamily: "'Open Sans', sans-serif", 
                fontSize: '13px',
                color: '#dc2626'
              }}
            >
              {error}
            </div>
          )}

          {/* Remember Me & Forgot Password (only for login) */}
          {isLogin && (
            <div className="flex items-center justify-between px-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-2 border-[#264837] accent-[#264837]"
                />
                <span style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '14px',
                  color: '#264837',
                  letterSpacing: '1.12px'
                }}>
                  Remember me
                </span>
              </label>
              <button
                type="button"
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '14px',
                  color: '#264837',
                  letterSpacing: '1.12px'
                }}
                className="hover:underline"
              >
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#264837] text-white py-4 rounded-[20px] hover:bg-[#3E996C] transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ 
              fontFamily: "'Open Sans', sans-serif", 
              fontSize: '16px', 
              letterSpacing: '1.6px',
              fontWeight: '600'
            }}
          >
            {isLogin ? 'LOGIN' : 'Create Account'}
          </button>

          {/* Divider */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span 
                className="bg-white px-4"
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '12px',
                  color: '#264837',
                  letterSpacing: '0.84px',
                  fontWeight: '600'
                }}
              >
                OR
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={() => alert('Facebook sign-in is currently unavailable')}
                className="w-12 h-12 rounded-full bg-[#264837] flex items-center justify-center hover:bg-[#3E996C] transition-colors"
                title="Currently unavailable"
              >
                <Facebook size={24} color="white" fill="white" />
              </button>
              <button
                type="button"
                onClick={() => alert('Apple sign-in is currently unavailable')}
                className="w-12 h-12 rounded-full bg-[#264837] flex items-center justify-center hover:bg-[#3E996C] transition-colors"
                title="Currently unavailable"
              >
                <Apple size={24} color="white" fill="white" />
              </button>
              <button
                type="button"
                onClick={() => alert('Google sign-in is currently unavailable')}
                className="w-12 h-12 rounded-full bg-[#264837] flex items-center justify-center hover:bg-[#3E996C] transition-colors"
                title="Currently unavailable"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </button>
            </div>
            <p 
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: '11px',
                color: '#999',
                textAlign: 'center'
              }}
            >
              Social sign-in options are currently unavailable
            </p>
          </div>

          {/* Toggle Login/Signup */}
          <div className="text-center pt-4">
            <span style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '14px',
              color: '#264837'
            }}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              style={{
                fontFamily: "'Sedan SC', serif",
                fontSize: '16px',
                color: '#022413',
                letterSpacing: '0.5px'
              }}
              className="underline hover:text-[#3E996C] transition-colors uppercase"
            >
              {isLogin ? 'SIGN UP' : 'LOGIN'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
