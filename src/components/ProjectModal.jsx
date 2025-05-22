import React, { useEffect, useRef } from "react";
import "./ProjectModal.css";
import gsap from 'gsap';

const ProjectModal = ({ isOpen, project, onClose }) => {
  const modalRef = useRef(null);
  
  // Handle modal animations and events
  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Animation
      const tl = gsap.timeline();
      gsap.set(modalRef.current, { opacity: 0 });
      tl.to(modalRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Add ESC key handler
      const handleEsc = (e) => {
        if (e.key === "Escape") onClose();
      };
      
      window.addEventListener("keydown", handleEsc);
      
      // Cleanup
      return () => {
        window.removeEventListener("keydown", handleEsc);
      };
    }
  }, [isOpen, onClose]);
  
  // Add scroll locking effect
  useEffect(() => {
    if (isOpen) {
      // Lock body scroll when modal opens
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scrolling when modal closes
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      // Ensure scroll is restored if component unmounts
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div 
      className="project-modal-overlay"
      aria-modal="true"
      role="dialog"
      aria-labelledby="project-modal-title"
    >
      <div 
        className="project-modal"
        ref={modalRef}
        tabIndex="-1"
        onClick={e => e.stopPropagation()}
      >
        <div className="project-modal-content">
          <div className="project-header">
            <h2 id="project-modal-title">{project.title}</h2>
            <button 
              className="close-button" 
              onClick={onClose}
              aria-label="Close project modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          <div className="project-details">
            {/* Technology tags */}
            <div className="project-tags">
              {project.technologies && project.technologies.map((tech, index) => (
                <span key={index} className="project-tag">{tech}</span>
              ))}
            </div>
            
            {/* Project description */}
            <div className="project-description">
              <p>{project.longDescription || project.description}</p>
            </div>
            
            {/* Action buttons */}
            <div className="project-actions">
              {project.projectLink && (
                <a 
                  href={project.projectLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="action-button"
                >
                  View Project
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              )}
              
              {project.demoLink && (
                <a 
                  href={project.demoLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="action-button secondary"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;