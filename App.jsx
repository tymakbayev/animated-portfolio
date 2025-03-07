import React, { useEffect, useState, useRef } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AnimationProvider } from './contexts/AnimationContext';
import { ParallaxProvider } from 'react-scroll-parallax';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import Footer from './components/Footer/Footer';
import styled from 'styled-components';
import './styles/global.css';
import './styles/animations.css';
import './styles/theme.css';

const StyledApp = styled(motion.div)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: background-color 0.3s ease, color 0.3s ease;
  overflow-x: hidden;
  position: relative;
  
  &.dark {
    background-color: var(--color-bg-dark);
    color: var(--color-text-dark);
  }
  
  &.light {
    background-color: var(--color-bg-light);
    color: var(--color-text-light);
  }
`;

const LoadingScreen = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingLogo = styled(motion.div)`
  width: 100px;
  height: 100px;
  background-image: url('/src/assets/logo.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const App = () => {
  const [loading, setLoading] = useState(true);
  const appRef = useRef(null);
  
  useEffect(() => {
    // Initialize page loading animation
    const timeline = gsap.timeline({
      onComplete: () => {
        setLoading(false);
      }
    });
    
    timeline.to('.loading-logo', {
      scale: 1.2,
      duration: 0.8,
      ease: 'power2.inOut'
    })
    .to('.loading-logo', {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in'
    })
    .to('.loading-screen', {
      y: '-100%',
      duration: 0.8,
      ease: 'power3.inOut'
    });
    
    // Cleanup animation on unmount
    return () => {
      timeline.kill();
    };
  }, []);
  
  useEffect(() => {
    // Initialize page animations after loading
    if (!loading && appRef.current) {
      // Animate main content entrance
      gsap.fromTo(
        '.app-content',
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power2.out',
          stagger: 0.1
        }
      );
      
      // Add scroll-triggered animations
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 1,
              once: true
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out'
          }
        );
      });
    }
  }, [loading]);
  
  // Handle browser resize for responsive animations
  useEffect(() => {
    const handleResize = () => {
      if (appRef.current) {
        // Refresh animations on resize if needed
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <ThemeProvider>
      <AnimationProvider>
        <ParallaxProvider>
          <AnimatePresence mode="wait">
            {loading && (
              <LoadingScreen
                className="loading-screen"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LoadingLogo className="loading-logo" />
              </LoadingScreen>
            )}
          </AnimatePresence>
          
          <StyledApp
            ref={appRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`app ${loading ? 'loading' : ''}`}
          >
            <Header className="app-content" />
            <MainContent className="app-content" />
            <Footer className="app-content" />
          </StyledApp>
        </ParallaxProvider>
      </AnimationProvider>
    </ThemeProvider>
  );
};

export default App;