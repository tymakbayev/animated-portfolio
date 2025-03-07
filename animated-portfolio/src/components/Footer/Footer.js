import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

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
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <FooterContent>
          <FooterSection as={motion.div} variants={itemVariants}>
            <h3>About Me</h3>
            <p>
              I'm a passionate developer focused on creating beautiful, 
              functional, and user-friendly web experiences with modern 
              technologies and smooth animations.
            </p>
            <SocialLinks>
              <SocialIcon 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="GitHub"
              >
                <i className="fab fa-github"></i>
              </SocialIcon>
              <SocialIcon 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </SocialIcon>
              <SocialIcon 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </SocialIcon>
              <SocialIcon 
                href="https://dribbble.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Dribbble"
              >
                <i className="fab fa-dribbble"></i>
              </SocialIcon>
            </SocialLinks>
          </FooterSection>

          <FooterSection as={motion.div} variants={itemVariants}>
            <h3>Quick Links</h3>
            <FooterLinks>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
            </FooterLinks>
          </FooterSection>

          <FooterSection as={motion.div} variants={itemVariants}>
            <h3>Contact Info</h3>
            <ContactInfo>
              <div>
                <i className="fas fa-map-marker-alt"></i>
                <span>New York, NY, United States</span>
              </div>
              <div>
                <i className="fas fa-envelope"></i>
                <span>contact@example.com</span>
              </div>
              <div>
                <i className="fas fa-phone"></i>
                <span>+1 (555) 123-4567</span>
              </div>
            </ContactInfo>
            <p>Feel free to reach out if you have any questions or want to work together on a project!</p>
          </FooterSection>
        </FooterContent>

        <Copyright
          variants={itemVariants}
          initial="hidden"
          animate={controls}
        >
          <p>
            &copy; {currentYear} My Portfolio. All rights reserved. Designed and built with 
            <span role="img" aria-label="love" style={{ padding: '0 5px' }}>❤️</span>
            by <a href="#home">Your Name</a>
          </p>
        </Copyright>
      </motion.div>

      <BackToTop
        onClick={handleBackToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        aria-label="Back to top"
      >
        <i className="fas fa-arrow-up"></i>
      </BackToTop>
    </FooterContainer>
  );
};

export default Footer;