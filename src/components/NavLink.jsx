import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledNavLink = styled(motion.div)`
  position: relative;
  margin: 0 0.5rem;
  
  @media (max-width: 768px) {
    margin: 0.5rem 0;
  }
`;

const StyledLink = styled(Link)`
  color: ${({ theme, active }) => (active ? theme.primary : theme.text)};
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  transition: color 0.3s ease;
  display: inline-block;
  position: relative;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
  
  &::after {
    content: '';
    position: absolute;
    width: ${({ active }) => (active ? '100%' : '0')};
    height: 2px;
    bottom: 0;
    left: 0;
    background: linear-gradient(to right, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
    transition: width 0.3s ease;
    border-radius: 1px;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const Indicator = styled(motion.div)`
  position: absolute;
  height: 2px;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to right, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  border-radius: 1px;
`;

const NavLink = ({
  to,
  label,
  offset = -70,
  duration = 500,
  spy = true,
  smooth = true,
  exact = true,
  activeClass = 'active',
  onClick,
  isMobile = false,
  currentSection,
  theme
}) => {
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    setIsActive(currentSection === to);
  }, [currentSection, to]);
  
  const linkVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };
  
  const indicatorVariants = {
    initial: { width: 0, opacity: 0 },
    active: { width: '100%', opacity: 1 },
    inactive: { width: 0, opacity: 0 }
  };
  
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };
  
  return (
    <StyledNavLink
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      variants={linkVariants}
      transition={{ duration: 0.3 }}
    >
      <StyledLink
        to={to}
        spy={spy}
        smooth={smooth}
        offset={offset}
        duration={duration}
        activeClass={activeClass}
        onClick={handleClick}
        active={isActive}
        theme={theme}
      >
        {label}
      </StyledLink>
      
      <Indicator
        initial="initial"
        animate={isActive ? "active" : "inactive"}
        variants={indicatorVariants}
        transition={{ duration: 0.3 }}
        theme={theme}
      />
    </StyledNavLink>
  );
};

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  offset: PropTypes.number,
  duration: PropTypes.number,
  spy: PropTypes.bool,
  smooth: PropTypes.bool,
  exact: PropTypes.bool,
  activeClass: PropTypes.string,
  onClick: PropTypes.func,
  isMobile: PropTypes.bool,
  currentSection: PropTypes.string,
  theme: PropTypes.object
};

export default NavLink;