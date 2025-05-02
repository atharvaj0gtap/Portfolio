import React, { useRef, useState, useEffect } from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import ProjectCard from './ProjectCard';

const ProjectCarousel = ({ projects }) => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Determine viewport size and set visible cards count
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Calculate max index based on viewport size
      const visibleCards = window.innerWidth < 768 ? 1 : 3;
      setMaxIndex(Math.max(0, projects.length - visibleCards));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [projects.length]);

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(prev => prev + 1);
      scrollToCard(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      scrollToCard(currentIndex - 1);
    }
  };

  const scrollToCard = (index) => {
    if (!carouselRef.current) return;
    
    const scrollAmount = isMobile 
      ? carouselRef.current.offsetWidth 
      : carouselRef.current.querySelector('.carousel-card').offsetWidth;
      
    carouselRef.current.scrollTo({
      left: index * scrollAmount,
      behavior: 'smooth'
    });
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    scrollToCard(index);
  };

  return (
    <div className="relative w-full">
      {/* Carousel container */}
      <div className="overflow-hidden">
        <div
          ref={carouselRef}
          className="flex snap-x snap-mandatory w-full overflow-x-scroll scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="carousel-card flex-shrink-0 w-full md:w-1/3 px-3 snap-center"
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                projectLink={project.projectLink}
                previewText={`${project.title} Preview`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation controls */}
      <div className="flex justify-between mt-6">
        <button 
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`p-2 rounded-full bg-surface-overlay border border-border-subtle ${
            currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent-main/20'
          }`}
          aria-label="Previous project"
        >
          <IoChevronBackOutline className="text-accent-main text-xl" />
        </button>

        {/* Dots indicator */}
        <div className="flex space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to project ${index + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                currentIndex === index 
                  ? 'bg-accent-main w-5' 
                  : 'bg-text-muted hover:bg-accent-light/50'
              }`}
            />
          ))}
        </div>

        <button 
          onClick={handleNext}
          disabled={currentIndex === maxIndex}
          className={`p-2 rounded-full bg-surface-overlay border border-border-subtle ${
            currentIndex === maxIndex ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent-main/20'
          }`}
          aria-label="Next project"
        >
          <IoChevronForwardOutline className="text-accent-main text-xl" />
        </button>
      </div>
    </div>
  );
};

export default ProjectCarousel;