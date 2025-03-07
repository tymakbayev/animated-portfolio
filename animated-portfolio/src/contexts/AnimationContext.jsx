import React, { createContext, useContext, useState, useCallback } from 'react';

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
    animatedElements: {}
  });

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

  const value = {
    animationState,
    updateAnimationState,
    registerAnimatedElement,
    setElementAnimated,
    setActiveSection,
    setScrollProgress
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};

export default AnimationProvider;