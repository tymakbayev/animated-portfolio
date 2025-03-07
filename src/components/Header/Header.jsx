import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAnimation } from '../../contexts/AnimationContext';
import Navigation from '../Navigation/Navigation';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Header.css';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { animationEnabled } = useAnimation();

  const handleNavigation = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80, // Adjust for header height
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`header ${theme} ${animationEnabled ? 'animated' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <h1>Portfolio</h1>
        </div>
        <Navigation onNavigate={handleNavigation} />
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
    </header>
  );
};

export default Header;