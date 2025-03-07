import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-scroll';
import { useTheme } from '../../contexts/ThemeContext';

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  background: ${({ scrolled, theme }) => 
    scrolled 
      ? theme.isDark 
        ? 'rgba(18, 18, 18, 0.9)' 
        : 'rgba(255, 255, 255, 0.9)' 
      : 'transparent'
  };
  backdrop-filter: ${({ scrolled }) => scrolled ? 'blur(10px)' : 'none'};
  box-shadow: ${({ scrolled, theme }) => 
    scrolled 
      ? theme.isDark 
        ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
        : '0 4px 20px rgba(0, 0, 0, 0.1)' 
      : 'none'
  };
  transition: all 0.3s ease-in-out;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion.div)`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme, isAtTop }) => isAtTop ? theme.textLight : theme.text};
  cursor: pointer;
  
  span {
    background: linear-gradient(to right, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const NavItems = styled.ul`
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

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme, isAtTop }) => isAtTop ? theme.textLight : theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1001;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  
  @media (max-width: 768px) {
    display: ${({ isOpen }) => isOpen ? 'flex' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.background};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
`;

const MobileNavItems = styled(motion.ul)`
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

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
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
      if (window.scrollY > 50) {
        setScrolled(true);
        setIsAtTop(false);
      } else {
        setScrolled(false);
        setIsAtTop(true);
      }
      
      // Determine active section based on scroll position
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = () => {
    setIsOpen(false);
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  const mobileNavItemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  };

  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <NavWrapper scrolled={scrolled} theme={theme}>
      <NavContainer>
        <Logo
          initial="hidden"
          animate="visible"
          variants={logoVariants}
          transition={{ duration: 0.5 }}
          theme={theme}
          isAtTop={isAtTop}
        >
          <StyledLink
            to="home"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
            onClick={handleNavClick}
          >
            Portfolio<span>.</span>
          </StyledLink>
        </Logo>

        <NavItems>
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
        </NavItems>

        <MobileMenuButton 
          onClick={toggleMenu} 
          theme={theme}
          isAtTop={isAtTop}
        >
          {isOpen ? '✕' : '☰'}
        </MobileMenuButton>

        <MobileMenu
          isOpen={isOpen}
          theme={theme}
          initial={{ opacity: 0 }}
          animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <MobileNavItems
            initial="hidden"
            animate={isOpen ? "visible" : "hidden"}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {navItems.map((item) => (
              <MobileNavItem
                key={item.id}
                variants={mobileNavItemVariants}
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
          </MobileNavItems>
        </MobileMenu>
      </NavContainer>
    </NavWrapper>
  );
};

export default Navigation;