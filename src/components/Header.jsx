import React, {useState, useEffect} from 'react';
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai';

const Header = () => {
    const [isOpen, setisOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [activeSection, setActiveSection] = useState('home');

    // Track active section with IntersectionObserver
    useEffect(() => {
        const sectionIds = ['home', 'projects', 'about', 'testimonials', 'contact'];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-40% 0px -55% 0px' }
        );

        sectionIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (isOpen) setisOpen(false);

            if (window.scrollY > lastScrollY && window.scrollY > 80) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY, isOpen]);

    const handleLinkClick = () => {
        setisOpen(false);
    };

    const navLinks = [
        { id: 'home', label: 'Home' },
        { id: 'projects', label: 'Projects' },
        { id: 'about', label: 'About' },
        { id: 'testimonials', label: 'Testimonials' },
        { id: 'contact', label: 'Contact' },
    ];

    return (
        <nav className={`w-full z-20 sticky top-0 transition-transform duration-300 backdrop-blur-md bg-surface-base/80 border-b border-border-subtle ${
            isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}>
            <div className='flex justify-between mx-auto h-16 items-center px-6 md:px-8'>
                {/* Logo */}
                <a href="#home" className='text-xl font-display tracking-tight text-text-primary hover:text-accent-light transition-colors'>
                    JagtapWorks
                </a>

                {/* Hamburger */}
                <div className='md:hidden text-2xl text-text-secondary'>
                    <button onClick={() => setisOpen(!isOpen)} aria-label="Toggle menu">
                        {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
                    </button>
                </div>

                {/* Desktop nav */}
                <ul className='hidden md:flex gap-6 items-center'>
                    {navLinks.map(link => (
                        <li key={link.id}>
                            <a
                                href={`#${link.id}`}
                                className={`relative py-1.5 text-sm transition-colors duration-200 ${
                                    activeSection === link.id
                                        ? 'text-text-primary'
                                        : 'text-text-muted hover:text-text-secondary'
                                }`}
                            >
                                {link.label}
                                {activeSection === link.id && (
                                    <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-gold" />
                                )}
                            </a>
                        </li>
                    ))}
                    <li className="ml-2">
                        <a
                            href="/assets/certifications/AtharvaJagtap_Resume.pdf"
                            download
                            className="px-4 py-1.5 border border-gold/30 text-gold text-sm rounded-md hover:bg-gold/10 transition-all duration-200"
                        >
                            Resume
                        </a>
                    </li>
                </ul>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="animate-dropdown origin-top fixed inset-x-0 top-16 bg-surface-overlay/95 backdrop-blur-md border-b border-border-subtle">
                    <ul className='flex-col md:hidden text-center py-3'>
                        {navLinks.map(link => (
                            <li key={link.id} className='py-2.5'>
                                <a
                                    href={`#${link.id}`}
                                    onClick={handleLinkClick}
                                    className={`text-sm transition-colors ${
                                        activeSection === link.id
                                            ? 'text-text-primary'
                                            : 'text-text-muted hover:text-text-secondary'
                                    }`}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                        <li className='py-2.5'>
                            <a
                                href="/assets/certifications/AtharvaJagtap_Resume.pdf"
                                download
                                onClick={handleLinkClick}
                                className="inline-block px-4 py-1.5 border border-gold/30 text-gold text-sm rounded-md hover:bg-gold/10 transition-all"
                            >
                                Resume
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Header;
