import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const MenuButtonContainer = styled.button`
  display: none;
  position: relative;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 100;
  padding: 0;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  &:focus {
    outline: none;
  }
`;

const ButtonWrapper = styled(motion.div)`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Line = styled(motion.div)`
  position: absolute;
  width: 24px;
  height: 2px;
  background-color: ${({ theme }) => theme.text};
  border-radius: 2px;
  transition: background-color 0.3s ease;
`;

const MobileMenuButton = ({ isOpen, toggleMenu, theme }) => {
  const [animationComplete, setAnimationComplete] = useState(true);
  
  useEffect(() => {
    setAnimationComplete(false);
    
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 400);
    
    return () => clearTimeout(timer);
  }, [isOpen]);
  
  const topLineVariants = {
    closed: { 
      y: -6,
      rotate: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    open: { 
      y: 0,
      rotate: 45,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };
  
  const middleLineVariants = {
    closed: { 
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    open: { 
      opacity: 0,
      transition: { duration: 0.1, ease: "easeInOut" }
    }
  };
  
  const bottomLineVariants = {
    closed: { 
      y: 6,
      rotate: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    open: { 
      y: 0,
      rotate: -45,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };
  
  const buttonVariants = {
    hover: { 
      scale: 1.1,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };
  
  const handleClick = () => {
    if (animationComplete) {
      toggleMenu();
    }
  };
  
  return (
    <MenuButtonContainer 
      onClick={handleClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <ButtonWrapper
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <Line
          variants={topLineVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
        />
        <Line
          variants={middleLineVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
        />
        <Line
          variants={bottomLineVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
        />
      </ButtonWrapper>
    </MenuButtonContainer>
  );
};

MobileMenuButton.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  theme: PropTypes.object
};

export default MobileMenuButton;