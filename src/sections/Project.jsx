import React, { useRef } from 'react';
import RevealWrapper from '../components/RevealWrapper';
import ProjectCard from '../components/ProjectCard';
import { FEATURED_PROJECTS, GRID_PROJECTS } from '../data/projects';
import { EventEmitter } from '../App';

function FeaturedCard({ project, reverse }) {
  const cardRef = useRef(null);

  const openModal = () => EventEmitter.dispatch('openProjectModal', project);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const rx = (((e.clientY - rect.top) / rect.height) - 0.5) * -6;
    const ry = (((e.clientX - rect.left) / rect.width) - 0.5) * 6;
    el.style.setProperty('--rx', `${rx}deg`);
    el.style.setProperty('--ry', `${ry}deg`);
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <div className="tilt-wrap mb-8">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={openModal}
        className="tilt-card rounded-2xl bg-surface-raised/60 border border-border-subtle/50 overflow-hidden cursor-pointer"
      >
        <div className={`grid grid-cols-1 md:grid-cols-2`}>
          {/* Image */}
          <div className={`h-56 md:h-auto overflow-hidden bg-surface-overlay ${reverse ? 'md:order-2' : ''}`}>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
              width="800"
              height="450"
            />
          </div>

          {/* Text */}
          <div className={`flex flex-col justify-center p-6 md:p-8 ${reverse ? 'md:order-1' : ''}`}>
            <p className="tilt-lift font-mono text-[0.6rem] uppercase tracking-[0.2em] text-gold/50 mb-2">
              Featured Project
            </p>
            <h3 className="tilt-lift font-display text-2xl md:text-3xl text-text-primary mb-2 leading-snug">
              {project.title}
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              {project.description}
            </p>

            <div className="tilt-lift mb-4">
              <span className="project-stat">{project.stat}</span>
              <span className="text-text-muted text-sm ml-2">{project.statLabel}</span>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded bg-surface-overlay/60 border border-border-subtle/40 font-mono text-[0.6rem] text-text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>

            <a
              href={project.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="btn-secondary w-fit"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const Project = () => (
  <section id="projects" className="min-h-screen p-6 md:p-8 content-center">
    <div className="max-w-5xl mx-auto mt-20 md:mt-0">

      {/* Header */}
      <RevealWrapper delay={0.1} duration={0.6}>
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-gold text-center mb-3">
          Featured Work
        </p>
        <h2 className="font-display text-3xl md:text-4xl mb-3 text-accent-light text-center">
          Projects
        </h2>
        <p className="text-text-muted text-center mb-12 text-sm">
          {FEATURED_PROJECTS.length + GRID_PROJECTS.length} projects spanning full-stack, ML, data analytics &amp; mobile
        </p>
      </RevealWrapper>

      {/* Featured */}
      <RevealWrapper delay={0.2} duration={0.6}>
        {FEATURED_PROJECTS.map((project, i) => (
          <FeaturedCard key={project.id} project={project} reverse={i % 2 !== 0} />
        ))}
      </RevealWrapper>

      {/* Divider */}
      <RevealWrapper delay={0.3} duration={0.6}>
        <div className="flex items-center gap-4 my-10">
          <div className="flex-1 h-px bg-border-subtle/40" />
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-text-muted whitespace-nowrap">
            More Projects
          </p>
          <div className="flex-1 h-px bg-border-subtle/40" />
        </div>
      </RevealWrapper>

      {/* Grid */}
      <RevealWrapper delay={0.4} duration={0.6}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GRID_PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </RevealWrapper>

    </div>
  </section>
);

export default Project;
