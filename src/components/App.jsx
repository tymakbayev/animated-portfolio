import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import styled from 'styled-components';
import { ThemeProvider } from '../contexts/ThemeContext';
import { AnimationProvider } from '../contexts/AnimationContext';
import Header from '../components/Header/Header';
import MainContent from '../components/MainContent/MainContent';
import Footer from '../components/Footer/Footer';
import '../styles/global.css';

const StyledApp = styled(motion.div)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: background-color 0.3s ease, color 0.3s ease;
  overflow-x: hidden;
  position: relative;
`;

const LoadingScreen = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingLogo = styled(motion.div)`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
`;

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    
    if (hasVisitedBefore) {
      setIsFirstVisit(false);
    } else {
      localStorage.setItem('hasVisitedBefore', 'true');
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, isFirstVisit ? 2000 : 800);

    return () => clearTimeout(timer);
  }, [isFirstVisit]);

  useEffect(() => {
    if (!isLoading) {
      const tl = gsap.timeline();
      
      tl.to('.app-content', {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
      });

      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        
        gsap.to('.parallax-bg', {
          y: scrollPosition * 0.1,
          ease: 'none',
          duration: 0.1
        });
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isLoading]);

  const loadingVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.8,
        ease: [0.65, 0, 0.35, 1]
      }
    }
  };

  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.65, 0, 0.35, 1]
      }
    },
    exit: { 
      scale: 1.2, 
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.65, 0, 0.35, 1]
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <ThemeProvider>
      <AnimationProvider>
        <AnimatePresence mode="wait">
          {isLoading && (
            <LoadingScreen
              key="loading"
              variants={loadingVariants}
              initial="initial"
              exit="exit"
            >
              <LoadingLogo
                variants={logoVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                Portfolio
              </LoadingLogo>
            </LoadingScreen>
          )}
        </AnimatePresence>

        <StyledApp
          className="app"
          variants={contentVariants}
          initial="hidden"
          animate={!isLoading ? "visible" : "hidden"}
        >
          <div className="app-content" style={{ opacity: 0 }}>
            <Header />
            <MainContent />
            <Footer />
          </div>
        </StyledApp>
      </AnimationProvider>
    </ThemeProvider>
  );
};

export default App;