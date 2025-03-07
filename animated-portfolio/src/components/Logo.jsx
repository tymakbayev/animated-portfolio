import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-scroll';
import { useInView } from 'react-intersection-observer';
import { ANIMATIONS } from './Animation/AnimatedSection';

const LogoContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 10;
`;

const LogoText = styled(motion.span)`
  font-size: 1.5rem;
  font-weight: 700;
  margin-left: 0.5rem;
  background: linear-gradient(
    45deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.secondary}
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  transition: opacity 0.3s ease;
`;

const LogoIcon = styled(motion.div)`
  width: 40px;
  height: 40px;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.secondary}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    width: 24px;
    height: 24px;
    background-color: ${({ theme }) => theme.background};
    border-radius: 4px;
    transform: rotate(45deg);
  }
`;

const LogoInner = styled.div`
  position: relative;
  z-index: 1;
  font-weight: 900;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.background};
`;

const Logo = ({ text = 'Portfolio', showText = true }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const svgRef = useRef(null);
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
      
      if (svgRef.current) {
        const paths = svgRef.current.querySelectorAll('path');
        paths.forEach((path, index) => {
          const length = path.getTotalLength();
          path.style.strokeDasharray = length;
          path.style.strokeDashoffset = length;
          
          setTimeout(() => {
            path.style.transition = 'stroke-dashoffset 1.5s ease';
            path.style.strokeDashoffset = '0';
          }, index * 150);
        });
      }
    }
  }, [controls, inView]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0, rotate: -10 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 10,
        duration: 0.5,
      },
    },
  };
  
  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };
  
  const handleLogoClick = () => {
    controls.start({
      rotate: [0, -10, 10, -5, 5, 0],
      transition: { duration: 0.5 },
    });
  };
  
  const firstLetter = text.charAt(0);
  
  return (
    <Link to="hero" smooth={true} duration={800} offset={-100}>
      <LogoContainer
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        onClick={handleLogoClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <LogoIcon variants={iconVariants}>
          <LogoInner>{firstLetter}</LogoInner>
        </LogoIcon>
        
        {showText && (
          <LogoText variants={textVariants}>
            {text}
          </LogoText>
        )}
      </LogoContainer>
    </Link>
  );
};

export default Logo;