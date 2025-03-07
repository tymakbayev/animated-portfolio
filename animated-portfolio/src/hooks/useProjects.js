import { useState, useEffect, useMemo } from 'react';

// Примерные данные проектов
const projectsData = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A fully responsive e-commerce platform with payment integration',
    category: 'web',
    image: '/images/projects/ecommerce.jpg',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    link: 'https://example.com/ecommerce',
    github: 'https://github.com/username/ecommerce'
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A drag-and-drop task management application with real-time updates',
    category: 'web',
    image: '/images/projects/taskmanager.jpg',
    technologies: ['React', 'Firebase', 'Material-UI'],
    link: 'https://example.com/taskmanager',
    github: 'https://github.com/username/taskmanager'
  },
  {
    id: 3,
    title: 'Mobile Fitness Tracker',
    description: 'A cross-platform mobile app for tracking workouts and nutrition',
    category: 'mobile',
    image: '/images/projects/fitness.jpg',
    technologies: ['React Native', 'Redux', 'Firebase'],
    link: 'https://example.com/fitness',
    github: 'https://github.com/username/fitness'
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'A creative portfolio website with animations and parallax effects',
    category: 'web',
    image: '/images/projects/portfolio.jpg',
    technologies: ['React', 'Framer Motion', 'Styled Components'],
    link: 'https://example.com/portfolio',
    github: 'https://github.com/username/portfolio'
  }
];

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Имитация загрузки данных с сервера
    const fetchProjects = async () => {
      try {
        // В реальном приложении здесь был бы API-запрос
        setLoading(true);
        // Имитация задержки сети
        await new Promise(resolve => setTimeout(resolve, 800));
        setProjects(projectsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load projects');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    if (filter === 'all') return projects;
    return projects.filter(project => project.category === filter);
  }, [projects, filter]);

  const getProjects = () => filteredProjects;

  const filterProjects = (category) => {
    setFilter(category);
  };

  const getProjectById = (id) => {
    return projects.find(project => project.id === parseInt(id));
  };

  return {
    projects: filteredProjects,
    loading,
    error,
    getProjects,
    filterProjects,
    getProjectById,
    currentFilter: filter
  };
};

export default useProjects;
export { projectsData };
