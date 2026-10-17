import React, { useState } from 'react';
import { MapPin, Plane, Compass, Sparkles, Filter } from 'lucide-react';
import DestinationCard from '../components/DestinationCard';
import { LUXURY_DESTINATIONS } from '../data/destinationsData';

export default function DestinationsView({ onSelectDestination }) {
  const [selectedRegion, setSelectedRegion] = useState('ALL');

  const filteredDestinations = selectedRegion === 'ALL'
    ? LUXURY_DESTINATIONS
    : LUXURY_DESTINATIONS.filter((d) => d.region === selectedRegion);

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '6rem' }}>
      <div className="container">
        
        {/* Title */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3rem' }}>
          <span className="badge badge-gold" style={{ marginBottom: '0.85rem' }}>
            <Compass size={12} /> Curated Private Flight Corridors
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', color: '#FFFFFF', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>
            Global Luxury Destinations
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Discover the world's most coveted retreats. Direct private slots into dedicated VIP FBOs, seamless helicopter connections, and bespoke luxury itineraries.
          </p>
        </div>

        {/* Region Filter Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {['ALL', 'Europe', 'Middle East', 'Asia Pacific', 'North America', 'Indian Ocean'].map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              style={{
                padding: '0.45rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                background: selectedRegion === region ? 'var(--gold-gradient)' : 'rgba(255, 255, 255, 0.05)',
                color: selectedRegion === region ? '#07090E' : 'var(--text-secondary)',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              {region === 'ALL' ? 'All Destinations' : region}
            </button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-3">
          {filteredDestinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              onSelectDestination={onSelectDestination}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
