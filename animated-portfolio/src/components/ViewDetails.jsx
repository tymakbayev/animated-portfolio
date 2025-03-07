import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AnimatedSection, { ANIMATIONS } from './Animation/AnimatedSection';
import { ParallaxEffect } from './Animation/ParallaxEffect';
import LinkButton from './LinkButton';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding: 2rem;
`;

const DetailsContainer = styled(motion.div)`
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  border-radius: 1rem;
  width: 100%;
  max-width: 1000px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    max-height: 85vh;
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
  overflow: hidden;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;

  @media (max-width: 768px) {
    height: 250px;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.7) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
`;

const ProjectTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const ProjectCategory = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
`;

const ContentSection = styled.div`
  padding: 2rem;
`;

const Description = styled.div`
  margin-bottom: 2rem;
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.textSecondary};
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 40px;
    height: 3px;
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.primary},
      ${({ theme }) => theme.secondary}
    );
    border-radius: 1.5px;
  }
`;

const TechStackContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

const TechTag = styled.span`
  background-color: ${({ theme }) => theme.backgroundSecondary};
  color: ${({ theme }) => theme.textSecondary};
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.9rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const FeaturesList = styled.ul`
  margin-bottom: 2rem;
  padding-left: 1.5rem;

  li {
    margin-bottom: 0.75rem;
    position: relative;
    padding-left: 0.5rem;
    color: ${({ theme }) => theme.textSecondary};
    line-height: 1.6;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const GalleryImage = styled.div`
  height: 180px;
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ViewDetails = ({ project, isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!project) return null;

  const {
    title,
    category,
    image,
    description,
    longDescription,
    techStack,
    features,
    liveUrl,
    githubUrl,
    gallery = []
  } = project;

  const handleImageClick = (img) => {
    setSelectedImage(img);
  };

  const closeImageView = () => {
    setSelectedImage(null);
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const containerVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring',
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      y: 50, 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <DetailsContainer
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              ✕
            </CloseButton>
            
            <ImageContainer>
              <ParallaxEffect speed={-5}>
                <ProjectImage src={image} alt={title} />
              </ParallaxEffect>
              <ImageOverlay>
                <ProjectTitle>{title}</ProjectTitle>
                <ProjectCategory>{category}</ProjectCategory>
              </ImageOverlay>
            </ImageContainer>
            
            <ContentSection>
              <AnimatedSection animation={ANIMATIONS.FADE_UP} delay={0.1}>
                <Description>
                  {longDescription || description}
                </Description>
              </AnimatedSection>
              
              <AnimatedSection animation={ANIMATIONS.FADE_UP} delay={0.2}>
                <SectionTitle>Technologies</SectionTitle>
                <TechStackContainer>
                  {techStack.map((tech, index) => (
                    <TechTag key={index}>{tech}</TechTag>
                  ))}
                </TechStackContainer>
              </AnimatedSection>
              
              {features && features.length > 0 && (
                <AnimatedSection animation={ANIMATIONS.FADE_UP} delay={0.3}>
                  <SectionTitle>Key Features</SectionTitle>
                  <FeaturesList>
                    {features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </FeaturesList>
                </AnimatedSection>
              )}
              
              {gallery && gallery.length > 0 && (
                <AnimatedSection animation={ANIMATIONS.FADE_UP} delay={0.4}>
                  <SectionTitle>Gallery</SectionTitle>
                  <GalleryContainer>
                    {gallery.map((img, index) => (
                      <GalleryImage 
                        key={index}
                        onClick={() => handleImageClick(img)}
                      >
                        <img src={img} alt={`${title} gallery ${index + 1}`} />
                      </GalleryImage>
                    ))}
                  </GalleryContainer>
                </AnimatedSection>
              )}
              
              <AnimatedSection animation={ANIMATIONS.FADE_UP} delay={0.5}>
                <ButtonsContainer>
                  {liveUrl && (
                    <LinkButton 
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      primary
                    >
                      View Live
                    </LinkButton>
                  )}
                  {githubUrl && (
                    <LinkButton 
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Code
                    </LinkButton>
                  )}
                </ButtonsContainer>
              </AnimatedSection>
            </ContentSection>
          </DetailsContainer>
          
          <AnimatePresence>
            {selectedImage && (
              <Overlay
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeImageView}
                style={{ zIndex: 1100 }}
              >
                <motion.img
                  src={selectedImage}
                  alt="Gallery image"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  style={{
                    maxWidth: '90%',
                    maxHeight: '90%',
                    objectFit: 'contain',
                    borderRadius: '0.5rem'
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <CloseButton
                  onClick={closeImageView}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    position: 'fixed',
                    top: '2rem',
                    right: '2rem',
                    color: 'white'
                  }}
                >
                  ✕
                </CloseButton>
              </Overlay>
            )}
          </AnimatePresence>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

ViewDetails.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    longDescription: PropTypes.string,
    techStack: PropTypes.arrayOf(PropTypes.string).isRequired,
    features: PropTypes.arrayOf(PropTypes.string),
    liveUrl: PropTypes.string,
    githubUrl: PropTypes.string,
    gallery: PropTypes.arrayOf(PropTypes.string)
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ViewDetails;