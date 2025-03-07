import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Skills from './Skills';
import Contact from './Contact';
import MainContent from './MainContent';
import ProjectCard from './ProjectCard';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Styled components for MainContent sections
export const SectionContainer = styled(motion.section)`
  padding: 5rem 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }
`;

export const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.headingColor};
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 4px;
    background-color: ${({ theme }) => theme.primary};
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

// Animation variants for sections
export const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Grid layout for projects and skills
export const GridContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
`;

// Button styles for sections
export const ActionButton = styled(motion.button)`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.primaryDark};
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// Utility function to create staggered animations
export const createStaggeredAnimation = (delay = 0.1) => ({
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * delay,
      duration: 0.5,
      ease: "easeOut"
    }
  })
});

export {
  Hero,
  About,
  Projects,
  Skills,
  Contact,
  MainContent,
  ProjectCard
};

export default MainContent;