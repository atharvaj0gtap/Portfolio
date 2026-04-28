import { useState, useEffect, useRef } from 'react';

const Home = () => {
  const canvasRef = useRef(null);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) return;
    const reduced = window.innerWidth < 1024;
    let mounted = true;
    let cleanup;

    import('./HeroScene').then(({ createHeroScene }) => {
      if (!mounted || !canvasRef.current) return;
      cleanup = createHeroScene(canvasRef.current, { reduced });
      setSceneReady(true);
    });

    return () => {
      mounted = false;
      cleanup?.();
    };
  }, []);

  return (
    <section
      id="home"
      className="relative flex flex-col justify-center items-center w-full min-h-screen"
    >
      {/* Mobile ambient gradient (starry canvas still visible through it) */}
      <div className="hero-mobile-bg absolute inset-0 pointer-events-none md:hidden" aria-hidden="true" />

      {/* Three.js scene — hidden on mobile via .hero-3d-canvas CSS */}
      <div
        className="hero-3d-canvas absolute inset-0 pointer-events-none"
        style={{ opacity: sceneReady ? 1 : 0, transition: 'opacity 800ms ease' }}
        aria-hidden="true"
        role="presentation"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center px-6">

        {/* Name */}
        <p className="font-display text-3xl md:text-5xl font-normal tracking-tight text-text-primary mb-3 reveal-0">
          Atharva Jagtap
        </p>

        {/* Overline */}
        <p className="overline mb-8 reveal-1">
          Software Engineer&nbsp;&middot;&nbsp;Strategist&nbsp;&middot;&nbsp;Builder
        </p>

        {/* Hero headline with gradient */}
        <h1 className="font-display text-hero font-normal tracking-tighter leading-[1.08] mb-8 hero-gradient-text reveal-2">
          I build systems that<br />
          turn ideas into impact.
        </h1>

        {/* Subtitle */}
        <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto mb-4 leading-relaxed reveal-3">
          I'm an engineer who thinks in systems.&nbsp; Not just the technical kind, but the human
          kind too. My work lives at the intersection of computer science, finance, and psychology.
        </p>
        <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed reveal-4">
          I architect solutions that account for the messy<br></br>
          reality of how people think, decide, and act.
        </p>

        {/* Proof line */}
        <p className="font-mono text-text-muted text-xs md:text-sm mb-12 reveal-5">
          UBC grad&nbsp;&middot;&nbsp;Startup co-founder&nbsp;&middot;&nbsp;10+ shipped projects
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 reveal-6">
          <a href="#projects" className="btn-primary">
            View My Work
          </a>
          <a
            href="/assets/certifications/AtharvaJagtap_Resume.pdf"
            download
            className="btn-secondary"
          >
            Download Resume
          </a>
        </div>
      </div>

    </section>
  );
};

export default Home;
