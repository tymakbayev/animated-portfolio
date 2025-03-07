import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useAnimation } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

class AnimationService {
  constructor() {
    this.timelines = new Map();
    this.parallaxElements = new Map();
  }

  initAnimations() {
    // Initialize global animation settings
    gsap.config({
      autoSleep: 60,
      force3D: true,
      nullTargetWarn: false
    });

    // Reset any existing animations
    this.timelines.forEach(timeline => timeline.kill());
    this.timelines.clear();
    this.parallaxElements.forEach(parallax => parallax.kill());
    this.parallaxElements.clear();

    // Setup default ScrollTrigger configuration
    ScrollTrigger.config({
      ignoreMobileResize: true
    });

    // Refresh ScrollTrigger to handle any DOM changes
    ScrollTrigger.refresh();

    return this;
  }

  animateElement(element, animationProps, options = {}) {
    if (!element) return null;

    const defaults = {
      duration: 0.8,
      ease: 'power2.out',
      delay: 0,
      scrollTrigger: null
    };

    const config = { ...defaults, ...options };
    
    return gsap.to(element, {
      ...animationProps,
      duration: config.duration,
      ease: config.ease,
      delay: config.delay,
      scrollTrigger: config.scrollTrigger
    });
  }

  createTimeline(id, options = {}) {
    const defaults = {
      paused: false,
      repeat: 0,
      yoyo: false,
      scrollTrigger: null
    };

    const config = { ...defaults, ...options };
    const timeline = gsap.timeline(config);
    
    if (id) {
      this.timelines.set(id, timeline);
    }
    
    return timeline;
  }

  createParallax(element, options = {}) {
    if (!element) return null;

    const defaults = {
      speed: 0.5,
      direction: 'y',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    };

    const config = { ...defaults, ...options };
    const distance = config.direction === 'y' ? 
      element.offsetHeight * config.speed : 
      element.offsetWidth * config.speed;

    const parallaxEffect = gsap.to(element, {
      [config.direction]: distance,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: config.start,
        end: config.end,
        scrub: config.scrub,
        markers: false
      }
    });

    if (options.id) {
      this.parallaxElements.set(options.id, parallaxEffect);
    }

    return parallaxEffect;
  }

  // Helper methods for Framer Motion
  getFramerVariants(type) {
    const variants = {
      fadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6 } }
      },
      slideUp: {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
      },
      slideDown: {
        hidden: { y: -50, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
      },
      slideLeft: {
        hidden: { x: 50, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
      },
      slideRight: {
        hidden: { x: -50, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
      },
      scale: {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { duration: 0.6 } }
      },
      stagger: {
        hidden: { opacity: 0 },
        visible: (i = 0) => ({
          opacity: 1,
          transition: { delay: i * 0.1, duration: 0.5 }
        })
      }
    };

    return variants[type] || variants.fadeIn;
  }

  // Clean up method to prevent memory leaks
  cleanup() {
    this.timelines.forEach(timeline => timeline.kill());
    this.timelines.clear();
    this.parallaxElements.forEach(parallax => parallax.kill());
    this.parallaxElements.clear();
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }
}

export default new AnimationService();