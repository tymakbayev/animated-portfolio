import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import AnimatedSection, { ANIMATIONS } from './Animation/AnimatedSection';

const TechStackSection = styled.section`
  padding: 6rem 2rem;
  background-color: ${({ theme }) => theme.backgroundPrimary};
  color: ${({ theme }) => theme.text};
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const TechStackContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(to right, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
    border-radius: 2px;
  }
`;

const TechCategoriesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-top: 4rem;
`;

const TechCategory = styled(motion.div)`
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.primary};
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 3px;
    background: linear-gradient(to right, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
    border-radius: 1.5px;
  }
`;

const TechList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1.5rem;
`;

const TechItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const TechIcon = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const TechName = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const TechDescription = styled.p`
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.6;
`;

const TechStack = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const [techData, setTechData] = useState([
    {
      category: "Frontend",
      description: "Modern technologies for building responsive and interactive user interfaces",
      techs: [
        { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        { name: "Sass", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" }
      ]
    },
    {
      category: "UI Libraries",
      description: "Tools and frameworks for creating beautiful and consistent user interfaces",
      techs: [
        { name: "Styled Components", icon: "https://raw.githubusercontent.com/styled-components/brand/master/styled-components.png" },
        { name: "Framer Motion", icon: "https://camo.githubusercontent.com/179d66ab2b0321726c88a586c4ad38802e7113a6d3847c7340fe7bfa8cb2f3bd/68747470733a2f2f6672616d657275736572636f6e74656e742e636f6d2f696d616765732f34386861395a52396f5a51475136675a38595566456c50335430412e706e67" },
        { name: "Material UI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg" },
        { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" }
      ]
    },
    {
      category: "Backend",
      description: "Server-side technologies for building robust and scalable applications",
      techs: [
        { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
        { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" }
      ]
    },
    {
      category: "Tools & Workflow",
      description: "Development tools and practices for efficient and collaborative work",
      techs: [
        { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "Webpack", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg" },
        { name: "Vite", icon: "https://vitejs.dev/logo.svg" },
        { name: "Jest", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" },
        { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" }
      ]
    }
  ]);
  
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
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  const techItemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <TechStackSection id="tech-stack">
      <TechStackContainer>
        <AnimatedSection animation={ANIMATIONS.FADE_UP}>
          <SectionTitle>My Tech Stack</SectionTitle>
        </AnimatedSection>
        
        <TechCategoriesContainer ref={ref}>
          {techData.map((category, index) => (
            <AnimatedSection 
              key={category.category} 
              animation={ANIMATIONS.FADE_UP} 
              delay={index * 0.1}
              as={TechCategory}
            >
              <CategoryTitle>{category.category}</CategoryTitle>
              <TechDescription>{category.description}</TechDescription>
              
              <TechList>
                {category.techs.map((tech, techIndex) => (
                  <AnimatedSection
                    key={tech.name}
                    animation={ANIMATIONS.ZOOM_IN}
                    delay={0.1 + techIndex * 0.05}
                    as={TechItem}
                  >
                    <TechIcon>
                      <img src={tech.icon} alt={tech.name} />
                    </TechIcon>
                    <TechName>{tech.name}</TechName>
                  </AnimatedSection>
                ))}
              </TechList>
            </AnimatedSection>
          ))}
        </TechCategoriesContainer>
      </TechStackContainer>
    </TechStackSection>
  );
};

export default TechStack;