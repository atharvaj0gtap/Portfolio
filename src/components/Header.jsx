import React, {useState, useEffect} from 'react';
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai';

const Header = () => {
    const [isOpen, setisOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
          // Close mobile menu when scrolling
          if (isOpen) {
            setisOpen(false);
          }
          
          // Handle header visibility
          if (window.scrollY > lastScrollY) {
            setIsVisible(false); // Hide on scroll down
          } else {
            setIsVisible(true); // Show on scroll up
          }
          setLastScrollY(window.scrollY);
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY, isOpen]); // Added isOpen to dependency array
    
    // Add this function to close the menu when a link is clicked
    const handleLinkClick = () => {
        setisOpen(false);
    };

    return (
        <nav className={`w-full z-20 sticky top-0 transition-transform duration-300 backdrop-blur-sm bg-surface-base/90 border-b border-border-subtle ${
            isVisible ? 'translate-y-0' : '-translate-y-full'
          }`}>
            <div className='flex justify-between mx-auto h-20 items-center px-8'>
                {/* Logo */}
                <h1 className='text-[1.875rem] font-bold bg-gradient-to-r from-accent-light to-accent-main bg-clip-text text-transparent'>JagtapWorks</h1>
                
                {/* Hamburger menu */}
                <div className='md:hidden text-3xl text-accent-main'>
                    <button onClick={() => setisOpen(!isOpen)}>
                        {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
                    </button>
                </div>
                
                {/* Desktop menu */}
                <ul className='hidden md:flex gap-8 text-text-secondary'>
                    <li><a href="#home" className="hover:text-accent-main transition-colors">Home</a></li>
                    <li><a href="#about" className="hover:text-accent-main transition-colors">About</a></li>
                    <li><a href="#projects" className="hover:text-accent-main transition-colors">Projects</a></li>
                    <li><a href="#testimonials" className="hover:text-accent-main transition-colors">Testimonials</a></li>
                    <li><a href="#contact" className="hover:text-accent-main transition-colors">Contact</a></li>
                </ul>
            </div>
            
            {/* Mobile menu */}
            {isOpen && (
                <div className="animate-dropdown origin-top transform fixed inset-x-0 top-20 bg-surface-overlay border-b border-border-subtle">
                    <ul className='flex-col md:hidden text-center py-4'>
                        <li className='py-3'><a href="#home" onClick={handleLinkClick} className="text-text-secondary hover:text-accent-main transition-colors">Home</a></li>
                        <li className='py-3'><a href="#about" onClick={handleLinkClick} className="text-text-secondary hover:text-accent-main transition-colors">About</a></li>
                        <li className='py-3'><a href="#projects" onClick={handleLinkClick} className="text-text-secondary hover:text-accent-main transition-colors">Projects</a></li>
                        <li className='py-3'><a href="#testimonials" onClick={handleLinkClick} className="text-text-secondary hover:text-accent-main transition-colors">Testimonials</a></li>
                        <li className='py-3'><a href="#contact" onClick={handleLinkClick} className="text-text-secondary hover:text-accent-main transition-colors">Contact</a></li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Header;