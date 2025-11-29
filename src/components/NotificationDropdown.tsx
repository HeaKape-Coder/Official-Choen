import React, { useState, useRef, useEffect } from 'react';
import { Bell, Package, Ticket, Calendar } from 'lucide-react';
import { useAuth } from './AuthContext';
import { OrderDetailsModal } from './OrderDetailsModal';
import { DetailedEventModal } from './DetailedEventModal';

interface NotificationDropdownProps {
  onNavigateToOrders?: () => void;
  eventsData?: any[];
}

export function NotificationDropdown({ onNavigateToOrders, eventsData = [] }: NotificationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'discounts' | 'events'>('orders');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { orders, discounts, updateOrderStatus, markOrderAsSeen, seenEventIds, markEventAsSeen, hasNewNotification, setHasNewNotification } = useAuth();

  // Auto-complete orders when timer expires
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      orders.forEach(order => {
        if (order.status === 'processing' && order.completionTime && now >= order.completionTime) {
          updateOrderStatus(order.id, 'complete');
        }
      });
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [orders, updateOrderStatus]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const recentOrders = orders.slice(0, 3);
  const availableDiscounts = discounts.filter(d => !d.isExpired);
  const expiredDiscounts = discounts.filter(d => d.isExpired);
  
  // Get ongoing and coming soon events
  const ongoingEvents = eventsData.filter(event => event.status === 'current').slice(0, 1); // 1 ongoing event
  const comingSoonEvents = eventsData.filter(event => event.status === 'soon').slice(0, 1); // 1 coming soon event
  const notificationEvents = [...ongoingEvents, ...comingSoonEvents];
  
  // Check for unseen events
  const unseenEvents = notificationEvents.filter(event => !seenEventIds.includes(event.id));

  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showEventModal, setShowEventModal] = useState(false);

  const handleOrderClick = (order: any) => {
    setSelectedOrder(order);
    markOrderAsSeen(order.id);
    setIsOpen(false);
  };

  const handleEventClick = (event: any) => {
    markEventAsSeen(event.id);
    setSelectedEvent(event);
    setShowEventModal(true);
    setIsOpen(false);
  };

  // When dropdown opens, check if all notifications are seen
  const handleDropdownOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Check if user has seen all notifications when opening
      const hasUnseenOrders = orders.some(order => order.status === 'complete' && !order.seen);
      const hasUnseenEvents = unseenEvents.length > 0;
      const hasUnseenDiscounts = availableDiscounts.length > 0;
      
      if (!hasUnseenOrders && !hasUnseenEvents && !hasUnseenDiscounts) {
        setHasNewNotification(false);
      }
    }
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        {/* Notification Bell */}
        <button
          onClick={handleDropdownOpen}
          className="relative p-2 hover:bg-[#3E996C] rounded-full transition-colors"
        >
          <Bell size={24} color="white" />
          {(hasNewNotification || orders.some(order => order.status === 'complete' && !order.seen) || unseenEvents.length > 0 || availableDiscounts.length > 0) && (
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-[#022413]" />
          )}
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-[380px] bg-white rounded-lg shadow-2xl border border-gray-200 z-50">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'orders'
                    ? 'bg-[#3E996C] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                <Package size={16} className="inline mr-2" />
                My Orders
              </button>
              <button
                onClick={() => setActiveTab('discounts')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'discounts'
                    ? 'bg-[#3E996C] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                <Ticket size={16} className="inline mr-2" />
                My Discounts
              </button>
              <button
                onClick={() => setActiveTab('events')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'events'
                    ? 'bg-[#3E996C] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                <Calendar size={16} className="inline mr-2" />
                Events
              </button>
            </div>

            {/* Content */}
            <div className="max-h-[400px] overflow-y-auto">
              {activeTab === 'orders' && (
                <div className="p-4">
                  {recentOrders.length > 0 ? (
                    <>
                      <div className="space-y-3">
                        {recentOrders.map((order) => (
                          <div
                            key={order.id}
                            onClick={() => handleOrderClick(order)}
                            className={`p-3 rounded-lg border cursor-pointer hover:bg-gray-100 hover:border-[#3E996C] transition-all ${
                              order.status === 'complete' && !order.seen
                                ? 'bg-green-50 border-[#3E996C] shadow-sm'
                                : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2">
                                {order.status === 'complete' && !order.seen && (
                                  <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
                                )}
                                <span
                                  style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px', fontWeight: '600' }}
                                  className="text-gray-900"
                                >
                                  {order.product}
                                </span>
                              </div>
                              <span
                                className={`text-xs px-2 py-1 rounded ${
                                  order.status === 'delivered' || order.status === 'complete'
                                    ? 'bg-green-100 text-green-700'
                                    : order.status === 'out-for-delivery'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-yellow-100 text-yellow-700'
                                }`}
                                style={{ fontFamily: "'Open Sans', sans-serif" }}
                              >
                                {order.status === 'out-for-delivery' ? 'Out for Delivery' : order.status.toUpperCase()}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-xs text-gray-600">
                              <span style={{ fontFamily: "'Open Sans', sans-serif" }}>{order.date}</span>
                              <span style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: '600' }}>{order.price}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      {orders.length > 3 && (
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            onNavigateToOrders?.();
                          }}
                          className="w-full mt-4 py-2 bg-[#3E996C] text-white rounded-lg hover:bg-[#2d7450] transition-colors"
                          style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px', fontWeight: '600' }}
                        >
                          See More Orders
                        </button>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Package size={48} className="mx-auto mb-3 opacity-30" />
                      <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}>
                        No orders yet
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'discounts' && (
                <div className="p-4">
                  {discounts.length > 0 ? (
                    <div className="space-y-4">
                      {availableDiscounts.length > 0 && (
                        <div>
                          <h3
                            style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '12px', fontWeight: '700' }}
                            className="text-gray-700 uppercase mb-2"
                          >
                            Available
                          </h3>
                          <div className="space-y-2">
                            {availableDiscounts.map((discount) => (
                              <div
                                key={discount.id}
                                className="p-3 bg-gradient-to-r from-[#46B95F] to-[#319652] rounded-lg text-white"
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <div
                                      style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '20px', fontWeight: '700' }}
                                    >
                                      {discount.price}
                                    </div>
                                    <div
                                      style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '12px' }}
                                      className="opacity-90"
                                    >
                                      {discount.type}
                                    </div>
                                  </div>
                                  <Ticket size={24} className="opacity-70" />
                                </div>
                                <div
                                  style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '14px', fontWeight: '600', color: '#022413' }}
                                  className="bg-white bg-opacity-90 px-2 py-1 rounded inline-block"
                                >
                                  {discount.code}
                                </div>
                                <div
                                  style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '10px' }}
                                  className="mt-2 opacity-75"
                                >
                                  Expires: {discount.expiryDate}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {expiredDiscounts.length > 0 && (
                        <div>
                          <h3
                            style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '12px', fontWeight: '700' }}
                            className="text-gray-700 uppercase mb-2"
                          >
                            Expired
                          </h3>
                          <div className="space-y-2">
                            {expiredDiscounts.map((discount) => (
                              <div
                                key={discount.id}
                                className="p-3 bg-gray-200 rounded-lg relative opacity-60"
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <div
                                      style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '20px', fontWeight: '700' }}
                                      className="text-gray-600"
                                    >
                                      {discount.price}
                                    </div>
                                    <div
                                      style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '12px' }}
                                      className="text-gray-600"
                                    >
                                      {discount.type}
                                    </div>
                                  </div>
                                  <Ticket size={24} className="text-gray-400" />
                                </div>
                                <div
                                  style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '14px', fontWeight: '600' }}
                                  className="bg-gray-300 text-gray-600 px-2 py-1 rounded inline-block"
                                >
                                  {discount.code}
                                </div>
                                <div
                                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-600 text-2xl font-bold opacity-80"
                                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                                >
                                  EXPIRED
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Ticket size={48} className="mx-auto mb-3 opacity-30" />
                      <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}>
                        No discounts available
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'events' && (
                <div className="p-4">
                  {notificationEvents.length > 0 ? (
                    <div className="space-y-3">
                      {notificationEvents.map((event, idx) => {
                        const isUnseen = !seenEventIds.includes(event.id);
                        const statusBadge = event.status === 'current' ? 'ONGOING' : 'COMING SOON';
                        const statusColor = event.status === 'current' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700';
                        
                        return (
                          <div 
                            key={idx} 
                            onClick={() => handleEventClick(event)}
                            className={`p-3 rounded-lg border cursor-pointer hover:bg-purple-100 transition-all ${
                              isUnseen
                                ? 'bg-purple-100 border-purple-400 shadow-sm'
                                : 'bg-purple-50 border-purple-200'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              {isUnseen && (
                                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                              )}
                              <Calendar size={20} className="text-purple-600 mt-1 flex-shrink-0" />
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                  <div
                                    style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px', fontWeight: '600' }}
                                    className="text-gray-900"
                                  >
                                    {event.title}
                                  </div>
                                  <span 
                                    className={`text-xs px-2 py-0.5 rounded ${statusColor}`}
                                    style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '10px', fontWeight: '600' }}
                                  >
                                    {statusBadge}
                                  </span>
                                </div>
                                <div
                                  style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '12px' }}
                                  className="text-gray-600"
                                >
                                  {event.description}
                                </div>
                                <div
                                  style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '11px' }}
                                  className="text-purple-600 mt-2"
                                >
                                  {event.date} - {event.endDate}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Calendar size={48} className="mx-auto mb-3 opacity-30" />
                      <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}>
                        No events available
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
        onStatusUpdate={updateOrderStatus}
      />

      {/* Event Details Modal */}
      <DetailedEventModal
        isOpen={showEventModal}
        onClose={() => {
          setShowEventModal(false);
          setSelectedEvent(null);
        }}
        event={selectedEvent}
      />
    </>
  );
}
