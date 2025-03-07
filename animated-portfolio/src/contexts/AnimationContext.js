import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

// Animation types that can be used throughout the application
export const ANIMATIONS = {
  FADE_UP: 'fadeUp',
  FADE_DOWN: 'fadeDown',
  FADE_LEFT: 'fadeLeft',
  FADE_RIGHT: 'fadeRight',
  ZOOM_IN: 'zoomIn',
  ZOOM_OUT: 'zoomOut',
  SLIDE_UP: 'slideUp',
  SLIDE_DOWN: 'slideDown',
  SLIDE_LEFT: 'slideLeft',
  SLIDE_RIGHT: 'slideRight',
  BOUNCE: 'bounce',
  ROTATE: 'rotate',
  FLIP: 'flip',
  NONE: 'none'
};

const AnimationContext = createContext();

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};

export const AnimationProvider = ({ children }) => {
  const [animationState, setAnimationState] = useState({
    isLoading: true,
    activeSection: null,
    scrollProgress: 0,
    animatedElements: {},
    preferredAnimation: ANIMATIONS.FADE_UP,
    animationDuration: 0.8,
    animationDelay: 0.2,
    staggerChildren: 0.1,
    isReducedMotion: false
  });

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMediaChange = () => {
      setAnimationState(prev => ({
        ...prev,
        isReducedMotion: mediaQuery.matches
      }));
    };

    handleMediaChange();
    mediaQuery.addEventListener('change', handleMediaChange);

    // Set loading to false after initial render
    const timer = setTimeout(() => {
      setAnimationState(prev => ({
        ...prev,
        isLoading: false
      }));
    }, 800);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      clearTimeout(timer);
    };
  }, []);

  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollTop / scrollHeight;
      
      setAnimationState(prev => ({
        ...prev,
        scrollProgress: progress
      }));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const updateAnimationState = useCallback((updates) => {
    setAnimationState(prev => ({
      ...prev,
      ...updates
    }));
  }, []);

  const registerAnimatedElement = useCallback((id, initialState = false) => {
    setAnimationState(prev => ({
      ...prev,
      animatedElements: {
        ...prev.animatedElements,
        [id]: initialState
      }
    }));
    return id;
  }, []);

  const setElementAnimated = useCallback((id, isAnimated) => {
    setAnimationState(prev => ({
      ...prev,
      animatedElements: {
        ...prev.animatedElements,
        [id]: isAnimated
      }
    }));
  }, []);

  const setActiveSection = useCallback((sectionId) => {
    setAnimationState(prev => ({
      ...prev,
      activeSection: sectionId
    }));
  }, []);

  const setScrollProgress = useCallback((progress) => {
    setAnimationState(prev => ({
      ...prev,
      scrollProgress: progress
    }));
  }, []);

  const setPreferredAnimation = useCallback((animation) => {
    if (Object.values(ANIMATIONS).includes(animation)) {
      setAnimationState(prev => ({
        ...prev,
        preferredAnimation: animation
      }));
    }
  }, []);

  const setAnimationDuration = useCallback((duration) => {
    if (typeof duration === 'number' && duration >= 0) {
      setAnimationState(prev => ({
        ...prev,
        animationDuration: duration
      }));
    }
  }, []);

  const setAnimationDelay = useCallback((delay) => {
    if (typeof delay === 'number' && delay >= 0) {
      setAnimationState(prev => ({
        ...prev,
        animationDelay: delay
      }));
    }
  }, []);

  const setStaggerChildren = useCallback((stagger) => {
    if (typeof stagger === 'number' && stagger >= 0) {
      setAnimationState(prev => ({
        ...prev,
        staggerChildren: stagger
      }));
    }
  }, []);

  const useAnimatedElement = (options = {}) => {
    const {
      threshold = 0.2,
      triggerOnce = true,
      id = `element-${Math.random().toString(36).substr(2, 9)}`,
      rootMargin = '0px'
    } = options;

    const [ref, inView] = useInView({
      threshold,
      triggerOnce,
      rootMargin
    });

    useEffect(() => {
      if (!animationState.animatedElements[id]) {
        registerAnimatedElement(id, false);
      }
    }, [id]);

    useEffect(() => {
      if (inView && !animationState.animatedElements[id]) {
        setElementAnimated(id, true);
      } else if (!inView && !triggerOnce && animationState.animatedElements[id]) {
        setElementAnimated(id, false);
      }
    }, [inView, id, triggerOnce]);

    return { 
      ref, 
      inView, 
      isAnimated: animationState.animatedElements[id] || false,
      id
    };
  };

  // Get animation variants based on animation type
  const getAnimationVariants = useCallback((animationType = animationState.preferredAnimation) => {
    // Default animation properties
    const duration = animationState.animationDuration;
    const delay = animationState.animationDelay;
    
    // Return no animation if reduced motion is preferred
    if (animationState.isReducedMotion) {
      return {
        hidden: { opacity: 1 },
        visible: { opacity: 1 }
      };
    }

    // Animation variants based on type
    switch (animationType) {
      case ANIMATIONS.FADE_UP:
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration, delay, ease: "easeOut" } 
          }
        };
      case ANIMATIONS.FADE_DOWN:
        return {
          hidden: { opacity: 0, y: -50 },
          visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration, delay, ease: "easeOut" } 
          }
        };
      case ANIMATIONS.FADE_LEFT:
        return {
          hidden: { opacity: 0, x: -50 },
          visible: { 
            opacity: 1, 
            x: 0, 
            transition: { duration, delay, ease: "easeOut" } 
          }
        };
      case ANIMATIONS.FADE_RIGHT:
        return {
          hidden: { opacity: 0, x: 50 },
          visible: { 
            opacity: 1, 
            x: 0, 
            transition: { duration, delay, ease: "easeOut" } 
          }
        };
      case ANIMATIONS.ZOOM_IN:
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { 
            opacity: 1, 
            scale: 1, 
            transition: { duration, delay, ease: "easeOut" } 
          }
        };
      case ANIMATIONS.ZOOM_OUT:
        return {
          hidden: { opacity: 0, scale: 1.2 },
          visible: { 
            opacity: 1, 
            scale: 1, 
            transition: { duration, delay, ease: "easeOut" } 
          }
        };
      case ANIMATIONS.SLIDE_UP:
        return {
          hidden: { y: 100 },
          visible: { 
            y: 0, 
            transition: { duration, delay, ease: "easeOut" } 
          }
        };
      case ANIMATIONS.SLIDE_DOWN:
        return {
          hidden: { y: -100 },
          visible: { 
            y: 0, 
            transition: { duration, delay, ease: "easeOut" } 
          }
        };
      case ANIMATIONS.SLIDE_LEFT:
        return {
          hidden: { x: -100 },
          visible: { 
            x: 0, 
            transition: { duration, delay, ease: "easeOut" } 
          }
        };
      case ANIMATIONS.SLIDE_RIGHT:
        return {
          hidden: { x: 100 },
          visible: { 
            x: 0, 
            transition: { duration, delay, ease: "easeOut" } 
          }
        };
      case ANIMATIONS.BOUNCE:
        return {
          hidden: { y: 50, opacity: 0 },
          visible: { 
            y: 0, 
            opacity: 1,
            transition: { 
              type: "spring", 
              stiffness: 300, 
              damping: 15,
              delay 
            } 
          }
        };
      case ANIMATIONS.ROTATE:
        return {
          hidden: { rotate: -15, opacity: 0 },
          visible: { 
            rotate: 0, 
            opacity: 1,
            transition: { duration, delay, ease: "easeOut" } 
          }
        };
      case ANIMATIONS.FLIP:
        return {
          hidden: { rotateX: 90, opacity: 0 },
          visible: { 
            rotateX: 0, 
            opacity: 1,
            transition: { duration, delay, ease: "easeOut" } 
          }
        };
      case ANIMATIONS.NONE:
      default:
        return {
          hidden: { opacity: 1 },
          visible: { opacity: 1 }
        };
    }
  }, [animationState.animationDuration, animationState.animationDelay, animationState.isReducedMotion, animationState.preferredAnimation]);

  // Get stagger container variants for parent elements with children
  const getStaggerContainerVariants = useCallback(() => {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: animationState.staggerChildren,
          delayChildren: animationState.animationDelay
        }
      }
    };
  }, [animationState.staggerChildren, animationState.animationDelay]);

  const value = {
    animationState,
    updateAnimationState,
    registerAnimatedElement,
    setElementAnimated,
    setActiveSection,
    setScrollProgress,
    setPreferredAnimation,
    setAnimationDuration,
    setAnimationDelay,
    setStaggerChildren,
    useAnimatedElement,
    getAnimationVariants,
    getStaggerContainerVariants,
    ANIMATIONS
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};

export default AnimationProvider;