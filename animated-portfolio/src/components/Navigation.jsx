import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-scroll';

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
  color: ${({ theme }) => theme.text};
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
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileNavItems = styled(motion.ul)`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${({ theme }) => theme.background};
    padding: 2rem;
    gap: 1.5rem;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    transform-origin: top;
    list-style: none;
  }
`;

const NavItem = styled(motion.li)`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
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

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const controls = useAnimation();
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Determine active section based on scroll position
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (sectionId) => {
    setIsOpen(false);
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, scaleY: 0 },
    visible: { 
      opacity: 1, 
      scaleY: 1,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      scaleY: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const navItems = ['home', 'about', 'projects', 'skills', 'contact'];

  return (
    <NavWrapper scrolled={scrolled} theme={theme}>
      <NavContainer>
        <Logo
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          theme={theme}
        >
          <Link to="home" smooth={true} duration={800} offset={-100}>
            Port<span>folio</span>
          </Link>
        </Logo>

        <NavItems>
          {navItems.map((item, index) => (
            <NavItem
              key={item}
              initial="hidden"
              animate="visible"
              variants={navVariants}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={activeSection === item ? 'active' : ''}
              theme={theme}
            >
              <Link 
                to={item} 
                smooth={true} 
                duration={800} 
                offset={-100}
                spy={true}
                activeClass="active"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            </NavItem>
          ))}
        </NavItems>

        <MobileMenuButton onClick={toggleMenu} theme={theme}>
          {isOpen ? '✕' : '☰'}
        </MobileMenuButton>

        <AnimatePresence>
          {isOpen && (
            <MobileNavItems
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
              theme={theme}
            >
              {navItems.map((item, index) => (
                <NavItem
                  key={item}
                  variants={navVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={activeSection === item ? 'active' : ''}
                  theme={theme}
                >
                  <Link 
                    to={item} 
                    smooth={true} 
                    duration={800} 
                    offset={-100}
                    spy={true}
                    activeClass="active"
                    onClick={() => handleNavClick(item)}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Link>
                </NavItem>
              ))}
            </MobileNavItems>
          )}
        </AnimatePresence>
      </NavContainer>
    </NavWrapper>
  );
};

export default Navigation;