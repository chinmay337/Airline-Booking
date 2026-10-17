// Reducer for managing the multi-step luxury flight booking workflow

export const BOOKING_STEPS = {
  REVIEW: 1,       // Review flight itinerary & cabin amenities
  SEAT_MAP: 2,     // Interactive first class suite & seat selection
  PASSENGERS: 3,   // Passenger credentials & contact details
  ADDONS: 4,       // Curated concierge enhancements & fine dining
  CONFIRMATION: 5  // Booking review, PNR generation & confirmation
};

export const AVAILABLE_ADDONS = [
  {
    id: 'addon-maybach',
    name: 'Rolls-Royce / Maybach Chauffeur Transfer',
    description: 'Direct tarmac apron gate-to-door luxury ground transfer with certified chauffeur.',
    priceUSD: 350
  },
  {
    id: 'addon-caviar',
    name: 'Imperial Beluga Caviar Reserve (50g)',
    description: 'Chilled Oscietra & Beluga caviar served with mother-of-pearl spoon and blinis.',
    priceUSD: 420
  },
  {
    id: 'addon-champagne',
    name: 'Vintage Dom Pérignon P2 Pairing',
    description: 'Bottle of Dom Pérignon Plénitude Deuxième Vintage 2004 cellared to perfection.',
    priceUSD: 580
  },
  {
    id: 'addon-fasttrack',
    name: 'VIP Diplomatic Fast-Track & Private Immigration Salon',
    description: 'Bypass all commercial terminal queues with dedicated private immigration escort.',
    priceUSD: 290
  }
];

export const INITIAL_BOOKING_STATE = {
  step: BOOKING_STEPS.REVIEW,
  flight: null,
  travelDate: '',
  passengerCount: 1,
  passengers: [
    { title: 'Mr.', firstName: '', lastName: '', passport: '', email: '', phone: '' }
  ],
  selectedSeat: '1A (Window Suite)',
  mealPreference: 'Gourmet French Haute Cuisine',
  specialRequests: '',
  selectedAddOns: [],
  errors: {},
  isSubmitting: false,
  isConfirmed: false,
  confirmedBooking: null
};

export function bookingReducer(state, action) {
  switch (action.type) {
    case 'START_BOOKING': {
      const flight = action.payload.flight;
      const travelDate = action.payload.travelDate || new Date().toISOString().split('T')[0];
      const count = action.payload.passengerCount || 1;
      
      const passengers = Array.from({ length: count }, (_, i) => ({
        title: 'Mr.',
        firstName: i === 0 ? '' : '',
        lastName: '',
        passport: '',
        email: '',
        phone: ''
      }));

      return {
        ...INITIAL_BOOKING_STATE,
        flight,
        travelDate,
        passengerCount: count,
        passengers,
        step: BOOKING_STEPS.REVIEW
      };
    }

    case 'SET_STEP':
      return {
        ...state,
        step: action.payload,
        errors: {}
      };

    case 'NEXT_STEP':
      return {
        ...state,
        step: Math.min(state.step + 1, 5),
        errors: {}
      };

    case 'PREV_STEP':
      return {
        ...state,
        step: Math.max(state.step - 1, 1),
        errors: {}
      };

    case 'SELECT_SEAT':
      return {
        ...state,
        selectedSeat: action.payload
      };

    case 'UPDATE_PASSENGER': {
      const { index, field, value } = action.payload;
      const updatedPassengers = [...state.passengers];
      updatedPassengers[index] = {
        ...updatedPassengers[index],
        [field]: value
      };
      return {
        ...state,
        passengers: updatedPassengers,
        errors: {
          ...state.errors,
          [`p_${index}_${field}`]: null
        }
      };
    }

    case 'TOGGLE_ADDON': {
      const addon = action.payload;
      const exists = state.selectedAddOns.some(a => a.id === addon.id);
      const updatedAddOns = exists
        ? state.selectedAddOns.filter(a => a.id !== addon.id)
        : [...state.selectedAddOns, addon];
      return {
        ...state,
        selectedAddOns: updatedAddOns
      };
    }

    case 'SET_MEAL_PREFERENCE':
      return {
        ...state,
        mealPreference: action.payload
      };

    case 'SET_SPECIAL_REQUESTS':
      return {
        ...state,
        specialRequests: action.payload
      };

    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload
      };

    case 'CONFIRM_BOOKING_SUCCESS': {
      return {
        ...state,
        step: BOOKING_STEPS.CONFIRMATION,
        isConfirmed: true,
        confirmedBooking: action.payload
      };
    }

    case 'RESET_BOOKING':
      return INITIAL_BOOKING_STATE;

    default:
      return state;
  }
}
