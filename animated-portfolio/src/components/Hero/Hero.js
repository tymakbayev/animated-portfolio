import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { Link } from 'react-scroll';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';

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
  cursor: pointer;
  
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
    animation: bounce 2s infinite;
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0) rotate(45deg);
    }
    40% {
      transform: translateY(-10px) rotate(45deg);
    }
    60% {
      transform: translateY(-5px) rotate(45deg);
    }
  }
`;

const Hero = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const parallaxRef = useRef(null);
  
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
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };
  
  const shapeVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: 'easeOut'
      }
    }
  };
  
  const handleMouseMove = (e) => {
    if (!parallaxRef.current) return;
    
    const { clientX, clientY } = e;
    const { width, height } = parallaxRef.current.getBoundingClientRect();
    
    const xPos = (clientX / width - 0.5) * 20;
    const yPos = (clientY / height - 0.5) * 20;
    
    const shapes = parallaxRef.current.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
      const factor = (index + 1) * 0.2;
      shape.style.transform = `translate(${xPos * factor}px, ${yPos * factor}px)`;
    });
  };
  
  return (
    <ParallaxProvider>
      <HeroSection 
        ref={parallaxRef}
        onMouseMove={handleMouseMove}
      >
        <HeroContainer>
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <HeroContent>
              <HeroTitle variants={itemVariants}>
                Hello, I'm <span className="highlight">John Doe</span>
              </HeroTitle>
              <HeroSubtitle variants={itemVariants}>
                A passionate frontend developer creating beautiful, interactive web experiences with modern technologies and smooth animations.
              </HeroSubtitle>
              <ButtonContainer variants={itemVariants}>
                <PrimaryButton
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View My Work
                </PrimaryButton>
                <SecondaryButton
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </SecondaryButton>
              </ButtonContainer>
            </HeroContent>
          </motion.div>
        </HeroContainer>
        
        <BackgroundShapes>
          <Parallax speed={-10}>
            <Shape1 
              className="shape"
              variants={shapeVariants}
              initial="hidden"
              animate="visible"
            />
          </Parallax>
          <Parallax speed={5}>
            <Shape2 
              className="shape"
              variants={shapeVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            />
          </Parallax>
          <Parallax speed={-5}>
            <Shape3 
              className="shape"
              variants={shapeVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
            />
          </Parallax>
        </BackgroundShapes>
        
        <Link to="about" smooth={true} duration={800}>
          <ScrollIndicator
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <p>Scroll Down</p>
            <div className="arrow"></div>
          </ScrollIndicator>
        </Link>
      </HeroSection>
    </ParallaxProvider>
  );
};

export default Hero;