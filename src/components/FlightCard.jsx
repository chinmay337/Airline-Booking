import React from 'react';
import { Plane, Clock, Sparkles, ChevronRight, Check } from 'lucide-react';
import { formatPrice } from '../utils/currency';

export default function FlightCard({
  flight,
  currency,
  onSelectFlight,
  onViewDetails
}) {
  const {
    flightNumber,
    airline,
    cabinName,
    aircraft,
    origin,
    destination,
    departureTime,
    arrivalTime,
    duration,
    priceUSD,
    seatsRemaining,
    image,
    amenities
  } = flight;

  return (
    <div
      className="glass-card"
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      {/* Top Banner with Image & Badges */}
      <div style={{ position: 'relative', height: '200px', width: '100%', overflow: 'hidden' }}>
        <img
          src={image}
          alt={`${airline} ${cabinName}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=80';
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(6, 8, 13, 0.2) 0%, rgba(6, 8, 13, 0.85) 100%)'
          }}
        />

        {/* Airline & Cabin Badge */}
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            right: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span className="badge badge-gold" style={{ backdropFilter: 'blur(8px)' }}>
            <Sparkles size={11} /> {airline}
          </span>
          <span
            style={{
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)',
              padding: '0.25rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.72rem',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)'
            }}
          >
            {flightNumber}
          </span>
        </div>

        {/* Cabin Title bottom of image */}
        <div style={{ position: 'absolute', bottom: '0.85rem', left: '1.25rem', right: '1.25rem' }}>
          <h4
            style={{
              fontSize: '1.15rem',
              color: '#FFFFFF',
              fontFamily: 'var(--font-serif)',
              letterSpacing: '0.03em',
              marginBottom: '2px'
            }}
          >
            {cabinName}
          </h4>
          <span style={{ fontSize: '0.78rem', color: 'var(--gold-light)' }}>
            {aircraft}
          </span>
        </div>
      </div>

      {/* Flight Schedule / Timeline Body */}
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '1.25rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          {/* Departure */}
          <div>
            <div
              style={{
                fontSize: '1.45rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)'
              }}
            >
              {origin.code}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--gold-light)', fontWeight: 600 }}>
              {departureTime}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{origin.city}</div>
          </div>

          {/* Route Line & Duration */}
          <div style={{ textAlign: 'center', flex: 1, padding: '0 1rem' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              <Clock size={11} style={{ display: 'inline', marginRight: '3px' }} />
              {duration} (Non-Stop)
            </span>
            <div
              style={{
                position: 'relative',
                height: '2px',
                background: 'rgba(212, 175, 55, 0.3)',
                margin: '0 auto',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Plane size={14} color="var(--gold-primary)" style={{ background: 'var(--bg-surface)', padding: '0 2px' }} />
            </div>
            <span style={{ fontSize: '0.68rem', color: 'var(--gold-light)', marginTop: '4px', display: 'block' }}>
              Direct VIP Protocol
            </span>
          </div>

          {/* Arrival */}
          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                fontSize: '1.45rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)'
              }}
            >
              {destination.code}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--gold-light)', fontWeight: 600 }}>
              {arrivalTime}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{destination.city}</div>
          </div>
        </div>

        {/* Highlighted Amenities List */}
        <div style={{ margin: '1.25rem 0', flex: 1 }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>
            Suite Highlights
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            {amenities.slice(0, 3).map((amenity, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                <Check size={13} color="var(--gold-primary)" style={{ flexShrink: 0 }} />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & Actions Footer */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem'
          }}
        >
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Indicative Fare / Guest
            </div>
            <div
              style={{
                fontSize: '1.45rem',
                fontWeight: 800,
                fontFamily: 'var(--font-mono)',
                color: 'var(--gold-light)'
              }}
            >
              {formatPrice(priceUSD, currency)}
            </div>
            <span style={{ fontSize: '0.68rem', color: '#6EE7B7' }}>
              {seatsRemaining} suites available
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => onViewDetails(flight)}
              className="btn btn-outline-gold btn-sm"
              title="View Journey Specifications"
            >
              Details
            </button>
            <button
              onClick={() => onSelectFlight(flight)}
              className="btn btn-gold btn-sm"
            >
              <span>Reserve Suite</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
