import React, { useEffect } from 'react';

const ProjectModal = ({ isOpen, project, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const bullets = Array.isArray(project.bullets) ? project.bullets : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="project-modal-title"
    >
      <div
        className="relative w-full max-w-4xl rounded-2xl bg-surface-raised border border-border-subtle overflow-hidden flex flex-col md:flex-row"
        style={{
          maxHeight: '88vh',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px hsla(42,82%,62%,0.06)',
          animation: 'fade-rise 0.25s ease-out forwards',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image panel — object-contain so the full image is always visible */}
        {project.image && (
          <div
            className="relative shrink-0 h-56 md:h-auto md:w-[44%] border-b md:border-b-0 md:border-r border-border-subtle/30"
            style={{
              background: `
                radial-gradient(ellipse at 25% 75%, hsla(220,55%,22%,0.7) 0%, transparent 58%),
                radial-gradient(ellipse at 78% 20%, hsla(42,82%,62%,0.10) 0%, transparent 52%),
                hsl(230,22%,9%)
              `,
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-contain p-6 md:p-8"
              loading="lazy"
              width="800"
              height="600"
            />
          </div>
        )}

        {/* Content panel — only this side scrolls */}
        <div className="flex-1 overflow-y-auto min-h-0 p-6 md:p-8 flex flex-col">

          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-gold/50 mb-1">
                Project
              </p>
              <h2
                id="project-modal-title"
                className="font-display text-2xl md:text-3xl text-text-primary leading-snug"
              >
                {project.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-text-muted hover:text-text-primary transition-colors shrink-0 mt-1 ml-4"
              aria-label="Close modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Short description */}
          {project.description && (
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              {project.description}
            </p>
          )}

          {/* Tech tags */}
          {project.technologies?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded bg-surface-overlay/60 border border-border-subtle/40 font-mono text-[0.65rem] text-text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Bullets */}
          {bullets.length > 0 && (
            <ul className="space-y-3 mb-6 flex-1">
              {bullets.map((bullet, i) => (
                <li key={i} className="flex gap-2.5 text-text-secondary text-sm leading-relaxed">
                  <span className="text-gold/40 mt-0.5 shrink-0" aria-hidden="true">▪</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}

          {/* GitHub CTA — pinned to bottom of content area */}
          {project.projectLink && (
            <div className="pt-4 border-t border-border-subtle/30 mt-auto">
              <a
                href={project.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2"
              >
                View on GitHub
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13V19a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
