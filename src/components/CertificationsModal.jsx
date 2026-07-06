import { useEffect, useRef } from 'react';
import { CERTIFICATIONS } from '../data/content';

/* A quiet dialog in the atlas style: ground surface, hairline border,
   mono annotations. Closes on Escape, backdrop click, or the ✕. */
const CertificationsModal = ({ onClose }) => {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="certs-title"
    >
      <div
        className="absolute inset-0"
        style={{ background: 'var(--veil)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-lg bg-ground border border-rule p-8">
        <div className="flex items-baseline justify-between gap-4 border-b border-hair pb-3 mb-6">
          <h2 id="certs-title" className="annot-caps m-0 !text-ink">Certifications</h2>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="annot !text-ink-soft hover:!text-accent transition-colors"
          >
            ✕ esc
          </button>
        </div>
        <ul className="m-0 p-0 list-none space-y-5">
          {CERTIFICATIONS.map(cert => (
            <li key={cert.name}>
              <p className="m-0 text-ink font-semibold text-[0.95rem] tracking-tight">{cert.name}</p>
              <p className="annot m-0 mt-0.5 !text-accent">{cert.issuer}</p>
              <p className="m-0 mt-1 text-ink-soft text-sm leading-relaxed">{cert.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CertificationsModal;
