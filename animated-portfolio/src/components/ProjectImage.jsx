import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AnimatedSection, { ANIMATIONS } from './Animation/AnimatedSection';
import { ParallaxEffect } from './Animation/ParallaxEffect';

const ImageWrapper = styled(motion.div)`
  position: relative;
  overflow: hidden;
  border-radius: ${({ borderRadius }) => borderRadius || '0.75rem'};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    
    img {
      transform: scale(1.05);
    }
    
    .overlay {
      opacity: 1;
    }
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  display: block;
`;

const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.7)
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  &.visible {
    opacity: 1;
  }
`;

const ImageTitle = styled.h3`
  color: #fff;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const ImageDescription = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  margin: 0;
`;

const ExpandedImageContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ExpandedImage = styled(motion.img)`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  border-radius: 0.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: transparent;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1001;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const ProjectImage = ({
  src,
  alt,
  title,
  description,
  borderRadius,
  aspectRatio = '16/9',
  animation = ANIMATIONS.FADE_UP,
  delay = 0,
  parallax = false,
  parallaxSpeed = 0.5,
  expandable = true,
  className = '',
  onClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  const imageRef = useRef(null);
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  const handleImageClick = (e) => {
    if (expandable) {
      setIsExpanded(true);
      document.body.style.overflow = 'hidden';
    }
    
    if (onClick) {
      onClick(e);
    }
  };
  
  const handleClose = () => {
    setIsExpanded(false);
    document.body.style.overflow = 'auto';
  };
  
  const handleMouseEnter = () => {
    setShowOverlay(true);
  };
  
  const handleMouseLeave = () => {
    setShowOverlay(false);
  };
  
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay,
      },
    },
  };
  
  const expandedVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      },
    },
  };
  
  const renderImage = () => (
    <ImageWrapper
      ref={ref}
      borderRadius={borderRadius}
      className={className}
      initial="hidden"
      animate={controls}
      variants={variants}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleImageClick}
      style={{ aspectRatio }}
    >
      <Image src={src} alt={alt} ref={imageRef} />
      {(title || description) && (
        <Overlay className={showOverlay ? 'visible' : ''}>
          {title && <ImageTitle>{title}</ImageTitle>}
          {description && <ImageDescription>{description}</ImageDescription>}
        </Overlay>
      )}
    </ImageWrapper>
  );
  
  return (
    <>
      {parallax ? (
        <ParallaxEffect speed={parallaxSpeed}>
          {renderImage()}
        </ParallaxEffect>
      ) : (
        <AnimatedSection animation={animation} delay={delay}>
          {renderImage()}
        </AnimatedSection>
      )}
      
      {isExpanded && (
        <ExpandedImageContainer
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={expandedVariants}
          onClick={handleClose}
        >
          <CloseButton onClick={handleClose}>&times;</CloseButton>
          <ExpandedImage
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          />
        </ExpandedImageContainer>
      )}
    </>
  );
};

ProjectImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  borderRadius: PropTypes.string,
  aspectRatio: PropTypes.string,
  animation: PropTypes.oneOf(Object.values(ANIMATIONS)),
  delay: PropTypes.number,
  parallax: PropTypes.bool,
  parallaxSpeed: PropTypes.number,
  expandable: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default ProjectImage;