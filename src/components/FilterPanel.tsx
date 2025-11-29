import React from 'react';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory: string;
  filters: {
    priceRange: [number, number];
    pointsRange: [number, number];
    hasExtra: boolean | null;
    game: string[];
    isCustomizable: boolean | null;
    service: string[];
    subscriptionPeriod: string[];
  };
  onFilterChange: (filters: any) => void;
  defaultFilters: {
    priceRange: [number, number];
    pointsRange: [number, number];
    hasExtra: boolean | null;
    game: string[];
    isCustomizable: boolean | null;
    service: string[];
    subscriptionPeriod: string[];
  };
}

export function FilterPanel({ isOpen, onClose, activeCategory, filters, onFilterChange, defaultFilters }: FilterPanelProps) {
  if (!isOpen) return null;

  const updateFilter = (key: string, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const toggleArrayValue = (key: string, value: string) => {
    const currentArray = filters[key as keyof typeof filters] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(v => v !== value)
      : [...currentArray, value];
    updateFilter(key, newArray);
  };

  const renderGameCreditsFilters = () => (
    <>
      {/* Price Range */}
      <div className="mb-6">
        <label 
          className="block mb-3"
          style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '18px', color: '#000' }}
        >
          Price Range
        </label>
        <div className="flex gap-4 items-center">
          <input
            type="number"
            placeholder="Min"
            value={filters.priceRange[0]}
            onChange={(e) => updateFilter('priceRange', [Number(e.target.value), filters.priceRange[1]])}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.priceRange[1]}
            onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], Number(e.target.value)])}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}
          />
        </div>
      </div>

      {/* Points Range */}
      <div className="mb-6">
        <label 
          className="block mb-3"
          style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '18px', color: '#000' }}
        >
          Points Range
        </label>
        <div className="flex gap-4 items-center">
          <input
            type="number"
            placeholder="Min"
            value={filters.pointsRange[0]}
            onChange={(e) => updateFilter('pointsRange', [Number(e.target.value), filters.pointsRange[1]])}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.pointsRange[1]}
            onChange={(e) => updateFilter('pointsRange', [filters.pointsRange[0], Number(e.target.value)])}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}
          />
        </div>
      </div>

      {/* Has Extra Bonus */}
      <div className="mb-6">
        <label 
          className="block mb-3"
          style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '18px', color: '#000' }}
        >
          Bonus
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.hasExtra === true}
              onChange={(e) => updateFilter('hasExtra', e.target.checked ? true : null)}
              className="w-4 h-4"
            />
            <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}>
              Has Extra Bonus
            </span>
          </label>
        </div>
      </div>

      {/* Game Selection */}
      <div className="mb-6">
        <label 
          className="block mb-3"
          style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '18px', color: '#000' }}
        >
          Game
        </label>
        <div className="flex flex-col gap-2">
          {['Mobile Legends', 'Valorant'].map(game => (
            <label key={game} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.game.includes(game)}
                onChange={() => toggleArrayValue('game', game)}
                className="w-4 h-4"
              />
              <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}>
                {game}
              </span>
            </label>
          ))}
        </div>
      </div>
    </>
  );

  const renderHandcraftFilters = () => (
    <>
      {/* Price Range */}
      <div className="mb-6">
        <label 
          className="block mb-3"
          style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '18px', color: '#000' }}
        >
          Price Range
        </label>
        <div className="flex gap-4 items-center">
          <input
            type="number"
            placeholder="Min"
            value={filters.priceRange[0]}
            onChange={(e) => updateFilter('priceRange', [Number(e.target.value), filters.priceRange[1]])}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.priceRange[1]}
            onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], Number(e.target.value)])}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}
          />
        </div>
      </div>

      {/* Customizable */}
      <div className="mb-6">
        <label 
          className="block mb-3"
          style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '18px', color: '#000' }}
        >
          Options
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.isCustomizable === true}
              onChange={(e) => updateFilter('isCustomizable', e.target.checked ? true : null)}
              className="w-4 h-4"
            />
            <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}>
              Customizable
            </span>
          </label>
        </div>
      </div>
    </>
  );

  const renderPremiumAccountsFilters = () => (
    <>
      {/* Price Range */}
      <div className="mb-6">
        <label 
          className="block mb-3"
          style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '18px', color: '#000' }}
        >
          Price Range
        </label>
        <div className="flex gap-4 items-center">
          <input
            type="number"
            placeholder="Min"
            value={filters.priceRange[0]}
            onChange={(e) => updateFilter('priceRange', [Number(e.target.value), filters.priceRange[1]])}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.priceRange[1]}
            onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], Number(e.target.value)])}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}
          />
        </div>
      </div>

      {/* Service */}
      <div className="mb-6">
        <label 
          className="block mb-3"
          style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '18px', color: '#000' }}
        >
          Service
        </label>
        <div className="flex flex-col gap-2">
          {['Canva', 'CapCut', 'Netflix', 'Spotify', 'YouTube Premium', 'Disney+'].map(service => (
            <label key={service} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.service.includes(service)}
                onChange={() => toggleArrayValue('service', service)}
                className="w-4 h-4"
              />
              <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}>
                {service}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Subscription Period */}
      <div className="mb-6">
        <label 
          className="block mb-3"
          style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '18px', color: '#000' }}
        >
          Subscription Period
        </label>
        <div className="flex flex-col gap-2">
          {['Weekly', 'Monthly', 'Yearly'].map(period => (
            <label key={period} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.subscriptionPeriod.includes(period)}
                onChange={() => toggleArrayValue('subscriptionPeriod', period)}
                className="w-4 h-4"
              />
              <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}>
                {period}
              </span>
            </label>
          ))}
        </div>
      </div>
    </>
  );

  const renderAllFilters = () => (
    <>
      {/* Price Range */}
      <div className="mb-6">
        <label 
          className="block mb-3"
          style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '18px', color: '#000' }}
        >
          Price Range
        </label>
        <div className="flex gap-4 items-center">
          <input
            type="number"
            placeholder="Min"
            value={filters.priceRange[0]}
            onChange={(e) => updateFilter('priceRange', [Number(e.target.value), filters.priceRange[1]])}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.priceRange[1]}
            onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], Number(e.target.value)])}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}
          />
        </div>
      </div>

      {/* Points Range */}
      <div className="mb-6">
        <label 
          className="block mb-3"
          style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '18px', color: '#000' }}
        >
          Points Range (Game Credits)
        </label>
        <div className="flex gap-4 items-center">
          <input
            type="number"
            placeholder="Min"
            value={filters.pointsRange[0]}
            onChange={(e) => updateFilter('pointsRange', [Number(e.target.value), filters.pointsRange[1]])}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.pointsRange[1]}
            onChange={(e) => updateFilter('pointsRange', [filters.pointsRange[0], Number(e.target.value)])}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}
          />
        </div>
      </div>

      {/* Has Extra Bonus */}
      <div className="mb-6">
        <label 
          className="block mb-3"
          style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '18px', color: '#000' }}
        >
          Bonus (Game Credits)
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.hasExtra === true}
              onChange={(e) => updateFilter('hasExtra', e.target.checked ? true : null)}
              className="w-4 h-4"
            />
            <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}>
              Has Extra Bonus
            </span>
          </label>
        </div>
      </div>

      {/* Game Selection */}
      <div className="mb-6">
        <label 
          className="block mb-3"
          style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '18px', color: '#000' }}
        >
          Game (Game Credits)
        </label>
        <div className="flex flex-col gap-2">
          {['Mobile Legends', 'Valorant'].map(game => (
            <label key={game} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.game.includes(game)}
                onChange={() => toggleArrayValue('game', game)}
                className="w-4 h-4"
              />
              <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}>
                {game}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Customizable */}
      <div className="mb-6">
        <label 
          className="block mb-3"
          style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '18px', color: '#000' }}
        >
          Options (Handcrafted & Gifts)
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.isCustomizable === true}
              onChange={(e) => updateFilter('isCustomizable', e.target.checked ? true : null)}
              className="w-4 h-4"
            />
            <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}>
              Customizable
            </span>
          </label>
        </div>
      </div>

      {/* Service */}
      <div className="mb-6">
        <label 
          className="block mb-3"
          style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '18px', color: '#000' }}
        >
          Service (Premium Accounts)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {['Canva', 'CapCut', 'Netflix', 'Spotify', 'YouTube Premium', 'Disney+'].map(service => (
            <label key={service} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.service.includes(service)}
                onChange={() => toggleArrayValue('service', service)}
                className="w-4 h-4"
              />
              <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}>
                {service}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Subscription Period */}
      <div className="mb-6">
        <label 
          className="block mb-3"
          style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '18px', color: '#000' }}
        >
          Subscription Period (Premium Accounts)
        </label>
        <div className="flex flex-col gap-2">
          {['Weekly', 'Monthly', 'Yearly'].map(period => (
            <label key={period} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.subscriptionPeriod.includes(period)}
                onChange={() => toggleArrayValue('subscriptionPeriod', period)}
                className="w-4 h-4"
              />
              <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px' }}>
                {period}
              </span>
            </label>
          ))}
        </div>
      </div>
    </>
  );

  const getFilterContent = () => {
    if (activeCategory === 'all') {
      return renderAllFilters();
    } else if (activeCategory === 'game-credits') {
      return renderGameCreditsFilters();
    } else if (['flower-bouquets', 'crochets', 'fuzzy-wire'].includes(activeCategory)) {
      return renderHandcraftFilters();
    } else if (activeCategory === 'premium-accounts') {
      return renderPremiumAccountsFilters();
    }
    return renderAllFilters();
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
        className="bg-white rounded-[33px] w-[600px] max-h-[85vh] mx-4 shadow-2xl relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'slideUp 0.4s ease-out' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Title */}
        <div className="px-12 pt-12 pb-6">
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
            FILTERS
          </h2>
          
          <p style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '16px',
            color: '#264837',
            textAlign: 'center',
          }}>
            Refine your search to find exactly what you need
          </p>
        </div>
        
        {/* Filter Content - Scrollable */}
        <div className="px-12 pb-6 overflow-y-auto flex-1">
          {getFilterContent()}
        </div>

        {/* Action Buttons */}
        <div className="px-12 py-6 border-t border-gray-200">
          <div className="flex gap-4">
            <button
              onClick={() => {
                onFilterChange(defaultFilters);
              }}
              className="flex-1 py-3 border-2 border-[#022413] rounded-md transition-colors hover:bg-gray-50"
              style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '16px', color: '#022413' }}
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-[#3E996C] text-white rounded-md transition-colors hover:bg-[#2d7350]"
              style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '16px' }}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
