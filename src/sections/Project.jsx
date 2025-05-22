import React, { useState, useRef, useEffect } from 'react';
import RevealWrapper from '../components/RevealWrapper';
import StaggeredReveal from '../components/StaggeredReveal';
import ProjectCard from '../components/ProjectCard';
import ProjectFolder from '../components/ProjectFolder';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { image } from 'framer-motion/client';

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
        description: "A modern, responsive portfolio website with animations, interactive micro-UX, and 3D elements.",
        longDescription: `▪	Developed a responsive portfolio with React (Vite) and Tailwind CSS on Cloudflare Pages, implementing code-splitting, lazy-loading, image compression, and HTTP/3 + Brotli, achieving 90+ Lighthouse scores in Performance, Accessibility & SEO and reducing initial load times by 40%.
        
        ▪	Integrated GSAP ScrollTrigger and Three.js for smooth, scroll-driven animations and lightweight 3D scenes, enhancing interactive micro-UX without performance degradation and boosting visitor engagement.
        
        ▪	Architected a modular component library (sections, cards, navigation, hooks) and end-to-end CI/CD pipeline (Git + DNS + Cloudflare Pages + automated SSL/TLS), cutting development time by 40% and ensuring 100% uptime under Full-Strict SSL.`,
        technologies: ["React", "TailwindCSS", "GSAP", "Three.js"],
        projectLink: "https://github.com/atharvaj0gtap/Portfolio",
        image: "/assets/logos/JagtapWorksLogo.png"
      },
      {
        id: 2,
        title: "Insurance Policy Software",
        description: "Web application designed for BFL Canada to automate and streamline the comparison of insurance policy documents using AI.",
        longDescription: `▪	Developed a React/Node.js/Express web application with a MySQL backend to automate policy creation and comparison, reducing manual review time by 80% for 100+ monthly documents.
        
        ▪	Architected an AI-driven discrepancy detection pipeline, leveraging GROBID for text extraction and Levenstein-distance algorithms via AI APIs to achieve 90% accuracy in identifying policy changes.
        
        ▪	Conducted end-to-end testing with Playwright (UI) and Jest (API), boosting test coverage to 60% and preventing production defects prior to deployment.`,
        technologies: ["Java", "React", "Node.js", "MySQL"],
        projectLink: "https://github.com/COSC-499-W2024",
        image: "/assets/icons/BFL.png"
      },
      {
        id: 3,
        title: "AI Trend Analysis",
        description: "Analysis and visualization of the impact of artificial intelligence (AI) on jobs and industries, specifically employment trends.",
        longDescription: `▪	Created a Python data pipeline (Pandas, NumPy) to clean and analyze records from the AI-Powered Job Market Insights dataset, covering 500 job roles across 50+ countries.
        
        ▪	Designed and implemented 10+ visualizations (Matplotlib, Seaborn) and boosted stakeholder comprehension of global AI-impact trends.
        
        ▪	Authored an analytical report with data-driven policy recommendations (e.g., targeted reskilling programs projected to mitigate 20% of forecasted job losses) and presented findings to academic audiences.`,
        technologies: ["Pandas", "Matplotlib", "Numpy"],
        projectLink: "https://github.com/atharvaj0gtap/AI-Trend-Analysis",
        image: "/assets/icons/AI.png"
      },
      {
        id: 4,
        title: "Jersey Number Recognition",
        description: "Project to enhance an existing jersey number recognition pipeline using deep learning techniques.",
        longDescription: `▪	Revamped the legibility classifier by integrating diverse data augmentations (random noise, real-world distortions) and a MixUp label-blending strategy with soft targets, improving classifier accuracy by 18% and reducing illegible-frame false positives by 25%.`,
        technologies: ["TensorFlow", "PyTorch", "Pandas", "OpenCV"],
        projectLink: "https://github.com/MahmoudOsama97/jersey-number-pipeline_PlusPlus",
        image: "/assets/icons/sys_arch.png"
      },
      {
        id: 5,
        title: "Network Analysis of Wildfires",
        description: "Study investigating how environmental and geographical factors influence wildfire clustering and causes in Alberta",
        longDescription: `▪	Utilized advanced network analyses in R, applying Louvain, DBSCAN, and K-Means algorithms to cluster wildfire events, identifying 69 distinct communities and revealing that major fires act as hubs connecting 25% of smaller clusters.
        
        ▪	Designed geospatial visualizations and statistical models that uncovered a 70% correlation between peak daily temperatures and wildfire size, informing stakeholder risk-assessment frameworks.
        
        ▪	Authored and published a GitHub-hosted research paper, “Network Analysis of Alberta Wildfires: Understanding Clustering and Root Causes,” driving peer collaboration and shaping future mitigation and monitoring strategies.`,
        technologies: ["R", "DBSCAN", "K-Means", "ggplot2"],
        projectLink: "https://github.com/atharvaj0gtap/Network-Science-Team-4",
        image: "/assets/icons/NetworkAnalysis.png"
      },
      {
        id: 6,
        title: "HCI Research",
        description: "A study investigating the performance of the Adaptive Bubble Cursor in a dynamic environment.",
        longDescription: `▪	Engineered an Adaptive Bubble Cursor using Unity 2D and C#, featuring dynamic resizing, context-aware adaptability, and gamified feedback cues to enhance target selection efficiency in dense and dynamic environments.
        
        ▪	Led a controlled user study with 20 participants across four dynamic task scenarios, reducing selection error rates by 47% and improving target acquisition time by 12% compared to a standard Point Cursor.
        
        ▪	Wrote a research paper titled, “Exploring The Adaptive Bubble Cursor In Gamified Environments”, applying T-tests and ANOVA to validate statistically significant gains in speed, accuracy, and user engagement (p < .01).`,
        technologies: ["Unity", "C#"],
        projectLink: "https://github.com/atharvaj0gtap/COSC-441-Group-5",
        image: "/assets/icons/HCI.jpg"
      },
      {
        id: 7,
        title: "E-Learning Platform",
        description: "A platform designed to transform the traditional classroom experience into an interactive, AI-enhanced environment.",
        longDescription: `▪	Facilitated agile sprint planning for a 5-person team across 8 two-week sprints, defining design requirements and prioritizing features, delivering 95% of MVP scope on schedule and boosting dev velocity by 30%.
        
        ▪	Built a React/HTML/CSS frontend with course enrollment, assignment submission, and profile management modules, increasing user engagement.
        
        ▪	Engineered RESTful APIs in Node.js/Express with a MongoDB datastore, optimizing data retrieval and update processes for student, teacher, and course information.`,
        technologies: ["React", "Bootstrap", "Express.js", "MongoDB"],
        projectLink: "https://github.com/dabby04/TheLearningLayers",
        image: "/assets/icons/LearningLayers.png"
      },
      {
        id: 8,
        title: "Shelter Finder App",
        description: "An app that provides an interface to create and post listings of homes for people in need during wildfires.",
        longDescription: `▪	Pioneered a Java/Android Studio mobile application listing emergency shelters across wildfire-prone regions, reducing average shelter-finding time by 1.2 minutes per user in simulated disaster drills.
        
        ▪	Integrated Google Maps API for real-time geolocation and optimized routing, boosting navigation accuracy by 95% and accelerating user response in critical relief scenarios.`,
        technologies: ["Android Studio", "Firebase", "Google Maps API"],
        projectLink: "https://github.com/atharvaj0gtap/ShelterFinderApp",
        image: "/assets/icons/ShelterFinder.png"
      },
      {
        id: 9,
        title: "eCommerce Website",
        description: "This web development project involves constructing an online store similar to Amazon that sells products.",
        longDescription: `▪	Developed a Java-based backend with UML-modeled database schema and embedded SQL queries, streamlining order processing and reducing inventory discrepancies by 25%.
        
        ▪	Constructed a Java/HTML/CSS frontend following UX best practices, introducing real-time order status and one-click checkout.`,
        technologies: ["JSP", "JDBC", "SQL", "HTML", "CSS"],
        projectLink: "https://github.com/atharvaj0gtap/Web-development",
        image: "/assets/icons/SwiftShopper.png"
      },
      {
        id: 10,
        title: "World Happiness Index Analysis",
        description: "A project to examine trends in happiness over a timeframe and evaluate the economic impacts on the happiness scale.",
        longDescription: `▪	Led a 3-people research project conducting data analysis on decades of data from 150+ countries from the World Happiness Index, employing Python collections including Pandas, NumPy, Matplotlib, and Seaborn.
        
        ▪	Conducted multivariate regression and cluster analyses to identify the top 5 determinants of global happiness, GDP per capita, social support, life expectancy, freedom, and generosity explaining 65% of score variance.
        
        ▪	Designed an interactive Tableau dashboard featuring a world map, time-series plots, and drill-down filters, boosting stakeholder engagement.`,
        technologies: ["Tableau", "Pandas", "Seaborn", "Matplotlib"],
        projectLink: "https://github.com/ubco-W2022T1-cosc301/project-group41",
        image: "/assets/icons/WorldHappiness.png"
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

    // Extract thumbnails from projects array (first 3 only)
    const projectThumbnails = projects
    .slice(1, 3) // Take only first 2 projects after portfolio
    .map(project => project.image) // Extract image paths
    .concat('/assets/logos/JagtapWorksLogo.png'); // Add portfolio image at the end

    return (
      <section id="projects" className="min-h-screen p-8">
        <div className='mt-40 md:mt-0'>
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
              projectThumbnails={projectThumbnails}
              folderLogo="/assets/logos/IconLogo.png"
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
                            longDescription={project.longDescription}
                            technologies={project.technologies}
                            projectLink={project.projectLink}
                            image={project.image}
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
        </div>
      </section>
    );
};

export default Project;