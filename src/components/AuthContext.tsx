/**
 * AUTHCONTEXT.TSX - Authentication & Global State Management
 * 
 * This file provides a centralized authentication and state management system using React Context API.
 * It handles:
 * - User authentication (login, logout, session management)
 * - User profile updates (name, email, avatar)
 * - Order management (creation, status updates, tracking)
 * - Discount system (redemption, validation, tracking)
 * - Event system (saving events, tracking viewed events)
 * - Notification system (new order alerts, status changes)
 * 
 * This context is wrapped around the entire app in index.tsx
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Order Interface
 * Represents a purchase order in the system
 * 
 * Status Flow: processing (5 min) → complete
 * Future statuses: out-for-delivery → delivered
 */
interface Order {
  id: string;                    // Unique order ID (timestamp-based)
  product: string;               // Product name
  status: 'processing' | 'complete' | 'out-for-delivery' | 'delivered';
  date: string;                  // Purchase date (readable format)
  price: string;                 // Final price after discounts
  paymentMethod?: string;        // Payment method (e.g., GCash, PayPal)
  userInputs?: any;              // Form data (Player ID, address, etc.)
  completionTime?: number;       // Unix timestamp when order auto-completes
  category?: string;             // Product category
  seen?: boolean;                // Notification viewed status
}

/**
 * Discount Interface
 * Represents a redeemable discount code
 * Users redeem codes from DiscountCard and apply them in PurchaseModal
 */
interface Discount {
  id: string;              // Unique discount ID
  code: string;            // Promo code (e.g., LEVELUP50)
  description: string;     // Discount description
  price: string;           // Display value (e.g., "₱50 OFF")
  type: string;            // Category type (e.g., "GAME CREDITS")
  isExpired: boolean;      // Expiry status
  expiryDate: string;      // Expiry date (readable format)
}

/**
 * User Interface
 * Represents authenticated user data
 */
interface User {
  email: string;           // User's email address
  name: string;            // User's display name
  profileImage?: string;   // Profile avatar URL (optional)
}

/**
 * AuthContextType Interface
 * Defines all methods and state available through AuthContext
 * This is the main API for accessing authentication and app state
 */
interface AuthContextType {
  // User Authentication
  user: User | null;                                // Current user object or null if not logged in
  login: (email: string, password: string, name?: string) => void;  // Login function
  logout: () => void;                                               // Logout function
  isAuthenticated: boolean;                                         // Boolean flag for auth status
  updateProfileImage: (imageUrl: string) => void;                   // Update user avatar
  updateUser: (updates: Partial<User>) => void;                     // Update user profile data
  
  // Order Management
  orders: Order[];                                                  // Array of all user orders
  addOrder: (order: Order) => void;                                 // Create new order
  updateOrderStatus: (orderId: string, newStatus: 'processing' | 'complete' | 'out-for-delivery' | 'delivered') => void;
  markOrderAsSeen: (orderId: string) => void;                       // Mark notification as seen
  
  // Discount System
  discounts: Discount[];                                            // Array of redeemed discounts
  addDiscount: (discount: Discount) => void;                        // Add discount to user account
  redeemedDiscounts: string[];                                      // Array of redeemed discount IDs
  redeemDiscount: (discountId: string) => void;                     // Mark discount as redeemed
  
  // Event Management
  seenEventIds: string[];                                           // Array of viewed event IDs
  markEventAsSeen: (eventId: string) => void;                       // Mark event as viewed
  savedEventIds: string[];                                          // Array of bookmarked event IDs
  saveEvent: (eventId: string) => void;                             // Save/bookmark an event
  unsaveEvent: (eventId: string) => void;                           // Remove saved event
  
  // Notification System
  hasNewNotification: boolean;                                      // Flag for new notifications
  setHasNewNotification: (value: boolean) => void;                  // Update notification flag
}

// Create the context with undefined default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider Component
 * Wraps the entire application to provide authentication and state management
 * 
 * Usage in index.tsx:
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  
  // User authentication state
  const [user, setUser] = useState<User | null>(null);
  
  // Order tracking state
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Discount system state
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [redeemedDiscounts, setRedeemedDiscounts] = useState<string[]>([]);
  
  // Event system state
  const [seenEventIds, setSeenEventIds] = useState<string[]>([]);
  const [savedEventIds, setSavedEventIds] = useState<string[]>([]);
  
  // Notification state
  const [hasNewNotification, setHasNewNotification] = useState(false);

  // ============================================================================
  // AUTHENTICATION FUNCTIONS
  // ============================================================================
  
  /**
   * login
   * Authenticates user and creates session
   * In production, this would validate credentials with backend API
   * 
   * @param email - User's email address
   * @param password - User's password (validated in AuthModal: 4-20 chars)
   * @param name - Optional display name (defaults to email username)
   */
  const login = (email: string, password: string, name?: string) => {
    // Extract username from email if name not provided
    const userName = name || email.split('@')[0];
    // Set user object (starts session)
    setUser({ email, name: userName });
  };

  /**
   * logout
   * Clears user session and all associated data
   * Resets app to unauthenticated state
   */
  const logout = () => {
    setUser(null);
    setOrders([]);
    setDiscounts([]);
    setRedeemedDiscounts([]);
    setSavedEventIds([]);
    setSeenEventIds([]);
  };

  // ============================================================================
  // USER PROFILE FUNCTIONS
  // ============================================================================
  
  /**
   * updateProfileImage
   * Updates user's profile avatar
   * Used in EditProfileModal when user uploads new image
   */
  const updateProfileImage = (imageUrl: string) => {
    if (user) {
      setUser({ ...user, profileImage: imageUrl });
    }
  };

  /**
   * updateUser
   * Updates user profile with partial data
   * Allows updating name, email, or other user fields
   */
  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  // ============================================================================
  // ORDER MANAGEMENT FUNCTIONS
  // ============================================================================
  
  /**
   * addOrder
   * Creates new order and adds to beginning of orders array
   * Called from PurchaseModal when user completes purchase
   * Order starts with 'processing' status and 5-minute completion timer
   */
  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  /**
   * updateOrderStatus
   * Changes order status (e.g., processing → complete)
   * Auto-called after 5-minute timer in OrderTracking.tsx
   * When status changes to 'complete', sets seen to false to trigger notification
   */
  const updateOrderStatus = (orderId: string, newStatus: 'processing' | 'complete' | 'out-for-delivery' | 'delivered') => {
    setOrders((prev) => 
      prev.map(order => 
        order.id === orderId 
          ? { 
              ...order, 
              status: newStatus, 
              seen: newStatus === 'complete' ? false : order.seen // New complete orders are unseen
            } 
          : order
      )
    );
  };

  /**
   * markOrderAsSeen
   * Marks order notification as viewed
   * Called when user views order details in NotificationDropdown
   */
  const markOrderAsSeen = (orderId: string) => {
    setOrders((prev) => 
      prev.map(order => 
        order.id === orderId ? { ...order, seen: true } : order
      )
    );
  };

  // ============================================================================
  // DISCOUNT SYSTEM FUNCTIONS
  // ============================================================================
  
  /**
   * addDiscount
   * Adds redeemed discount to user's account
   * Called when user clicks REDEEM on DiscountCard
   */
  const addDiscount = (discount: Discount) => {
    setDiscounts((prev) => [discount, ...prev]);
  };

  /**
   * redeemDiscount
   * Marks discount code as redeemed (used)
   * Prevents code from being used multiple times
   */
  const redeemDiscount = (discountId: string) => {
    setRedeemedDiscounts((prev) => [...prev, discountId]);
  };

  // ============================================================================
  // EVENT SYSTEM FUNCTIONS
  // ============================================================================
  
  /**
   * markEventAsSeen
   * Tracks which events user has viewed
   * Used for "NEW" badge visibility
   */
  const markEventAsSeen = (eventId: string) => {
    setSeenEventIds((prev) => [...prev, eventId]);
  };

  /**
   * saveEvent
   * Bookmarks event to user's saved events
   * Saved events appear in Profile page
   */
  const saveEvent = (eventId: string) => {
    setSavedEventIds((prev) => [...prev, eventId]);
  };

  /**
   * unsaveEvent
   * Removes event from user's saved events
   * Called from bookmark icon in EventCard or Profile page
   */
  const unsaveEvent = (eventId: string) => {
    setSavedEventIds((prev) => prev.filter(id => id !== eventId));
  };

  // ============================================================================
  // CONTEXT PROVIDER
  // ============================================================================
  
  /**
   * Provide all authentication and state management functions to child components
   * Any component wrapped by AuthProvider can access these via useAuth() hook
   */
  return (
    <AuthContext.Provider value={{ 
      // User Authentication
      user, 
      login, 
      logout, 
      isAuthenticated: !!user,  // Convert user object to boolean
      updateProfileImage,
      updateUser,
      
      // Order Management
      orders,
      addOrder,
      updateOrderStatus,
      markOrderAsSeen,
      
      // Discount System
      discounts,
      addDiscount,
      redeemedDiscounts,
      redeemDiscount,
      
      // Event Management
      seenEventIds,
      markEventAsSeen,
      savedEventIds,
      saveEvent,
      unsaveEvent,
      
      // Notifications
      hasNewNotification,
      setHasNewNotification
    }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth Hook
 * Custom hook to access AuthContext in components
 * 
 * Usage:
 * import { useAuth } from './components/AuthContext';
 * 
 * function MyComponent() {
 *   const { user, login, logout } = useAuth();
 *   // Use authentication functions
 * }
 * 
 * @throws Error if used outside AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
