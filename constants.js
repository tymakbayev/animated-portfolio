// src/utils/constants.js

// Site configuration
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

// Navigation links for the header
export const NAV_LINKS = [
  { id: 'home', label: 'Home', path: 'hero' },
  { id: 'about', label: 'About', path: 'about' },
  { id: 'skills', label: 'Skills', path: 'skills' },
  { id: 'projects', label: 'Projects', path: 'projects' },
  { id: 'contact', label: 'Contact', path: 'contact' }
];

// Animation configuration
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

// Theme configuration
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

// Responsive breakpoints
export const BREAKPOINTS = {
  xs: '320px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px'
};

// Media queries for responsive design
export const MEDIA_QUERIES = {
  xs: `@media (min-width: ${BREAKPOINTS.xs})`,
  sm: `@media (min-width: ${BREAKPOINTS.sm})`,
  md: `@media (min-width: ${BREAKPOINTS.md})`,
  lg: `@media (min-width: ${BREAKPOINTS.lg})`,
  xl: `@media (min-width: ${BREAKPOINTS.xl})`,
  xxl: `@media (min-width: ${BREAKPOINTS.xxl})`,
  mobile: `@media (max-width: ${BREAKPOINTS.md})`,
  tablet: `@media (min-width: ${BREAKPOINTS.md}) and (max-width: ${BREAKPOINTS.lg})`,
  desktop: `@media (min-width: ${BREAKPOINTS.lg})`,
  dark: '@media (prefers-color-scheme: dark)',
  light: '@media (prefers-color-scheme: light)',
  hover: '@media (hover: hover)',
  noHover: '@media (hover: none)'
};

// Section configuration
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

// API configuration
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

// API base URL and timeout
export const API_BASE_URL = API_CONFIG.baseUrl;
export const API_TIMEOUT = API_CONFIG.timeout;

// Skills configuration
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
        { name: 'CSS Animations', level: 85 },
        { name: 'Three.js', level: 70 },
        { name: 'Lottie', level: 75 }
      ]
    },
    {
      name: 'Backend',
      skills: [
        { name: 'Node.js', level: 75 },
        { name: 'Express', level: 80 },
        { name: 'MongoDB', level: 70 },
        { name: 'GraphQL', level: 65 },
        { name: 'Firebase', level: 75 }
      ]
    },
    {
      name: 'Tools',
      skills: [
        { name: 'Git', level: 85 },
        { name: 'Webpack', level: 75 },
        { name: 'Vite', level: 80 },
        { name: 'Jest', level: 70 },
        { name: 'Figma', level: 75 }
      ]
    }
  ]
};

// Project categories for filtering
export const PROJECT_CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'web', name: 'Web Development' },
  { id: 'mobile', name: 'Mobile Apps' },
  { id: 'ui', name: 'UI/UX Design' },
  { id: 'animation', name: 'Animation' }
];

// Sample projects data
export const PROJECTS_DATA = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with product management, cart functionality, and payment processing.',
    image: '/projects/ecommerce.jpg',
    category: 'web',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    link: 'https://example.com/ecommerce',
    github: 'https://github.com/yourusername/ecommerce',
    featured: true
  },
  {
    id: 2,
    title: 'Mobile Fitness App',
    description: 'A fitness tracking application with workout plans, progress monitoring, and social features.',
    image: '/projects/fitness.jpg',
    category: 'mobile',
    technologies: ['React Native', 'Firebase', 'Redux', 'HealthKit'],
    link: 'https://example.com/fitness',
    github: 'https://github.com/yourusername/fitness-app',
    featured: true
  },
  {
    id: 3,
    title: 'Interactive Dashboard',
    description: 'A data visualization dashboard with real-time updates, filtering, and interactive charts.',
    image: '/projects/dashboard.jpg',
    category: 'web',
    technologies: ['React', 'D3.js', 'Socket.io', 'Express'],
    link: 'https://example.com/dashboard',
    github: 'https://github.com/yourusername/dashboard',
    featured: false
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'A creative portfolio website with animations, parallax effects, and interactive elements.',
    image: '/projects/portfolio.jpg',
    category: 'animation',
    technologies: ['React', 'Framer Motion', 'GSAP', 'Styled Components'],
    link: 'https://example.com/portfolio',
    github: 'https://github.com/yourusername/portfolio',
    featured: true
  },
  {
    id: 5,
    title: 'Travel Booking Platform',
    description: 'A travel booking platform with search, filtering, and reservation functionality.',
    image: '/projects/travel.jpg',
    category: 'web',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Mapbox'],
    link: 'https://example.com/travel',
    github: 'https://github.com/yourusername/travel',
    featured: false
  },
  {
    id: 6,
    title: 'UI Component Library',
    description: 'A reusable UI component library with customizable themes and accessibility features.',
    image: '/projects/ui-library.jpg',
    category: 'ui',
    technologies: ['React', 'Storybook', 'Jest', 'Styled Components'],
    link: 'https://example.com/ui-library',
    github: 'https://github.com/yourusername/ui-library',
    featured: false
  }
];

// Contact form fields
export const CONTACT_FORM_FIELDS = [
  { id: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Your Name' },
  { id: 'email', label: 'Email', type: 'email', required: true, placeholder: 'your.email@example.com' },
  { id: 'subject', label: 'Subject', type: 'text', required: true, placeholder: 'Subject' },
  { id: 'message', label: 'Message', type: 'textarea', required: true, placeholder: 'Your message here...' }
];

// Social media links
export const SOCIAL_LINKS = [
  { id: 'github', label: 'GitHub', icon: 'github', url: 'https://github.com/yourusername' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com/in/yourusername' },
  { id: 'twitter', label: 'Twitter', icon: 'twitter', url: 'https://twitter.com/yourusername' },
  { id: 'dribbble', label: 'Dribbble', icon: 'dribbble', url: 'https://dribbble.com/yourusername' },
  { id: 'behance', label: 'Behance', icon: 'behance', url: 'https://behance.net/yourusername' }
];

// Local storage keys
export const STORAGE_KEYS = {
  theme: 'portfolio-theme-preference',
  visitedSections: 'portfolio-visited-sections',
  contactFormData: 'portfolio-contact-form-data'
};

// Animation timing for staggered animations
export const STAGGER_ANIMATION_CONFIG = {
  parent: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },
  child: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  }
};

// Intersection observer default options
export const INTERSECTION_OBSERVER_OPTIONS = {
  threshold: 0.1,
  triggerOnce: true,
  rootMargin: '-100px 0px'
};

// Parallax effect strengths
export const PARALLAX_STRENGTH = {
  light: 100,
  medium: 200,
  strong: 300
};

// Z-index values for consistent layering
export const Z_INDEX = {
  background: -1,
  base: 0,
  content: 10,
  overlay: 100,
  modal: 200,
  tooltip: 300,
  header: 1000
};