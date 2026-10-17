import React, { useState, useMemo } from 'react';
import { Plane, Sparkles, Filter, Shield } from 'lucide-react';
import FlightCard from '../components/FlightCard';
import FlightSearch from '../components/FlightSearch';
import { LUXURY_FLIGHTS, AIRPORTS_LIST } from '../data/flightsData';
import { formatPrice } from '../utils/currency';

export default function FirstClassView({
  currency,
  onSelectFlight,
  onViewFlightDetails,
  initialSearchParams = {}
}) {
  const [searchParams, setSearchParams] = useState(initialSearchParams);
  const [selectedAirlineFilter, setSelectedAirlineFilter] = useState('ALL');
  const [selectedOriginFilter, setSelectedOriginFilter] = useState('ALL');
  const [selectedDestinationFilter, setSelectedDestinationFilter] = useState('ALL');
  const [maxPriceUSD, setMaxPriceUSD] = useState(25000);
  const [sortBy, setSortBy] = useState('recommended'); // 'recommended', 'price-low', 'price-high', 'duration'

  // Extract unique airlines for filter dropdown
  const airlineOptions = useMemo(() => {
    const list = LUXURY_FLIGHTS.map((f) => f.airline.split(' by ')[1] || f.airline);
    return ['ALL', ...new Set(list)];
  }, []);

  // Filter and sort flights
  const filteredFlights = useMemo(() => {
    return LUXURY_FLIGHTS.filter((flight) => {
      // Search params match
      if (searchParams.origin && flight.origin.city.toLowerCase() !== searchParams.origin.toLowerCase()) {
        // If not explicit match, allow if filter not strict
      }
      if (selectedAirlineFilter !== 'ALL' && !flight.airline.includes(selectedAirlineFilter)) {
        return false;
      }
      if (selectedOriginFilter !== 'ALL' && flight.origin.city !== selectedOriginFilter) {
        return false;
      }
      if (selectedDestinationFilter !== 'ALL' && flight.destination.city !== selectedDestinationFilter) {
        return false;
      }
      if (flight.priceUSD > maxPriceUSD) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.priceUSD - b.priceUSD;
      if (sortBy === 'price-high') return b.priceUSD - a.priceUSD;
      if (sortBy === 'duration') {
        const durA = parseInt(a.duration);
        const durB = parseInt(b.duration);
        return durA - durB;
      }
      return 0; // Default recommended
    });
  }, [searchParams, selectedAirlineFilter, selectedOriginFilter, selectedDestinationFilter, maxPriceUSD, sortBy]);

  const handleSearch = (params) => {
    setSearchParams(params);
    if (params.origin) setSelectedOriginFilter(params.origin);
    if (params.destination) setSelectedDestinationFilter(params.destination);
  };

  const handleResetFilters = () => {
    setSelectedAirlineFilter('ALL');
    setSelectedOriginFilter('ALL');
    setSelectedDestinationFilter('ALL');
    setMaxPriceUSD(25000);
    setSortBy('recommended');
    setSearchParams({});
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '5rem' }}>
      <div className="container">
        
        {/* Header Title */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem' }}>
          <span className="badge badge-gold" style={{ marginBottom: '0.85rem' }}>
            <Sparkles size={12} /> Presidential Suites Above The Clouds
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', color: '#FFFFFF', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>
            First Class Commercial Suites
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Experience the pinnacle of international commercial aviation. Private enclosed bedrooms, onboard showers, personal butlers, and Alain Ducasse cuisine.
          </p>
        </div>

        {/* Embedded Concierge Search Tool */}
        <div style={{ marginBottom: '3.5rem' }}>
          <FlightSearch onSearch={handleSearch} initialParams={searchParams} />
        </div>

        {/* Filters and Sorting Control Bar */}
        <div
          className="glass-card"
          style={{
            padding: '1.25rem 1.75rem',
            marginBottom: '2.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.25rem',
            background: 'rgba(14, 20, 33, 0.75)'
          }}
        >
          {/* Left filters: Airline, Origin, Destination */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--gold-light)', fontSize: '0.82rem', fontWeight: 600 }}>
              <Filter size={14} />
              <span>Filters:</span>
            </div>

            {/* Airline Dropdown */}
            <select
              value={selectedAirlineFilter}
              onChange={(e) => setSelectedAirlineFilter(e.target.value)}
              className="form-control"
              style={{ width: 'auto', padding: '0.4rem 2rem 0.4rem 0.8rem', fontSize: '0.8rem', height: '36px' }}
            >
              <option value="ALL">All Partner Airlines</option>
              {airlineOptions.filter(o => o !== 'ALL').map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            {/* Departure Hub */}
            <select
              value={selectedOriginFilter}
              onChange={(e) => setSelectedOriginFilter(e.target.value)}
              className="form-control"
              style={{ width: 'auto', padding: '0.4rem 2rem 0.4rem 0.8rem', fontSize: '0.8rem', height: '36px' }}
            >
              <option value="ALL">All Departure Hubs</option>
              {AIRPORTS_LIST.map((ap) => (
                <option key={`flt-orig-${ap.code}`} value={ap.city}>{ap.city} ({ap.code})</option>
              ))}
            </select>

            {/* Destination Hub */}
            <select
              value={selectedDestinationFilter}
              onChange={(e) => setSelectedDestinationFilter(e.target.value)}
              className="form-control"
              style={{ width: 'auto', padding: '0.4rem 2rem 0.4rem 0.8rem', fontSize: '0.8rem', height: '36px' }}
            >
              <option value="ALL">All Destinations</option>
              {AIRPORTS_LIST.map((ap) => (
                <option key={`flt-dest-${ap.code}`} value={ap.city}>{ap.city} ({ap.code})</option>
              ))}
            </select>

            {/* Reset Button */}
            {(selectedAirlineFilter !== 'ALL' || selectedOriginFilter !== 'ALL' || selectedDestinationFilter !== 'ALL' || maxPriceUSD < 25000) && (
              <button
                onClick={handleResetFilters}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--gold-primary)',
                  fontSize: '0.8rem',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Right: Sorting */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-control"
              style={{ width: 'auto', padding: '0.4rem 2rem 0.4rem 0.8rem', fontSize: '0.8rem', height: '36px' }}
            >
              <option value="recommended">Curated / Recommended</option>
              <option value="price-low">Fare: Lowest to Highest</option>
              <option value="price-high">Fare: Highest to Lowest</option>
              <option value="duration">Fastest Flight Time</option>
            </select>
          </div>
        </div>

        {/* Results Counter & Academic Disclaimer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Showing <strong>{filteredFlights.length}</strong> luxury commercial suites
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <Shield size={14} color="var(--gold-primary)" />
            <span>Demonstration inventory inspired by Emirates, Singapore Airlines, Etihad & Lufthansa.</span>
          </div>
        </div>

        {/* Flight Cards Grid */}
        {filteredFlights.length > 0 ? (
          <div className="grid grid-cols-2">
            {filteredFlights.map((flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                currency={currency}
                onSelectFlight={onSelectFlight}
                onViewDetails={onViewFlightDetails}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div
            className="glass-card"
            style={{
              padding: '4rem 2rem',
              textAlign: 'center',
              maxWidth: '600px',
              margin: '3rem auto'
            }}
          >
            <div
              style={{
                width: '65px',
                height: '65px',
                borderRadius: '50%',
                background: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid var(--border-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}
            >
              <Plane size={30} color="var(--gold-primary)" />
            </div>
            <h3 style={{ fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
              No Commercial Suites Match This Route
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.75rem', lineHeight: 1.6 }}>
              There are no demonstration commercial suites matching your exact criteria. You can charter a bespoke private jet to this destination or reset your search filters.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button onClick={handleResetFilters} className="btn btn-outline-gold">
                Reset All Filters
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
