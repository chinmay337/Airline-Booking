import React, { useState } from 'react';
import { Plane, Crown, Building, Sparkles, Trash2, Printer, ChevronRight, Award } from 'lucide-react';
import { formatPrice } from '../utils/currency';

export default function MyVoyagesView({
  bookings = [],
  charterRequests = [],
  aircraftEnquiries = [],
  conciergeRequests = [],
  currency = 'USD',
  onCancelBooking,
  onViewBoardingPass,
  onExploreFlights,
  onOpenCharterModal
}) {
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings', 'charters', 'aircraft', 'concierge'

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '6rem' }}>
      <div className="container">
        
        {/* Title */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3rem' }}>
          <span className="badge badge-gold" style={{ marginBottom: '0.85rem' }}>
            <Award size={12} /> Personal Aviation Ledger
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', color: '#FFFFFF', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>
            My Voyages & Travel Requests
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Your saved demonstration bookings, bespoke charter dispatches, and aircraft ownership dossiers persisted in <code>localStorage</code>.
          </p>
        </div>

        {/* Dashboard Tabs Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '3rem',
            flexWrap: 'wrap'
          }}
        >
          <button
            onClick={() => setActiveTab('bookings')}
            style={{
              padding: '0.6rem 1.4rem',
              borderRadius: 'var(--radius-full)',
              background: activeTab === 'bookings' ? 'var(--gold-gradient)' : 'rgba(255, 255, 255, 0.04)',
              color: activeTab === 'bookings' ? '#07090E' : 'var(--text-secondary)',
              border: activeTab === 'bookings' ? 'none' : '1px solid var(--border-subtle)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Plane size={15} />
            <span>Commercial Suites ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('charters')}
            style={{
              padding: '0.6rem 1.4rem',
              borderRadius: 'var(--radius-full)',
              background: activeTab === 'charters' ? 'var(--gold-gradient)' : 'rgba(255, 255, 255, 0.04)',
              color: activeTab === 'charters' ? '#07090E' : 'var(--text-secondary)',
              border: activeTab === 'charters' ? 'none' : '1px solid var(--border-subtle)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Crown size={15} />
            <span>Charter Requests ({charterRequests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('aircraft')}
            style={{
              padding: '0.6rem 1.4rem',
              borderRadius: 'var(--radius-full)',
              background: activeTab === 'aircraft' ? 'var(--gold-gradient)' : 'rgba(255, 255, 255, 0.04)',
              color: activeTab === 'aircraft' ? '#07090E' : 'var(--text-secondary)',
              border: activeTab === 'aircraft' ? 'none' : '1px solid var(--border-subtle)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Building size={15} />
            <span>Aircraft Enquiries ({aircraftEnquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('concierge')}
            style={{
              padding: '0.6rem 1.4rem',
              borderRadius: 'var(--radius-full)',
              background: activeTab === 'concierge' ? 'var(--gold-gradient)' : 'rgba(255, 255, 255, 0.04)',
              color: activeTab === 'concierge' ? '#07090E' : 'var(--text-secondary)',
              border: activeTab === 'concierge' ? 'none' : '1px solid var(--border-subtle)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Sparkles size={15} />
            <span>Concierge ({conciergeRequests.length})</span>
          </button>
        </div>

        {/* TAB 1: COMMERCIAL FLIGHT SUITE BOOKINGS */}
        {activeTab === 'bookings' && (
          <div>
            {bookings.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="glass-card"
                    style={{
                      padding: '2rem',
                      border: '1px solid var(--border-gold)',
                      background: 'rgba(15, 21, 35, 0.75)'
                    }}
                  >
                    {/* Top Row: Ref & Status */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingBottom: '1.25rem',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                        marginBottom: '1.5rem',
                        flexWrap: 'wrap',
                        gap: '0.75rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span className="badge badge-gold">
                          PNR: {booking.id}
                        </span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          Booked on: {booking.bookingDate || '2026-10-17'}
                        </span>
                      </div>

                      <span className="badge badge-emerald">
                        {booking.status || 'Confirmed — Demonstration Ready'}
                      </span>
                    </div>

                    {/* Flight Detail Grid */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '1.5rem',
                        marginBottom: '1.5rem'
                      }}
                    >
                      {/* Origin & Destination */}
                      <div>
                        <span className="form-label" style={{ display: 'block', marginBottom: '4px' }}>Route</span>
                        <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                          {booking.origin.city} ({booking.origin.code}) → {booking.destination.city} ({booking.destination.code})
                        </div>
                        <span style={{ fontSize: '0.78rem', color: 'var(--gold-light)' }}>
                          {booking.airline} • {booking.flightNumber}
                        </span>
                      </div>

                      {/* Travel Date & Time */}
                      <div>
                        <span className="form-label" style={{ display: 'block', marginBottom: '4px' }}>Schedule</span>
                        <div style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {booking.departureDate}
                        </div>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          Dep: {booking.departureTime} • Arr: {booking.arrivalTime} ({booking.duration})
                        </span>
                      </div>

                      {/* Suite & Passenger */}
                      <div>
                        <span className="form-label" style={{ display: 'block', marginBottom: '4px' }}>Allocated Suite & Guest</span>
                        <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--gold-light)' }}>
                          {booking.selectedSeat || '1A Window Suite'}
                        </div>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                          {booking.passengers?.[0]?.title} {booking.passengers?.[0]?.firstName} {booking.passengers?.[0]?.lastName}
                          {booking.passengerCount > 1 ? ` (+${booking.passengerCount - 1} guests)` : ''}
                        </span>
                      </div>

                      {/* Fare Summary */}
                      <div style={{ textAlign: 'right' }}>
                        <span className="form-label" style={{ display: 'block', marginBottom: '4px' }}>Total Demonstration Fare</span>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gold-light)', fontFamily: 'var(--font-mono)' }}>
                          {formatPrice(booking.totalFareUSD, currency)}
                        </div>
                        <span style={{ fontSize: '0.72rem', color: '#6EE7B7' }}>Fully Persisted in LocalStorage</span>
                      </div>
                    </div>

                    {/* Add-ons line if present */}
                    {booking.addOns && booking.addOns.length > 0 && (
                      <div style={{ marginBottom: '1.25rem', padding: '0.65rem 1rem', background: 'rgba(212, 175, 55, 0.05)', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        <strong>Curated Add-Ons:</strong> {booking.addOns.map(a => a.name).join(' • ')}
                      </div>
                    )}

                    {/* Actions: View Boarding Pass + Cancel */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                      <button
                        onClick={() => onCancelBooking(booking.id)}
                        className="btn btn-subtle btn-sm"
                        style={{ color: '#F87171' }}
                      >
                        <Trash2 size={14} />
                        <span>Cancel Booking</span>
                      </button>

                      <button
                        onClick={() => onViewBoardingPass(booking)}
                        className="btn btn-gold btn-sm"
                      >
                        <Printer size={14} />
                        <span>View Boarding Pass</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty Bookings State */
              <div
                className="glass-card"
                style={{
                  padding: '4rem 2rem',
                  textAlign: 'center',
                  maxWidth: '600px',
                  margin: '0 auto'
                }}
              >
                <div
                  style={{
                    width: '65px',
                    height: '65px',
                    borderRadius: '50%',
                    background: 'rgba(212, 175, 55, 0.1)',
                    border: '1px solid var(--border-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem'
                  }}
                >
                  <Plane size={30} color="var(--gold-primary)" />
                </div>
                <h3 style={{ fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                  No Commercial Suite Reservations Found
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.75rem', lineHeight: 1.6 }}>
                  You have not reserved any demonstration First Class suites yet. Search and reserve your premier flight to see it persisted here.
                </p>
                <button onClick={onExploreFlights} className="btn btn-gold">
                  <span>Explore First Class Suites</span>
                  <ChevronRight size={15} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PRIVATE JET CHARTER REQUESTS */}
        {activeTab === 'charters' && (
          <div>
            {charterRequests.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {charterRequests.map((req) => (
                  <div key={req.id} className="glass-card" style={{ padding: '2rem', border: '1px solid var(--border-gold)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span className="badge badge-gold">REF: {req.id}</span>
                      <span className="badge badge-blue">{req.status}</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1rem' }}>
                      <div>
                        <span className="form-label">Flight Route</span>
                        <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                          {req.origin} → {req.destination}
                        </div>
                        <span style={{ fontSize: '0.78rem', color: 'var(--gold-light)' }}>
                          Category: {req.category} ({req.sampleModel})
                        </span>
                      </div>

                      <div>
                        <span className="form-label">Departure Schedule</span>
                        <div style={{ fontWeight: 600 }}>{req.departureDate} at {req.departureTime}</div>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          Party: {req.passengers} Passengers ({req.tripType})
                        </span>
                      </div>

                      <div>
                        <span className="form-label">Lead Principal</span>
                        <div style={{ fontWeight: 600 }}>{req.clientName}</div>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {req.clientEmail} • {req.clientPhone}
                        </span>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <span className="form-label">Indicative Estimate</span>
                        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--gold-light)', fontFamily: 'var(--font-mono)' }}>
                          {formatPrice(req.estimatedTotalUSD, currency)}
                        </div>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.75rem' }}>
                      Directives: {req.catering} {req.groundTransfer ? '• Rolls-Royce Apron Chauffeur Included' : ''}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-card" style={{ padding: '4rem 2rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                <h3 style={{ fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>No Charter Requests Logged</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
                  Request an on-demand private jet charter or book an empty-leg positioning flight to see requests tracked here.
                </p>
                <button onClick={onOpenCharterModal} className="btn btn-gold">
                  <span>Request Private Jet Charter</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: AIRCRAFT OWNERSHIP ENQUIRIES */}
        {activeTab === 'aircraft' && (
          <div>
            {aircraftEnquiries.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {aircraftEnquiries.map((enq) => (
                  <div key={enq.id} className="glass-card" style={{ padding: '2rem', border: '1px solid var(--border-gold)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span className="badge badge-gold">DOSSIER REF: {enq.id}</span>
                      <span className="badge badge-emerald">{enq.status}</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                      <div>
                        <span className="form-label">Target Aircraft</span>
                        <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                          {enq.aircraftModel}
                        </div>
                        <span style={{ fontSize: '0.78rem', color: 'var(--gold-light)' }}>Category: {enq.category}</span>
                      </div>

                      <div>
                        <span className="form-label">Client Principal</span>
                        <div style={{ fontWeight: 600 }}>{enq.fullName}</div>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{enq.email} • {enq.phone}</span>
                      </div>

                      <div>
                        <span className="form-label">Parameters</span>
                        <div style={{ fontSize: '0.85rem' }}>Usage: {enq.annualHours}</div>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Timeline: {enq.timeline}</span>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <span className="form-label">Asking Price</span>
                        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--gold-light)', fontFamily: 'var(--font-mono)' }}>
                          {formatPrice(enq.askingPriceUSD, currency)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-card" style={{ padding: '4rem 2rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                <h3 style={{ fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>No Aircraft Ownership Enquiries</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Explore our private aircraft collection and enquire about purchasing a business jet.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: CONCIERGE REQUESTS */}
        {activeTab === 'concierge' && (
          <div>
            {conciergeRequests.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {conciergeRequests.map((req) => (
                  <div key={req.id} className="glass-card" style={{ padding: '2rem', border: '1px solid var(--border-gold)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span className="badge badge-gold">REF: {req.id}</span>
                      <span className="badge badge-blue">{req.status}</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                      <div>
                        <span className="form-label">Service Type</span>
                        <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                          {req.serviceType}
                        </div>
                        <span style={{ fontSize: '0.78rem', color: 'var(--gold-light)' }}>Location: {req.city}</span>
                      </div>

                      <div>
                        <span className="form-label">Client Name</span>
                        <div style={{ fontWeight: 600 }}>{req.clientName}</div>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{req.clientEmail} • {req.clientPhone}</span>
                      </div>

                      <div>
                        <span className="form-label">Dates</span>
                        <div style={{ fontSize: '0.88rem' }}>{req.dates}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-card" style={{ padding: '4rem 2rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                <h3 style={{ fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>No Concierge Requests</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Submit a request for armored transfers, helicopter charters, or Michelin in-flight catering.
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
