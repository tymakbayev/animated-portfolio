import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-scroll';
import PropTypes from 'prop-types';
import AnimatedSection, { ANIMATIONS } from './Animation/AnimatedSection';

const Container = styled(motion.nav)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  height: 100%;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const NavLinks = styled(motion.ul)`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media (max-width: 992px) {
    position: fixed;
    top: 0;
    right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    flex-direction: column;
    background-color: ${({ theme }) => theme.backgroundSecondary};
    height: 100vh;
    width: 250px;
    padding: 6rem 2rem 2rem;
    transition: right 0.3s ease;
    box-shadow: ${({ isOpen }) => (isOpen ? '-5px 0 15px rgba(0, 0, 0, 0.1)' : 'none')};
    z-index: 10;
  }
`;

const NavItem = styled(motion.li)`
  margin: 0 1.2rem;
  
  @media (max-width: 992px) {
    margin: 1.5rem 0;
    width: 100%;
    text-align: center;
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  padding: 0.5rem 0;
  position: relative;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(to right, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
    transition: width 0.3s ease;
  }
  
  &:hover, &.active {
    color: ${({ theme }) => theme.primary};
    
    &::after {
      width: 100%;
    }
  }
  
  @media (max-width: 992px) {
    display: block;
    padding: 0.5rem;
    
    &::after {
      bottom: -5px;
    }
  }
`;

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5;
  display: none;
  
  @media (max-width: 992px) {
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  }
`;

const NavContainer = ({ isOpen, toggleMenu, navItems = [], activeSection }) => {
  const controls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 992);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        when: 'beforeChildren',
      },
    });
  }, [controls]);

  const handleLinkClick = () => {
    if (isMobile && isOpen) {
      toggleMenu();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      <Container
        initial={{ opacity: 0, y: -20 }}
        animate={controls}
      >
        <NavLinks
          isOpen={isOpen}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {navItems.map((item) => (
            <NavItem key={item.id} variants={itemVariants}>
              <NavLink
                to={item.id}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className={activeSection === item.id ? 'active' : ''}
                onClick={handleLinkClick}
              >
                {item.label}
              </NavLink>
            </NavItem>
          ))}
        </NavLinks>
      </Container>
      
      <AnimatedSection
        as={Backdrop}
        animation={ANIMATIONS.FADE_IN}
        isOpen={isOpen}
        onClick={toggleMenu}
        variants={backdropVariants}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        duration={0.3}
      />
    </>
  );
};

NavContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  activeSection: PropTypes.string,
};

export default NavContainer;