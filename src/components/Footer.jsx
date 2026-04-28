import React from 'react';

const Footer = () => (
  <footer className="border-t border-border-subtle/40 bg-surface-base/80 backdrop-blur-sm">
    <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-text-muted">
      <span className="font-display text-sm text-text-secondary">JagtapWorks</span>

      <div className="flex items-center gap-4">
        <a href="#certifications" className="hover:text-text-secondary transition-colors">
          Certifications
        </a>
        <a
          href="#top"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="hover:text-text-secondary transition-colors"
        >
          Back to top ↑
        </a>
      </div>

      <span>© {new Date().getFullYear()} · Built with Intention.</span>
    </div>
  </footer>
);

export default Footer;
