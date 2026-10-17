import React from 'react';
import { Plane, Sparkles, ChevronRight } from 'lucide-react';

export default function DestinationCard({ destination, onSelectDestination }) {
  const {
    city,
    country,
    code,
    region,
    tagline,
    description,
    fbo,
    flightTimeFromLondon,
    recommendedAircraft,
    heroImage,
    luxuryHighlights
  } = destination;

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
      {/* Destination Photo Header */}
      <div style={{ position: 'relative', height: '230px', width: '100%', overflow: 'hidden' }}>
        <img
          src={heroImage}
          alt={`${city}, ${country}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(6,8,13,0.15) 0%, rgba(6,8,13,0.88) 100%)' }} />

        {/* Airport Code Badge */}
        <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
          <span
            style={{
              background: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--border-gold)',
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              color: 'var(--gold-light)'
            }}
          >
            {code}
          </span>
        </div>

        {/* Region */}
        <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
          <span className="badge badge-gold" style={{ backdropFilter: 'blur(8px)' }}>
            {region}
          </span>
        </div>

        {/* City Title */}
        <div style={{ position: 'absolute', bottom: '0.85rem', left: '1.25rem', right: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {country}
          </div>
          <h3 style={{ fontSize: '1.6rem', color: '#FFFFFF', fontFamily: 'var(--font-serif)', margin: '2px 0 0' }}>
            {city}
          </h3>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: '0.82rem', color: 'var(--gold-light)', fontStyle: 'italic', marginBottom: '0.75rem' }}>
          "{tagline}"
        </p>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
          {description}
        </p>

        {/* FBO & Aircraft Specs */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            padding: '0.85rem 1rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '1.25rem',
            fontSize: '0.78rem'
          }}
        >
          <div style={{ color: 'var(--text-muted)', marginBottom: '3px' }}>
            Private FBO: <strong style={{ color: 'var(--text-primary)' }}>{fbo}</strong>
          </div>
          <div style={{ color: 'var(--text-muted)' }}>
            Recommended: <strong style={{ color: 'var(--gold-light)' }}>{recommendedAircraft}</strong>
          </div>
        </div>

        {/* Highlights */}
        <div style={{ marginBottom: '1.5rem', flex: 1 }}>
          <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
            Curated Experiences
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {luxuryHighlights.map((hl, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <Sparkles size={12} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>{hl}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Button */}
        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button
            onClick={() => onSelectDestination(destination)}
            className="btn btn-outline-gold"
            style={{ width: '100%' }}
          >
            <Plane size={14} />
            <span>Fly to {city}</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
