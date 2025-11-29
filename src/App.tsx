/**
 * APP.TSX - Main Application Component (Homepage)
 * 
 * This is the entry point and homepage of the Choen Digital Marketplace.
 * It handles:
 * - Page routing (Home, Market, Announcement, Profile)
 * - Homepage layout with 9 main sections
 * - Search functionality with smart routing
 * - Event modal management
 * - Data aggregation from multiple sources
 * 
 * Design: 1440x1024 screen, Tailwind CSS, Color scheme: #022413, #3E996C, #FFFFFF
 */

import React, { useState } from 'react';
// Context and State Management
import { AuthProvider } from './components/AuthContext';
// Navigation and Layout Components
import { Navigation } from './components/Navigation';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
// Homepage Section Components
import { DiscountCard } from './components/DiscountCard';
import { GameCreditCard } from './components/GameCreditCard';
import { CraftServiceCard } from './components/CraftServiceCard';
import { NewsCard } from './components/NewsCard';
import { PromoCard } from './components/PromoCard';
import { ReviewCard } from './components/ReviewCard';
import { WhyChoenFeature } from './components/WhyChoenFeature';
// Modal Components
import { DetailedEventModal } from './components/DetailedEventModal';
// Page Components
import Market from './Market';
import Announcement from './Announcement';
import Profile from './Profile';
// Data Imports
import { allEventsData } from './data/eventsData';
// Asset Imports (Figma)
import headerImage from 'figma:asset/5af248d214c36ad6b9b375f57477172a9c318d86.png';
import choenLogo from 'figma:asset/f56adaeff423ccb2afdbcfb34eb530c0dfff4cda.png';
import sectionBg from 'figma:asset/1cad893b5eb919e08d43711a7b5d3c2144eec1b8.png';
// Icons
import { ShoppingBag, Zap, Palette, Gift, Gamepad2, Headset } from 'lucide-react';

/**
 * AppContent Component
 * Main content wrapper that manages page state and routing
 */
function AppContent() {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  
  // Current page state - controls which page component is rendered
  const [currentPage, setCurrentPage] = useState<'home' | 'market' | 'announcement' | 'profile'>('home');
  
  // Market tab state - used when navigating to market with specific category
  const [marketTab, setMarketTab] = useState<string | null>(null);
  
  // Event modal state - controls which event details are shown
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  
  // Announcement tab state - persists selected tab (events/updates/reviews)
  const [announcementTab, setAnnouncementTab] = useState<'events' | 'updates' | 'reviews'>('events');

  // ============================================================================
  // NAVIGATION HANDLERS
  // ============================================================================
  
  /**
   * handlePageNavigation
   * Wrapper function for page navigation that:
   * 1. Resets announcement tab when leaving announcement page
   * 2. Updates current page state
   * 3. Scrolls to top of page smoothly
   */
  const handlePageNavigation = (page: 'home' | 'market' | 'announcement' | 'profile') => {
    // Reset announcement tab to 'events' when navigating away
    if (page !== 'announcement') {
      setAnnouncementTab('events');
    }
    setCurrentPage(page);
    // Smooth scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * handleSearch
   * Smart search function that routes users to appropriate market categories
   * Based on search keywords:
   * - Game names → Game Credits tab
   * - Product types → Respective category tabs
   * - Premium services → Premium Accounts tab
   * - Default → All Products
   * 
   * @param query - User's search input string
   */
  const handleSearch = (query: string) => {
    const searchTerm = query.toLowerCase().trim();
    
    // Map search keywords to market category tabs
    if (searchTerm.includes('mobile legends') || searchTerm.includes('ml') || searchTerm.includes('valorant')) {
      // Game-related searches → Game Credits
      setMarketTab('game-credits');
      handlePageNavigation('market');
    } else if (searchTerm.includes('flower') || searchTerm.includes('bouquet')) {
      // Flower-related searches → Flower Bouquets
      setMarketTab('flower-bouquets');
      handlePageNavigation('market');
    } else if (searchTerm.includes('crochet')) {
      // Crochet-related searches → Crochets
      setMarketTab('crochets');
      handlePageNavigation('market');
    } else if (searchTerm.includes('fuzzy') || searchTerm.includes('wire')) {
      // Fuzzy wire searches → Fuzzy Wire
      setMarketTab('fuzzy-wire');
      handlePageNavigation('market');
    } else if (searchTerm.includes('spotify') || searchTerm.includes('netflix') || 
               searchTerm.includes('canva') || searchTerm.includes('capcut') || 
               searchTerm.includes('youtube') || searchTerm.includes('premium')) {
      // Premium service searches → Premium Accounts
      setMarketTab('premium-accounts');
      handlePageNavigation('market');
    } else {
      // No match found → Show all products
      setMarketTab('all');
      handlePageNavigation('market');
    }
  };

  // ============================================================================
  // DATA DECLARATIONS
  // ============================================================================
  // All data arrays must be declared before conditional returns
  // This ensures they're available for homepage rendering

  /**
   * DISCOUNTS DATA
   * Featured discount codes displayed on homepage
   * Each discount includes:
   * - id: Unique identifier
   * - code: Redeemable promo code (e.g., LEVELUP50)
   * - discountValue: Amount or percentage off
   * - discountType: 'fixed' (₱ amount) or 'percentage' (%)
   * - applicableCategories: Which product categories can use this code
   * - minSpend: Minimum purchase amount required
   */
  const discounts = [
    {
      id: 'discount-1',
      timer: 'in 4h',
      price: '₱50 OFF',
      type: 'GAME CREDITS',
      description: 'For first-time users',
      code: 'LEVELUP50',
      minSpend: 300,
      discountValue: 50,
      discountType: 'fixed' as const,
      applicableCategories: ['game-credits']
    },
    {
      id: 'discount-2',
      timer: 'in 1h',
      price: '10% OFF',
      type: 'HANDCRAFTED & GIFTS',
      description: 'For first-time users',
      code: 'COZY10',
      minSpend: 0,
      discountValue: 10,
      discountType: 'percentage' as const,
      applicableCategories: ['flower-bouquets', 'crochets', 'fuzzy-wire']
    },
    {
      id: 'discount-3',
      timer: 'in 30m',
      price: '10% OFF',
      type: 'SERVICES - PREMIUM',
      description: 'For first-time users',
      code: 'BUNDLE10',
      minSpend: 0,
      discountValue: 10,
      discountType: 'percentage' as const,
      applicableCategories: ['premium-accounts']
    },
  ];

  const gameCredits = [
    {
      gameImage: 'https://images.unsplash.com/photo-1761395013890-49090392ff0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBsZWdlbmRzJTIwZ2FtZXxlbnwxfHx8fDE3NjQzMTE4NzB8MA&ixlib=rb-4.1.0&q=80&w=400',
      subtitle: 'PHASE 1 - SEPTEMBER 12',
      gameName: 'MOBILE LEGENDS',
      eventDetail: 'Sanrio Recharge Event Premium Supply',
      diamonds: 250,
      extraDiamonds: 10,
      price: '₱100',
    },
    {
      gameImage: 'https://images.unsplash.com/photo-1757774636742-0a5dc7e5c07a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcHMlMjBzaG9vdGVyJTIwZ2FtZXxlbnwxfHx8fDE3NjQzMzUwMDV8MA&ixlib=rb-4.1.0&q=80&w=400',
      subtitle: 'EPISODE 10 ACT 1',
      gameName: 'VALORANT',
      eventDetail: 'Valorant Points Premium Pack',
      diamonds: 475,
      extraDiamonds: 25,
      price: '₱1,233',
    },
    {
      gameImage: 'https://images.unsplash.com/photo-1761395013890-49090392ff0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBsZWdlbmRzJTIwZ2FtZXxlbnwxfHx8fDE3NjQzMTE4NzB8MA&ixlib=rb-4.1.0&q=80&w=400&sat=-50',
      subtitle: 'PHASE 2 - OCTOBER 15',
      gameName: 'MOBILE LEGENDS',
      eventDetail: 'Halloween Special Diamonds',
      diamonds: 500,
      extraDiamonds: 10,
      price: '₱150',
    },
    {
      gameImage: 'https://images.unsplash.com/photo-1757774636742-0a5dc7e5c07a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcHMlMjBzaG9vdGVyJTIwZ2FtZXxlbnwxfHx8fDE3NjQzMzUwMDV8MA&ixlib=rb-4.1.0&q=80&w=400&hue=20',
      subtitle: 'LIMITED OFFER',
      gameName: 'VALORANT',
      eventDetail: 'Battle Pass Bundle',
      diamonds: 1000,
      extraDiamonds: 50,
      price: '₱2,500',
    },
    {
      gameImage: 'https://images.unsplash.com/photo-1751441079947-d8057dccf0c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW5zaGluJTIwaW1wYWN0JTIwYW5pbWV8ZW58MXx8fHwxNzY0NDA0MjI1fDA&ixlib=rb-4.1.0&q=80&w=400',
      subtitle: 'NEW SEASON',
      gameName: 'MOBILE LEGENDS',
      eventDetail: 'Season Starter Pack',
      diamonds: 150,
      extraDiamonds: 5,
      price: '₱75',
    },
    {
      gameImage: 'https://images.unsplash.com/photo-1761395013890-49090392ff0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBsZWdlbmRzJTIwZ2FtZXxlbnwxfHx8fDE3NjQzMTE4NzB8MA&ixlib=rb-4.1.0&q=80&w=400&contrast=10',
      subtitle: 'PHASE 1 - SEPTEMBER 12',
      gameName: 'MOBILE LEGENDS',
      eventDetail: 'Sanrio Recharge Event Premium Supply',
      diamonds: 250,
      extraDiamonds: 10,
      price: '₱100',
    },
    {
      gameImage: 'https://images.unsplash.com/photo-1757774636742-0a5dc7e5c07a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcHMlMjBzaG9vdGVyJTIwZ2FtZXxlbnwxfHx8fDE3NjQzMzUwMDV8MA&ixlib=rb-4.1.0&q=80&w=400&brightness=10',
      subtitle: 'EPISODE 10 ACT 1',
      gameName: 'VALORANT',
      eventDetail: 'Valorant Points Premium Pack',
      diamonds: 350,
      extraDiamonds: 15,
      price: '₱150',
    },
    {
      gameImage: 'https://images.unsplash.com/photo-1761395013890-49090392ff0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBsZWdlbmRzJTIwZ2FtZXxlbnwxfHx8fDE3NjQzMTE4NzB8MA&ixlib=rb-4.1.0&q=80&w=400&hue=15',
      subtitle: 'MEGA DEAL',
      gameName: 'MOBILE LEGENDS',
      eventDetail: 'Diamond Mega Pack',
      diamonds: 600,
      extraDiamonds: 60,
      price: '₱300',
    },
    {
      gameImage: 'https://images.unsplash.com/photo-1757774636742-0a5dc7e5c07a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcHMlMjBzaG9vdGVyJTIwZ2FtZXxlbnwxfHx8fDE3NjQzMzUwMDV8MA&ixlib=rb-4.1.0&q=80&w=400&sat=20',
      subtitle: 'STARTER PACK',
      gameName: 'VALORANT',
      eventDetail: 'Beginner Bundle',
      diamonds: 125,
      extraDiamonds: 5,
      price: '₱1,000',
    },
    {
      gameImage: 'https://images.unsplash.com/photo-1751441079947-d8057dccf0c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW5zaGluJTIwaW1wYWN0JTIwYW5pbWV8ZW58MXx8fHwxNzY0NDA0MjI1fDA&ixlib=rb-4.1.0&q=80&w=400&hue=20',
      subtitle: 'WEEKLY SPECIAL',
      gameName: 'MOBILE LEGENDS',
      eventDetail: 'Weekly Diamond Boost',
      diamonds: 400,
      extraDiamonds: 25,
      price: '₱200',
    },
  ];

  const craftsServices = [
    {
      image: 'https://images.unsplash.com/photo-1572454591674-2739f30d8c40?w=400',
      title: 'FLOWER BOUQUETS',
      productDescription: 'Fresh blooms for every occasion',
      description: 'Craft & service restrictions',
      backgroundColor: '#481D37',
      tab: 'flower-bouquets',
    },
    {
      image: 'https://images.unsplash.com/photo-1612208141706-2fbd2d45a143?w=400',
      title: 'CROCHET & FUZZY WIRE',
      productDescription: 'Handmade crafts with love',
      description: 'Craft & service restrictions',
      backgroundColor: '#4B2651',
      tab: 'crochets',
    },
    {
      image: 'https://images.unsplash.com/photo-1542730251-bacb0e880133?w=400',
      title: 'PREMIUM ACCOUNTS',
      productDescription: 'Unlock premium streaming & tools',
      description: 'Craft & service restrictions',
      backgroundColor: '#022413',
      tab: 'premium-accounts',
    },
  ];

  const news = [
    {
      date: '11/05/2025',
      title: 'FLASH SALE ALERT!',
      description: 'Get up to 50% OFF on all Mobile Legends diamonds this weekend! Stock up now and level up faster. Limited time only!',
      isNew: true,
      image: 'https://images.unsplash.com/photo-1712331676372-2fc48f449c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      fullDescription: 'Attention gamers! We\'re offering an incredible flash sale this weekend with up to 50% OFF on all Mobile Legends diamond packages. This is your chance to stock up on diamonds at unbeatable prices and level up faster than ever before. Don\'t miss this limited-time opportunity!',
      eventDate: 'November 5-7, 2025',
      eventTime: 'All day',
      benefits: [
        'Up to 50% discount on all ML diamond packages',
        'Instant delivery after purchase',
        'Valid for all account types',
        'Stack with existing promos',
        'No purchase limit'
      ],
      fbLink: 'https://facebook.com/choen',
      type: 'update' as const,
    },
    {
      date: '11/08/2025',
      title: 'NEW CROCHET COLLECTION',
      description: 'Check out our handmade crochet plushies and accessories! Perfect gifts for your loved ones. Customizable colors and designs available!',
      isNew: true,
      image: 'https://images.unsplash.com/photo-1728393287642-13bee7126ae8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      fullDescription: 'We\'re excited to unveil our brand new handmade crochet collection! Each piece is carefully crafted with love, featuring adorable plushies and cozy accessories. These make perfect gifts for any occasion, and we offer full customization options to match your preferences.',
      eventDate: 'November 8, 2025 onwards',
      eventTime: 'Available now',
      benefits: [
        'Handmade with premium yarn materials',
        'Fully customizable colors and designs',
        'Perfect for gifts and decorations',
        'Fast production turnaround',
        'Care instructions included'
      ],
      fbLink: 'https://facebook.com/choen',
      type: 'update' as const,
    },
    {
      date: '11/10/2025',
      title: 'VALORANT BUNDLE DROP',
      description: 'Premium Valorant Points bundles now available! Get bonus VP with every purchase. Exclusive deals for our Choen community!',
      isNew: true,
      image: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      fullDescription: 'Level up your Valorant game with our premium VP bundles! We\'re now offering exclusive bundles with bonus Valorant Points. Every purchase comes with extra VP, giving you more value for your money. These deals are exclusively available to our Choen community members.',
      eventDate: 'November 10, 2025 onwards',
      eventTime: 'Available now',
      benefits: [
        'Bonus VP with every bundle purchase',
        'Instant delivery to your account',
        'Exclusive Choen community pricing',
        'All regions supported',
        '24/7 customer support'
      ],
      fbLink: 'https://facebook.com/choen',
      type: 'update' as const,
    },
    {
      date: '11/15/2025',
      title: 'CHOEN HOLIDAY GIVEAWAY',
      description: 'Join our biggest giveaway event! Win game credits, premium accounts, and handcrafted items. Multiple winners!',
      isNew: true,
      image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      fullDescription: 'Celebrate the holiday season with Choen\'s biggest giveaway event! We\'re giving away amazing prizes including game credits, premium streaming accounts, and beautiful handcrafted items. Multiple winners will be selected, so your chances of winning are higher than ever!',
      eventDate: 'November 15-30, 2025',
      eventTime: '12:00 PM - 8:00 PM PHT',
      location: 'Online (via Facebook Live)',
      benefits: [
        'Multiple prize categories',
        'Easy entry mechanics',
        'Daily winner announcements',
        'Bonus entries for sharing',
        'Instant prize delivery for winners'
      ],
      fbLink: 'https://facebook.com/choen',
      type: 'event' as const,
    },
  ];

  const promos = [
    {
      title: 'GAME CREDITS BUNDLE',
      features: [
        'Get 3 games credits for the price of 2',
        'Free delivery within Metro Manila',
        'Instant digital code delivery',
        'Valid for ML, Valorant, and Genshin',
        'Save up to ₱500 on this bundle',
      ],
      image: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300',
    },
    {
      title: 'BOUQUET + CROCHET COMBO',
      features: [
        'Handcrafted bouquet with custom crochet',
        'Same-day delivery available',
        'Fully customizable colors and designs',
        'Perfect for gifts and special occasions',
        'Includes personalized greeting card',
      ],
      image: 'https://images.unsplash.com/photo-1652346107876-58d7354ce9b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300',
    },
    {
      title: 'PREMIUM SERVICES PACK',
      features: [
        'Subscribe to 2 premium accounts',
        '10% discount on all services',
        'Priority customer support 24/7',
        'Monthly exclusive deals and promos',
        'Free account setup and assistance',
      ],
      image: 'https://images.unsplash.com/photo-1728393287642-13bee7126ae8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300',
    },
  ];

  const reviews = [
    {
      name: 'Hannah Elisha Delos Santos',
      comment: 'Choen\'s service is truly fast and remarkable, its my first time buying one of their game credit offers for MLBB. The discounted price is better than any other external sites that I have used. Their transactions are trustworthy and credible. Moreover, I plan to buy more of their products in the future due to this experience. If this website is to be rated out 5 then I give it a perfect 5 out 5!!!',
      rating: 5,
      profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      reviewLink: 'https://web.facebook.com/choen.lobby/reviews',
    },
    {
      name: 'Pipoy Bagtas',
      comment: 'Very accomodating to first-time buyers and if ever hindi alam how to proceed the seller guides on what to do. Reliable naman po and all is well. Very trustworthy po, yun lang po~~',
      rating: 5,
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      reviewLink: 'https://web.facebook.com/choen.lobby/reviews',
    },
    {
      name: 'Gwyneth Garao',
      comment: 'This is the second time my boyfriend ordered flowers from Choen, and they never fail! The arrangements are always pretty, so well done, and delivered on time. Highly recommended for anyone who wants to surprise their loved one with something special!',
      rating: 5,
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      reviewLink: 'https://web.facebook.com/choen.lobby/reviews',
    },
    {
      name: 'Jose Marquez',
      comment: 'First time ko bumili ng discounted dias sa ML and mura talaga sha compare mo sa mismong app kapa bumili ang mahal dito mura lang.',
      rating: 5,
      profileImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      reviewLink: 'https://web.facebook.com/choen.lobby/reviews',
    },
    {
      name: 'Clyde Dolotallas',
      comment: 'I highly recommended Choen talaga, mabilis ang transactions and maayos ang service nila sa kanilang mga customers. Understanding din siya/sila when it comes sa mga concerns mo and always willing to answer some clarifications and questions mo. Ang dami ko tanong sa seller actually dahil bihira lang talaga kasi ako bumili online but i\'m happy and thankful how the seller assist me properly : D',
      rating: 5,
      profileImage: 'https://images.unsplash.com/photo-1717887923436-58b1cf5627d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      reviewLink: 'https://web.facebook.com/choen.lobby/reviews',
    },
  ];

  const whyChoenFeatures = [
    { 
      icon: ShoppingBag, 
      title: 'Affordable & Diverse Products', 
      description: 'We offer discounted game credits, handmade gifts, and premium accounts—all at budget-friendly prices.' 
    },
    { 
      icon: Zap, 
      title: 'Instant & Hassle-Free Transactions', 
      description: 'Quick and easy purchases for game credits and services, so you can enjoy your items without delays.' 
    },
    { 
      icon: Palette, 
      title: 'Customization & Personalization', 
      description: 'From bouquets to crochet crafts, we tailor products to your preferences for special occasions and unique gifts.' 
    },
    { 
      icon: Gift, 
      title: 'Exclusive Promos & Loyalty Rewards', 
      description: 'Enjoy seasonal discounts, giveaways, and loyalty perks for returning customers.' 
    },
    { 
      icon: Gamepad2, 
      title: 'Gaming & Event Integration', 
      description: 'Stay updated with the latest gaming trends and enjoy themed bundles, tournament streams, and collaborations.' 
    },
    { 
      icon: Headset, 
      title: 'Responsive Customer Support', 
      description: 'Our team is ready to assist with inquiries, special requests, and concerns—fast and friendly service guaranteed.' 
    },
  ];

  // If market page is selected, render the Market component
  if (currentPage === 'market') {
    return <Market onNavigate={handlePageNavigation} initialTab={marketTab} />;
  }

  // If announcement page is selected, render the Announcement component
  if (currentPage === 'announcement') {
    return (
      <>
        <Announcement 
          onNavigate={handlePageNavigation} 
          initialTab={announcementTab}
          newsData={news}
          onEventClick={(event) => {
            setSelectedEvent(event);
            setIsEventModalOpen(true);
          }}
        />
        <DetailedEventModal
          isOpen={isEventModalOpen}
          onClose={() => setIsEventModalOpen(false)}
          event={selectedEvent}
        />
      </>
    );
  }

  // If profile page is selected, render the Profile component
  if (currentPage === 'profile') {
    // Combine homepage news events with all shared events
    const newsEvents = news
      .filter(item => item.type === 'event')
      .map(item => ({
        ...item,
        id: `home-${item.date}`,
        status: 'current' as const,
        endDate: item.eventDate || item.date,
      }));
    const allEvents = [
      ...newsEvents,
      ...allEventsData
    ];
    return <Profile onNavigate={handlePageNavigation} eventsData={allEvents} />;
  }

  const ongoingEvents = news
    .filter(item => item.type === 'event')
    .map(item => ({
      ...item,
      status: 'ONGOING' as const,
      shortDescription: item.description
    }));

  return (
    <div className="min-h-screen bg-white">
      {/* Section 1: Header */}
      <Navigation 
        currentPage={currentPage} 
        onNavigate={handlePageNavigation}
        eventsData={ongoingEvents}
      />
      <Header backgroundImage={headerImage} onSearch={handleSearch} />

      {/* Section 2: Discount */}
      <section className="pt-12 pb-8 bg-white">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="flex justify-center gap-6 flex-wrap">
            {discounts.map((discount, index) => (
              <DiscountCard key={index} {...discount} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Popular Game Credits */}
      <section id="market" className="pt-8 pb-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-8">
          <h2 
            style={{ fontFamily: "'Sedan SC', serif", fontSize: '48px', color: '#363636', marginBottom: '48px' }}
          >
            Popular Game Credits
          </h2>
          <div className="grid grid-cols-5 gap-6">
            {gameCredits.map((game, index) => (
              <GameCreditCard key={index} {...game} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Best Crafts & Services */}
      <section className="py-16 relative" style={{ backgroundColor: '#022413' }}>
        <div 
          className="absolute inset-0 opacity-20"
          style={{ 
            backgroundImage: `url(${sectionBg})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            pointerEvents: 'none'
          }}
        ></div>
        <div className="max-w-[1440px] mx-auto px-8 relative z-10">
          <h2 
            style={{ fontFamily: "'Sedan SC', serif", fontSize: '48px', color: 'white', marginBottom: '48px' }}
          >
            Best Crafts & Services
          </h2>
          <div className="grid grid-cols-3 gap-8">
            {craftsServices.map((item, index) => (
              <CraftServiceCard 
                key={index} 
                {...item} 
                onSeeMore={() => {
                  setMarketTab(item.tab);
                  handlePageNavigation('market');
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: See What's New */}
      <section id="announcement" className="py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-8">
          <h2 
            style={{ fontFamily: "'Sedan SC', serif", fontSize: '48px', color: '#363636', marginBottom: '48px' }}
          >
            See What's New
          </h2>
          <div className="space-y-4">
            {news.map((item, index) => (
              <NewsCard 
                key={index} 
                {...item} 
                onSeeMore={() => {
                  setSelectedEvent({
                    date: item.date,
                    title: item.title,
                    description: item.fullDescription || item.description,
                    image: item.image,
                    eventTime: item.eventTime,
                    eventDate: item.eventDate,
                    benefits: item.benefits,
                    location: item.location,
                    fbLink: item.fbLink,
                    type: item.type,
                  });
                  setIsEventModalOpen(true);
                }}
              />
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={() => {
                setAnnouncementTab('updates');
                handlePageNavigation('announcement');
              }}
              className="bg-[#292B2A] text-white px-8 py-3 rounded-[200px] hover:bg-[#3E996C] transition-colors"
              style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '16px', letterSpacing: '1.6px' }}
            >
              SEE MORE
            </button>
          </div>
        </div>
      </section>

      {/* Section 6: Enjoy our Promos */}
      <section className="py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-8 text-center">
          <h2 
            style={{ fontFamily: "'Sedan SC', serif", fontSize: '48px', color: '#363636', marginBottom: '48px' }}
          >
            Enjoy Our Promos!
          </h2>
          <div className="grid grid-cols-3 gap-8 pt-8">
            {promos.map((promo, index) => (
              <PromoCard key={index} {...promo} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Top Reviews */}
      <section className="py-16 relative" style={{ backgroundColor: '#022413' }}>
        <div 
          className="absolute inset-0 opacity-20"
          style={{ 
            backgroundImage: `url(${sectionBg})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            pointerEvents: 'none'
          }}
        ></div>
        <div className="max-w-[1440px] mx-auto px-8 relative z-10">
          <h2 
            style={{ fontFamily: "'Sedan SC', serif", fontSize: '48px', color: 'white', marginBottom: '48px' }}
          >
            Top Reviews
          </h2>
          <div className="grid grid-cols-4 gap-6">
            {reviews.slice(0, 4).map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Why Choen */}
      <section className="py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-8">
          {/* Logo Circle */}
          <div className="flex justify-center mb-4">
            <div 
              className="rounded-full bg-[#022413] flex items-center justify-center overflow-hidden"
              style={{ width: '200px', height: '200px' }}
            >
              <img 
                src={choenLogo} 
                alt="Choen Logo" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <h2 
            style={{ fontFamily: "'Sedan SC', serif", fontSize: '64px', color: '#022413', marginBottom: '24px', textAlign: 'center' }}
          >
            Why Choen?
          </h2>
          <div 
            className="mb-12 text-center"
            style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '20px', color: '#022413', maxWidth: '1200px', margin: '0 auto 48px' }}
          >
            The main objective of Choen is to offer a one-stop shop dedicated in delivering accessible and creative services on both digital and handcrafted items. We provide diverse range of offerings designed to meet everyday needs and special occasions with care, affordability, and personal preference.
          </div>
          <div className="grid grid-cols-2 gap-x-16 gap-y-10 max-w-[1200px] mx-auto">
            {whyChoenFeatures.map((feature, index) => (
              <WhyChoenFeature key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: Footer */}
      <Footer 
        onNavigate={handlePageNavigation}
        onMarketTabChange={setMarketTab}
        onAnnouncementTabChange={setAnnouncementTab}
      />

      {/* Event Detail Modal */}
      <DetailedEventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        event={selectedEvent}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
