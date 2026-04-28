import React, { useEffect, useRef } from 'react';
import './CertificationsModal.css';

const CERTIFICATIONS = [
  {
    id: 1,
    name: 'Microsoft Certified: Azure Fundamentals',
    issuer: 'Microsoft',
    date: 'Aug 2024',
    credentialLink: 'https://learn.microsoft.com/api/credentials/share/en-us/Atharva-3176/72CB26F98B412A2C?sharingId',
    logo: '/assets/certifications/microsoft.png',
  },
  {
    id: 2,
    name: 'Data Analytics Essentials',
    issuer: 'Cisco',
    date: 'May 2024',
    credentialLink: 'https://www.credly.com/badges/bacd06fb-bc32-4119-b94f-1ca724a0859b/linked_in_profile',
    logo: '/assets/certifications/cisco.png',
  },
  {
    id: 3,
    name: 'Introduction to Cybersecurity',
    issuer: 'Cisco',
    date: 'May 2024',
    credentialLink: 'https://www.credly.com/badges/2ba9ee36-5df8-4c0c-a9ef-e058192a32fb/linked_in_profile',
    logo: '/assets/certifications/cisco.png',
  },
  {
    id: 4,
    name: 'Introduction to Data Science',
    issuer: 'Cisco',
    date: 'May 2024',
    credentialLink: 'https://www.credly.com/badges/2ba9ee36-5df8-4c0c-a9ef-e058192a32fb/linked_in_profile',
    logo: '/assets/certifications/cisco.png',
  },
  {
    id: 5,
    name: 'Database Web Development',
    issuer: 'University of British Columbia',
    date: 'Dec 2023',
    credentialLink: 'https://ca.badgr.com/public/assertions/JlZRUidGR5aKg-rrIr0x-Q',
    logo: '/assets/certifications/canvas.png',
  },
];

const CertificationsModal = ({ isOpen, onClose }) => {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    if (panelRef.current) panelRef.current.focus();
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="cert-overlay"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="cert-modal-title"
    >
      <div
        ref={panelRef}
        tabIndex="-1"
        className="cert-panel w-full max-w-xl max-h-[88vh] flex flex-col rounded-2xl bg-surface-raised border border-border-subtle overflow-hidden outline-none"
        style={{
          boxShadow: '0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px hsla(42,82%,62%,0.08)',
          animation: 'fade-rise 0.25s ease-out forwards',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gold gradient accent bar */}
        <div
          className="h-0.5 w-full shrink-0"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, hsl(42,82%,62%) 35%, hsl(45,95%,72%) 50%, hsl(42,82%,62%) 65%, transparent 100%)',
          }}
        />

        {/* Sticky header */}
        <div
          className="shrink-0 px-6 pt-5 pb-4 border-b border-border-subtle/40"
          style={{ background: 'hsla(230,20%,11%,0.98)' }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-gold mb-1.5">
                Credentials
              </p>
              <h2
                id="cert-modal-title"
                className="font-display text-2xl md:text-3xl text-text-primary leading-tight"
              >
                Professional Certifications
              </h2>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 mt-0.5 w-8 h-8 flex items-center justify-center rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-overlay/60 transition-colors duration-200"
              aria-label="Close certifications modal"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Cert list */}
        <div className="overflow-y-auto flex-1 px-5 py-4 flex flex-col gap-2.5">
          {CERTIFICATIONS.map((cert, i) => (
            <div
              key={cert.id}
              className="cert-card group flex items-center gap-4 px-4 py-3.5 rounded-xl border border-border-subtle/50 transition-all duration-200"
              style={{ background: 'hsla(230,18%,14%,0.7)' }}
            >
              {/* Index */}
              <span
                className="shrink-0 font-mono text-[0.6rem] text-text-muted w-5 text-right select-none"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Logo */}
              <div
                className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center p-1.5"
                style={{
                  background: 'hsla(230,22%,9%,0.9)',
                  border: '1px solid hsla(230,16%,22%,0.7)',
                }}
              >
                <img
                  src={cert.logo}
                  alt={`${cert.issuer} logo`}
                  width="32"
                  height="32"
                  loading="lazy"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <p className="text-text-primary text-sm font-medium leading-snug truncate">
                  {cert.name}
                </p>
                <p className="font-mono text-[0.62rem] text-gold/65 tracking-wide mt-0.5">
                  {cert.issuer} · {cert.date}
                </p>
              </div>

              {/* Verify arrow */}
              <a
                href={cert.credentialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-text-muted group-hover:text-gold transition-colors duration-200"
                aria-label={`Verify ${cert.name}`}
                title="Verify credential"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13V19a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="shrink-0 px-6 py-3 border-t border-border-subtle/30">
          <p className="font-mono text-[0.6rem] tracking-widest text-text-muted text-center uppercase">
            Click ↗ to verify on the issuer's platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificationsModal;
