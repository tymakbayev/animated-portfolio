import React, { useRef } from 'react';
import Hero from '../Hero/Hero';
import About from './About';
import Projects from '../Projects/Projects';
import Skills from './Skills';
import Contact from '../Contact/Contact';
import { useAnimation } from '../../hooks/useAnimation';
import './MainContent.css';

const MainContent = () => {
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="main-content">
      <Hero 
        onScrollToAbout={() => scrollToSection(aboutRef)}
      />
      
      <div ref={aboutRef}>
        <About />
      </div>
      
      <div ref={projectsRef}>
        <Projects />
      </div>
      
      <div ref={skillsRef}>
        <Skills />
      </div>
      
      <div ref={contactRef}>
        <Contact />
      </div>
    </main>
  );
};

export default MainContent;