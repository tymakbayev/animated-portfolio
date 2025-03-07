import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components';

// Определение тем
const lightTheme = {
  primary: '#6c63ff',
  secondary: '#4d44db',
  accent: '#ff7b5c',
  background: '#ffffff',
  backgroundSecondary: '#f8f9fa',
  cardBackground: '#ffffff',
  text: '#333333',
  textSecondary: '#666666',
  border: '#e0e0e0',
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowHover: 'rgba(0, 0, 0, 0.15)',
  success: '#28a745',
  error: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  navBackground: 'rgba(255, 255, 255, 0.9)',
  navShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  buttonText: '#ffffff',
  inputBackground: '#ffffff',
  inputBorder: '#ced4da',
  inputFocus: '#4d44db',
  scrollbarThumb: '#c1c1c1',
  scrollbarTrack: '#f1f1f1',
  footerBackground: '#f8f9fa',
  gradientStart: '#6c63ff',
  gradientEnd: '#4d44db',
  mode: 'light'
};

const darkTheme = {
  primary: '#6c63ff',
  secondary: '#4d44db',
  accent: '#ff7b5c',
  background: '#121212',
  backgroundSecondary: '#1e1e1e',
  cardBackground: '#2d2d2d',
  text: '#f0f0f0',
  textSecondary: '#b0b0b0',
  border: '#444444',
  shadow: 'rgba(0, 0, 0, 0.3)',
  shadowHover: 'rgba(0, 0, 0, 0.4)',
  success: '#28a745',
  error: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  navBackground: 'rgba(18, 18, 18, 0.9)',
  navShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  buttonText: '#ffffff',
  inputBackground: '#2d2d2d',
  inputBorder: '#444444',
  inputFocus: '#6c63ff',
  scrollbarThumb: '#444444',
  scrollbarTrack: '#2d2d2d',
  footerBackground: '#1e1e1e',
  gradientStart: '#6c63ff',
  gradientEnd: '#4d44db',
  mode: 'dark'
};

// Создание контекста темы
const ThemeContext = createContext();

// Глобальные стили для темы
const GlobalThemeStyles = styled.div`
  transition: background-color 0.3s ease, color 0.3s ease;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
  
  &::-webkit-scrollbar {
    width: 10px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.scrollbarTrack};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.scrollbarThumb};
    border-radius: 5px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.primary};
  }
`;

const ThemeProvider = ({ children }) => {
  // Получаем предпочтения пользователя из localStorage или системных настроек
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    
    // Проверяем системные предпочтения
    const prefersDark = window.matchMedia && 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  };

  const [themeMode, setThemeMode] = useState(getInitialTheme);
  
  // Мемоизируем текущую тему для предотвращения ненужных ререндеров
  const theme = useMemo(() => {
    return themeMode === 'dark' ? darkTheme : lightTheme;
  }, [themeMode]);

  // Функция для переключения темы
  const toggleTheme = () => {
    setThemeMode(prevMode => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newMode);
      return newMode;
    });
  };

  // Слушаем изменения системных предпочтений
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Обновляем тему только если пользователь не установил её вручную
      if (!localStorage.getItem('theme')) {
        setThemeMode(e.matches ? 'dark' : 'light');
      }
    };
    
    // Добавляем слушатель событий
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Для старых браузеров
      mediaQuery.addListener(handleChange);
    }
    
    // Очистка слушателя
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  // Применяем атрибут data-theme к body для возможности использования CSS-переменных
  useEffect(() => {
    document.body.setAttribute('data-theme', themeMode);
    
    // Обновляем мета-тег theme-color для мобильных браузеров
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content', 
        themeMode === 'dark' ? darkTheme.background : lightTheme.background
      );
    }
  }, [themeMode]);

  // Значение контекста
  const contextValue = {
    theme,
    themeMode,
    toggleTheme,
    isDark: themeMode === 'dark',
    isLight: themeMode === 'light'
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <StyledThemeProvider theme={theme}>
        <GlobalThemeStyles>
          {children}
        </GlobalThemeStyles>
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// Хук для использования темы в компонентах
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;