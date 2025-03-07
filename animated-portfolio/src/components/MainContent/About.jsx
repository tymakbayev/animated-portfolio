import React, { useRef } from 'react';
import AnimatedSection from '../AnimatedSection/AnimatedSection';
import { useAnimation } from '../../hooks/useAnimation';
import './About.css';

const About = () => {
  const sectionRef = useRef(null);
  const { animate, inView } = useAnimation(sectionRef, 0.2);

  return (
    <AnimatedSection className="about-section" ref={sectionRef} animate={animate}>
      <div className="about-container">
        <div className={`about-image ${inView ? 'fade-in' : ''}`}>
          <img src="/images/profile.jpg" alt="Profile" />
        </div>
        
        <div className={`about-content ${inView ? 'slide-in' : ''}`}>
          <h2>About Me</h2>
          <p>
            I'm a passionate web developer with a strong focus on creating interactive 
            and visually appealing user experiences. With several years of experience 
            in front-end development, I specialize in building modern web applications 
            using React and related technologies.
          </p>
          <p>
            My approach combines technical expertise with creative problem-solving, 
            ensuring that the applications I build are not only functional but also 
            intuitive and engaging for users.
          </p>
          
          <div className="about-details">
            <div className="detail-item">
              <h3>5+</h3>
              <p>Years Experience</p>
            </div>
            <div className="detail-item">
              <h3>50+</h3>
              <p>Projects Completed</p>
            </div>
            <div className="detail-item">
              <h3>20+</h3>
              <p>Happy Clients</p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default About;