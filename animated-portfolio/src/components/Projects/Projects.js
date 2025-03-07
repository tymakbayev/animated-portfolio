import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import ProjectCard from '../MainContent/ProjectCard';
import useProjects from '../../hooks/useProjects';
import { ParallaxEffect } from '../Animation/ParallaxEffect';
import AnimatedSection from '../Animation/AnimatedSection';

const ProjectsSection = styled.section`
  padding: 6rem 2rem;
  background-color: ${({ theme }) => theme.backgroundAlt};
  transition: background-color 0.3s ease;
`;

const ProjectsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
  
  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background: linear-gradient(to right, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
      border-radius: 2px;
    }
  }
  
  p {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.textSecondary};
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const FilterContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const FilterButton = styled(motion.button)`
  padding: 0.6rem 1.5rem;
  background: ${({ active, theme }) => active ? `linear-gradient(to right, ${theme.primary}, ${theme.secondary})` : theme.cardBackground};
  color: ${({ active, theme }) => active ? '#fff' : theme.text};
  border: none;
  border-radius: 30px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${({ active }) => active ? '0 10px 20px rgba(0, 0, 0, 0.1)' : '0 5px 15px rgba(0, 0, 0, 0.05)'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: 3rem;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.textSecondary};
  }
  
  p {
    color: ${({ theme }) => theme.textTertiary};
  }
`;

const LoadingContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;

const LoadingDot = styled(motion.div)`
  width: 15px;
  height: 15px;
  margin: 0 5px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
`;

const Projects = () => {
  const { projects, loading, error, filterProjects, currentFilter } = useProjects();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const categories = ['all', 'web', 'mobile', 'ui', 'design'];
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };
  
  const filterVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: 0.2
      }
    }
  };
  
  const loadingVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        repeat: Infinity,
        repeatType: 'reverse'
      }
    }
  };
  
  const dotVariants = {
    hidden: { y: 0 },
    visible: {
      y: -15,
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut'
      }
    }
  };

  if (error) {
    return (
      <ProjectsSection id="projects">
        <ProjectsContainer>
          <SectionHeader>
            <h2>Projects</h2>
          </SectionHeader>
          <EmptyState>
            <h3>Oops! Something went wrong</h3>
            <p>{error}</p>
          </EmptyState>
        </ProjectsContainer>
      </ProjectsSection>
    );
  }

  return (
    <ProjectsSection id="projects" ref={ref}>
      <ParallaxEffect speed={-0.2}>
        <ProjectsContainer>
          <AnimatedSection>
            <SectionHeader
              variants={itemVariants}
              initial="hidden"
              animate={controls}
            >
              <h2>My Projects</h2>
              <p>
                Explore a collection of my recent work across various domains.
                Each project represents a unique challenge and showcases different skills and technologies.
              </p>
            </SectionHeader>
          </AnimatedSection>

          <FilterContainer
            variants={filterVariants}
            initial="hidden"
            animate={controls}
          >
            {categories.map((category) => (
              <FilterButton
                key={category}
                active={currentFilter === category}
                onClick={() => filterProjects(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </FilterButton>
            ))}
          </FilterContainer>

          {loading ? (
            <LoadingContainer
              variants={loadingVariants}
              initial="hidden"
              animate="visible"
            >
              {[0, 1, 2].map((i) => (
                <LoadingDot key={i} variants={dotVariants} />
              ))}
            </LoadingContainer>
          ) : projects.length > 0 ? (
            <ProjectsGrid
              variants={containerVariants}
              initial="hidden"
              animate={controls}
            >
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  variants={itemVariants}
                />
              ))}
            </ProjectsGrid>
          ) : (
            <EmptyState
              variants={itemVariants}
              initial="hidden"
              animate={controls}
            >
              <h3>No projects found</h3>
              <p>Try selecting a different category or check back later.</p>
            </EmptyState>
          )}
        </ProjectsContainer>
      </ParallaxEffect>
    </ProjectsSection>
  );
};

export default Projects;