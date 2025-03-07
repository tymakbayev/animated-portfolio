import { ANIMATION_SETTINGS } from './constants';

/**
 * Throttles a function to limit how often it can be called
 * @param {Function} func - The function to throttle
 * @param {number} limit - The time limit in milliseconds
 * @returns {Function} - Throttled function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Debounces a function to delay its execution
 * @param {Function} func - The function to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

/**
 * Calculates the scroll percentage of an element
 * @param {HTMLElement} element - The element to calculate scroll for
 * @returns {number} - Scroll percentage (0-100)
 */
export const calculateScrollPercentage = (element) => {
  if (!element) return 0;
  
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const elementTop = element.getBoundingClientRect().top + scrollTop;
  const elementHeight = element.offsetHeight;
  const windowHeight = window.innerHeight;
  
  const scrollPosition = scrollTop + windowHeight - elementTop;
  const scrollPercentage = Math.min(
    Math.max(scrollPosition / (elementHeight + windowHeight) * 100, 0),
    100
  );
  
  return scrollPercentage;
};

/**
 * Generates animation variants for Framer Motion based on animation type
 * @param {string} type - Animation type
 * @param {Object} customProps - Custom animation properties
 * @returns {Object} - Animation variants for Framer Motion
 */
export const generateAnimationVariants = (type, customProps = {}) => {
  const duration = customProps.duration || ANIMATION_SETTINGS.duration.medium;
  const ease = customProps.ease || ANIMATION_SETTINGS.easing.default;
  
  const baseVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration,
        ease,
        ...customProps.transition
      }
    }
  };
  
  switch (type) {
    case 'fade-up':
      return {
        hidden: { ...baseVariants.hidden, y: 50 },
        visible: { ...baseVariants.visible, y: 0 }
      };
    case 'fade-down':
      return {
        hidden: { ...baseVariants.hidden, y: -50 },
        visible: { ...baseVariants.visible, y: 0 }
      };
    case 'fade-left':
      return {
        hidden: { ...baseVariants.hidden, x: -50 },
        visible: { ...baseVariants.visible, x: 0 }
      };
    case 'fade-right':
      return {
        hidden: { ...baseVariants.hidden, x: 50 },
        visible: { ...baseVariants.visible, x: 0 }
      };
    case 'zoom-in':
      return {
        hidden: { ...baseVariants.hidden, scale: 0.8 },
        visible: { ...baseVariants.visible, scale: 1 }
      };
    case 'zoom-out':
      return {
        hidden: { ...baseVariants.hidden, scale: 1.2 },
        visible: { ...baseVariants.visible, scale: 1 }
      };
    case 'bounce':
      return {
        hidden: { ...baseVariants.hidden, y: 50 },
        visible: { 
          ...baseVariants.visible, 
          y: 0,
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 15,
            ...customProps.transition
          }
        }
      };
    case 'flip':
      return {
        hidden: { ...baseVariants.hidden, rotateX: 90 },
        visible: { ...baseVariants.visible, rotateX: 0 }
      };
    case 'rotate':
      return {
        hidden: { ...baseVariants.hidden, rotate: -15 },
        visible: { ...baseVariants.visible, rotate: 0 }
      };
    default:
      return baseVariants;
  }
};

/**
 * Creates staggered animation delays for children
 * @param {number} count - Number of children
 * @param {number} staggerDelay - Delay between each child animation
 * @returns {Array} - Array of delay values
 */
export const createStaggerDelays = (count, staggerDelay = 0.1) => {
  return Array.from({ length: count }, (_, i) => i * staggerDelay);
};

/**
 * Calculates parallax offset based on scroll position
 * @param {number} scrollY - Current scroll position
 * @param {number} speed - Parallax speed factor
 * @param {number} offset - Initial offset
 * @returns {number} - Calculated parallax offset
 */
export const calculateParallaxOffset = (scrollY, speed = 0.5, offset = 0) => {
  return offset + (scrollY * speed);
};

/**
 * Formats a date string
 * @param {string|Date} date - Date to format
 * @param {Object} options - Formatting options
 * @returns {string} - Formatted date string
 */
export const formatDate = (date, options = {}) => {
  const dateObj = date instanceof Date ? date : new Date(date);
  
  const defaultOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  return dateObj.toLocaleDateString(undefined, { ...defaultOptions, ...options });
};

/**
 * Truncates text to a specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

/**
 * Generates a random ID
 * @param {number} length - Length of the ID
 * @returns {string} - Random ID
 */
export const generateId = (length = 8) => {
  return Math.random().toString(36).substring(2, 2 + length);
};

/**
 * Checks if an element is in viewport
 * @param {HTMLElement} element - Element to check
 * @param {number} offset - Offset from viewport edges
 * @returns {boolean} - Whether element is in viewport
 */
export const isInViewport = (element, offset = 0) => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.bottom >= 0 - offset &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth) + offset &&
    rect.right >= 0 - offset
  );
};

/**
 * Smoothly scrolls to an element
 * @param {string} elementId - ID of the element to scroll to
 * @param {number} offset - Offset from the top
 * @param {number} duration - Scroll duration in ms
 */
export const scrollToElement = (elementId, offset = 0, duration = 1000) => {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - offset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};

/**
 * Gets contrast text color (black or white) based on background color
 * @param {string} hexColor - Hex color code
 * @returns {string} - '#ffffff' or '#000000'
 */
export const getContrastColor = (hexColor) => {
  if (!hexColor || !hexColor.startsWith('#')) return '#000000';
  
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  return brightness > 128 ? '#000000' : '#ffffff';
};

/**
 * Detects if the device is a mobile device
 * @returns {boolean} - Whether the device is mobile
 */
export const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * Detects if the device supports touch events
 * @returns {boolean} - Whether the device supports touch
 */
export const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

/**
 * Converts pixels to rem units
 * @param {number} px - Pixel value
 * @returns {string} - Rem value
 */
export const pxToRem = (px) => {
  const baseFontSize = 16;
  return `${px / baseFontSize}rem`;
};