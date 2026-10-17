import React from 'react';
import { Crown, Sparkles, Check, Star } from 'lucide-react';
import { MEMBERSHIP_TIERS } from '../data/membershipTiersData';
import { formatPrice } from '../utils/currency';

export default function MembershipView({ currency, onApplyMembership }) {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '6rem' }}>
      <div className="container">
        
        {/* Title */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 4rem' }}>
          <span className="badge badge-gold" style={{ marginBottom: '0.85rem' }}>
            <Crown size={12} /> The ÉMINENCE Patron Programme
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', color: '#FFFFFF', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>
            Privé, Élite & Sovereign Memberships
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Guaranteed private aircraft availability on as little as 4 hours notice worldwide. Fixed hourly rates, zero repositioning surcharges, and comprehensive lifestyle management.
          </p>
        </div>

        {/* Membership Tiers Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '2rem',
            marginBottom: '5rem',
            alignItems: 'stretch'
          }}
        >
          {MEMBERSHIP_TIERS.map((tier) => {
            const isPopular = tier.isPopular;

            return (
              <div
                key={tier.id}
                className="glass-card"
                style={{
                  padding: '2.5rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  border: isPopular ? '2px solid var(--gold-primary)' : '1px solid var(--border-gold)',
                  boxShadow: isPopular ? '0 15px 45px rgba(212, 175, 55, 0.25)' : 'none',
                  background: isPopular ? 'linear-gradient(180deg, rgba(20,28,46,0.85) 0%, rgba(12,17,29,0.9) 100%)' : 'var(--bg-glass-card)'
                }}
              >
                {/* Popular Pill */}
                {isPopular && (
                  <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)' }}>
                    <span className="badge badge-gold" style={{ background: 'var(--gold-gradient)', color: '#07090E', fontWeight: 800 }}>
                      <Star size={11} fill="#07090E" /> Most Preferred Tier
                    </span>
                  </div>
                )}

                {/* Header */}
                <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                  <span className="badge badge-gold" style={{ marginBottom: '0.6rem' }}>
                    {tier.badge}
                  </span>
                  <h3 style={{ fontSize: '2rem', color: '#FFFFFF', fontFamily: 'var(--font-serif)', margin: '0.2rem 0' }}>
                    {tier.name}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, minHeight: '40px' }}>
                    {tier.tagline}
                  </p>
                </div>

                {/* Deposit Banner */}
                <div
                  style={{
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    textAlign: 'center',
                    marginBottom: '1.75rem'
                  }}
                >
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block' }}>
                    Flight Hour Deposit
                  </span>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--gold-light)', fontFamily: 'var(--font-mono)' }}>
                    {formatPrice(tier.annualDepositUSD, currency)}
                  </div>
                  <span style={{ fontSize: '0.7rem', color: '#6EE7B7' }}>100% Applicable Toward Flight Hours</span>
                </div>

                {/* Key Guarantees */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '2rem', fontSize: '0.82rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.4rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Callout Guarantee:</span>
                    <strong style={{ color: 'var(--gold-light)' }}>{tier.availabilityGuarantee}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.4rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Fleet Access:</span>
                    <strong style={{ color: 'var(--text-primary)', textAlign: 'right', maxWidth: '170px' }}>{tier.fleetAccess}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.4rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Empty-Leg Discount:</span>
                    <strong style={{ color: '#6EE7B7' }}>{tier.emptyLegDiscount}</strong>
                  </div>
                </div>

                {/* Benefits List */}
                <div style={{ marginBottom: '2rem', flex: 1 }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--gold-light)', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
                    Privileges Included
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {tier.benefits.map((benefit, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                        <Check size={14} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action CTA */}
                <button
                  onClick={() => onApplyMembership(tier.id)}
                  className={`btn ${isPopular ? 'btn-gold pulse-gold' : 'btn-outline-gold'}`}
                  style={{ width: '100%' }}
                >
                  <Sparkles size={16} />
                  <span>Apply for {tier.name}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Comparison Matrix Table */}
        <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '4rem' }}>
          <h3 style={{ fontSize: '1.6rem', color: '#FFFFFF', marginBottom: '1.5rem', textAlign: 'center', fontFamily: 'var(--font-serif)' }}>
            Membership Privilege Comparison
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-gold)', color: 'var(--gold-light)' }}>
                  <th style={{ padding: '1rem', width: '35%' }}>Privilege Feature</th>
                  <th style={{ padding: '1rem', width: '20%' }}>Privé</th>
                  <th style={{ padding: '1rem', width: '25%' }}>Élite</th>
                  <th style={{ padding: '1rem', width: '20%' }}>Sovereign</th>
                </tr>
              </thead>
              <tbody style={{ color: 'var(--text-secondary)' }}>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>Guaranteed Aircraft Notice</td>
                  <td style={{ padding: '1rem' }}>24 Hours</td>
                  <td style={{ padding: '1rem', color: 'var(--gold-light)', fontWeight: 700 }}>10 Hours</td>
                  <td style={{ padding: '1rem', color: 'var(--gold-light)', fontWeight: 800 }}>4 Hours Worldwide</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>Zero Repositioning Surcharges</td>
                  <td style={{ padding: '1rem' }}>Core Routes Only</td>
                  <td style={{ padding: '1rem' }}>Continental Europe & US</td>
                  <td style={{ padding: '1rem' }}>Worldwide Unrestricted</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>Twin-Engine Heli-Transfers</td>
                  <td style={{ padding: '1rem' }}>Preferential Rates</td>
                  <td style={{ padding: '1rem' }}>Complimentary (NYC/Paris/Dubai)</td>
                  <td style={{ padding: '1rem' }}>Unlimited Door-to-Door</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>Dedicated Lifestyle Director</td>
                  <td style={{ padding: '1rem' }}>24/7 Desk</td>
                  <td style={{ padding: '1rem' }}>Assigned Director</td>
                  <td style={{ padding: '1rem' }}>Executive Committee Access</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>Ultra-Long-Range Flagships (G700)</td>
                  <td style={{ padding: '1rem' }}>Subject to Availability</td>
                  <td style={{ padding: '1rem' }}>Priority Waitlist</td>
                  <td style={{ padding: '1rem', color: 'var(--gold-light)', fontWeight: 700 }}>Guaranteed Tarmac Allocation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
