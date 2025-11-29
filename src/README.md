# Choen: Game Discount In-App Purchase & Digital Marketplace

![Choen Logo](https://img.shields.io/badge/Choen-Digital%20Marketplace-022413?style=for-the-badge)

A comprehensive e-commerce platform similar to Codashop, built with React and TypeScript, offering game credits, handcrafted items, and premium services with a complete authentication system and order management.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Design System](#design-system)
- [Getting Started](#getting-started)
- [Core Functionality](#core-functionality)
- [Pages & Components](#pages--components)
- [Data Management](#data-management)
- [Authentication & Security](#authentication--security)
- [Order Management System](#order-management-system)
- [Discount & Promo System](#discount--promo-system)
- [Events System](#events-system)
- [Modal & Popup System](#modal--popup-system)
- [Future Enhancements](#future-enhancements)

---

## 🎯 Overview

**Choen** is a full-featured digital marketplace platform that provides:
- **Game Credits**: Discounted in-game currencies for popular games (Mobile Legends, Valorant, Genshin Impact, etc.)
- **Handcrafted Items**: Custom flower bouquets, crochet crafts, and fuzzy wire decorations
- **Premium Services**: Subscription accounts for Spotify, Netflix, Canva, CapCut, and YouTube Premium
- **Event Management**: Gaming tournaments, sales events, and community activities
- **Order Tracking**: Real-time order status tracking with automated processing
- **Discount System**: Redeemable promo codes with category-specific applications

---

## ✨ Features

### 🛒 E-Commerce Core
- ✅ Multi-category product browsing (Game Credits, Handcrafted Items, Premium Services)
- ✅ Advanced filtering and search functionality
- ✅ Shopping cart with discount application
- ✅ Dynamic product cards with real-time updates
- ✅ Responsive design optimized for 1440x1024 screens

### 👤 User Management
- ✅ Complete authentication system (Login, Sign Up, Logout)
- ✅ User profile management with avatar upload
- ✅ Password validation (4-20 characters)
- ✅ Account deactivation functionality
- ✅ Profile editing with real-time updates

### 📦 Order System
- ✅ Purchase order creation with PROCESSING status
- ✅ 5-minute automatic timer for order completion
- ✅ Order status transitions: PROCESSING → COMPLETE
- ✅ Order tracking page with detailed views
- ✅ Notification system for order updates

### 🎟️ Discount & Promotions
- ✅ Redeemable discount codes
- ✅ Category-specific discounts (Game Credits, Handcrafted, Premium)
- ✅ Fixed amount and percentage-based discounts
- ✅ Minimum spend requirements
- ✅ Expiry tracking and validation

### 🎮 Events Management
- ✅ Gaming tournaments and competitions
- ✅ Sales events and promotions
- ✅ Event saving and bookmarking
- ✅ Event status tracking (Current, Closed, Soon)
- ✅ Detailed event modals with benefits and information

### 🔔 Notifications
- ✅ Real-time order status notifications
- ✅ Event announcements
- ✅ Unseen notification indicators
- ✅ Notification dropdown with order details

---

## 🛠️ Tech Stack

### Core Technologies
- **React** 18+ - UI framework
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** v4.0 - Utility-first styling
- **Lucide React** - Icon library

### UI Components
- **ShadCN/UI** - Pre-built accessible components
  - Modals, Dialogs, Dropdowns
  - Forms, Inputs, Buttons
  - Tabs, Accordions, Carousels
  - Toasts, Tooltips, Popovers

### State Management
- **React Context API** - Global authentication and user state
- **React Hooks** - Local component state (useState, useEffect)

### Image Handling
- **Unsplash API** - Stock images for products and events
- **Figma Assets** - Custom imported design assets

---

## 📁 Project Structure

```
choen/
├── components/              # React components
│   ├── ui/                 # ShadCN UI components
│   ├── AuthContext.tsx     # Authentication context provider
│   ├── AuthModal.tsx       # Login/Signup modal
│   ├── Navigation.tsx      # Top navigation bar
│   ├── Header.tsx          # Hero section with search
│   ├── Footer.tsx          # Footer with links
│   ├── PurchaseModal.tsx   # Product purchase modal
│   ├── OrderDetailsModal.tsx # Order information modal
│   ├── DetailedEventModal.tsx # Event details modal
│   ├── NotificationDropdown.tsx # Notification bell
│   ├── EditProfileModal.tsx # Profile editing
│   ├── DiscountCard.tsx    # Discount display card
│   ├── GameCreditCard.tsx  # Game credit product card
│   ├── CraftServiceCard.tsx # Handcrafted item card
│   ├── PromoCard.tsx       # Promotion showcase card
│   ├── EventCard.tsx       # Event display card
│   ├── NewsCard.tsx        # News/update card
│   ├── ReviewCard.tsx      # Customer review card
│   └── ...other components
│
├── data/                   # Data files
│   └── eventsData.ts       # Shared events data
│
├── styles/                 # Stylesheets
│   └── globals.css         # Global styles and Tailwind config
│
├── App.tsx                 # Main app component (Homepage)
├── Market.tsx              # Marketplace page
├── Announcement.tsx        # Announcements & events page
├── Profile.tsx             # User profile page
├── OrderTracking.tsx       # Order tracking page
└── README.md              # This file
```

---

## 🎨 Design System

### Color Palette
The Choen brand uses a nature-inspired color scheme:

| Color | Hex Code | Usage |
|-------|----------|-------|
| **Dark Green** | `#022413` | Primary brand color, headers, dark sections |
| **Medium Green** | `#3E996C` | Accent color, buttons, hover states |
| **White** | `#FFFFFF` | Background, text on dark sections |
| **Dark Gray** | `#292B2A` | Secondary buttons, subtle elements |
| **Light Gray** | `#363636` | Body text |

### Typography
The project uses three font families:

1. **Orbit** - Primary display font for headings
2. **Sedan SC** - Serif font for section titles (48px, 64px)
3. **Open Sans** - Sans-serif for body text and UI elements

### Font Size Guidelines
- Headers (Section Titles): 48px - 64px
- Body Text: 16px - 20px
- Small Text: 12px - 14px
- Button Text: 16px with 1.6px letter spacing

### Screen Size
- Optimized for: **1440px × 1024px**
- Responsive design with max-width containers
- Grid-based layouts (3, 4, 5 columns)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/choen.git

# Navigate to project directory
cd choen

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup
No environment variables required for frontend-only version. All features work with mock data.

---

## 🔧 Core Functionality

### 1. Authentication System

**Location**: `/components/AuthContext.tsx`, `/components/AuthModal.tsx`

The authentication system provides:
- User login and registration
- Session persistence (Context API)
- Profile management
- Logout functionality

**Password Requirements**:
- Minimum: 4 characters
- Maximum: 20 characters
- Validated in both AuthModal and EditProfileModal

**Example Usage**:
```tsx
import { useAuth } from './components/AuthContext';

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();
  
  // Check if user is logged in
  if (isAuthenticated) {
    // User-specific content
  }
}
```

### 2. Search Functionality

**Location**: `/App.tsx` (handleSearch function)

Smart search that routes to appropriate market categories:
- **"mobile legends"** or **"ml"** → Game Credits
- **"flower"** or **"bouquet"** → Flower Bouquets
- **"crochet"** → Crochet Items
- **"fuzzy wire"** → Fuzzy Wire Crafts
- **"spotify"**, **"netflix"**, etc. → Premium Accounts
- **Default** → All Products

### 3. Navigation System

**Location**: `/components/Navigation.tsx`, `/App.tsx`

Page routing with state management:
- Home (`/`)
- Market (`/market`)
- Announcements (`/announcement`)
- Profile (`/profile`)

Navigation includes:
- Auto-scroll to top on page change
- Tab state preservation
- Event notification indicators

---

## 📄 Pages & Components

### Homepage (`/App.tsx`)

**9 Main Sections**:

1. **Header Section** - Hero image with search bar
2. **Discount Section** - Featured discount cards
3. **Popular Game Credits** - Grid of game credit offers
4. **Best Crafts & Services** - Handcrafted items showcase
5. **See What's New** - Latest news and updates
6. **Enjoy Our Promos** - Promotional bundles
7. **Top Reviews** - Customer testimonials
8. **Why Choen** - Feature highlights with icons
9. **Footer** - Links, policies, and social media

**Key Features**:
- Dynamic content loading
- Smooth section transitions
- Integrated search
- Event modal previews

### Market Page (`/Market.tsx`)

**Features**:
- Category sidebar navigation
- Product filtering by category
- Filter panel (price range, sorting)
- Purchase modal integration
- Discount code application
- Product grid layouts

**Categories**:
- All Products
- Game Credits (Mobile Legends, Valorant, Genshin Impact)
- Flower Bouquets
- Crochet Items
- Fuzzy Wire Crafts
- Premium Accounts (Spotify, Netflix, Canva, etc.)

### Announcement Page (`/Announcement.tsx`)

**Tabs**:
1. **Events** - Gaming tournaments, sales events
2. **Updates** - News, announcements, new products
3. **Reviews** - Customer feedback and testimonials

**Features**:
- Event filtering by status (All, Current, Closed, Soon)
- Save events to profile
- Detailed event modals
- Review links to Facebook

### Profile Page (`/Profile.tsx`)

**Sections**:
1. **Profile Header** - Avatar, name, email
2. **Saved Events** - Bookmarked events with status
3. **Profile Settings** - Edit profile, change password
4. **Account Options** - Deactivate account, logout

**Features**:
- Avatar upload
- Profile editing
- Password management (4-20 chars)
- Event management
- Order history access

### Order Tracking Page (`/OrderTracking.tsx`)

**Features**:
- Order list with status badges
- Order details modal
- Status filtering
- Date and payment info
- Real-time status updates

**Order Statuses**:
- 🔄 **Processing** - Initial state, 5-min timer
- ✅ **Complete** - Auto-updated after timer
- 🚚 **Out for Delivery** - Manual status (future)
- 📦 **Delivered** - Manual status (future)

---

## 💾 Data Management

### Events Data (`/data/eventsData.ts`)

**Shared Events Structure**:
```typescript
{
  id: string;
  title: string;
  description: string;
  date: string;
  endDate: string;
  image: string;
  status: 'current' | 'closed' | 'soon';
  fullDescription: string;
  eventTime: string;
  eventDate: string;
  benefits: string[];
  location?: string;
  fbLink: string;
  type: 'event' | 'update';
}
```

**Usage**:
- Shared across Announcement page and Profile page
- News events from homepage are combined with shared events
- Filtering by status for display

### Product Data Locations

| Product Type | Location | Data Structure |
|-------------|----------|----------------|
| Discounts | `App.tsx` | id, code, price, type, minSpend, categories |
| Game Credits | `App.tsx`, `Market.tsx` | gameImage, gameName, diamonds, price |
| Handcrafted Items | `Market.tsx` | name, category, price, image, description |
| Premium Services | `Market.tsx` | service, duration, price, features |
| Promos | `App.tsx` | title, features, image |
| Reviews | `App.tsx`, `Announcement.tsx` | name, comment, rating, profileImage |

---

## 🔐 Authentication & Security

### Authentication Context

**Provider**: `AuthContext.tsx`

**State Management**:
```typescript
interface User {
  email: string;
  name: string;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, name?: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  updateProfileImage: (imageUrl: string) => void;
  updateUser: (updates: Partial<User>) => void;
  // ... order, discount, event methods
}
```

### Login Flow

1. User clicks "Login" in navigation
2. AuthModal opens with Login tab
3. User enters email and password
4. Validation checks (password 4-20 chars)
5. Login function called from context
6. User object created and stored
7. Modal closes, user sees authenticated UI

### Signup Flow

1. User switches to Signup tab
2. Enters name, email, password, confirm password
3. Validation checks:
   - All fields filled
   - Valid email format
   - Passwords match
   - Password 4-20 characters
4. Account created via login function
5. Auto-login after successful signup

### Password Validation

**Files**: `AuthModal.tsx`, `EditProfileModal.tsx`

**Rules**:
- Minimum: 4 characters
- Maximum: 20 characters
- Required for login and signup
- Must match confirmation on signup

---

## 📦 Order Management System

### Order Creation Flow

**Location**: `/components/PurchaseModal.tsx`

1. **User selects product** → Opens PurchaseModal
2. **User fills required fields**:
   - Game Credits: Player ID, Server ID
   - Handcrafted: Delivery address, customization
   - Premium: Email, account details
3. **User applies discount** (optional)
4. **User confirms purchase**
5. **Order created** with:
   ```typescript
   {
     id: string; // unique timestamp-based ID
     product: string; // product name
     status: 'processing'; // initial status
     date: string; // purchase date
     price: string; // final price after discount
     paymentMethod: string; // e.g., "GCash"
     userInputs: any; // form data
     completionTime: number; // timestamp + 5 minutes
     category: string; // product category
     seen: false; // notification status
   }
   ```
6. **Order added to context** → Appears in order tracking
7. **Notification indicator** shows new order

### Order Status Auto-Update

**Location**: `/OrderTracking.tsx`

**Timer Logic**:
```typescript
useEffect(() => {
  const timer = setInterval(() => {
    const now = Date.now();
    orders.forEach(order => {
      if (order.status === 'processing' && 
          order.completionTime && 
          now >= order.completionTime) {
        updateOrderStatus(order.id, 'complete');
        setHasNewNotification(true); // Show notification
      }
    });
  }, 1000); // Check every second
  
  return () => clearInterval(timer);
}, [orders]);
```

**Process**:
1. Timer runs every second
2. Checks all PROCESSING orders
3. Compares current time with completionTime
4. Auto-updates to COMPLETE after 5 minutes
5. Sets notification flag
6. User sees notification bell indicator

### Order Details Modal

**Component**: `OrderDetailsModal.tsx`

**Displays**:
- Order ID
- Product name
- Status badge with color coding
- Purchase date
- Price
- Payment method
- Category
- User inputs (Player ID, address, etc.)

**Styling**:
- Matches AuthModal styling
- Smooth animations (scale + fade)
- Modal overlay with backdrop blur

---

## 🎟️ Discount & Promo System

### Discount Structure

```typescript
interface Discount {
  id: string;
  code: string; // e.g., "LEVELUP50"
  description: string;
  price: string; // display (e.g., "₱50 OFF")
  type: string; // category name
  isExpired: boolean;
  expiryDate: string;
  minSpend: number; // minimum purchase amount
  discountValue: number; // 50 or 10 (for percentage)
  discountType: 'fixed' | 'percentage';
  applicableCategories: string[]; // ['game-credits']
}
```

### Discount Redemption Flow

**Location**: `DiscountCard.tsx`

1. User clicks "REDEEM" on discount card
2. Checks if user is authenticated
3. If not logged in → Opens AuthModal
4. If logged in → Copies code to clipboard
5. Discount added to user's redeemed list
6. Shows success toast notification
7. Code can be applied in PurchaseModal

### Applying Discounts to Purchases

**Location**: `PurchaseModal.tsx`

1. User enters discount code in input field
2. System validates:
   - Code exists in redeemed discounts
   - Not expired
   - Applicable to product category
   - Meets minimum spend requirement
3. If valid:
   - Applies discount calculation
   - Shows discounted price
   - Prevents code reuse
4. If invalid:
   - Shows error message
   - Code remains invalid

**Calculation Logic**:
```typescript
if (discountType === 'fixed') {
  finalPrice = originalPrice - discountValue;
} else if (discountType === 'percentage') {
  finalPrice = originalPrice * (1 - discountValue / 100);
}
```

### Discount Categories

| Category | Code | Discount | Min Spend | Type |
|----------|------|----------|-----------|------|
| Game Credits | LEVELUP50 | ₱50 OFF | ₱300 | Fixed |
| Handcrafted & Gifts | COZY10 | 10% OFF | ₱0 | Percentage |
| Premium Services | BUNDLE10 | 10% OFF | ₱0 | Percentage |

---

## 🎮 Events System

### Event Types

1. **Gaming Tournaments** - Competitive events with prizes
2. **Sales Events** - Special promotions and discounts
3. **Product Launches** - New game seasons, items
4. **Community Events** - Giveaways, celebrations

### Event Statuses

| Status | Color | Badge | Description |
|--------|-------|-------|-------------|
| **Current** | Yellow | ⚡ ONGOING | Event is happening now |
| **Closed** | Gray | 🔒 CLOSED | Event has ended |
| **Soon** | Green | 🔜 COMING SOON | Event starts in future |

### Event Saving Feature

**Location**: `EventCard.tsx`, `AuthContext.tsx`

**Flow**:
1. User clicks bookmark icon on event card
2. Checks authentication
3. If logged in → Toggles save status
4. Event ID stored in user's savedEventIds array
5. Saved events appear in Profile page
6. Can be unsaved from Profile page

**Visual Indicators**:
- Filled bookmark = Saved
- Outline bookmark = Not saved
- Hover effects on interaction

### Event Detail Modal

**Component**: `DetailedEventModal.tsx`

**Displays**:
- Event image
- Title and type badge (EVENT/UPDATE)
- Description
- Event date and time
- Location (if applicable)
- Benefits list (with checkmarks)
- Facebook event link
- Status indicator

**Styling**:
- Full-screen modal overlay
- Smooth scale + fade animation
- Responsive image
- Consistent with AuthModal design

---

## 🎭 Modal & Popup System

### Modal Types

All modals in Choen follow a **consistent styling pattern**:

1. **AuthModal** - Login/Signup
2. **PurchaseModal** - Product checkout
3. **DetailedEventModal** - Event information
4. **OrderDetailsModal** - Order information
5. **EditProfileModal** - Profile editing
6. **DeactivateAccountModal** - Account deactivation
7. **LogoutConfirmModal** - Logout confirmation
8. **TermsModal** - Terms & Policies
9. **CustomerServiceModal** - Contact info

### Shared Modal Styling

**Animation Effects**:
```css
/* Entry */
scale: 0.95 → 1
opacity: 0 → 1
duration: 200ms

/* Exit */  
scale: 1 → 0.95
opacity: 1 → 0
duration: 150ms
```

**Design Pattern**:
- Backdrop: Semi-transparent overlay with blur
- Container: White card with rounded corners
- Header: Dark green (#022413) background
- Close button: Absolute top-right position
- Content: Padded sections with proper spacing
- Buttons: Green (#3E996C) for primary actions

### Modal Best Practices

1. **Accessibility**: All modals have close buttons and overlay click-to-close
2. **Focus Management**: Auto-focus on primary input when opened
3. **Keyboard Support**: ESC key to close
4. **Animation Consistency**: Same timing for all modals
5. **Responsive Design**: Adapt to screen sizes
6. **Z-Index Layering**: Proper stacking for nested modals

---

## 🔔 Notification System

### Notification Types

1. **Order Updates** - Status changes (Processing → Complete)
2. **Event Announcements** - New events, updates
3. **Promo Alerts** - New discounts available

### Notification Dropdown

**Component**: `NotificationDropdown.tsx`

**Features**:
- Bell icon in navigation
- Red dot indicator for unseen items
- Dropdown with scrollable list
- Order quick view cards
- "View Details" button for each order
- "Mark as Seen" functionality
- Empty state message

**Visual Design**:
- Max height with scroll
- Status-based color coding
- Processing: Orange badge
- Complete: Green badge
- Hover effects on items

### Notification Flow

1. **Order Status Change**:
   ```
   Processing → Complete (after 5 min)
   ```
2. **Update Notification**:
   - `setHasNewNotification(true)`
   - Red dot appears on bell icon
3. **User Opens Dropdown**:
   - Sees complete order notification
   - Red dot remains until marked as seen
4. **User Clicks Order**:
   - Opens OrderDetailsModal
   - Order marked as seen
   - Red dot updates if no more unseen

---

## 🎯 Future Enhancements

### Planned Features

1. **Backend Integration**
   - Database for users, orders, products
   - Real payment gateway (PayPal, Stripe)
   - Email notifications
   - Admin dashboard

2. **Advanced Order Management**
   - Multiple order statuses (Out for Delivery, Delivered)
   - Shipment tracking numbers
   - Order cancellation
   - Refund requests

3. **Enhanced User Features**
   - Wishlist functionality
   - Order history with filters
   - Favorite products
   - Referral program

4. **Social Integration**
   - Facebook login
   - Share events on social media
   - Social proof (recent purchases)
   - Community reviews

5. **Analytics & Reporting**
   - Sales analytics
   - Popular products tracking
   - User behavior analytics
   - Revenue reports

6. **Mobile App**
   - React Native version
   - Push notifications
   - Mobile-optimized checkout
   - Offline mode

### Technical Improvements

1. **Performance**
   - Image lazy loading
   - Code splitting
   - Caching strategies
   - CDN integration

2. **Testing**
   - Unit tests (Jest)
   - Integration tests (React Testing Library)
   - E2E tests (Playwright/Cypress)
   - Accessibility testing

3. **Security**
   - JWT authentication
   - HTTPS enforcement
   - XSS protection
   - CSRF tokens

4. **SEO**
   - Server-side rendering (Next.js)
   - Meta tags optimization
   - Sitemap generation
   - Open Graph tags

---

## 📝 Code Standards

### Naming Conventions

- **Components**: PascalCase (e.g., `AuthModal.tsx`)
- **Functions**: camelCase (e.g., `handleSearch`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_PASSWORD_LENGTH`)
- **Interfaces**: PascalCase with 'I' prefix optional (e.g., `User`, `AuthContextType`)

### File Organization

- One component per file
- Shared types in separate files
- Group related components in folders
- Export from index files for cleaner imports

### TypeScript Usage

- Define interfaces for all props
- Type all function parameters and returns
- Use type inference where obvious
- Avoid `any` type (use `unknown` instead)

### React Best Practices

- Use functional components
- Implement React Hooks (useState, useEffect, useContext)
- Memoize expensive calculations (useMemo, useCallback)
- Keep components small and focused
- Extract reusable logic to custom hooks

---

## 🤝 Contributing

### Development Workflow

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Code Review Guidelines

- Follow existing code style
- Add comments for complex logic
- Update README for new features
- Test thoroughly before submitting
- Keep PRs focused and small

---

## 📞 Support & Contact

### Get Help

- **Facebook**: [Choen Lobby](https://web.facebook.com/choen.lobby)
- **Email**: support@choen.com (placeholder)
- **Customer Service**: Available via CustomerServiceModal

### Report Issues

If you encounter bugs or have feature requests:
1. Check existing issues on GitHub
2. Create detailed bug report with steps to reproduce
3. Include screenshots if applicable
4. Specify browser and OS version

---

## 📜 License

This project is for educational and demonstration purposes. All rights reserved.

---

## 🙏 Acknowledgments

- **Unsplash** - Stock images
- **Lucide** - Icon library
- **ShadCN/UI** - Component library
- **Tailwind CSS** - Styling framework
- **React Team** - React framework

---

## 📊 Project Stats

- **Total Components**: 30+
- **Total Pages**: 4 (Home, Market, Announcement, Profile)
- **Lines of Code**: ~10,000+
- **Product Categories**: 6
- **Event Types**: 2 (Events, Updates)
- **Discount Codes**: 3
- **Color Palette**: 3 primary colors
- **Font Families**: 3 (Orbit, Sedan SC, Open Sans)

---

**Built with ❤️ by the Choen Team**

*Last Updated: November 29, 2025*
