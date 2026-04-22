import React, { useEffect, useRef, useState } from 'react';
import { PROJECTS } from './projectsData';
import FeaturedProjectCard from './FeaturedProjectCard';
import ProjectGridCard from './ProjectGridCard';

const Projects = () => {
  const headerRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);

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

  const featured = PROJECTS.filter((p) => p.featured);
  const grid = PROJECTS.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="relative w-full px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <div
          ref={headerRef}
          className="mb-16 md:mb-24"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 800ms cubic-bezier(0.16,1,0.3,1), transform 800ms cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-gold">
              02 / Selected Work
            </span>
            <span className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-gold/40 to-transparent" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <h2
              className="font-display text-[2.5rem] font-normal leading-[1.02] tracking-tighter text-text-primary sm:text-[3.25rem] md:text-[3.75rem]"
            >
              Projects that shipped —{' '}
              <em
                className="italic text-gold"
              >
                with numbers
              </em>
              {' '}attached.
            </h2>

            <div className="space-y-4 text-[0.95rem] leading-relaxed text-text-secondary lg:pb-3">
              <p>
                Ten projects spanning full-stack engineering, machine learning, data analytics,
                and mobile. Below are three I'm most proud of — the rest live in the grid.
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-text-muted">
                <span className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-gold" />
                  {PROJECTS.length} total
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-cyan" />
                  {featured.length} featured
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-text-muted" />
                  2022 — 2026
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured stack */}
        <div className="space-y-10 md:space-y-16">
          {featured.map((project, i) => (
            <FeaturedProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Divider */}
        <div className="my-20 flex items-center gap-6 md:my-28">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-text-muted">
            And the rest
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {grid.map((project, i) => (
            <ProjectGridCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 flex flex-col items-center gap-4 text-center md:mt-24">
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-text-muted">
            Every project links to source
          </span>
          <a
            href="https://github.com/atharvaj0gtap"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-lg border border-border-subtle bg-surface-base/60 px-5 py-2.5 font-mono text-[0.75rem] uppercase tracking-[0.18em] text-text-secondary backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:text-gold"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.69-3.88-1.54-3.88-1.54-.53-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.74-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.03 11.03 0 015.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.26 5.69.41.35.78 1.04.78 2.1v3.12c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12c0-6.35-5.15-11.5-11.5-11.5z" />
            </svg>
            <span>github.com/atharvaj0gtap</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
