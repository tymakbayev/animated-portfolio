import React from 'react';
import ReactDOM from 'react-dom/client';
import { ParallaxProvider } from 'react-scroll-parallax';
import { ThemeProvider } from '@contexts/ThemeContext';
import { AnimationProvider } from '@contexts/AnimationContext';
import App from './App';
import './styles/variables.css';
import './styles/global.css';
import './styles/theme.css';
import './styles/animations.css';

// Polyfill for smooth scrolling in Safari and older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
  import('scroll-behavior-polyfill').then(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  });
}

// Remove the loading screen once the app is ready
const removeLoadingScreen = () => {
  const loadingScreen = document.querySelector('.loading-screen');
  if (loadingScreen) {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }
};

// Preload critical assets
const preloadAssets = () => {
  const criticalImages = [
    '/assets/hero-background.webp',
    '/assets/profile-photo.webp',
    '/assets/logo.svg'
  ];
  
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

// Initialize performance monitoring
const initPerformanceMonitoring = () => {
  if ('performance' in window && 'PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log(`LCP: ${entry.startTime.toFixed(2)}ms`);
        }
        if (entry.entryType === 'first-input') {
          console.log(`FID: ${entry.processingStart - entry.startTime}ms`);
        }
      });
    });
    
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
  }
};

// Create root and render app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AnimationProvider>
        <ParallaxProvider>
          <App />
        </ParallaxProvider>
      </AnimationProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// Initialize app
window.addEventListener('load', () => {
  // Remove loading screen after a short delay to ensure animations are ready
  setTimeout(removeLoadingScreen, 800);
  
  // Preload critical assets
  preloadAssets();
  
  // Initialize performance monitoring
  initPerformanceMonitoring();
});

// Register service worker for PWA support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Handle errors globally
window.addEventListener('error', (event) => {
  // You could send errors to a monitoring service here
  console.error('Global error:', event.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

// Add resize listener for responsive adjustments
window.addEventListener('resize', () => {
  // Dispatch a custom event that components can listen for
  window.dispatchEvent(new CustomEvent('app-resize'));
});

// Detect if user prefers reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  document.documentElement.classList.add('reduced-motion');
}