import React, { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Work' },
  { id: 'testimonials', label: 'Words' },
  { id: 'contact', label: 'Contact' },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  /* Active section via IntersectionObserver */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-42% 0px -52% 0px' }
    );
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  /* Scroll progress + scrolled-state, rAF-throttled */
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(1, y / docHeight) : 0);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close mobile menu on route change / escape */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="scroll-progress"
        style={{ width: `${progress * 100}%` }}
        aria-hidden="true"
      />

      <header
        className={`fixed left-0 right-0 top-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-surface-base/70 backdrop-blur-xl backdrop-saturate-150 border-b border-border-subtle/60'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:h-20 md:px-10">
          {/* Logo */}
          <a
            href="#home"
            className="group flex items-center gap-2.5 font-display text-xl font-normal tracking-tight text-text-primary transition-colors hover:text-gold md:text-[1.35rem]"
          >
            <span
              className="relative flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-gold transition-all duration-500 group-hover:border-gold group-hover:shadow-[0_0_16px_hsla(42,82%,62%,0.4)]"
              aria-hidden="true"
            >
              JW
            </span>
            <span className="hidden sm:inline-block">JagtapWorks</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`group relative px-4 py-2 text-[0.875rem] font-medium tracking-wide transition-colors duration-300 ${
                    isActive
                      ? 'text-text-primary'
                      : 'text-text-muted hover:text-text-secondary'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute left-4 right-4 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-500 ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'
                    }`}
                  />
                  {isActive && (
                    <span
                      className="absolute left-1/2 -bottom-1 h-1 w-1 -translate-x-1/2 rounded-full bg-gold"
                      style={{ boxShadow: '0 0 10px hsla(42,82%,62%,0.8)' }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-2 md:flex">
            <a
              href="/assets/certifications/AtharvaJagtap_Resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-lg border border-gold/40 px-3.5 py-2 font-mono text-[0.72rem] uppercase tracking-[0.15em] text-gold transition-all duration-300 hover:border-gold hover:bg-gold/10"
            >
              <svg
                className="h-3.5 w-3.5"
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
              Resume
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2 font-semibold text-surface-base transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-bright hover:shadow-gold"
            >
              <span className="text-[0.82rem] tracking-wide">Let's Talk</span>
              <svg
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <button
            type="button"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-border-subtle text-text-secondary transition-colors hover:border-gold/40 hover:text-gold md:hidden"
          >
            {open ? <AiOutlineClose className="h-5 w-5" /> : <AiOutlineMenu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile overlay */}
        <div
          className={`fixed inset-0 top-16 z-30 origin-top transform bg-surface-base/95 backdrop-blur-xl transition-all duration-400 md:hidden ${
            open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`}
          aria-hidden={!open}
        >
          <nav className="flex h-full flex-col items-center justify-start gap-1 px-6 pt-16">
            {NAV_LINKS.map((link, idx) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={closeMenu}
                className={`w-full rounded-lg px-4 py-4 text-center font-display text-2xl tracking-tight transition-all duration-300 ${
                  activeSection === link.id
                    ? 'text-gold'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                style={{
                  transitionDelay: open ? `${80 + idx * 60}ms` : '0ms',
                  transform: open ? 'translateY(0)' : 'translateY(10px)',
                  opacity: open ? 1 : 0,
                }}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-6 flex w-full flex-col gap-3 px-2">
              <a
                href="/assets/certifications/AtharvaJagtap_Resume.pdf"
                download
                onClick={closeMenu}
                className="btn-secondary justify-center"
              >
                Download Resume
              </a>
              <a href="#contact" onClick={closeMenu} className="btn-primary justify-center">
                Let's Talk
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
