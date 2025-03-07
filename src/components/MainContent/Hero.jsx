import React, { useEffect, useRef } from 'react';
import { ParallaxEffect } from '../../utils/ParallaxEffect';
import { useAnimation } from '../../hooks/useAnimation';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const { animateIn } = useAnimation();

  useEffect(() => {
    animateIn(titleRef.current, { delay: 0.2 });
    animateIn(subtitleRef.current, { delay: 0.4 });

    const parallaxInstance = new ParallaxEffect(heroRef.current);
    parallaxInstance.init();

    return () => {
      parallaxInstance.destroy();
    };
  }, [animateIn]);

  const handleParallax = (e) => {
    if (!heroRef.current) return;
    
    const { clientX, clientY } = e;
    const { width, height } = heroRef.current.getBoundingClientRect();
    
    const xPos = (clientX / width - 0.5) * 20;
    const yPos = (clientY / height - 0.5) * 20;
    
    titleRef.current.style.transform = `translate(${xPos}px, ${yPos}px)`;
  };

  return (
    <section 
      className="hero" 
      ref={heroRef} 
      onMouseMove={handleParallax}
    >
      <div className="hero-content">
        <h1 ref={titleRef} className="hero-title">
          Hello, I'm <span className="highlight">Your Name</span>
        </h1>
        <p ref={subtitleRef} className="hero-subtitle">
          Frontend Developer & UI/UX Enthusiast
        </p>
        <div className="hero-cta">
          <a href="#projects" className="primary-button">View My Work</a>
          <a href="#contact" className="secondary-button">Get In Touch</a>
        </div>
      </div>
      <div className="hero-background">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
    </section>
  );
};

export default Hero;