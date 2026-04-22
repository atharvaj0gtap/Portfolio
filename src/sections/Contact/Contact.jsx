import React, { useEffect, useRef, useState } from 'react';

const EMAIL = 'atharvauni2021@gmail.com';

const LINKS = [
  {
    id: 'github',
    label: 'GitHub',
    handle: '@atharvaj0gtap',
    href: 'https://github.com/atharvaj0gtap',
    description: 'Source code + open-source work',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.69-3.88-1.54-3.88-1.54-.53-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.74-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.03 11.03 0 015.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.26 5.69.41.35.78 1.04.78 2.1v3.12c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12c0-6.35-5.15-11.5-11.5-11.5z" />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: '/in/atharvajagtap',
    href: 'https://www.linkedin.com/in/atharvajagtap',
    description: 'Professional background + references',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8 17V10H5.5v7H8zm-1.25-8.3a1.45 1.45 0 100-2.9 1.45 1.45 0 000 2.9zM18.5 17v-3.85c0-2.06-1.1-3.02-2.57-3.02-1.18 0-1.72.65-2.02 1.11V10H11.5v7h2.4v-3.9c0-.22.02-.43.08-.59.17-.43.57-.88 1.24-.88.87 0 1.22.66 1.22 1.64V17h2.06z" />
      </svg>
    ),
  },
  {
    id: 'resume',
    label: 'Resume',
    handle: 'AtharvaJagtap_Resume.pdf',
    href: '/assets/certifications/AtharvaJagtap_Resume.pdf',
    description: 'Full PDF — download',
    download: true,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </svg>
    ),
  },
];

const Contact = () => {
  const [copied, setCopied] = useState(false);
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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative isolate w-full overflow-hidden px-6 py-28 md:py-36"
    >
      {/* Background atmosphere */}
      <div className="emphasis-gradient" aria-hidden="true" />

      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            'radial-gradient(circle at 70% 20%, hsla(42,82%,62%,0.06), transparent 55%), radial-gradient(circle at 20% 80%, hsla(190,55%,58%,0.05), transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1180px]">
        {/* Header */}
        <div
          ref={headerRef}
          className="mb-14 text-center md:mb-20"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 900ms cubic-bezier(0.16,1,0.3,1), transform 900ms cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gold/40" />
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-gold">
              04 / Contact
            </span>
            <span className="h-px w-10 bg-gold/40" />
          </div>

          <h2
            className="mx-auto max-w-3xl font-display text-[2.75rem] font-normal leading-[1.02] tracking-tighter text-text-primary sm:text-[3.5rem] md:text-[4.25rem]"
          >
            Have a problem worth{' '}
            <em
              className="italic text-gold"
            >
              solving
            </em>
            ?
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-[1rem] leading-relaxed text-text-secondary">
            I'm open to select freelance builds, startup collaborations, and new-grad roles.
            The fastest way to reach me is email — I reply within 48 hours.
          </p>
        </div>

        {/* Giant email CTA */}
        <div className="mb-16 md:mb-20">
          <div className="relative mx-auto max-w-5xl rounded-3xl border border-gold/25 bg-surface-base/60 p-8 backdrop-blur-xl md:p-14">
            <div
              className="pointer-events-none absolute inset-0 -z-10 rounded-3xl opacity-60"
              style={{
                background:
                  'radial-gradient(circle at 20% 30%, hsla(42,82%,62%,0.12), transparent 55%), radial-gradient(circle at 80% 70%, hsla(45,95%,72%,0.08), transparent 60%)',
              }}
              aria-hidden="true"
            />

            <div className="mb-6 flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
              </span>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-text-muted">
                Inbox open · replies within 48h
              </span>
            </div>

            <a
              href={`mailto:${EMAIL}`}
              className="group block break-all font-display text-[1.6rem] font-normal leading-[1.1] tracking-tighter text-text-primary transition-colors duration-500 hover:text-gold sm:text-[2.25rem] md:text-[3.1rem]"
            >
              {EMAIL}
              <span className="ml-3 inline-block translate-y-[-0.1em] text-gold opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
                →
              </span>
            </a>

            <div className="mt-8 flex flex-col gap-4 border-t border-border-subtle pt-6 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handleCopy}
                className="group inline-flex items-center gap-2.5 self-start rounded-lg border border-border-subtle bg-surface-elevated/60 px-4 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:text-gold"
                aria-live="polite"
              >
                {copied ? (
                  <>
                    <svg
                      className="h-3.5 w-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    Copied to clipboard
                  </>
                ) : (
                  <>
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
                      <rect x="9" y="9" width="13" height="13" rx="2" />
                      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                    </svg>
                    Copy email address
                  </>
                )}
              </button>

              <a
                href={`mailto:${EMAIL}?subject=Project%20enquiry`}
                className="btn-primary justify-center"
              >
                Compose email
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
          </div>
        </div>

        {/* Link cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {LINKS.map((link, idx) => (
            <a
              key={link.id}
              href={link.href}
              target={link.download ? undefined : '_blank'}
              rel={link.download ? undefined : 'noopener noreferrer'}
              download={link.download || undefined}
              className="link-card group flex items-start gap-4 rounded-2xl border border-border-subtle bg-surface-base/60 p-5 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:bg-surface-elevated/70 hover:shadow-[0_20px_50px_-30px_hsla(42,82%,62%,0.35)]"
              style={{
                animation: `fade-rise 800ms cubic-bezier(0.16,1,0.3,1) ${idx * 90}ms both`,
              }}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-surface-elevated/60 text-text-secondary transition-all duration-300 group-hover:border-gold/40 group-hover:text-gold">
                <span className="h-5 w-5">{link.icon}</span>
              </div>

              <div className="flex-1">
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <span className="font-display text-[1.05rem] font-normal leading-tight tracking-tight text-text-primary transition-colors duration-300 group-hover:text-gold">
                    {link.label}
                  </span>
                  <span className="arrow translate-x-[-4px] opacity-0 text-gold transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
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
                      <path d="M7 17L17 7M17 7H8M17 7v9" />
                    </svg>
                  </span>
                </div>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-gold/70">
                  {link.handle}
                </p>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-text-secondary">
                  {link.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Closing line */}
        <div className="mt-16 flex flex-col items-center gap-3 text-center md:mt-24">
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-text-muted">
            · Based in Canada, working globally ·
          </span>
          <p
            className="font-display text-[1.1rem] italic text-text-secondary"
          >
            Let's build something worth building.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
