import React from 'react';
import RevealWrapper from '../components/RevealWrapper';

const LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/atharvaj0gtap',
    external: true,
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/atharvahjagtap/',
    external: true,
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
      </svg>
    ),
  },
  {
    label: 'Resume',
    href: '/assets/certifications/AtharvaJagtap_Resume.pdf',
    download: true,
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
  },
];

const Contact = () => (
  <section id="contact" className="min-h-screen p-6 md:p-8 content-center relative overflow-hidden">
    {/* Emphasis gradient — warm center glow + edge vignette */}
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{background: `radial-gradient(ellipse 60% 50% at 50% 40%, hsla(45,90%,65%,0.04) 0%, transparent 70%)`}}
    />

    <div className="relative max-w-3xl mx-auto text-center mt-20 md:mt-0">

      {/* Header */}
      <RevealWrapper delay={0.1} duration={0.6}>
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-gold mb-3">
          Contact
        </p>
        <h2 className="font-display text-3xl md:text-5xl text-text-primary mb-6 leading-tight">
          Let's build something together.
        </h2>
        <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-12 max-w-xl mx-auto">
          Available for freelance work and full-time roles. Whether you have a project
          in mind or just want to connect, I'd love to hear from you.
        </p>
      </RevealWrapper>

      {/* Giant email CTA */}
      <RevealWrapper delay={0.2} duration={0.6}>
        <a
          href="mailto:atharva@jagtapworks.com"
          className="group inline-flex items-center gap-3 font-display text-gold hover:text-gold-dark transition-all duration-200 hover:scale-[1.02] mb-16"
          style={{ fontSize: 'clamp(1.2rem, 2.8vw, 2.1rem)' }}
        >
          atharva@jagtapworks.com
          <span
            className="inline-block transition-transform duration-200 group-hover:translate-x-2"
            aria-hidden="true"
          >
            →
          </span>
        </a>
      </RevealWrapper>

      {/* Link cards */}
      <RevealWrapper delay={0.3} duration={0.6}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-16">
          {LINKS.map(({ label, href, external, download, icon }) => (
            <a
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              download={download || undefined}
              className="group flex items-center justify-between p-4 rounded-xl bg-surface-overlay/60 border border-border-subtle/50 hover:border-gold/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-center gap-3 text-text-secondary group-hover:text-text-primary transition-colors duration-200">
                {icon}
                <span className="text-sm">{label}</span>
              </div>
              <span
                className="text-text-muted text-sm group-hover:text-gold/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>
          ))}
        </div>
      </RevealWrapper>

      {/* Closing tagline */}
      <RevealWrapper delay={0.4} duration={0.6}>
        <p className="text-text-muted text-sm">
          Based in Canada and Dubai, working globally.
        </p>
      </RevealWrapper>

    </div>
  </section>
);

export default Contact;
