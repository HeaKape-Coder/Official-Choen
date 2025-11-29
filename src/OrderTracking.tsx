import React, { useState } from 'react';
import { ArrowLeft, Package, Calendar, CreditCard, Tag, Search } from 'lucide-react';
import { useAuth } from './components/AuthContext';

interface OrderTrackingProps {
  onBack?: () => void;
}

export default function OrderTracking({ onBack }: OrderTrackingProps) {
  const { orders } = useAuth();
  const [activeTab, setActiveTab] = useState<'processing' | 'complete'>('processing');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    setSearchQuery(searchInput.trim());
  };

  const filterBySearch = (items: any[], query: string) => {
    if (!query.trim()) return items;
    const lowerQuery = query.toLowerCase();
    return items.filter(item => 
      item.product.toLowerCase().includes(lowerQuery) ||
      item.id.toLowerCase().includes(lowerQuery) ||
      (item.category && item.category.toLowerCase().includes(lowerQuery))
    );
  };

  const processingOrders = filterBySearch(
    orders.filter(order => order.status === 'processing'),
    searchQuery
  );
  
  const completeOrders = filterBySearch(
    orders.filter(order => order.status === 'complete'),
    searchQuery
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'complete':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'delivered':
        return 'bg-blue-100 text-blue-700 border-blue-300';
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
      case 'delivered':
        return 'DELIVERED';
      default:
        return status.toUpperCase();
    }
  };

  const getCategoryText = (category?: string) => {
    if (!category) return 'GAME CREDITS';
    
    switch (category) {
      case 'game-credits':
        return 'GAME CREDITS';
      case 'flower-bouquets':
      case 'crochets':
      case 'fuzzy-wire':
        return 'HANDCRAFTED & GIFTS';
      case 'premium-accounts':
        return 'SERVICES - PREMIUM';
      default:
        return 'GENERAL';
    }
  };

  const renderOrders = (ordersList: any[]) => {
    if (ordersList.length === 0) {
      return (
        <div className="text-center py-20">
          <Package size={64} className="mx-auto mb-4 text-gray-300" />
          <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '16px', color: '#666' }}>
            {searchQuery ? 'No orders found matching your search.' : 'No orders in this category yet.'}
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {ordersList.map((order) => (
          <div
            key={order.id}
            className="bg-white border-2 border-gray-200 rounded-[20px] p-6 hover:border-[#3E996C] transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 
                    style={{ 
                      fontFamily: "'Orbitron', sans-serif", 
                      fontSize: '18px',
                      color: '#022413'
                    }}
                  >
                    {order.product}
                  </h3>
                  <span 
                    className={`px-3 py-1 rounded-full border text-xs ${getStatusBadge(order.status)}`}
                    style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: '600' }}
                  >
                    {getStatusText(order.status)}
                  </span>
                </div>
                <p 
                  style={{ 
                    fontFamily: "'Open Sans', sans-serif", 
                    fontSize: '12px',
                    color: '#666'
                  }}
                >
                  Order ID: {order.id}
                </p>
              </div>
              <div 
                style={{ 
                  fontFamily: "'Open Sans', sans-serif", 
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#022413'
                }}
              >
                {order.price}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {/* Category */}
              <div className="flex items-start gap-2">
                <Tag size={18} className="text-[#3E996C] mt-0.5" />
                <div>
                  <p 
                    style={{ 
                      fontFamily: "'Open Sans', sans-serif", 
                      fontSize: '11px',
                      color: '#999',
                      marginBottom: '2px'
                    }}
                  >
                    Category
                  </p>
                  <p 
                    style={{ 
                      fontFamily: "'Open Sans', sans-serif", 
                      fontSize: '13px',
                      color: '#022413',
                      fontWeight: '600'
                    }}
                  >
                    {getCategoryText(order.category)}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-start gap-2">
                <Calendar size={18} className="text-[#3E996C] mt-0.5" />
                <div>
                  <p 
                    style={{ 
                      fontFamily: "'Open Sans', sans-serif", 
                      fontSize: '11px',
                      color: '#999',
                      marginBottom: '2px'
                    }}
                  >
                    Date of Purchase
                  </p>
                  <p 
                    style={{ 
                      fontFamily: "'Open Sans', sans-serif", 
                      fontSize: '13px',
                      color: '#022413',
                      fontWeight: '600'
                    }}
                  >
                    {order.date}
                  </p>
                </div>
              </div>

              {/* Payment Method */}
              <div className="flex items-start gap-2">
                <CreditCard size={18} className="text-[#3E996C] mt-0.5" />
                <div>
                  <p 
                    style={{ 
                      fontFamily: "'Open Sans', sans-serif", 
                      fontSize: '11px',
                      color: '#999',
                      marginBottom: '2px'
                    }}
                  >
                    Payment Method
                  </p>
                  <p 
                    style={{ 
                      fontFamily: "'Open Sans', sans-serif", 
                      fontSize: '13px',
                      color: '#022413',
                      fontWeight: '600'
                    }}
                  >
                    {order.paymentMethod?.toUpperCase() || 'N/A'}
                  </p>
                </div>
              </div>

              {/* Item Name */}
              <div className="flex items-start gap-2">
                <Package size={18} className="text-[#3E996C] mt-0.5" />
                <div>
                  <p 
                    style={{ 
                      fontFamily: "'Open Sans', sans-serif", 
                      fontSize: '11px',
                      color: '#999',
                      marginBottom: '2px'
                    }}
                  >
                    Item Name
                  </p>
                  <p 
                    style={{ 
                      fontFamily: "'Open Sans', sans-serif", 
                      fontSize: '13px',
                      color: '#022413',
                      fontWeight: '600'
                    }}
                  >
                    {order.product}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

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
            ORDER TRACKING
          </h1>
        </div>
      </div>

      {/* Search and Tabs */}
      <div className="max-w-[1440px] mx-auto px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          {/* Tabs */}
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('processing')}
              className="px-8 py-3 rounded-[20px] transition-colors"
              style={{
                backgroundColor: activeTab === 'processing' ? '#022413' : 'transparent',
                color: activeTab === 'processing' ? 'white' : '#022413',
                border: '2px solid #022413',
                fontFamily: "'Open Sans', sans-serif",
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              PROCESSING ({processingOrders.length})
            </button>
            <button
              onClick={() => setActiveTab('complete')}
              className="px-8 py-3 rounded-[20px] transition-colors"
              style={{
                backgroundColor: activeTab === 'complete' ? '#022413' : 'transparent',
                color: activeTab === 'complete' ? 'white' : '#022413',
                border: '2px solid #022413',
                fontFamily: "'Open Sans', sans-serif",
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              COMPLETE ({completeOrders.length})
            </button>
          </div>

          {/* Search */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="px-6 py-3 border-2 border-[#022413] rounded-[20px] focus:outline-none focus:ring-2 focus:ring-[#3E996C]"
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: '14px',
                width: '300px'
              }}
            />
            <button
              onClick={handleSearch}
              className="px-6 py-3 rounded-[20px] hover:bg-[#1a4d3a] transition-colors"
              style={{
                backgroundColor: '#022413',
                color: 'white'
              }}
            >
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'processing' && renderOrders(processingOrders)}
          {activeTab === 'complete' && renderOrders(completeOrders)}
        </div>
      </div>
    </div>
  );
}
