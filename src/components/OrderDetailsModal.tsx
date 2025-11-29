import React, { useState, useEffect, useRef } from 'react';
import { X, Package, Calendar, CreditCard, User, Mail, MapPin, Clock } from 'lucide-react';

interface Order {
  id: string;
  product: string;
  status: 'processing' | 'complete' | 'out-for-delivery' | 'delivered';
  date: string;
  price: string;
  paymentMethod?: string;
  userInputs?: any;
  completionTime?: number;
  category?: string;
}

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onStatusUpdate: (orderId: string, newStatus: 'complete') => void;
}

export function OrderDetailsModal({ isOpen, onClose, order, onStatusUpdate }: OrderDetailsModalProps) {
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const onStatusUpdateRef = useRef(onStatusUpdate);
  
  // Update the ref when the callback changes
  useEffect(() => {
    onStatusUpdateRef.current = onStatusUpdate;
  }, [onStatusUpdate]);

  useEffect(() => {
    if (!order || !order.completionTime || order.status !== 'processing') {
      setTimeRemaining(null);
      return;
    }

    const updateTimer = () => {
      const now = Date.now();
      const remaining = order.completionTime! - now;

      if (remaining <= 0) {
        setTimeRemaining(null);
        onStatusUpdateRef.current(order.id, 'complete');
      } else {
        setTimeRemaining(remaining);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [order]);

  if (!isOpen || !order) return null;

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'complete':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'out-for-delivery':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'delivered':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'processing':
        return 'PROCESSING';
      case 'complete':
        return 'COMPLETE';
      case 'out-for-delivery':
        return 'OUT FOR DELIVERY';
      case 'delivered':
        return 'DELIVERED';
      default:
        return status.toUpperCase();
    }
  };

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
        className="bg-white rounded-[33px] max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'slideUp 0.4s ease-out' }}
      >
        {/* Header */}
        <div className="bg-[#022413] px-8 py-6 rounded-t-[33px] relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
          >
            <X size={24} />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <Package size={32} color="white" />
            <h2 
              style={{ 
                fontFamily: "'Sedan SC', serif", 
                fontSize: '32px',
                color: 'white'
              }}
            >
              Order Details
            </h2>
          </div>
          <p style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '14px',
            color: '#3E996C'
          }}>
            Order ID: {order.id}
          </p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Status Section */}
          <div className="flex items-center justify-between">
            <div>
              <p style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: '14px',
                color: '#666',
                marginBottom: '8px'
              }}>
                Order Status
              </p>
              <span 
                className={`px-4 py-2 rounded-full border-2 ${getStatusColor(order.status)} inline-block`}
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '16px',
                  fontWeight: '700'
                }}
              >
                {getStatusText(order.status)}
              </span>
            </div>

            {/* Timer */}
            {timeRemaining !== null && order.status === 'processing' && (
              <div className="text-center">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={20} className="text-[#3E996C]" />
                  <p style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: '14px',
                    color: '#666'
                  }}>
                    Processing Time
                  </p>
                </div>
                <div 
                  className="text-4xl font-bold text-[#3E996C]"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  {formatTime(timeRemaining)}
                </div>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="border-t pt-6">
            <div className="flex items-center gap-2 mb-3">
              <Package size={20} className="text-[#3E996C]" />
              <h3 style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: '16px',
                fontWeight: '700',
                color: '#022413'
              }}>
                Product Information
              </h3>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: '18px',
                fontWeight: '600',
                color: '#022413',
                marginBottom: '8px'
              }}>
                {order.product}
              </p>
              <div className="flex justify-between items-center">
                <span style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '14px',
                  color: '#666'
                }}>
                  Price
                </span>
                <span style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#3E996C'
                }}>
                  {order.price}
                </span>
              </div>
            </div>
          </div>

          {/* Date & Payment */}
          <div className="grid grid-cols-2 gap-4 border-t pt-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={18} className="text-[#3E996C]" />
                <p style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '14px',
                  color: '#666'
                }}>
                  Order Date
                </p>
              </div>
              <p style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: '14px',
                fontWeight: '600',
                color: '#022413'
              }}>
                {order.date}
              </p>
            </div>
            {order.paymentMethod && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard size={18} className="text-[#3E996C]" />
                  <p style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: '14px',
                    color: '#666'
                  }}>
                    Payment Method
                  </p>
                </div>
                <p style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#022413'
                }}>
                  {order.paymentMethod}
                </p>
              </div>
            )}
          </div>

          {/* User Inputs */}
          {order.userInputs && (
            <div className="border-t pt-6">
              <div className="flex items-center gap-2 mb-3">
                <User size={20} className="text-[#3E996C]" />
                <h3 style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#022413'
                }}>
                  Customer Information
                </h3>
              </div>
              <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                {order.userInputs.email && (
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-gray-500" />
                    <div>
                      <p style={{
                        fontFamily: "'Open Sans', sans-serif",
                        fontSize: '12px',
                        color: '#666'
                      }}>
                        Email
                      </p>
                      <p style={{
                        fontFamily: "'Open Sans', sans-serif",
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#022413'
                      }}>
                        {order.userInputs.email}
                      </p>
                    </div>
                  </div>
                )}
                {order.userInputs.name && (
                  <div className="flex items-center gap-3">
                    <User size={16} className="text-gray-500" />
                    <div>
                      <p style={{
                        fontFamily: "'Open Sans', sans-serif",
                        fontSize: '12px',
                        color: '#666'
                      }}>
                        Full Name
                      </p>
                      <p style={{
                        fontFamily: "'Open Sans', sans-serif",
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#022413'
                      }}>
                        {order.userInputs.name}
                      </p>
                    </div>
                  </div>
                )}
                {order.userInputs.phoneNumber && (
                  <div className="flex items-center gap-3">
                    <CreditCard size={16} className="text-gray-500" />
                    <div>
                      <p style={{
                        fontFamily: "'Open Sans', sans-serif",
                        fontSize: '12px',
                        color: '#666'
                      }}>
                        Phone Number
                      </p>
                      <p style={{
                        fontFamily: "'Open Sans', sans-serif",
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#022413'
                      }}>
                        {order.userInputs.phoneNumber}
                      </p>
                    </div>
                  </div>
                )}
                {order.userInputs.accountId && (
                  <div className="flex items-center gap-3">
                    <User size={16} className="text-gray-500" />
                    <div>
                      <p style={{
                        fontFamily: "'Open Sans', sans-serif",
                        fontSize: '12px',
                        color: '#666'
                      }}>
                        Account ID
                      </p>
                      <p style={{
                        fontFamily: "'Open Sans', sans-serif",
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#022413'
                      }}>
                        {order.userInputs.accountId}
                      </p>
                    </div>
                  </div>
                )}
                {order.userInputs.username && (
                  <div className="flex items-center gap-3">
                    <User size={16} className="text-gray-500" />
                    <div>
                      <p style={{
                        fontFamily: "'Open Sans', sans-serif",
                        fontSize: '12px',
                        color: '#666'
                      }}>
                        Username / IGN
                      </p>
                      <p style={{
                        fontFamily: "'Open Sans', sans-serif",
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#022413'
                      }}>
                        {order.userInputs.username}
                      </p>
                    </div>
                  </div>
                )}
                {order.userInputs.address && (
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-gray-500 mt-1" />
                    <div>
                      <p style={{
                        fontFamily: "'Open Sans', sans-serif",
                        fontSize: '12px',
                        color: '#666'
                      }}>
                        Delivery Address
                      </p>
                      <p style={{
                        fontFamily: "'Open Sans', sans-serif",
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#022413'
                      }}>
                        {order.userInputs.address}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#3E996C] text-white rounded-lg hover:bg-[#2d7450] transition-colors"
            style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            Close
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
