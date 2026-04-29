import { useState, useEffect, useRef } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { smoothScrollTo } from '../utils/smoothScroll';

const NAV_LINKS = [
  { id: 'home',         label: 'Home' },
  { id: 'projects',     label: 'Projects' },
  { id: 'about',        label: 'About' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact',      label: 'Contact' },
];

// Finds the section whose vertical center is closest to the viewport midpoint.
// More reliable than IntersectionObserver for edge sections (e.g. contact vs testimonials).
function getActiveSection() {
  const mid = window.innerHeight / 2;
  let closest = 'home';
  let closestDist = Infinity;
  for (const { id } of NAV_LINKS) {
    const el = document.getElementById(id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    const dist = Math.abs(rect.top + rect.height / 2 - mid);
    if (dist < closestDist) {
      closestDist = dist;
      closest = id;
    }
  }
  return closest;
}

const Header = () => {
  const [isOpen,        setIsOpen]        = useState(false);
  const [isVisible,     setIsVisible]     = useState(true);
  const [scrolled,      setScrolled]      = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  const lastScrollY = useRef(0);
  const isOpenRef   = useRef(false);

  // Keep ref in sync so scroll handler can read it without re-subscribing
  useEffect(() => { isOpenRef.current = isOpen; }, [isOpen]);

  useEffect(() => {
    // Set initial active section before first scroll
    setActiveSection(getActiveSection());

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y         = window.scrollY;
        const totalH    = document.documentElement.scrollHeight - window.innerHeight;

        // Hide nav on scroll-down past 80px; show on scroll-up
        if (y > lastScrollY.current && y > 80) {
          setIsVisible(false);
          if (isOpenRef.current) setIsOpen(false);
        } else {
          setIsVisible(true);
        }
        lastScrollY.current = y;

        setScrolled(y > 20);
        setScrollProgress(totalH > 0 ? (y / totalH) * 100 : 0);
        setActiveSection(getActiveSection());

        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    smoothScrollTo(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Scroll progress bar — fixed at very top of viewport */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <nav
        className={`w-full z-20 sticky top-0 transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-md bg-surface-base/80 border-b border-border-subtle'
            : 'bg-transparent border-b border-transparent'
        } ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="flex justify-between mx-auto h-16 items-center px-6 md:px-8">

          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            className="nav-logo text-2xl font-display tracking-tight text-text-primary transition-colors duration-200"
          >
            JagtapWorks
          </a>

          {/* Hamburger (mobile only) */}
          <button
            className="md:hidden text-2xl text-text-secondary"
            onClick={() => setIsOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex gap-6 items-center">
            {NAV_LINKS.map(link => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`relative py-1.5 text-sm transition-colors duration-200 ${
                    activeSection === link.id
                      ? 'text-text-primary'
                      : 'text-text-muted hover:text-text-secondary'
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-gold" />
                  )}
                </a>
              </li>
            ))}

            {/* CTAs */}
            <li className="ml-2 flex items-center gap-2">
              <a
                href="/assets/certifications/AtharvaJagtap_Resume.pdf"
                download
                className="px-4 py-1.5 border border-gold/30 text-gold text-sm rounded-md hover:bg-gold/10 transition-all duration-200"
              >
                Resume
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className="px-4 py-1.5 bg-gold text-surface-base text-sm font-semibold rounded-md hover:bg-gold-bright transition-all duration-200"
              >
                Let's Talk
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile fullscreen overlay — stars visible through semi-transparent bg */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-surface-base/90 backdrop-blur-md flex flex-col items-center justify-center md:hidden">

          <button
            className="absolute top-5 right-6 text-2xl text-text-secondary hover:text-text-primary transition-colors"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <AiOutlineClose />
          </button>

          <ul className="flex flex-col items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <li
                key={link.id}
                style={{
                  opacity: 0,
                  animation: `fade-rise 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 60}ms forwards`,
                }}
              >
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`font-display text-3xl transition-colors duration-200 ${
                    activeSection === link.id
                      ? 'text-text-primary'
                      : 'text-text-muted hover:text-text-secondary'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTAs at bottom of overlay */}
          <div
            className="mt-12 flex gap-3"
            style={{
              opacity: 0,
              animation: `fade-rise 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${NAV_LINKS.length * 60}ms forwards`,
            }}
          >
            <a
              href="/assets/certifications/AtharvaJagtap_Resume.pdf"
              download
              onClick={() => setIsOpen(false)}
              className="px-5 py-2.5 border border-gold/30 text-gold text-sm rounded-md hover:bg-gold/10 transition-all"
            >
              Resume
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="px-5 py-2.5 bg-gold text-surface-base text-sm font-semibold rounded-md hover:bg-gold-bright transition-all"
            >
              Let's Talk
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
