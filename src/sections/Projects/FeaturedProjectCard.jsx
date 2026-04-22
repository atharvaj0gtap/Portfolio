import React, { useRef, useEffect, useState } from 'react';

const FeaturedProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const reversed = index % 2 === 1;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el || window.innerWidth < 1024) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - y) * 6;
    const ry = (x - 0.5) * 8;
    el.style.setProperty('--rx', `${rx}deg`);
    el.style.setProperty('--ry', `${ry}deg`);
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  const accentClass = project.accent === 'cyan' ? 'text-cyan' : 'text-gold';
  const accentBorder = project.accent === 'cyan' ? 'border-cyan/30' : 'border-gold/30';
  const accentBg = project.accent === 'cyan' ? 'bg-cyan/10' : 'bg-gold/10';

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="tilt-card group relative"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition:
          'opacity 900ms cubic-bezier(0.16,1,0.3,1), transform 900ms cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <div
        className={`grid grid-cols-1 gap-8 rounded-3xl border border-border-subtle bg-surface-base/70 p-6 backdrop-blur-md transition-all duration-500 hover:border-gold/40 hover:shadow-[0_30px_80px_-40px_hsla(42,82%,62%,0.4)] lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:p-10 ${
          reversed ? 'lg:[&>*:first-child]:order-2' : ''
        }`}
      >
        {/* Visual panel */}
        <div className="relative isolate overflow-hidden rounded-2xl border border-border-subtle bg-gradient-to-br from-surface-elevated to-surface-overlay">
          <div className="aspect-[4/3] w-full">
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at 30% 20%, hsla(42,82%,62%,0.18), transparent 55%), radial-gradient(circle at 80% 80%, hsla(190,55%,58%,0.12), transparent 60%)',
              }}
              aria-hidden="true"
            />

            {/* Grid lines */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  'linear-gradient(to right, hsla(42,82%,62%,0.06) 1px, transparent 1px), linear-gradient(to bottom, hsla(42,82%,62%,0.06) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
              aria-hidden="true"
            />

            {/* Image */}
            <div className="relative z-10 flex h-full w-full items-center justify-center p-10">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="max-h-[70%] max-w-[70%] object-contain opacity-90 transition-transform duration-700 group-hover:scale-105"
                style={{
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))',
                }}
              />
            </div>

            {/* Corner brackets */}
            <span className={`absolute left-4 top-4 h-5 w-5 border-l border-t ${accentBorder}`} aria-hidden="true" />
            <span className={`absolute right-4 top-4 h-5 w-5 border-r border-t ${accentBorder}`} aria-hidden="true" />
            <span className={`absolute left-4 bottom-4 h-5 w-5 border-l border-b ${accentBorder}`} aria-hidden="true" />
            <span className={`absolute right-4 bottom-4 h-5 w-5 border-r border-b ${accentBorder}`} aria-hidden="true" />

            {/* Year badge */}
            <div className="absolute left-6 top-6 z-20">
              <span className={`inline-flex items-center gap-2 rounded-full border ${accentBorder} ${accentBg} px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] ${accentClass}`}>
                <span className="h-1 w-1 rounded-full bg-current" />
                {project.year}
              </span>
            </div>

            {/* Featured flag */}
            <div className="absolute right-6 top-6 z-20">
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-text-muted">
                Featured
              </span>
            </div>
          </div>
        </div>

        {/* Content panel */}
        <div className="flex flex-col justify-between gap-8">
          <div>
            <p className={`mb-3 font-mono text-[0.68rem] uppercase tracking-[0.28em] ${accentClass}`}>
              {project.tagline}
            </p>
            <h3 className="mb-4 font-display text-[1.75rem] font-normal leading-[1.1] tracking-tight text-text-primary sm:text-[2.1rem]">
              {project.title}
            </h3>
            <p className="mb-6 text-[0.95rem] leading-relaxed text-text-secondary">
              {project.description}
            </p>

            {project.highlights && (
              <ul className="mb-6 space-y-2.5">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-[0.875rem] leading-relaxed text-text-secondary">
                    <span className={`mt-[0.55rem] inline-block h-[5px] w-[5px] shrink-0 rounded-full ${project.accent === 'cyan' ? 'bg-cyan' : 'bg-gold'}`} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-border-subtle bg-surface-elevated/70 px-2.5 py-1 font-mono text-[0.68rem] text-text-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Metric + CTA */}
          <div className="flex flex-wrap items-end justify-between gap-6 border-t border-border-subtle pt-6">
            <div>
              <div className={`font-display text-[2.75rem] font-normal leading-none tracking-tighter ${accentClass}`}>
                {project.metric.value}
              </div>
              <div className="mt-1.5 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-text-muted">
                {project.metric.label}
              </div>
            </div>

            <a
              href={project.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group/cta inline-flex items-center gap-2 font-mono text-[0.75rem] uppercase tracking-[0.18em] text-text-secondary transition-colors hover:text-gold"
            >
              <span>View repository</span>
              <svg
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17L17 7M17 7H8M17 7v9" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeaturedProjectCard;
