import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styled from 'styled-components';

const Card = styled(motion.div)`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
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
  color: #333;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666;
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
  background: #f0f4f8;
  color: #5c6bc0;
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
    background: #5c6bc0;
    color: white;
  }
  
  &.secondary {
    background: transparent;
    color: #5c6bc0;
    border: 1px solid #5c6bc0;
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

const ProjectCard = ({ project }) => {
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

  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10 }}
      onHoverStart={() => handleHover(true)}
      onHoverEnd={() => handleHover(false)}
      layoutId={`project-${project.id}`}
    >
      <ImageContainer>
        <ProjectImage 
          src={project.image} 
          alt={project.title}
          animate={controls}
        />
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ViewDetails
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
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
              whileHover={{ scale: 1.1, backgroundColor: '#e6e9f5' }}
            >
              {tech}
            </TechTag>
          ))}
        </TechStack>
        
        <Links>
          <LinkButton 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Live Demo
          </LinkButton>
          
          <LinkButton 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            GitHub
          </LinkButton>
        </Links>
      </Content>
    </Card>
  );
};

export default ProjectCard;
