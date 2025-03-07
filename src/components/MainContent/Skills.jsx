import React, { useRef } from 'react';
import AnimatedSection from '../AnimatedSection/AnimatedSection';
import SkillBar from '../SkillBar/SkillBar';
import { useAnimation } from '../../hooks/useAnimation';
import './Skills.css';

const Skills = () => {
  const sectionRef = useRef(null);
  const { animate, inView } = useAnimation(sectionRef, 0.1);

  const frontendSkills = [
    { name: 'React', level: 95 },
    { name: 'JavaScript', level: 90 },
    { name: 'HTML/CSS', level: 85 },
    { name: 'TypeScript', level: 80 },
    { name: 'Redux', level: 85 }
  ];

  const backendSkills = [
    { name: 'Node.js', level: 75 },
    { name: 'Express', level: 70 },
    { name: 'MongoDB', level: 65 },
    { name: 'GraphQL', level: 60 },
    { name: 'Firebase', level: 75 }
  ];

  const otherSkills = [
    { name: 'Git', level: 85 },
    { name: 'Webpack', level: 70 },
    { name: 'Jest', level: 65 },
    { name: 'UI/UX Design', level: 75 },
    { name: 'Responsive Design', level: 90 }
  ];

  return (
    <AnimatedSection className="skills-section" ref={sectionRef} animate={animate}>
      <div className="skills-container">
        <h2 className="skills-title">My Skills</h2>
        <p className="skills-description">
          I've worked with a variety of technologies in the web development world.
          Here's an overview of my technical skills and expertise levels.
        </p>

        <div className="skills-grid">
          <div className={`skill-category ${inView ? 'fade-in' : ''}`}>
            <h3>Frontend Development</h3>
            <div className="skill-bars">
              {frontendSkills.map((skill, index) => (
                <SkillBar 
                  key={index}
                  name={skill.name}
                  level={skill.level}
                  delay={index * 0.1}
                  active={inView}
                />
              ))}
            </div>
          </div>

          <div className={`skill-category ${inView ? 'fade-in' : ''}`} style={{ animationDelay: '0.3s' }}>
            <h3>Backend Development</h3>
            <div className="skill-bars">
              {backendSkills.map((skill, index) => (
                <SkillBar 
                  key={index}
                  name={skill.name}
                  level={skill.level}
                  delay={index * 0.1 + 0.3}
                  active={inView}
                />
              ))}
            </div>
          </div>

          <div className={`skill-category ${inView ? 'fade-in' : ''}`} style={{ animationDelay: '0.6s' }}>
            <h3>Other Skills</h3>
            <div className="skill-bars">
              {otherSkills.map((skill, index) => (
                <SkillBar 
                  key={index}
                  name={skill.name}
                  level={skill.level}
                  delay={index * 0.1 + 0.6}
                  active={inView}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Skills;