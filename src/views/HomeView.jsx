import React from 'react';
import { Plane, Crown, Sparkles, ChevronRight, Zap, ArrowUpRight } from 'lucide-react';
import FlightSearch from '../components/FlightSearch';
import EmptyLegCard from '../components/EmptyLegCard';
import DestinationCard from '../components/DestinationCard';
import AircraftCard from '../components/AircraftCard';
import { EMPTY_LEG_FLIGHTS, JET_CATEGORIES } from '../data/jetsData';
import { LUXURY_DESTINATIONS } from '../data/destinationsData';
import { MARKETPLACE_AIRCRAFT } from '../data/aircraftMarketplaceData';
import { formatPrice } from '../utils/currency';

export default function HomeView({
  setActiveView,
  currency,
  onSearchFlights,
  onOpenCharterModal,
  onBookEmptyLeg,
  onSelectDestination,
  onViewAircraftSpecs,
  onEnquireOwnership,
  onOpenMembershipModal
}) {
  return (
    <div style={{ paddingTop: '80px' }}>
      
      {/* CINEMATIC HERO SECTION */}
      <section
        style={{
          position: 'relative',
          minHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '4rem 1.5rem 6rem',
          overflow: 'hidden'
        }}
      >
        {/* Background Aviation Photography & Overlays */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            backgroundImage: `url('https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=2000&q=85')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 35%',
            filter: 'brightness(0.42)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: 'linear-gradient(180deg, rgba(6, 8, 13, 0.7) 0%, rgba(6, 8, 13, 0.45) 50%, rgba(6, 8, 13, 0.98) 100%)'
          }}
        />

        {/* Ambient Gold Radial Flare */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '350px',
            background: 'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.18) 0%, transparent 70%)',
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />

        {/* Hero Content */}
        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '980px' }}>
          
          {/* Brand Tagline Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
            <span
              className="badge badge-gold pulse-gold"
              style={{
                padding: '0.45rem 1.25rem',
                fontSize: '0.82rem',
                letterSpacing: '0.18em'
              }}
            >
              <Crown size={14} color="var(--gold-primary)" />
              <span>THE ART OF RISING ABOVE</span>
            </span>
          </div>

          {/* Main Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 4.4rem)',
              lineHeight: 1.12,
              fontWeight: 800,
              fontFamily: 'var(--font-serif)',
              letterSpacing: '0.02em',
              marginBottom: '1.5rem',
              color: '#FFFFFF'
            }}
          >
            Your World.{' '}
            <span className="text-gold-gradient">Without Compromise.</span>
          </h1>

          {/* Supporting Text */}
          <p
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              maxWidth: '750px',
              margin: '0 auto 2.5rem',
              fontWeight: 300
            }}
          >
            Exceptional journeys, curated for those who expect more. Discover the finest commercial cabins and the freedom of private aviation.
          </p>

          {/* Calls to Action */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.25rem',
              marginBottom: '4rem'
            }}
          >
            <button
              onClick={() => setActiveView('first-class')}
              className="btn btn-gold btn-lg"
              style={{ minWidth: '220px' }}
            >
              <Sparkles size={18} />
              <span>Explore First Class</span>
            </button>

            <button
              onClick={() => setActiveView('private-charter')}
              className="btn btn-outline-gold btn-lg"
              style={{ minWidth: '220px' }}
            >
              <Plane size={18} />
              <span>Discover Private Aviation</span>
            </button>
          </div>

          {/* Hero Credentials Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.5rem',
              padding: '1.5rem',
              background: 'rgba(11, 15, 25, 0.65)',
              backdropFilter: 'blur(16px)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(212, 175, 55, 0.2)'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gold-light)', fontFamily: 'var(--font-mono)' }}>
                4 Hours
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Guaranteed Jet Callout
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gold-light)', fontFamily: 'var(--font-mono)' }}>
                5,200+
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Worldwide Private FBOs
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gold-light)', fontFamily: 'var(--font-mono)' }}>
                100%
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Discreet Ramp Escort
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gold-light)', fontFamily: 'var(--font-mono)' }}>
                3-Star
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Michelin In-Flight Menus
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* LUXURY FLIGHT SEARCH CONCIERGE BAR */}
      <section style={{ marginTop: '-40px', position: 'relative', zIndex: 10, padding: '0 1rem' }}>
        <FlightSearch onSearch={onSearchFlights} />
      </section>

      {/* PRIVATE AVIATION FLEET CATEGORIES */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3rem' }}>
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
                Charter Division
              </span>
              <h2 style={{ fontSize: '2.4rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                Curated Private Aviation Fleet
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', fontSize: '0.95rem' }}>
                From regional Very Light Jets to intercontinental Ultra-Long-Range flagships, access over 7,000 aircraft worldwide on demand.
              </p>
            </div>
            <button
              onClick={() => setActiveView('private-charter')}
              className="btn btn-outline-gold"
            >
              <span>View All Fleet Categories</span>
              <ArrowUpRight size={16} />
            </button>
          </div>

          {/* Jet Categories Grid */}
          <div className="grid grid-cols-3">
            {JET_CATEGORIES.slice(0, 3).map((cat) => (
              <div key={cat.id} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 0%, rgba(6,8,13,0.9) 100%)' }} />
                  <span className="badge badge-gold" style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                    {cat.badge}
                  </span>
                  <div style={{ position: 'absolute', bottom: '0.75rem', left: '1rem', right: '1rem' }}>
                    <h3 style={{ fontSize: '1.3rem', color: '#FFFFFF' }}>{cat.name}</h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--gold-light)' }}>{cat.sampleModel}</span>
                  </div>
                </div>

                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                    {cat.description}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', marginBottom: '1.25rem', fontSize: '0.78rem' }}>
                    <div style={{ color: 'var(--text-muted)' }}>Capacity: <strong style={{ color: 'var(--text-primary)' }}>{cat.capacity}</strong></div>
                    <div style={{ color: 'var(--text-muted)' }}>Range: <strong style={{ color: 'var(--text-primary)' }}>{cat.maxRange.split(' ')[0]} nm</strong></div>
                    <div style={{ color: 'var(--text-muted)' }}>Speed: <strong style={{ color: 'var(--text-primary)' }}>{cat.speed.split(' ')[0]} ktas</strong></div>
                    <div style={{ color: 'var(--text-muted)' }}>Rate: <strong style={{ color: 'var(--gold-light)', fontFamily: 'var(--font-mono)' }}>{formatPrice(cat.hourlyRateUSD, currency)}/hr</strong></div>
                  </div>

                  <button
                    onClick={onOpenCharterModal}
                    className="btn btn-outline-gold btn-sm"
                    style={{ marginTop: 'auto', width: '100%' }}
                  >
                    <span>Charter This Category</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMPTY-LEG FLIGHT DEALS (EXCLUSIVE DISCOUNTS) */}
      <section style={{ padding: '5rem 0', background: 'rgba(11, 15, 25, 0.45)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div>
              <span className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>
                <Zap size={12} /> Spontaneous Repositioning Slots
              </span>
              <h2 style={{ fontSize: '2.3rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                Featured Empty-Leg Flights
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', fontSize: '0.92rem' }}>
                Secure entire private aircraft at up to 65% below traditional charter rates for pre-scheduled ferry positioning routes.
              </p>
            </div>
            <button
              onClick={() => setActiveView('private-charter')}
              className="btn btn-outline-gold"
            >
              <span>Explore All Empty Legs</span>
              <ArrowUpRight size={15} />
            </button>
          </div>

          <div className="grid grid-cols-2">
            {EMPTY_LEG_FLIGHTS.slice(0, 2).map((emptyLeg) => (
              <EmptyLegCard
                key={emptyLeg.id}
                emptyLeg={emptyLeg}
                currency={currency}
                onBookEmptyLeg={onBookEmptyLeg}
              />
            ))}
          </div>
        </div>
      </section>

      {/* DESTINATION SHOWCASE TEASER */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
            <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
              Global Sanctuaries
            </span>
            <h2 style={{ fontSize: '2.4rem', color: '#FFFFFF', marginBottom: '0.75rem' }}>
              Where Royalty & Visionaries Touch Down
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              From secluded Maldivian private islands to the discreet private salons of Le Bourget and Samedan St. Moritz.
            </p>
          </div>

          <div className="grid grid-cols-3">
            {LUXURY_DESTINATIONS.slice(0, 3).map((dest) => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                onSelectDestination={onSelectDestination}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button
              onClick={() => setActiveView('destinations')}
              className="btn btn-outline-gold btn-lg"
            >
              <span>View All 8 Global Luxury Destinations</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* AIRCRAFT MARKETPLACE TEASER */}
      <section style={{ padding: '6rem 0', background: 'linear-gradient(180deg, transparent 0%, rgba(14,20,33,0.7) 100%)', borderTop: '1px solid rgba(212, 175, 55, 0.15)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3rem' }}>
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
                Brokerage & Acquisitions
              </span>
              <h2 style={{ fontSize: '2.4rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                Private Aircraft Collection
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', fontSize: '0.95rem' }}>
                Acquire factory-new delivery positions and pristine pre-owned business jets with turnkey management and charter yield optimization.
              </p>
            </div>
            <button
              onClick={() => setActiveView('marketplace')}
              className="btn btn-outline-gold"
            >
              <span>Browse Aircraft Marketplace</span>
              <ArrowUpRight size={15} />
            </button>
          </div>

          <div className="grid grid-cols-3">
            {MARKETPLACE_AIRCRAFT.slice(0, 3).map((aircraft) => (
              <AircraftCard
                key={aircraft.id}
                aircraft={aircraft}
                currency={currency}
                onViewSpecs={onViewAircraftSpecs}
                onEnquireOwnership={onEnquireOwnership}
              />
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP CALLOUT BANNER */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div
            className="glass-panel"
            style={{
              padding: '4rem 2.5rem',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, rgba(17, 23, 38, 0.95) 0%, rgba(10, 14, 24, 0.95) 100%)',
              border: '2px solid var(--border-gold)'
            }}
          >
            <div style={{ position: 'relative', zIndex: 2, maxWidth: '750px', margin: '0 auto' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(212, 175, 55, 0.15)',
                  border: '1px solid var(--border-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem'
                }}
              >
                <Crown size={28} color="var(--gold-primary)" />
              </div>

              <h2 style={{ fontSize: '2.5rem', color: '#FFFFFF', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>
                Elevate to the Sovereign Circle
              </h2>

              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                Guaranteed worldwide aircraft on the apron within 4 hours. Dedicated lifestyle directors, zero repositioning fees, and bespoke helicopter tarmac links.
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={onOpenMembershipModal}
                  className="btn btn-gold btn-lg pulse-gold"
                >
                  <Sparkles size={16} />
                  <span>Request Membership Invitation</span>
                </button>
                <button
                  onClick={() => setActiveView('membership')}
                  className="btn btn-outline-gold btn-lg"
                >
                  <span>Compare Membership Tiers</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
