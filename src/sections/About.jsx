import React from "react";
import RevealWrapper from "../components/RevealWrapper";
import StaggeredReveal from "../components/StaggeredReveal";
import SpotlightCard from "../components/SpotlightCard";

const About = () => {
    const skillCategories = [
        {
            name: "Languages",
            skills: [
                { icon: "/assets/icons/python.png", label: "Python" },
                { icon: "/assets/icons/java.png", label: "Java" },
                { icon: "/assets/icons/csharp.png", label: "C#" },
                { icon: "/assets/icons/r.png", label: "R" },
                { icon: "/assets/icons/html.png", label: "HTML/CSS" },
            ]
        },
        {
            name: "Frameworks & Tools",
            skills: [
                { icon: "/assets/icons/react.png", label: "React" },
                { icon: "/assets/icons/nodejs.png", label: "Node.js" },
                { icon: "/assets/icons/tailwindcss.png", label: "Tailwind" },
                { icon: "/assets/icons/vitejs.png", label: "Vite" },
                { icon: "/assets/icons/playwright.png", label: "Playwright" },
                { icon: "/assets/icons/jest.png", label: "Jest" },
                { icon: "/assets/icons/unity.png", label: "Unity" },
                { icon: "/assets/icons/androidstudio.png", label: "Android Studio" },
            ]
        },
        {
            name: "Data & ML",
            skills: [
                { icon: "/assets/icons/pytorch.png", label: "PyTorch" },
                { icon: "/assets/icons/tensorflow.png", label: "TensorFlow" },
                { icon: "/assets/icons/pandas.png", label: "Pandas" },
                { icon: "/assets/icons/tableau.png", label: "Tableau" },
            ]
        },
        {
            name: "Cloud & Infrastructure",
            skills: [
                { icon: "/assets/icons/azure.png", label: "Azure" },
                { icon: "/assets/icons/docker.png", label: "Docker" },
                { icon: "/assets/icons/cloudflare.png", label: "Cloudflare" },
                { icon: "/assets/icons/firebase.png", label: "Firebase" },
                { icon: "/assets/icons/mysql.png", label: "MySQL" },
                { icon: "/assets/icons/mongodb.png", label: "MongoDB" },
            ]
        }
    ];

    const softSkills = [
        "Problem Solving", "Team Leadership", "Agile", "Communication",
        "Financial Analysis", "Story Telling", "Adaptability", "Empathy"
    ];

    return (
        <section id="about" className="min-h-screen flex items-center justify-center w-full p-4 sm:p-6 md:p-8">
            <RevealWrapper delay={0.1} duration={0.6} className="w-full">
                <SpotlightCard className="card max-w-full w-full sm:max-w-4xl mx-auto py-6 sm:py-8 px-4 sm:px-6 md:px-8" spotlightColor="rgba(80, 158, 236, 0.12)">
                    <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8 text-accent-light">About Me</h2>

                    <StaggeredReveal baseDelay={0.2} staggerDelay={0.12} duration={0.5}>
                        {/* Bio */}
                        <div className="mb-8">
                            <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-3">
                                I'm a software engineer and data analyst who co-founded a food-tech startup, interned in Dubai, and studied at UBC. I get excited about building things that solve real problems — especially when they involve crunching data or architecting systems from scratch.
                            </p>
                            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                                My blend of technical depth and business instinct means I don't just write code — I understand why it matters. Whether it's reducing review time by 80% with an AI pipeline or leading a sprint team to deliver on schedule, I thrive where engineering meets impact.
                            </p>
                        </div>

                        {/* Currently line */}
                        <p className="font-mono text-xs sm:text-sm text-gold/80 mb-8 pl-3 border-l-2 border-gold/30">
                            Currently — open to full-time SWE roles &amp; freelance projects
                        </p>

                        {/* Technical Skills Grid */}
                        <div className="mb-8">
                            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted mb-4">Technical Skills</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {skillCategories.map((category, catIdx) => (
                                    <div key={catIdx} className="bg-surface-base/60 rounded-lg p-3 sm:p-4">
                                        <h4 className="font-mono text-[0.65rem] uppercase tracking-wider text-accent-light/60 mb-2.5">{category.name}</h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {category.skills.map((skill, skillIdx) => (
                                                <div key={skillIdx} className="flex items-center gap-1.5 px-2 py-1 bg-surface-overlay/60 rounded">
                                                    <img src={skill.icon} alt={skill.label} className="h-4 w-4 sm:h-5 sm:w-5" width="20" height="20" loading="lazy" />
                                                    <span className="text-[0.7rem] sm:text-xs text-text-secondary">{skill.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Soft Skills */}
                        <div>
                            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted mb-3">Beyond Code</h3>
                            <div className="flex flex-wrap gap-2">
                                {softSkills.map((skill, idx) => (
                                    <span key={idx} className="px-3 py-1.5 border border-border-subtle text-text-secondary text-xs rounded-full hover:border-gold/30 hover:text-gold/90 transition-colors duration-300 cursor-default">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </StaggeredReveal>
                </SpotlightCard>
            </RevealWrapper>
        </section>
    );
};

export default About;
