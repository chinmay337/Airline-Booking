import React, { useState, useEffect } from 'react';
import { Plane, Crown, Menu, X, Globe, ChevronDown } from 'lucide-react';
import { CURRENCIES } from '../utils/currency';

export default function Navbar({
  activeView,
  setActiveView,
  currency,
  setCurrency,
  bookingsCount = 0,
  onOpenCharterModal
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Discover' },
    { id: 'first-class', label: 'First Class' },
    { id: 'private-charter', label: 'Private Aviation' },
    { id: 'marketplace', label: 'Aircraft Collection' },
    { id: 'destinations', label: 'Destinations' },
    { id: 'concierge', label: 'Concierge' },
    { id: 'membership', label: 'Membership' },
    {
      id: 'my-voyages',
      label: 'My Voyages',
      badge: bookingsCount > 0 ? bookingsCount : null
    }
  ];

  const handleNavClick = (viewId) => {
    setActiveView(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        transition: 'all 0.35s ease',
        background: isScrolled
          ? 'rgba(6, 8, 13, 0.94)'
          : 'linear-gradient(180deg, rgba(6, 8, 13, 0.85) 0%, rgba(6, 8, 13, 0.2) 80%, transparent 100%)',
        backdropFilter: isScrolled ? 'blur(18px)' : 'blur(6px)',
        borderBottom: isScrolled ? '1px solid rgba(212, 175, 55, 0.22)' : '1px solid transparent',
        padding: isScrolled ? '0.75rem 0' : '1.25rem 0'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', userSelect: 'none' }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.05) 100%)',
              border: '1px solid var(--border-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(212, 175, 55, 0.2)'
            }}
          >
            <Plane size={22} color="var(--gold-primary)" style={{ transform: 'rotate(-45deg)' }} />
          </div>
          <div>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.45rem',
                fontWeight: '800',
                letterSpacing: '0.12em',
                background: 'var(--gold-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'block',
                lineHeight: 1
              }}
            >
              ÉMINENCE
            </span>
            <span
              style={{
                fontSize: '0.62rem',
                textTransform: 'uppercase',
                letterSpacing: '0.22em',
                color: 'var(--text-muted)',
                display: 'block',
                marginTop: '3px'
              }}
            >
              The Art of Rising Above
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '1.75rem'
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive = activeView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: isActive ? 'var(--gold-light)' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 600 : 500,
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  position: 'relative',
                  padding: '0.4rem 0',
                  transition: 'color var(--transition-fast)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                {link.label}
                {link.badge && (
                  <span
                    style={{
                      background: 'var(--gold-primary)',
                      color: '#07090E',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      padding: '1px 6px',
                      borderRadius: '10px',
                      lineHeight: '1.2'
                    }}
                  >
                    {link.badge}
                  </span>
                )}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '-4px',
                      left: '15%',
                      right: '15%',
                      height: '2px',
                      background: 'var(--gold-gradient)',
                      borderRadius: '2px',
                      boxShadow: '0 0 8px rgba(212, 175, 55, 0.7)'
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Currency Selector + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
          
          {/* Currency Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--gold-light)',
                borderRadius: 'var(--radius-full)',
                padding: '0.45rem 0.85rem',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              <Globe size={13} color="var(--gold-primary)" />
              <span>{currency}</span>
              <ChevronDown size={12} />
            </button>

            {currencyDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '120%',
                  right: 0,
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-gold)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.8)',
                  padding: '0.4rem',
                  minWidth: '140px',
                  zIndex: 999
                }}
              >
                {Object.keys(CURRENCIES).map((currKey) => (
                  <button
                    key={currKey}
                    onClick={() => {
                      setCurrency(currKey);
                      setCurrencyDropdownOpen(false);
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.5rem 0.8rem',
                      background: currency === currKey ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
                      color: currency === currKey ? 'var(--gold-light)' : 'var(--text-secondary)',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.8rem',
                      fontFamily: 'var(--font-sans)',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <span>{CURRENCIES[currKey].name}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--gold-primary)' }}>
                      {CURRENCIES[currKey].label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Charter Button */}
          <button
            onClick={onOpenCharterModal}
            className="btn btn-outline-gold btn-sm"
            style={{ display: 'none' }}
            id="nav-quick-charter"
          >
            <Crown size={14} />
            <span>Charter Jet</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--gold-light)',
              cursor: 'pointer',
              padding: '0.4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--bg-surface-elevated)',
            borderBottom: '1px solid var(--border-gold)',
            boxShadow: '0 25px 40px rgba(0, 0, 0, 0.9)',
            padding: '1.5rem',
            animation: 'slideUp 0.25s ease'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                style={{
                  textAlign: 'left',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: activeView === link.id ? 'rgba(212, 175, 55, 0.12)' : 'transparent',
                  border: activeView === link.id ? '1px solid var(--border-gold)' : '1px solid transparent',
                  color: activeView === link.id ? 'var(--gold-light)' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  fontWeight: activeView === link.id ? 700 : 500,
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="badge badge-gold">{link.badge} Active</span>
                )}
              </button>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCharterModal();
              }}
              className="btn btn-gold"
              style={{ marginTop: '0.5rem', width: '100%' }}
            >
              <Crown size={16} />
              <span>Charter a Private Jet</span>
            </button>
          </div>
        </div>
      )}

      {/* Inline styles for desktop / mobile breakpoint display */}
      <style>{`
        @media (min-width: 992px) {
          .desktop-nav {
            display: flex !important;
          }
          #nav-quick-charter {
            display: inline-flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
