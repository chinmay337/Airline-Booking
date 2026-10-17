// ÉMINENCE Membership Programme Dataset

export const MEMBERSHIP_TIERS = [
  {
    id: 'prive',
    name: 'Privé',
    badge: 'Executive Circle',
    tagline: 'Refined access for the frequent transcontinental traveler.',
    annualDepositUSD: 50000,
    depositDisplay: '$50,000 Deposit',
    availabilityGuarantee: '24 Hours Notice Worldwide',
    fleetAccess: 'Very Light & Light Jet Fleet Priority',
    emptyLegDiscount: '15% Preferential Rates',
    benefits: [
      'Guaranteed aircraft availability with 24 hours notice',
      'No peak-period blackout dates or repositioning surcharges on core routes',
      'Dedicated 24/7 aviation desk and concierge coordinator',
      'Complimentary luxury ground chauffeur on all First Class flights',
      'Access to exclusive private terminal lounges in 45 global hubs',
      'Curated champagne greeting and tailored cabin catering'
    ],
    accentColor: '#94A3B8' // Platinum
  },
  {
    id: 'elite',
    name: 'Élite',
    badge: 'Distinguished Member',
    isPopular: true,
    tagline: 'Commanding power, reduced call-out windows, and seamless transcontinental freedom.',
    annualDepositUSD: 150000,
    depositDisplay: '$150,000 Deposit',
    availabilityGuarantee: '10 Hours Notice Worldwide',
    fleetAccess: 'Full Access: Super-Midsize & Heavy Fleet Guaranteed',
    emptyLegDiscount: '30% Preferential Rates',
    benefits: [
      'Guaranteed aircraft availability with only 10 hours notice',
      'Complimentary twin-engine helicopter transfers in London, Paris, NYC & Dubai',
      'Zero repositioning fees within Continental Europe and North America',
      'Dedicated senior lifestyle and aviation director assigned to family office',
      'Access to off-market private aircraft sales listings before public release',
      'Complimentary upgrades to Grand Suite on partner commercial airlines',
      'Pre-stocked wine and cigar humidors tailored to personal preferences'
    ],
    accentColor: '#D4AF37' // Brushed Champagne Gold
  },
  {
    id: 'sovereign',
    name: 'Sovereign',
    badge: 'By Invitation Only',
    tagline: 'The absolute zenith of private aviation, bespoke diplomacy, and royal privilege.',
    annualDepositUSD: 350000,
    depositDisplay: '$350,000 Deposit (Invitation Only)',
    availabilityGuarantee: '4 Hours Notice Worldwide',
    fleetAccess: 'Unrestricted Access to Ultra-Long-Range Flagships (G700 & Global 7500)',
    emptyLegDiscount: '50% Preferential Rates / Priority Lock',
    benefits: [
      'Guaranteed aircraft on the tarmac anywhere in the world within 4 hours',
      'Unlimited complimentary door-to-door helicopter and Maybach transfers',
      'Global diplomatic fast-track immigration and private tarmac ramp access',
      'Direct line to ÉMINENCE Executive Committee and Chief Flight Dispatcher',
      'Aircraft cabin tailored with bespoke family crests, monogrammed linens, and art',
      'Private Sommelier and 3-Michelin-Star chef available for in-flight service',
      'Worldwide medical evacuation and private tactical security escorts'
    ],
    accentColor: '#E6CA65' // Royal Gold
  }
];
