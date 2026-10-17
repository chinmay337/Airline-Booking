import React from 'react';
import { Compass, ChevronRight } from 'lucide-react';
import { formatPrice } from '../utils/currency';

export default function AircraftCard({
  aircraft,
  currency,
  onViewSpecs,
  onEnquireOwnership
}) {
  const {
    id,
    manufacturer,
    model,
    category,
    year,
    condition,
    passengerCapacity,
    maxRangeNM,
    askingPriceUSD,
    image,
    totalHours
  } = aircraft;

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
      {/* Aircraft Photo Header */}
      <div style={{ position: 'relative', height: '210px', width: '100%', overflow: 'hidden' }}>
        <img
          src={image}
          alt={`${manufacturer} ${model}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=80';
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(6,8,13,0.2) 0%, rgba(6,8,13,0.85) 100%)' }} />

        {/* Condition & Category Badges */}
        <div style={{ position: 'absolute', top: '0.85rem', left: '0.85rem', right: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="badge badge-gold" style={{ backdropFilter: 'blur(8px)' }}>
            {condition}
          </span>
          <span
            style={{
              background: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(8px)',
              padding: '0.2rem 0.6rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.72rem',
              color: 'var(--text-secondary)'
            }}
          >
            {category}
          </span>
        </div>

        {/* Title at bottom of photo */}
        <div style={{ position: 'absolute', bottom: '0.75rem', left: '1.25rem', right: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {manufacturer}
          </div>
          <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', fontFamily: 'var(--font-serif)', margin: '2px 0 0' }}>
            {model}
          </h3>
        </div>
      </div>

      {/* Specifications Grid */}
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.75rem',
            paddingBottom: '1.25rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '1.25rem',
            textAlign: 'center'
          }}
        >
          <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.6rem 0.4rem', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Year</span>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{year}</div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.6rem 0.4rem', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Range</span>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--gold-light)' }}>
              {maxRangeNM.toLocaleString()} nm
            </div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.6rem 0.4rem', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Capacity</span>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
              {passengerCapacity} VIPs
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div style={{ marginBottom: '1.25rem', flex: 1 }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
            <Compass size={13} color="var(--gold-primary)" />
            <span>Airframe Time: {totalHours} Total Hours</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            {aircraft.highlights[0]}
          </div>
        </div>

        {/* Price & Action Footer */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem'
          }}
        >
          <div>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Indicative Asking Price
            </span>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--gold-light)', fontFamily: 'var(--font-mono)' }}>
              {formatPrice(askingPriceUSD, currency)}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.45rem' }}>
            <button
              onClick={() => onViewSpecs(aircraft)}
              className="btn btn-outline-gold btn-sm"
            >
              Specs
            </button>
            <button
              onClick={() => onEnquireOwnership(aircraft)}
              className="btn btn-gold btn-sm"
            >
              <span>Enquire</span>
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
