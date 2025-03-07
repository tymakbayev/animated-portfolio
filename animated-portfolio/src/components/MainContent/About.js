import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import AnimatedSection from '../Animation/AnimatedSection';
import ParallaxEffect from '../Animation/ParallaxEffect';

const AboutSection = styled.section`
  padding: 6rem 2rem;
  background-color: ${({ theme }) => theme.backgroundSecondary};
  color: ${({ theme }) => theme.text};
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ProfileImageContainer = styled(motion.div)`
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
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: 1rem;
    transition: transform 0.5s ease;
    
    &:hover {
      transform: scale(1.03);
    }
  }
`;

const AboutContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  
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

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatItem = styled(motion.div)`
  background-color: ${({ theme }) => theme.cardBackground};
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
  
  h3 {
    font-size: 2.5rem;
    color: ${({ theme }) => theme.primary};
    margin-bottom: 0.5rem;
    font-weight: 700;
  }
  
  p {
    margin: 0;
    font-size: 1rem;
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const About = () => {
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
  
  const statsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const statItemVariants = {
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

  return (
    <AboutSection id="about">
      <AnimatedSection>
        <AboutContainer ref={ref}>
          <ParallaxEffect speed={-5}>
            <ProfileImageContainer
              initial="hidden"
              animate={controls}
              variants={itemVariants}
            >
              <img src="/images/profile.jpg" alt="Developer profile" />
            </ProfileImageContainer>
          </ParallaxEffect>
          
          <AboutContent
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants}>About Me</motion.h2>
            <motion.p variants={itemVariants}>
              I'm a passionate web developer with a strong focus on creating interactive 
              and visually appealing user experiences. With several years of experience 
              in front-end development, I specialize in building modern web applications 
              using React and related technologies.
            </motion.p>
            <motion.p variants={itemVariants}>
              My approach combines technical expertise with creative problem-solving, 
              ensuring that the applications I build are not only functional but also 
              intuitive and engaging for users. I'm constantly exploring new technologies 
              and techniques to enhance my skills and deliver better results.
            </motion.p>
            
            <StatsContainer
              as={motion.div}
              variants={statsVariants}
            >
              <StatItem variants={statItemVariants}>
                <h3>5+</h3>
                <p>Years Experience</p>
              </StatItem>
              <StatItem variants={statItemVariants}>
                <h3>50+</h3>
                <p>Projects Completed</p>
              </StatItem>
              <StatItem variants={statItemVariants}>
                <h3>20+</h3>
                <p>Happy Clients</p>
              </StatItem>
            </StatsContainer>
          </AboutContent>
        </AboutContainer>
      </AnimatedSection>
    </AboutSection>
  );
};

export default About;