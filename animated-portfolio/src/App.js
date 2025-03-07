import React, { useEffect, useState, useRef } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AnimationProvider } from './contexts/AnimationContext';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import Footer from './components/Footer/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styled from 'styled-components';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

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
  width: 80px;
  height: 80px;
  background-image: url('/src/assets/logo.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const App = () => {
  const [loading, setLoading] = useState(true);
  const appRef = useRef(null);
  const loadingScreenVariants = {
    initial: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }
  };

  useEffect(() => {
    // Initialize any global animations or effects
    const initializeAnimations = () => {
      // Set up smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80, // Adjust for header height
              behavior: 'smooth'
            });
          }
        });
      });
    };

    // Simulate loading time for initial animations
    const timer = setTimeout(() => {
      setLoading(false);
      initializeAnimations();
    }, 1500);

    // Clean up
    return () => {
      clearTimeout(timer);
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', () => {});
      });
    };
  }, []);

  useEffect(() => {
    // Set up scroll-triggered animations once loading is complete
    if (!loading && appRef.current) {
      // Animate sections on scroll
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }
  }, [loading]);

  // Handle browser resize for responsive animations
  useEffect(() => {
    const handleResize = () => {
      // Refresh ScrollTrigger on resize
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle visibility change (tab switching)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Refresh animations when tab becomes visible again
        ScrollTrigger.refresh();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <ThemeProvider>
      <AnimationProvider>
        <AnimatePresence mode="wait">
          {loading ? (
            <LoadingScreen
              key="loading"
              variants={loadingScreenVariants}
              initial="initial"
              exit="exit"
            >
              <LoadingLogo
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </LoadingScreen>
          ) : (
            <StyledApp
              ref={appRef}
              key="app"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Header />
              <MainContent />
              <Footer />
            </StyledApp>
          )}
        </AnimatePresence>
      </AnimationProvider>
    </ThemeProvider>
  );
};

export default App;