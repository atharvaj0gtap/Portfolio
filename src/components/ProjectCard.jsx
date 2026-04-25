import React from 'react';
import { EventEmitter } from '../App';

const ProjectCard = ({ project }) => {
  const handleClick = () => {
    EventEmitter.dispatch('openProjectModal', project);
  };

  return (
    <div
      onClick={handleClick}
      className="rounded-xl bg-surface-raised/60 border border-border-subtle/50 overflow-hidden cursor-pointer hover:border-gold/25 transition-colors duration-200 group flex flex-col"
    >
      {/* Image */}
      <div className="h-40 overflow-hidden bg-surface-overlay shrink-0">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          width="400"
          height="160"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {project.metric && (
          <span className="font-mono text-[0.6rem] text-gold/60 mb-1 block">{project.metric}</span>
        )}
        <h3 className="text-sm font-medium text-text-primary mb-1">{project.title}</h3>
        <p className="text-text-secondary text-xs mb-3 line-clamp-2 leading-relaxed flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-3">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-1.5 py-0.5 rounded bg-surface-overlay/60 border border-border-subtle/40 font-mono text-[0.58rem] text-text-muted"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-1.5 py-0.5 rounded bg-surface-overlay/60 border border-border-subtle/40 font-mono text-[0.58rem] text-text-muted">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        <button className="text-[0.7rem] text-gold/60 hover:text-gold font-mono transition-colors flex items-center gap-1 self-start">
          View Details <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
