import React, { useEffect } from 'react';
import { Check, Info, AlertCircle, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 2000,
        background: 'rgba(11, 15, 25, 0.95)',
        backdropFilter: 'blur(16px)',
        border: '1px solid var(--border-gold)',
        borderRadius: 'var(--radius-md)',
        padding: '1rem 1.4rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.85rem',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.8), var(--gold-glow)',
        maxWidth: '420px',
        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: 'rgba(212, 175, 55, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        <Check size={16} color="var(--gold-primary)" />
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FFFFFF' }}>
          {toast.title || 'ÉMINENCE VIP Notification'}
        </div>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
          {toast.message}
        </div>
      </div>

      <button
        onClick={onClose}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          padding: '2px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <X size={15} />
      </button>
    </div>
  );
}
