import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const SocialLinks = () => {
  const socialMedia = [
    { name: 'GitHub', url: 'https://github.com', icon: 'github' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
    { name: 'Twitter', url: 'https://twitter.com', icon: 'twitter' }
  ];

  return (
    <div className="social-links">
      {socialMedia.map((social) => (
        <a 
          key={social.name} 
          href={social.url} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label={social.name}
        >
          <i className={`icon-${social.icon}`}></i>
        </a>
      ))}
    </div>
  );
};

const Footer = () => {
  const { isDarkMode } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`footer ${isDarkMode ? 'footer-dark' : 'footer-light'}`}>
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-info">
            <p>&copy; {currentYear} My Portfolio. All rights reserved.</p>
          </div>
          
          <SocialLinks />
          
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
            <a href="/privacy">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
