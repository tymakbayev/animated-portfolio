import React, { createContext, useContext, useEffect, useState } from 'react';
import { ParallaxProvider as ScrollParallaxProvider } from 'react-scroll-parallax';
import PropTypes from 'prop-types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Create context for parallax settings
const ParallaxContext = createContext();

export const useParallax = () => {
  const context = useContext(ParallaxContext);
  if (!context) {
    throw new Error('useParallax must be used within a ParallaxProvider');
  }
  return context;
};

const ParallaxProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    enabled: true,
    smoothScrolling: true,
    scrollSpeed: 1,
    parallaxIntensity: 0.5,
  });

  const [initialized, setInitialized] = useState(false);

  // Initialize smooth scrolling if enabled
  useEffect(() => {
    if (settings.smoothScrolling && !initialized) {
      const setupSmoothScroll = () => {
        const scrollContainer = document.documentElement;
        
        gsap.set(scrollContainer, { 
          overflow: 'hidden',
          height: '100%'
        });
        
        gsap.set('body', { 
          overflow: 'hidden',
          height: '100%'
        });
        
        const smoothScroll = gsap.to(scrollContainer, {
          y: () => -(scrollContainer.scrollHeight - window.innerHeight),
          ease: 'none',
          scrollTrigger: {
            trigger: scrollContainer,
            start: 'top top',
            end: 'bottom bottom',
            scrub: settings.scrollSpeed,
            invalidateOnRefresh: true,
          }
        });
        
        return () => {
          smoothScroll.kill();
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
          gsap.set(scrollContainer, { clearProps: 'all' });
          gsap.set('body', { clearProps: 'all' });
        };
      };
      
      const cleanup = setupSmoothScroll();
      setInitialized(true);
      
      return cleanup;
    }
  }, [settings.smoothScrolling, settings.scrollSpeed, initialized]);

  // Update parallax settings
  const updateSettings = (newSettings) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }));
  };

  // Create parallax effect for an element
  const createParallaxEffect = (element, options = {}) => {
    if (!element || !settings.enabled) return null;
    
    const {
      speed = 0.5,
      direction = 'vertical',
      startOffset = 0,
      endOffset = 0,
      easing = 'none',
    } = options;
    
    const adjustedSpeed = speed * settings.parallaxIntensity;
    
    const parallaxEffect = gsap.to(element, {
      y: direction === 'vertical' ? adjustedSpeed * 100 : 0,
      x: direction === 'horizontal' ? adjustedSpeed * 100 : 0,
      ease: easing,
      scrollTrigger: {
        trigger: element,
        start: `top bottom${startOffset ? '+=' + startOffset : ''}`,
        end: `bottom top${endOffset ? '+=' + endOffset : ''}`,
        scrub: true,
      }
    });
    
    return parallaxEffect;
  };

  // Reset all parallax effects
  const resetParallaxEffects = () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    setInitialized(false);
  };

  // Toggle parallax effects
  const toggleParallax = (enabled) => {
    setSettings(prev => ({
      ...prev,
      enabled: enabled !== undefined ? enabled : !prev.enabled
    }));
    
    if (!enabled) {
      resetParallaxEffects();
    }
  };

  const value = {
    ...settings,
    updateSettings,
    createParallaxEffect,
    resetParallaxEffects,
    toggleParallax,
  };

  return (
    <ParallaxContext.Provider value={value}>
      <ScrollParallaxProvider>
        {children}
      </ScrollParallaxProvider>
    </ParallaxContext.Provider>
  );
};

ParallaxProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ParallaxProvider;