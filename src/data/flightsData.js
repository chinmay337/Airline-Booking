// Luxury Commercial Airline First Class Suites & Flights Dataset

export const LUXURY_FLIGHTS = [
  {
    id: 'FL-EM-01',
    flightNumber: 'EM-101',
    airline: 'ÉMINENCE Privé by Emirates',
    cabinName: 'Game Changer Enclosed Suite',
    aircraft: 'Boeing 777-300ER First Suite',
    origin: {
      city: 'Dubai',
      code: 'DXB',
      airport: 'Dubai International (Terminal 3 First Concourse)',
      timezone: 'GST'
    },
    destination: {
      city: 'Paris',
      code: 'CDG',
      airport: 'Charles de Gaulle Airport (VIP Terminal 1)',
      timezone: 'CET'
    },
    departureTime: '08:15 AM',
    arrivalTime: '01:30 PM',
    duration: '7h 15m',
    isDirect: true,
    priceUSD: 11800,
    seatsRemaining: 3,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    suiteImage: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80',
    amenities: [
      'Floor-to-ceiling sliding privacy doors',
      'Zero-gravity leather seating inspired by NASA',
      'Virtual windows with real-time fiber-optic views',
      'Dom Pérignon Vintage 2013 on demand',
      'Personal mini-bar with temperature control',
      'Bespoke Bulgari amenity kit & Hydra Active lounge wear'
    ],
    dining: 'Seven-course royal Arabic & French fusion tasting menu curated by Michelin 3-star chefs.',
    baggage: '3 x 32kg checked baggage + 2 x 10kg luxury carry-on + priority tarmac valet'
  },
  {
    id: 'FL-SQ-02',
    flightNumber: 'SQ-026',
    airline: 'ÉMINENCE Grand by Singapore Airlines',
    cabinName: 'Double Bed Grand Suite',
    aircraft: 'Airbus A380-800 Flagship',
    origin: {
      city: 'Singapore',
      code: 'SIN',
      airport: 'Singapore Changi (Private Jet Pier & Jewel Suites)',
      timezone: 'SGT'
    },
    destination: {
      city: 'Tokyo',
      code: 'HND',
      airport: 'Tokyo Haneda (Imperial VIP Wing)',
      timezone: 'JST'
    },
    departureTime: '10:45 AM',
    arrivalTime: '06:50 PM',
    duration: '7h 05m',
    isDirect: true,
    priceUSD: 13200,
    seatsRemaining: 2,
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    suiteImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
    amenities: [
      '50 sq ft private bedroom with standalone double bed',
      'Separate Poltrona Frau swivel leather armchair',
      '32-inch 4K touchscreen monitor with Bang & Olufsen sound',
      'Krug Clos d’Ambonnay champagne pairing',
      'Spacious en-suite private dressing room with vanity table',
      'Lalique crystal glassware and bespoke silk pyjamas'
    ],
    dining: 'Book the Cook exclusive menu: Lobster Thermidor & Kaviari Oscietre Caviar.',
    baggage: '3 x 35kg checked baggage + 2 luxury cabin bags'
  },
  {
    id: 'FL-EY-03',
    flightNumber: 'EY-411',
    airline: 'ÉMINENCE Sovereign by Etihad',
    cabinName: 'The Residence Three-Room Penthouse',
    aircraft: 'Airbus A380-800 Penthouse Edition',
    origin: {
      city: 'London',
      code: 'LHR',
      airport: 'London Heathrow (The Private Suite Windsor Wing)',
      timezone: 'GMT'
    },
    destination: {
      city: 'Dubai',
      code: 'DXB',
      airport: 'Dubai International (Royal Protocol Concourse)',
      timezone: 'GST'
    },
    departureTime: '01:20 PM',
    arrivalTime: '11:40 PM',
    duration: '7h 20m',
    isDirect: true,
    priceUSD: 18500,
    seatsRemaining: 1,
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    suiteImage: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
    amenities: [
      'Only 3-room cabin in commercial skies: Living room, Double bedroom & En-suite Shower',
      'Private Butler trained at the Savoy Butler Academy',
      'Full-size shower spa with Acqua di Parma toiletries',
      'Poltrona Frau double-seat sofa with Ottoman',
      'Private chef on board crafting personalized tasting journeys',
      'Rolls-Royce Phantom tarmac gate-to-door transfer'
    ],
    dining: 'Custom caviar service with 24k gold leaf presentation, Vintage Taittinger Comtes.',
    baggage: 'Unlimited baggage allowance within aircraft weight parameters'
  },
  {
    id: 'FL-LH-04',
    flightNumber: 'LH-402',
    airline: 'ÉMINENCE Reserve by Lufthansa',
    cabinName: 'Allegris First Class Suite Plus',
    aircraft: 'Airbus A350-900 Modern Flagship',
    origin: {
      city: 'Zurich',
      code: 'ZRH',
      airport: 'Zurich Kloten (Swiss VIP Terminal Lounge)',
      timezone: 'CET'
    },
    destination: {
      city: 'Singapore',
      code: 'SIN',
      airport: 'Singapore Changi (First Class Pier)',
      timezone: 'SGT'
    },
    departureTime: '10:15 PM',
    arrivalTime: '04:45 PM (+1)',
    duration: '12h 30m',
    isDirect: true,
    priceUSD: 14700,
    seatsRemaining: 4,
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    suiteImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
    amenities: [
      'Individually heated and cooled ceiling-high private suite',
      'Wireless device charging integrated into oak console',
      'Noise-canceling Bose QuietComfort over-ear audio',
      'Augustinus Bader bespoke anti-fatigue skincare kit',
      'Surround cinematic lighting with circadian rhythm synchronization'
    ],
    dining: 'Swiss Alpine culinary heritage tasting with rare Bordeaux Grand Cru wines.',
    baggage: '3 x 32kg checked baggage + 2 cabin bags'
  },
  {
    id: 'FL-AF-05',
    flightNumber: 'AF-008',
    airline: 'ÉMINENCE Haute by Air France',
    cabinName: 'La Première Haute Couture Suite',
    aircraft: 'Boeing 777-300ER Designer Edition',
    origin: {
      city: 'Paris',
      code: 'CDG',
      airport: 'Charles de Gaulle (La Première Salon with Sisley Spa)',
      timezone: 'CET'
    },
    destination: {
      city: 'New York',
      code: 'JFK',
      airport: 'John F. Kennedy (Terminal 1 Private Customs Pier)',
      timezone: 'EST'
    },
    departureTime: '01:50 PM',
    arrivalTime: '04:15 PM',
    duration: '8h 25m',
    isDirect: true,
    priceUSD: 15400,
    seatsRemaining: 2,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    suiteImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    amenities: [
      'Thick tweed privacy curtains creating a French boudoir sanctuary',
      'Sofitel MyBed memory foam mattress with fluffy duvet',
      'Hermès Paris designer amenity pouch and cashmere slippers',
      'Exclusive Porsche 911 tarmac chauffeur right to aircraft steps',
      'Pre-flight 30-minute Sisley facial in the private Paris salon'
    ],
    dining: 'Alain Ducasse menu: Pan-seared foie gras, black truffle soup, Ruinart Blanc de Blancs.',
    baggage: '3 x 32kg checked baggage + 2 x 12kg carry-on'
  },
  {
    id: 'FL-QR-06',
    flightNumber: 'QR-701',
    airline: 'ÉMINENCE Q-Imperial by Qatar Airways',
    cabinName: 'Qsuite Quad Royale',
    aircraft: 'Airbus A350-1000 Ultra',
    origin: {
      city: 'New York',
      code: 'JFK',
      airport: 'John F. Kennedy (Chelsea First Lounge)',
      timezone: 'EST'
    },
    destination: {
      city: 'London',
      code: 'LHR',
      airport: 'London Heathrow (Terminal 4 Al Safwa Pier)',
      timezone: 'GMT'
    },
    departureTime: '07:30 PM',
    arrivalTime: '07:45 AM (+1)',
    duration: '7h 15m',
    isDirect: true,
    priceUSD: 9800,
    seatsRemaining: 5,
    image: 'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=1200&q=80',
    suiteImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    amenities: [
      'Quad configuration convertible into a private conference or dining room',
      'Double bed with White Company London linens',
      'Oryx One interactive entertainment with 4,000+ choices',
      'Diptyque Paris bespoke luxury fragrance set',
      'Dine on demand anytime throughout the transatlantic crossing'
    ],
    dining: 'Beluga caviar, Gulf spiced tiger prawns, and rare Armagnac.',
    baggage: '3 x 32kg checked baggage + 2 carry-on bags'
  },
  {
    id: 'FL-EM-07',
    flightNumber: 'EM-408',
    airline: 'ÉMINENCE Privé by Emirates',
    cabinName: 'Shower Spa Grand Suite',
    aircraft: 'Airbus A380-800 Shower Spa Edition',
    origin: {
      city: 'Dubai',
      code: 'DXB',
      airport: 'Dubai International (Terminal 3 First Concourse)',
      timezone: 'GST'
    },
    destination: {
      city: 'Maldives',
      code: 'MLE',
      airport: 'Velana International (Private Seaplane Lounge)',
      timezone: 'MVT'
    },
    departureTime: '09:20 AM',
    arrivalTime: '02:30 PM',
    duration: '4h 10m',
    isDirect: true,
    priceUSD: 8900,
    seatsRemaining: 4,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    suiteImage: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
    amenities: [
      'Onboard Shower Spa with heated marble floors & VOYA organic seaweed cosmetics',
      'Hors d\'oeuvres & cocktails at the 40,000-foot Onboard Lounge',
      'Electrically operated private wardrobe and vanity mirror',
      'Direct seaplane escort to private overwater villa upon arrival'
    ],
    dining: 'Maldivian reef lobster curry, chilled champagne, and exotic tropical fruit platters.',
    baggage: '3 x 32kg checked baggage + full scuba/water gear allowance'
  },
  {
    id: 'FL-JL-08',
    flightNumber: 'JL-001',
    airline: 'ÉMINENCE Sukiya by Japan Airlines',
    cabinName: 'A350-1000 First Class Sukiya Suite',
    aircraft: 'Airbus A350-1000 Japan Edition',
    origin: {
      city: 'Tokyo',
      code: 'HND',
      airport: 'Tokyo Haneda (Imperial First Lounge)',
      timezone: 'JST'
    },
    destination: {
      city: 'Paris',
      code: 'CDG',
      airport: 'Charles de Gaulle (Terminal 2E VIP)',
      timezone: 'CET'
    },
    departureTime: '11:00 AM',
    arrivalTime: '06:40 PM',
    duration: '14h 40m',
    isDirect: true,
    priceUSD: 16800,
    seatsRemaining: 2,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    suiteImage: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    amenities: [
      'Japanese traditional woodgrain architecture with tatami accents',
      'Airweave custom dual-firmness mattress and Nishikawa down pillow',
      'Headrest-integrated speakers (no headphones needed for immersive audio)',
      '43-inch 4K monitor (largest in commercial aviation)',
      'Shiseido Men & Clé de Peau Beauté prestige skincare amenities'
    ],
    dining: 'Michelin 3-star Kaiseki experience by Chef Ishikawa with rare Junmai Daiginjo Sake.',
    baggage: '3 x 32kg checked baggage + bespoke kimono travel garment bag'
  }
];

export const AIRPORTS_LIST = [
  { city: 'Dubai', code: 'DXB', country: 'United Arab Emirates' },
  { city: 'Paris', code: 'CDG', country: 'France' },
  { city: 'London', code: 'LHR', country: 'United Kingdom' },
  { city: 'Singapore', code: 'SIN', country: 'Singapore' },
  { city: 'Tokyo', code: 'HND', country: 'Japan' },
  { city: 'New York', code: 'JFK', country: 'United States' },
  { city: 'Maldives', code: 'MLE', country: 'Maldives' },
  { city: 'Zurich', code: 'ZRH', country: 'Switzerland' },
  { city: 'Los Angeles', code: 'LAX', country: 'United States' }
];
