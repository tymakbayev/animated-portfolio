import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';

const ToggleContainer = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme, isAtTop }) => 
      isAtTop ? 'rgba(255, 255, 255, 0.1)' : theme.backgroundHover};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary};
  }
`;

const IconContainer = styled(motion.div)`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, isAtTop }) => 
    isAtTop ? theme.textLight : theme.text};
`;

const SunIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 1V3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 21V23"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.22 4.22L5.64 5.64"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.36 18.36L19.78 19.78"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1 12H3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 12H23"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.22 19.78L5.64 18.36"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.36 5.64L19.78 4.22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MoonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ThemeToggle = ({ isAtTop = false }) => {
  const { theme, toggleTheme } = useTheme();
  
  const iconVariants = {
    initial: { 
      y: -20, 
      opacity: 0,
      rotate: -45
    },
    animate: { 
      y: 0, 
      opacity: 1,
      rotate: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      }
    },
    exit: { 
      y: 20, 
      opacity: 0,
      rotate: 45,
      transition: { 
        duration: 0.3, 
        ease: "easeIn" 
      }
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && savedTheme !== theme) {
      toggleTheme();
    }
  }, []);

  const handleToggle = () => {
    toggleTheme();
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ToggleContainer 
      onClick={handleToggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      isAtTop={isAtTop}
    >
      <AnimatePresence mode="wait">
        <IconContainer
          key={theme}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={iconVariants}
          isAtTop={isAtTop}
        >
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </IconContainer>
      </AnimatePresence>
    </ToggleContainer>
  );
};

export default ThemeToggle;