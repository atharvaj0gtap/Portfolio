import React, { useState, useRef, useEffect } from 'react';
import RevealWrapper from '../components/RevealWrapper';
import StaggeredReveal from '../components/StaggeredReveal';
import ProjectCard from '../components/ProjectCard';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

const Project = () => {
    const carouselRef = useRef(null);
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

    const projects = [
      {
        id: 1,
        title: "Portfolio Website",
        description: "A modern, responsive portfolio with animations, interactive micro-UX, and 3D elements.",
        longDescription: `\u25aa\tDeveloped a responsive portfolio with React (Vite) and Tailwind CSS on Cloudflare Pages, implementing code-splitting, lazy-loading, image compression, and HTTP/3 + Brotli, achieving 90+ Lighthouse scores in Performance, Accessibility & SEO and reducing initial load times by 40%.

        \u25aa\tIntegrated GSAP ScrollTrigger and Three.js for smooth, scroll-driven animations and lightweight 3D scenes, enhancing interactive micro-UX without performance degradation and boosting visitor engagement.

        \u25aa\tArchitected a modular component library (sections, cards, navigation, hooks) and end-to-end CI/CD pipeline (Git + DNS + Cloudflare Pages + automated SSL/TLS), cutting development time by 40% and ensuring 100% uptime under Full-Strict SSL.`,
        technologies: ["React", "TailwindCSS", "GSAP", "Three.js"],
        projectLink: "https://github.com/atharvaj0gtap/Portfolio",
        image: "/assets/logos/JagtapWorksLogo.png",
        metric: "90+ Lighthouse"
      },
      {
        id: 2,
        title: "Insurance Policy Software",
        description: "Web application designed for BFL Canada to automate and streamline the comparison of insurance policy documents using AI.",
        longDescription: `\u25aa\tDeveloped a React/Node.js/Express web application with a MySQL backend to automate policy creation and comparison, reducing manual review time by 80% for 100+ monthly documents.

        \u25aa\tArchitected an AI-driven discrepancy detection pipeline, leveraging GROBID for text extraction and Levenstein-distance algorithms via AI APIs to achieve 90% accuracy in identifying policy changes.

        \u25aa\tConducted end-to-end testing with Playwright (UI) and Jest (API), boosting test coverage to 60% and preventing production defects prior to deployment.`,
        technologies: ["Java", "React", "Node.js", "MySQL"],
        projectLink: "https://github.com/COSC-499-W2024",
        image: "/assets/icons/BFL.png",
        metric: "80% Faster Reviews"
      },
      {
        id: 3,
        title: "AI Trend Analysis",
        description: "Analysis and visualization of the impact of artificial intelligence (AI) on jobs and industries, specifically employment trends.",
        longDescription: `\u25aa\tCreated a Python data pipeline (Pandas, NumPy) to clean and analyze records from the AI-Powered Job Market Insights dataset, covering 500 job roles across 50+ countries.

        \u25aa\tDesigned and implemented 10+ visualizations (Matplotlib, Seaborn) and boosted stakeholder comprehension of global AI-impact trends.

        \u25aa\tAuthored an analytical report with data-driven policy recommendations (e.g., targeted reskilling programs projected to mitigate 20% of forecasted job losses) and presented findings to academic audiences.`,
        technologies: ["Pandas", "Matplotlib", "Numpy"],
        projectLink: "https://github.com/atharvaj0gtap/AI-Trend-Analysis",
        image: "/assets/icons/AI.png",
        metric: "500+ Roles Analyzed"
      },
      {
        id: 4,
        title: "Jersey Number Recognition",
        description: "Project to enhance an existing jersey number recognition pipeline using deep learning techniques.",
        longDescription: `\u25aa\tRevamped the legibility classifier by integrating diverse data augmentations (random noise, real-world distortions) and a MixUp label-blending strategy with soft targets, improving classifier accuracy by 18% and reducing illegible-frame false positives by 25%.`,
        technologies: ["TensorFlow", "PyTorch", "Pandas", "OpenCV"],
        projectLink: "https://github.com/MahmoudOsama97/jersey-number-pipeline_PlusPlus",
        image: "/assets/icons/sys_arch.png",
        metric: "+18% Accuracy"
      },
      {
        id: 5,
        title: "Network Analysis of Wildfires",
        description: "Study investigating how environmental and geographical factors influence wildfire clustering and causes in Alberta",
        longDescription: `\u25aa\tUtilized advanced network analyses in R, applying Louvain, DBSCAN, and K-Means algorithms to cluster wildfire events, identifying 69 distinct communities and revealing that major fires act as hubs connecting 25% of smaller clusters.

        \u25aa\tDesigned geospatial visualizations and statistical models that uncovered a 70% correlation between peak daily temperatures and wildfire size, informing stakeholder risk-assessment frameworks.

        \u25aa\tAuthored and published a GitHub-hosted research paper, "Network Analysis of Alberta Wildfires: Understanding Clustering and Root Causes," driving peer collaboration and shaping future mitigation and monitoring strategies.`,
        technologies: ["R", "DBSCAN", "K-Means", "ggplot2"],
        projectLink: "https://github.com/atharvaj0gtap/Network-Science-Team-4",
        image: "/assets/icons/NetworkAnalysis.png",
        metric: "69 Clusters Found"
      },
      {
        id: 6,
        title: "HCI Research",
        description: "A study investigating the performance of the Adaptive Bubble Cursor in a dynamic environment.",
        longDescription: `\u25aa\tEngineered an Adaptive Bubble Cursor using Unity 2D and C#, featuring dynamic resizing, context-aware adaptability, and gamified feedback cues to enhance target selection efficiency in dense and dynamic environments.

        \u25aa\tLed a controlled user study with 20 participants across four dynamic task scenarios, reducing selection error rates by 47% and improving target acquisition time by 12% compared to a standard Point Cursor.

        \u25aa\tWrote a research paper titled, "Exploring The Adaptive Bubble Cursor In Gamified Environments", applying T-tests and ANOVA to validate statistically significant gains in speed, accuracy, and user engagement (p < .01).`,
        technologies: ["Unity", "C#"],
        projectLink: "https://github.com/atharvaj0gtap/COSC-441-Group-5",
        image: "/assets/icons/HCI.jpg",
        metric: "47% Fewer Errors"
      },
      {
        id: 7,
        title: "E-Learning Platform",
        description: "A platform designed to transform the traditional classroom experience into an interactive, AI-enhanced environment.",
        longDescription: `\u25aa\tFacilitated agile sprint planning for a 5-person team across 8 two-week sprints, defining design requirements and prioritizing features, delivering 95% of MVP scope on schedule and boosting dev velocity by 30%.

        \u25aa\tBuilt a React/HTML/CSS frontend with course enrollment, assignment submission, and profile management modules, increasing user engagement.

        \u25aa\tEngineered RESTful APIs in Node.js/Express with a MongoDB datastore, optimizing data retrieval and update processes for student, teacher, and course information.`,
        technologies: ["React", "Bootstrap", "Express.js", "MongoDB"],
        projectLink: "https://github.com/dabby04/TheLearningLayers",
        image: "/assets/icons/LearningLayers.png",
        metric: "95% MVP Delivered"
      },
      {
        id: 8,
        title: "Shelter Finder App",
        description: "An app that provides an interface to create and post listings of homes for people in need during wildfires.",
        longDescription: `\u25aa\tPioneered a Java/Android Studio mobile application listing emergency shelters across wildfire-prone regions, reducing average shelter-finding time by 1.2 minutes per user in simulated disaster drills.

        \u25aa\tIntegrated Google Maps API for real-time geolocation and optimized routing, boosting navigation accuracy by 95% and accelerating user response in critical relief scenarios.`,
        technologies: ["Android Studio", "Firebase", "Google Maps API"],
        projectLink: "https://github.com/atharvaj0gtap/ShelterFinderApp",
        image: "/assets/icons/ShelterFinder.png",
        metric: "1.2 min Faster"
      },
      {
        id: 9,
        title: "eCommerce Website",
        description: "This web development project involves constructing an online store similar to Amazon that sells products.",
        longDescription: `\u25aa\tDeveloped a Java-based backend with UML-modeled database schema and embedded SQL queries, streamlining order processing and reducing inventory discrepancies by 25%.

        \u25aa\tConstructed a Java/HTML/CSS frontend following UX best practices, introducing real-time order status and one-click checkout.`,
        technologies: ["JSP", "JDBC", "SQL", "HTML", "CSS"],
        projectLink: "https://github.com/atharvaj0gtap/Web-development",
        image: "/assets/icons/SwiftShopper.png",
        metric: "25% Fewer Errors"
      },
      {
        id: 10,
        title: "World Happiness Index Analysis",
        description: "A project to examine trends in happiness over a timeframe and evaluate the economic impacts on the happiness scale.",
        longDescription: `\u25aa\tLed a 3-people research project conducting data analysis on decades of data from 150+ countries from the World Happiness Index, employing Python collections including Pandas, NumPy, Matplotlib, and Seaborn.

        \u25aa\tConducted multivariate regression and cluster analyses to identify the top 5 determinants of global happiness, GDP per capita, social support, life expectancy, freedom, and generosity explaining 65% of score variance.

        \u25aa\tDesigned an interactive Tableau dashboard featuring a world map, time-series plots, and drill-down filters, boosting stakeholder engagement.`,
        technologies: ["Tableau", "Pandas", "Seaborn", "Matplotlib"],
        projectLink: "https://github.com/ubco-W2022T1-cosc301/project-group41",
        image: "/assets/icons/WorldHappiness.png",
        metric: "150+ Countries"
      }
    ];

    const getProjectsPerPage = () => isMobile ? 1 : 3;

    const getMaxScrollIndex = () => {
      const projectsPerPage = getProjectsPerPage();
      return Math.max(0, projects.length - projectsPerPage);
    };

    const goToNextPage = () => {
      const maxIndex = getMaxScrollIndex();
      const nextIndex = currentPage >= maxIndex ? 0 : currentPage + 1;
      setCurrentPage(nextIndex);
      scrollToProject(nextIndex);
    };

    const goToPrevPage = () => {
      const maxIndex = getMaxScrollIndex();
      const prevIndex = currentPage <= 0 ? maxIndex : currentPage - 1;
      setCurrentPage(prevIndex);
      scrollToProject(prevIndex);
    };

    const scrollToProject = (projectIndex) => {
      if (carouselRef.current) {
        setIsScrolling(true);
        const carouselWidth = carouselRef.current.clientWidth;
        const cardWidth = isMobile ? carouselWidth : carouselWidth / 3;
        const scrollPosition = projectIndex * cardWidth;

        carouselRef.current.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });

        setTimeout(() => {
          setIsScrolling(false);
        }, 500);
      }
    };

    const handleScroll = () => {
      if (isScrolling || !carouselRef.current) return;

      requestAnimationFrame(() => {
        const carouselWidth = carouselRef.current.clientWidth;
        const cardWidth = isMobile ? carouselWidth : carouselWidth / 3;
        const scrollPosition = carouselRef.current.scrollLeft;
        const maxIndex = getMaxScrollIndex();

        let newIndex = Math.round(scrollPosition / cardWidth);
        if (newIndex < 0) newIndex = 0;
        if (newIndex > maxIndex) newIndex = maxIndex;

        if (newIndex !== currentPage) {
          setCurrentPage(newIndex);
        }
      });
    };

    return (
      <section id="projects" className="min-h-screen p-6 md:p-8 content-center">
        <div className='mt-20 md:mt-0'>
          <RevealWrapper delay={0.1} duration={0.6}>
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-gold text-center mb-3">Selected Work</p>
            <h2 className="font-display text-3xl md:text-4xl mb-3 text-accent-light text-center">Projects</h2>
            <p className="text-text-muted text-center mb-12 text-sm">
              {projects.length} projects spanning full-stack, ML, data analytics &amp; mobile
            </p>
          </RevealWrapper>

          <div className="relative max-w-6xl mx-auto">
            <RevealWrapper delay={0.3} duration={0.6}>
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
                <StaggeredReveal
                  baseDelay={0.3}
                  staggerDelay={0.15}
                  duration={0.6}
                  className="flex w-full"
                >
                  {projects.map(project => (
                    <div
                      key={project.id}
                      className="carousel-card flex-shrink-0 w-full md:w-1/3 px-3 snap-center"
                    >
                      <ProjectCard
                        title={project.title}
                        description={project.description}
                        longDescription={project.longDescription}
                        technologies={project.technologies}
                        projectLink={project.projectLink}
                        image={project.image}
                        metric={project.metric}
                        previewText={`${project.title} Preview`}
                      />
                    </div>
                  ))}
                </StaggeredReveal>
              </div>

              <button
                onClick={goToPrevPage}
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 md:-ml-5 p-2.5 rounded-full bg-surface-overlay/80 border border-border-subtle backdrop-blur-sm transition-all z-10 hover:bg-accent-main/20 hover:border-accent-main/30"
                aria-label="Previous projects"
              >
                <IoChevronBackOutline className="text-accent-main text-lg" />
              </button>

              <button
                onClick={goToNextPage}
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-3 md:-mr-5 p-2.5 rounded-full bg-surface-overlay/80 border border-border-subtle backdrop-blur-sm transition-all z-10 hover:bg-accent-main/20 hover:border-accent-main/30"
                aria-label="Next projects"
              >
                <IoChevronForwardOutline className="text-accent-main text-lg" />
              </button>
            </RevealWrapper>
          </div>
        </div>
      </section>
    );
};

export default Project;
