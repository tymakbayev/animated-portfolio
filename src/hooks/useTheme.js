import { useState, useEffect, useCallback } from 'react';

const useTheme = (initialTheme = 'light') => {
  const [theme, setTheme] = useState(() => {
    // Try to get the theme from localStorage first
    const savedTheme = localStorage.getItem('theme');
    
    // If there's a saved theme, use it
    if (savedTheme) {
      return savedTheme;
    }
    
    // Otherwise check if user prefers dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    // Fall back to the initial theme
    return initialTheme;
  });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Add transition class for smooth theme changes
    document.documentElement.classList.add('theme-transition');
    
    // Remove transition class after animation completes
    const transitionTimeout = setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 500);
    
    return () => clearTimeout(transitionTimeout);
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }, []);

  // Set a specific theme
  const setSpecificTheme = useCallback((newTheme) => {
    if (newTheme === 'light' || newTheme === 'dark') {
      setTheme(newTheme);
    } else {
      console.warn('Theme must be either "light" or "dark"');
    }
  }, []);

  // Check if system theme preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      const newTheme = e.matches ? 'dark' : 'light';
      // Only update if user hasn't manually set a theme
      if (!localStorage.getItem('theme')) {
        setTheme(newTheme);
      }
    };
    
    // Add event listener for theme preference changes
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }
    
    // Clean up
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  // Reset to system preference
  const resetToSystemPreference = useCallback(() => {
    localStorage.removeItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }, []);

  return {
    theme,
    toggleTheme,
    setTheme: setSpecificTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    resetToSystemPreference
  };
};

export default useTheme;