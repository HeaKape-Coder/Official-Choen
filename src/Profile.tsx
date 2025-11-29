import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, User, Bookmark, Clock, MessageCircle, FileText, LogOut, UserX } from 'lucide-react';
import { useAuth } from './components/AuthContext';
import { Footer } from './components/Footer';
import { TermsModal } from './components/TermsModal';
import { EditProfileModal } from './components/EditProfileModal';
import { LogoutConfirmModal } from './components/LogoutConfirmModal';
import { DeactivateAccountModal } from './components/DeactivateAccountModal';
import { CustomerServiceModal } from './components/CustomerServiceModal';
import { NotificationDropdown } from './components/NotificationDropdown';
import { DetailedEventModal } from './components/DetailedEventModal';
import SavedEvents from './SavedEvents';
import OrderTracking from './OrderTracking';

interface ProfileProps {
  onNavigate?: (page: 'home' | 'market' | 'announcement' | 'profile') => void;
  eventsData?: any[];
}

export default function Profile({ onNavigate, eventsData = [] }: ProfileProps = {}) {
  const { user, logout, updateUser } = useAuth();
  const [marketTab, setMarketTab] = useState<string>('all');
  const [announcementTab, setAnnouncementTab] = useState<'events' | 'updates' | 'reviews'>('events');
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showCustomerServiceModal, setShowCustomerServiceModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [currentView, setCurrentView] = useState<'profile' | 'saved' | 'orders'>('profile');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutModal(false);
    if (onNavigate) {
      onNavigate('home');
    }
  };

  const handleSaveProfile = (username: string, password: string) => {
    if (updateUser) {
      updateUser({ name: username });
    }
    // In a real app, you would also update the password here
  };

  const handleNavigation = (page: 'home' | 'market' | 'announcement' | 'profile') => {
    setCurrentView('profile'); // Reset to profile view when navigating
    onNavigate?.(page);
  };

  const menuItems = [
    {
      section: 'Account Information',
      items: [
        { icon: User, label: 'Edit Profile', onClick: () => setShowEditProfileModal(true) },
      ]
    },
    {
      section: 'General',
      items: [
        { icon: Bookmark, label: 'Saved', onClick: () => setCurrentView('saved') },
        { icon: Clock, label: 'Order Tracking', onClick: () => setCurrentView('orders') },
        { icon: MessageCircle, label: 'Customer Service', onClick: () => setShowCustomerServiceModal(true) },
        { icon: FileText, label: 'Terms Of Use & Privacy Policy', onClick: () => setShowTermsModal(true) },
      ]
    }
  ];

  // Render different views
  if (currentView === 'saved') {
    return (
      <>
        <SavedEvents 
          onBack={() => setCurrentView('profile')}
          eventsData={eventsData}
          onEventClick={(event) => {
            setSelectedEvent(event);
            setShowEventModal(true);
          }}
        />
        <DetailedEventModal
          isOpen={showEventModal}
          onClose={() => setShowEventModal(false)}
          event={selectedEvent}
        />
      </>
    );
  }

  if (currentView === 'orders') {
    return (
      <OrderTracking onBack={() => setCurrentView('profile')} />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header with green background and curve */}
      <header 
        className="relative pt-12 pb-32"
        style={{
          background: 'linear-gradient(135deg, #022413 0%, #1a4d3a 100%)',
        }}
      >
        <div className="max-w-[1440px] mx-auto px-8">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => handleNavigation('home')}
              className="flex items-center gap-3 text-white hover:text-[#3E996C] transition-colors"
            >
              <ArrowLeft size={32} />
              <h1 
                style={{ 
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '32px',
                  letterSpacing: '2px',
                }}
              >
                PROFILE
              </h1>
            </button>
            
            {/* Notification Dropdown */}
            <NotificationDropdown 
              onNavigateToOrders={() => setCurrentView('orders')}
              eventsData={eventsData}
            />
          </div>

          {/* Profile Card */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Profile Avatar - no upload button */}
              <div className="w-[180px] h-[180px] rounded-full bg-white flex items-center justify-center mb-4 mx-auto">
                <User size={80} className="text-[#022413]" />
              </div>
              
              <div className="text-center">
                <h2 
                  style={{ 
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '28px',
                    color: 'white',
                    letterSpacing: '1.5px',
                    marginBottom: '8px'
                  }}
                >
                  {user?.name || 'Username'}
                </h2>
                <div 
                  className="inline-block px-6 py-2 rounded-full"
                  style={{ backgroundColor: '#3E996C' }}
                >
                  <span 
                    style={{ 
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: '14px',
                      fontWeight: '600',
                      color: 'white',
                      letterSpacing: '1px'
                    }}
                  >
                    BUYER
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Curved bottom */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-16 bg-white"
          style={{
            borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
            transform: 'translateY(50%)'
          }}
        />
      </header>

      {/* Content */}
      <div className="max-w-[1440px] mx-auto px-8 pt-12 pb-16">
        <div className="grid grid-cols-2 gap-12">
          {/* Left Column - Account Information */}
          <div>
            {menuItems[0] && (
              <div>
                <h3 
                  style={{ 
                    fontFamily: "'Sedan SC', serif",
                    fontSize: '28px',
                    color: '#264837',
                    marginBottom: '24px'
                  }}
                >
                  {menuItems[0].section}
                </h3>
                <div className="space-y-4">
                  {menuItems[0].items.map((item, index) => (
                    <button
                      key={index}
                      onClick={item.onClick}
                      className="w-full flex items-center justify-between p-4 rounded-lg border-2 border-gray-200 hover:border-[#3E996C] hover:bg-gray-50 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <item.icon size={24} className="text-[#363636] group-hover:text-[#3E996C] transition-colors" />
                        <span 
                          style={{ 
                            fontFamily: "'Open Sans', sans-serif",
                            fontSize: '16px',
                            color: '#363636',
                            fontWeight: '500'
                          }}
                        >
                          {item.label}
                        </span>
                      </div>
                      <ChevronRight size={20} className="text-gray-400 group-hover:text-[#3E996C] transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - General */}
          <div>
            {menuItems[1] && (
              <div>
                <h3 
                  style={{ 
                    fontFamily: "'Sedan SC', serif",
                    fontSize: '28px',
                    color: '#264837',
                    marginBottom: '24px'
                  }}
                >
                  {menuItems[1].section}
                </h3>
                <div className="space-y-4">
                  {menuItems[1].items.map((item, index) => (
                    <button
                      key={index}
                      onClick={item.onClick}
                      className="w-full flex items-center justify-between p-4 rounded-lg border-2 border-gray-200 hover:border-[#3E996C] hover:bg-gray-50 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <item.icon size={24} className="text-[#363636] group-hover:text-[#3E996C] transition-colors" />
                        <span 
                          style={{ 
                            fontFamily: "'Open Sans', sans-serif",
                            fontSize: '16px',
                            color: '#363636',
                            fontWeight: '500'
                          }}
                        >
                          {item.label}
                        </span>
                      </div>
                      <ChevronRight size={20} className="text-gray-400 group-hover:text-[#3E996C] transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Centered Logout and Deactivate Buttons */}
        <div className="flex justify-center gap-6 mt-16">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-12 py-4 rounded-[20px] border-2 border-[#022413] bg-white hover:bg-[#022413] transition-all duration-200 group"
          >
            <LogOut size={24} className="text-[#022413] group-hover:text-white transition-colors" />
            <span 
              className="group-hover:!text-white transition-colors"
              style={{ 
                fontFamily: "'Open Sans', sans-serif",
                fontSize: '18px',
                fontWeight: '600',
                color: '#022413'
              }}
            >
              LOGOUT
            </span>
          </button>
          
          <button
            onClick={() => setShowDeactivateModal(true)}
            className="flex items-center gap-3 px-12 py-4 rounded-[20px] border-2 border-[#D92D20] bg-white hover:bg-[#D92D20] transition-all duration-200 group"
          >
            <UserX size={24} className="text-[#D92D20] group-hover:text-white transition-colors" />
            <span 
              className="group-hover:!text-white transition-colors"
              style={{ 
                fontFamily: "'Open Sans', sans-serif",
                fontSize: '18px',
                fontWeight: '600',
                color: '#D92D20'
              }}
            >
              DEACTIVATE ACCOUNT
            </span>
          </button>
        </div>
      </div>

      <Footer 
        onNavigate={handleNavigation}
        onNavigateToMarket={(tab) => {
          setMarketTab(tab);
          handleNavigation('market');
        }}
        onNavigateToAnnouncement={(tab) => {
          setAnnouncementTab(tab);
          handleNavigation('announcement');
        }}
      />

      {/* Modals */}
      <TermsModal 
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
      />

      <EditProfileModal
        isOpen={showEditProfileModal}
        onClose={() => setShowEditProfileModal(false)}
        currentUsername={user?.name || ''}
        onSave={handleSaveProfile}
      />

      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
      />

      <DeactivateAccountModal
        isOpen={showDeactivateModal}
        onClose={() => setShowDeactivateModal(false)}
      />

      <CustomerServiceModal
        isOpen={showCustomerServiceModal}
        onClose={() => setShowCustomerServiceModal(false)}
      />
    </div>
  );
}
