import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Navigation } from './components/Navigation';
import { EventCard } from './components/EventCard';
import { UpdateCard } from './components/UpdateCard';
import { ReviewCard } from './components/ReviewCard';
import { Footer } from './components/Footer';
import { allEventsData } from './data/eventsData';

interface AnnouncementProps {
  onNavigate?: (page: 'home' | 'market' | 'announcement' | 'profile') => void;
  initialTab?: 'events' | 'updates' | 'reviews';
  newsData?: any[];
  onEventClick?: (event: any) => void;
}

export default function Announcement({ onNavigate, initialTab, newsData = [], onEventClick }: AnnouncementProps) {
  const [activeMainTab, setActiveMainTab] = useState<'events' | 'updates' | 'reviews'>(initialTab || 'events');
  const [marketTab, setMarketTab] = useState<string>('all');
  const [activeEventTab, setActiveEventTab] = useState<'current' | 'closed' | 'soon'>('current');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  // Reset search when navigating to this page
  useEffect(() => {
    setSearchQuery('');
    setSearchInput('');
    setIsSearching(false);
    if (initialTab) {
      setActiveMainTab(initialTab);
    } else {
      setActiveMainTab('events');
    }
    setActiveEventTab('current');
  }, []);
  
  useEffect(() => {
    if (initialTab) {
      setActiveMainTab(initialTab);
    }
  }, [initialTab]);

  // Combine news data from homepage with existing events  
  const homeNewsAsEvents = newsData
    .filter((item: any) => item.type === 'event')
    .map((item: any) => ({
      id: `home-${item.date}`,
      title: item.title,
      description: item.description,
      date: item.date.split('/')[1] + '/' + item.date.split('/')[0] + '/' + item.date.split('/')[2], // Convert date format
      endDate: item.eventDate || item.date,
      image: item.image,
      status: 'current' as const,
      fullDescription: item.fullDescription,
      eventTime: item.eventTime,
      eventDate: item.eventDate,
      benefits: item.benefits,
      location: item.location,
      fbLink: item.fbLink,
      type: item.type,
    }));

  // Sample Events Data - using shared data
  const eventsData = [
    ...homeNewsAsEvents,
    ...allEventsData
  ];

  // Combine news data from homepage with existing updates
  const homeNewsAsUpdates = newsData
    .filter((item: any) => item.type === 'update')
    .map((item: any) => ({
      id: `home-${item.date}`,
      title: item.title,
      description: item.description,
      date: item.date,
      image: item.image,
      fullDescription: item.fullDescription,
      eventTime: item.eventTime,
      eventDate: item.eventDate,
      benefits: item.benefits,
      location: item.location,
      fbLink: item.fbLink,
      type: item.type,
    }));

  // Sample Updates Data
  const updatesData = [
    ...homeNewsAsUpdates,
    {
      id: '1',
      title: 'New Partnership with Riot Games',
      description: 'We are excited to announce our official partnership with Riot Games! Get exclusive deals on Valorant and League of Legends credits.',
      date: 'Nov 10, 2025',
      image: 'https://images.unsplash.com/photo-1714646184215-f7af62f72f80?w=1080'
    },
    {
      id: '2',
      title: 'Platform Maintenance Update',
      description: 'Scheduled maintenance on Nov 15 from 2AM-6AM. We are upgrading our servers to provide you with better service and faster transactions.',
      date: 'Nov 8, 2025',
      image: 'https://images.unsplash.com/photo-1740863775545-fa0b13ad4095?w=1080'
    },
    {
      id: '3',
      title: 'New Payment Methods Available',
      description: 'Now accepting GCash, Maya, and cryptocurrency payments! Enjoy more flexible and convenient ways to purchase your favorite game credits.',
      date: 'Nov 5, 2025',
      image: 'https://images.unsplash.com/photo-1726064855988-1e4deb0a3392?w=1080'
    },
    {
      id: '4',
      title: 'Mobile App Coming Soon',
      description: 'Get ready for the Choen mobile app! Purchase game credits on-the-go with our upcoming iOS and Android applications.',
      date: 'Nov 2, 2025',
      image: 'https://images.unsplash.com/photo-1633250391894-397930e3f5f2?w=1080'
    },
    {
      id: '5',
      title: 'Customer Support Enhancement',
      description: 'We have expanded our customer support team to serve you better. Now featuring 24/7 live chat support in multiple languages.',
      date: 'Oct 30, 2025',
      image: 'https://images.unsplash.com/photo-1553775282-20af80779df7?w=1080'
    },
    {
      id: '6',
      title: 'Security Update: Two-Factor Authentication',
      description: 'Protect your account with our new two-factor authentication system. Enable 2FA today and get bonus rewards!',
      date: 'Oct 28, 2025',
      image: 'https://images.unsplash.com/photo-1651235732694-0d057ace2f30?w=1080'
    },
    {
      id: '7',
      title: 'Loyalty Rewards Program Launch',
      description: 'Introducing our new loyalty program! Earn points with every purchase and redeem them for exclusive discounts and rewards.',
      date: 'Oct 25, 2025',
      image: 'https://images.unsplash.com/photo-1647221598272-9aa015392c81?w=1080'
    },
    {
      id: '8',
      title: 'Expanded Game Library',
      description: 'We have added 20+ new games to our platform! Now supporting credits for Apex Legends, Fortnite, Roblox, and many more.',
      date: 'Oct 22, 2025',
      image: 'https://images.unsplash.com/photo-1601639426179-45168809390a?w=1080'
    },
    {
      id: '9',
      title: 'Flash Sale Every Friday',
      description: 'Don\'t miss our new Flash Sale Fridays! Get up to 50% off on selected game credits and items every Friday at 8PM.',
      date: 'Oct 20, 2025',
      image: 'https://images.unsplash.com/photo-1647221598520-ce1d0da89985?w=1080'
    },
  ];

  // Reviews Data from Choen Facebook Page
  const reviewsData = [
    {
      id: '1',
      name: 'Hannah Elisha Delos Santos',
      rating: 5,
      comment: 'Choen\'s service is truly fast and remarkable, its my first time buying one of their game credit offers for MLBB. The discounted price is better than any other external sites that I have used. Their transactions are trustworthy and credible. Moreover, I plan to buy more of their products in the future due to this experience. If this website is to be rated out 5 then I give it a perfect 5 out 5!!!',
      profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      reviewLink: 'https://web.facebook.com/choen.lobby/reviews',
    },
    {
      id: '2',
      name: 'Pipoy Bagtas',
      rating: 5,
      comment: 'Very accomodating to first-time buyers and if ever hindi alam how to proceed the seller guides on what to do. Reliable naman po and all is well. Very trustworthy po, yun lang po~~',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      reviewLink: 'https://web.facebook.com/choen.lobby/reviews',
    },
    {
      id: '3',
      name: 'Gwyneth Garao',
      rating: 5,
      comment: 'This is the second time my boyfriend ordered flowers from Choen, and they never fail! The arrangements are always pretty, so well done, and delivered on time. Highly recommended for anyone who wants to surprise their loved one with something special!',
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      reviewLink: 'https://web.facebook.com/choen.lobby/reviews',
    },
    {
      id: '4',
      name: 'Jose Marquez',
      rating: 5,
      comment: 'First time ko bumili ng discounted dias sa ML and mura talaga sha compare mo sa mismong app kapa bumili ang mahal dito mura lang.',
      profileImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      reviewLink: 'https://web.facebook.com/choen.lobby/reviews',
    },
    {
      id: '5',
      name: 'Clyde Dolotallas',
      rating: 5,
      comment: 'I highly recommended Choen talaga, mabilis ang transactions and maayos ang service nila sa kanilang mga customers. Understanding din siya/sila when it comes sa mga concerns mo and always willing to answer some clarifications and questions mo. Ang dami ko tanong sa seller actually dahil bihira lang talaga kasi ako bumili online but i\'m happy and thankful how the seller assist me properly : D',
      profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      reviewLink: 'https://web.facebook.com/choen.lobby/reviews',
    },
    {
      id: '6',
      name: 'Maria Santos',
      rating: 5,
      comment: 'Amazing service! I ordered a crochet bouquet for my mom\'s birthday and she absolutely loved it. The quality is top-notch and the delivery was super fast. Will definitely order again!',
      profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      reviewLink: 'https://web.facebook.com/choen.lobby/reviews',
    },
    {
      id: '7',
      name: 'Carlos Reyes',
      rating: 5,
      comment: 'Best place to buy game credits! Got my Valorant points instantly and the price was way cheaper than official store. Customer service is very responsive too. Highly recommend!',
      profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      reviewLink: 'https://web.facebook.com/choen.lobby/reviews',
    },
    {
      id: '8',
      name: 'Angelica Cruz',
      rating: 5,
      comment: 'I love the fuzzy wire crafts! Got a custom made bouquet for my anniversary and it was perfect. The seller was very accommodating with my design requests. 10/10 experience!',
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      reviewLink: 'https://web.facebook.com/choen.lobby/reviews',
    },
  ];

  // Filter data based on search query and active tab
  const filterBySearch = (items: any[], query: string) => {
    if (!query.trim()) return items;
    const lowerQuery = query.toLowerCase();
    return items.filter(item => 
      item && item.title && item.title.toLowerCase().includes(lowerQuery)
    );
  };

  const filteredEvents = filterBySearch(
    eventsData.filter(event => {
      if (activeEventTab === 'current') return event.status === 'current';
      if (activeEventTab === 'closed') return event.status === 'closed';
      if (activeEventTab === 'soon') return event.status === 'soon';
      return true;
    }),
    searchQuery
  );

  const filteredUpdates = filterBySearch(updatesData, searchQuery);
  const filteredReviews = filterBySearch(reviewsData, searchQuery);

  // Determine if search has results
  const hasSearchResults = activeMainTab === 'events' 
    ? filteredEvents.length > 0
    : activeMainTab === 'updates'
    ? filteredUpdates.length > 0
    : filteredReviews.length > 0;
    
  const showSearchNotice = searchQuery.trim().length > 0;

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Navigation 
        currentPage="announcement" 
        onNavigate={onNavigate}
        eventsData={eventsData.filter(e => e.status === 'current')}
      />

      {/* Header Section with Search */}
      <div 
        className="relative bg-[#022413] py-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(2, 36, 19, 0.85), rgba(2, 36, 19, 0.85))',
        }}
      >
        <div className="max-w-[1440px] mx-auto px-16">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 
              style={{ 
                fontFamily: "'Sedan SC', serif",
                fontSize: '72px',
                color: 'white',
                marginBottom: '12px'
              }}
            >
              ANNOUNCEMENTS
            </h1>
            <p 
              style={{ 
                fontFamily: "'Open Sans', sans-serif",
                fontSize: '18px',
                color: 'white',
                opacity: 0.9
              }}
            >
              Stay updated with the latest events, news, and reviews from Choen
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="relative flex gap-3">
              <input
                type="text"
                placeholder="Search announcements, events, or updates..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    setSearchQuery(searchInput);
                    setIsSearching(true);
                  }
                }}
                className="flex-1 py-4 pl-6 pr-6 rounded-lg bg-white text-gray-800"
                style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '16px' }}
              />
              <button
                onClick={() => {
                  setSearchQuery(searchInput);
                  setIsSearching(true);
                }}
                className="px-8 py-4 bg-[#3E996C] text-white rounded-lg hover:bg-[#2d7450] transition-colors flex items-center gap-2"
                style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '16px', fontWeight: '600' }}
              >
                <Search size={20} />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="bg-white border-b-2 border-[#E5E5E5] sticky top-[80px] z-40">
        <div className="max-w-[1440px] mx-auto px-16">
          <div className="flex gap-8">
            {['events', 'updates', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveMainTab(tab as any)}
                className={`py-4 px-6 transition-all border-b-4 ${
                  activeMainTab === tab 
                    ? 'border-[#3E996C]' 
                    : 'border-transparent hover:border-[#9F9F9F]'
                }`}
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '18px',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  color: activeMainTab === tab ? '#3E996C' : '#022413'
                }}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-[1440px] mx-auto px-16 py-12">
        {/* Events Tab */}
        {activeMainTab === 'events' && (
          <div>
            {/* Event Sub-tabs */}
            <div className="flex gap-4 mb-8">
              {['current', 'closed', 'soon'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveEventTab(tab as any)}
                  className={`px-8 py-3 rounded-lg transition-all ${
                    activeEventTab === tab 
                      ? 'bg-[#3E996C] text-white shadow-md' 
                      : 'bg-white text-[#022413] border-2 border-[#E5E5E5] hover:border-[#3E996C]'
                  }`}
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '15px',
                    fontWeight: '600',
                    letterSpacing: '0.5px'
                  }}
                >
                  {tab === 'current' ? 'ONGOING' : tab === 'closed' ? 'CLOSED' : 'COMING SOON'}
                </button>
              ))}
            </div>

            {/* Search Notice */}
            {showSearchNotice && (
              <div className={`mb-6 p-4 rounded-lg ${hasSearchResults ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <p style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '14px',
                  color: hasSearchResults ? '#166534' : '#991b1b',
                  fontWeight: '600'
                }}>
                  {hasSearchResults 
                    ? `Found ${filteredEvents.length} event(s) matching "${searchQuery}"`
                    : `No events found matching "${searchQuery}"`
                  }
                </p>
              </div>
            )}

            {/* Events Grid */}
            <div className="grid grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  {...event}
                  onViewDetails={() => {
                    if (onEventClick) {
                      onEventClick({
                        date: event.date,
                        title: event.title,
                        description: event.fullDescription || event.description,
                        image: event.image,
                        eventTime: event.eventTime,
                        eventDate: event.eventDate,
                        benefits: event.benefits,
                        location: event.location,
                        fbLink: event.fbLink,
                        type: event.type || 'event',
                      });
                    }
                  }}
                />
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-20">
                <p 
                  style={{ 
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: '18px',
                    color: '#6B6B6B'
                  }}
                >
                  No {activeEventTab} events at the moment
                </p>
              </div>
            )}
          </div>
        )}

        {/* Updates Tab */}
        {activeMainTab === 'updates' && (
          <div>
            <div className="mb-6">
              <h2 
                style={{ 
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '28px',
                  color: '#022413',
                  fontWeight: '600'
                }}
              >
                Latest Updates
              </h2>
              <p 
                style={{ 
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '16px',
                  color: '#6B6B6B',
                  marginTop: '8px'
                }}
              >
                Stay informed with our latest news and platform updates
              </p>
            </div>

            {/* Search Notice */}
            {showSearchNotice && (
              <div className={`mb-6 p-4 rounded-lg ${hasSearchResults ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <p style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '14px',
                  color: hasSearchResults ? '#166534' : '#991b1b',
                  fontWeight: '600'
                }}>
                  {hasSearchResults 
                    ? `Found ${filteredUpdates.length} update(s) matching "${searchQuery}"`
                    : `No updates found matching "${searchQuery}"`
                  }
                </p>
              </div>
            )}

            {/* Updates Grid - 3 columns */}
            <div className="grid grid-cols-3 gap-6">
              {filteredUpdates.map((update) => (
                <UpdateCard 
                  key={update.id} 
                  {...update}
                  onSeeMore={() => {
                    if (onEventClick) {
                      onEventClick({
                        date: update.date,
                        title: update.title,
                        description: update.fullDescription || update.description,
                        image: update.image,
                        eventTime: update.eventTime,
                        eventDate: update.eventDate,
                        benefits: update.benefits,
                        location: update.location,
                        fbLink: update.fbLink,
                        type: update.type || 'update',
                      });
                    }
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeMainTab === 'reviews' && (
          <div>
            <div className="mb-6">
              <h2 
                style={{ 
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '28px',
                  color: '#022413',
                  fontWeight: '600'
                }}
              >
                Customer Reviews
              </h2>
              <p 
                style={{ 
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '16px',
                  color: '#6B6B6B',
                  marginTop: '8px'
                }}
              >
                See what our customers are saying about Choen
              </p>
            </div>

            {/* Search Notice */}
            {showSearchNotice && (
              <div className={`mb-6 p-4 rounded-lg ${hasSearchResults ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <p style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '14px',
                  color: hasSearchResults ? '#166534' : '#991b1b',
                  fontWeight: '600'
                }}>
                  {hasSearchResults 
                    ? `Found ${filteredReviews.length} review(s) matching "${searchQuery}"`
                    : `No reviews found matching "${searchQuery}"`
                  }
                </p>
              </div>
            )}

            {/* Reviews Grid */}
            <div className="grid grid-cols-4 gap-6">
              {filteredReviews.map((review) => (
                <ReviewCard key={review.id} {...review} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer 
        onNavigate={onNavigate}
        onMarketTabChange={setMarketTab}
        onAnnouncementTabChange={setActiveMainTab}
      />
    </div>
  );
}
