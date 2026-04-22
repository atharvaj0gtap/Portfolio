import React, { useRef, useEffect, useState } from 'react';

const ProjectGridCard = ({ project, index }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      ref={ref}
      href={project.projectLink}
      target="_blank"
      rel="noopener noreferrer"
      className="link-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface-base/60 p-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:bg-surface-elevated/70 hover:shadow-[0_20px_50px_-30px_hsla(42,82%,62%,0.35)]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 700ms cubic-bezier(0.16,1,0.3,1) ${index * 60}ms, transform 700ms cubic-bezier(0.16,1,0.3,1) ${index * 60}ms, border-color 500ms, background 500ms, box-shadow 500ms`,
      }}
    >
      {/* Hover gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(circle at 30% 0%, hsla(42,82%,62%,0.08), transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="relative mb-4 flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border-subtle bg-surface-elevated/70">
          <img
            src={project.image}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="h-7 w-7 object-contain opacity-80"
          />
        </div>
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-text-muted">
          {project.year}
        </span>
      </div>

      {/* Title + description */}
      <div className="relative mb-5 flex-1">
        <h3 className="mb-2 font-display text-[1.2rem] font-normal leading-[1.25] tracking-tight text-text-primary transition-colors duration-300 group-hover:text-gold">
          {project.title}
        </h3>
        <p className="text-[0.82rem] leading-relaxed text-text-secondary">
          {project.description}
        </p>
      </div>

      {/* Metric */}
      <div className="relative mb-4 flex items-baseline gap-2 border-t border-border-subtle pt-4">
        <span
          className="font-display text-[1.35rem] font-normal leading-none tracking-tight text-gold"
        >
          {project.metric.value}
        </span>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-text-muted">
          {project.metric.label}
        </span>
      </div>

      {/* Tech tags */}
      <div className="relative flex flex-wrap gap-1.5">
        {project.technologies.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="rounded border border-border-subtle/70 bg-surface-elevated/40 px-1.5 py-0.5 font-mono text-[0.6rem] text-text-muted"
          >
            {tech}
          </span>
        ))}
        {project.technologies.length > 4 && (
          <span className="font-mono text-[0.6rem] text-text-muted">
            +{project.technologies.length - 4}
          </span>
        )}
      </div>

      {/* Arrow */}
      <div className="pointer-events-none absolute right-4 top-4 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 -translate-x-1 translate-y-1">
        <svg
          className="h-4 w-4 text-gold"
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
      </div>
    </a>
  );
};

export default ProjectGridCard;
