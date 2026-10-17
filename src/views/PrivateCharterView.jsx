import React, { useState } from 'react';
import { Crown, Plane, Sparkles, Shield, Clock, Check, Zap } from 'lucide-react';
import EmptyLegCard from '../components/EmptyLegCard';
import { JET_CATEGORIES, EMPTY_LEG_FLIGHTS } from '../data/jetsData';
import { formatPrice } from '../utils/currency';

export default function PrivateCharterView({
  currency,
  onOpenCharterModal,
  onBookEmptyLeg
}) {
  const [selectedCategoryTab, setSelectedCategoryTab] = useState('all');

  const filteredCategories = selectedCategoryTab === 'all'
    ? JET_CATEGORIES
    : JET_CATEGORIES.filter((c) => c.id === selectedCategoryTab);

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '6rem' }}>
      
      {/* Hero Banner */}
      <section style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto 4rem', padding: '0 1.5rem' }}>
        <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>
          <Crown size={13} /> The Sovereign Fleet
        </span>
        <h1
          style={{
            fontSize: 'clamp(2.4rem, 5.5vw, 3.8rem)',
            color: '#FFFFFF',
            lineHeight: 1.15,
            fontFamily: 'var(--font-serif)',
            marginBottom: '1.25rem'
          }}
        >
          Your Time. Your Aircraft.{' '}
          <span className="text-gold-gradient">Your Rules.</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
          Experience the pinnacle of aviation autonomy. Bypass commercial terminals entirely, step directly from tarmac to salon, and take flight on your own timetable to over 5,200 private airports globally.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => onOpenCharterModal()}
            className="btn btn-gold btn-lg pulse-gold"
          >
            <Crown size={18} />
            <span>Request On-Demand Charter</span>
          </button>
          <a
            href="#empty-legs-section"
            className="btn btn-outline-gold btn-lg"
          >
            <Zap size={16} />
            <span>Explore Empty-Leg Flights</span>
          </a>
        </div>
      </section>

      {/* Exclusivity Advantage Pillars */}
      <section className="container" style={{ marginBottom: '5.5rem' }}>
        <div className="grid grid-cols-4">
          <div className="glass-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.12)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <Clock size={22} color="var(--gold-primary)" />
            </div>
            <h4 style={{ fontSize: '1.1rem', color: '#FFFFFF', marginBottom: '0.4rem' }}>15-Minute Ramp Arrival</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Arrive at the private FBO lounge mere minutes before departure. Zero queues, zero terminal confusion.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.12)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <Shield size={22} color="var(--gold-primary)" />
            </div>
            <h4 style={{ fontSize: '1.1rem', color: '#FFFFFF', marginBottom: '0.4rem' }}>Discreet Customs & Tarmac</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Immigration officers clear your passport directly in the executive salon or at aircraft steps.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.12)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <Plane size={22} color="var(--gold-primary)" />
            </div>
            <h4 style={{ fontSize: '1.1rem', color: '#FFFFFF', marginBottom: '0.4rem' }}>5,200+ Private Runways</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Land closer to your final destination: Samedan St. Moritz, Aspen, London Farnborough, or Cannes Mandelieu.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.12)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <Sparkles size={22} color="var(--gold-primary)" />
            </div>
            <h4 style={{ fontSize: '1.1rem', color: '#FFFFFF', marginBottom: '0.4rem' }}>Pure Bespoke Galley</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Your favourite vintage Grand Cru, Imperial caviar, and tailored dietary regimens prepared fresh.
            </p>
          </div>
        </div>
      </section>

      {/* AIRCRAFT FLEET CATEGORIES SECTION */}
      <section className="container" style={{ marginBottom: '6rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div>
            <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
              Aircraft Classifications
            </span>
            <h2 style={{ fontSize: '2.4rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
              The Private Aviation Fleet
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', fontSize: '0.95rem' }}>
              Select the appropriate aircraft tier based on party capacity, flight duration, and transcontinental range requirements.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            <button
              onClick={() => setSelectedCategoryTab('all')}
              style={{
                padding: '0.4rem 1rem',
                borderRadius: 'var(--radius-full)',
                background: selectedCategoryTab === 'all' ? 'var(--gold-gradient)' : 'rgba(255, 255, 255, 0.05)',
                color: selectedCategoryTab === 'all' ? '#07090E' : 'var(--text-secondary)',
                border: 'none',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              All Categories
            </button>
            {JET_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryTab(cat.id)}
                style={{
                  padding: '0.4rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  background: selectedCategoryTab === cat.id ? 'var(--gold-gradient)' : 'rgba(255, 255, 255, 0.05)',
                  color: selectedCategoryTab === cat.id ? '#07090E' : 'var(--text-secondary)',
                  border: 'none',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Category Cards Grid */}
        <div className="grid grid-cols-2">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="glass-card"
              style={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ position: 'relative', height: '230px', overflow: 'hidden' }}>
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=80';
                  }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 0%, rgba(6,8,13,0.92) 100%)' }} />

                <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                  <span className="badge badge-gold">{cat.badge}</span>
                </div>

                <div style={{ position: 'absolute', bottom: '1rem', left: '1.25rem', right: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.5rem', color: '#FFFFFF', fontFamily: 'var(--font-serif)' }}>
                    {cat.name}
                  </h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--gold-light)' }}>
                    Representative: {cat.sampleModel}
                  </span>
                </div>
              </div>

              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {cat.description}
                </p>

                {/* Key Metrics Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '0.75rem',
                    padding: '0.85rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: '1.25rem',
                    textAlign: 'center'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Capacity</span>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{cat.capacity}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Range</span>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--gold-light)' }}>{cat.maxRange.split(' ')[0]} nm</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Cruise Speed</span>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{cat.speed.split(' ')[0]} ktas</strong>
                  </div>
                </div>

                {/* Feature Bullets */}
                <div style={{ marginBottom: '1.5rem', flex: 1 }}>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                    Cabin Amenities
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.45rem' }}>
                    {cat.features.map((feat, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        <Check size={13} color="var(--gold-primary)" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer with Hourly Rate & Action */}
                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Indicative Charter Rate
                    </span>
                    <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--gold-light)', fontFamily: 'var(--font-mono)' }}>
                      {formatPrice(cat.hourlyRateUSD, currency)}
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 400 }}> / flight hour</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenCharterModal(cat.id)}
                    className="btn btn-gold btn-sm"
                  >
                    <span>Request Flight</span>
                    <Crown size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EMPTY-LEG SECTION */}
      <section id="empty-legs-section" className="container" style={{ marginBottom: '4rem' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <span className="badge badge-emerald">
              <Zap size={12} /> Empty-Leg Positioning Discovery
            </span>
          </div>
          <h2 style={{ fontSize: '2.2rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
            One-Way Ferry Flights at Preferential Rates
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', fontSize: '0.92rem' }}>
            When private jets reposition empty to their next charter base, we unlock the entire aircraft for spontaneous booking at up to 65% savings.
          </p>
        </div>

        <div className="grid grid-cols-2">
          {EMPTY_LEG_FLIGHTS.map((emptyLeg) => (
            <EmptyLegCard
              key={emptyLeg.id}
              emptyLeg={emptyLeg}
              currency={currency}
              onBookEmptyLeg={onBookEmptyLeg}
            />
          ))}
        </div>
      </section>

    </div>
  );
}
