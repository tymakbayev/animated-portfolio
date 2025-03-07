import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AnimatedSection, { ANIMATIONS } from './Animation/AnimatedSection';

const StyledImageContainer = styled(motion.div)`
  position: relative;
  border-radius: ${({ borderRadius }) => borderRadius || '1rem'};
  overflow: hidden;
  box-shadow: ${({ shadow }) => shadow || '0 20px 40px rgba(0, 0, 0, 0.15)'};
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || 'auto'};
  margin: ${({ margin }) => margin || '0'};
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: ${({ gradient, theme }) => 
      gradient || `linear-gradient(45deg, ${theme.primary}, ${theme.secondary})`};
    z-index: -1;
    border-radius: ${({ borderRadius }) => 
      borderRadius ? `calc(${borderRadius} + 0.1rem)` : '1.1rem'};
    opacity: ${({ showGradientBorder }) => showGradientBorder ? 1 : 0};
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: ${({ hoverEffect, showGradientBorder }) => 
      hoverEffect && showGradientBorder ? 1 : (showGradientBorder ? 1 : 0)};
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: ${({ objectFit }) => objectFit || 'cover'};
    display: block;
    border-radius: ${({ borderRadius }) => borderRadius || '1rem'};
    transition: transform ${({ transitionDuration }) => transitionDuration || '0.5s'} ease;
    
    &:hover {
      transform: ${({ hoverEffect, hoverScale }) => 
        hoverEffect ? `scale(${hoverScale || 1.03})` : 'none'};
    }
  }
`;

const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ overlayColor }) => overlayColor || 'rgba(0, 0, 0, 0.3)'};
  opacity: ${({ initialOpacity }) => initialOpacity || 0};
  transition: opacity 0.3s ease;
  display: flex;
  align-items: ${({ overlayAlign }) => overlayAlign || 'center'};
  justify-content: ${({ overlayJustify }) => overlayJustify || 'center'};
  padding: ${({ overlayPadding }) => overlayPadding || '1.5rem'};
  
  ${StyledImageContainer}:hover & {
    opacity: ${({ hoverOpacity }) => hoverOpacity || 1};
  }
`;

const Caption = styled(motion.div)`
  color: ${({ captionColor }) => captionColor || '#fff'};
  text-align: ${({ captionAlign }) => captionAlign || 'center'};
  
  h3 {
    font-size: ${({ titleSize }) => titleSize || '1.5rem'};
    margin-bottom: 0.5rem;
    font-weight: 600;
  }
  
  p {
    font-size: ${({ descSize }) => descSize || '1rem'};
    line-height: 1.6;
    margin: 0;
  }
`;

const ImageContainer = ({
  src,
  alt,
  width,
  height,
  margin,
  borderRadius,
  shadow,
  objectFit,
  hoverEffect = true,
  hoverScale = 1.03,
  showGradientBorder = true,
  gradient,
  transitionDuration = '0.5s',
  overlay = false,
  overlayColor,
  initialOpacity = 0,
  hoverOpacity = 1,
  overlayAlign = 'center',
  overlayJustify = 'center',
  overlayPadding = '1.5rem',
  caption,
  captionTitle,
  captionDescription,
  captionColor = '#fff',
  captionAlign = 'center',
  titleSize = '1.5rem',
  descSize = '1rem',
  animation = ANIMATIONS.FADE_IN,
  animationDelay = 0,
  animationDuration = 0.8,
  className,
  onClick,
  ...props
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  const imageRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  useEffect(() => {
    if (imageRef.current && imageRef.current.complete) {
      setIsLoaded(true);
    }
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: animationDuration,
        delay: animationDelay,
        ease: "easeOut"
      }
    }
  };

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <AnimatedSection
      animation={animation}
      delay={animationDelay}
      duration={animationDuration}
      className={className}
    >
      <StyledImageContainer
        ref={ref}
        width={width}
        height={height}
        margin={margin}
        borderRadius={borderRadius}
        shadow={shadow}
        objectFit={objectFit}
        hoverEffect={hoverEffect}
        hoverScale={hoverScale}
        showGradientBorder={showGradientBorder}
        gradient={gradient}
        transitionDuration={transitionDuration}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        onClick={onClick}
        {...props}
      >
        <img 
          ref={imageRef}
          src={src} 
          alt={alt} 
          onLoad={handleImageLoad}
          style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
        />
        
        {overlay && isLoaded && (
          <Overlay
            overlayColor={overlayColor}
            initialOpacity={initialOpacity}
            hoverOpacity={hoverOpacity}
            overlayAlign={overlayAlign}
            overlayJustify={overlayJustify}
            overlayPadding={overlayPadding}
          >
            {caption && (
              <Caption
                captionColor={captionColor}
                captionAlign={captionAlign}
                titleSize={titleSize}
                descSize={descSize}
              >
                {captionTitle && <h3>{captionTitle}</h3>}
                {captionDescription && <p>{captionDescription}</p>}
                {typeof caption === 'function' ? caption() : caption}
              </Caption>
            )}
          </Overlay>
        )}
      </StyledImageContainer>
    </AnimatedSection>
  );
};

ImageContainer.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  margin: PropTypes.string,
  borderRadius: PropTypes.string,
  shadow: PropTypes.string,
  objectFit: PropTypes.string,
  hoverEffect: PropTypes.bool,
  hoverScale: PropTypes.number,
  showGradientBorder: PropTypes.bool,
  gradient: PropTypes.string,
  transitionDuration: PropTypes.string,
  overlay: PropTypes.bool,
  overlayColor: PropTypes.string,
  initialOpacity: PropTypes.number,
  hoverOpacity: PropTypes.number,
  overlayAlign: PropTypes.string,
  overlayJustify: PropTypes.string,
  overlayPadding: PropTypes.string,
  caption: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  captionTitle: PropTypes.string,
  captionDescription: PropTypes.string,
  captionColor: PropTypes.string,
  captionAlign: PropTypes.string,
  titleSize: PropTypes.string,
  descSize: PropTypes.string,
  animation: PropTypes.oneOf(Object.values(ANIMATIONS)),
  animationDelay: PropTypes.number,
  animationDuration: PropTypes.number,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default ImageContainer;