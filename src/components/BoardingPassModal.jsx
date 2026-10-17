import React from 'react';
import { X, Plane, Printer, Sparkles } from 'lucide-react';
import { formatPrice } from '../utils/currency';

export default function BoardingPassModal({ booking, currency, onClose }) {
  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '780px',
          background: '#070A10',
          border: '1px solid var(--border-gold-strong)',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.95), var(--gold-glow)'
        }}
      >
        {/* Modal Top Bar */}
        <div className="modal-header" style={{ borderBottom: '1px solid rgba(212, 175, 55, 0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className="badge badge-gold">
              <Sparkles size={12} /> ÉMINENCE VIP MANIFEST
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              REF: {booking.id}
            </span>
          </div>
          <button className="btn-close" onClick={onClose} aria-label="Close pass">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: '2rem' }}>
          
          {/* Printable Luxury Boarding Pass Ticket */}
          <div
            id="printable-boarding-pass"
            style={{
              background: 'linear-gradient(135deg, #0D131F 0%, #080C14 100%)',
              border: '2px solid var(--gold-primary)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
              position: 'relative'
            }}
          >
            {/* Gold Header Bar */}
            <div
              style={{
                background: 'var(--gold-gradient)',
                padding: '0.9rem 1.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#07090E'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Plane size={20} style={{ transform: 'rotate(-45deg)' }} />
                <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 900, fontSize: '1.25rem', letterSpacing: '0.12em' }}>
                  ÉMINENCE
                </span>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  • First Class VIP Suite Pass
                </span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1.05rem', letterSpacing: '0.08em' }}>
                {booking.id}
              </div>
            </div>

            {/* Main Pass Interior */}
            <div style={{ padding: '1.75rem' }}>
              
              {/* Route Banner */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '1.5rem',
                  borderBottom: '1px dashed rgba(212, 175, 55, 0.35)',
                  marginBottom: '1.5rem'
                }}
              >
                <div>
                  <div style={{ fontSize: '2.4rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                    {booking.origin.code}
                  </div>
                  <div style={{ fontSize: '1rem', color: 'var(--gold-light)', fontWeight: 600 }}>{booking.origin.city}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{booking.origin.airport || 'VIP Departure Pier'}</div>
                </div>

                <div style={{ textAlign: 'center', padding: '0 1.5rem' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--gold-primary)', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                    {booking.duration} Non-Stop
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <div style={{ width: '40px', height: '1px', background: 'var(--border-gold)' }} />
                    <Plane size={18} color="var(--gold-primary)" />
                    <div style={{ width: '40px', height: '1px', background: 'var(--border-gold)' }} />
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Direct Tarmac Ramp
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '2.4rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                    {booking.destination.code}
                  </div>
                  <div style={{ fontSize: '1rem', color: 'var(--gold-light)', fontWeight: 600 }}>{booking.destination.city}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{booking.destination.airport || 'VIP Arrival Lounge'}</div>
                </div>
              </div>

              {/* Data Grid: Passenger, Seat, Date, Aircraft */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: '1.25rem',
                  marginBottom: '1.5rem'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.08em', display: 'block' }}>
                    Distinguished Guest
                  </span>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {booking.passengers?.[0]?.title} {booking.passengers?.[0]?.firstName} {booking.passengers?.[0]?.lastName}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--gold-light)', fontFamily: 'var(--font-mono)' }}>
                    PPT: {booking.passengers?.[0]?.passport || 'DIPLOMATIC'}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.08em', display: 'block' }}>
                    Allocated Suite
                  </span>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--gold-light)', fontFamily: 'var(--font-mono)' }}>
                    {booking.selectedSeat || '1A Window'}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>First Grand Sanctuary</div>
                </div>

                <div>
                  <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.08em', display: 'block' }}>
                    Flight & Aircraft
                  </span>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {booking.flightNumber}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{booking.aircraft}</div>
                </div>

                <div>
                  <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.08em', display: 'block' }}>
                    Departure Time
                  </span>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                    {booking.departureTime}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--gold-light)' }}>{booking.departureDate}</div>
                </div>
              </div>

              {/* Barcode & VIP Security Stamp */}
              <div
                style={{
                  paddingTop: '1.25rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.8rem',
                      letterSpacing: '0.35rem',
                      color: 'rgba(212, 175, 55, 0.75)',
                      userSelect: 'none'
                    }}
                  >
                    ||||| | |||| ||| ||||||| ||| ||||||
                  </div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                    SCAN AT VIP SECURITY CONCOURSE • FAST-TRACK EMBARKATION
                  </span>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Demonstration Fare
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gold-light)', fontFamily: 'var(--font-mono)' }}>
                    {formatPrice(booking.totalFareUSD, currency)}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="modal-footer">
          <button className="btn btn-outline-gold" onClick={handlePrint}>
            <Printer size={16} />
            <span>Print Itinerary / Pass</span>
          </button>
          <button className="btn btn-gold" onClick={onClose}>
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
