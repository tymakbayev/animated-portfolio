import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { gsap } from 'gsap';

const OverlayContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  pointer-events: ${({ isActive }) => (isActive ? 'all' : 'none')};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OverlayBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.overlayBackground};
  backdrop-filter: blur(8px);
`;

const OverlayContent = styled(motion.div)`
  position: relative;
  z-index: 1001;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.cardBackground};
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 2rem;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1002;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 1.5rem;
    height: 2px;
    background-color: ${({ theme }) => theme.text};
    transition: background-color 0.3s ease;
  }
  
  &::before {
    transform: rotate(45deg);
  }
  
  &::after {
    transform: rotate(-45deg);
  }
  
  &:hover::before,
  &:hover::after {
    background-color: ${({ theme }) => theme.primary};
  }
`;

const overlayVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
      when: 'afterChildren',
    },
  },
};

const backgroundVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const contentVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
};

const Overlay = ({ 
  isOpen, 
  onClose, 
  children, 
  closeOnBackdropClick = true,
  animationDuration = 0.4,
  customContentVariants = null,
  customBackgroundVariants = null,
  className = '',
  contentClassName = '',
}) => {
  const { theme } = useTheme();
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setIsActive(true);
      document.body.style.overflow = 'hidden';
      
      // Add animation for page elements when overlay opens
      gsap.to('.page-content', {
        filter: 'blur(3px)',
        scale: 0.98,
        duration: 0.3,
        ease: 'power2.out',
      });
    } else {
      document.body.style.overflow = '';
      
      // Reverse animation when overlay closes
      gsap.to('.page-content', {
        filter: 'blur(0px)',
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
      
      // Delay setting isActive to false until animation completes
      const timer = setTimeout(() => {
        setIsActive(false);
      }, animationDuration * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, animationDuration]);
  
  const handleBackdropClick = useCallback((e) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  }, [closeOnBackdropClick, onClose]);
  
  const handleEscapeKey = useCallback((e) => {
    if (e.key === 'Escape' && isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);
  
  useEffect(() => {
    window.addEventListener('keydown', handleEscapeKey);
    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [handleEscapeKey]);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <OverlayContainer
          className={className}
          isActive={isActive}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleBackdropClick}
        >
          <OverlayBackground
            theme={theme}
            variants={customBackgroundVariants || backgroundVariants}
          />
          <OverlayContent
            theme={theme}
            className={contentClassName}
            variants={customContentVariants || contentVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton
              theme={theme}
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Close overlay"
            />
            {children}
          </OverlayContent>
        </OverlayContainer>
      )}
    </AnimatePresence>
  );
};

export default Overlay;