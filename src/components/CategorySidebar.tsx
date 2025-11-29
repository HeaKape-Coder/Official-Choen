import React from 'react';

interface CategorySidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategorySidebar({ activeCategory, onCategoryChange }: CategorySidebarProps) {
  const categories = [
    { label: 'OUR PRODUCTS', isHeader: true },
    { label: 'All', value: 'all' },
    { label: 'VIDEO GAMES', isHeader: true },
    { label: 'Game Credits', value: 'game-credits' },
    { label: 'HANDCRAFTED & GIFTS', isHeader: true },
    { label: 'Flower Bouquets', value: 'flower-bouquets' },
    { label: 'Crochets', value: 'crochets' },
    { label: 'Fuzzy Wire', value: 'fuzzy-wire' },
    { label: 'OTHER SERVICES', isHeader: true },
    { label: 'Premium Accounts', value: 'premium-accounts' },
  ];

  return (
    <div className="w-[336px]">
      <div className="flex flex-col gap-3">
        {categories.map((category, index) => (
          <div key={index}>
            {category.isHeader ? (
              <div
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '26px',
                  color: '#6B6B6B',
                  marginBottom: '8px',
                }}
              >
                {category.label}
              </div>
            ) : (
              <button
                onClick={() => category.value && onCategoryChange(category.value)}
                className="text-left w-full transition-colors hover:text-[#3E996C]"
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '24px',
                  paddingLeft: '49px',
                  color: activeCategory === category.value ? '#3E996C' : '#000000',
                  fontWeight: activeCategory === category.value ? '600' : '400',
                }}
              >
                {category.label}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
