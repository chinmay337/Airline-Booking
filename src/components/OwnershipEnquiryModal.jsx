import React, { useState } from 'react';
import { X, Check, Sparkles } from 'lucide-react';
import { saveAircraftEnquiry } from '../utils/storage';
import { formatPrice } from '../utils/currency';

export default function OwnershipEnquiryModal({
  aircraft,
  currency = 'USD',
  onClose,
  onEnquirySubmitted
}) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [entity, setEntity] = useState('');
  const [annualHours, setAnnualHours] = useState('150 – 250 Flight Hours / Year');
  const [timeline, setTimeline] = useState('Within 3 to 6 Months');
  const [managementInterest, setManagementInterest] = useState(true);
  const [taxPlanning, setTaxPlanning] = useState(true);
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [enquiryRef, setEnquiryRef] = useState('');

  if (!aircraft) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};

    if (!fullName.trim()) errs.fullName = 'Full legal name is required.';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid corporate or personal email is required.';
    if (!phone.trim()) errs.phone = 'Direct telephone number is required.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const refCode = `EM-AC-${randomDigits}`;

    const enquiryRecord = {
      id: refCode,
      type: 'Aircraft Ownership Enquiry',
      aircraftId: aircraft.id,
      aircraftModel: `${aircraft.manufacturer} ${aircraft.model}`,
      category: aircraft.category,
      askingPriceUSD: aircraft.askingPriceUSD,
      fullName,
      email,
      phone,
      entity,
      annualHours,
      timeline,
      managementInterest,
      taxPlanning,
      notes,
      date: new Date().toISOString().split('T')[0],
      status: 'Brokerage Consultation Scheduled'
    };

    saveAircraftEnquiry(enquiryRecord);
    setEnquiryRef(refCode);
    setIsSubmitted(true);
    if (onEnquirySubmitted) {
      onEnquirySubmitted(enquiryRecord);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '750px' }}
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className="badge badge-gold">Acquisition Advisory</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {aircraft.manufacturer} {aircraft.model}
            </span>
          </div>
          <button className="btn-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  Enquire About Aircraft Ownership
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Our private aviation brokerage division provides discreet purchase representation, pre-buy inspections, and international registry structuring.
                </p>
              </div>

              {/* Target Aircraft Summary */}
              <div
                className="glass-card"
                style={{
                  padding: '1rem 1.25rem',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(212, 175, 55, 0.04)',
                  border: '1px solid var(--border-gold)'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                    {aircraft.manufacturer} {aircraft.model} ({aircraft.year})
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {aircraft.condition} • {aircraft.totalHours} hrs TT • {aircraft.location}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Asking Price</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gold-light)', fontFamily: 'var(--font-mono)' }}>
                    {formatPrice(aircraft.askingPriceUSD, currency)}
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1.25rem'
                }}
              >
                <div className="form-group">
                  <label className="form-label">Principal Full Name *</label>
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
                  <label className="form-label">Corporate / Personal Email *</label>
                  <input
                    type="email"
                    placeholder="investor@holdingcompany.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                  />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Direct Phone / Signal *</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 019-9281"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control font-mono"
                  />
                  {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Family Office / Corporate Entity</label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Global Ventures"
                    value={entity}
                    onChange={(e) => setEntity(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>

              {/* Ownership Parameters */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1.25rem'
                }}
              >
                <div className="form-group">
                  <label className="form-label">Anticipated Annual Flight Hours</label>
                  <select
                    value={annualHours}
                    onChange={(e) => setAnnualHours(e.target.value)}
                    className="form-control"
                  >
                    <option value="Under 100 Flight Hours / Year">Under 100 Flight Hours / Year</option>
                    <option value="150 – 250 Flight Hours / Year">150 – 250 Flight Hours / Year (Typical)</option>
                    <option value="250 – 400 Flight Hours / Year">250 – 400 Flight Hours / Year (Heavy)</option>
                    <option value="400+ Flight Hours / Year">400+ Flight Hours / Year (Corporate Fleet)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Preferred Acquisition Timeline</label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="form-control"
                  >
                    <option value="Immediate (Within 30 Days)">Immediate (Within 30 Days)</option>
                    <option value="Within 3 to 6 Months">Within 3 to 6 Months</option>
                    <option value="6 to 12 Months Planning">6 to 12 Months Planning</option>
                  </select>
                </div>
              </div>

              {/* Additional Services Checkboxes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.82rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={managementInterest}
                    onChange={(e) => setManagementInterest(e.target.checked)}
                    style={{ accentColor: 'var(--gold-primary)' }}
                  />
                  <span>Interest in ÉMINENCE Turnkey Aircraft Management & Charter Revenue Offset</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.82rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={taxPlanning}
                    onChange={(e) => setTaxPlanning(e.target.checked)}
                    style={{ accentColor: 'var(--gold-primary)' }}
                  />
                  <span>Cross-Border Aviation Tax Structuring & Offshore Registry Guidance (Malta, Isle of Man, US)</span>
                </label>
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Additional Acquisition Notes</label>
                <textarea
                  rows={2}
                  placeholder="Specific avionics upgrades, custom interior reconfiguration desires..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="form-control"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" className="btn btn-subtle" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold pulse-gold">
                  <Sparkles size={16} />
                  <span>Submit Brokerage Enquiry</span>
                </button>
              </div>
            </form>
          ) : (
            /* Confirmation State */
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div
                style={{
                  width: '65px',
                  height: '65px',
                  borderRadius: '50%',
                  background: 'rgba(212, 175, 55, 0.15)',
                  border: '2px solid var(--gold-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem'
                }}
              >
                <Check size={32} color="var(--gold-primary)" />
              </div>

              <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
                Acquisition Enquiry Logged
              </span>
              <h2 style={{ fontSize: '1.75rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                Brokerage Consultation Confirmed
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 1.5rem', fontSize: '0.88rem' }}>
                Your ownership dossier has been compiled and saved to <code>localStorage</code>. An ÉMINENCE Senior Aircraft Broker has been allocated to your profile.
              </p>

              <div
                style={{
                  display: 'inline-block',
                  padding: '1.25rem 2.5rem',
                  background: 'rgba(212, 175, 55, 0.08)',
                  border: '1px solid var(--border-gold)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1.75rem'
                }}
              >
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block' }}>
                  Brokerage Dossier Code
                </span>
                <span style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--gold-light)' }}>
                  {enquiryRef}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button className="btn btn-gold" onClick={onClose}>
                  <span>Done</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
