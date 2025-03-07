import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-scroll';

const StyledButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ size }) => 
    size === 'large' ? '1rem 2.5rem' : 
    size === 'small' ? '0.5rem 1rem' : 
    '0.75rem 1.5rem'};
  font-size: ${({ size }) => 
    size === 'large' ? '1.1rem' : 
    size === 'small' ? '0.85rem' : 
    '1rem'};
  font-weight: 600;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
  text-decoration: none;
  
  background: ${({ variant, theme }) => 
    variant === 'primary' ? `linear-gradient(45deg, ${theme.primary}, ${theme.secondary})` :
    variant === 'secondary' ? theme.backgroundSecondary :
    variant === 'outline' ? 'transparent' :
    `linear-gradient(45deg, ${theme.primary}, ${theme.secondary})`};
  
  color: ${({ variant, theme }) => 
    variant === 'primary' ? theme.buttonText :
    variant === 'secondary' ? theme.text :
    variant === 'outline' ? theme.primary :
    theme.buttonText};
  
  box-shadow: ${({ variant, theme }) => 
    variant === 'primary' ? '0 10px 20px rgba(0, 0, 0, 0.1)' :
    variant === 'secondary' ? '0 5px 15px rgba(0, 0, 0, 0.05)' :
    'none'};
  
  border: ${({ variant, theme }) => 
    variant === 'outline' ? `2px solid ${theme.primary}` : 'none'};
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ variant, theme }) => 
      variant === 'primary' ? '0 15px 25px rgba(0, 0, 0, 0.15)' :
      variant === 'secondary' ? '0 8px 20px rgba(0, 0, 0, 0.08)' :
      variant === 'outline' ? '0 5px 15px rgba(0, 0, 0, 0.05)' :
      '0 15px 25px rgba(0, 0, 0, 0.15)'};
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ variant, theme }) => 
      variant === 'primary' ? 'rgba(255, 255, 255, 0.15)' :
      variant === 'secondary' ? 'rgba(0, 0, 0, 0.05)' :
      variant === 'outline' ? 'rgba(0, 0, 0, 0.05)' :
      'rgba(255, 255, 255, 0.15)'};
    z-index: -1;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.5s ease;
  }
  
  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
  
  svg {
    margin-right: ${({ iconPosition }) => iconPosition === 'left' ? '0.5rem' : '0'};
    margin-left: ${({ iconPosition }) => iconPosition === 'right' ? '0.5rem' : '0'};
    font-size: ${({ size }) => 
      size === 'large' ? '1.3rem' : 
      size === 'small' ? '0.9rem' : 
      '1.1rem'};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    
    &:hover {
      transform: none;
      box-shadow: none;
    }
    
    &::after {
      display: none;
    }
  }
`;

const StyledLink = styled(StyledButton).attrs({ as: motion.div })`
  display: inline-flex;
`;

const LinkButton = ({
  children,
  to,
  href,
  variant = 'primary',
  size = 'medium',
  icon = null,
  iconPosition = 'left',
  disabled = false,
  onClick,
  className = '',
  style = {},
  smooth = true,
  duration = 800,
  offset = -80,
  ...props
}) => {
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.03 },
    tap: { scale: 0.98 },
  };

  const renderIcon = () => {
    if (!icon) return null;
    return React.cloneElement(icon, {
      style: { 
        order: iconPosition === 'right' ? 2 : 0,
      }
    });
  };

  const renderContent = () => (
    <>
      {iconPosition === 'left' && renderIcon()}
      <span style={{ order: 1 }}>{children}</span>
      {iconPosition === 'right' && renderIcon()}
    </>
  );

  // If it's an internal link using react-scroll
  if (to) {
    return (
      <Link
        to={to}
        smooth={smooth}
        duration={duration}
        offset={offset}
        style={{ display: 'inline-block' }}
      >
        <StyledLink
          as={motion.div}
          variant={variant}
          size={size}
          iconPosition={iconPosition}
          className={className}
          style={style}
          onClick={onClick}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          {...props}
        >
          {renderContent()}
        </StyledLink>
      </Link>
    );
  }

  // If it's an external link
  if (href) {
    return (
      <StyledButton
        as={motion.a}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        variant={variant}
        size={size}
        iconPosition={iconPosition}
        disabled={disabled}
        className={className}
        style={style}
        onClick={onClick}
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        {...props}
      >
        {renderContent()}
      </StyledButton>
    );
  }

  // Regular button
  return (
    <StyledButton
      as={motion.button}
      variant={variant}
      size={size}
      iconPosition={iconPosition}
      disabled={disabled}
      className={className}
      style={style}
      onClick={onClick}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      {...props}
    >
      {renderContent()}
    </StyledButton>
  );
};

LinkButton.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  href: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  icon: PropTypes.element,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  smooth: PropTypes.bool,
  duration: PropTypes.number,
  offset: PropTypes.number,
};

export default LinkButton;