import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = createContext();

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(THEMES.LIGHT);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? THEMES.DARK : THEMES.LIGHT);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setIsTransitioning(true);
    setTheme(prevTheme => (prevTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT));
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const isDarkMode = theme === THEMES.DARK;

  const themeColors = useMemo(() => ({
    primary: isDarkMode ? '#6e56cf' : '#4f46e5',
    secondary: isDarkMode ? '#f97316' : '#ea580c',
    background: isDarkMode ? '#121212' : '#ffffff',
    backgroundSecondary: isDarkMode ? '#1e1e1e' : '#f8f9fa',
    text: isDarkMode ? '#e5e5e5' : '#1a1a1a',
    textSecondary: isDarkMode ? '#a0a0a0' : '#6c757d',
    cardBackground: isDarkMode ? '#252525' : '#ffffff',
    border: isDarkMode ? '#333333' : '#e2e8f0',
    shadow: isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)',
    success: isDarkMode ? '#10b981' : '#10b981',
    error: isDarkMode ? '#ef4444' : '#ef4444',
    warning: isDarkMode ? '#f59e0b' : '#f59e0b',
    info: isDarkMode ? '#3b82f6' : '#3b82f6',
  }), [isDarkMode]);

  const value = {
    theme,
    isDarkMode,
    toggleTheme,
    isTransitioning,
    colors: themeColors,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeContext;