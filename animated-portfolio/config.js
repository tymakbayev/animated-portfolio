// src/utils/config.js
export const SITE_CONFIG = {
  title: 'Creative Web Developer Portfolio',
  description: 'Interactive portfolio with smooth animations, parallax effects, and seamless transitions',
  author: 'Your Name',
  email: 'your.email@example.com',
  social: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
    dribbble: 'https://dribbble.com/yourusername',
    behance: 'https://behance.net/yourusername'
  },
  resume: '/resume.pdf'
};

export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.3,
    medium: 0.6,
    slow: 0.9,
    extraSlow: 1.5
  },
  easing: {
    smooth: [0.43, 0.13, 0.23, 0.96],
    bounce: [0.68, -0.55, 0.27, 1.55],
    elastic: [0.64, 0.57, 0.67, 1.53],
    gentle: [0.25, 0.1, 0.25, 1]
  },
  transition: {
    page: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.6 }
    },
    slideUp: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }
    },
    slideRight: {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }
    },
    staggerChildren: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  parallax: {
    slow: { translateY: [0, -50] },
    medium: { translateY: [0, -100] },
    fast: { translateY: [0, -150] }
  },
  scroll: {
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '-100px 0px'
  }
};

export const THEME_CONFIG = {
  light: {
    id: 'light',
    name: 'Light Mode',
    colors: {
      primary: '#6c63ff',
      secondary: '#f50057',
      accent: '#00bfa5',
      background: '#ffffff',
      surface: '#f5f5f5',
      text: '#333333',
      textSecondary: '#757575',
      border: '#e0e0e0',
      error: '#f44336',
      success: '#4caf50',
      warning: '#ff9800'
    }
  },
  dark: {
    id: 'dark',
    name: 'Dark Mode',
    colors: {
      primary: '#bb86fc',
      secondary: '#ff4081',
      accent: '#03dac6',
      background: '#121212',
      surface: '#1e1e1e',
      text: '#f5f5f5',
      textSecondary: '#b0b0b0',
      border: '#333333',
      error: '#cf6679',
      success: '#81c784',
      warning: '#ffb74d'
    }
  }
};

export const BREAKPOINTS = {
  xs: '320px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px'
};

export const SECTION_CONFIG = {
  hero: {
    id: 'hero',
    title: 'Hero',
    path: '/',
    animationDelay: 0
  },
  about: {
    id: 'about',
    title: 'About',
    path: '/about',
    animationDelay: 0.2
  },
  skills: {
    id: 'skills',
    title: 'Skills',
    path: '/skills',
    animationDelay: 0.3
  },
  projects: {
    id: 'projects',
    title: 'Projects',
    path: '/projects',
    animationDelay: 0.4
  },
  contact: {
    id: 'contact',
    title: 'Contact',
    path: '/contact',
    animationDelay: 0.5
  }
};

export const API_CONFIG = {
  baseUrl: 'https://api.example.com',
  endpoints: {
    projects: '/projects',
    contact: '/contact',
    skills: '/skills'
  },
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

export const SKILLS_CONFIG = {
  categories: [
    {
      name: 'Frontend',
      skills: [
        { name: 'React', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'TypeScript', level: 80 },
        { name: 'HTML/CSS', level: 90 },
        { name: 'Styled Components', level: 85 }
      ]
    },
    {
      name: 'Animation',
      skills: [
        { name: 'Framer Motion', level: 85 },
        { name: 'GSAP', level: 80 },
        { name: 'CSS Animations', level: 90 },
        { name: 'Three.js', level: 70 }
      ]
    },
    {
      name: 'Tools',
      skills: [
        { name: 'Git', level: 85 },
        { name: 'Webpack', level: 75 },
        { name: 'Vite', level: 80 },
        { name: 'Figma', level: 70 }
      ]
    }
  ]
};

export const CONTACT_FORM_CONFIG = {
  initialValues: {
    name: '',
    email: '',
    subject: '',
    message: ''
  },
  validation: {
    name: {
      required: 'Name is required',
      minLength: { value: 2, message: 'Name must be at least 2 characters' }
    },
    email: {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address'
      }
    },
    subject: {
      required: 'Subject is required',
      minLength: { value: 5, message: 'Subject must be at least 5 characters' }
    },
    message: {
      required: 'Message is required',
      minLength: { value: 10, message: 'Message must be at least 10 characters' }
    }
  }
};

export const PROJECTS_FILTER_CATEGORIES = [
  'All',
  'Web Development',
  'UI/UX Design',
  'Animation',
  'Mobile App'
];

export default {
  SITE_CONFIG,
  ANIMATION_CONFIG,
  THEME_CONFIG,
  BREAKPOINTS,
  SECTION_CONFIG,
  API_CONFIG,
  SKILLS_CONFIG,
  CONTACT_FORM_CONFIG,
  PROJECTS_FILTER_CATEGORIES
};