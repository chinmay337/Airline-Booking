import React from 'react';
import { Sparkles, Car, Compass, Utensils, Palmtree, Shield, Check, Phone, ArrowRight } from 'lucide-react';
import { CONCIERGE_SERVICES } from '../data/conciergeData';

export default function ConciergeView({ onOpenConciergeModal }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Car': return <Car size={22} color="var(--gold-primary)" />;
      case 'Compass': return <Compass size={22} color="var(--gold-primary)" />;
      case 'Utensils': return <Utensils size={22} color="var(--gold-primary)" />;
      case 'Palmtree': return <Palmtree size={22} color="var(--gold-primary)" />;
      case 'Shield': return <Shield size={22} color="var(--gold-primary)" />;
      default: return <Sparkles size={22} color="var(--gold-primary)" />;
    }
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '6rem' }}>
      <div className="container">
        
        {/* Header Title */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 4rem' }}>
          <span className="badge badge-gold" style={{ marginBottom: '0.85rem' }}>
            <Sparkles size={12} /> Bespoke Travel Lifestyle Office
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', color: '#FFFFFF', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>
            ÉMINENCE Concierge Services
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Your voyage extends far beyond the runway. From apron Rolls-Royce tarmac transfers and direct helicopter ski drops to Michelin-starred dining at 45,000 feet.
          </p>

          <div style={{ marginTop: '2rem' }}>
            <button
              onClick={() => onOpenConciergeModal()}
              className="btn btn-gold btn-lg pulse-gold"
            >
              <span>Submit Bespoke Concierge Request</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Services Showcase Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', marginBottom: '5rem' }}>
          {CONCIERGE_SERVICES.map((srv, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <div
                key={srv.id}
                className="glass-card"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  overflow: 'hidden',
                  alignItems: 'center'
                }}
              >
                {/* Photo Column */}
                <div style={{ height: '320px', position: 'relative', order: isReversed ? 2 : 1 }}>
                  <img
                    src={srv.image}
                    alt={srv.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(6,8,13,0.85) 100%)' }} />
                  <span className="badge badge-gold" style={{ position: 'absolute', top: '1.25rem', left: '1.25rem' }}>
                    {srv.category}
                  </span>
                </div>

                {/* Content Column */}
                <div style={{ padding: '2.5rem', order: isReversed ? 1 : 2 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(212, 175, 55, 0.1)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {getIcon(srv.icon)}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.45rem', color: '#FFFFFF', fontFamily: 'var(--font-serif)' }}>
                        {srv.title}
                      </h3>
                      <span style={{ fontSize: '0.78rem', color: 'var(--gold-light)' }}>
                        {srv.tagline}
                      </span>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                    {srv.description}
                  </p>

                  <div style={{ marginBottom: '1.75rem' }}>
                    <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>
                      Key Capabilities
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {srv.highlights.map((hl, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                          <Check size={14} color="var(--gold-primary)" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => onOpenConciergeModal(srv)}
                    className="btn btn-outline-gold btn-sm"
                  >
                    <span>Request This Service</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global 24/7 Operations Desk Box */}
        <div
          className="glass-panel"
          style={{
            padding: '3rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(14,20,33,0.9) 0%, rgba(7,10,16,0.9) 100%)',
            border: '2px solid var(--border-gold)'
          }}
        >
          <div style={{ maxWidth: '650px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1.8rem', color: '#FFFFFF', marginBottom: '0.75rem', fontFamily: 'var(--font-serif)' }}>
              Dedicated Lifestyle Management
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.75rem' }}>
              Whether you need urgent diplomatic flight permits, custom yacht tender coordination in the French Riviera, or rare Grand Cru cellars loaded onto your aircraft.
            </p>
            <button
              onClick={() => onOpenConciergeModal()}
              className="btn btn-gold"
            >
              <Phone size={16} />
              <span>Contact Senior Lifestyle Coordinator</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
