import React, { useState } from 'react';
import { X, Mail, Phone, MessageCircle, Facebook, Instagram, Send } from 'lucide-react';

interface CustomerServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CustomerServiceModal({ isOpen, onClose }: CustomerServiceModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset after showing success
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
        onClose();
      }, 2000);
    }, 1500);
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
        className="bg-white rounded-[33px] w-[900px] max-h-[90vh] overflow-auto mx-4 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'slideUp 0.4s ease-out' }}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
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
                fontSize: '32px',
                color: '#022413',
                letterSpacing: '1.5px'
              }}
            >
              CUSTOMER SERVICE
            </h2>
            <p 
              style={{ 
                fontFamily: "'Open Sans', sans-serif", 
                fontSize: '14px',
                color: '#666',
                marginTop: '8px'
              }}
            >
              We're here to help! Send us a message or reach out through our social media.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {/* Left Side - Contact Form */}
            <div>
              <h3 
                style={{ 
                  fontFamily: "'Orbitron', sans-serif", 
                  fontSize: '18px',
                  color: '#022413',
                  marginBottom: '20px'
                }}
              >
                SEND US A MESSAGE
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label 
                    style={{ 
                      fontFamily: "'Open Sans', sans-serif", 
                      fontSize: '13px',
                      color: '#022413',
                      display: 'block',
                      marginBottom: '8px'
                    }}
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#3E996C]"
                    style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}
                  />
                </div>

                <div>
                  <label 
                    style={{ 
                      fontFamily: "'Open Sans', sans-serif", 
                      fontSize: '13px',
                      color: '#022413',
                      display: 'block',
                      marginBottom: '8px'
                    }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#3E996C]"
                    style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}
                  />
                </div>

                <div>
                  <label 
                    style={{ 
                      fontFamily: "'Open Sans', sans-serif", 
                      fontSize: '13px',
                      color: '#022413',
                      display: 'block',
                      marginBottom: '8px'
                    }}
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#3E996C]"
                    style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}
                  />
                </div>

                <div>
                  <label 
                    style={{ 
                      fontFamily: "'Open Sans', sans-serif", 
                      fontSize: '13px',
                      color: '#022413',
                      display: 'block',
                      marginBottom: '8px'
                    }}
                  >
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#3E996C] resize-none"
                    style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className="w-full py-3 rounded-[20px] transition-colors flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: isSuccess ? '#3E996C' : (isSubmitting ? '#999' : '#022413'),
                    color: 'white',
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: isSubmitting || isSuccess ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSuccess ? (
                    <>
                      <Send size={18} />
                      Message Sent Successfully!
                    </>
                  ) : isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Side - Contact Details */}
            <div>
              <h3 
                style={{ 
                  fontFamily: "'Orbitron', sans-serif", 
                  fontSize: '18px',
                  color: '#022413',
                  marginBottom: '20px'
                }}
              >
                CONTACT DETAILS
              </h3>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#022413] flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 
                      style={{ 
                        fontFamily: "'Open Sans', sans-serif", 
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#022413',
                        marginBottom: '4px'
                      }}
                    >
                      Email
                    </h4>
                    <p 
                      style={{ 
                        fontFamily: "'Open Sans', sans-serif", 
                        fontSize: '13px',
                        color: '#666'
                      }}
                    >
                      support@choen.com
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#022413] flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 
                      style={{ 
                        fontFamily: "'Open Sans', sans-serif", 
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#022413',
                        marginBottom: '4px'
                      }}
                    >
                      Phone
                    </h4>
                    <p 
                      style={{ 
                        fontFamily: "'Open Sans', sans-serif", 
                        fontSize: '13px',
                        color: '#666'
                      }}
                    >
                      +63 912 345 6789
                    </p>
                  </div>
                </div>

                {/* Live Chat */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#022413] flex items-center justify-center flex-shrink-0">
                    <MessageCircle size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 
                      style={{ 
                        fontFamily: "'Open Sans', sans-serif", 
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#022413',
                        marginBottom: '4px'
                      }}
                    >
                      Live Chat
                    </h4>
                    <p 
                      style={{ 
                        fontFamily: "'Open Sans', sans-serif", 
                        fontSize: '13px',
                        color: '#666'
                      }}
                    >
                      Available 24/7
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h4 
                  style={{ 
                    fontFamily: "'Orbitron', sans-serif", 
                    fontSize: '16px',
                    color: '#022413',
                    marginBottom: '12px'
                  }}
                >
                  FOLLOW US
                </h4>
                <div className="flex gap-3">
                  <a 
                    href="https://www.facebook.com/choen.lobby" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[#022413] flex items-center justify-center hover:bg-[#3E996C] transition-colors"
                  >
                    <Facebook size={22} className="text-white" />
                  </a>
                  <a 
                    href="https://www.instagram.com/choen.ph" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[#022413] flex items-center justify-center hover:bg-[#3E996C] transition-colors"
                  >
                    <Instagram size={22} className="text-white" />
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="mt-8 p-4 bg-[#F5F5F5] rounded-[15px]">
                <h4 
                  style={{ 
                    fontFamily: "'Open Sans', sans-serif", 
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#022413',
                    marginBottom: '8px'
                  }}
                >
                  Business Hours
                </h4>
                <p 
                  style={{ 
                    fontFamily: "'Open Sans', sans-serif", 
                    fontSize: '13px',
                    color: '#666',
                    lineHeight: '1.6'
                  }}
                >
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
