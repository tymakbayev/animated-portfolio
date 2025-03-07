import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ANIMATIONS } from '../components/Animation/AnimatedSection';

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

  const useAnimatedElement = (options = {}) => {
    const {
      threshold = 0.2,
      triggerOnce = true,
      id = `element-${Math.random().toString(36).substr(2, 9)}`
    } = options;

    const [ref, inView] = useInView({
      threshold,
      triggerOnce
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

    return { ref, inView, isAnimated: animationState.animatedElements[id] };
  };

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
    useAnimatedElement,
    getDefaultProps: () => ({
      animation: animationState.isReducedMotion ? ANIMATIONS.FADE_IN : animationState.preferredAnimation,
      duration: animationState.isReducedMotion ? 0.3 : animationState.animationDuration,
      delay: animationState.isReducedMotion ? 0 : animationState.animationDelay,
      disabled: animationState.isReducedMotion
    })
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};

export default AnimationProvider;