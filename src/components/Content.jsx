import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import AnimatedSection, { ANIMATIONS } from './Animation/AnimatedSection';
import { ParallaxEffect } from './Animation/ParallaxEffect';

const ContentSection = styled.section`
  padding: 5rem 2rem;
  background-color: ${({ theme }) => theme.backgroundPrimary};
  color: ${({ theme }) => theme.text};
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const ContentBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  &:nth-child(even) {
    direction: rtl;
    
    @media (max-width: 992px) {
      direction: ltr;
    }
  }
  
  .content-text {
    direction: ltr;
  }
`;

const ContentImage = styled(motion.div)`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  aspect-ratio: 16 / 9;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const ContentText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  h2 {
    font-size: 2.2rem;
    margin-bottom: 1.2rem;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 50px;
      height: 3px;
      background: linear-gradient(to right, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
      border-radius: 2px;
    }
  }
  
  p {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    line-height: 1.7;
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const Button = styled(motion.button)`
  background: linear-gradient(to right, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  align-self: flex-start;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  }
  
  svg {
    margin-left: 0.5rem;
  }
`;

const contentItems = [
  {
    id: 1,
    title: "User-Centered Design",
    description: "I create digital experiences that prioritize user needs and preferences. By combining intuitive navigation with visually appealing interfaces, I ensure that every project delivers both functionality and delight. My approach involves thorough research, wireframing, and iterative testing to create solutions that truly resonate with users.",
    image: "/images/design-process.jpg",
    buttonText: "Learn More",
    animation: ANIMATIONS.FADE_LEFT
  },
  {
    id: 2,
    title: "Modern Development Practices",
    description: "Leveraging the latest technologies and frameworks, I build responsive, performant applications that work seamlessly across all devices. My development process emphasizes clean code, accessibility, and future-proof solutions. I stay current with industry trends to ensure that my work represents the best of what modern web development has to offer.",
    image: "/images/development.jpg",
    buttonText: "View Process",
    animation: ANIMATIONS.FADE_RIGHT
  },
  {
    id: 3,
    title: "Creative Problem Solving",
    description: "Every project presents unique challenges that require innovative thinking. I approach problems with a combination of analytical reasoning and creative exploration, finding solutions that balance technical constraints with business goals. My collaborative approach ensures that all stakeholders' perspectives are considered in the final solution.",
    image: "/images/problem-solving.jpg",
    buttonText: "See Examples",
    animation: ANIMATIONS.FADE_LEFT
  }
];

const Content = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
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
        staggerChildren: 0.3
      }
    }
  };
  
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      } 
    },
    tap: { scale: 0.95 }
  };

  return (
    <ContentSection id="content" ref={ref}>
      <ContentContainer as={motion.div} variants={containerVariants} initial="hidden" animate={controls}>
        {contentItems.map((item) => (
          <AnimatedSection key={item.id} animation={item.animation} duration={0.7}>
            <ContentBlock>
              <ParallaxEffect speed={0.1}>
                <ContentImage>
                  <img src={item.image} alt={item.title} />
                </ContentImage>
              </ParallaxEffect>
              
              <ContentText className="content-text">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <Button 
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  {item.buttonText}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 1L15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Button>
              </ContentText>
            </ContentBlock>
          </AnimatedSection>
        ))}
      </ContentContainer>
    </ContentSection>
  );
};

export default Content;