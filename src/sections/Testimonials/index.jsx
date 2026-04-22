import React, { useEffect, useRef, useState } from 'react';
import './Testimonials.css';
import PlanetarySystem from './components/PlanetarySystem';
import TestimonialBubble from './components/TestimonialBubble';
import TestimonialModal from '../../components/TestimonialModal';
import { testimonialData } from './data/testimonialData';

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [sunActive, setSunActive] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isSunMessage = activeTestimonial && activeTestimonial.id === 'sun';

  return (
    <section
      id="testimonials"
      className="relative w-full overflow-hidden px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <div
          ref={headerRef}
          className="mb-10"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 800ms cubic-bezier(0.16,1,0.3,1), transform 800ms cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-gold">
              03 / Words
            </span>
            <span className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-gold/40 to-transparent" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <h2
              className="font-display text-[2.5rem] font-normal leading-[1.02] tracking-tighter text-text-primary sm:text-[3.25rem] md:text-[3.75rem]"
            >
              What people{' '}
              <em
                className="italic text-gold"
              >
                have said
              </em>
              {' '}about working together.
            </h2>

            <div className="space-y-4 text-[0.95rem] leading-relaxed text-text-secondary lg:pb-3">
              <p>
                A small planetary system of people I've built with.
                {' '}
                <span className="text-text-primary">Click a planet</span>
                {' '}to hear from them — or click the sun for a note from me.
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-text-muted">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f5e942]" />
                  Atharva (sun)
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8A7F8D]" />
                  {testimonialData.length} collaborators
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Discoverability hint */}
        <div className="mb-6 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-gold/40" />
          <span className="hint-breathe flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.28em] text-gold/80">
            <svg
              className="h-3 w-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" />
            </svg>
            Tap a planet to reveal a testimonial
            <svg
              className="h-3 w-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" />
            </svg>
          </span>
          <span className="h-px w-8 bg-gold/40" />
        </div>

        {/* Planetary scene */}
        <div className="relative rounded-3xl border border-border-subtle bg-surface-base/40 backdrop-blur-sm">
          <PlanetarySystem
            setActiveTestimonial={setActiveTestimonial}
            setModalOpen={setModalOpen}
            setSunActive={setSunActive}
          />

          {/* Corner markers */}
          <span className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l border-t border-gold/30" aria-hidden="true" />
          <span className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r border-t border-gold/30" aria-hidden="true" />
          <span className="pointer-events-none absolute left-3 bottom-3 h-4 w-4 border-l border-b border-gold/30" aria-hidden="true" />
          <span className="pointer-events-none absolute right-3 bottom-3 h-4 w-4 border-r border-b border-gold/30" aria-hidden="true" />

          {/* Floating bubble */}
          {activeTestimonial && !modalOpen && (
            <TestimonialBubble
              testimonial={activeTestimonial}
              isSunMessage={isSunMessage}
              onDismiss={() => setActiveTestimonial(null)}
            />
          )}
        </div>

        {/* Fallback list for accessibility / no-WebGL */}
        <div className="mt-10 text-center font-mono text-[0.68rem] uppercase tracking-[0.28em] text-text-muted">
          {testimonialData.map((t, i) => (
            <span key={t.id}>
              {i > 0 && <span className="mx-3 opacity-50">·</span>}
              <span className="text-text-secondary">{t.name}</span>
              <span className="opacity-70">, {t.company}</span>
            </span>
          ))}
        </div>
      </div>

      <TestimonialModal
        isOpen={modalOpen}
        testimonial={activeTestimonial}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
};

export default Testimonials;
