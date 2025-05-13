import React from "react";
import RevealWrapper from "../components/RevealWrapper";
import StaggeredReveal from "../components/StaggeredReveal";
import SpotlightCard from "../components/SpotlightCard";

// Modified SkillScroller for technical skills with mobile optimization
const TechSkillScroller = ({ items }) => {
  return (
    <div className="relative overflow-hidden py-2 w-full">
      <div className="flex overflow-x-auto no-scrollbar w-full">
        <div className="flex animate-scroll-slow">
          {items.map((item, index) => (
            <div 
              key={index}
              className="flex-none mx-1 sm:mx-2 md:mx-4 flex items-center justify-center"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-xl text-accent-main text-3xl">
                {item.icon}
              </div>
            </div>
          ))}
          {/* Duplicate items for continuous scroll effect */}
          {items.map((item, index) => (
            <div 
              key={`dup-${index}`} 
              className="flex-none mx-1 sm:mx-2 md:mx-4 flex items-center justify-center"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-xl text-accent-main text-3xl">
                {item.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Modified SkillScroller for professional skills with mobile optimization
const ProfSkillScroller = ({ items }) => {
  return (
    <div className="relative overflow-hidden py-2 w-full">
      <div className="flex overflow-x-auto no-scrollbar w-full">
        <div className="flex animate-scroll-slow-reverse">
          {items.map((item, index) => (
            <div 
              key={index}
              className="flex-none flex items-center justify-center"
            >
              <div className="px-3 sm:px-4 md:px-6 py-2 md:py-3 rounded-xl text-text-secondary text-xs sm:text-sm md:text-base whitespace-nowrap">
                {item.label}
              </div>
            </div>
          ))}
          {/* Duplicate items for continuous scroll effect */}
          {items.map((item, index) => (
            <div 
              key={`dup-${index}`} 
              className="flex-none flex items-center justify-center"
            >
              <div className="px-3 sm:px-4 md:px-6 py-2 md:py-3 rounded-xl text-text-secondary text-xs sm:text-sm md:text-base whitespace-nowrap">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const About = () => {
    // Technical skills with icons only
    const technicalSkills = [
        { icon: <img src="/assets/icons/python.png" alt="Python" className="h-10 w-10" /> },
        { icon: <img src="/assets/icons/java.png" alt="Java" className="h-10 w-10" /> },
        { icon: <img src="/assets/icons/csharp.png" alt="Csharp" className="h-10 w-10" /> },
        { icon: <img src="/assets/icons/react.png" alt="React" className="h-10 w-10" /> },
        { icon: <img src="/assets/icons/nodejs.png" alt="Nodejs" className="h-10 w-10" /> },
        { icon: <img src="/assets/icons/tailwindcss.png" alt="TailwindCSS" className="h-10 w-10" /> },
        { icon: <img src="/assets/icons/playwright.png" alt="Playwright" className="h-10 w-10" /> },
        { icon: <img src="/assets/icons/jest.png" alt="Jest" className="h-10 w-10" /> },
        { icon: <img src="/assets/icons/vitejs.png" alt="Vitejs" className="h-10 w-10" /> },
        { icon: <img src="/assets/icons/html.png" alt="HTML" className="h-10 w-10" /> },
        { icon: <img src="/assets/icons/css.png" alt="CSS" className="h-10 w-10" /> },
        { icon: <img src="/assets/icons/r.png" alt="R" className="h-10 w-10" /> },
        { icon: <img src="/assets/icons/unity.png" alt="Unity" className="h-10 w-10" /> },
        //{ icon: <img src="/assets/icons/flutter.png" alt="Flutter" className="h-10 w-10" /> },
        //{ icon: <img src="/assets/icons/dart.png" alt="Dart" className="h-10 w-10" /> },
        { icon: <img src="/assets/icons/androidstudio.png" alt="AndroidStudio" className="h-10 w-10" /> },
        { icon: <img src="/assets/icons/mysql.png" alt="Mysql" className="h-10 w-10" /> },
        { icon: <img src="/assets/icons/mongodb.png" alt="MongoDB" className="h-10 w-10" /> },
        { icon: <img src="/assets/icons/firebase.png" alt="Firebase" className="h-10 w-10" /> },
        { icon: <img src="/assets/icons/pytorch.png" alt="PyTorch" className="h-10 w-10" /> },
        { icon: <img src="/assets/icons/tensorflow.png" alt="TensorFlow" className="h-10 w-10" /> },
        { icon: <img src="/assets/icons/pandas.png" alt="Pandas" className="h-10 w-10" /> },
        { icon: <img src="/assets/icons/tableau.png" alt="Tableau" className="h-10 w-10" /> },
        { icon: <img src="/assets/icons/docker.png" alt="Docker" className="h-10 w-10" /> },
        { icon: <img src="/assets/icons/vscode.png" alt="VSCode" className="h-10 w-10" /> },
        { icon: <img src="/assets/icons/azure.png" alt="Azure" className="h-10 w-10" /> },
        { icon: <img src="/assets/icons/cloudflare.png" alt="Cloudflare" className="h-10 w-10" /> },
    ];

    // Professional skills with labels only
    const professionalSkills = [
        { label: "Time Management" },
        { label: "Adaptability" },
        { label: "Problem Solving" },
        { label: "Collaboration" },
        { label: "Critical Thinking" },
        { label: "Project Management" },
        { label: "Agile Methodologies" },
        { label: "Team Leadership" },
        { label: "Communication" },
        { label: "Story Telling" },
        { label: "Financial Analysis" },
    ];

    return (
        <section id="about" className="min-h-screen flex items-center justify-center w-full p-3 sm:p-5 md:p-8">
            <RevealWrapper delay={0.1} duration={0.6} className="w-full">
                <SpotlightCard className="card max-w-full w-full sm:max-w-4xl mx-auto py-4 sm:py-5 md:py-6 px-3 sm:px-4 md:px-6" spotlightColor="rgba(92, 169, 255, 0.15)">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 md:mb-6 text-accent-light">About Me</h2>
                    
                    <StaggeredReveal baseDelay={0.2} staggerDelay={0.1} duration={0.5}>
                        <p className="text-xs sm:text-sm md:text-base text-text-secondary mb-2 sm:mb-3 md:mb-4">
                            I'm a computer science enthusiast with a passion for creating intuitive, performant solutions that solve real-world problems.
                        </p>
                        
                        <p className="text-xs sm:text-sm md:text-base text-text-secondary mb-2 sm:mb-3 md:mb-4">
                            With interests spanning both technology and the finance/management sector, I bring a unique interdisciplinary perspective to projects. This diverse background allows me to bridge technical implementation with business objectives, creating solutions that are both technically sound and strategically aligned.
                        </p>
                        
                        <div className="overflow-hidden">
                            {/* Mobile scroller container limits visible elements */}
                            <div className="relative w-full overflow-hidden">
                                <TechSkillScroller items={technicalSkills} />
                            </div>
                        </div>
                    
                        <div className="overflow-hidden">
                            {/* Mobile scroller container limits visible elements */}
                            <div className="relative w-full overflow-hidden">
                                <ProfSkillScroller items={professionalSkills} />
                            </div>
                        </div>
                    </StaggeredReveal>
                </SpotlightCard>
            </RevealWrapper>
        </section>
    );
};

export default About;