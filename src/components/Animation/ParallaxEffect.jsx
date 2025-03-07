import React, { useState, useEffect, useRef } from 'react';

const ParallaxEffect = ({ children, speed = 0.5, direction = 'vertical' }) => {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef(null);

  const calculateParallax = () => {
    if (!elementRef.current) return;
    
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
    window.addEventListener('scroll', calculateParallax);
    window.addEventListener('resize', calculateParallax);
    
    calculateParallax();
    
    return () => {
      window.removeEventListener('scroll', calculateParallax);
      window.removeEventListener('resize', calculateParallax);
    };
  }, []);

  const parallaxStyle = {
    transform: direction === 'vertical' 
      ? `translateY(${offset}px)` 
      : `translateX(${offset}px)`,
    transition: 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  };

  return (
    <div ref={elementRef} style={parallaxStyle}>
      {children}
    </div>
  );
};

export default ParallaxEffect;
