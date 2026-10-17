import React from 'react';
import { Plane, Shield, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer({ setActiveView }) {
  const currentYear = 2026;

  const handleNav = (viewId) => {
    setActiveView(viewId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: '#04060A',
        borderTop: '1px solid rgba(212, 175, 55, 0.25)',
        paddingTop: '4.5rem',
        paddingBottom: '2.5rem',
        marginTop: '6rem',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
            marginBottom: '3.5rem'
          }}
        >
          {/* Brand Column */}
          <div style={{ maxWidth: '340px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  background: 'rgba(212, 175, 55, 0.15)',
                  border: '1px solid var(--border-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Plane size={20} color="var(--gold-primary)" style={{ transform: 'rotate(-45deg)' }} />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  letterSpacing: '0.12em',
                  background: 'var(--gold-gradient)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                ÉMINENCE
              </span>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              The Art of Rising Above. Uniting the world's most luxurious commercial First Class suites, on-demand private jet charters, and premier aircraft brokerage into one prestigious digital platform.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <span className="badge badge-gold">Member FBO Protocol</span>
              <span className="badge badge-blue">Global Fleet</span>
            </div>
          </div>

          {/* Luxury Aviation Navigation */}
          <div>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1.25rem' }}>
              Aviation Portals
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              <li>
                <button
                  onClick={() => handleNav('first-class')}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.85rem' }}
                >
                  First Class Commercial Suites
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('private-charter')}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.85rem' }}
                >
                  Private Jet Charter & Empty Legs
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('marketplace')}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.85rem' }}
                >
                  Private Aircraft Collection (Sales)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('destinations')}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.85rem' }}
                >
                  Global Luxury Destinations
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('my-voyages')}
                  style={{ background: 'transparent', border: 'none', color: 'var(--gold-light)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}
                >
                  My Voyages & Boarding Passes
                </button>
              </li>
            </ul>
          </div>

          {/* Concierge & Membership */}
          <div>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1.25rem' }}>
              Prestige Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              <li>
                <button
                  onClick={() => handleNav('membership')}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.85rem' }}
                >
                  Privé, Élite & Sovereign Memberships
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('concierge')}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.85rem' }}
                >
                  Airside Chauffeur & Helicopter Transfers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('concierge')}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.85rem' }}
                >
                  Michelin In-Flight Gastronomy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('concierge')}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.85rem' }}
                >
                  Diplomatic Security & Fast-Track
                </button>
              </li>
            </ul>
          </div>

          {/* Global Operations Dispatch */}
          <div>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1.25rem' }}>
              Private Aviation Desk
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Phone size={14} color="var(--gold-primary)" />
                <span>+971 4 800 EMINENCE (Demonstration Line)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Mail size={14} color="var(--gold-primary)" />
                <span>concierge@eminence-aviation.demo</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <MapPin size={14} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Al Maktoum VIP Aviation Sanctuary, Dubai South • Le Bourget, Paris</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Shield size={14} color="var(--gold-primary)" />
                <span>FAA Part 135 / EASA AOC Partner Standards</span>
              </div>
            </div>
          </div>
        </div>

        {/* Academic / Viva Disclaimer Banner */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            background: 'rgba(212, 175, 55, 0.05)',
            border: '1px solid var(--border-gold)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}
        >
          <div>
            <div style={{ fontWeight: 700, color: 'var(--gold-light)', fontSize: '0.9rem', marginBottom: '2px' }}>
              Frontend Engineering Assignment 1 — Task 2: Single-Page Application (SPA) Using React.js
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Student: <strong>Chinmay Vinayak Thukaru</strong> | Atharva College of Engineering, Mumbai | B.E. Information Technology
            </div>
          </div>
          <span className="badge badge-gold" style={{ fontSize: '0.75rem' }}>
            React Functional Components • useReducer • useState • Props • localStorage
          </span>
        </div>

        {/* Bottom Copyright */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '1.5rem',
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            © {currentYear} ÉMINENCE Private Jet & Luxury Airline Consortium. Demonstration academic software.
          </div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <span>Privacy Charter</span>
            <span>Terms of Carriage</span>
            <span>Empty-Leg Protocol</span>
            <span>Air Operator Certificate</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
