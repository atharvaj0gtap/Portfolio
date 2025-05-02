import React from "react";
import RevealWrapper from "../components/RevealWrapper";
import StaggeredReveal from "../components/StaggeredReveal";
import SpotlightCard from "../components/SpotlightCard";

const About = () => {
    return (
        <section id="about" className="min-h-screen flex items-center justify-center p-8">
            <RevealWrapper delay={0.1} duration={0.6}>
                <SpotlightCard className="card max-w-4xl mx-auto" spotlightColor="rgba(92, 169, 255, 0.15)">
                    <h2 className="text-3xl font-bold mb-6 text-accent-light">About Me</h2>
                    
                    <StaggeredReveal baseDelay={0.2} staggerDelay={0.1} duration={0.5}>
                        <p className="text-text-secondary mb-4">
                            I'm a passionate developer with expertise in modern web technologies and a focus on creating 
                            intuitive, performant user experiences.
                        </p>
                        
                        <p className="text-text-secondary mb-4">
                            With a background in software engineering and data analysis, I bring a unique perspective to
                            problem-solving and application architecture.
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                            <div className="p-4 bg-surface-highest rounded-lg">
                                <h3 className="font-medium text-accent-light">Front-End</h3>
                                <p className="text-text-secondary text-sm mt-2">React, TypeScript, Tailwind CSS</p>
                            </div>
                            
                            <div className="p-4 bg-surface-highest rounded-lg">
                                <h3 className="font-medium text-accent-light">Back-End</h3>
                                <p className="text-text-secondary text-sm mt-2">Node.js, Python, RESTful APIs</p>
                            </div>
                            
                            <div className="p-4 bg-surface-highest rounded-lg">
                                <h3 className="font-medium text-accent-light">Data</h3>
                                <p className="text-text-secondary text-sm mt-2">SQL, Data Analysis, Visualization</p>
                            </div>
                        </div>
                    </StaggeredReveal>
                </SpotlightCard>
            </RevealWrapper>
        </section>
    );
};

export default About;