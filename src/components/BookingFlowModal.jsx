import React, { useReducer } from 'react';
import {
  X, Check, Shield, User, Plane, Sparkles, ChevronRight, ChevronLeft,
  CreditCard
} from 'lucide-react';
import {
  bookingReducer,
  INITIAL_BOOKING_STATE,
  BOOKING_STEPS,
  AVAILABLE_ADDONS
} from '../reducers/bookingReducer';
import { formatPrice } from '../utils/currency';
import { saveBooking } from '../utils/storage';

const SUITE_LAYOUT = [
  { id: '1A', name: 'Suite 1A (Private Window Sanctuary)', status: 'available', features: 'Left Window, Double Wardrobe' },
  { id: '1E', name: 'Suite 1E (Center Royal Honeymoon)', status: 'available', features: 'Center, Convertible Double Bed' },
  { id: '1F', name: 'Suite 1F (Center Royal Honeymoon)', status: 'reserved', features: 'Center, Reserved' },
  { id: '1K', name: 'Suite 1K (Private Window Sanctuary)', status: 'available', features: 'Right Window, Zero-Gravity' },
  { id: '2A', name: 'Suite 2A (Private Window Executive)', status: 'available', features: 'Left Window, Extended Desk' },
  { id: '2E', name: 'Suite 2E (Center Executive Suite)', status: 'reserved', features: 'Center, Reserved' },
  { id: '2F', name: 'Suite 2F (Center Executive Suite)', status: 'available', features: 'Center, Silk Partition' },
  { id: '2K', name: 'Suite 2K (Private Window Executive)', status: 'available', features: 'Right Window, Shower Spa Proximity' }
];

export default function BookingFlowModal({
  flight,
  travelDate = new Date().toISOString().split('T')[0],
  passengerCount = 1,
  currency = 'USD',
  onClose,
  onBookingCompleted
}) {
  const [state, dispatch] = useReducer(bookingReducer, {
    ...INITIAL_BOOKING_STATE,
    flight,
    travelDate,
    passengerCount,
    passengers: Array.from({ length: passengerCount }, () => ({
      title: 'Mr.',
      firstName: '',
      lastName: '',
      passport: '',
      email: '',
      phone: ''
    }))
  });

  const {
    step,
    passengers,
    selectedSeat,
    mealPreference,
    specialRequests,
    selectedAddOns,
    errors,
    isConfirmed,
    confirmedBooking
  } = state;

  // Pricing calculations
  const baseFareUSD = (flight?.priceUSD || 10000) * passengerCount;
  const taxesUSD = Math.round(baseFareUSD * 0.05); // 5% luxury aviation surcharge & landing fees
  const addOnsTotalUSD = selectedAddOns.reduce((sum, item) => sum + item.priceUSD, 0);
  const totalFareUSD = baseFareUSD + taxesUSD + addOnsTotalUSD;

  // Validation before proceeding from Step 3 (Passengers)
  const validatePassengersStep = () => {
    const errs = {};
    passengers.forEach((p, idx) => {
      if (!p.firstName.trim()) errs[`p_${idx}_firstName`] = 'First name is required.';
      if (!p.lastName.trim()) errs[`p_${idx}_lastName`] = 'Last name is required.';
      if (!p.passport.trim()) errs[`p_${idx}_passport`] = 'Passport number is required.';
      if (idx === 0) {
        if (!p.email.trim() || !p.email.includes('@')) {
          errs[`p_${idx}_email`] = 'A valid VIP contact email is required.';
        }
        if (!p.phone.trim()) {
          errs[`p_${idx}_phone`] = 'Phone number is required for concierge coordination.';
        }
      }
    });

    if (Object.keys(errs).length > 0) {
      dispatch({ type: 'SET_ERRORS', payload: errs });
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (step === BOOKING_STEPS.PASSENGERS) {
      if (!validatePassengersStep()) return;
    }
    dispatch({ type: 'NEXT_STEP' });
  };

  const handlePrevStep = () => {
    dispatch({ type: 'PREV_STEP' });
  };

  const handleConfirmReservation = () => {
    // Generate unique PNR like EM-8492-DXB
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const pnr = `EM-${randomDigits}-${flight.destination.code}`;

    const newBooking = {
      id: pnr,
      type: 'Commercial First Class',
      flightNumber: flight.flightNumber,
      airline: flight.airline,
      cabinClass: flight.cabinName,
      aircraft: flight.aircraft,
      origin: flight.origin,
      destination: flight.destination,
      departureDate: travelDate,
      departureTime: flight.departureTime,
      arrivalTime: flight.arrivalTime,
      duration: flight.duration,
      passengerCount,
      passengers,
      selectedSeat,
      mealPreference,
      specialRequests,
      addOns: selectedAddOns,
      baseFareUSD,
      taxesUSD,
      totalFareUSD,
      status: 'Confirmed — Demonstration Ready',
      bookingDate: new Date().toISOString().split('T')[0]
    };

    saveBooking(newBooking);
    dispatch({ type: 'CONFIRM_BOOKING_SUCCESS', payload: newBooking });
    if (onBookingCompleted) {
      onBookingCompleted(newBooking);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '900px' }}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span className="badge badge-gold">
                <Sparkles size={11} /> Step {step} of 5
              </span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {step === 1 && 'Itinerary & Suite Overview'}
                {step === 2 && 'First Class Suite Selection'}
                {step === 3 && 'Guest Credentials & Contact'}
                {step === 4 && 'Concierge Enhancements'}
                {step === 5 && 'Demonstration Confirmation'}
              </span>
            </div>
          </div>
          <button className="btn-close" onClick={onClose} aria-label="Close booking modal">
            <X size={20} />
          </button>
        </div>

        {/* Progress Bar Indicator */}
        <div style={{ height: '3px', background: 'rgba(255, 255, 255, 0.08)', width: '100%' }}>
          <div
            style={{
              height: '100%',
              background: 'var(--gold-gradient)',
              width: `${(step / 5) * 100}%`,
              transition: 'width 0.35s ease',
              boxShadow: '0 0 10px rgba(212, 175, 55, 0.8)'
            }}
          />
        </div>

        {/* Modal Content Body */}
        <div className="modal-body" style={{ minHeight: '380px' }}>
          
          {/* STEP 1: ITINERARY REVIEW */}
          {step === BOOKING_STEPS.REVIEW && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                    {flight.airline}
                  </h3>
                  <div style={{ color: 'var(--gold-light)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Plane size={15} />
                    <span>{flight.aircraft} • {flight.flightNumber}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="form-label">Date of Journey</span>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                    {travelDate}
                  </div>
                </div>
              </div>

              {/* Route Summary Box */}
              <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem', background: 'rgba(212, 175, 55, 0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>{flight.origin.code}</div>
                    <div style={{ color: 'var(--gold-light)', fontWeight: 600 }}>{flight.departureTime}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{flight.origin.city}</div>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{flight.duration} Non-Stop</span>
                    <div style={{ width: '120px', height: '2px', background: 'var(--border-gold)', margin: '8px auto', position: 'relative' }}>
                      <Plane size={13} color="var(--gold-primary)" style={{ position: 'absolute', top: '-6px', left: '45%' }} />
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--gold-light)' }}>Direct Suite Service</span>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>{flight.destination.code}</div>
                    <div style={{ color: 'var(--gold-light)', fontWeight: 600 }}>{flight.arrivalTime}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{flight.destination.city}</div>
                  </div>
                </div>
              </div>

              {/* Suite Inclusions Preview */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
                  Complimentary Suite Privileges
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.6rem' }}>
                  {flight.amenities.slice(0, 4).map((am, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      <Check size={14} color="var(--gold-primary)" />
                      <span>{am}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Preview */}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(0, 0, 0, 0.4)', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>
                  Demonstration Base Fare ({passengerCount} {passengerCount === 1 ? 'Guest' : 'Guests'})
                </span>
                <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--gold-light)' }}>
                  {formatPrice(baseFareUSD, currency)}
                </span>
              </div>
            </div>
          )}

          {/* STEP 2: INTERACTIVE FIRST CLASS SUITE SELECTION */}
          {step === BOOKING_STEPS.SEAT_MAP && (
            <div>
              <div style={{ marginBottom: '1.25rem', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  Select Your Private Suite
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  First Class Cabin — Ultra-wide 1-2-1 enclosed layout with sliding privacy partition.
                </p>
              </div>

              {/* Cockpit Indicator */}
              <div
                style={{
                  width: '180px',
                  margin: '0 auto 1.5rem',
                  padding: '0.35rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(212, 175, 55, 0.1)',
                  border: '1px solid var(--border-gold)',
                  fontSize: '0.72rem',
                  color: 'var(--gold-light)',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}
              >
                ▲ Flight Deck Forward
              </div>

              {/* Interactive Cabin Layout */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '1rem',
                  maxWidth: '650px',
                  margin: '0 auto 1.5rem',
                  padding: '1.25rem',
                  background: 'rgba(0, 0, 0, 0.45)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                {SUITE_LAYOUT.map((suite) => {
                  const isSelected = selectedSeat.startsWith(suite.id);
                  const isReserved = suite.status === 'reserved';

                  return (
                    <button
                      key={suite.id}
                      type="button"
                      disabled={isReserved}
                      onClick={() => dispatch({ type: 'SELECT_SEAT', payload: suite.name })}
                      style={{
                        padding: '1rem 0.6rem',
                        borderRadius: 'var(--radius-sm)',
                        border: isSelected
                          ? '2px solid var(--gold-primary)'
                          : isReserved
                          ? '1px dashed rgba(255, 255, 255, 0.1)'
                          : '1px solid rgba(212, 175, 55, 0.3)',
                        background: isSelected
                          ? 'rgba(212, 175, 55, 0.25)'
                          : isReserved
                          ? 'rgba(255, 255, 255, 0.02)'
                          : 'rgba(18, 25, 40, 0.8)',
                        cursor: isReserved ? 'not-allowed' : 'pointer',
                        color: isReserved ? 'var(--text-muted)' : 'var(--text-primary)',
                        transition: 'all var(--transition-fast)',
                        boxShadow: isSelected ? '0 0 15px rgba(212, 175, 55, 0.4)' : 'none',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                        {suite.id}
                      </div>
                      <div style={{ fontSize: '0.65rem', marginTop: '4px', color: isSelected ? 'var(--gold-light)' : 'var(--text-muted)' }}>
                        {isReserved ? 'Occupied' : isSelected ? 'Selected' : 'Available'}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Seat Details Banner */}
              <div
                style={{
                  maxWidth: '650px',
                  margin: '0 auto',
                  padding: '0.85rem 1.25rem',
                  background: 'rgba(212, 175, 55, 0.08)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Selected Suite:</span>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--gold-light)' }}>
                    {selectedSeat}
                  </div>
                </div>
                <span className="badge badge-gold">Guaranteed Window & Dressing Area</span>
              </div>
            </div>
          )}

          {/* STEP 3: PASSENGER CREDENTIALS & CONTACT */}
          {step === BOOKING_STEPS.PASSENGERS && (
            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  Guest Credentials & Manifest
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Provide traveler passport details for diplomatic tarmac manifest and immigration pre-clearance.
                </p>
              </div>

              {passengers.map((passenger, idx) => (
                <div
                  key={idx}
                  className="glass-card"
                  style={{
                    padding: '1.5rem',
                    marginBottom: '1.25rem',
                    background: 'rgba(212, 175, 55, 0.02)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <User size={16} color="var(--gold-primary)" />
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--gold-light)' }}>
                      Guest {idx + 1} {idx === 0 ? '(Primary VIP Traveler)' : ''}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                    {/* Title */}
                    <div className="form-group" style={{ maxWidth: '120px' }}>
                      <label className="form-label">Title</label>
                      <select
                        value={passenger.title}
                        onChange={(e) =>
                          dispatch({
                            type: 'UPDATE_PASSENGER',
                            payload: { index: idx, field: 'title', value: e.target.value }
                          })
                        }
                        className="form-control"
                      >
                        <option value="Mr.">Mr.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Dr.">Dr.</option>
                        <option value="His/Her Excellency">H.E.</option>
                      </select>
                    </div>

                    {/* First Name */}
                    <div className="form-group">
                      <label className="form-label">First Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Chinmay"
                        value={passenger.firstName}
                        onChange={(e) =>
                          dispatch({
                            type: 'UPDATE_PASSENGER',
                            payload: { index: idx, field: 'firstName', value: e.target.value }
                          })
                        }
                        className="form-control"
                      />
                      {errors[`p_${idx}_firstName`] && (
                        <span className="form-error">{errors[`p_${idx}_firstName`]}</span>
                      )}
                    </div>

                    {/* Last Name */}
                    <div className="form-group">
                      <label className="form-label">Last Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Thukaru"
                        value={passenger.lastName}
                        onChange={(e) =>
                          dispatch({
                            type: 'UPDATE_PASSENGER',
                            payload: { index: idx, field: 'lastName', value: e.target.value }
                          })
                        }
                        className="form-control"
                      />
                      {errors[`p_${idx}_lastName`] && (
                        <span className="form-error">{errors[`p_${idx}_lastName`]}</span>
                      )}
                    </div>

                    {/* Passport Number */}
                    <div className="form-group">
                      <label className="form-label">Passport No. *</label>
                      <input
                        type="text"
                        placeholder="e.g. Z9482103"
                        value={passenger.passport}
                        onChange={(e) =>
                          dispatch({
                            type: 'UPDATE_PASSENGER',
                            payload: { index: idx, field: 'passport', value: e.target.value.toUpperCase() }
                          })
                        }
                        className="form-control font-mono"
                      />
                      {errors[`p_${idx}_passport`] && (
                        <span className="form-error">{errors[`p_${idx}_passport`]}</span>
                      )}
                    </div>

                    {/* Primary traveler email & phone */}
                    {idx === 0 && (
                      <>
                        <div className="form-group">
                          <label className="form-label">VIP Email *</label>
                          <input
                            type="email"
                            placeholder="concierge@example.com"
                            value={passenger.email}
                            onChange={(e) =>
                              dispatch({
                                type: 'UPDATE_PASSENGER',
                                payload: { index: idx, field: 'email', value: e.target.value }
                              })
                            }
                            className="form-control"
                          />
                          {errors[`p_${idx}_email`] && (
                            <span className="form-error">{errors[`p_${idx}_email`]}</span>
                          )}
                        </div>

                        <div className="form-group">
                          <label className="form-label">Concierge Mobile *</label>
                          <input
                            type="tel"
                            placeholder="+1 (555) 019-2834"
                            value={passenger.phone}
                            onChange={(e) =>
                              dispatch({
                                type: 'UPDATE_PASSENGER',
                                payload: { index: idx, field: 'phone', value: e.target.value }
                              })
                            }
                            className="form-control font-mono"
                          />
                          {errors[`p_${idx}_phone`] && (
                            <span className="form-error">{errors[`p_${idx}_phone`]}</span>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STEP 4: CONCIERGE ADD-ONS & GASTRONOMY */}
          {step === BOOKING_STEPS.ADDONS && (
            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  Bespoke In-Flight Enhancements
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Tailor your voyage with private ground chauffeuring, vintage champagne, and Michelin catering.
                </p>
              </div>

              {/* Addons List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '1.5rem' }}>
                {AVAILABLE_ADDONS.map((addon) => {
                  const isSelected = selectedAddOns.some((a) => a.id === addon.id);

                  return (
                    <div
                      key={addon.id}
                      onClick={() => dispatch({ type: 'TOGGLE_ADDON', payload: addon })}
                      style={{
                        padding: '1.1rem 1.4rem',
                        borderRadius: 'var(--radius-md)',
                        background: isSelected ? 'rgba(212, 175, 55, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                        border: isSelected ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            border: isSelected ? '2px solid var(--gold-primary)' : '2px solid var(--text-muted)',
                            background: isSelected ? 'var(--gold-primary)' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#07090E'
                          }}
                        >
                          {isSelected && <Check size={14} strokeWidth={3} />}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.92rem' }}>
                            {addon.name}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                            {addon.description}
                          </div>
                        </div>
                      </div>

                      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--gold-light)', whiteSpace: 'nowrap' }}>
                        +{formatPrice(addon.priceUSD, currency)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Dining & Special Notes */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Michelin Dining Profile</label>
                  <select
                    value={mealPreference}
                    onChange={(e) => dispatch({ type: 'SET_MEAL_PREFERENCE', payload: e.target.value })}
                    className="form-control"
                  >
                    <option value="Gourmet French Haute Cuisine">Gourmet French Haute Tasting Menu</option>
                    <option value="Imperial Royal Arabic Banquet">Imperial Royal Arabic Banquet</option>
                    <option value="Japanese Kaiseki 7-Course">Japanese Kaiseki 7-Course by Chef Ishikawa</option>
                    <option value="Mediterranean Truffle & Seafood">Mediterranean Black Truffle & Wild Seafood</option>
                    <option value="Plant-Based Michelin Gastronomy">Plant-Based Michelin Gastronomy</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Special Concierge Directives</label>
                  <input
                    type="text"
                    placeholder="e.g. Temperature 21°C, extra cashmere throw"
                    value={specialRequests}
                    onChange={(e) => dispatch({ type: 'SET_SPECIAL_REQUESTS', payload: e.target.value })}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: CONFIRMATION & PNR PRESENTATION */}
          {step === BOOKING_STEPS.CONFIRMATION && (
            <div>
              {!isConfirmed ? (
                <div>
                  <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                      Review & Confirm Demonstration Booking
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      Please inspect your voyage manifest. No actual payment card will be charged.
                    </p>
                  </div>

                  {/* Summary Breakdown Grid */}
                  <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                      <div>
                        <span className="form-label">Route</span>
                        <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--gold-light)' }}>
                          {flight.origin.city} ({flight.origin.code}) → {flight.destination.city} ({flight.destination.code})
                        </div>
                      </div>
                      <div>
                        <span className="form-label">Flight & Aircraft</span>
                        <div style={{ fontWeight: 600 }}>{flight.airline} ({flight.aircraft})</div>
                      </div>
                      <div>
                        <span className="form-label">Departure Date</span>
                        <div style={{ fontFamily: 'var(--font-mono)' }}>{travelDate} • {flight.departureTime}</div>
                      </div>
                      <div>
                        <span className="form-label">Suite Allocated</span>
                        <div style={{ color: 'var(--gold-primary)', fontWeight: 600 }}>{selectedSeat}</div>
                      </div>
                    </div>

                    <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1rem' }}>
                      <span className="form-label" style={{ display: 'block', marginBottom: '0.4rem' }}>Primary Traveler</span>
                      <div style={{ fontSize: '0.92rem' }}>
                        {passengers[0].title} {passengers[0].firstName} {passengers[0].lastName} (Passport: {passengers[0].passport || 'N/A'})
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        Contact: {passengers[0].email} | {passengers[0].phone}
                      </div>
                    </div>
                  </div>

                  {/* Fare Summary Breakdown */}
                  <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.88rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Suite Base Fare ({passengerCount} Guests):</span>
                      <span style={{ fontFamily: 'var(--font-mono)' }}>{formatPrice(baseFareUSD, currency)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.88rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Aviation Taxes & VIP Tarmac Fees:</span>
                      <span style={{ fontFamily: 'var(--font-mono)' }}>{formatPrice(taxesUSD, currency)}</span>
                    </div>
                    {selectedAddOns.map((ad) => (
                      <div key={ad.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.88rem' }}>
                        <span style={{ color: 'var(--gold-light)' }}>+ {ad.name}:</span>
                        <span style={{ fontFamily: 'var(--font-mono)' }}>{formatPrice(ad.priceUSD, currency)}</span>
                      </div>
                    ))}
                    <div style={{ borderTop: '1px solid rgba(212, 175, 55, 0.3)', paddingTop: '0.75rem', marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>Total Demonstration Fare:</span>
                      <span style={{ fontWeight: 800, fontSize: '1.6rem', color: 'var(--gold-light)', fontFamily: 'var(--font-mono)' }}>
                        {formatPrice(totalFareUSD, currency)}
                      </span>
                    </div>
                  </div>

                  {/* College Viva Demonstration Disclaimer */}
                  <div style={{ padding: '0.75rem 1rem', background: 'rgba(212, 175, 55, 0.08)', borderRadius: 'var(--radius-sm)', border: '1px dashed var(--border-gold)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Shield size={18} color="var(--gold-primary)" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <strong>Demonstration Booking Mode:</strong> Click below to confirm. The booking will be generated with a unique PNR and saved directly to your browser's <code>localStorage</code>.
                    </span>
                  </div>
                </div>
              ) : (
                /* Confirmed Success View */
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <div
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      background: 'rgba(212, 175, 55, 0.15)',
                      border: '2px solid var(--gold-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.5rem',
                      boxShadow: '0 0 30px rgba(212, 175, 55, 0.5)'
                    }}
                  >
                    <Check size={36} color="var(--gold-primary)" />
                  </div>

                  <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
                    Demonstration Reservation Confirmed
                  </span>
                  <h2 style={{ fontSize: '1.8rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                    Your Voyage Has Been Secured
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto 1.5rem', fontSize: '0.9rem' }}>
                    A demonstration manifest has been registered under your name. Your booking has been permanently written to <code>localStorage</code>.
                  </p>

                  {/* PNR Reference Banner */}
                  <div
                    style={{
                      display: 'inline-block',
                      padding: '1.25rem 2.5rem',
                      background: 'rgba(212, 175, 55, 0.1)',
                      border: '1px solid var(--border-gold)',
                      borderRadius: 'var(--radius-md)',
                      marginBottom: '1.75rem'
                    }}
                  >
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', display: 'block' }}>
                      Demonstration Booking Reference (PNR)
                    </span>
                    <span style={{ fontSize: '1.9rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--gold-light)', letterSpacing: '0.08em' }}>
                      {confirmedBooking?.id}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <button
                      className="btn btn-gold"
                      onClick={onClose}
                    >
                      <Sparkles size={16} />
                      <span>View in My Voyages</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="modal-footer">
          {step > 1 && !isConfirmed && (
            <button className="btn btn-subtle" onClick={handlePrevStep} style={{ marginRight: 'auto' }}>
              <ChevronLeft size={16} />
              <span>Back</span>
            </button>
          )}

          {!isConfirmed ? (
            <>
              {step < BOOKING_STEPS.CONFIRMATION ? (
                <button className="btn btn-gold" onClick={handleNextStep}>
                  <span>Proceed to Step {step + 1}</span>
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button className="btn btn-gold pulse-gold" onClick={handleConfirmReservation}>
                  <CreditCard size={16} />
                  <span>Confirm Demonstration Booking</span>
                </button>
              )}
            </>
          ) : (
            <button className="btn btn-outline-gold" onClick={onClose}>
              Close
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
