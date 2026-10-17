import React, { useState } from 'react';
import { X, Crown, Sparkles, Check } from 'lucide-react';
import { MEMBERSHIP_TIERS } from '../data/membershipTiersData';

export default function MembershipModal({ initialTier = 'elite', onClose }) {
  const [selectedTier, setSelectedTier] = useState(initialTier);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [annualSpend, setAnnualSpend] = useState('$100,000 – $250,000');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [memberRef, setMemberRef] = useState('');
  const [errors, setErrors] = useState({});

  const activeTierObj = MEMBERSHIP_TIERS.find((t) => t.id === selectedTier) || MEMBERSHIP_TIERS[1];

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!fullName.trim()) errs.fullName = 'Full legal name is required.';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid corporate or personal email is required.';
    if (!phone.trim()) errs.phone = 'Contact number is required.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    const ref = `EM-MBR-${Math.floor(1000 + Math.random() * 9000)}`;
    setMemberRef(ref);
    setIsSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Crown size={20} color="var(--gold-primary)" />
            <span className="badge badge-gold">The ÉMINENCE Circle</span>
          </div>
          <button className="btn-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.45rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  Apply for Membership: {activeTierObj.name}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Membership provides guaranteed aircraft availability, no repositioning fees, and dedicated aviation lifestyle directors.
                </p>
              </div>

              {/* Tier Selection */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {MEMBERSHIP_TIERS.map((tier) => {
                  const isSelected = selectedTier === tier.id;
                  return (
                    <div
                      key={tier.id}
                      onClick={() => setSelectedTier(tier.id)}
                      style={{
                        padding: '0.85rem 0.5rem',
                        textAlign: 'center',
                        borderRadius: 'var(--radius-sm)',
                        background: isSelected ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                        border: isSelected ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      <div style={{ fontWeight: 800, fontSize: '0.95rem', color: isSelected ? 'var(--gold-light)' : 'var(--text-primary)' }}>
                        {tier.name}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {tier.depositDisplay}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Form Inputs */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Chinmay Thukaru"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="form-control"
                  />
                  {errors.fullName && <span className="form-error">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    placeholder="member@entity.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                  />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="form-group">
                  <label className="form-label">Direct Phone *</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 789-0123"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control font-mono"
                  />
                  {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Annual Aviation Budget</label>
                  <select
                    value={annualSpend}
                    onChange={(e) => setAnnualSpend(e.target.value)}
                    className="form-control"
                  >
                    <option value="$50,000 – $100,000">$50,000 – $100,000</option>
                    <option value="$100,000 – $250,000">$100,000 – $250,000</option>
                    <option value="$250,000 – $500,000">$250,000 – $500,000</option>
                    <option value="$500,000+">$500,000+ (Ultra High Net Worth)</option>
                  </select>
                </div>
              </div>

              <div style={{ padding: '0.75rem 1rem', background: 'rgba(212, 175, 55, 0.05)', borderRadius: 'var(--radius-sm)', border: '1px dashed var(--border-gold)', marginBottom: '1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <strong>Demonstration Programme:</strong> No real payments or financial commitments required. All membership requests are demonstration instances for evaluation.
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" className="btn btn-subtle" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold pulse-gold">
                  <span>Submit Application Dossier</span>
                </button>
              </div>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(212, 175, 55, 0.15)',
                  border: '2px solid var(--gold-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem'
                }}
              >
                <Check size={30} color="var(--gold-primary)" />
              </div>

              <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
                Application Registered
              </span>
              <h2 style={{ fontSize: '1.6rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                Welcome to the Selection
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '440px', margin: '0 auto 1.25rem', fontSize: '0.85rem' }}>
                Your membership interest for <strong>{activeTierObj.name}</strong> has been logged under reference <code>{memberRef}</code>.
              </p>

              <button className="btn btn-gold" onClick={onClose}>
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
