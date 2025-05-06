import React, { useState, useRef, useEffect } from 'react';
import RevealWrapper from '../components/RevealWrapper';
import StaggeredReveal from '../components/StaggeredReveal';
import ProjectCard from '../components/ProjectCard';
import ProjectFolder from '../components/ProjectFolder';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

const Project = () => {
    const carouselRef = useRef(null);
    const [folderOpened, setFolderOpened] = useState(false);
    const [showProjects, setShowProjects] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    // Sample project data - you can replace this with your actual projects
    const projects = [
      {
        id: 1,
        title: "Portfolio Website",
        description: "A modern, responsive portfolio site built with React and Tailwind CSS featuring smooth animations and dark mode.",
        technologies: ["React", "TailwindCSS", "GSAP"],
        projectLink: "https://github.com/your-username/portfolio"
      },
      {
        id: 2,
        title: "Data Visualization Dashboard",
        description: "Interactive dashboard for visualizing complex datasets with filtering capabilities and responsive design.",
        technologies: ["D3.js", "TypeScript", "API Integration"],
        projectLink: "https://github.com/your-username/data-dashboard"
      },
      {
        id: 3,
        title: "E-commerce Platform",
        description: "Full-featured e-commerce solution with product catalog, shopping cart, and secure payment processing.",
        technologies: ["Next.js", "Stripe", "MongoDB"],
        projectLink: "https://github.com/your-username/ecommerce"
      },
      {
        id: 4,
        title: "AI Assistant App",
        description: "Mobile application powered by machine learning to assist users with daily tasks and information retrieval.",
        technologies: ["React Native", "TensorFlow", "Node.js"],
        projectLink: "https://github.com/your-username/ai-assistant"
      },
      {
        id: 5,
        title: "Blockchain Explorer",
        description: "Web application for browsing and analyzing blockchain transactions with intuitive visualizations.",
        technologies: ["Ethereum", "Web3.js", "Vue"],
        projectLink: "https://github.com/your-username/blockchain-explorer"
      }
    ];

    // Calculate projects per page based on screen size
    const getProjectsPerPage = () => {
      return isMobile ? 1 : 3;
    };
    
    // Handle navigation with looping
    const goToNextPage = () => {
      const projectsPerPage = getProjectsPerPage();
      const maxPage = Math.ceil(projects.length / projectsPerPage) - 1;
      
      // Loop to first page when at the end
      const nextPage = currentPage === maxPage ? 0 : currentPage + 1;
      setCurrentPage(nextPage);
      scrollToPage(nextPage);
    };

    const goToPrevPage = () => {
      const projectsPerPage = getProjectsPerPage();
      const maxPage = Math.ceil(projects.length / projectsPerPage) - 1;
      
      // Loop to last page when at the beginning
      const prevPage = currentPage === 0 ? maxPage : currentPage - 1;
      setCurrentPage(prevPage);
      scrollToPage(prevPage);
    };
    
    // Updated scrollToPage function - fix the last page calculation
    const scrollToPage = (pageIndex) => {
      if (carouselRef.current) {
        setIsScrolling(true);
        
        const projectsPerPage = getProjectsPerPage();
        const carouselWidth = carouselRef.current.clientWidth;
        const totalProjects = projects.length;
        
        let scrollPosition;
        
        // Special handling for last page with fewer than projectsPerPage items
        if (!isMobile && pageIndex === Math.ceil(totalProjects / projectsPerPage) - 1) {
          // If it's the last page and not divisible by projectsPerPage (like showing cards 4,5 of 5)
          if (totalProjects % projectsPerPage !== 0) {
            // Calculate how many cards from previous pages
            const prevPagesCards = pageIndex * projectsPerPage;
            // Calculate how many cards are on the last page
            const lastPageCards = totalProjects - prevPagesCards;
            // Ensure all cards on the last page are fully visible
            scrollPosition = (totalProjects - lastPageCards) * (carouselWidth / projectsPerPage);
          } else {
            // Regular calculation for full pages
            scrollPosition = pageIndex * carouselWidth;
          }
        } else {
          // Standard calculation for non-edge cases
          const scrollAmount = isMobile ? carouselWidth : carouselWidth / projectsPerPage;
          scrollPosition = pageIndex * scrollAmount;
        }
        
        carouselRef.current.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
        
        // Reset isScrolling after animation completes
        setTimeout(() => {
          setIsScrolling(false);
        }, 500);
      }
    };
    
    // Handle scroll events to update currentPage with looping
    const handleScroll = () => {
      // Don't update currentPage if we're programmatically scrolling
      if (isScrolling || !carouselRef.current) return;
      
      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        const carouselWidth = carouselRef.current.clientWidth;
        const scrollAmount = isMobile ? carouselWidth : carouselWidth / 3;
        const scrollPosition = carouselRef.current.scrollLeft;
        
        const projectsPerPage = getProjectsPerPage();
        const maxPage = Math.ceil(projects.length / projectsPerPage) - 1;
        
        // Calculate page based on scroll position
        let newPage = Math.round(scrollPosition / scrollAmount);
        
        // Handle edge cases
        if (newPage < 0) newPage = 0;
        if (newPage > maxPage) newPage = maxPage;
        
        // Only update if actually changed to prevent unnecessary rerenders
        if (newPage !== currentPage) {
          setCurrentPage(newPage);
        }
      });
    };

    // Handle folder open completion
    const handleFolderOpen = () => {
      setFolderOpened(true);
      
      setTimeout(() => {
        setShowProjects(true);
      }, 200);
    };

    return (
      <section id="projects" className="min-h-screen p-8">
        {/* Title reveals separately */}
        <RevealWrapper delay={0.1} duration={0.6}>
          <h2 className="text-3xl font-bold mb-12 text-accent-light text-center">Projects</h2>
        </RevealWrapper>
        
        {/* Show folder if not opened, otherwise show projects */}
        {!folderOpened ? (
          <div className="flex justify-center items-center mt-32 mb-20">
            <ProjectFolder 
              color="#5C96FF" 
              size={2} 
              onOpenComplete={handleFolderOpen} 
            />
          </div>
        ) : (
          /* Project cards with carousel */
          <div className="relative min-h-[300px] max-w-6xl mx-auto">
            {showProjects && (
              <div className="relative">
                <RevealWrapper delay={0.3} duration={0.6}>
                  {/* Scrollable carousel */}
                  <div 
                    ref={carouselRef}
                    onScroll={handleScroll}
                    className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                    style={{
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                      WebkitOverflowScrolling: 'touch'
                    }}
                  >
                    {/* Remove the key from StaggeredReveal to prevent remounting */}
                    <StaggeredReveal 
                      baseDelay={0.3} 
                      staggerDelay={0.2} 
                      duration={0.7}
                      className="flex w-full"
                    >
                      {projects.map(project => (
                        <div 
                          key={project.id} 
                          className="carousel-card flex-shrink-0 w-full md:w-1/3 px-3 snap-center"
                          style={{ scrollSnapAlign: 'center' }}
                        >
                          <ProjectCard 
                            title={project.title}
                            description={project.description}
                            technologies={project.technologies}
                            projectLink={project.projectLink}
                            // image={project.image} - Add this when you have images
                            previewText={`${project.title} Preview`}
                          />
                        </div>
                      ))}
                    </StaggeredReveal>
                  </div>
                  
                  {/* Navigation buttons positioned on sides */}
                  <button 
                    onClick={goToPrevPage}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-5 p-3 rounded-full bg-surface-overlay border border-border-subtle transition-all z-10 hover:bg-accent-main/20"
                    aria-label="Previous projects"
                  >
                    <IoChevronBackOutline className="text-accent-main text-xl" />
                  </button>
                  
                  <button 
                    onClick={goToNextPage}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-5 p-3 rounded-full bg-surface-overlay border border-border-subtle transition-all z-10 hover:bg-accent-main/20"
                    aria-label="Next projects"
                  >
                    <IoChevronForwardOutline className="text-accent-main text-xl" />
                  </button>
                </RevealWrapper>
              </div>
            )}
          </div>
        )}
      </section>
    );
};

export default Project;