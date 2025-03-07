import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TagContainer = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 0.8rem;
  margin: 0.3rem;
  border-radius: 2rem;
  font-size: 0.85rem;
  font-weight: 500;
  background-color: ${({ theme, color }) => color || theme.tagBackground};
  color: ${({ theme, textColor }) => textColor || theme.tagText};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  cursor: default;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  svg {
    margin-right: 0.4rem;
    font-size: 1rem;
  }
`;

const tagVariants = {
  initial: { 
    opacity: 0, 
    scale: 0.8 
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  hover: { 
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  },
  tap: { 
    scale: 0.95 
  }
};

const TechTag = ({ 
  children, 
  icon, 
  color, 
  textColor, 
  delay = 0, 
  onClick, 
  className = '' 
}) => {
  return (
    <TagContainer
      as={motion.span}
      color={color}
      textColor={textColor}
      className={className}
      variants={tagVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      transition={{ delay }}
      onClick={onClick}
    >
      {icon && icon}
      {children}
    </TagContainer>
  );
};

TechTag.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.node,
  color: PropTypes.string,
  textColor: PropTypes.string,
  delay: PropTypes.number,
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default TechTag;