import React, { useState } from 'react';
import { X, Sparkles, Check } from 'lucide-react';
import { saveConciergeRequest } from '../utils/storage';

export default function ConciergeModal({ initialService = null, onClose }) {
  const [serviceType, setServiceType] = useState(
    initialService?.title || 'Executive Chauffeur & Armored Transfers'
  );
  const [city, setCity] = useState('Paris');
  const [dates, setDates] = useState('');
  const [partySize] = useState(2);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [requestId, setRequestId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};

    if (!clientName.trim()) errs.clientName = 'Full name is required.';
    if (!clientEmail.trim() || !clientEmail.includes('@')) errs.clientEmail = 'Valid email is required.';
    if (!clientPhone.trim()) errs.clientPhone = 'Phone number is required for concierge assignment.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    const refCode = `EM-CON-${Math.floor(10000 + Math.random() * 90000)}`;

    const reqData = {
      id: refCode,
      serviceType,
      city,
      dates: dates || 'Immediate / Flexible',
      partySize,
      clientName,
      clientEmail,
      clientPhone,
      notes,
      requestDate: new Date().toISOString().split('T')[0],
      status: 'Lifestyle Director Assigned'
    };

    saveConciergeRequest(reqData);
    setRequestId(refCode);
    setIsSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '650px' }}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className="badge badge-gold">
              <Sparkles size={12} /> ÉMINENCE CONCIERGE
            </span>
          </div>
          <button className="btn-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  Bespoke Concierge Requisition
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Our private travel office coordinates chauffeuring, helicopter charters, Michelin dining, and diplomatic security worldwide.
                </p>
              </div>

              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label className="form-label">Service Required</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="form-control"
                >
                  <option value="Executive Chauffeur & Armored Transfers">Executive Chauffeur & Armored Tarmac Transfers</option>
                  <option value="Direct Heli-Shuttle & Alpine Drops">Direct Heli-Shuttle & Alpine Glacier Drops</option>
                  <option value="Michelin-Calibre In-Flight Gastronomy">Michelin-Calibre In-Flight Gastronomy</option>
                  <option value="Private Island & Villa Buyouts">Private Island & Villa Buyouts</option>
                  <option value="Diplomatic Fast-Track & Executive Protection">Diplomatic Fast-Track & Executive Protection</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">City / Destination</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Target Dates</label>
                  <input
                    type="text"
                    placeholder="e.g. Nov 14 – Nov 18, 2026"
                    value={dates}
                    onChange={(e) => setDates(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Chinmay Thukaru"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="form-control"
                  />
                  {errors.clientName && <span className="form-error">{errors.clientName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Executive Email *</label>
                  <input
                    type="email"
                    placeholder="client@sanctuary.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="form-control"
                  />
                  {errors.clientEmail && <span className="form-error">{errors.clientEmail}</span>}
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label">Direct Mobile / WhatsApp *</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 234-5678"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="form-control font-mono"
                />
                {errors.clientPhone && <span className="form-error">{errors.clientPhone}</span>}
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Specific Directives & Arrangements</label>
                <textarea
                  rows={2}
                  placeholder="Specific champagne vintage, armored vehicle tier, child safety seats..."
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
                  <span>Dispatch Concierge Request</span>
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
                Requisition Confirmed
              </span>
              <h2 style={{ fontSize: '1.6rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                Concierge Coordinator Assigned
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '440px', margin: '0 auto 1.25rem', fontSize: '0.85rem' }}>
                Your request has been filed under reference <code>{requestId}</code>. An ÉMINENCE Lifestyle Specialist will liaise directly via your contact method.
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
