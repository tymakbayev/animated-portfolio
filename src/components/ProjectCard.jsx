import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  
  &::after {
    content: ${props => props['data-featured'] === 'true' ? "'Featured'" : "''"};
    position: ${props => props['data-featured'] === 'true' ? 'absolute' : 'static'};
    top: 10px;
    right: 10px;
    background: ${({ theme }) => theme.accentColor};
    color: white;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    z-index: 5;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 220px;
  overflow: hidden;
  position: relative;
`;

const ProjectImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const Content = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textPrimary};
`;

const Description = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 1rem;
  flex: 1;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled(motion.span)`
  background: ${({ theme }) => theme.tagBackground};
  color: ${({ theme }) => theme.tagText};
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const Links = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
`;

const LinkButton = styled(motion.a)`
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &.primary {
    background: ${({ theme }) => theme.buttonPrimary};
    color: white;
    
    &:hover {
      background: ${({ theme }) => theme.buttonPrimaryHover};
    }
  }
  
  &.secondary {
    background: transparent;
    color: ${({ theme }) => theme.buttonSecondary};
    border: 1px solid ${({ theme }) => theme.buttonSecondary};
    
    &:hover {
      background: ${({ theme }) => theme.buttonSecondaryHover};
    }
  }
`;

const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  z-index: 10;
`;

const ViewDetails = styled(motion.button)`
  background: white;
  color: #333;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
`;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: { 
    y: -10,
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.3 
    }
  }
};

const ProjectCard = ({ project, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  const handleHover = (hovered) => {
    setIsHovered(hovered);
    if (hovered) {
      controls.start({
        scale: 1.05,
        transition: { duration: 0.3 }
      });
    } else {
      controls.start({
        scale: 1,
        transition: { duration: 0.3 }
      });
    }
  };

  const handleCardClick = (e) => {
    if (onClick && !e.target.closest('a')) {
      onClick(project);
    }
  };

  return (
    <Card
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      onHoverStart={() => handleHover(true)}
      onHoverEnd={() => handleHover(false)}
      layoutId={`project-${project.id}`}
      onClick={handleCardClick}
      data-featured={project.featured ? 'true' : 'false'}
    >
      <ImageContainer>
        <ProjectImage 
          src={project.image} 
          alt={project.title}
          animate={controls}
        />
        <Overlay
          variants={overlayVariants}
          initial="hidden"
          animate={isHovered ? "visible" : "hidden"}
        >
          <ViewDetails
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onClick && onClick(project)}
          >
            View Details
          </ViewDetails>
        </Overlay>
      </ImageContainer>
      
      <Content>
        <Title>{project.title}</Title>
        <Description>{project.description}</Description>
        
        <TechStack>
          {project.technologies.map((tech, index) => (
            <TechTag 
              key={index}
              whileHover={{ scale: 1.1 }}
            >
              {tech}
            </TechTag>
          ))}
        </TechStack>
        
        <Links>
          {project.liveUrl && (
            <LinkButton 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Live
            </LinkButton>
          )}
          
          {project.codeUrl && (
            <LinkButton 
              href={project.codeUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Code
            </LinkButton>
          )}
        </Links>
      </Content>
    </Card>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
    liveUrl: PropTypes.string,
    codeUrl: PropTypes.string,
    featured: PropTypes.bool
  }).isRequired,
  onClick: PropTypes.func
};

export default ProjectCard;