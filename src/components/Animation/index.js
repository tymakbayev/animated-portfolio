import AnimatedSection from './AnimatedSection';
import ParallaxEffect from './ParallaxEffect';

// Animation types for AnimatedSection component
export const ANIMATIONS = {
  FADE_IN: 'fade-in',
  FADE_UP: 'fade-up',
  FADE_DOWN: 'fade-down',
  FADE_LEFT: 'fade-left',
  FADE_RIGHT: 'fade-right',
  ZOOM_IN: 'zoom-in',
  ZOOM_OUT: 'zoom-out',
  SLIDE_UP: 'slide-up',
  SLIDE_DOWN: 'slide-down',
  SLIDE_LEFT: 'slide-left',
  SLIDE_RIGHT: 'slide-right',
  BOUNCE: 'bounce',
  PULSE: 'pulse',
  FLIP: 'flip',
  ROTATE: 'rotate'
};

// Direction options for ParallaxEffect component
export const PARALLAX_DIRECTIONS = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal'
};

// Utility function to stagger animations for multiple elements
export const createStaggeredAnimations = (elements, staggerDelay = 0.1) => {
  return elements.map((_, index) => ({
    delay: index * staggerDelay
  }));
};

export { AnimatedSection, ParallaxEffect };