import React, { useState, useEffect } from 'react';
import RocketButton from '../components/RocketButton';

const Home = () => {
    const [roleIndex, setRoleIndex] = useState(0);
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    
    const roles = ["Software Engineer", "Data Analyst", "Entrepreneur", "Freelancer"];
    
    useEffect(() => {
        // Animation for initial load
        setIsLoaded(true);
        
        const typeSpeed = isDeleting ? 50 : 150;
        const currentRole = roles[roleIndex];
        
        // Handle typing and deleting animation
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                setText(currentRole.substring(0, text.length + 1));
                
                // If we've typed the full text, start deleting after a pause
                if (text === currentRole) {
                    // Pause at the end of typing
                    setTimeout(() => setIsDeleting(true), 1500);
                    return;
                }
            } else {
                setText(currentRole.substring(0, text.length - 1));
                
                // If we've deleted all text, move to next role
                if (text === '') {
                    setIsDeleting(false);
                    setRoleIndex((roleIndex + 1) % roles.length);
                    return;
                }
            }
        }, typeSpeed);
        
        return () => clearTimeout(timeout);
    }, [text, isDeleting, roleIndex, roles]);

    return (
        <section id="home" className="relative flex flex-col justify-center items-center w-full min-h-screen">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-surface-base">
                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-accent-main/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className={`max-w-4xl mx-auto text-center mb-8 px-4 z-10 transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    Hi, I am <span className="text-accent-main">Atharva Jagtap</span>
                </h1>
                
                <div className="text-xl md:text-2xl mt-8 mb-12">
                    <span className="text-text-secondary">I am a: </span>
                    <span className="text-accent-light font-medium relative">
                        {text}
                        <span className="absolute right-[-4px] top-0 h-full w-[2px] bg-accent-light animate-blink"></span>
                    </span>
                </div>
                
                <div className={`transition-all duration-900 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
                    <RocketButton href="#projects" text="Discover More" />
                </div>
            </div>
        </section>
    );
};

export default Home;