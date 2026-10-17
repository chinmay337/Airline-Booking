import React from 'react';
import { X, Shield, Check, ChevronRight } from 'lucide-react';
import { formatPrice } from '../utils/currency';

export default function AircraftDetailsModal({
  aircraft,
  currency,
  onClose,
  onEnquire
}) {
  if (!aircraft) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '850px' }}
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="badge badge-gold">{aircraft.condition}</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              Tail: {aircraft.tailNumber}
            </span>
          </div>
          <button className="btn-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Title Banner */}
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {aircraft.manufacturer}
            </span>
            <h2 style={{ fontSize: '1.85rem', color: 'var(--text-primary)', margin: '2px 0 6px' }}>
              {aircraft.model}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              <span>Category: <strong>{aircraft.category}</strong></span>
              <span>•</span>
              <span>Location: {aircraft.location}</span>
            </div>
          </div>

          {/* Photo Gallery (Exterior & Cabin Interior) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem',
              marginBottom: '1.75rem'
            }}
          >
            <div style={{ height: '220px', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <img
                src={aircraft.image}
                alt="Exterior Airframe"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>
            <div style={{ height: '220px', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <img
                src={aircraft.interiorImage || aircraft.image}
                alt="Executive Cabin Layout"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '1rem',
              marginBottom: '1.75rem'
            }}
          >
            <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
              <span className="form-label">Max Range</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gold-light)', fontFamily: 'var(--font-mono)' }}>
                {aircraft.maxRangeNM.toLocaleString()} nm
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>({aircraft.maxRangeKM.toLocaleString()} km)</span>
            </div>

            <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
              <span className="form-label">Cruise Speed</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gold-light)', fontFamily: 'var(--font-mono)' }}>
                Mach {aircraft.maxSpeedMach}
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>High-Speed Cruise</span>
            </div>

            <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
              <span className="form-label">Passenger Capacity</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gold-light)', fontFamily: 'var(--font-mono)' }}>
                {aircraft.passengerCapacity} Seats
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Executive Configuration</span>
            </div>

            <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
              <span className="form-label">Airframe Hours</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gold-light)', fontFamily: 'var(--font-mono)' }}>
                {aircraft.totalHours} hrs
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Since New</span>
            </div>
          </div>

          {/* Technical Specifications */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.75rem' }}>
            <div>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
                Key Equipment & Highlights
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {aircraft.highlights.map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    <Check size={14} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <span className="form-label">Avionics Architecture</span>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {aircraft.avionics}
                </p>
              </div>

              <div>
                <span className="form-label">Powerplant</span>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {aircraft.engines}
                </p>
              </div>

              <div>
                <span className="form-label">Cabin & Baggage Volume</span>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {aircraft.cabinDimensions} • {aircraft.baggageCapacity}
                </p>
              </div>
            </div>
          </div>

          {/* Brokerage Notice */}
          <div
            style={{
              padding: '0.75rem 1.25rem',
              background: 'rgba(212, 175, 55, 0.05)',
              borderRadius: 'var(--radius-sm)',
              border: '1px dashed var(--border-gold)',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem'
            }}
          >
            <Shield size={16} color="var(--gold-primary)" style={{ flexShrink: 0 }} />
            <span>
              <strong>Demonstration Marketplace:</strong> Aircraft specifications and asking prices represent illustrative aviation listings for evaluation.
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <div style={{ marginRight: 'auto' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Indicative Asking Price
            </span>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--gold-light)', fontFamily: 'var(--font-mono)' }}>
              {formatPrice(aircraft.askingPriceUSD, currency)}
            </div>
          </div>

          <button className="btn btn-outline-gold" onClick={onClose}>
            Back
          </button>
          <button
            className="btn btn-gold"
            onClick={() => {
              onClose();
              onEnquire(aircraft);
            }}
          >
            <span>Enquire About Ownership</span>
            <ChevronRight size={15} />
          </button>
        </div>

      </div>
    </div>
  );
}
