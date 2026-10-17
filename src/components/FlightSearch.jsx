import React, { useState } from 'react';
import { PlaneTakeoff, PlaneLanding, Calendar, Users, Search, ArrowRightLeft, AlertCircle } from 'lucide-react';
import { AIRPORTS_LIST } from '../data/flightsData';

export default function FlightSearch({ onSearch, initialParams = {} }) {
  const [tripType, setTripType] = useState(initialParams.tripType || 'one-way');
  const [origin, setOrigin] = useState(initialParams.origin || 'Dubai');
  const [destination, setDestination] = useState(initialParams.destination || 'Paris');
  const [departureDate, setDepartureDate] = useState(
    initialParams.departureDate || new Date().toISOString().split('T')[0]
  );
  const [returnDate, setReturnDate] = useState(initialParams.returnDate || '');
  const [passengerCount, setPassengerCount] = useState(initialParams.passengerCount || 1);
  const [cabinClass, setCabinClass] = useState(initialParams.cabinClass || 'First Class');
  const [errors, setErrors] = useState({});

  const handleSwapAirports = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
    setErrors({ ...errors, destination: null });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!origin) newErrors.origin = 'Please select departure city.';
    if (!destination) newErrors.destination = 'Please select destination city.';
    if (origin && destination && origin.toLowerCase() === destination.toLowerCase()) {
      newErrors.destination = 'Departure and destination cannot be identical.';
    }

    if (!departureDate) {
      newErrors.departureDate = 'Please select departure date.';
    }

    if (tripType === 'round-trip') {
      if (!returnDate) {
        newErrors.returnDate = 'Please select a return date for round-trip.';
      } else if (new Date(returnDate) < new Date(departureDate)) {
        newErrors.returnDate = 'Return date cannot precede departure date.';
      }
    }

    if (passengerCount < 1 || passengerCount > 10) {
      newErrors.passengerCount = 'Passenger count must be between 1 and 10.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    if (onSearch) {
      onSearch({
        tripType,
        origin,
        destination,
        departureDate,
        returnDate,
        passengerCount: Number(passengerCount),
        cabinClass
      });
    }
  };

  return (
    <div
      className="glass-panel"
      style={{
        padding: '2rem',
        maxWidth: '1100px',
        margin: '0 auto',
        position: 'relative'
      }}
    >
      {/* Search Header: Trip Type & Cabin Mode */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '1.75rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(0, 0, 0, 0.35)', padding: '4px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-subtle)' }}>
          <button
            type="button"
            onClick={() => setTripType('one-way')}
            style={{
              background: tripType === 'one-way' ? 'var(--gold-gradient)' : 'transparent',
              color: tripType === 'one-way' ? '#07090E' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              padding: '0.4rem 1.1rem',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            One-Way Journey
          </button>
          <button
            type="button"
            onClick={() => setTripType('round-trip')}
            style={{
              background: tripType === 'round-trip' ? 'var(--gold-gradient)' : 'transparent',
              color: tripType === 'round-trip' ? '#07090E' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              padding: '0.4rem 1.1rem',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            Round-Trip Journey
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cabin Experience:</span>
          <select
            value={cabinClass}
            onChange={(e) => setCabinClass(e.target.value)}
            className="form-control"
            style={{
              width: 'auto',
              padding: '0.4rem 2rem 0.4rem 0.9rem',
              fontSize: '0.82rem',
              height: '38px',
              borderRadius: 'var(--radius-full)'
            }}
          >
            <option value="First Class">Grand First Class Suite</option>
            <option value="The Residence">The Residence Penthouse</option>
            <option value="Business Suite">Business Class Executive</option>
          </select>
        </div>
      </div>

      {/* Main Search Inputs Grid */}
      <form onSubmit={handleSearchSubmit}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
            alignItems: 'flex-start'
          }}
        >
          {/* Departure Airport */}
          <div className="form-group" style={{ position: 'relative' }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <PlaneTakeoff size={14} color="var(--gold-primary)" />
              <span>Departure Hub</span>
            </label>
            <select
              value={origin}
              onChange={(e) => {
                setOrigin(e.target.value);
                setErrors({ ...errors, origin: null });
              }}
              className="form-control"
            >
              {AIRPORTS_LIST.map((airport) => (
                <option key={`orig-${airport.code}`} value={airport.city}>
                  {airport.city} ({airport.code}) — {airport.country}
                </option>
              ))}
            </select>
            {errors.origin && (
              <span className="form-error" style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <AlertCircle size={11} /> {errors.origin}
              </span>
            )}
          </div>

          {/* Swap Button (Inline / absolute between cities on desktop) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', paddingTop: '1.2rem' }}>
            <button
              type="button"
              onClick={handleSwapAirports}
              title="Swap Departure and Destination"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(212, 175, 55, 0.12)',
                border: '1px solid var(--border-gold)',
                color: 'var(--gold-light)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform var(--transition-fast)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'rotate(180deg)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'rotate(0deg)')}
            >
              <ArrowRightLeft size={16} />
            </button>
          </div>

          {/* Destination Airport */}
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <PlaneLanding size={14} color="var(--gold-primary)" />
              <span>Destination City</span>
            </label>
            <select
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setErrors({ ...errors, destination: null });
              }}
              className="form-control"
            >
              {AIRPORTS_LIST.map((airport) => (
                <option key={`dest-${airport.code}`} value={airport.city}>
                  {airport.city} ({airport.code}) — {airport.country}
                </option>
              ))}
            </select>
            {errors.destination && (
              <span className="form-error" style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <AlertCircle size={11} /> {errors.destination}
              </span>
            )}
          </div>

          {/* Departure Date */}
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Calendar size={14} color="var(--gold-primary)" />
              <span>Departure Date</span>
            </label>
            <input
              type="date"
              value={departureDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => {
                setDepartureDate(e.target.value);
                setErrors({ ...errors, departureDate: null });
              }}
              className="form-control"
            />
            {errors.departureDate && (
              <span className="form-error" style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <AlertCircle size={11} /> {errors.departureDate}
              </span>
            )}
          </div>

          {/* Return Date (if round-trip) */}
          {tripType === 'round-trip' && (
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={14} color="var(--gold-primary)" />
                <span>Return Date</span>
              </label>
              <input
                type="date"
                value={returnDate}
                min={departureDate || new Date().toISOString().split('T')[0]}
                onChange={(e) => {
                  setReturnDate(e.target.value);
                  setErrors({ ...errors, returnDate: null });
                }}
                className="form-control"
              />
              {errors.returnDate && (
                <span className="form-error" style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <AlertCircle size={11} /> {errors.returnDate}
                </span>
              )}
            </div>
          )}

          {/* Passenger Count */}
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Users size={14} color="var(--gold-primary)" />
              <span>Guests</span>
            </label>
            <select
              value={passengerCount}
              onChange={(e) => setPassengerCount(Number(e.target.value))}
              className="form-control"
            >
              {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Guest (VIP Suite)' : 'Guests'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Button */}
        <div style={{ marginTop: '1.75rem', display: 'flex', justifyContent: 'center' }}>
          <button
            type="submit"
            className="btn btn-gold btn-lg pulse-gold"
            style={{ width: '100%', maxWidth: '340px' }}
          >
            <Search size={18} />
            <span>Search Luxury Flights</span>
          </button>
        </div>
      </form>
    </div>
  );
}
