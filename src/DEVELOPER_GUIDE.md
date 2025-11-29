# Choen Developer Guide

## 📚 Code Documentation & Implementation Guide

This guide provides detailed information about the codebase structure, implementation patterns, and best practices for the Choen Digital Marketplace.

---

## 🗂️ File Organization

### Main Application Files

```
/
├── App.tsx                    # Homepage with 9 sections, routing logic
├── Market.tsx                 # Marketplace with product browsing
├── Announcement.tsx           # Events, updates, and reviews page
├── Profile.tsx                # User profile and saved events
├── OrderTracking.tsx          # Order management and tracking
└── README.md                  # Project overview and documentation
```

### Component Structure

```
/components/
├── Core Components
│   ├── AuthContext.tsx        # Global state management
│   ├── Navigation.tsx         # Top navigation bar
│   ├── Header.tsx             # Hero section with search
│   └── Footer.tsx             # Footer with links
│
├── Authentication
│   ├── AuthModal.tsx          # Login/Signup modal
│   ├── EditProfileModal.tsx   # Profile editing
│   ├── LogoutConfirmModal.tsx # Logout confirmation
│   └── DeactivateAccountModal.tsx # Account deactivation
│
├── Product Components
│   ├── GameCreditCard.tsx     # Game credit display
│   ├── CraftServiceCard.tsx   # Handcrafted items
│   ├── DiscountCard.tsx       # Discount promotions
│   └── PromoCard.tsx          # Bundle promotions
│
├── Purchase Flow
│   ├── PurchaseModal.tsx      # Checkout modal
│   ├── OrderDetailsModal.tsx  # Order information
│   └── NotificationDropdown.tsx # Order notifications
│
├── Events & Content
│   ├── EventCard.tsx          # Event display
│   ├── NewsCard.tsx           # News/updates
│   ├── DetailedEventModal.tsx # Event details
│   └── UpdateCard.tsx         # Update announcements
│
├── Market Features
│   ├── CategorySidebar.tsx    # Category navigation
│   └── FilterPanel.tsx        # Product filtering
│
└── UI Components (ShadCN)
    └── ui/                    # Pre-built UI components
```

---

## 🔄 Data Flow Architecture

### 1. Authentication Flow

```
User Action (Login/Signup)
    ↓
AuthModal Component
    ↓
useAuth() Hook → AuthContext
    ↓
login() Function
    ↓
User State Updated
    ↓
UI Re-renders (isAuthenticated = true)
    ↓
Protected Features Unlocked
```

**Implementation Example:**
```tsx
// In any component
import { useAuth } from './components/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <LoginPrompt />;
  }
  
  return <ProtectedContent user={user} />;
}
```

### 2. Order Management Flow

```
User Selects Product
    ↓
PurchaseModal Opens
    ↓
User Fills Form + Applies Discount
    ↓
Submit Purchase
    ↓
addOrder() Creates Order
    ├─ id: timestamp
    ├─ status: 'processing'
    ├─ completionTime: now + 5 minutes
    └─ seen: false
    ↓
Order Added to Context
    ↓
OrderTracking Timer Starts
    ↓
[5 minutes pass]
    ↓
Auto-update to 'complete'
    ↓
Notification Triggered (seen: false)
    ↓
User Views Notification
    ↓
markOrderAsSeen() Called
```

**Timer Implementation (OrderTracking.tsx):**
```tsx
useEffect(() => {
  const timer = setInterval(() => {
    const now = Date.now();
    orders.forEach(order => {
      if (order.status === 'processing' && 
          order.completionTime && 
          now >= order.completionTime) {
        updateOrderStatus(order.id, 'complete');
        setHasNewNotification(true);
      }
    });
  }, 1000); // Check every second
  
  return () => clearInterval(timer);
}, [orders]);
```

### 3. Discount System Flow

```
User Sees Discount Card
    ↓
Clicks REDEEM
    ↓
Check Authentication
    ↓
If Logged In:
    ├─ Copy Code to Clipboard
    ├─ addDiscount() to User Account
    ├─ redeemDiscount() Mark as Used
    └─ Show Toast Success
    ↓
User Goes to Market
    ↓
Opens PurchaseModal
    ↓
Enters Discount Code
    ↓
Validate Code:
    ├─ Code exists in redeemed?
    ├─ Not expired?
    ├─ Applicable to category?
    └─ Meets minimum spend?
    ↓
If Valid:
    ├─ Calculate discount
    ├─ Update price display
    └─ Apply to final total
```

**Discount Validation (PurchaseModal.tsx):**
```tsx
const validateDiscount = (code: string) => {
  const discount = discounts.find(d => 
    d.code === code && 
    !d.isExpired &&
    d.applicableCategories.includes(productCategory)
  );
  
  if (!discount) {
    setDiscountError('Invalid or expired code');
    return;
  }
  
  if (productPrice < discount.minSpend) {
    setDiscountError(`Minimum spend: ₱${discount.minSpend}`);
    return;
  }
  
  applyDiscount(discount);
};
```

### 4. Event Saving Flow

```
User Browses Events
    ↓
Clicks Bookmark Icon
    ↓
Check Authentication
    ↓
If Logged In:
    ├─ saveEvent(eventId) OR
    └─ unsaveEvent(eventId)
    ↓
savedEventIds Array Updated
    ↓
Profile Page Filters Events:
    allEvents.filter(e => savedEventIds.includes(e.id))
    ↓
Saved Events Displayed
```

---

## 🎨 Styling System

### Color Palette Implementation

**globals.css:**
```css
:root {
  --color-primary: #022413;      /* Dark Green */
  --color-accent: #3E996C;       /* Medium Green */
  --color-white: #FFFFFF;        /* White */
  --color-dark-gray: #292B2A;    /* Dark Gray */
  --color-light-gray: #363636;   /* Light Gray */
}
```

**Usage in Components:**
```tsx
// Tailwind utility classes
<div className="bg-[#022413] text-white">

// Inline styles for specific cases
<h2 style={{ color: '#022413', fontFamily: "'Sedan SC', serif" }}>
```

### Typography System

**Font Families:**
1. **Orbit** - Display headings
2. **Sedan SC** - Section titles (48px, 64px)
3. **Open Sans** - Body text (16px, 20px)

**Implementation:**
```tsx
// Section Title
<h2 style={{ 
  fontFamily: "'Sedan SC', serif", 
  fontSize: '48px', 
  color: '#022413' 
}}>
  Section Title
</h2>

// Body Text
<p style={{ 
  fontFamily: "'Open Sans', sans-serif", 
  fontSize: '16px' 
}}>
  Body content
</p>

// Button Text
<button style={{ 
  fontFamily: "'Open Sans', sans-serif", 
  fontSize: '16px', 
  letterSpacing: '1.6px' 
}}>
  BUTTON
</button>
```

### Modal Styling Pattern

All modals share consistent styling:

```tsx
// Modal Container
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
  {/* Modal Content */}
  <div className="bg-white rounded-lg max-w-md mx-auto mt-20 
                  transform transition-all duration-200 
                  scale-95 opacity-0 
                  data-[state=open]:scale-100 
                  data-[state=open]:opacity-100">
    
    {/* Header - Dark Green Background */}
    <div className="bg-[#022413] text-white p-6 rounded-t-lg">
      <h2 className="text-xl">Modal Title</h2>
      <button className="absolute top-4 right-4">×</button>
    </div>
    
    {/* Body - White Background */}
    <div className="p-6">
      {/* Content */}
    </div>
    
    {/* Footer - Action Buttons */}
    <div className="p-6 flex gap-4">
      <button className="bg-[#3E996C] text-white px-6 py-2 rounded">
        Confirm
      </button>
      <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded">
        Cancel
      </button>
    </div>
  </div>
</div>
```

---

## 🔐 Authentication & Security

### Password Validation

**Rules (enforced in AuthModal.tsx and EditProfileModal.tsx):**
- Minimum: 4 characters
- Maximum: 20 characters
- No special requirements (demo purposes)

**Implementation:**
```tsx
const validatePassword = (password: string) => {
  if (password.length < 4) {
    return 'Password must be at least 4 characters';
  }
  if (password.length > 20) {
    return 'Password must not exceed 20 characters';
  }
  return null; // Valid
};
```

### User Session Management

**Storage:**
- Currently: React Context (in-memory)
- Production: Should use localStorage/sessionStorage + backend JWT

**Implementation for Production:**
```tsx
// On login success
const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  const { token, user } = response.data;
  
  // Store token
  localStorage.setItem('authToken', token);
  
  // Update context
  setUser(user);
};

// On app load
useEffect(() => {
  const token = localStorage.getItem('authToken');
  if (token) {
    // Validate token and restore session
    validateSession(token);
  }
}, []);
```

---

## 📦 Component Patterns

### 1. Product Cards

**Common Pattern:**
```tsx
interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  category: string;
  onClick?: () => void;
}

export function ProductCard({ image, title, price, category }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden 
                    hover:shadow-xl transition-shadow cursor-pointer">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-[#3E996C] font-bold mt-2">{price}</p>
      </div>
    </div>
  );
}
```

### 2. Modal Components

**Common Pattern:**
```tsx
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
        <div className="bg-[#022413] text-white p-6 rounded-t-lg relative">
          <h2>{title}</h2>
          <button onClick={onClose} className="absolute top-4 right-4">
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
```

### 3. Status Badges

**Common Pattern:**
```tsx
const getStatusColor = (status: string) => {
  const colors = {
    processing: 'bg-orange-100 text-orange-800',
    complete: 'bg-green-100 text-green-800',
    current: 'bg-yellow-100 text-yellow-800',
    closed: 'bg-gray-100 text-gray-800',
    soon: 'bg-green-100 text-green-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

<span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
  {status.toUpperCase()}
</span>
```

---

## 🛒 Purchase Flow Implementation

### Complete Purchase Process

**Step 1: Product Selection**
```tsx
// In Market.tsx or Homepage
<GameCreditCard 
  {...product}
  onClick={() => {
    setSelectedProduct(product);
    setIsPurchaseModalOpen(true);
  }}
/>
```

**Step 2: Purchase Modal**
```tsx
// PurchaseModal.tsx
const handlePurchase = () => {
  // Validate form inputs
  if (!validateInputs()) return;
  
  // Calculate final price with discount
  const finalPrice = calculatePrice(basePrice, appliedDiscount);
  
  // Create order object
  const order = {
    id: Date.now().toString(),
    product: productName,
    status: 'processing',
    date: new Date().toLocaleDateString(),
    price: finalPrice,
    paymentMethod: selectedPaymentMethod,
    userInputs: formData,
    completionTime: Date.now() + (5 * 60 * 1000), // 5 minutes
    category: productCategory,
    seen: false
  };
  
  // Add to context
  addOrder(order);
  
  // Show success notification
  toast.success('Order placed successfully!');
  
  // Close modal
  onClose();
};
```

**Step 3: Order Tracking**
```tsx
// OrderTracking.tsx
// Timer auto-updates status after 5 minutes
useEffect(() => {
  const timer = setInterval(() => {
    const now = Date.now();
    orders.forEach(order => {
      if (order.status === 'processing' && 
          order.completionTime && 
          now >= order.completionTime) {
        updateOrderStatus(order.id, 'complete');
        setHasNewNotification(true);
      }
    });
  }, 1000);
  
  return () => clearInterval(timer);
}, [orders]);
```

**Step 4: Notification**
```tsx
// NotificationDropdown.tsx
const unseenOrders = orders.filter(o => o.status === 'complete' && !o.seen);

{unseenOrders.length > 0 && (
  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
)}
```

---

## 🎯 Event Management

### Event Data Structure

```typescript
interface Event {
  id: string;
  title: string;
  description: string;         // Short description
  fullDescription: string;     // Detailed description
  date: string;                // Start date (display)
  endDate: string;             // End date
  image: string;               // Banner image URL
  status: 'current' | 'closed' | 'soon';
  eventTime: string;           // Time range
  eventDate: string;           // Full date range
  benefits: string[];          // Array of benefits
  location?: string;           // Venue (optional)
  fbLink: string;              // Facebook event link
  type: 'event' | 'update';    // Classification
}
```

### Event Filtering

**By Status:**
```tsx
const filterEventsByStatus = (events: Event[], filter: string) => {
  if (filter === 'all') return events;
  return events.filter(e => e.status === filter);
};
```

**By Saved Status:**
```tsx
const savedEvents = allEvents.filter(e => savedEventIds.includes(e.id));
```

### Event Saving/Unsaving

```tsx
const toggleEventSave = (eventId: string) => {
  if (!isAuthenticated) {
    // Show login modal
    setShowAuthModal(true);
    return;
  }
  
  if (savedEventIds.includes(eventId)) {
    unsaveEvent(eventId);
    toast.success('Event removed from saved');
  } else {
    saveEvent(eventId);
    toast.success('Event saved successfully');
  }
};
```

---

## 🔔 Notification System

### Notification Types

1. **Order Status Updates**
2. **Event Announcements** (future)
3. **Promo Alerts** (future)

### Implementation

**Notification Indicator:**
```tsx
const hasUnseenNotifications = orders.some(o => 
  o.status === 'complete' && !o.seen
);

<Bell className="w-5 h-5" />
{hasUnseenNotifications && (
  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
)}
```

**Mark as Seen:**
```tsx
const handleViewOrder = (orderId: string) => {
  markOrderAsSeen(orderId);
  setSelectedOrder(orders.find(o => o.id === orderId));
  setShowOrderDetails(true);
};
```

---

## 🧪 Testing Guidelines

### Unit Testing (Future Implementation)

```tsx
// Example: Testing discount validation
describe('Discount Validation', () => {
  it('should reject expired discount', () => {
    const discount = { 
      code: 'EXPIRED', 
      isExpired: true,
      applicableCategories: ['game-credits'] 
    };
    expect(validateDiscount(discount)).toBe(false);
  });
  
  it('should apply valid discount', () => {
    const discount = { 
      code: 'VALID', 
      isExpired: false,
      discountValue: 50,
      discountType: 'fixed',
      minSpend: 0,
      applicableCategories: ['game-credits'] 
    };
    const price = applyDiscount(1000, discount);
    expect(price).toBe(950);
  });
});
```

---

## 🚀 Performance Optimization

### Image Optimization

```tsx
// Use ImageWithFallback for external images
import { ImageWithFallback } from './components/figma/ImageWithFallback';

<ImageWithFallback 
  src={productImage}
  alt={productName}
  className="w-full h-48 object-cover"
/>
```

### Lazy Loading (Future)

```tsx
import React, { lazy, Suspense } from 'react';

const Market = lazy(() => import('./Market'));
const Profile = lazy(() => import('./Profile'));

<Suspense fallback={<LoadingSpinner />}>
  {currentPage === 'market' && <Market />}
</Suspense>
```

### Memoization

```tsx
import { useMemo } from 'react';

const filteredProducts = useMemo(() => {
  return products.filter(p => 
    p.category === selectedCategory &&
    p.price >= priceRange[0] &&
    p.price <= priceRange[1]
  );
}, [products, selectedCategory, priceRange]);
```

---

## 📝 Coding Standards

### Naming Conventions

```tsx
// Components: PascalCase
export function GameCreditCard() {}

// Functions: camelCase
const handlePurchase = () => {}

// Constants: UPPER_SNAKE_CASE
const MAX_PASSWORD_LENGTH = 20;

// Interfaces: PascalCase
interface UserProfile {}

// Props: ComponentNameProps
interface GameCreditCardProps {}
```

### Import Organization

```tsx
// 1. React imports
import React, { useState, useEffect } from 'react';

// 2. Third-party libraries
import { toast } from 'sonner';
import { X, Bell } from 'lucide-react';

// 3. Internal components
import { Navigation } from './components/Navigation';
import { Header } from './components/Header';

// 4. Context and hooks
import { useAuth } from './components/AuthContext';

// 5. Types and interfaces
import type { User, Order } from './types';

// 6. Data and constants
import { allEventsData } from './data/eventsData';

// 7. Assets
import headerImage from 'figma:asset/...';
```

### Component Structure

```tsx
/**
 * Component Documentation
 * Description of what this component does
 */
interface ComponentProps {
  // Props documentation
}

export function Component({ prop1, prop2 }: ComponentProps) {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  const [state, setState] = useState();
  
  // ============================================================================
  // HOOKS
  // ============================================================================
  const { user } = useAuth();
  
  // ============================================================================
  // EFFECTS
  // ============================================================================
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  // ============================================================================
  // HANDLERS
  // ============================================================================
  const handleAction = () => {
    // Handler logic
  };
  
  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
}
```

---

## 🐛 Common Issues & Solutions

### Issue 1: Order Status Not Updating

**Problem:** Orders stuck in "processing" status

**Solution:**
```tsx
// Ensure completionTime is set correctly
completionTime: Date.now() + (5 * 60 * 1000) // 5 minutes in milliseconds

// Verify timer is running
useEffect(() => {
  const timer = setInterval(() => {
    // Check logic
  }, 1000);
  return () => clearInterval(timer); // Important: cleanup
}, [orders]);
```

### Issue 2: Discount Not Applying

**Problem:** Discount code valid but not reducing price

**Solution:**
```tsx
// Check all validation conditions
const isValid = 
  discount &&
  !discount.isExpired &&
  discount.applicableCategories.includes(category) &&
  totalPrice >= discount.minSpend;

// Ensure calculation is correct
if (discount.discountType === 'fixed') {
  finalPrice = Math.max(0, totalPrice - discount.discountValue);
} else {
  finalPrice = totalPrice * (1 - discount.discountValue / 100);
}
```

### Issue 3: Events Not Saving

**Problem:** Bookmark icon not working

**Solution:**
```tsx
// Check authentication first
if (!isAuthenticated) {
  setShowAuthModal(true);
  return;
}

// Verify event ID exists
if (!eventId) {
  console.error('Event ID missing');
  return;
}

// Toggle save status
const isSaved = savedEventIds.includes(eventId);
if (isSaved) {
  unsaveEvent(eventId);
} else {
  saveEvent(eventId);
}
```

---

## 📖 API Reference (Future Backend Integration)

### Authentication Endpoints

```typescript
POST /api/auth/signup
Body: { email: string, password: string, name: string }
Response: { token: string, user: User }

POST /api/auth/login
Body: { email: string, password: string }
Response: { token: string, user: User }

POST /api/auth/logout
Headers: { Authorization: "Bearer {token}" }
Response: { success: boolean }
```

### Order Endpoints

```typescript
POST /api/orders
Headers: { Authorization: "Bearer {token}" }
Body: Order
Response: { orderId: string, status: string }

GET /api/orders
Headers: { Authorization: "Bearer {token}" }
Response: { orders: Order[] }

PUT /api/orders/:id/status
Headers: { Authorization: "Bearer {token}" }
Body: { status: string }
Response: { order: Order }
```

### Product Endpoints

```typescript
GET /api/products
Query: { category?: string, minPrice?: number, maxPrice?: number }
Response: { products: Product[] }

GET /api/products/:id
Response: { product: Product }
```

---

## 🎓 Learning Resources

### React & TypeScript
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### Tailwind CSS
- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com/)

### State Management
- [React Context API](https://react.dev/reference/react/useContext)
- [State Management Guide](https://react.dev/learn/managing-state)

---

**Last Updated:** November 29, 2025
**Version:** 1.0.0
