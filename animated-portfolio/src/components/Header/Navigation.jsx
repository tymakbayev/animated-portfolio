import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styled from 'styled-components';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  background: ${({ scrolled }) => scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent'};
  backdrop-filter: ${({ scrolled }) => scrolled ? 'blur(10px)' : 'none'};
  box-shadow: ${({ scrolled }) => scrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none'};
  transition: all 0.3s ease-in-out;
`;

const Logo = styled(motion.div)`
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  cursor: pointer;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    padding: 2rem;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const NavLink = styled(motion.li)`
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #5c6bc0;
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    controls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    });
  }, [controls]);

  const handleNavClick = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Close mobile menu if open
      setIsOpen(false);
      
      // Smooth scroll to section
      window.scrollTo({
        top: section.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <NavContainer scrolled={scrolled}>
      <Logo
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => handleNavClick('home')}
      >
        Portfolio
      </Logo>

      <MobileMenuButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '☰'}
      </MobileMenuButton>

      <NavLinks isOpen={isOpen}>
        {['home', 'about', 'projects', 'skills', 'contact'].map((section, index) => (
          <NavLink
            key={section}
            initial="hidden"
            animate="visible"
            variants={navVariants}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleNavClick(section)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </NavLink>
        ))}
      </NavLinks>
    </NavContainer>
  );
};

export default Navigation;
