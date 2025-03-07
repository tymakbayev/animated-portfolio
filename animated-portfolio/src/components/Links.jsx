import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AnimatedSection, { ANIMATIONS } from './Animation/AnimatedSection';

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const LinkItem = styled(motion.a)`
  display: flex;
  align-items: center;
  padding: 1.25rem 1.5rem;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 0.75rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
    background-color: ${({ theme }) => theme.cardBackgroundHover};
  }
  
  @media (max-width: 768px) {
    padding: 1rem 1.25rem;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(45deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  margin-right: 1.25rem;
  flex-shrink: 0;
  
  svg {
    width: 24px;
    height: 24px;
    color: white;
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const LinkContent = styled.div`
  flex: 1;
`;

const LinkTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.25rem;
  color: ${({ theme }) => theme.textPrimary};
`;

const LinkDescription = styled.p`
  font-size: 0.9rem;
  margin: 0;
  color: ${({ theme }) => theme.textSecondary};
`;

const ArrowIcon = styled(motion.div)`
  margin-left: 1rem;
  
  svg {
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2.5rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(to right, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
    border-radius: 2px;
  }
`;

const SectionContainer = styled.section`
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const Links = ({ title = "Important Links", links = [] }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const defaultLinks = [
    {
      id: 1,
      title: "GitHub Profile",
      description: "Check out my open source projects and contributions",
      url: "https://github.com/username",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      ),
    },
    {
      id: 2,
      title: "LinkedIn",
      description: "Connect with me professionally",
      url: "https://linkedin.com/in/username",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      ),
    },
    {
      id: 3,
      title: "Twitter",
      description: "Follow me for updates and tech discussions",
      url: "https://twitter.com/username",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
        </svg>
      ),
    },
    {
      id: 4,
      title: "Portfolio",
      description: "View my complete portfolio and case studies",
      url: "#projects",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      ),
    },
  ];

  const displayLinks = links.length > 0 ? links : defaultLinks;

  const arrowVariants = {
    initial: { x: 0 },
    hover: { x: 5, transition: { duration: 0.3, ease: "easeInOut" } }
  };

  return (
    <SectionContainer id="links">
      <AnimatedSection animation={ANIMATIONS.FADE_UP}>
        <SectionTitle>{title}</SectionTitle>
      </AnimatedSection>
      
      <LinksContainer>
        {displayLinks.map((link, index) => (
          <AnimatedSection 
            key={link.id} 
            animation={ANIMATIONS.FADE_UP} 
            delay={index * 0.1}
          >
            <LinkItem 
              href={link.url}
              target={link.url.startsWith('http') ? "_blank" : "_self"}
              rel={link.url.startsWith('http') ? "noopener noreferrer" : ""}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <IconWrapper>
                {link.icon}
              </IconWrapper>
              <LinkContent>
                <LinkTitle>{link.title}</LinkTitle>
                <LinkDescription>{link.description}</LinkDescription>
              </LinkContent>
              <ArrowIcon
                variants={arrowVariants}
                initial="initial"
                animate={hoveredIndex === index ? "hover" : "initial"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </ArrowIcon>
            </LinkItem>
          </AnimatedSection>
        ))}
      </LinksContainer>
    </SectionContainer>
  );
};

Links.propTypes = {
  title: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
    })
  ),
};

export default Links;