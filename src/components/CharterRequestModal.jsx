import React, { useState } from 'react';
import { X, Crown, Check } from 'lucide-react';
import { JET_CATEGORIES } from '../data/jetsData';
import { saveCharterRequest } from '../utils/storage';
import { formatPrice } from '../utils/currency';

export default function CharterRequestModal({
  initialCategory = 'super-midsize',
  initialRoute = null,
  currency = 'USD',
  onClose,
  onRequestSubmitted
}) {
  const [origin, setOrigin] = useState(initialRoute?.origin || 'Dubai (DWC VIP)');
  const [destination, setDestination] = useState(initialRoute?.destination || 'London Farnborough (FAB)');
  const [departureDate, setDepartureDate] = useState(new Date().toISOString().split('T')[0]);
  const [departureTime, setDepartureTime] = useState('11:00 AM');
  const [passengers, setPassengers] = useState(4);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [tripType, setTripType] = useState('one-way');
  const [returnDate, setReturnDate] = useState('');
  
  // Bespoke preferences
  const [catering, setCatering] = useState('Michelin French Degustation');
  const [groundTransfer, setGroundTransfer] = useState(true);
  const [securityEscort, setSecurityEscort] = useState(false);
  
  // Contact details
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [familyOffice, setFamilyOffice] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState(null);

  const activeCategoryObj = JET_CATEGORIES.find((c) => c.id === selectedCategory) || JET_CATEGORIES[3];

  // Indicative estimate calculation
  const estimatedFlightHours = 5.5; // Demo baseline
  const estimatedTotalUSD = activeCategoryObj.hourlyRateUSD * estimatedFlightHours + (groundTransfer ? 700 : 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};

    if (!origin.trim()) errs.origin = 'Departure location is required.';
    if (!destination.trim()) errs.destination = 'Destination location is required.';
    if (origin.trim().toLowerCase() === destination.trim().toLowerCase()) {
      errs.destination = 'Origin and destination must differ.';
    }
    if (!departureDate) errs.departureDate = 'Departure date is required.';
    if (tripType === 'round-trip' && !returnDate) {
      errs.returnDate = 'Return date is required for round-trip charter.';
    }

    if (!clientName.trim()) errs.clientName = 'Primary principal name is required.';
    if (!clientEmail.trim() || !clientEmail.includes('@')) {
      errs.clientEmail = 'Valid executive email is required.';
    }
    if (!clientPhone.trim()) errs.clientPhone = 'Phone number is required for dispatch.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const refCode = `EM-CH-${randomNum}`;

    const newRequest = {
      id: refCode,
      type: 'Private Jet Charter Request',
      origin,
      destination,
      departureDate,
      departureTime,
      tripType,
      returnDate: tripType === 'round-trip' ? returnDate : null,
      passengers,
      category: activeCategoryObj.name,
      sampleModel: activeCategoryObj.sampleModel,
      catering,
      groundTransfer,
      securityEscort,
      clientName,
      clientEmail,
      clientPhone,
      familyOffice,
      specialInstructions,
      estimatedTotalUSD,
      status: 'Under Concierge Review — Priority Dispatch',
      requestDate: new Date().toISOString().split('T')[0]
    };

    saveCharterRequest(newRequest);
    setSubmittedRequest(newRequest);
    setIsSubmitted(true);
    if (onRequestSubmitted) {
      onRequestSubmitted(newRequest);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '850px' }}
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Crown size={20} color="var(--gold-primary)" />
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '1px' }}>
                Private Jet Charter Request
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--gold-light)' }}>
                Bespoke Flight Dispatch & Tailored Itinerary
              </span>
            </div>
          </div>
          <button className="btn-close" onClick={onClose} aria-label="Close charter modal">
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="modal-body">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              
              {/* Trip Type Selector */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => setTripType('one-way')}
                  style={{
                    padding: '0.45rem 1.25rem',
                    borderRadius: 'var(--radius-full)',
                    background: tripType === 'one-way' ? 'var(--gold-gradient)' : 'rgba(255,255,255,0.05)',
                    color: tripType === 'one-way' ? '#07090E' : 'var(--text-secondary)',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '0.82rem',
                    cursor: 'pointer'
                  }}
                >
                  One-Way Charter
                </button>
                <button
                  type="button"
                  onClick={() => setTripType('round-trip')}
                  style={{
                    padding: '0.45rem 1.25rem',
                    borderRadius: 'var(--radius-full)',
                    background: tripType === 'round-trip' ? 'var(--gold-gradient)' : 'rgba(255,255,255,0.05)',
                    color: tripType === 'round-trip' ? '#07090E' : 'var(--text-secondary)',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '0.82rem',
                    cursor: 'pointer'
                  }}
                >
                  Round-Trip Charter
                </button>
              </div>

              {/* Route & Schedule Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}
              >
                <div className="form-group">
                  <label className="form-label">Departure FBO / City *</label>
                  <input
                    type="text"
                    value={origin}
                    placeholder="e.g. Dubai Al Maktoum (DWC) or Paris Le Bourget (LBG)"
                    onChange={(e) => setOrigin(e.target.value)}
                    className="form-control"
                  />
                  {errors.origin && <span className="form-error">{errors.origin}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Destination FBO / City *</label>
                  <input
                    type="text"
                    value={destination}
                    placeholder="e.g. London Farnborough (FAB) or Aspen (ASE)"
                    onChange={(e) => setDestination(e.target.value)}
                    className="form-control"
                  />
                  {errors.destination && <span className="form-error">{errors.destination}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Departure Date *</label>
                  <input
                    type="date"
                    value={departureDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="form-control"
                  />
                  {errors.departureDate && <span className="form-error">{errors.departureDate}</span>}
                </div>

                {tripType === 'round-trip' && (
                  <div className="form-group">
                    <label className="form-label">Return Date *</label>
                    <input
                      type="date"
                      value={returnDate}
                      min={departureDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="form-control"
                    />
                    {errors.returnDate && <span className="form-error">{errors.returnDate}</span>}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Desired Wheels-Up Time</label>
                  <input
                    type="text"
                    value={departureTime}
                    placeholder="e.g. 10:30 AM (Anytime Flexible)"
                    onChange={(e) => setDepartureTime(e.target.value)}
                    className="form-control font-mono"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Passenger Party Size</label>
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="form-control"
                  >
                    {[1, 2, 4, 6, 8, 10, 12, 14, 16, 18].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Passenger' : 'Passengers'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Aircraft Category Selection */}
              <div style={{ marginBottom: '1.75rem' }}>
                <label className="form-label" style={{ display: 'block', marginBottom: '0.75rem' }}>
                  Select Aircraft Category
                </label>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                    gap: '0.85rem'
                  }}
                >
                  {JET_CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat.id;

                    return (
                      <div
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        style={{
                          padding: '0.9rem',
                          borderRadius: 'var(--radius-sm)',
                          background: isSelected ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                          border: isSelected ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                          cursor: 'pointer',
                          transition: 'all var(--transition-fast)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.88rem', color: isSelected ? 'var(--gold-light)' : 'var(--text-primary)' }}>
                            {cat.name}
                          </span>
                          <span style={{ fontSize: '0.68rem', color: 'var(--gold-primary)', fontFamily: 'var(--font-mono)' }}>
                            {formatPrice(cat.hourlyRateUSD, currency)}/hr
                          </span>
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          {cat.sampleModel}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                          Cap: {cat.capacity} • Range: {cat.maxRange.split(' ')[0]}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bespoke Amenities & Services */}
              <div
                className="glass-card"
                style={{
                  padding: '1.25rem',
                  marginBottom: '1.5rem',
                  background: 'rgba(212, 175, 55, 0.03)'
                }}
              >
                <h4 style={{ fontSize: '0.85rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.85rem' }}>
                  VIP In-Flight Directives
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Galley Catering Profile</label>
                    <select
                      value={catering}
                      onChange={(e) => setCatering(e.target.value)}
                      className="form-control"
                    >
                      <option value="Michelin French Degustation">Michelin 3-Star French Degustation</option>
                      <option value="Caviar & Vintage Champagne">Imperial Caviar & Vintage Krug Pairing</option>
                      <option value="Light Health & Organic Juice">Organic Farm-to-Table & Green Elixirs</option>
                      <option value="Kosher / Halal Certified">Glatt Kosher / Halal Certified Prestige</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', justifyContent: 'center' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                      <input
                        type="checkbox"
                        checked={groundTransfer}
                        onChange={(e) => setGroundTransfer(e.target.checked)}
                        style={{ accentColor: 'var(--gold-primary)' }}
                      />
                      <span>Airside Rolls-Royce / Maybach Chauffeur (+$700)</span>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                      <input
                        type="checkbox"
                        checked={securityEscort}
                        onChange={(e) => setSecurityEscort(e.target.checked)}
                        style={{ accentColor: 'var(--gold-primary)' }}
                      />
                      <span>Armed Diplomatic Close Protection & Ramp Escort</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Client Contact Manifest */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.85rem' }}>
                  Lead Principal Contact Details
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Full Name / Title *</label>
                    <input
                      type="text"
                      placeholder="e.g. Lord Alistair Vance"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="form-control"
                    />
                    {errors.clientName && <span className="form-error">{errors.clientName}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Executive Email *</label>
                    <input
                      type="email"
                      placeholder="principal@familyoffice.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="form-control"
                    />
                    {errors.clientEmail && <span className="form-error">{errors.clientEmail}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Direct Phone / Signal *</label>
                    <input
                      type="tel"
                      placeholder="+44 20 7946 0912"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="form-control font-mono"
                    />
                    {errors.clientPhone && <span className="form-error">{errors.clientPhone}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Family Office / Entity</label>
                    <input
                      type="text"
                      placeholder="e.g. Vance Capital Trust"
                      value={familyOffice}
                      onChange={(e) => setFamilyOffice(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '1rem' }}>
                  <label className="form-label">Special Aircraft Directives</label>
                  <textarea
                    rows={2}
                    placeholder="Bespoke tail preferences, pet in cabin, high-security protocol..."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>

              {/* Indicative Estimate Banner */}
              <div
                style={{
                  padding: '1rem 1.25rem',
                  background: 'rgba(0, 0, 0, 0.4)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem',
                  border: '1px solid rgba(212, 175, 55, 0.2)'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Indicative Charter Estimate ({activeCategoryObj.name})
                  </span>
                  <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--gold-light)', fontFamily: 'var(--font-mono)' }}>
                    {formatPrice(estimatedTotalUSD, currency)}
                  </div>
                </div>
                <span className="badge badge-gold">Guaranteed 4h Dispatch</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" className="btn btn-subtle" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold pulse-gold">
                  <Crown size={16} />
                  <span>Request Instant Private Dispatch</span>
                </button>
              </div>
            </form>
          ) : (
            /* Confirmation View */
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div
                style={{
                  width: '65px',
                  height: '65px',
                  borderRadius: '50%',
                  background: 'rgba(212, 175, 55, 0.15)',
                  border: '2px solid var(--gold-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem'
                }}
              >
                <Check size={32} color="var(--gold-primary)" />
              </div>

              <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
                Charter Itinerary Received
              </span>
              <h2 style={{ fontSize: '1.75rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                Flight Dispatch Notified
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 1.5rem', fontSize: '0.9rem' }}>
                Your private charter requisition has been registered. An ÉMINENCE Senior Flight Coordinator will present slot confirmations within 15 minutes.
              </p>

              <div
                style={{
                  display: 'inline-block',
                  padding: '1.25rem 2rem',
                  background: 'rgba(212, 175, 55, 0.08)',
                  border: '1px solid var(--border-gold)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1.75rem'
                }}
              >
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block' }}>
                  Charter Dispatch Reference
                </span>
                <span style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--gold-light)' }}>
                  {submittedRequest?.id}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <button className="btn btn-gold" onClick={onClose}>
                  <span>Done</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
