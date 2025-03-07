import { render, screen, waitFor } from '@testing-library/react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import AnimatedSection from '@components/Animation/AnimatedSection';
import { ANIMATIONS } from '@components/Animation';

// Mock the react-intersection-observer hook
jest.mock('react-intersection-observer', () => ({
  useInView: jest.fn()
}));

// Mock framer-motion to test animation variants
jest.mock('framer-motion', () => ({
  motion: {
    div: jest.fn(({ children, ...props }) => (
      <div data-testid="motion-div" {...props}>
        {children}
      </div>
    ))
  }
}));

describe('AnimatedSection Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    
    // Default mock implementation for useInView
    useInView.mockReturnValue([null, false]);
  });

  it('renders children correctly', () => {
    useInView.mockReturnValue([null, true]);
    
    render(
      <AnimatedSection>
        <p>Test content</p>
      </AnimatedSection>
    );
    
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies the correct animation type', () => {
    useInView.mockReturnValue([null, true]);
    
    render(
      <AnimatedSection animation={ANIMATIONS.FADE_UP}>
        <p>Test content</p>
      </AnimatedSection>
    );
    
    expect(motion.div).toHaveBeenCalledWith(
      expect.objectContaining({
        variants: expect.objectContaining({
          hidden: expect.anything(),
          visible: expect.anything()
        }),
        initial: 'hidden',
        animate: 'visible'
      }),
      expect.anything()
    );
  });

  it('starts animation when in view', async () => {
    // Mock element is in view
    useInView.mockReturnValue([null, true]);
    
    render(
      <AnimatedSection>
        <p>Test content</p>
      </AnimatedSection>
    );
    
    await waitFor(() => {
      expect(motion.div).toHaveBeenCalledWith(
        expect.objectContaining({
          animate: 'visible'
        }),
        expect.anything()
      );
    });
  });

  it('stays hidden when not in view', () => {
    // Mock element is not in view
    useInView.mockReturnValue([null, false]);
    
    render(
      <AnimatedSection>
        <p>Test content</p>
      </AnimatedSection>
    );
    
    expect(motion.div).toHaveBeenCalledWith(
      expect.objectContaining({
        animate: 'hidden'
      }),
      expect.anything()
    );
  });

  it('applies custom threshold correctly', () => {
    const customThreshold = 0.8;
    render(
      <AnimatedSection threshold={customThreshold}>
        <p>Test content</p>
      </AnimatedSection>
    );
    
    expect(useInView).toHaveBeenCalledWith(
      expect.objectContaining({
        threshold: customThreshold
      })
    );
  });

  it('applies custom animation delay', () => {
    const delay = 0.5;
    useInView.mockReturnValue([null, true]);
    
    render(
      <AnimatedSection delay={delay}>
        <p>Test content</p>
      </AnimatedSection>
    );
    
    expect(motion.div).toHaveBeenCalledWith(
      expect.objectContaining({
        variants: expect.objectContaining({
          visible: expect.objectContaining({
            transition: expect.objectContaining({
              delay
            })
          })
        })
      }),
      expect.anything()
    );
  });

  it('applies custom animation duration', () => {
    const duration = 1.5;
    useInView.mockReturnValue([null, true]);
    
    render(
      <AnimatedSection duration={duration}>
        <p>Test content</p>
      </AnimatedSection>
    );
    
    expect(motion.div).toHaveBeenCalledWith(
      expect.objectContaining({
        variants: expect.objectContaining({
          visible: expect.objectContaining({
            transition: expect.objectContaining({
              duration
            })
          })
        })
      }),
      expect.anything()
    );
  });

  it('applies custom className', () => {
    const customClass = 'custom-animation-class';
    useInView.mockReturnValue([null, true]);
    
    render(
      <AnimatedSection className={customClass}>
        <p>Test content</p>
      </AnimatedSection>
    );
    
    expect(motion.div).toHaveBeenCalledWith(
      expect.objectContaining({
        className: customClass
      }),
      expect.anything()
    );
  });

  it('applies once option correctly', () => {
    render(
      <AnimatedSection once={true}>
        <p>Test content</p>
      </AnimatedSection>
    );
    
    expect(useInView).toHaveBeenCalledWith(
      expect.objectContaining({
        triggerOnce: true
      })
    );
  });

  it('applies custom animation variants when provided', () => {
    const customVariants = {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 }
    };
    
    useInView.mockReturnValue([null, true]);
    
    render(
      <AnimatedSection variants={customVariants}>
        <p>Test content</p>
      </AnimatedSection>
    );
    
    expect(motion.div).toHaveBeenCalledWith(
      expect.objectContaining({
        variants: customVariants
      }),
      expect.anything()
    );
  });
});