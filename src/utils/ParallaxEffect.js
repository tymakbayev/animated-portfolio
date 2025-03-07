import { useRef, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export const PARALLAX_DIRECTIONS = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
  BOTH: 'both'
};

/**
 * Hook that creates a parallax effect for an element
 * 
 * @param {Object} options - Configuration options for the parallax effect
 * @param {number} options.speed - The speed of the parallax effect (default: 5)
 * @param {string} options.direction - The direction of the parallax effect (default: 'vertical')
 * @param {number} options.xSpeed - The speed of the horizontal parallax effect
 * @param {number} options.ySpeed - The speed of the vertical parallax effect
 * @param {boolean} options.disabled - Whether the parallax effect is disabled
 * @param {number} options.threshold - The threshold for the intersection observer
 * @param {boolean} options.triggerOnce - Whether to trigger the parallax effect only once
 * @param {number} options.startValue - The start value for the parallax effect
 * @param {number} options.endValue - The end value for the parallax effect
 * @param {string} options.easing - The easing function for the parallax effect
 * @returns {Object} - The ref to attach to the element and the current transform value
 */
export const useParallaxEffect = ({
  speed = 5,
  direction = PARALLAX_DIRECTIONS.VERTICAL,
  xSpeed,
  ySpeed,
  disabled = false,
  threshold = 0.1,
  triggerOnce = false,
  startValue,
  endValue,
  easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
} = {}) => {
  const elementRef = useRef(null);
  const [transform, setTransform] = useState('translate(0, 0)');
  const [ref, inView] = useInView({
    threshold,
    triggerOnce
  });

  const calculateParallax = () => {
    if (!elementRef.current || disabled) return;
    
    const rect = elementRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    
    // Calculate how far the element is from the center of the viewport
    const elementCenterY = rect.top + rect.height / 2;
    const elementCenterX = rect.left + rect.width / 2;
    const viewportCenterY = windowHeight / 2;
    const viewportCenterX = windowWidth / 2;
    
    // Calculate the percentage of the element's position relative to the viewport
    const percentageY = (elementCenterY - viewportCenterY) / windowHeight;
    const percentageX = (elementCenterX - viewportCenterX) / windowWidth;
    
    // Apply the parallax effect based on direction
    if (direction === PARALLAX_DIRECTIONS.VERTICAL) {
      const yOffset = (ySpeed !== undefined ? ySpeed : speed) * percentageY * -1;
      setTransform(`translateY(${yOffset}px)`);
    } else if (direction === PARALLAX_DIRECTIONS.HORIZONTAL) {
      const xOffset = (xSpeed !== undefined ? xSpeed : speed) * percentageX * -1;
      setTransform(`translateX(${xOffset}px)`);
    } else if (direction === PARALLAX_DIRECTIONS.BOTH) {
      const yOffset = (ySpeed !== undefined ? ySpeed : speed) * percentageY * -1;
      const xOffset = (xSpeed !== undefined ? xSpeed : speed) * percentageX * -1;
      setTransform(`translate(${xOffset}px, ${yOffset}px)`);
    }
  };
  
  useEffect(() => {
    if (disabled) return;
    
    const setRefs = (el) => {
      elementRef.current = el;
      if (ref) {
        ref(el);
      }
    };

    return () => {
      elementRef.current = null;
    };
  }, [ref, disabled]);

  useEffect(() => {
    if (disabled) return;
    
    window.addEventListener('scroll', calculateParallax);
    window.addEventListener('resize', calculateParallax);
    window.addEventListener('mousemove', calculateParallax);
    
    calculateParallax();
    
    return () => {
      window.removeEventListener('scroll', calculateParallax);
      window.removeEventListener('resize', calculateParallax);
      window.removeEventListener('mousemove', calculateParallax);
    };
  }, [disabled, speed, direction, xSpeed, ySpeed]);
  
  // Recalculate when element comes into view
  useEffect(() => {
    if (inView && !disabled) {
      calculateParallax();
    }
  }, [inView, disabled]);

  // Get parallax values for react-scroll-parallax compatibility
  const getParallaxValues = () => {
    if (startValue !== undefined && endValue !== undefined) {
      return direction === PARALLAX_DIRECTIONS.HORIZONTAL 
        ? { x: [startValue, endValue] } 
        : { y: [startValue, endValue] };
    }
    
    const defaultValue = speed;
    return direction === PARALLAX_DIRECTIONS.HORIZONTAL 
      ? { x: [-defaultValue, defaultValue] } 
      : { y: [-defaultValue, defaultValue] };
  };

  return {
    ref: (el) => {
      elementRef.current = el;
      if (ref) {
        ref(el);
      }
    },
    style: {
      transform,
      transition: `transform 0.1s ${easing}`,
      willChange: 'transform'
    },
    parallaxProps: {
      ...getParallaxValues(),
      easing
    },
    inView
  };
};

/**
 * Utility function to create a mouse parallax effect
 * 
 * @param {Object} options - Configuration options for the mouse parallax effect
 * @param {number} options.sensitivity - The sensitivity of the mouse parallax effect (default: 0.05)
 * @param {boolean} options.inverted - Whether to invert the direction of the parallax effect
 * @param {boolean} options.disabled - Whether the parallax effect is disabled
 * @returns {Object} - The ref to attach to the element and the current transform value
 */
export const useMouseParallax = ({
  sensitivity = 0.05,
  inverted = false,
  disabled = false
} = {}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef(null);
  
  useEffect(() => {
    if (disabled) return;
    
    const handleMouseMove = (e) => {
      if (!elementRef.current) return;
      
      const rect = elementRef.current.getBoundingClientRect();
      const elementCenterX = rect.left + rect.width / 2;
      const elementCenterY = rect.top + rect.height / 2;
      
      // Calculate distance from mouse to element center
      const distanceX = e.clientX - elementCenterX;
      const distanceY = e.clientY - elementCenterY;
      
      // Apply sensitivity and inversion if needed
      const factor = inverted ? -1 : 1;
      const offsetX = distanceX * sensitivity * factor;
      const offsetY = distanceY * sensitivity * factor;
      
      setPosition({ x: offsetX, y: offsetY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [sensitivity, inverted, disabled]);
  
  return {
    ref: elementRef,
    style: {
      transform: `translate(${position.x}px, ${position.y}px)`,
      transition: 'transform 0.2s ease-out',
      willChange: 'transform'
    }
  };
};

/**
 * Utility function to create a scroll-based parallax effect
 * 
 * @param {Object} options - Configuration options for the scroll parallax effect
 * @param {number} options.speed - The speed of the parallax effect (default: 0.5)
 * @param {string} options.direction - The direction of the parallax effect (default: 'vertical')
 * @param {boolean} options.disabled - Whether the parallax effect is disabled
 * @returns {Object} - The ref to attach to the element and the current transform value
 */
export const useScrollParallax = ({
  speed = 0.5,
  direction = PARALLAX_DIRECTIONS.VERTICAL,
  disabled = false
} = {}) => {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef(null);
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: false
  });

  const calculateParallax = () => {
    if (!elementRef.current || disabled) return;
    
    const rect = elementRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementVisible = rect.top < windowHeight && rect.bottom > 0;
    
    if (elementVisible) {
      const scrollPosition = window.scrollY;
      const elementPosition = rect.top + scrollPosition;
      const relativePosition = scrollPosition - elementPosition + windowHeight;
      setOffset(relativePosition * speed);
    }
  };

  useEffect(() => {
    if (disabled) return;
    
    window.addEventListener('scroll', calculateParallax);
    window.addEventListener('resize', calculateParallax);
    
    calculateParallax();
    
    return () => {
      window.removeEventListener('scroll', calculateParallax);
      window.removeEventListener('resize', calculateParallax);
    };
  }, [disabled, speed]);

  useEffect(() => {
    if (inView && !disabled) {
      calculateParallax();
    }
  }, [inView, disabled]);

  return {
    ref: (el) => {
      elementRef.current = el;
      if (ref) {
        ref(el);
      }
    },
    style: {
      transform: direction === PARALLAX_DIRECTIONS.VERTICAL 
        ? `translateY(${offset}px)` 
        : `translateX(${offset}px)`,
      transition: 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      willChange: 'transform'
    },
    inView
  };
};

export default {
  useParallaxEffect,
  useMouseParallax,
  useScrollParallax,
  PARALLAX_DIRECTIONS
};