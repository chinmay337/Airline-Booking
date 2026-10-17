import React from 'react';
import { X, Plane, Shield, Sparkles, Check, Luggage, Utensils } from 'lucide-react';
import { formatPrice } from '../utils/currency';

export default function FlightDetailsModal({ flight, currency, onClose, onReserve }) {
  if (!flight) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '850px' }}>
        
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="badge badge-gold">
              <Sparkles size={12} /> {flight.airline}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {flight.flightNumber}
            </span>
          </div>
          <button className="btn-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body" style={{ padding: '2rem' }}>
          
          {/* Main Title */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
              {flight.cabinName}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--gold-light)', fontSize: '0.9rem' }}>
              <Plane size={16} />
              <span>{flight.aircraft}</span>
              <span>•</span>
              <span>Non-Stop Presidential Service</span>
            </div>
          </div>

          {/* Image Showcase Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem'
            }}
          >
            <div style={{ height: '220px', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <img
                src={flight.suiteImage || flight.image}
                alt="Suite Interior"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>
            <div style={{ height: '220px', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <img
                src={flight.image}
                alt="Flight Experience"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>
          </div>

          {/* Schedule Banner */}
          <div
            className="glass-card"
            style={{
              padding: '1.5rem',
              marginBottom: '2rem',
              background: 'rgba(212, 175, 55, 0.05)',
              border: '1px solid var(--border-gold)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="form-label" style={{ display: 'block', marginBottom: '4px' }}>Departure</span>
                <div style={{ fontSize: '1.3rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  {flight.departureTime}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  {flight.origin.city} ({flight.origin.code})
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{flight.origin.airport}</div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--gold-primary)', fontFamily: 'var(--font-mono)' }}>
                  {flight.duration}
                </span>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Direct Route</div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span className="form-label" style={{ display: 'block', marginBottom: '4px' }}>Arrival</span>
                <div style={{ fontSize: '1.3rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  {flight.arrivalTime}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  {flight.destination.city} ({flight.destination.code})
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{flight.destination.airport}</div>
              </div>
            </div>
          </div>

          {/* Amenities & Dining Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div>
              <h4 style={{ fontSize: '1rem', color: 'var(--gold-light)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={16} /> Suite Inclusions
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {flight.amenities.map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <Check size={14} color="var(--gold-primary)" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '1rem', color: 'var(--gold-light)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Utensils size={16} /> Gastronomy
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {flight.dining}
              </p>

              <h4 style={{ fontSize: '1rem', color: 'var(--gold-light)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Luggage size={16} /> Baggage Protocol
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {flight.baggage}
              </p>
            </div>
          </div>

          {/* Demonstration Notice */}
          <div
            style={{
              padding: '0.85rem 1.25rem',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px dashed var(--border-gold)',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem'
            }}
          >
            <Shield size={16} color="var(--gold-primary)" style={{ flexShrink: 0 }} />
            <span>
              <strong>Demonstration Aviation Suite:</strong> Demonstration flight product. Fares and timings represent simulated luxury commercial suites for evaluation.
            </span>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="modal-footer">
          <div style={{ marginRight: 'auto' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Indicative Fare</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gold-light)', fontFamily: 'var(--font-mono)' }}>
              {formatPrice(flight.priceUSD, currency)}
            </span>
          </div>
          <button className="btn btn-outline-gold" onClick={onClose}>
            Back
          </button>
          <button
            className="btn btn-gold"
            onClick={() => {
              onClose();
              onReserve(flight);
            }}
          >
            <span>Reserve This Suite</span>
            <Plane size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}
