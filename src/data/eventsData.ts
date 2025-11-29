/**
 * EVENTSDATA.TS - Shared Events Data
 * 
 * This file contains the centralized event data shared across:
 * - Announcement page (Events tab)
 * - Profile page (Saved Events section)
 * - Homepage (combines with news events)
 * 
 * Event Types:
 * - 'event': Gaming tournaments, competitions, live events
 * - 'update': News, announcements, product launches
 * 
 * Event Statuses:
 * - 'current': Event is happening now (Yellow badge)
 * - 'closed': Event has ended (Gray badge)
 * - 'soon': Event starting in future (Green badge)
 * 
 * Data Structure Fields:
 * - id: Unique identifier for event tracking
 * - title: Event name
 * - description: Short description for cards
 * - fullDescription: Detailed description for modal
 * - date: Start date (display format)
 * - endDate: End date for status calculation
 * - image: Event banner/thumbnail
 * - status: Current event status
 * - eventTime: Time range (e.g., "2:00 PM - 8:00 PM")
 * - eventDate: Full date range for display
 * - benefits: Array of benefits/features (shown with checkmarks)
 * - location: Event venue (online/physical)
 * - fbLink: Facebook event page link
 * - type: Event classification
 */

export const allEventsData = [
  // ============================================================================
  // CURRENT EVENTS (status: 'current')
  // ============================================================================
  
  {
    id: '1',
    title: 'Mobile Legends Bang Bang Championship',
    description: 'Join the ultimate MLBB tournament with massive prize pool. Battle it out with top players from around the region and claim your glory!',
    date: 'Nov 15, 2025',
    endDate: 'Nov 30, 2025',
    image: 'https://images.unsplash.com/photo-1612151388040-9ec75d2de8c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBldmVudCUyMHRvdXJuYW1lbnR8ZW58MXx8fHwxNzYyOTIyMjE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'current' as const,
    fullDescription: 'The Mobile Legends Bang Bang Championship returns with the biggest prize pool yet! This premier esports tournament brings together the best teams from across the region to compete for glory and amazing rewards. Experience intense 5v5 battles, strategic gameplay, and spectacular plays from professional MLBB players.',
    eventTime: '2:00 PM - 8:00 PM',
    eventDate: 'Nov 15 - Nov 30, 2025',
    benefits: [
      'Watch live professional matches',
      'Chance to win exclusive in-game items',
      'Meet and greet with pro players',
      'Learn advanced strategies and tips',
      'Participate in community events'
    ],
    location: 'Online Tournament',
    fbLink: 'https://facebook.com/events/mlbb-championship',
    type: 'event' as const
  },
  {
    id: '2',
    title: 'Genshin Impact Anniversary Celebration',
    description: 'Celebrate the anniversary with exclusive rewards, limited banners, and special in-game events. Don\'t miss out on the festivities!',
    date: 'Nov 20, 2025',
    endDate: 'Dec 5, 2025',
    image: 'https://images.unsplash.com/photo-1634454686481-dff1eaa44c21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1lJTIwcmV3YXJkcyUyMGNlbGVicmF0aW9ufGVufDF8fHx8MTc2MjkyMjIxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'current' as const,
    fullDescription: 'Join us in celebrating another amazing year of Genshin Impact! This anniversary event features exclusive rewards, limited character banners, special quests, and community activities that bring travelers together from all over Teyvat.',
    eventTime: 'All Day Event',
    eventDate: 'Nov 20 - Dec 5, 2025',
    benefits: [
      'Free primogems and wishes',
      'Limited anniversary banners',
      'Exclusive anniversary rewards',
      'Special anniversary questline',
      'Community celebration events'
    ],
    location: 'In-Game Event',
    fbLink: 'https://facebook.com/events/genshin-anniversary',
    type: 'event' as const
  },
  // ============================================================================
  // CLOSED EVENTS (status: 'closed')
  // ============================================================================
  
  {
    id: '3',
    title: 'Valorant Community Tournament',
    description: 'Showcase your tactical skills in this competitive Valorant tournament. Form your team and compete for exciting prizes and recognition.',
    date: 'Nov 10, 2025',
    endDate: 'Nov 12, 2025',
    image: 'https://images.unsplash.com/photo-1759709690954-8cd33574f022?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwY29tcGV0aXRpb258ZW58MXx8fHwxNzYyOTIyMjE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'closed' as const,
    fullDescription: 'Test your tactical prowess in our Valorant Community Tournament! Gather your squad and compete against other teams in intense 5v5 matches. This tournament is open to all skill levels and offers exciting prizes for top performers.',
    eventTime: '1:00 PM - 10:00 PM',
    eventDate: 'Nov 10 - Nov 12, 2025',
    benefits: [
      'Compete for cash prizes',
      'Gain tournament experience',
      'Network with other players',
      'Improve tactical skills',
      'Receive participant rewards'
    ],
    location: 'Online Tournament',
    fbLink: 'https://facebook.com/events/valorant-community',
    type: 'event' as const
  },
  {
    id: '4',
    title: 'Call of Duty Mobile Season Launch',
    description: 'New season brings new challenges, weapons, and battle passes. Get ready to dominate the battlefield with fresh content!',
    date: 'Oct 28, 2025',
    endDate: 'Nov 5, 2025',
    image: 'https://images.unsplash.com/photo-1725272532764-183d164c722b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb21tdW5pdHl8ZW58MXx8fHwxNzYyOTIxODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'closed' as const,
    fullDescription: 'The new Call of Duty Mobile season has arrived! Experience fresh content including new weapons, operators, maps, and a brand new battle pass filled with exclusive rewards. Join millions of players worldwide in this action-packed update.',
    eventTime: 'Season Duration',
    eventDate: 'Oct 28 - Nov 5, 2025',
    benefits: [
      'New weapons and equipment',
      'Exclusive battle pass rewards',
      'Fresh maps and modes',
      'Seasonal challenges',
      'Limited-time events'
    ],
    location: 'In-Game Event',
    fbLink: 'https://facebook.com/events/codm-season',
    type: 'event' as const
  },
  // ============================================================================
  // UPCOMING EVENTS (status: 'soon')
  // ============================================================================
  
  {
    id: '5',
    title: 'Holiday Special Sale Event',
    description: 'Get ready for the biggest sale of the year! Massive discounts on game credits, premium accounts, and exclusive items.',
    date: 'Dec 20, 2025',
    endDate: 'Jan 5, 2026',
    image: 'https://images.unsplash.com/photo-1677693972403-db681288b5da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0cGxhY2V8ZW58MXx8fHwxNzYyODY3NjQyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'soon' as const,
    fullDescription: 'Our biggest sale event of the year is coming! Enjoy massive discounts on game credits, premium subscriptions, and exclusive items. Stock up on your favorites and discover new games and services at unbeatable prices.',
    eventTime: 'All Day Sale',
    eventDate: 'Dec 20, 2025 - Jan 5, 2026',
    benefits: [
      'Up to 50% off on selected items',
      'Exclusive bundle deals',
      'Bonus credits on purchases',
      'Limited edition items',
      'Daily flash sales'
    ],
    location: 'Choen Marketplace',
    fbLink: 'https://facebook.com/events/holiday-sale',
    type: 'event' as const
  },
  {
    id: '6',
    title: 'Free Fire Max Grand Finals',
    description: 'Watch the best squads battle for supremacy in the Free Fire Max championship. Vote for your favorite team and win rewards!',
    date: 'Dec 15, 2025',
    endDate: 'Dec 18, 2025',
    image: 'https://images.unsplash.com/photo-1612151388040-9ec75d2de8c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBldmVudCUyMHRvdXJuYW1lbnR8ZW58MXx8fHwxNzYyOTIyMjE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'soon' as const,
    fullDescription: 'The Free Fire Max Grand Finals are here! Watch elite squads from around the world compete for the championship title. Vote for your favorite team, participate in community predictions, and win exclusive in-game rewards.',
    eventTime: '3:00 PM - 9:00 PM',
    eventDate: 'Dec 15 - Dec 18, 2025',
    benefits: [
      'Watch world-class gameplay',
      'Vote for your favorite team',
      'Win exclusive rewards',
      'Participate in predictions',
      'Join community viewing parties'
    ],
    location: 'Online Championship',
    fbLink: 'https://facebook.com/events/freefire-finals',
    type: 'event' as const
  },
];
