import React, { useState, useEffect } from 'react';
import './Testimonials.css';
import PlanetarySystem from './components/PlanetarySystem';
import TestimonialBubble from './components/TestimonialBubble';

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [sunActive, setSunActive] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ESC to close modal
  useEffect(() => {
    if (!modalOpen) return;
    const handleEsc = (e) => { if (e.key === 'Escape') setModalOpen(false); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [modalOpen]);

  const isSunMessage = activeTestimonial?.id === 'sun';
  const showModal = modalOpen && activeTestimonial && activeTestimonial.id !== 'sun';

  const accentColor = activeTestimonial?.color || 'hsl(42,82%,62%)';
  const initials = activeTestimonial?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2) ?? '';

  return (
    <section id="testimonials" className="pt-16 md:pt-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-8">

        {/* Header — always above the canvas, never covered */}
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-gold text-center mb-3">
          Testimonials
        </p>
        <h2 className="font-display text-3xl md:text-4xl mb-4 text-accent-light text-center">
          What People Say
        </h2>
        <p className="text-center text-sm mb-10 hint-text" style={{ pointerEvents: 'none' }}>
          Click a planet to read a testimonial
        </p>

        {/* Canvas wrapper — modal is scoped inside this so it can never cover the heading */}
        <div className="relative">
          <PlanetarySystem
            setActiveTestimonial={setActiveTestimonial}
            setModalOpen={setModalOpen}
            setSunActive={setSunActive}
          />

          {/* Desktop: hover bubble */}
          {!isMobile && activeTestimonial && !modalOpen && (
            <TestimonialBubble
              testimonial={activeTestimonial}
              isSunMessage={isSunMessage}
              onDismiss={() => setActiveTestimonial(null)}
            />
          )}

          {/* Modal — absolutely positioned over the canvas only */}
          {showModal && (
            <div
              className="absolute inset-0 z-10 flex items-center justify-center p-4"
              onClick={() => setModalOpen(false)}
            >
              <div
                className="relative w-full max-w-xl overflow-y-auto rounded-2xl bg-surface-raised border border-border-subtle"
                style={{
                  maxHeight: 'calc(100% - 2rem)',
                  animation: 'fade-rise 0.25s ease-out forwards',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Accent bar */}
                <div className="h-0.5 w-full shrink-0" style={{ background: accentColor }} />

                <div className="p-6">
                  {/* Close */}
                  <button
                    onClick={() => setModalOpen(false)}
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
                  <blockquote className="text-text-secondary text-sm leading-relaxed mb-5 italic">
                    {activeTestimonial.testimonial}
                  </blockquote>

                  {/* Author row */}
                  <div className="flex items-center gap-3 border-t border-border-subtle/30 pt-4">
                    <div
                      className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center font-mono text-xs font-semibold select-none"
                      style={{
                        background: `${accentColor}22`,
                        border: `1px solid ${accentColor}55`,
                        color: accentColor,
                      }}
                    >
                      {initials}
                    </div>
                    <div>
                      <p className="text-text-primary text-sm font-medium">{activeTestimonial.name}</p>
                      <p className="font-mono text-[0.65rem] text-gold/60">
                        {activeTestimonial.role}
                        {activeTestimonial.company && ` · ${activeTestimonial.company}`}
                      </p>
                    </div>
                  </div>

                  {/* Action links */}
                  {(activeTestimonial.caseStudyLink || activeTestimonial.contactReference?.linkedin) && (
                    <div className="flex flex-wrap gap-3 mt-4">
                      {activeTestimonial.caseStudyLink && (
                        <a
                          href={activeTestimonial.caseStudyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary inline-flex items-center gap-1.5 text-sm"
                        >
                          Visit Company
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13V19a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </a>
                      )}
                      {activeTestimonial.contactReference?.linkedin && (
                        <a
                          href={activeTestimonial.contactReference.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary inline-flex items-center gap-1.5 text-sm"
                        >
                          LinkedIn
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13V19a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>


      </div>
    </section>
  );
};

export default Testimonials;
