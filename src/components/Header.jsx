import React, {useState, useEffect} from 'react';
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai';

const Header = () => {
    const [isOpen, setisOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > lastScrollY) {
            setIsVisible(false); // Hide on scroll down
          } else {
            setIsVisible(true); // Show on scroll up
          }
          setLastScrollY(window.scrollY);
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, [lastScrollY]);

    return (
        <nav className={`w-full z-20 sticky top-0 transition-transform duration-300 ${
            isVisible ? 'translate-y-0' : '-translate-y-full'
          }`}>
            <div className='flex justify-between mx-auto h-20 items-center px-8'>
                {/* Logo */}
                <h1 className='text-3xl font-bold'>Portfolio</h1>
                {/* Hamburger menu */}
                <div className='md:hidden text-3xl'>
                    <button onClick={() => setisOpen(!isOpen)}>
                        {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
                    </button>
                </div>
                {/* Desktop menu */}
                <ul className='hidden md:flex gap-8'>
                    <li><a href="#home" className="" >Home</a></li>
                    <li><a href="#about" className="" >About</a></li>
                    <li><a href="#services" className="" >Services</a></li>
                    <li><a href="#contact" className="" >Contact</a></li>
                </ul>
            </div>
            {/* Mobile menu */}
            {isOpen ? (
                <div
                className={`${
                  isOpen ? 'animate-dropdown' : 'hidden'
                } origin-top transform fixed inset-x-0 top-20`}>
                    <ul className='flex-col md:hidden text-center'>
                        <li className='py-2'><a href="#home" className="" >Home</a></li>
                        <li className='py-2'><a href="#about" className="" >About</a></li>
                        <li className='py-2'><a href="#services" className="" >Services</a></li>
                        <li className='py-2'><a href="#contact" className="" >Contact</a></li>
                    </ul>
                </div>
                ) : null}
        </nav>
    );
};

export default Header;