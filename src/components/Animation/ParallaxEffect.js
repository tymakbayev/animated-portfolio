import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';

export const PARALLAX_DIRECTIONS = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
  BOTH: 'both'
};

const ParallaxContainer = styled.div`
  position: relative;
  overflow: hidden;
  will-change: transform;
  transition: transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
`;

const ParallaxEffect = ({
  children,
  speed = 5,
  direction = PARALLAX_DIRECTIONS.VERTICAL,
  easing = 'easeOutQuad',
  className = '',
  style = {},
  startValue,
  endValue,
  xSpeed,
  ySpeed,
  disabled = false,
  mouseMoveEffect = false,
  scrollEffect = true
}) => {
  const elementRef = useRef(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
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
    if (direction === PARALLAX_DIRECTIONS.VERTICAL || direction === PARALLAX_DIRECTIONS.BOTH) {
      const yOffset = (ySpeed !== undefined ? ySpeed : speed) * percentageY * -1;
      elementRef.current.style.transform = `translateY(${yOffset}px)`;
    }
    
    if (direction === PARALLAX_DIRECTIONS.HORIZONTAL || direction === PARALLAX_DIRECTIONS.BOTH) {
      const xOffset = (xSpeed !== undefined ? xSpeed : speed) * percentageX * -1;
      elementRef.current.style.transform = `translateX(${xOffset}px)`;
    }
    
    if (direction === PARALLAX_DIRECTIONS.BOTH) {
      const yOffset = (ySpeed !== undefined ? ySpeed : speed) * percentageY * -1;
      const xOffset = (xSpeed !== undefined ? xSpeed : speed) * percentageX * -1;
      elementRef.current.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    }
  };

  const handleMouseMove = (e) => {
    if (!elementRef.current || disabled || !mouseMoveEffect) return;
    
    const { clientX, clientY } = e;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Calculate mouse position relative to the center of the screen
    const mouseXPercentage = (clientX / windowWidth - 0.5) * 2;
    const mouseYPercentage = (clientY / windowHeight - 0.5) * 2;
    
    // Apply the parallax effect based on direction
    if (direction === PARALLAX_DIRECTIONS.VERTICAL || direction === PARALLAX_DIRECTIONS.BOTH) {
      const yOffset = (ySpeed !== undefined ? ySpeed : speed) * mouseYPercentage * -1;
      elementRef.current.style.transform = `translateY(${yOffset}px)`;
    }
    
    if (direction === PARALLAX_DIRECTIONS.HORIZONTAL || direction === PARALLAX_DIRECTIONS.BOTH) {
      const xOffset = (xSpeed !== undefined ? xSpeed : speed) * mouseXPercentage * -1;
      elementRef.current.style.transform = `translateX(${xOffset}px)`;
    }
    
    if (direction === PARALLAX_DIRECTIONS.BOTH) {
      const yOffset = (ySpeed !== undefined ? ySpeed : speed) * mouseYPercentage * -1;
      const xOffset = (xSpeed !== undefined ? xSpeed : speed) * mouseXPercentage * -1;
      elementRef.current.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    }
  };
  
  useEffect(() => {
    if (disabled) return;
    
    if (scrollEffect) {
      window.addEventListener('scroll', calculateParallax);
      window.addEventListener('resize', calculateParallax);
    }
    
    if (mouseMoveEffect) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    calculateParallax();
    
    return () => {
      if (scrollEffect) {
        window.removeEventListener('scroll', calculateParallax);
        window.removeEventListener('resize', calculateParallax);
      }
      
      if (mouseMoveEffect) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [disabled, scrollEffect, mouseMoveEffect]);
  
  // Recalculate when element comes into view
  useEffect(() => {
    if (inView && !disabled && scrollEffect) {
      calculateParallax();
    }
  }, [inView, disabled, scrollEffect]);
  
  return (
    <ParallaxContainer 
      ref={(el) => {
        elementRef.current = el;
        if (ref) {
          ref(el);
        }
      }}
      className={className}
      style={{
        ...style,
        transform: 'translate(0, 0)'
      }}
    >
      {children}
    </ParallaxContainer>
  );
};

ParallaxEffect.propTypes = {
  children: PropTypes.node.isRequired,
  speed: PropTypes.number,
  direction: PropTypes.oneOf(Object.values(PARALLAX_DIRECTIONS)),
  easing: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  startValue: PropTypes.number,
  endValue: PropTypes.number,
  xSpeed: PropTypes.number,
  ySpeed: PropTypes.number,
  disabled: PropTypes.bool,
  mouseMoveEffect: PropTypes.bool,
  scrollEffect: PropTypes.bool
};

export default ParallaxEffect;