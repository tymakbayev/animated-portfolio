import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const NavLinksContainer = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    align-items: center;
  }
`;

const NavItem = styled.li`
  position: relative;
`;

const NavLinkStyled = styled(motion.div)`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme, active }) => active ? theme.primary : theme.text};
  cursor: pointer;
  position: relative;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${({ active }) => active ? '100%' : '0'};
    height: 2px;
    background: ${({ theme }) => theme.primary};
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const NavLinks = ({ isMobile, closeMenu }) => {
  const [activeSection, setActiveSection] = useState('home');
  
  const links = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map(link => link.id);
      
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [links]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  const handleLinkClick = () => {
    if (isMobile && closeMenu) {
      closeMenu();
    }
  };
  
  return (
    <NavLinksContainer
      as={motion.ul}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {links.map(({ id, label }) => (
        <NavItem key={id} as={motion.li} variants={itemVariants}>
          <Link
            to={id}
            spy={true}
            smooth={true}
            offset={-70}
            duration={800}
            onClick={handleLinkClick}
          >
            <NavLinkStyled
              active={activeSection === id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {label}
            </NavLinkStyled>
          </Link>
        </NavItem>
      ))}
    </NavLinksContainer>
  );
};

NavLinks.propTypes = {
  isMobile: PropTypes.bool,
  closeMenu: PropTypes.func
};

NavLinks.defaultProps = {
  isMobile: false
};

export default NavLinks;