import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AnimatedSection, { ANIMATIONS } from './Animation/AnimatedSection';

const StyledTitle = styled(motion.h2)`
  font-size: ${props => props.size === 'large' ? '3.5rem' : props.size === 'medium' ? '2.5rem' : '1.8rem'};
  font-weight: 700;
  margin-bottom: ${props => props.spacing || '1.5rem'};
  position: relative;
  display: inline-block;
  color: ${({ theme, color }) => color ? color : theme.text};
  line-height: 1.2;
  letter-spacing: -0.02em;
  
  @media (max-width: 768px) {
    font-size: ${props => props.size === 'large' ? '2.8rem' : props.size === 'medium' ? '2rem' : '1.5rem'};
  }
  
  @media (max-width: 480px) {
    font-size: ${props => props.size === 'large' ? '2.2rem' : props.size === 'medium' ? '1.8rem' : '1.3rem'};
  }
  
  ${props => props.underline && `
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: ${props.underlineWidth || '60px'};
      height: 4px;
      background: linear-gradient(to right, ${props.theme.primary}, ${props.theme.secondary});
      border-radius: 2px;
    }
  `}
  
  ${props => props.centered && `
    text-align: center;
    display: block;
    
    &::after {
      left: 50%;
      transform: translateX(-50%);
    }
  `}
  
  ${props => props.gradient && `
    background: linear-gradient(to right, ${props.theme.primary}, ${props.theme.secondary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  `}
`;

const Title = ({
  children,
  size = 'medium',
  color,
  underline = false,
  underlineWidth,
  centered = false,
  gradient = false,
  spacing,
  className = '',
  animate = true,
  animation = ANIMATIONS.FADE_UP,
  delay = 0,
  duration = 0.6,
  threshold = 0.2,
  once = true,
  as = 'h2',
  ...props
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: once,
  });
  
  useEffect(() => {
    if (inView && animate) {
      controls.start('visible');
    }
  }, [controls, inView, animate]);
  
  const titleVariants = {
    hidden: { 
      opacity: 0,
      y: animation === ANIMATIONS.FADE_UP ? 20 : 
         animation === ANIMATIONS.FADE_DOWN ? -20 : 0,
      x: animation === ANIMATIONS.FADE_LEFT ? -20 : 
         animation === ANIMATIONS.FADE_RIGHT ? 20 : 0,
      scale: animation === ANIMATIONS.ZOOM_IN ? 0.9 : 
             animation === ANIMATIONS.ZOOM_OUT ? 1.1 : 1
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0],
      }
    }
  };

  if (!animate) {
    return (
      <StyledTitle
        as={as}
        size={size}
        color={color}
        underline={underline}
        underlineWidth={underlineWidth}
        centered={centered}
        gradient={gradient}
        spacing={spacing}
        className={className}
        {...props}
      >
        {children}
      </StyledTitle>
    );
  }

  return (
    <StyledTitle
      ref={ref}
      as={as}
      size={size}
      color={color}
      underline={underline}
      underlineWidth={underlineWidth}
      centered={centered}
      gradient={gradient}
      spacing={spacing}
      className={className}
      initial="hidden"
      animate={controls}
      variants={titleVariants}
      {...props}
    >
      {children}
    </StyledTitle>
  );
};

Title.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.string,
  underline: PropTypes.bool,
  underlineWidth: PropTypes.string,
  centered: PropTypes.bool,
  gradient: PropTypes.bool,
  spacing: PropTypes.string,
  className: PropTypes.string,
  animate: PropTypes.bool,
  animation: PropTypes.oneOf(Object.values(ANIMATIONS)),
  delay: PropTypes.number,
  duration: PropTypes.number,
  threshold: PropTypes.number,
  once: PropTypes.bool,
  as: PropTypes.string,
};

export default Title;