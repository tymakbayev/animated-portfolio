import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import AnimatedSection, { ANIMATIONS } from '../Animation/AnimatedSection';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.backgroundDark};
  color: ${({ theme }) => theme.textLight};
  padding: 4rem 2rem 2rem;
  position: relative;
  overflow: hidden;
  z-index: 1;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 40px;
      height: 3px;
      background: linear-gradient(to right, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
      border-radius: 1.5px;
      
      @media (max-width: 768px) {
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
  
  p {
    line-height: 1.6;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialIcon = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.backgroundLight};
  color: ${({ theme }) => theme.primary};
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.backgroundLight};
    transform: translateY(-3px);
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    margin-bottom: 0.8rem;
    
    a {
      color: ${({ theme }) => theme.textSecondary};
      text-decoration: none;
      transition: color 0.3s ease;
      display: inline-block;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        width: 0;
        height: 1px;
        bottom: -2px;
        left: 0;
        background-color: ${({ theme }) => theme.primary};
        transition: width 0.3s ease;
      }
      
      &:hover {
        color: ${({ theme }) => theme.primary};
        
        &::after {
          width: 100%;
        }
      }
    }
  }
`;

const ContactInfo = styled.div`
  margin-bottom: 1.5rem;
  
  div {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    
    @media (max-width: 768px) {
      justify-content: center;
    }
    
    i {
      margin-right: 10px;
      color: ${({ theme }) => theme.primary};
    }
  }
`;

const Copyright = styled(motion.div)`
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.9rem;
  
  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
  }
`;

const BackToTop = styled(motion.button)`
  position: absolute;
  right: 30px;
  bottom: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
  
  i {
    font-size: 1.2rem;
  }
`;

const Footer = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com', icon: 'github' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
    { name: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
    { name: 'Instagram', url: 'https://instagram.com', icon: 'instagram' }
  ];
  
  const quickLinks = [
    { name: 'Home', url: '#home' },
    { name: 'About', url: '#about' },
    { name: 'Projects', url: '#projects' },
    { name: 'Skills', url: '#skills' },
    { name: 'Contact', url: '#contact' }
  ];
  
  return (
    <FooterContainer ref={ref}>
      <AnimatedSection animation={ANIMATIONS.FADE_UP}>
        <FooterContent>
          <FooterSection>
            <h3>About Me</h3>
            <p>
              I'm a passionate web developer creating modern, responsive, and interactive web applications.
              My goal is to build digital experiences that are both beautiful and functional.
            </p>
            <SocialLinks>
              {socialLinks.map((social) => (
                <SocialIcon 
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className={`icon-${social.icon}`}></i>
                </SocialIcon>
              ))}
            </SocialLinks>
          </FooterSection>
          
          <FooterSection>
            <h3>Quick Links</h3>
            <FooterLinks>
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.url}>{link.name}</a>
                </li>
              ))}
            </FooterLinks>
          </FooterSection>
          
          <FooterSection>
            <h3>Contact Info</h3>
            <ContactInfo>
              <div>
                <i className="icon-location"></i>
                <span>New York, NY, United States</span>
              </div>
              <div>
                <i className="icon-mail"></i>
                <span>contact@example.com</span>
              </div>
              <div>
                <i className="icon-phone"></i>
                <span>+1 (555) 123-4567</span>
              </div>
            </ContactInfo>
          </FooterSection>
        </FooterContent>
        
        <Copyright
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.5, duration: 0.6 }
            }
          }}
        >
          <p>&copy; {currentYear} My Portfolio. All rights reserved. Designed with ❤️ by <a href="#home">Your Name</a></p>
        </Copyright>
      </AnimatedSection>
      
      <BackToTop
        onClick={scrollToTop}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <i className="icon-arrow-up"></i>
      </BackToTop>
    </FooterContainer>
  );
};

export default Footer;