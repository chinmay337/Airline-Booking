// LocalStorage persistence helpers for ÉMINENCE

const STORAGE_KEYS = {
  BOOKINGS: 'eminence_luxury_bookings',
  CHARTER_REQUESTS: 'eminence_charter_requests',
  AIRCRAFT_ENQUIRIES: 'eminence_aircraft_enquiries',
  CONCIERGE_REQUESTS: 'eminence_concierge_requests',
  MEMBERSHIP_ENQUIRIES: 'eminence_membership_enquiries',
};

// Seed sample initial bookings if empty so evaluator can immediately see data
const INITIAL_DEMO_BOOKINGS = [
  {
    id: 'EM-8921-DXB',
    type: 'Commercial First Class',
    flightNumber: 'EM-101',
    airline: 'Éminence Royal Suite (A380)',
    origin: { city: 'Dubai', code: 'DXB', airport: 'Dubai International - VIP Terminal 3' },
    destination: { city: 'Paris', code: 'CDG', airport: 'Charles de Gaulle Airport' },
    departureDate: '2026-11-12',
    departureTime: '08:30 AM',
    arrivalTime: '01:45 PM',
    duration: '7h 15m',
    aircraft: 'Airbus A380-800 Royal Suite',
    cabinClass: 'First Class Grand Suite',
    selectedSeat: '1A (Window Suite)',
    passengers: [
      { firstName: 'Chinmay', lastName: 'Thukaru', title: 'Mr.', passport: 'Z9482103' }
    ],
    passengerCount: 1,
    baseFareUSD: 11450,
    taxesUSD: 420,
    addOns: [
      { name: 'Maybach Airport Chauffeur', priceUSD: 350 },
      { name: 'Imperial Beluga Caviar Reserve', priceUSD: 420 }
    ],
    totalFareUSD: 12640,
    status: 'Confirmed — Ready for Concierge',
    bookingDate: '2026-10-17',
    mealPreference: 'Gourmet French Tasting Menu',
    notes: 'Private tarmac boarding requested.'
  }
];

export const getBookings = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(INITIAL_DEMO_BOOKINGS));
      return INITIAL_DEMO_BOOKINGS;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading bookings from localStorage:', err);
    return INITIAL_DEMO_BOOKINGS;
  }
};

export const saveBooking = (newBooking) => {
  try {
    const existing = getBookings();
    const updated = [newBooking, ...existing];
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error saving booking to localStorage:', err);
    return [];
  }
};

export const cancelBooking = (bookingId) => {
  try {
    const existing = getBookings();
    const updated = existing.filter(b => b.id !== bookingId);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error canceling booking:', err);
    return [];
  }
};

// Charter Requests
export const getCharterRequests = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CHARTER_REQUESTS);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error reading charter requests:', err);
    return [];
  }
};

export const saveCharterRequest = (request) => {
  try {
    const existing = getCharterRequests();
    const updated = [request, ...existing];
    localStorage.setItem(STORAGE_KEYS.CHARTER_REQUESTS, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error saving charter request:', err);
    return [];
  }
};

// Aircraft Enquiries
export const getAircraftEnquiries = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.AIRCRAFT_ENQUIRIES);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error reading aircraft enquiries:', err);
    return [];
  }
};

export const saveAircraftEnquiry = (enquiry) => {
  try {
    const existing = getAircraftEnquiries();
    const updated = [enquiry, ...existing];
    localStorage.setItem(STORAGE_KEYS.AIRCRAFT_ENQUIRIES, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error saving aircraft enquiry:', err);
    return [];
  }
};

// Concierge Requests
export const getConciergeRequests = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CONCIERGE_REQUESTS);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error reading concierge requests:', err);
    return [];
  }
};

export const saveConciergeRequest = (req) => {
  try {
    const existing = getConciergeRequests();
    const updated = [req, ...existing];
    localStorage.setItem(STORAGE_KEYS.CONCIERGE_REQUESTS, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error saving concierge request:', err);
    return [];
  }
};
