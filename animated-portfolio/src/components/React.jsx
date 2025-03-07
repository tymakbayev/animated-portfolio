import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import AnimatedSection, { ANIMATIONS } from './Animation/AnimatedSection';
import { ParallaxEffect } from './Animation/ParallaxEffect';

const ReactSection = styled.section`
  padding: 8rem 2rem;
  background-color: ${({ theme }) => theme.backgroundPrimary};
  color: ${({ theme }) => theme.text};
  transition: background-color 0.3s ease, color 0.3s ease;
  position: relative;
  overflow: hidden;
`;

const ReactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ReactContent = styled(motion.div)`
  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
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
  }
  
  p {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    line-height: 1.8;
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const ReactImageContainer = styled(motion.div)`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
    z-index: -1;
    border-radius: 1.1rem;
  }
  
  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 1rem;
    transition: transform 0.5s ease;
    
    &:hover {
      transform: scale(1.03);
    }
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureItem = styled(motion.div)`
  background-color: ${({ theme }) => theme.cardBackground};
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
    color: ${({ theme }) => theme.primary};
    display: flex;
    align-items: center;
    
    svg {
      margin-right: 0.5rem;
    }
  }
  
  p {
    margin: 0;
    font-size: 0.95rem;
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const FloatingShapes = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  pointer-events: none;
`;

const Shape = styled(motion.div)`
  position: absolute;
  background-color: ${({ theme, color }) => color || theme.primary};
  opacity: 0.1;
  border-radius: 50%;
`;

const React = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
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
  
  const featureVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const featureItemVariants = {
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

  const features = [
    {
      title: "Component-Based",
      description: "Build encapsulated components that manage their own state, then compose them to make complex UIs."
    },
    {
      title: "Declarative",
      description: "React makes it painless to create interactive UIs. Design simple views for each state in your application."
    },
    {
      title: "Learn Once, Write Anywhere",
      description: "Develop new features without rewriting existing code. React can also render on the server using Node."
    },
    {
      title: "Virtual DOM",
      description: "A programming concept where an ideal, or "virtual", representation of a UI is kept in memory."
    }
  ];

  return (
    <ReactSection id="react">
      <FloatingShapes>
        <Shape
          as={motion.div}
          animate={{
            x: [0, 30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            top: '10%',
            left: '10%',
            width: '80px',
            height: '80px',
          }}
        />
        <Shape
          as={motion.div}
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            top: '60%',
            right: '15%',
            width: '60px',
            height: '60px',
          }}
          color="rgba(97, 218, 251, 0.5)"
        />
        <Shape
          as={motion.div}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            bottom: '20%',
            left: '20%',
            width: '40px',
            height: '40px',
          }}
        />
      </FloatingShapes>
      
      <ReactContainer ref={ref}>
        <AnimatedSection animation={ANIMATIONS.FADE_RIGHT}>
          <ReactContent>
            <h2>React Development</h2>
            <p>
              React is a JavaScript library for building user interfaces, particularly single-page applications. 
              It's used for handling the view layer in web and mobile apps. React allows developers to create 
              reusable UI components and efficiently update and render components when data changes.
            </p>
            <p>
              With its component-based architecture and virtual DOM implementation, React provides a 
              powerful and flexible way to build interactive user interfaces that are both performant and maintainable.
            </p>
            
            <FeatureGrid as={motion.div} variants={featureVariants} initial="hidden" animate={controls}>
              {features.map((feature, index) => (
                <FeatureItem key={index} variants={featureItemVariants}>
                  <h3>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>
                    </svg>
                    {feature.title}
                  </h3>
                  <p>{feature.description}</p>
                </FeatureItem>
              ))}
            </FeatureGrid>
          </ReactContent>
        </AnimatedSection>
        
        <AnimatedSection animation={ANIMATIONS.FADE_LEFT} delay={0.2}>
          <ParallaxEffect speed={-5}>
            <ReactImageContainer>
              <img src="/assets/react-illustration.svg" alt="React Development" />
            </ReactImageContainer>
          </ParallaxEffect>
        </AnimatedSection>
      </ReactContainer>
    </ReactSection>
  );
};

export default React;