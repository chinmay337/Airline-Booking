import React, { useState, useMemo } from 'react';
import { Filter, Shield, Building, CheckCircle2 } from 'lucide-react';
import AircraftCard from '../components/AircraftCard';
import { MARKETPLACE_AIRCRAFT } from '../data/aircraftMarketplaceData';
import { formatPrice } from '../utils/currency';

export default function MarketplaceView({
  currency,
  onViewAircraftSpecs,
  onEnquireOwnership
}) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedCondition, setSelectedCondition] = useState('ALL');
  const [maxBudgetUSD, setMaxBudgetUSD] = useState(85000000);

  const categories = useMemo(() => {
    const set = new Set(MARKETPLACE_AIRCRAFT.map((a) => a.category));
    return ['ALL', ...Array.from(set)];
  }, []);

  const filteredAircraft = useMemo(() => {
    return MARKETPLACE_AIRCRAFT.filter((ac) => {
      if (selectedCategory !== 'ALL' && ac.category !== selectedCategory) return false;
      if (selectedCondition !== 'ALL') {
        if (selectedCondition === 'New' && !ac.condition.includes('New')) return false;
        if (selectedCondition === 'Pre-Owned' && !ac.condition.includes('Pre-Owned')) return false;
      }
      if (ac.askingPriceUSD > maxBudgetUSD) return false;
      return true;
    });
  }, [selectedCategory, selectedCondition, maxBudgetUSD]);

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '6rem' }}>
      <div className="container">
        
        {/* Title Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3rem' }}>
          <span className="badge badge-gold" style={{ marginBottom: '0.85rem' }}>
            <Building size={12} /> ÉMINENCE AIRCRAFT BROKERAGE
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', color: '#FFFFFF', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>
            Private Aircraft Collection
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Acquire pristine business aircraft with turn-key acquisition representation, technical pre-buy inspections, and international registry structuring.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div
          className="glass-card"
          style={{
            padding: '1.25rem 1.75rem',
            marginBottom: '2.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.25rem'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--gold-light)', fontSize: '0.82rem', fontWeight: 600 }}>
              <Filter size={14} />
              <span>Filters:</span>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-control"
              style={{ width: 'auto', padding: '0.4rem 2rem 0.4rem 0.8rem', fontSize: '0.8rem', height: '36px' }}
            >
              <option value="ALL">All Aircraft Categories</option>
              {categories.filter(c => c !== 'ALL').map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Condition Filter */}
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="form-control"
              style={{ width: 'auto', padding: '0.4rem 2rem 0.4rem 0.8rem', fontSize: '0.8rem', height: '36px' }}
            >
              <option value="ALL">All Conditions (New & Pre-Owned)</option>
              <option value="New">Factory New / Delivery Position</option>
              <option value="Pre-Owned">Pristine Pre-Owned</option>
            </select>
          </div>

          {/* Budget Range Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Max Budget:</span>
            <span style={{ fontSize: '1rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--gold-light)' }}>
              {formatPrice(maxBudgetUSD, currency)}
            </span>
          </div>
        </div>

        {/* Listings Counter */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Available Listings: <strong>{filteredAircraft.length}</strong> Aircraft
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Shield size={13} color="var(--gold-primary)" />
            Demonstration brokerage inventory. All asking prices represent indicative market values.
          </span>
        </div>

        {/* Aircraft Listings Grid */}
        {filteredAircraft.length > 0 ? (
          <div className="grid grid-cols-3">
            {filteredAircraft.map((aircraft) => (
              <AircraftCard
                key={aircraft.id}
                aircraft={aircraft}
                currency={currency}
                onViewSpecs={onViewAircraftSpecs}
                onEnquireOwnership={onEnquireOwnership}
              />
            ))}
          </div>
        ) : (
          <div className="glass-card" style={{ padding: '3.5rem', textAlign: 'center', maxWidth: '550px', margin: '2rem auto' }}>
            <h4 style={{ color: '#FFFFFF', marginBottom: '0.5rem' }}>No Aircraft Found</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              Adjust your filters or max budget range to view available inventory.
            </p>
          </div>
        )}

        {/* Brokerage Turnkey Management Banner */}
        <div
          className="glass-card"
          style={{
            marginTop: '5rem',
            padding: '2.5rem',
            background: 'linear-gradient(135deg, rgba(20, 28, 46, 0.7) 0%, rgba(11, 15, 25, 0.8) 100%)',
            border: '1px solid var(--border-gold)'
          }}
        >
          <div style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
            <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
              Turnkey Aircraft Management
            </span>
            <h3 style={{ fontSize: '1.8rem', color: '#FFFFFF', marginBottom: '0.75rem', fontFamily: 'var(--font-serif)' }}>
              Offset Ownership Operating Costs With Charter Yield
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              When not utilized for personal family or executive journeys, place your aircraft on the ÉMINENCE commercial charter certificate. Generate substantial revenue to offset hangarage, crew salaries, and maintenance programs.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <CheckCircle2 size={18} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ fontSize: '0.88rem', color: '#FFFFFF', display: 'block' }}>Dedicated Flight Crew</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Experienced type-rated captains and corporate flight attendants.</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <CheckCircle2 size={18} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ fontSize: '0.88rem', color: '#FFFFFF', display: 'block' }}>Global Maintenance Tracking</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Enrolled on Pratt & Whitney ESP / Rolls-Royce CorporateCare.</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <CheckCircle2 size={18} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ fontSize: '0.88rem', color: '#FFFFFF', display: 'block' }}>Complete FBO Privileges</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Fuel discounts, VIP hangarage, and diplomatic flight planning.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
