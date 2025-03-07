import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import AnimatedSection, { ANIMATIONS } from '../Animation/AnimatedSection';
import { ParallaxEffect } from '../Animation/ParallaxEffect';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  background-color: ${({ theme }) => theme.backgroundPrimary};
  color: ${({ theme }) => theme.text};
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const HeroContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
`;

const HeroContent = styled.div`
  max-width: 700px;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  
  .highlight {
    background: linear-gradient(to right, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  margin-bottom: 2.5rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.textSecondary};
  max-width: 600px;
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const PrimaryButton = styled(motion.a)`
  display: inline-block;
  padding: 1rem 2rem;
  background: linear-gradient(to right, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  color: white;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`;

const SecondaryButton = styled(motion.a)`
  display: inline-block;
  padding: 1rem 2rem;
  background: transparent;
  color: ${({ theme }) => theme.text};
  border: 2px solid ${({ theme }) => theme.primary};
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    transform: translateY(-3px);
  }
`;

const BackgroundShapes = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
`;

const Shape = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(
    45deg,
    ${({ theme }) => theme.primary}33,
    ${({ theme }) => theme.secondary}33
  );
  filter: blur(30px);
`;

const Shape1 = styled(Shape)`
  width: 400px;
  height: 400px;
  top: -100px;
  right: -100px;
`;

const Shape2 = styled(Shape)`
  width: 300px;
  height: 300px;
  bottom: -50px;
  left: -50px;
`;

const Shape3 = styled(Shape)`
  width: 200px;
  height: 200px;
  top: 40%;
  right: 30%;
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.textSecondary};
  
  p {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }
  
  .arrow {
    width: 20px;
    height: 20px;
    border-right: 2px solid ${({ theme }) => theme.textSecondary};
    border-bottom: 2px solid ${({ theme }) => theme.textSecondary};
    transform: rotate(45deg);
  }
`;

const Hero = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const parallaxRef = useRef(null);
  const shapesRef = useRef(null);
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
    
    if (parallaxRef.current) {
      const parallaxInstance = new ParallaxEffect(parallaxRef.current);
      parallaxInstance.init();
      
      return () => {
        parallaxInstance.destroy();
      };
    }
  }, [controls, inView]);
  
  const handleMouseMove = (e) => {
    if (!shapesRef.current) return;
    
    const shapes = shapesRef.current.children;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const xPos = (clientX / innerWidth - 0.5);
    const yPos = (clientY / innerHeight - 0.5);
    
    for (let i = 0; i < shapes.length; i++) {
      const speed = (i + 1) * 0.03;
      const x = xPos * 100 * speed;
      const y = yPos * 100 * speed;
      
      shapes[i].style.transform = `translate(${x}px, ${y}px)`;
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };
  
  const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };
  
  const scrollVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 1.2,
        duration: 0.8
      }
    },
    bounce: {
      y: [0, 10, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };

  return (
    <HeroSection id="hero" ref={parallaxRef} onMouseMove={handleMouseMove}>
      <HeroContainer>
        <AnimatedSection animation={ANIMATIONS.FADE_UP} duration={1}>
          <HeroContent ref={ref}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={controls}
            >
              <HeroTitle variants={itemVariants}>
                Creating <span className="highlight">Immersive</span> Digital Experiences
              </HeroTitle>
              
              <HeroSubtitle variants={itemVariants}>
                I'm a frontend developer specializing in building exceptional digital experiences 
                with smooth animations and interactive interfaces.
              </HeroSubtitle>
              
              <ButtonContainer variants={itemVariants}>
                <PrimaryButton 
                  href="#projects"
                  variants={buttonVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View My Work
                </PrimaryButton>
                
                <SecondaryButton 
                  href="#contact"
                  variants={buttonVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </SecondaryButton>
              </ButtonContainer>
            </motion.div>
          </HeroContent>
        </AnimatedSection>
      </HeroContainer>
      
      <BackgroundShapes ref={shapesRef}>
        <Shape1 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <Shape2 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
        />
        <Shape3 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
        />
      </BackgroundShapes>
      
      <ScrollIndicator
        variants={scrollVariants}
        initial="hidden"
        animate={["visible", "bounce"]}
      >
        <p>Scroll Down</p>
        <div className="arrow"></div>
      </ScrollIndicator>
    </HeroSection>
  );
};

export default Hero;