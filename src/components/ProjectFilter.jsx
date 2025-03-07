import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AnimatedSection, { ANIMATIONS } from './Animation/AnimatedSection';

const FilterContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2.5rem;
  justify-content: center;
  
  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`;

const FilterButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background-color: ${({ active, theme }) => 
    active ? theme.primary : theme.cardBackground};
  color: ${({ active, theme }) => 
    active ? theme.buttonText : theme.textSecondary};
  border: none;
  border-radius: 2rem;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${({ active }) => 
    active ? '0 8px 20px rgba(0, 0, 0, 0.15)' : '0 4px 12px rgba(0, 0, 0, 0.05)'};
  
  &:hover {
    background-color: ${({ active, theme }) => 
      active ? theme.primary : theme.backgroundHover};
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.85rem;
  }
`;

const FilterCount = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
  background-color: ${({ active, theme }) => 
    active ? 'rgba(255, 255, 255, 0.2)' : theme.backgroundSecondary};
  color: ${({ active, theme }) => 
    active ? theme.buttonText : theme.textSecondary};
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  
  @media (max-width: 768px) {
    width: 1.3rem;
    height: 1.3rem;
    font-size: 0.7rem;
  }
`;

const buttonVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  hover: { scale: 1.05 }
};

const ProjectFilter = ({ categories, onFilterChange, projects }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [categoryCounts, setCategoryCounts] = useState({});

  useEffect(() => {
    const counts = { all: projects.length };
    
    projects.forEach(project => {
      project.categories.forEach(category => {
        counts[category] = (counts[category] || 0) + 1;
      });
    });
    
    setCategoryCounts(counts);
  }, [projects]);

  const handleFilterClick = (category) => {
    setActiveFilter(category);
    onFilterChange(category);
  };

  return (
    <AnimatedSection 
      animation={ANIMATIONS.FADE_UP} 
      duration={0.6}
      delay={0.2}
    >
      <FilterContainer>
        <AnimatePresence>
          <FilterButton
            key="all"
            active={activeFilter === 'all'}
            onClick={() => handleFilterClick('all')}
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            All
            <FilterCount active={activeFilter === 'all'}>
              {categoryCounts.all || 0}
            </FilterCount>
          </FilterButton>
          
          {categories.map((category) => (
            <FilterButton
              key={category}
              active={activeFilter === category}
              onClick={() => handleFilterClick(category)}
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
              <FilterCount active={activeFilter === category}>
                {categoryCounts[category] || 0}
              </FilterCount>
            </FilterButton>
          ))}
        </AnimatePresence>
      </FilterContainer>
    </AnimatedSection>
  );
};

ProjectFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      categories: PropTypes.arrayOf(PropTypes.string).isRequired
    })
  ).isRequired
};

export default ProjectFilter;