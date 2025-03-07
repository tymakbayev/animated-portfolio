import React, { useRef, useEffect, useState } from 'react';
import { useAnimation } from '../../contexts/AnimationContext';
import './AnimatedSection.css';

const AnimatedSection = ({ 
  children, 
  animation = 'fade-in', 
  delay = 0, 
  duration = 0.8, 
  threshold = 0.2,
  className = ''
}) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { animationEnabled } = useAnimation();

  useEffect(() => {
    const currentRef = sectionRef.current;
    
    const handleIntersection = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold
    });

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const animationStyle = animationEnabled && isVisible ? {
    opacity: 1,
    transform: 'translateY(0)',
    transition: `opacity ${duration}s ease-out, transform ${duration}s ease-out`,
    transitionDelay: `${delay}s`
  } : animationEnabled ? {
    opacity: 0,
    transform: 'translateY(30px)'
  } : {};

  const getAnimationClass = () => {
    if (!animationEnabled) return '';
    return isVisible ? `${animation} animated` : animation;
  };

  return (
    <div 
      ref={sectionRef}
      className={`animated-section ${getAnimationClass()} ${className}`}
      style={animationStyle}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;