# Animated Portfolio

![Animated Portfolio](src/assets/logo.svg)

A modern, interactive web portfolio application built with React, featuring smooth animations, parallax effects, and seamless section transitions. This project showcases professional work in an engaging, visually appealing format with customizable themes and responsive design.

## ✨ Features

- **Smooth Animations** - Elegant transitions and animations powered by Framer Motion and GSAP
- **Parallax Effects** - Dynamic scrolling effects that create depth and visual interest
- **Theme Switching** - Toggle between light and dark themes with persistent preferences
- **Responsive Design** - Optimized for all device sizes from mobile to desktop
- **Intersection Observer API** - Efficiently triggers animations when elements enter the viewport
- **Project Filtering** - Filter portfolio projects by category
- **Accessibility** - Built with accessibility in mind for all users

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14.0.0 or higher)
- npm (v6.0.0 or higher) or [Yarn](https://yarnpkg.com/)

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/animated-portfolio.git
   cd animated-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
# or
yarn preview
```

## 🧪 Running Tests

This project uses Vitest and Testing Library for testing:

```bash
npm run test
# or
yarn test
```

To run tests with coverage:

```bash
npm run test:coverage
# or
yarn test:coverage
```

## 📁 Project Structure

```
animated-portfolio/
├── public/                  # Static files
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── assets/              # Images, fonts, etc.
│   │   └── logo.svg
│   ├── components/          # React components
│   │   ├── Animation/       # Animation-related components
│   │   ├── Footer/          # Footer components
│   │   ├── Header/          # Header and navigation components
│   │   └── MainContent/     # Main content sections
│   ├── contexts/            # React context providers
│   ├── hooks/               # Custom React hooks
│   ├── services/            # Service modules
│   ├── styles/              # CSS styles
│   ├── utils/               # Utility functions
│   ├── __tests__/           # Test files
│   ├── App.jsx              # Main App component
│   └── index.jsx            # Application entry point
├── .eslintrc.json           # ESLint configuration
├── .gitignore               # Git ignore file
├── .prettierrc              # Prettier configuration
├── index.html               # HTML entry point
├── jsconfig.json            # JavaScript configuration
├── package.json             # Project dependencies and scripts
├── README.md                # Project documentation
└── vite.config.js           # Vite configuration
```

## 🧩 Components

### Animation Components

#### AnimatedSection

The `AnimatedSection` component wraps content with animation effects that trigger when the element enters the viewport.

```jsx
import AnimatedSection from './components/Animation/AnimatedSection';

// Basic usage
<AnimatedSection>
  <h2>This content will animate in</h2>
</AnimatedSection>

// With custom animation properties
<AnimatedSection 
  animation="slide-up" 
  delay={0.3} 
  duration={1.2} 
  threshold={0.3}
>
  <p>Custom animated content</p>
</AnimatedSection>
```

#### ParallaxEffect

The `ParallaxEffect` component creates depth by moving elements at different speeds during scrolling.

```jsx
import ParallaxEffect from './components/Animation/ParallaxEffect';

<ParallaxEffect speed={0.7} direction="vertical">
  <img src="/path/to/image.jpg" alt="Parallax Image" />
</ParallaxEffect>
```

### Context Providers

#### ThemeContext

Provides theme management throughout the application:

```jsx
import { useTheme } from './contexts/ThemeContext';

const MyComponent = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
      <button onClick={toggleTheme}>
        Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
};
```

#### AnimationContext

Manages animation states and provides animation control throughout the app:

```jsx
import { useAnimation } from './contexts/AnimationContext';

const MyComponent = () => {
  const { 
    animationState, 
    setElementAnimated, 
    setActiveSection 
  } = useAnimation();
  
  return (
    <div>
      {animationState.isLoading ? 'Loading...' : 'Content'}
    </div>
  );
};
```

### Custom Hooks

#### useIntersectionObserver

A hook that simplifies working with the Intersection Observer API:

```jsx
import useIntersectionObserver from './hooks/useIntersectionObserver';

const MyComponent = () => {
  const elementRef = useRef(null);
  const { observe, entries } = useIntersectionObserver({
    threshold: 0.5
  });
  
  useEffect(() => {
    if (elementRef.current) {
      observe(elementRef.current, 'my-element');
    }
  }, [observe]);
  
  useEffect(() => {
    const entry = entries.find(e => e.target === elementRef.current);
    if (entry?.isIntersecting) {
      console.log('Element is visible!');
    }
  }, [entries]);
  
  return <div ref={elementRef}>I will be observed</div>;
};
```

#### useProjects

A hook that manages project data and filtering:

```jsx
import { useProjects } from './hooks/useProjects';

const ProjectsSection = () => {
  const { 
    projects, 
    categories, 
    activeFilter, 
    filterProjects, 
    isLoading 
  } = useProjects();
  
  return (
    <div>
      {categories.map(category => (
        <button 
          key={category}
          className={activeFilter === category ? 'active' : ''}
          onClick={() => filterProjects(category)}
        >
          {category}
        </button>
      ))}
      
      {isLoading ? (
        <p>Loading projects...</p>
      ) : (
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
```

## 🎨 Styling

The project uses a combination of CSS modules and styled-components for styling. The main style files are:

- `src/styles/global.css` - Global styles
- `src/styles/animations.css` - Animation definitions
- `src/styles/theme.css` - Theme variables and dark/light mode styles
- `src/styles/variables.css` - CSS variables for colors, spacing, etc.

## 📚 API Documentation

### AnimationService

The `AnimationService` provides utility functions for creating and managing animations:

```javascript
import { AnimationService } from './services/AnimationService';

// Create a timeline animation
const timeline = AnimationService.createTimeline({
  defaults: { duration: 0.8, ease: 'power2.out' }
});

// Add animations to the timeline
timeline.add('.element', { opacity: 0, y: 20 }, 0)
        .add('.element', { opacity: 1, y: 0 }, 0.2);

// Play the animation
AnimationService.playAnimation(timeline);

// Pause the animation
AnimationService.pauseAnimation(timeline);
```

## 🔧 Configuration

### Theme Configuration

You can customize the theme colors in `src/styles/variables.css`:

```css
:root {
  /* Light theme (default) */
  --primary-color: #4a6cf7;
  --secondary-color: #f97316;
  --background-color: #ffffff;
  --text-color: #121212;
  --card-bg-color: #f8f9fa;
  --border-color: #e9ecef;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  
  /* Font sizes */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.25rem;
  --font-size-xl: 1.5rem;
  --font-size-2xl: 2rem;
  --font-size-3xl: 3rem;
}

.dark-theme {
  --primary-color: #6d8dff;
  --secondary-color: #ff8c38;
  --background-color: #121212;
  --text-color: #f8f9fa;
  --card-bg-color: #1e1e1e;
  --border-color: #2d2d2d;
}
```

### Animation Configuration

You can customize default animation settings in `src/utils/constants.js`:

```javascript
export const ANIMATION_DEFAULTS = {
  duration: 0.8,
  ease: 'power2.out',
  staggerChildren: 0.1,
  delayChildren: 0.2
};

export const ANIMATION_TYPES = {
  FADE_IN: 'fade-in',
  SLIDE_UP: 'slide-up',
  SLIDE_DOWN: 'slide-down',
  SLIDE_LEFT: 'slide-left',
  SLIDE_RIGHT: 'slide-right',
  SCALE: 'scale',
  ROTATE: 'rotate'
};

export const PARALLAX_DEFAULTS = {
  speed: 0.5,
  direction: 'vertical'
};
```

## 📱 Responsive Design

The portfolio is fully responsive and optimized for all device sizes. Key breakpoints are defined in `src/styles/variables.css`:

```css
:root {
  --breakpoint-xs: 480px;
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- [GSAP](https://greensock.com/gsap/)
- [React Intersection Observer](https://github.com/thebuilder/react-intersection-observer)
- [React Scroll Parallax](https://github.com/jscottsmith/react-scroll-parallax)
- [Styled Components](https://styled-components.com/)

## 📧 Contact

Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/animated-portfolio](https://github.com/yourusername/animated-portfolio)

---

Made with ❤️ by [Your Name](https://yourwebsite.com)