import { useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';

/**
 * Custom hook for creating and managing animations
 * @param {Object} options - Animation options
 * @param {string} options.type - Animation type (fade, slide, zoom, etc.)
 * @param {number} options.duration - Animation duration in seconds
 * @param {number} options.delay - Animation delay in seconds
 * @param {string} options.ease - GSAP easing function
 * @param {number} options.threshold - IntersectionObserver threshold
 * @param {boolean} options.once - Whether animation should only play once
 * @param {Object} options.from - Starting animation properties
 * @param {Object} options.to - Ending animation properties
 */
const useAnimation = ({
  type = 'fade',
  duration = 0.8,
  delay = 0,
  ease = 'power3.out',
  threshold = 0.1,
  once = true,
  from = {},
  to = {},
}) => {
  const [animated, setAnimated] = useState(false);
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: once,
  });

  // Define animation presets
  const animations = {
    fade: {
      from: { opacity: 0, ...from },
      to: { opacity: 1, duration, ease, ...to },
    },
    fadeUp: {
      from: { opacity: 0, y: 50, ...from },
      to: { opacity: 1, y: 0, duration, ease, ...to },
    },
    fadeDown: {
      from: { opacity: 0, y: -50, ...from },
      to: { opacity: 1, y: 0, duration, ease, ...to },
    },
    fadeLeft: {
      from: { opacity: 0, x: -50, ...from },
      to: { opacity: 1, x: 0, duration, ease, ...to },
    },
    fadeRight: {
      from: { opacity: 0, x: 50, ...from },
      to: { opacity: 1, x: 0, duration, ease, ...to },
    },
    zoomIn: {
      from: { opacity: 0, scale: 0.8, ...from },
      to: { opacity: 1, scale: 1, duration, ease, ...to },
    },
    zoomOut: {
      from: { opacity: 0, scale: 1.2, ...from },
      to: { opacity: 1, scale: 1, duration, ease, ...to },
    },
    slideUp: {
      from: { y: 100, ...from },
      to: { y: 0, duration, ease, ...to },
    },
    slideDown: {
      from: { y: -100, ...from },
      to: { y: 0, duration, ease, ...to },
    },
    slideLeft: {
      from: { x: -100, ...from },
      to: { x: 0, duration, ease, ...to },
    },
    slideRight: {
      from: { x: 100, ...from },
      to: { x: 0, duration, ease, ...to },
    },
    flip: {
      from: { rotationY: 180, opacity: 0, ...from },
      to: { rotationY: 0, opacity: 1, duration, ease, ...to },
    },
    rotate: {
      from: { rotation: -90, opacity: 0, ...from },
      to: { rotation: 0, opacity: 1, duration, ease, ...to },
    },
  };

  // Get animation preset or use custom animation
  const animation = animations[type] || {
    from: { opacity: 0, ...from },
    to: { opacity: 1, duration, ease, ...to },
  };

  // Apply animation when element comes into view
  useEffect(() => {
    if (inView && !animated) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ref.current,
          { ...animation.from },
          { ...animation.to, delay, onComplete: () => setAnimated(true) }
        );
      });

      return () => ctx.revert();
    }
  }, [inView, animated, ref, animation, delay]);

  // Reset animation if needed (for repeating animations)
  const resetAnimation = useCallback(() => {
    setAnimated(false);
  }, []);

  // Create a staggered animation for child elements
  const createStaggerAnimation = useCallback((selector, staggerAmount = 0.1) => {
    if (inView && ref.current) {
      const elements = ref.current.querySelectorAll(selector);
      
      if (elements.length) {
        gsap.fromTo(
          elements,
          { ...animation.from },
          { 
            ...animation.to, 
            delay, 
            stagger: staggerAmount,
            onComplete: () => setAnimated(true)
          }
        );
      }
    }
  }, [inView, ref, animation, delay]);

  // Create a sequence of animations
  const createSequence = useCallback((animations) => {
    if (inView && ref.current && !animated) {
      const timeline = gsap.timeline({ delay });
      
      animations.forEach(({ selector, type, duration: animDuration = duration, ...rest }) => {
        const preset = animations[type] || animations.fade;
        const elements = selector ? ref.current.querySelectorAll(selector) : ref.current;
        
        timeline.fromTo(
          elements,
          { ...preset.from },
          { 
            ...preset.to, 
            duration: animDuration,
            ...rest
          }
        );
      });
      
      timeline.then(() => setAnimated(true));
    }
  }, [inView, ref, animated, animations, duration, delay]);

  return { 
    ref, 
    inView, 
    animated, 
    resetAnimation, 
    createStaggerAnimation,
    createSequence
  };
};

export default useAnimation;