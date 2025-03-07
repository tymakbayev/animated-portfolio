import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import AnimatedSection, { ANIMATIONS } from './Animation/AnimatedSection';
import { ParallaxEffect } from './Animation';

const DescriptionSection = styled.section`
  padding: 8rem 2rem;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const DescriptionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DescriptionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
  
  h2 {
    font-size: 3rem;
    margin-bottom: 1.5rem;
    background: linear-gradient(to right, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
    display: inline-block;
  }
  
  p {
    font-size: 1.2rem;
    max-width: 700px;
    margin: 0 auto;
    color: ${({ theme }) => theme.textSecondary};
    line-height: 1.8;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  width: 100%;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 1rem;
  padding: 2.5rem 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
    
    &::before {
      transform: scale(2.5);
    }
    
    .icon-container {
      background: linear-gradient(45deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
      color: white;
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(to right, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
    transition: transform 0.5s ease;
    z-index: -1;
  }
`;

const IconContainer = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.backgroundSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.primary};
  transition: all 0.3s ease;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.7;
  font-size: 1rem;
`;

const BottomCta = styled(motion.div)`
  margin-top: 5rem;
  text-align: center;
  
  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const CtaButton = styled(motion.button)`
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  background: linear-gradient(45deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  color: white;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(-2px);
  }
`;

const Description = () => {
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
  
  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  const featuresVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const featureVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  const ctaVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.8
      }
    }
  };
  
  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
      transition: {
        duration: 0.3,
        yoyo: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  const features = [
    {
      icon: "✨",
      title: "Smooth Animations",
      description: "Enjoy seamless transitions and fluid animations that enhance the user experience and bring your content to life."
    },
    {
      icon: "🖼️",
      title: "Parallax Effects",
      description: "Create depth and dimension with stunning parallax scrolling effects that respond to user interaction."
    },
    {
      icon: "🎨",
      title: "Custom Styling",
      description: "Personalize your portfolio with customizable themes, colors, and layouts to match your unique brand identity."
    },
    {
      icon: "📱",
      title: "Responsive Design",
      description: "Your portfolio will look perfect on any device, from desktop computers to mobile phones and tablets."
    },
    {
      icon: "⚡",
      title: "Performance Optimized",
      description: "Built with performance in mind, ensuring fast load times and smooth interactions even with complex animations."
    },
    {
      icon: "🔍",
      title: "SEO Friendly",
      description: "Structured to help search engines discover and index your work, increasing visibility to potential clients."
    }
  ];

  return (
    <DescriptionSection id="description">
      <DescriptionContainer>
        <AnimatedSection animation={ANIMATIONS.FADE_UP}>
          <DescriptionHeader>
            <h2>Why Choose This Portfolio</h2>
            <p>
              A modern, interactive showcase for your work that combines cutting-edge web technologies 
              with beautiful design to create an unforgettable user experience.
            </p>
          </DescriptionHeader>
        </AnimatedSection>
        
        <AnimatedSection
          animation={ANIMATIONS.FADE_UP}
          as={FeaturesGrid}
          delay={0.2}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
            >
              <IconContainer className="icon-container">
                {feature.icon}
              </IconContainer>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </AnimatedSection>
        
        <AnimatedSection animation={ANIMATIONS.FADE_UP} delay={0.6}>
          <BottomCta>
            <p>Ready to create your stunning portfolio?</p>
            <CtaButton
              whileHover="hover"
              variants={buttonVariants}
            >
              Get Started Now
            </CtaButton>
          </BottomCta>
        </AnimatedSection>
      </DescriptionContainer>
    </DescriptionSection>
  );
};

export default Description;