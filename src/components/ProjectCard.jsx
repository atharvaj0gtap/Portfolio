import React from 'react';
import SpotlightCard from './SpotlightCard';
import { EventEmitter } from '../App';

const ProjectCard = ({
  title = "Project Title",
  description = "A brief description of this project.",
  image = null,
  previewText = "Project Preview",
  technologies = ["React", "TailwindCSS"],
  projectLink = "#",
  longDescription = null,
  demoLink = null,
  metric = null,
  style = {}
}) => {
  const handleViewClick = (e) => {
    e.preventDefault();
    EventEmitter.dispatch('openProjectModal', {
      title,
      description,
      longDescription: longDescription || description,
      image,
      previewText,
      technologies,
      projectLink,
      demoLink
    });
  };

  return (
    <SpotlightCard
      className="card group hover:border-accent-main/50 transition-colors"
      spotlightColor="rgba(80, 158, 236, 0.1)"
      style={style}
    >
      <div className="h-40 -m-6 mb-6 bg-surface-highest rounded-t-lg overflow-hidden relative">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            width="400"
            height="160"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-accent-main/20 to-accent-dark/5 flex items-center justify-center text-text-muted group-hover:scale-105 transition-transform">
            {previewText}
          </div>
        )}
        {metric && (
          <span className="absolute top-3 right-3 px-2.5 py-1 bg-gold/90 text-surface-base text-[0.65rem] font-mono font-semibold rounded-md">
            {metric}
          </span>
        )}
      </div>

      <h3 className="text-lg font-medium mb-2 text-text-primary">{title}</h3>
      <p className="text-text-secondary text-sm mb-4 line-clamp-2">{description}</p>

      <div className="flex gap-1.5 flex-wrap mb-4">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="px-2 py-0.5 bg-surface-highest text-text-muted font-mono text-[0.65rem] rounded"
          >
            {tech}
          </span>
        ))}
      </div>

      <a
        href={projectLink}
        onClick={handleViewClick}
        className="text-accent-main hover:text-accent-light inline-flex items-center text-sm transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        View Details
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>
    </SpotlightCard>
  );
};

export default ProjectCard;
