import React, { useEffect, useRef, useState } from 'react';
import { mountHeroScene } from './HeroScene';

const Home = () => {
  const canvasRef = useRef(null);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.innerWidth < 768) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const reduced = window.innerWidth < 1100;

    let cleanup = () => {};
    const id = window.requestIdleCallback
      ? window.requestIdleCallback(() => {
          cleanup = mountHeroScene(canvas, { reduced });
          requestAnimationFrame(() => setSceneReady(true));
        })
      : setTimeout(() => {
          cleanup = mountHeroScene(canvas, { reduced });
          requestAnimationFrame(() => setSceneReady(true));
        }, 200);

    return () => {
      if (window.cancelIdleCallback && typeof id === 'number') {
        window.cancelIdleCallback(id);
      } else {
        clearTimeout(id);
      }
      cleanup();
    };
  }, []);

  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 pt-24 sm:pt-28"
    >
      {/* atmospheric gradient + mobile fallback */}
      <div className="emphasis-gradient" aria-hidden="true" />
      <div className="hero-mobile-bg absolute inset-0 -z-0 opacity-60 md:hidden" aria-hidden="true" />

      {/* 3D constellation scene */}
      <canvas
        ref={canvasRef}
        className={`pointer-events-none absolute inset-0 z-0 hidden h-full w-full transition-opacity duration-[1200ms] ease-out md:block ${
          sceneReady ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* Central composition */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* Overline */}
        <p className="reveal-0 overline mb-8 sm:mb-10">
          Software Engineer&nbsp; · &nbsp;Strategist&nbsp; · &nbsp;Builder
        </p>

        {/* Decorative glyph */}
        <div className="reveal-1 mb-6 flex items-center justify-center gap-3 text-text-muted">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/60" />
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.4em] text-gold/80">
            J · W
          </span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/60" />
        </div>

        {/* Hero headline */}
        <h1
          className="reveal-2 font-display hero-gradient-text mb-8 max-w-3xl text-balance text-[2.75rem] font-normal leading-[1.04] tracking-tighter sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.25rem]"
        >
          I build systems that{' '}
          <em
            className="italic text-gold"
          >
            turn ideas
          </em>
          {' '}into{' '}
          <span className="whitespace-nowrap">impact.</span>
        </h1>

        {/* Subtext */}
        <div className="reveal-3 mx-auto mb-4 max-w-2xl space-y-4 text-[1rem] leading-relaxed text-text-secondary sm:text-[1.0625rem]">
          <p>
            I'm an engineer who thinks in systems, not just the technical kind, but the human kind too. My work lives at the intersection of computer science, finance, and psychology.
          </p>
          <p className="reveal-4">
            I don't just build software, I architect solutions that account for the messy reality of how people think, decide, and act.
          </p>
        </div>

        {/* Proof line */}
        <p className="reveal-5 mt-10 font-mono text-[0.72rem] uppercase tracking-[0.28em] text-text-muted">
          UBC Graduate&nbsp; · &nbsp;Startup Co-Founder&nbsp; · &nbsp;10+ Shipped Projects
        </p>

        {/* CTAs */}
        <div className="reveal-6 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
          <a href="#projects" className="btn-primary group">
            View My Work
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </a>
          <a
            href="/assets/certifications/AtharvaJagtap_Resume.pdf"
            download
            className="btn-secondary group"
          >
            Download Resume
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
          </a>
        </div>

        {/* Availability chip */}
        <div className="reveal-7 mt-12 inline-flex items-center gap-2.5 rounded-full border border-teal/30 bg-surface-base/60 px-4 py-2 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
          </span>
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-text-secondary">
            Available for select projects
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#projects"
        aria-label="Scroll to projects"
        className="reveal-7 absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-text-muted transition-colors hover:text-gold"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
          <svg
            className="h-5 w-5 animate-[scroll-beacon_2.4s_ease-in-out_infinite]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </a>
    </section>
  );
};

export default Home;
