import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledAnimatedSection = styled(motion.div)`
  width: 100%;
  overflow: hidden;
`;

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
};

const getAnimationVariants = (animation, duration) => {
  const baseTransition = {
    duration,
    ease: [0.25, 0.1, 0.25, 1.0],
  };

  const variants = {
    [ANIMATIONS.FADE_IN]: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: baseTransition },
    },
    [ANIMATIONS.FADE_UP]: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: baseTransition },
    },
    [ANIMATIONS.FADE_DOWN]: {
      hidden: { opacity: 0, y: -50 },
      visible: { opacity: 1, y: 0, transition: baseTransition },
    },
    [ANIMATIONS.FADE_LEFT]: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0, transition: baseTransition },
    },
    [ANIMATIONS.FADE_RIGHT]: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0, transition: baseTransition },
    },
    [ANIMATIONS.ZOOM_IN]: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1, transition: baseTransition },
    },
    [ANIMATIONS.ZOOM_OUT]: {
      hidden: { opacity: 0, scale: 1.2 },
      visible: { opacity: 1, scale: 1, transition: baseTransition },
    },
    [ANIMATIONS.SLIDE_UP]: {
      hidden: { y: 100 },
      visible: { y: 0, transition: baseTransition },
    },
    [ANIMATIONS.SLIDE_DOWN]: {
      hidden: { y: -100 },
      visible: { y: 0, transition: baseTransition },
    },
    [ANIMATIONS.SLIDE_LEFT]: {
      hidden: { x: -100 },
      visible: { x: 0, transition: baseTransition },
    },
    [ANIMATIONS.SLIDE_RIGHT]: {
      hidden: { x: 100 },
      visible: { x: 0, transition: baseTransition },
    },
  };

  return variants[animation] || variants[ANIMATIONS.FADE_IN];
};

const AnimatedSection = ({
  children,
  animation = ANIMATIONS.FADE_IN,
  delay = 0,
  duration = 0.8,
  threshold = 0.2,
  className = '',
  once = true,
  disabled = false,
  as = 'div',
  style = {},
  ...props
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: once,
  });

  useEffect(() => {
    if (inView && !disabled) {
      controls.start('visible');
    } else if (!inView && !once && !disabled) {
      controls.start('hidden');
    }
  }, [controls, inView, once, disabled]);

  const variants = getAnimationVariants(animation, duration);
  
  if (delay) {
    variants.visible = {
      ...variants.visible,
      transition: {
        ...variants.visible.transition,
        delay,
      },
    };
  }

  if (disabled) {
    return (
      <StyledAnimatedSection
        as={as}
        className={className}
        style={style}
        {...props}
      >
        {children}
      </StyledAnimatedSection>
    );
  }

  return (
    <StyledAnimatedSection
      ref={ref}
      as={as}
      className={className}
      initial="hidden"
      animate={controls}
      variants={variants}
      style={style}
      {...props}
    >
      {children}
    </StyledAnimatedSection>
  );
};

AnimatedSection.propTypes = {
  children: PropTypes.node.isRequired,
  animation: PropTypes.oneOf(Object.values(ANIMATIONS)),
  delay: PropTypes.number,
  duration: PropTypes.number,
  threshold: PropTypes.number,
  className: PropTypes.string,
  once: PropTypes.bool,
  disabled: PropTypes.bool,
  as: PropTypes.string,
  style: PropTypes.object,
};

export default AnimatedSection;