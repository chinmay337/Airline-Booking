import React from 'react';
import { Plane, Calendar, Clock, Sparkles, ArrowRight, Shield, Zap } from 'lucide-react';
import { formatPrice } from '../utils/currency';

export default function EmptyLegCard({ emptyLeg, currency, onBookEmptyLeg }) {
  const {
    id,
    route,
    origin,
    destination,
    date,
    departureWindow,
    aircraft,
    tailNumber,
    seatsAvailable,
    regularPriceUSD,
    emptyLegPriceUSD,
    savingsPercent,
    image
  } = emptyLeg;

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
      {/* Visual Header */}
      <div style={{ position: 'relative', height: '180px', width: '100%', overflow: 'hidden' }}>
        <img
          src={image}
          alt={route}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(6,8,13,0.3) 0%, rgba(6,8,13,0.85) 100%)' }} />

        {/* Savings Badge */}
        <div style={{ position: 'absolute', top: '0.85rem', right: '0.85rem' }}>
          <span
            className="badge badge-emerald"
            style={{ fontWeight: 800, fontFamily: 'var(--font-mono)', backdropFilter: 'blur(8px)' }}
          >
            <Zap size={11} /> Save {savingsPercent}
          </span>
        </div>

        <div style={{ position: 'absolute', top: '0.85rem', left: '0.85rem' }}>
          <span className="badge badge-gold" style={{ backdropFilter: 'blur(8px)' }}>
            Empty Leg Deal
          </span>
        </div>

        <div style={{ position: 'absolute', bottom: '0.75rem', left: '1rem', right: '1rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--gold-light)', fontFamily: 'var(--font-mono)' }}>
            Tail: {tailNumber}
          </div>
          <h4 style={{ fontSize: '1.1rem', color: '#FFFFFF', fontFamily: 'var(--font-serif)', marginTop: '2px' }}>
            {aircraft}
          </h4>
        </div>
      </div>

      {/* Body Details */}
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Route Details */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
              {origin.code}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--gold-primary)' }}>
              <div style={{ width: '30px', height: '1px', background: 'var(--border-gold)' }} />
              <Plane size={14} />
              <div style={{ width: '30px', height: '1px', background: 'var(--border-gold)' }} />
            </div>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
              {destination.code}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span>{origin.city}</span>
            <span>{destination.city}</span>
          </div>
        </div>

        {/* Schedule & Availability */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={13} color="var(--gold-primary)" />
            <span>Departure: <strong>{date}</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={13} color="var(--gold-primary)" />
            <span>Window: {departureWindow}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={13} color="var(--gold-primary)" />
            <span>Full Aircraft: Up to {seatsAvailable} Passengers</span>
          </div>
        </div>

        {/* Price & Action */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '0.85rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
              {formatPrice(regularPriceUSD, currency)}
            </div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--gold-light)', fontFamily: 'var(--font-mono)' }}>
              {formatPrice(emptyLegPriceUSD, currency)}
            </div>
          </div>

          <button
            onClick={() => onBookEmptyLeg(emptyLeg)}
            className="btn btn-gold btn-sm"
          >
            <span>Book Aircraft</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
