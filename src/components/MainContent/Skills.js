import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import AnimatedSection from '../Animation/AnimatedSection';

const SkillsSection = styled.section`
  padding: 6rem 2rem;
  background-color: ${({ theme }) => theme.backgroundPrimary};
  color: ${({ theme }) => theme.text};
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const SkillsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  max-width: 800px;
  
  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 4px;
      background: linear-gradient(to right, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
      border-radius: 2px;
    }
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  width: 100%;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SkillCategory = styled(motion.div)`
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.primary};
    position: relative;
    padding-bottom: 0.75rem;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 40px;
      height: 3px;
      background: linear-gradient(to right, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
      border-radius: 1.5px;
    }
  }
`;

const SkillBarContainer = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SkillInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  
  span {
    font-size: 1rem;
    color: ${({ theme }) => theme.textSecondary};
  }
  
  .skill-name {
    font-weight: 600;
    color: ${({ theme }) => theme.text};
  }
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.backgroundSecondary};
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: linear-gradient(to right, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  border-radius: 4px;
  transform-origin: left;
`;

const SkillBar = ({ name, level, delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        width: `${level}%`,
        transition: { duration: 1, delay, ease: "easeOut" }
      });
    }
  }, [controls, inView, level, delay]);

  return (
    <SkillBarContainer>
      <SkillInfo>
        <span className="skill-name">{name}</span>
        <span>{level}%</span>
      </SkillInfo>
      <ProgressBarWrapper ref={ref}>
        <ProgressBar initial={{ width: "0%" }} animate={controls} />
      </ProgressBarWrapper>
    </SkillBarContainer>
  );
};

const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const controls = useAnimation();
  
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
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const frontendSkills = [
    { name: 'React', level: 95 },
    { name: 'JavaScript', level: 90 },
    { name: 'HTML/CSS', level: 85 },
    { name: 'TypeScript', level: 80 },
    { name: 'Redux', level: 85 }
  ];

  const backendSkills = [
    { name: 'Node.js', level: 75 },
    { name: 'Express', level: 70 },
    { name: 'MongoDB', level: 65 },
    { name: 'GraphQL', level: 60 },
    { name: 'Firebase', level: 75 }
  ];

  const otherSkills = [
    { name: 'Git', level: 85 },
    { name: 'Webpack', level: 70 },
    { name: 'Jest', level: 65 },
    { name: 'UI/UX Design', level: 75 },
    { name: 'Responsive Design', level: 90 }
  ];

  return (
    <SkillsSection id="skills" ref={ref}>
      <AnimatedSection>
        <SkillsContainer>
          <SectionHeader>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={itemVariants}
            >
              My Skills
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={itemVariants}
            >
              I've worked with a variety of technologies in the web development world.
              Here's an overview of my technical skills and expertise levels.
            </motion.p>
          </SectionHeader>
          
          <SkillsGrid as={motion.div} variants={containerVariants} initial="hidden" animate={controls}>
            <SkillCategory variants={itemVariants}>
              <h3>Frontend Development</h3>
              {frontendSkills.map((skill, index) => (
                <SkillBar 
                  key={index}
                  name={skill.name}
                  level={skill.level}
                  delay={index * 0.1}
                />
              ))}
            </SkillCategory>
            
            <SkillCategory variants={itemVariants}>
              <h3>Backend Development</h3>
              {backendSkills.map((skill, index) => (
                <SkillBar 
                  key={index}
                  name={skill.name}
                  level={skill.level}
                  delay={index * 0.1}
                />
              ))}
            </SkillCategory>
            
            <SkillCategory variants={itemVariants}>
              <h3>Other Skills</h3>
              {otherSkills.map((skill, index) => (
                <SkillBar 
                  key={index}
                  name={skill.name}
                  level={skill.level}
                  delay={index * 0.1}
                />
              ))}
            </SkillCategory>
          </SkillsGrid>
        </SkillsContainer>
      </AnimatedSection>
    </SkillsSection>
  );
};

export default Skills;