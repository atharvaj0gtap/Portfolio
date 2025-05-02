import React from 'react';
import SpotlightCard from './SpotlightCard';

/**
 * ProjectCard component for displaying individual project information
 * 
 * @param {Object} props
 * @param {string} props.title - Project title
 * @param {string} props.description - Project description
 * @param {string} props.image - Optional image URL (defaults to gradient)
 * @param {string} props.previewText - Text to show in preview area if no image
 * @param {Array} props.technologies - Array of technology names
 * @param {string} props.projectLink - URL to the project
 * @param {Object} props.style - Style object (needed for StaggeredReveal animations)
 */
const ProjectCard = ({ 
  title = "Project Title", 
  description = "A brief description of this project.",
  image = null,
  previewText = "Project Preview",
  technologies = ["React", "TailwindCSS"],
  projectLink = "#",
  style = {} // Add the style prop with default empty object
}) => {
  return (
    <SpotlightCard 
      className="card group hover:border-accent-main/50 transition-colors" 
      spotlightColor="rgba(92, 169, 255, 0.1)"
      style={style} // Pass the style prop to SpotlightCard
    >
      <div className="h-40 -m-6 mb-6 bg-surface-highest rounded-t-lg overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-accent-main/20 to-accent-dark/5 flex items-center justify-center text-text-muted group-hover:scale-105 transition-transform">
            {previewText}
          </div>
        )}
      </div>
      
      <h3 className="text-xl font-medium mb-2 text-text-primary">{title}</h3>
      <p className="text-text-secondary mb-4">{description}</p>
      
      <div className="flex gap-2 flex-wrap mb-4">
        {technologies.map((tech, index) => (
          <span 
            key={index} 
            className="px-2 py-1 bg-surface-highest text-text-secondary text-xs rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>
      
      <a 
        href={projectLink} 
        className="text-accent-main hover:text-accent-light inline-flex items-center transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        View Project 
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>
    </SpotlightCard>
  );
};

export default ProjectCard;