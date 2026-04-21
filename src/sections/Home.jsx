import React, { useState, useEffect } from 'react';

const Home = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section id="home" className="relative flex flex-col justify-center items-center w-full min-h-screen px-6">
            {/* Layered background glow */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-accent-main/[0.07] rounded-full blur-[120px]" />
                <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-gold/[0.04] rounded-full blur-[100px]" />
            </div>

            <div className="max-w-3xl mx-auto text-center z-10">
                {/* Eyebrow */}
                <p className={`font-mono text-[0.7rem] tracking-[0.35em] uppercase text-gold mb-8 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-3'}`}>
                    Software Engineer &amp; Data Analyst
                </p>

                {/* Name */}
                <h1 className={`font-display text-5xl md:text-7xl lg:text-[5.5rem] font-normal mb-6 text-text-primary tracking-tight leading-[1.1] transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-6'}`}>
                    Atharva Jagtap
                </h1>

                {/* Keywords */}
                <div className={`flex items-center justify-center gap-3 md:gap-5 mb-8 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
                    <span className="text-accent-light text-lg md:text-xl">Engineer</span>
                    <span className="text-gold/40 text-sm">&bull;</span>
                    <span className="text-accent-light text-lg md:text-xl">Analyst</span>
                    <span className="text-gold/40 text-sm">&bull;</span>
                    <span className="text-accent-light text-lg md:text-xl">Builder</span>
                </div>

                {/* Positioning */}
                <p className={`text-text-secondary text-base md:text-lg max-w-xl mx-auto mb-4 leading-relaxed transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
                    I turn complex problems into products people use.
                </p>

                {/* Proof */}
                <p className={`font-mono text-text-muted text-xs md:text-sm mb-14 transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                    UBC Graduate &middot; Startup Co-Founder &middot; 10+ Shipped Projects
                </p>

                {/* CTAs */}
                <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-[900ms] ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
                    <a
                        href="#projects"
                        className="group px-8 py-3.5 bg-gold hover:bg-gold-dark text-surface-base font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/25 text-sm tracking-wide"
                    >
                        See My Work
                        <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-4 w-4 ml-2 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </a>
                    <a
                        href="/assets/certifications/AtharvaJagtap_Resume.pdf"
                        download
                        className="px-8 py-3.5 border border-border-strong text-text-secondary hover:text-text-primary hover:border-accent-main/40 rounded-lg transition-all duration-300 text-sm tracking-wide"
                    >
                        Download Resume
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Home;
