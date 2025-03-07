import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-scroll';
import { useTheme } from '../../contexts/ThemeContext';

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 2.5rem;
  margin: 0;
  padding: 0;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled(motion.li)`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme, isAtTop }) => isAtTop ? theme.textLight : theme.text};
  cursor: pointer;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(to right, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
    transition: width 0.3s ease;
  }
  
  &:hover::after, &.active::after {
    width: 100%;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const MobileNavLinks = styled(motion.ul)`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0;
  margin: 0;
  text-align: center;
`;

const MobileNavItem = styled(motion.li)`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
  
  &.active {
    color: ${({ theme }) => theme.primary};
  }
`;

const navItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 }
};

const mobileNavItemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 }
};

const Navigation = ({ isAtTop, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const [activeSection, setActiveSection] = useState('home');
  const controls = useAnimation();
  const { theme } = useTheme();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      for (const section of [...navItems].reverse()) {
        const element = document.getElementById(section.id);
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  useEffect(() => {
    controls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    });
  }, [controls]);

  const handleNavClick = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <NavContainer>
      <NavLinks>
        {navItems.map((item, index) => (
          <NavItem
            key={item.id}
            initial="hidden"
            animate="visible"
            variants={navItemVariants}
            transition={{ delay: index * 0.1 }}
            className={activeSection === item.id ? 'active' : ''}
            theme={theme}
            isAtTop={isAtTop}
          >
            <StyledLink
              to={item.id}
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              onClick={handleNavClick}
            >
              {item.label}
            </StyledLink>
          </NavItem>
        ))}
      </NavLinks>

      {isMobileMenuOpen && (
        <MobileNavLinks
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {navItems.map((item, index) => (
            <MobileNavItem
              key={item.id}
              variants={mobileNavItemVariants}
              transition={{ duration: 0.5 }}
              className={activeSection === item.id ? 'active' : ''}
              theme={theme}
            >
              <StyledLink
                to={item.id}
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                onClick={handleNavClick}
              >
                {item.label}
              </StyledLink>
            </MobileNavItem>
          ))}
        </MobileNavLinks>
      )}
    </NavContainer>
  );
};

export default Navigation;