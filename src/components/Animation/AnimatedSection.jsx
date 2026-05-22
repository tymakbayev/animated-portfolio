import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export const ANIMATIONS = {
  FADE_UP: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  FADE_IN: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 }
  },
  SCALE_UP: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 }
  },
  SLIDE_LEFT: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 }
  },
  SLIDE_RIGHT: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 }
  }
};

const AnimatedSection = ({ 
  children, 
  animation = ANIMATIONS.FADE_UP, 
  duration = 0.6,
  threshold = 0.1,
  className 
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold
  });

  const variants = {
    initial: animation.initial,
    animate: {
      ...animation.animate,
      transition: {
        ...animation.transition,
        duration: duration
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={inView ? 'animate' : 'initial'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
