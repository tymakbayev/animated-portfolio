import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styled from 'styled-components';
import Navigation from './Navigation';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../../contexts/ThemeContext';
import { useAnimation as useAnimationContext } from '../../contexts/AnimationContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme, isAtTop }) => 
    isAtTop ? 'transparent' : theme.headerBackground};
  box-shadow: ${({ isAtTop }) => 
    isAtTop ? 'none' : '0 4px 20px rgba(0, 0, 0, 0.1)'};
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  transform: translateY(${({ scrollDirection }) => 
    scrollDirection === 'down' ? '-100%' : '0'});
  transition: transform 0.3s ease;
`;

const Logo = styled(motion.div)`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme, isAtTop }) => 
    isAtTop ? theme.textLight : theme.text};
  cursor: pointer;
  
  span {
    background: linear-gradient(to right, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const MobileMenuButton = styled(motion.button)`
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
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const useHeaderScroll = () => {
  const [scrollDirection, setScrollDirection] = useState('none');
  const [isAtTop, setIsAtTop] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 50) {
        setIsAtTop(true);
        setScrollDirection('none');
      } else {
        setIsAtTop(false);
        
        if (currentScrollY > prevScrollY) {
          setScrollDirection('down');
        } else {
          setScrollDirection('up');
        }
      }
      
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY]);

  return { scrollDirection, isAtTop };
};

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { animationEnabled } = useAnimationContext();
  const { scrollDirection, isAtTop } = useHeaderScroll();
  const controls = useAnimation();
  const [ref, inView] = useIntersectionObserver({ threshold: 0.1 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: 'easeOut' }
      });
    }
  }, [controls, inView]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const handleNavigation = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
      
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  const mobileMenuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const menuItemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <HeaderContainer
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={headerVariants}
      isAtTop={isAtTop}
      scrollDirection={scrollDirection}
      theme={theme}
    >
      <Logo 
        isAtTop={isAtTop} 
        theme={theme}
        onClick={scrollToTop}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span>Portfolio</span>
      </Logo>
      
      {isMobile ? (
        <>
          <MobileMenuButton
            isAtTop={isAtTop}
            theme={theme}
            onClick={toggleMobileMenu}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </MobileMenuButton>
          
          <MobileMenu
            theme={theme}
            initial="closed"
            animate={isMobileMenuOpen ? 'open' : 'closed'}
            variants={mobileMenuVariants}
          >
            <motion.div variants={menuItemVariants}>
              <Navigation 
                onNavigate={handleNavigation}
                isMobile={true}
              />
            </motion.div>
            <motion.div variants={menuItemVariants}>
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </motion.div>
          </MobileMenu>
        </>
      ) : (
        <NavContainer>
          <Navigation onNavigate={handleNavigation} />
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </NavContainer>
      )}
    </HeaderContainer>
  );
};

export default Header;