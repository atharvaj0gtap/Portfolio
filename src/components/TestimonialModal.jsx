import React, { useEffect } from 'react';

const TestimonialModal = ({ isOpen, testimonial, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  // Sun "testimonial" is not a real testimonial — suppress the modal
  if (!isOpen || !testimonial || testimonial.id === 'sun') return null;

  const accentColor = testimonial.color || 'hsl(42,82%,62%)';
  const initials = testimonial.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="testimonial-modal-author"
    >
      <div
        className="relative w-full max-w-xl rounded-2xl bg-surface-raised border border-border-subtle overflow-hidden"
        style={{
          boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px ${accentColor}22`,
          animation: 'fade-rise 0.25s ease-out forwards',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Accent bar */}
        <div className="h-0.5 w-full" style={{ background: accentColor }} />

        <div className="p-6 md:p-8">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Decorative quote mark */}
          <div
            className="font-display text-7xl leading-none mb-1 select-none"
            aria-hidden="true"
            style={{ color: accentColor, opacity: 0.18 }}
          >
            "
          </div>

          {/* Full testimonial */}
          <blockquote className="text-text-secondary text-sm md:text-base leading-relaxed mb-6 italic">
            {testimonial.testimonial}
          </blockquote>

          {/* Author row */}
          <div className="flex items-center gap-3 border-t border-border-subtle/30 pt-5">
            {/* Avatar — initials on tinted background */}
            <div
              className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center font-mono text-xs font-semibold select-none"
              style={{
                background: `${accentColor}22`,
                border: `1px solid ${accentColor}55`,
                color: accentColor,
              }}
            >
              {initials}
            </div>
            <div id="testimonial-modal-author">
              <p className="text-text-primary text-sm font-medium">{testimonial.name}</p>
              <p className="font-mono text-[0.65rem] text-gold/60">
                {testimonial.role}
                {testimonial.company && ` · ${testimonial.company}`}
              </p>
            </div>
          </div>

          {/* Action links */}
          {(testimonial.caseStudyLink || testimonial.contactReference?.linkedin) && (
            <div className="flex flex-wrap gap-3 mt-5">
              {testimonial.caseStudyLink && (
                <a
                  href={testimonial.caseStudyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center gap-1.5 text-sm"
                >
                  Visit Company
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13V19a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              )}
              {testimonial.contactReference?.linkedin && (
                <a
                  href={testimonial.contactReference.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center gap-1.5 text-sm"
                >
                  LinkedIn
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13V19a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialModal;
