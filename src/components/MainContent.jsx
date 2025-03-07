import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Hero from './MainContent/Hero';
import About from './MainContent/About';
import Projects from './MainContent/Projects';
import Skills from './MainContent/Skills';
import Contact from './MainContent/Contact';
import AnimatedSection, { ANIMATIONS } from './Animation/AnimatedSection';
import { ParallaxEffect } from './Animation/ParallaxEffect';

const MainContentContainer = styled.main`
  width: 100%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.background};
  transition: background-color 0.3s ease;
`;

const Section = styled.section`
  min-height: 100vh;
  width: 100%;
  position: relative;
  padding: 6rem 2rem;
  
  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }
`;

const SectionDivider = styled(motion.div)`
  height: 6rem;
  width: 100%;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, ${({ theme }) => theme.background} 0%, ${({ theme }) => theme.backgroundSecondary} 100%);
    transform: skewY(-3deg);
    transform-origin: top left;
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  
  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: white;
  }
  
  @media (max-width: 768px) {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 2.5rem;
    height: 2.5rem;
    
    svg {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
`;

const MainContent = () => {
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);
  
  const controls = useAnimation();
  const [scrollIndicatorRef, scrollIndicatorInView] = useInView({
    threshold: 0.1,
  });
  
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      if (scrollPosition > windowHeight) {
        controls.start({ opacity: 1, scale: 1 });
      } else {
        controls.start({ opacity: 0, scale: 0.8 });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);
  
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  const dividerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <MainContentContainer>
      <Section id="home">
        <AnimatedSection animation={ANIMATIONS.FADE_IN} duration={1.2}>
          <Hero onScrollToAbout={() => scrollToSection(aboutRef)} />
        </AnimatedSection>
      </Section>
      
      <SectionDivider
        initial="hidden"
        animate="visible"
        variants={dividerVariants}
      />
      
      <Section id="about" ref={aboutRef}>
        <ParallaxEffect speed={-0.2}>
          <AnimatedSection animation={ANIMATIONS.FADE_UP} threshold={0.1}>
            <About />
          </AnimatedSection>
        </ParallaxEffect>
      </Section>
      
      <SectionDivider
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={dividerVariants}
      />
      
      <Section id="projects" ref={projectsRef}>
        <ParallaxEffect speed={-0.1}>
          <AnimatedSection animation={ANIMATIONS.FADE_UP} threshold={0.1}>
            <Projects />
          </AnimatedSection>
        </ParallaxEffect>
      </Section>
      
      <SectionDivider
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={dividerVariants}
      />
      
      <Section id="skills" ref={skillsRef}>
        <ParallaxEffect speed={-0.15}>
          <AnimatedSection animation={ANIMATIONS.FADE_UP} threshold={0.1}>
            <Skills />
          </AnimatedSection>
        </ParallaxEffect>
      </Section>
      
      <SectionDivider
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={dividerVariants}
      />
      
      <Section id="contact" ref={contactRef} ref={scrollIndicatorRef}>
        <ParallaxEffect speed={-0.05}>
          <AnimatedSection animation={ANIMATIONS.FADE_UP} threshold={0.1}>
            <Contact />
          </AnimatedSection>
        </ParallaxEffect>
      </Section>
      
      <ScrollIndicator
        initial={{ opacity: 0, scale: 0.8 }}
        animate={controls}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={scrollToTop}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      </ScrollIndicator>
    </MainContentContainer>
  );
};

export default MainContent;