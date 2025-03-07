import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CardContainer = styled(motion.div)`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  
  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  }
`;

const CardHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

const CardTitle = styled.h3`
  font-size: 1.4rem;
  margin: 0;
  font-weight: 600;
  color: ${({ theme }) => theme.textPrimary};
`;

const CardSubtitle = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0.5rem 0 0;
`;

const CardContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.textPrimary};
`;

const CardFooter = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardButton = styled(motion.button)`
  background: ${({ primary, theme }) => primary ? theme.primaryColor : 'transparent'};
  color: ${({ primary, theme }) => primary ? 'white' : theme.primaryColor};
  border: ${({ primary, theme }) => primary ? 'none' : `1px solid ${theme.primaryColor}`};
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ primary, theme }) => primary ? theme.primaryColorHover : theme.backgroundHover};
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: ${({ height }) => height || '200px'};
  object-fit: cover;
`;

const CardBadge = styled(motion.span)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${({ variant, theme }) => 
    variant === 'success' ? theme.successColor : 
    variant === 'warning' ? theme.warningColor : 
    variant === 'error' ? theme.errorColor : 
    theme.primaryColor};
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  z-index: 2;
`;

const CardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const CardTag = styled(motion.span)`
  background: ${({ theme }) => theme.tagBackground};
  color: ${({ theme }) => theme.tagText};
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const Card = ({
  title,
  subtitle,
  image,
  imageHeight,
  children,
  badge,
  badgeVariant,
  tags,
  primaryAction,
  secondaryAction,
  onPrimaryClick,
  onSecondaryClick,
  animate = true,
  className,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { y: -10, transition: { duration: 0.3 } }
  };

  const badgeVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.2 } }
  };

  const tagVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.2 } }
  };

  return (
    <CardContainer
      className={className}
      initial={animate ? "hidden" : "visible"}
      animate={animate ? "visible" : "visible"}
      whileHover={animate ? "hover" : ""}
      variants={cardVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      {...props}
    >
      {badge && (
        <CardBadge 
          variant={badgeVariant}
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
          variants={badgeVariants}
        >
          {badge}
        </CardBadge>
      )}
      
      {image && <CardImage src={image} alt={title} height={imageHeight} />}
      
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
        </CardHeader>
      )}
      
      <CardContent>
        {children}
        
        {tags && tags.length > 0 && (
          <CardTags>
            {tags.map((tag, index) => (
              <CardTag 
                key={index}
                initial="initial"
                whileHover="hover"
                variants={tagVariants}
              >
                {tag}
              </CardTag>
            ))}
          </CardTags>
        )}
      </CardContent>
      
      {(primaryAction || secondaryAction) && (
        <CardFooter>
          {secondaryAction && (
            <CardButton 
              onClick={onSecondaryClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {secondaryAction}
            </CardButton>
          )}
          
          {primaryAction && (
            <CardButton 
              primary
              onClick={onPrimaryClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {primaryAction}
            </CardButton>
          )}
        </CardFooter>
      )}
    </CardContainer>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  image: PropTypes.string,
  imageHeight: PropTypes.string,
  children: PropTypes.node,
  badge: PropTypes.string,
  badgeVariant: PropTypes.oneOf(['success', 'warning', 'error', 'default']),
  tags: PropTypes.arrayOf(PropTypes.string),
  primaryAction: PropTypes.string,
  secondaryAction: PropTypes.string,
  onPrimaryClick: PropTypes.func,
  onSecondaryClick: PropTypes.func,
  animate: PropTypes.bool,
  className: PropTypes.string
};

export default Card;