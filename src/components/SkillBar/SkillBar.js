import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ANIMATIONS } from '../Animation';
import AnimatedSection from '../Animation/AnimatedSection';

const SkillBarContainer = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;
`;

const SkillInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const SkillName = styled.span`
  font-weight: 600;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  transition: color 0.3s ease;
`;

const SkillPercentage = styled.span`
  font-weight: 500;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textSecondary};
  transition: color 0.3s ease;
`;

const ProgressBarContainer = styled.div`
  height: 10px;
  width: 100%;
  background-color: ${({ theme }) => theme.backgroundAlt};
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
`;

const ProgressBarFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(to right, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  border-radius: 5px;
  transform-origin: left;
  transition: background 0.3s ease;
`;

const SkillBar = ({ name, percentage, delay = 0, threshold = 0.2 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        width: `${percentage}%`,
        transition: {
          duration: 1.2,
          ease: [0.25, 0.1, 0.25, 1.0],
          delay
        }
      });
    }
  }, [controls, inView, percentage, delay]);

  return (
    <AnimatedSection
      animation={ANIMATIONS.FADE_UP}
      delay={delay}
      duration={0.6}
    >
      <SkillBarContainer>
        <SkillInfo>
          <SkillName>{name}</SkillName>
          <SkillPercentage>{percentage}%</SkillPercentage>
        </SkillInfo>
        <ProgressBarContainer ref={ref}>
          <ProgressBarFill
            initial={{ width: '0%' }}
            animate={controls}
          />
        </ProgressBarContainer>
      </SkillBarContainer>
    </AnimatedSection>
  );
};

SkillBar.propTypes = {
  name: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
  delay: PropTypes.number,
  threshold: PropTypes.number
};

export default SkillBar;