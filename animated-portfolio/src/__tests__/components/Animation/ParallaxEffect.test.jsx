import { render, screen } from '@testing-library/react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { Parallax } from 'react-scroll-parallax';
import ParallaxEffect from '@components/Animation/ParallaxEffect';
import { PARALLAX_DIRECTIONS } from '@components/Animation';

// Mock react-scroll-parallax
jest.mock('react-scroll-parallax', () => ({
  Parallax: jest.fn(({ children, ...props }) => (
    <div data-testid="parallax-component" {...props}>
      {children}
    </div>
  )),
  ParallaxProvider: ({ children }) => <div data-testid="parallax-provider">{children}</div>
}));

describe('ParallaxEffect Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children correctly', () => {
    render(
      <ParallaxProvider>
        <ParallaxEffect>
          <p>Test content</p>
        </ParallaxEffect>
      </ParallaxProvider>
    );
    
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies vertical parallax by default', () => {
    render(
      <ParallaxProvider>
        <ParallaxEffect speed={5}>
          <p>Test content</p>
        </ParallaxEffect>
      </ParallaxProvider>
    );
    
    expect(Parallax).toHaveBeenCalledWith(
      expect.objectContaining({
        y: [-5, 5]
      }),
      expect.anything()
    );
  });

  it('applies horizontal parallax when direction is set to horizontal', () => {
    render(
      <ParallaxProvider>
        <ParallaxEffect speed={10} direction={PARALLAX_DIRECTIONS.HORIZONTAL}>
          <p>Test content</p>
        </ParallaxEffect>
      </ParallaxProvider>
    );
    
    expect(Parallax).toHaveBeenCalledWith(
      expect.objectContaining({
        x: [-10, 10]
      }),
      expect.anything()
    );
  });

  it('applies custom speed correctly', () => {
    const customSpeed = 15;
    render(
      <ParallaxProvider>
        <ParallaxEffect speed={customSpeed}>
          <p>Test content</p>
        </ParallaxEffect>
      </ParallaxProvider>
    );
    
    expect(Parallax).toHaveBeenCalledWith(
      expect.objectContaining({
        y: [-15, 15]
      }),
      expect.anything()
    );
  });

  it('applies easing property correctly', () => {
    const customEasing = 'easeInQuad';
    render(
      <ParallaxProvider>
        <ParallaxEffect easing={customEasing}>
          <p>Test content</p>
        </ParallaxEffect>
      </ParallaxProvider>
    );
    
    expect(Parallax).toHaveBeenCalledWith(
      expect.objectContaining({
        easing: customEasing
      }),
      expect.anything()
    );
  });

  it('applies custom className correctly', () => {
    const customClass = 'custom-parallax';
    render(
      <ParallaxProvider>
        <ParallaxEffect className={customClass}>
          <p>Test content</p>
        </ParallaxEffect>
      </ParallaxProvider>
    );
    
    expect(Parallax).toHaveBeenCalledWith(
      expect.objectContaining({
        className: customClass
      }),
      expect.anything()
    );
  });

  it('applies custom style correctly', () => {
    const customStyle = { backgroundColor: 'red' };
    render(
      <ParallaxProvider>
        <ParallaxEffect style={customStyle}>
          <p>Test content</p>
        </ParallaxEffect>
      </ParallaxProvider>
    );
    
    expect(Parallax).toHaveBeenCalledWith(
      expect.objectContaining({
        style: customStyle
      }),
      expect.anything()
    );
  });

  it('applies custom start and end values when provided', () => {
    render(
      <ParallaxProvider>
        <ParallaxEffect startValue={-20} endValue={20}>
          <p>Test content</p>
        </ParallaxEffect>
      </ParallaxProvider>
    );
    
    expect(Parallax).toHaveBeenCalledWith(
      expect.objectContaining({
        y: [-20, 20]
      }),
      expect.anything()
    );
  });

  it('applies both x and y parallax when specified', () => {
    render(
      <ParallaxProvider>
        <ParallaxEffect xSpeed={10} ySpeed={5}>
          <p>Test content</p>
        </ParallaxEffect>
      </ParallaxProvider>
    );
    
    expect(Parallax).toHaveBeenCalledWith(
      expect.objectContaining({
        x: [-10, 10],
        y: [-5, 5]
      }),
      expect.anything()
    );
  });

  it('applies custom translateX and translateY when provided', () => {
    render(
      <ParallaxProvider>
        <ParallaxEffect translateX={['-100px', '100px']} translateY={['-50px', '50px']}>
          <p>Test content</p>
        </ParallaxEffect>
      </ParallaxProvider>
    );
    
    expect(Parallax).toHaveBeenCalledWith(
      expect.objectContaining({
        translateX: ['-100px', '100px'],
        translateY: ['-50px', '50px']
      }),
      expect.anything()
    );
  });

  it('applies scale effect when provided', () => {
    render(
      <ParallaxProvider>
        <ParallaxEffect scale={[0.8, 1.2]}>
          <p>Test content</p>
        </ParallaxEffect>
      </ParallaxProvider>
    );
    
    expect(Parallax).toHaveBeenCalledWith(
      expect.objectContaining({
        scale: [0.8, 1.2]
      }),
      expect.anything()
    );
  });

  it('applies rotate effect when provided', () => {
    render(
      <ParallaxProvider>
        <ParallaxEffect rotate={[-10, 10]}>
          <p>Test content</p>
        </ParallaxEffect>
      </ParallaxProvider>
    );
    
    expect(Parallax).toHaveBeenCalledWith(
      expect.objectContaining({
        rotate: [-10, 10]
      }),
      expect.anything()
    );
  });

  it('applies opacity effect when provided', () => {
    render(
      <ParallaxProvider>
        <ParallaxEffect opacity={[0.5, 1]}>
          <p>Test content</p>
        </ParallaxEffect>
      </ParallaxProvider>
    );
    
    expect(Parallax).toHaveBeenCalledWith(
      expect.objectContaining({
        opacity: [0.5, 1]
      }),
      expect.anything()
    );
  });
});