import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';
import { ANIMATIONS } from './Animation';
import { AnimationService } from '../services/AnimationService';

const AnimationContext = createContext();

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};

export const AnimationProvider = ({ children, defaultPreferences = {} }) => {
  const [animationPreferences, setAnimationPreferences] = useState({
    enabled: true,
    reducedMotion: false,
    duration: 0.8,
    delay: 0,
    ...defaultPreferences,
  });

  const [animatedElements, setAnimatedElements] = useState({});
  const [globalAnimationState, setGlobalAnimationState] = useState('idle');

  // Check for user's reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = () => {
      setAnimationPreferences(prev => ({
        ...prev,
        reducedMotion: mediaQuery.matches,
      }));
    };
    
    handleChange();
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Register an element to be animated
  const registerAnimatedElement = useCallback((id, options = {}) => {
    setAnimatedElements(prev => ({
      ...prev,
      [id]: {
        id,
        status: 'pending',
        ...options,
      },
    }));
    
    return id;
  }, []);

  // Unregister an animated element
  const unregisterAnimatedElement = useCallback((id) => {
    setAnimatedElements(prev => {
      const newElements = { ...prev };
      delete newElements[id];
      return newElements;
    });
  }, []);

  // Update the animation status of an element
  const updateAnimationStatus = useCallback((id, status) => {
    setAnimatedElements(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        status,
      },
    }));
  }, []);

  // Toggle animations globally
  const toggleAnimations = useCallback(() => {
    setAnimationPreferences(prev => ({
      ...prev,
      enabled: !prev.enabled,
    }));
  }, []);

  // Set animation duration globally
  const setAnimationDuration = useCallback((duration) => {
    setAnimationPreferences(prev => ({
      ...prev,
      duration,
    }));
  }, []);

  // Set animation delay globally
  const setAnimationDelay = useCallback((delay) => {
    setAnimationPreferences(prev => ({
      ...prev,
      delay,
    }));
  }, []);

  // Create a custom animation sequence
  const createAnimationSequence = useCallback((elements, options = {}) => {
    return AnimationService.createSequence(elements, {
      ...animationPreferences,
      ...options,
    });
  }, [animationPreferences]);

  // Play a custom animation sequence
  const playAnimationSequence = useCallback((sequence) => {
    setGlobalAnimationState('playing');
    
    return AnimationService.playSequence(sequence)
      .then(() => {
        setGlobalAnimationState('completed');
      })
      .catch(() => {
        setGlobalAnimationState('error');
      });
  }, []);

  // Create a hook for animated elements to use
  const useAnimatedElement = (options = {}) => {
    const { threshold = 0.2, triggerOnce = true, animation = ANIMATIONS.FADE_IN } = options;
    
    const [ref, inView] = useInView({
      threshold,
      triggerOnce,
    });
    
    const elementId = React.useId();
    
    useEffect(() => {
      registerAnimatedElement(elementId, {
        animation,
        ...options,
      });
      
      return () => {
        unregisterAnimatedElement(elementId);
      };
    }, [animation, elementId]);
    
    useEffect(() => {
      if (inView) {
        updateAnimationStatus(elementId, 'visible');
      } else if (!triggerOnce) {
        updateAnimationStatus(elementId, 'hidden');
      }
    }, [inView, elementId, triggerOnce]);
    
    return {
      ref,
      inView,
      elementId,
      isAnimationEnabled: animationPreferences.enabled && !animationPreferences.reducedMotion,
      animationPreferences,
    };
  };

  const value = {
    animationPreferences,
    globalAnimationState,
    registerAnimatedElement,
    unregisterAnimatedElement,
    updateAnimationStatus,
    toggleAnimations,
    setAnimationDuration,
    setAnimationDelay,
    createAnimationSequence,
    playAnimationSequence,
    useAnimatedElement,
    animatedElements,
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};

AnimationProvider.propTypes = {
  children: PropTypes.node.isRequired,
  defaultPreferences: PropTypes.shape({
    enabled: PropTypes.bool,
    reducedMotion: PropTypes.bool,
    duration: PropTypes.number,
    delay: PropTypes.number,
  }),
};

export default AnimationContext;