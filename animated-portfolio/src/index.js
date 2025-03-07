import React from 'react';
import ReactDOM from 'react-dom/client';
import { ParallaxProvider } from 'react-scroll-parallax';
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

// Create root and render app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ParallaxProvider>
      <App />
    </ParallaxProvider>
  </React.StrictMode>
);

// Remove loading screen after a short delay to ensure animations are ready
window.addEventListener('load', () => {
  setTimeout(removeLoadingScreen, 800);
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

// Performance monitoring
const reportWebVitals = (metric) => {
  // You can send the metric to an analytics endpoint
  console.log(metric);
};

// Track performance metrics
if (process.env.NODE_ENV !== 'production') {
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(reportWebVitals);
    getFID(reportWebVitals);
    getFCP(reportWebVitals);
    getLCP(reportWebVitals);
    getTTFB(reportWebVitals);
  });
}

// Handle errors globally
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

// Detect user preferences for animations
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  document.documentElement.classList.add('reduced-motion');
}

// Detect device capabilities for optimizations
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
  document.documentElement.classList.add('mobile-device');
}

// Preload critical images
const preloadImages = () => {
  const criticalImages = [
    '/src/assets/logo.svg',
    // Add other critical images here
  ];
  
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

preloadImages();

export { reportWebVitals };