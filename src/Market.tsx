import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { DiscountCard } from './components/DiscountCard';
import { GameCreditCard } from './components/GameCreditCard';
import { CategorySidebar } from './components/CategorySidebar';
import { PromoCard } from './components/PromoCard';
import { Footer } from './components/Footer';
import { FilterPanel } from './components/FilterPanel';
import { Search, SlidersHorizontal } from 'lucide-react';

interface MarketProps {
  onNavigate?: (page: 'home' | 'market' | 'announcement' | 'profile') => void;
  initialTab?: string | null;
}

export default function Market({ onNavigate, initialTab }: MarketProps = {}) {
  const defaultFilters = {
    priceRange: [0, 10000],
    pointsRange: [0, 10000],
    hasExtra: null as boolean | null,
    game: [] as string[],
    isCustomizable: null as boolean | null,
    service: [] as string[],
    subscriptionPeriod: [] as string[],
  };
  
  const [activeCategory, setActiveCategory] = useState(initialTab || 'all');
  const [announcementTab, setAnnouncementTab] = useState<'events' | 'updates' | 'reviews'>('events');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);

  // Reset all filters and search when Market page is loaded (navigation from other pages)
  useEffect(() => {
    setSearchInput('');
    setSearchQuery('');
    setFilters(defaultFilters);
    setIsFilterOpen(false);
    if (initialTab) {
      setActiveCategory(initialTab);
    } else {
      setActiveCategory('all');
    }
  }, []);

  // Handle category change (don't reset search or filters)
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setIsFilterOpen(false);
  };

  // Handle search submission
  const handleSearchSubmit = () => {
    setSearchQuery(searchInput.trim());
  };

  const discounts = [
    {
      id: 'market-discount-1',
      timer: 'in 4h',
      price: '₱50 OFF',
      type: 'GAME CREDITS',
      description: 'on your first top-up (min. spend ₱300)',
      code: 'LEVELUP50',
    },
    {
      id: 'market-discount-2',
      timer: 'in 1h',
      price: '10% OFF',
      type: 'HANDCRAFTED & GIFTS',
      description: 'First purchase, all crochet items this week',
      code: 'COZY10',
    },
    {
      id: 'market-discount-3',
      timer: 'in 30m',
      price: '10% OFF',
      type: 'SERVICES - PREMIUM',
      description: 'Subscribe to 2 premium services',
      code: 'BUNDLE10',
    },
  ];

  const allProducts = [
    {
      gameImage: 'https://images.unsplash.com/photo-1677240850394-8c9cd6e0c41c?w=400',
      subtitle: 'PHASE 1 - SEPTEMBER 12',
      gameName: 'MOBILE LEGENDS',
      eventDetail: 'Sanrio Recharge Event Premium Supply',
      diamonds: 250,
      extraDiamonds: 10,
      price: '₱100',
      priceValue: 100,
      category: 'game-credits',
      game: 'Mobile Legends',
    },
    {
      gameImage: 'https://images.unsplash.com/photo-1634351395741-12be13bcdc67?w=400',
      subtitle: 'PHASE 2 - OCTOBER 5',
      gameName: 'MOBILE LEGENDS',
      eventDetail: 'Weekly Diamond Flash Sale',
      diamonds: 500,
      extraDiamonds: 25,
      price: '₱200',
      priceValue: 200,
      category: 'game-credits',
      game: 'Mobile Legends',
    },
    {
      gameImage: 'https://images.unsplash.com/photo-1654105593913-ffd2f0bf4520?w=400',
      subtitle: 'MEGA BUNDLE',
      gameName: 'MOBILE LEGENDS',
      eventDetail: 'Ultimate Diamond Package',
      diamonds: 1000,
      extraDiamonds: 100,
      price: '₱400',
      priceValue: 400,
      category: 'game-credits',
      game: 'Mobile Legends',
    },
    {
      gameImage: 'https://images.unsplash.com/photo-1618658848098-354b39109799?w=400',
      subtitle: 'STARTER PACK',
      gameName: 'MOBILE LEGENDS',
      eventDetail: 'Perfect for new players',
      diamonds: 150,
      extraDiamonds: 5,
      price: '₱50',
      priceValue: 50,
      category: 'game-credits',
      game: 'Mobile Legends',
    },
    {
      gameImage: 'https://images.unsplash.com/photo-1577271982233-94b63128d1ae?w=400',
      subtitle: 'VIP EXCLUSIVE',
      gameName: 'MOBILE LEGENDS',
      eventDetail: 'Premium Diamond Top-up',
      diamonds: 2000,
      extraDiamonds: 250,
      price: '₱800',
      priceValue: 800,
      category: 'game-credits',
      game: 'Mobile Legends',
    },
    {
      gameImage: 'https://images.unsplash.com/photo-1526790860983-456cac32b0cb?w=400',
      subtitle: 'EPISODE 10 ACT 1',
      gameName: 'VALORANT',
      eventDetail: 'Valorant Points Top-up',
      diamonds: 500,
      extraDiamonds: 25,
      price: '₱200',
      priceValue: 200,
      category: 'game-credits',
      game: 'Valorant',
    },
    {
      gameImage: 'https://images.unsplash.com/photo-1599399056366-e318f572dbba?w=400',
      subtitle: 'BATTLE PASS SPECIAL',
      gameName: 'VALORANT',
      eventDetail: 'VP Bundle for Battle Pass',
      diamonds: 1000,
      extraDiamonds: 50,
      price: '₱400',
      priceValue: 400,
      category: 'game-credits',
      game: 'Valorant',
    },
    {
      gameImage: 'https://images.unsplash.com/photo-1760604359369-45675611f750?w=400',
      subtitle: 'STARTER BUNDLE',
      gameName: 'VALORANT',
      eventDetail: 'Get started with VP',
      diamonds: 250,
      extraDiamonds: 10,
      price: '₱100',
      priceValue: 100,
      category: 'game-credits',
      game: 'Valorant',
    },
    {
      gameImage: 'https://images.unsplash.com/photo-1758410473598-ef957adbf57b?w=400',
      subtitle: 'PREMIUM PACK',
      gameName: 'VALORANT',
      eventDetail: 'Maximum VP Top-up',
      diamonds: 2000,
      extraDiamonds: 200,
      price: '₱800',
      priceValue: 800,
      category: 'game-credits',
      game: 'Valorant',
    },
    {
      gameImage: 'https://images.unsplash.com/photo-1526790860983-456cac32b0cb?w=400',
      subtitle: 'WEEKLY DEAL',
      gameName: 'VALORANT',
      eventDetail: 'Limited time VP offer',
      diamonds: 750,
      extraDiamonds: 40,
      price: '₱300',
      priceValue: 300,
      category: 'game-credits',
      game: 'Valorant',
    },
    {
      gameImage: 'https://images.unsplash.com/photo-1753370241593-9cc8c17d7434?w=400',
      subtitle: 'HANDMADE WITH LOVE',
      gameName: 'CROCHET PLUSHIES',
      eventDetail: 'Custom character designs available',
      diamonds: 0,
      extraDiamonds: 0,
      price: '₱350',
      priceValue: 350,
      category: 'crochets',
      isCustomizable: true,
    },
    {
      gameImage: 'https://images.unsplash.com/photo-1694796152188-497671aac01c?w=400',
      subtitle: 'FRESH BLOOMS',
      gameName: 'ROSE BOUQUET',
      eventDetail: 'Perfect for special occasions',
      diamonds: 0,
      extraDiamonds: 0,
      price: '₱450',
      priceValue: 450,
      category: 'flower-bouquets',
      isCustomizable: false,
    },
    {
      gameImage: 'https://images.unsplash.com/photo-1759153748331-f33556c4e69e?w=400',
      subtitle: 'COLORFUL CRAFT',
      gameName: 'FUZZY WIRE ART',
      eventDetail: 'Custom designs and sculptures',
      diamonds: 0,
      extraDiamonds: 0,
      price: '₱150',
      priceValue: 150,
      category: 'fuzzy-wire',
      isCustomizable: true,
    },
    {
      gameImage: 'https://images.unsplash.com/photo-1643208589893-ade2c3fbbcb4?w=400',
      subtitle: 'PREMIUM ACCESS',
      gameName: 'SPOTIFY PREMIUM',
      eventDetail: '12 months subscription',
      diamonds: 0,
      extraDiamonds: 0,
      price: '₱1,200',
      priceValue: 1200,
      category: 'premium-accounts',
      service: 'Spotify',
      subscriptionPeriod: 'Yearly',
    },
    {
      gameImage: 'https://images.unsplash.com/photo-1576376262099-6ec3ed655f52?w=400',
      subtitle: 'COZY COLLECTION',
      gameName: 'CROCHET SCARF',
      eventDetail: 'Warm winter accessory',
      diamonds: 0,
      extraDiamonds: 0,
      price: '₱280',
      priceValue: 280,
      category: 'crochets',
      isCustomizable: false,
    },
    {
      gameImage: 'https://images.unsplash.com/photo-1595980253829-564229c3098a?w=400',
      subtitle: 'ANNIVERSARY SPECIAL',
      gameName: 'TULIP BOUQUET',
      eventDetail: 'Premium arrangement',
      diamonds: 0,
      extraDiamonds: 0,
      price: '₱550',
      priceValue: 550,
      category: 'flower-bouquets',
      isCustomizable: true,
    },
    {
      gameImage: 'https://images.unsplash.com/photo-1761044590997-6d3860410cbe?w=400',
      subtitle: 'STREAMING',
      gameName: 'NETFLIX PREMIUM',
      eventDetail: '6 months subscription',
      diamonds: 0,
      extraDiamonds: 0,
      price: '₱800',
      priceValue: 800,
      category: 'premium-accounts',
      service: 'Netflix',
      subscriptionPeriod: 'Monthly',
    },
    {
      gameImage: 'https://images.unsplash.com/photo-1587553653033-f95a564719ca?w=400',
      subtitle: 'DECORATIVE',
      gameName: 'FUZZY WIRE FLOWERS',
      eventDetail: 'Long-lasting decoration',
      diamonds: 0,
      extraDiamonds: 0,
      price: '₱120',
      priceValue: 120,
      category: 'fuzzy-wire',
      isCustomizable: false,
    },
    {
      gameImage: 'https://images.unsplash.com/photo-1723719121605-5623e3a4f538?w=400',
      subtitle: 'GIFT SET',
      gameName: 'CROCHET BUNDLE',
      eventDetail: 'Hat, scarf, and mittens',
      diamonds: 0,
      extraDiamonds: 0,
      price: '₱750',
      priceValue: 750,
      category: 'crochets',
      isCustomizable: true,
    },
    {
      gameImage: 'https://images.unsplash.com/photo-1629386255808-c3ceb405173c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      subtitle: 'BRIGHT & CHEERFUL',
      gameName: 'SUNFLOWER BOUQUET',
      eventDetail: 'Fresh seasonal blooms',
      diamonds: 0,
      extraDiamonds: 0,
      price: '₱380',
      priceValue: 380,
      category: 'flower-bouquets',
      isCustomizable: false,
    },
    {
      gameImage: 'https://images.unsplash.com/photo-1694620132482-08c9c4fd2fd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      subtitle: 'ELEGANT COLLECTION',
      gameName: 'LILY BOUQUET',
      eventDetail: 'Premium white lilies',
      diamonds: 0,
      extraDiamonds: 0,
      price: '₱650',
      priceValue: 650,
      category: 'flower-bouquets',
      isCustomizable: true,
    },
    {
      gameImage: 'https://images.unsplash.com/photo-1642728265490-2ea6c3320880?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      subtitle: 'SIGNATURE BLEND',
      gameName: 'MIXED BOUQUET',
      eventDetail: 'Colorful seasonal mix',
      diamonds: 0,
      extraDiamonds: 0,
      price: '₱500',
      priceValue: 500,
      category: 'flower-bouquets',
      isCustomizable: true,
    },
    {
      gameImage: 'https://images.unsplash.com/photo-1703893679650-d3b72e503d96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      subtitle: 'COZY COMFORT',
      gameName: 'CROCHET BLANKET',
      eventDetail: 'Handmade throw blanket',
      diamonds: 0,
      extraDiamonds: 0,
      price: '₱950',
      priceValue: 950,
      category: 'crochets',
      isCustomizable: true,
    },
    // Additional Premium Accounts
    {
      gameImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      subtitle: 'DESIGN PRO',
      gameName: 'CANVA PRO',
      eventDetail: '1 month subscription',
      diamonds: 0,
      extraDiamonds: 0,
      price: '₱250',
      priceValue: 250,
      category: 'premium-accounts',
      service: 'Canva',
      subscriptionPeriod: 'Monthly',
    },
    {
      gameImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      subtitle: 'VIDEO EDITING',
      gameName: 'CAPCUT PRO',
      eventDetail: '3 months subscription',
      diamonds: 0,
      extraDiamonds: 0,
      price: '₱450',
      priceValue: 450,
      category: 'premium-accounts',
      service: 'CapCut',
      subscriptionPeriod: 'Monthly',
    },
    {
      gameImage: 'https://images.unsplash.com/photo-1541877944-ac82a091518a?w=400',
      subtitle: 'AD-FREE VIDEOS',
      gameName: 'YOUTUBE PREMIUM',
      eventDetail: '1 week subscription',
      diamonds: 0,
      extraDiamonds: 0,
      price: '₱80',
      priceValue: 80,
      category: 'premium-accounts',
      service: 'YouTube Premium',
      subscriptionPeriod: 'Weekly',
    },
    {
      gameImage: 'https://images.unsplash.com/photo-1643208589894-d12242290d07?w=400',
      subtitle: 'FAMILY ENTERTAINMENT',
      gameName: 'DISNEY+ PREMIUM',
      eventDetail: '1 year subscription',
      diamonds: 0,
      extraDiamonds: 0,
      price: '₱1,500',
      priceValue: 1500,
      category: 'premium-accounts',
      service: 'Disney+',
      subscriptionPeriod: 'Yearly',
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

  const filteredProducts = allProducts.filter((product: any) => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      product.gameName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.eventDetail.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Price filter
    const matchesPrice = product.priceValue >= filters.priceRange[0] && product.priceValue <= filters.priceRange[1];
    
    // Game Credits specific filters
    if (product.category === 'game-credits') {
      const matchesPoints = product.diamonds >= filters.pointsRange[0] && product.diamonds <= filters.pointsRange[1];
      const matchesExtra = filters.hasExtra === null || (filters.hasExtra === true && product.extraDiamonds > 0);
      const matchesGame = filters.game.length === 0 || filters.game.includes(product.game);
      return matchesCategory && matchesSearch && matchesPrice && matchesPoints && matchesExtra && matchesGame;
    }
    
    // Handcraft filters (flower-bouquets, crochets, fuzzy-wire)
    if (['flower-bouquets', 'crochets', 'fuzzy-wire'].includes(product.category)) {
      const matchesCustomizable = filters.isCustomizable === null || (filters.isCustomizable === true && product.isCustomizable === true);
      return matchesCategory && matchesSearch && matchesPrice && matchesCustomizable;
    }
    
    // Premium accounts filters
    if (product.category === 'premium-accounts') {
      const matchesService = filters.service.length === 0 || filters.service.includes(product.service);
      const matchesPeriod = filters.subscriptionPeriod.length === 0 || filters.subscriptionPeriod.includes(product.subscriptionPeriod);
      return matchesCategory && matchesSearch && matchesPrice && matchesService && matchesPeriod;
    }
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage="market" onNavigate={onNavigate} eventsData={[]} />
      
      {/* Header with Background Image and Discount Cards */}
      <header 
        className="relative py-12"
        style={{
          backgroundImage: `linear-gradient(rgba(2, 36, 19, 0.7), rgba(2, 36, 19, 0.7)), url(https://images.unsplash.com/photo-1759692788195-b95da1f4a04c?w=1600)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-[1440px] mx-auto px-8">
          <h1 
            className="text-center mb-8"
            style={{ 
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '40px',
              color: 'white',
              letterSpacing: '2.8px',
            }}
          >
            DISCOUNTS FOR YOU!
          </h1>
          <div className="flex justify-center gap-6 flex-wrap">
            {discounts.map((discount, index) => (
              <DiscountCard key={index} {...discount} />
            ))}
          </div>
        </div>
      </header>

      {/* Marquee */}
      <div className="bg-[#3E996C] py-4 overflow-hidden">
        <div className="marquee-container">
          <div className="marquee-content">
            <div className="marquee-group">
              <span className="marquee-item" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '24px', fontWeight: '500' }}>
                DIGITAL COMMISSIONS
              </span>
              <span className="marquee-star">★</span>
              <span className="marquee-item" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '24px', fontWeight: '500' }}>
                GAME CREDITS
              </span>
              <span className="marquee-star">★</span>
              <span className="marquee-item" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '24px', fontWeight: '500' }}>
                CROCHET
              </span>
              <span className="marquee-star">★</span>
              <span className="marquee-item" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '24px', fontWeight: '500' }}>
                BOUQUETTES
              </span>
              <span className="marquee-star">★</span>
            </div>
            <div className="marquee-group" aria-hidden="true">
              <span className="marquee-item" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '24px', fontWeight: '500' }}>
                DIGITAL COMMISSIONS
              </span>
              <span className="marquee-star">★</span>
              <span className="marquee-item" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '24px', fontWeight: '500' }}>
                GAME CREDITS
              </span>
              <span className="marquee-star">★</span>
              <span className="marquee-item" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '24px', fontWeight: '500' }}>
                CROCHET
              </span>
              <span className="marquee-star">★</span>
              <span className="marquee-item" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '24px', fontWeight: '500' }}>
                BOUQUETTES
              </span>
              <span className="marquee-star">★</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .marquee-container {
          white-space: nowrap;
          overflow: hidden;
          display: flex;
        }

        .marquee-content {
          display: flex;
          animation: marquee 30s linear infinite;
        }

        .marquee-group {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .marquee-item {
          color: white;
          margin: 0 30px;
        }

        .marquee-star {
          color: white;
          font-size: 20px;
          margin: 0 30px;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      {/* Market Section */}
      <section className="py-12 bg-white">
        <div className="max-w-[1440px] mx-auto px-8">
          {/* Search and Filter */}
          <div className="flex gap-4 mb-8 justify-end items-center">
            <div className="relative w-[808px]">
              <input
                type="text"
                placeholder="Search for a game or products"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchSubmit();
                  }
                }}
                className="w-full h-[58px] px-6 pr-12 rounded-md border-2 border-[#363636]"
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '16px',
                  color: '#363636',
                }}
              />
              <button
                onClick={handleSearchSubmit}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#363636] hover:text-[#3E996C] transition-colors cursor-pointer"
              >
                <Search size={28} />
              </button>
            </div>
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="w-[72px] h-[72px] flex items-center justify-center bg-white border-2 border-[#6B6B6B] rounded-md hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal size={36} color="#6B6B6B" />
            </button>
          </div>

          {/* Search Results Notice */}
          {searchQuery && (
            <div className="mb-6">
              <p style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: '14px',
                color: filteredProducts.length > 0 ? '#166534' : '#991b1b',
                fontWeight: '600'
              }}>
                {filteredProducts.length > 0 
                  ? `Found ${filteredProducts.length} item(s) matching "${searchQuery}"`
                  : `No items found matching "${searchQuery}"`
                }
              </p>
            </div>
          )}

          {/* Category Sidebar and Products Grid */}
          <div className="flex gap-8">
            {/* Left Sidebar */}
            <CategorySidebar 
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />

            {/* Products Grid */}
            <div className="flex-1">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-4 gap-x-6 gap-y-8">
                  {filteredProducts.map((product, index) => (
                    <GameCreditCard key={index} {...product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p 
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: '24px',
                      color: '#6B6B6B',
                    }}
                  >
                    No products found. Try a different search or category.
                  </p>
                </div>
              )}
              
              {filteredProducts.length > 0 && filteredProducts.length < 16 && (
                <div className="text-center mt-12">
                  <p 
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: '24px',
                      color: '#000000',
                    }}
                  >
                    More is coming Soon!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Promos Section */}
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

      <Footer 
        onNavigate={onNavigate}
        onMarketTabChange={setActiveCategory}
        onAnnouncementTabChange={setAnnouncementTab}
      />
      
      <FilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        activeCategory={activeCategory}
        filters={filters}
        onFilterChange={setFilters}
        defaultFilters={defaultFilters}
      />
    </div>
  );
}
