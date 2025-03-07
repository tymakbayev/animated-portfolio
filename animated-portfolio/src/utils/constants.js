// Site configuration
export const SITE_CONFIG = {
  title: 'Creative Web Developer Portfolio',
  description: 'Interactive portfolio with smooth animations, parallax effects, and seamless transitions',
  author: 'Your Name',
  email: 'your.email@example.com',
  phone: '+1 (123) 456-7890',
  location: 'San Francisco, CA',
  social: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
    dribbble: 'https://dribbble.com/yourusername',
    behance: 'https://behance.net/yourusername',
    instagram: 'https://instagram.com/yourusername'
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

// Social media links
export const SOCIAL_LINKS = [
  { id: 'github', label: 'GitHub', url: 'https://github.com/yourusername', icon: 'github' },
  { id: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com/in/yourusername', icon: 'linkedin' },
  { id: 'twitter', label: 'Twitter', url: 'https://twitter.com/yourusername', icon: 'twitter' },
  { id: 'dribbble', label: 'Dribbble', url: 'https://dribbble.com/yourusername', icon: 'dribbble' },
  { id: 'behance', label: 'Behance', url: 'https://behance.net/yourusername', icon: 'behance' },
  { id: 'instagram', label: 'Instagram', url: 'https://instagram.com/yourusername', icon: 'instagram' }
];

// Skills data
export const SKILLS = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', level: 90, icon: 'react' },
      { name: 'JavaScript', level: 85, icon: 'javascript' },
      { name: 'TypeScript', level: 80, icon: 'typescript' },
      { name: 'HTML5', level: 95, icon: 'html5' },
      { name: 'CSS3', level: 90, icon: 'css3' },
      { name: 'SASS/SCSS', level: 85, icon: 'sass' },
      { name: 'Redux', level: 75, icon: 'redux' },
      { name: 'Next.js', level: 70, icon: 'nextjs' }
    ]
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', level: 75, icon: 'nodejs' },
      { name: 'Express', level: 70, icon: 'express' },
      { name: 'MongoDB', level: 65, icon: 'mongodb' },
      { name: 'GraphQL', level: 60, icon: 'graphql' },
      { name: 'PostgreSQL', level: 55, icon: 'postgresql' },
      { name: 'Firebase', level: 70, icon: 'firebase' }
    ]
  },
  {
    category: 'Tools & Others',
    items: [
      { name: 'Git', level: 85, icon: 'git' },
      { name: 'Webpack', level: 70, icon: 'webpack' },
      { name: 'Docker', level: 60, icon: 'docker' },
      { name: 'Figma', level: 75, icon: 'figma' },
      { name: 'Jest', level: 65, icon: 'jest' },
      { name: 'CI/CD', level: 60, icon: 'cicd' },
      { name: 'AWS', level: 50, icon: 'aws' }
    ]
  },
  {
    category: 'Animation & Design',
    items: [
      { name: 'GSAP', level: 80, icon: 'gsap' },
      { name: 'Framer Motion', level: 85, icon: 'framer' },
      { name: 'Three.js', level: 60, icon: 'threejs' },
      { name: 'CSS Animations', level: 90, icon: 'cssanimations' },
      { name: 'Adobe XD', level: 65, icon: 'adobexd' },
      { name: 'Sketch', level: 60, icon: 'sketch' }
    ]
  }
];

// Projects data
export const PROJECTS = [
  {
    id: 'project1',
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with product listings, cart functionality, and payment processing. Includes user authentication, product search, filtering, and responsive design.',
    longDescription: 'This e-commerce platform was built with a focus on performance and user experience. It features a responsive design that works across all devices, advanced filtering and search capabilities, secure payment processing with Stripe, and a comprehensive admin dashboard for managing products, orders, and customers.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux', 'Stripe', 'JWT', 'SCSS'],
    imageUrl: '/projects/ecommerce.jpg',
    galleryImages: [
      '/projects/ecommerce-detail1.jpg',
      '/projects/ecommerce-detail2.jpg',
      '/projects/ecommerce-detail3.jpg'
    ],
    githubUrl: 'https://github.com/yourusername/ecommerce',
    liveUrl: 'https://ecommerce-demo.yourdomain.com',
    featured: true,
    category: 'fullstack',
    completionDate: '2023-03-15'
  },
  {
    id: 'project2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates and team functionality. Features include task assignment, progress tracking, and deadline notifications.',
    longDescription: 'This task management application was designed to help teams collaborate more effectively. It includes features like real-time updates using WebSockets, task assignment and reassignment, progress tracking with visual indicators, deadline notifications, file attachments, and team chat functionality. The app uses Firebase for real-time database and authentication.',
    technologies: ['React', 'Firebase', 'Material-UI', 'Redux', 'Cloud Functions', 'WebSockets'],
    imageUrl: '/projects/taskmanager.jpg',
    galleryImages: [
      '/projects/taskmanager-detail1.jpg',
      '/projects/taskmanager-detail2.jpg',
      '/projects/taskmanager-detail3.jpg'
    ],
    githubUrl: 'https://github.com/yourusername/taskmanager',
    liveUrl: 'https://taskmanager-demo.yourdomain.com',
    featured: true,
    category: 'frontend',
    completionDate: '2023-05-20'
  },
  {
    id: 'project3',
    title: 'Weather Dashboard',
    description: 'A weather dashboard that displays current and forecasted weather data with interactive visualizations. Includes location search, saved locations, and weather alerts.',
    longDescription: 'This weather dashboard provides users with detailed weather information using the OpenWeather API. It features interactive charts built with Chart.js, location search with autocomplete, saved favorite locations, weather alerts for severe conditions, and a responsive design that works on all devices. The app also includes a dark/light mode toggle.',
    technologies: ['React', 'Chart.js', 'OpenWeather API', 'Styled Components', 'Context API', 'LocalStorage'],
    imageUrl: '/projects/weather.jpg',
    galleryImages: [
      '/projects/weather-detail1.jpg',
      '/projects/weather-detail2.jpg',
      '/projects/weather-detail3.jpg'
    ],
    githubUrl: 'https://github.com/yourusername/weather-dashboard',
    liveUrl: 'https://weather-demo.yourdomain.com',
    featured: false,
    category: 'frontend',
    completionDate: '2023-01-10'
  },
  {
    id: 'project4',
    title: 'Portfolio Website',
    description: 'A personal portfolio website with smooth animations and interactive elements. Features include parallax scrolling, theme switching, and contact form.',
    longDescription: 'This portfolio website showcases my work and skills with a focus on smooth animations and interactive elements. It features parallax scrolling effects, theme switching between light and dark modes, a fully functional contact form, and optimized performance. The site is built with React and uses Framer Motion and GSAP for animations.',
    technologies: ['React', 'Framer Motion', 'GSAP', 'Styled Components', 'EmailJS', 'Responsive Design'],
    imageUrl: '/projects/portfolio.jpg',
    galleryImages: [
      '/projects/portfolio-detail1.jpg',
      '/projects/portfolio-detail2.jpg',
      '/projects/portfolio-detail3.jpg'
    ],
    githubUrl: 'https://github.com/yourusername/portfolio',
    liveUrl: 'https://yourdomain.com',
    featured: true,
    category: 'frontend',
    completionDate: '2023-06-30'
  },
  {
    id: 'project5',
    title: 'Recipe Finder App',
    description: 'An application that allows users to search for recipes based on ingredients they have. Includes filtering by dietary restrictions and meal types.',
    longDescription: 'This recipe finder application helps users discover recipes based on ingredients they already have at home. It includes advanced filtering by dietary restrictions, meal types, and cooking time. Users can save favorite recipes, create shopping lists for missing ingredients, and share recipes with friends. The app uses the Spoonacular API for recipe data.',
    technologies: ['React', 'Context API', 'Spoonacular API', 'CSS Modules', 'LocalStorage', 'PWA'],
    imageUrl: '/projects/recipe.jpg',
    galleryImages: [
      '/projects/recipe-detail1.jpg',
      '/projects/recipe-detail2.jpg',
      '/projects/recipe-detail3.jpg'
    ],
    githubUrl: 'https://github.com/yourusername/recipe-finder',
    liveUrl: 'https://recipe-demo.yourdomain.com',
    featured: false,
    category: 'frontend',
    completionDate: '2022-11-05'
  },
  {
    id: 'project6',
    title: 'Fitness Tracker',
    description: 'A fitness tracking application that allows users to log workouts, track progress, and set fitness goals. Includes visualization of progress over time.',
    longDescription: 'This fitness tracking application helps users maintain their fitness routine by logging workouts, tracking progress, and setting goals. It includes features like workout templates, progress visualization with charts, goal setting and tracking, workout reminders, and social sharing. The app uses a Node.js backend with MongoDB for data storage.',
    technologies: ['React Native', 'Node.js', 'Express', 'MongoDB', 'Chart.js', 'Push Notifications'],
    imageUrl: '/projects/fitness.jpg',
    galleryImages: [
      '/projects/fitness-detail1.jpg',
      '/projects/fitness-detail2.jpg',
      '/projects/fitness-detail3.jpg'
    ],
    githubUrl: 'https://github.com/yourusername/fitness-tracker',
    liveUrl: 'https://fitness-demo.yourdomain.com',
    featured: false,
    category: 'mobile',
    completionDate: '2023-02-18'
  }
];

// Project categories for filtering
export const PROJECT_CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'featured', label: 'Featured' }
];

// Animation settings
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
    slideDown: {
      initial: { opacity: 0, y: -50 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }
    },
    slideRight: {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }
    },
    slideLeft: {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }
    },
    zoomIn: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
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
      warning: '#ff9800',
      info: '#2196f3',
      card: '#ffffff',
      shadow: 'rgba(0, 0, 0, 0.1)'
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
      warning: '#ffb74d',
      info: '#64b5f6',
      card: '#1e1e1e',
      shadow: 'rgba(0, 0, 0, 0.3)'
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
    title: 'About Me',
    path: '/about',
    animationDelay: 0.1
  },
  skills: {
    id: 'skills',
    title: 'Skills',
    path: '/skills',
    animationDelay: 0.2
  },
  projects: {
    id: 'projects',
    title: 'Projects',
    path: '/projects',
    animationDelay: 0.3
  },
  contact: {
    id: 'contact',
    title: 'Contact',
    path: '/contact',
    animationDelay: 0.4
  }
};

// Contact form fields
export const CONTACT_FORM_FIELDS = [
  {
    id: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Your Name',
    required: true,
    minLength: 2,
    maxLength: 100,
    errorMessage: 'Please enter your name (2-100 characters)'
  },
  {
    id: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'your.email@example.com',
    required: true,
    pattern: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
    errorMessage: 'Please enter a valid email address'
  },
  {
    id: 'subject',
    label: 'Subject',
    type: 'text',
    placeholder: 'Subject of your message',
    required: true,
    minLength: 5,
    maxLength: 200,
    errorMessage: 'Please enter a subject (5-200 characters)'
  },
  {
    id: 'message',
    label: 'Message',
    type: 'textarea',
    placeholder: 'Your message here...',
    required: true,
    minLength: 10,
    maxLength: 1000,
    rows: 5,
    errorMessage: 'Please enter your message (10-1000 characters)'
  }
];

// Animation types for AnimatedSection component
export const ANIMATION_TYPES = {
  FADE_IN: 'fade-in',
  FADE_UP: 'fade-up',
  FADE_DOWN: 'fade-down',
  FADE_LEFT: 'fade-left',
  FADE_RIGHT: 'fade-right',
  ZOOM_IN: 'zoom-in',
  ZOOM_OUT: 'zoom-out',
  SLIDE_UP: 'slide-up',
  SLIDE_DOWN: 'slide-down',
  SLIDE_LEFT: 'slide-left',
  SLIDE_RIGHT: 'slide-right',
  BOUNCE: 'bounce',
  PULSE: 'pulse',
  FLIP: 'flip',
  ROTATE: 'rotate'
};

// Parallax direction options
export const PARALLAX_DIRECTIONS = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal'
};

// About me content
export const ABOUT_CONTENT = {
  title: 'About Me',
  subtitle: 'Creative Web Developer & UI/UX Enthusiast',
  paragraphs: [
    "I'm a passionate web developer with a strong focus on creating interactive and visually appealing user experiences. With over 5 years of experience in frontend development, I specialize in building modern web applications using React and related technologies.",
    "My journey in web development began during my computer science studies, where I discovered my passion for combining technical skills with creative design. Since then, I've worked on a variety of projects, from e-commerce platforms to interactive dashboards and portfolio websites.",
    "I believe that great websites should not only look good but also provide intuitive user experiences. That's why I focus on creating responsive, accessible, and performant web applications with smooth animations and interactions.",
    "When I'm not coding, you can find me exploring new design trends, contributing to open-source projects, or learning new technologies to expand my skill set."
  ],
  education: [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of Technology',
      location: 'San Francisco, CA',
      period: '2015 - 2019'
    },
    {
      degree: 'Web Development Bootcamp',
      institution: 'Code Academy',
      location: 'Online',
      period: '2020'
    }
  ],
  experience: [
    {
      position: 'Senior Frontend Developer',
      company: 'Tech Solutions Inc.',
      location: 'San Francisco, CA',
      period: '2021 - Present',
      description: 'Developing modern web applications using React, TypeScript, and related technologies. Leading frontend development for key client projects.'
    },
    {
      position: 'Web Developer',
      company: 'Creative Agency',
      location: 'Los Angeles, CA',
      period: '2019 - 2021',
      description: 'Created responsive websites and web applications for various clients. Worked with React, JavaScript, and CSS frameworks.'
    },
    {
      position: 'Frontend Intern',
      company: 'Startup Hub',
      location: 'San Francisco, CA',
      period: '2018 - 2019',
      description: 'Assisted in developing user interfaces for web applications. Gained experience with HTML, CSS, JavaScript, and React.'
    }
  ]
};

// Hero section content
export const HERO_CONTENT = {
  greeting: 'Hello, I am',
  name: 'Your Name',
  title: 'Creative Web Developer',
  subtitle: 'I build modern, interactive web experiences',
  description: 'Specializing in React, JavaScript, and interactive web animations',
  cta: {
    primary: {
      text: 'View My Work',
      link: '#projects'
    },
    secondary: {
      text: 'Contact Me',
      link: '#contact'
    }
  },
  backgroundAnimation: true
};

// Footer content
export const FOOTER_CONTENT = {
  copyright: `© ${new Date().getFullYear()} Your Name. All rights reserved.`,
  links: [
    { label: 'Privacy Policy', url: '/privacy' },
    { label: 'Terms of Service', url: '/terms' }
  ],
  quote: 'Crafting digital experiences with passion and precision.'
};