import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ProjectFilter from './ProjectFilter';
import { useAnimation } from '../../contexts/AnimationContext';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import './Projects.css';

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // In a real app, this would be an API call
        const projectsData = [
          {
            id: 1,
            title: 'E-commerce Platform',
            description: 'A full-featured online store with payment integration',
            image: '/images/projects/ecommerce.jpg',
            category: 'web',
            technologies: ['React', 'Node.js', 'MongoDB'],
            link: 'https://example.com/ecommerce'
          },
          {
            id: 2,
            title: 'Travel App',
            description: 'Mobile application for travel planning and booking',
            image: '/images/projects/travel.jpg',
            category: 'mobile',
            technologies: ['React Native', 'Firebase'],
            link: 'https://example.com/travel'
          },
          {
            id: 3,
            title: 'Dashboard UI',
            description: 'Admin dashboard with data visualization',
            image: '/images/projects/dashboard.jpg',
            category: 'ui',
            technologies: ['React', 'D3.js', 'Styled Components'],
            link: 'https://example.com/dashboard'
          },
          {
            id: 4,
            title: 'Social Network',
            description: 'Community platform with real-time messaging',
            image: '/images/projects/social.jpg',
            category: 'web',
            technologies: ['React', 'Socket.io', 'Express'],
            link: 'https://example.com/social'
          }
        ];

        setProjects(projectsData);
        setFilteredProjects(projectsData);
        
        // Extract unique categories
        const uniqueCategories = ['all', ...new Set(projectsData.map(project => project.category))];
        setCategories(uniqueCategories);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filterProjects = (category) => {
    setActiveFilter(category);
    
    if (category === 'all') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => project.category === category);
      setFilteredProjects(filtered);
    }
  };

  return {
    projects: filteredProjects,
    categories,
    activeFilter,
    filterProjects,
    isLoading
  };
};

const Projects = () => {
  const { projects, categories, activeFilter, filterProjects, isLoading } = useProjects();
  const { setElementAnimated } = useAnimation();
  const sectionRef = useRef(null);
  const { observe } = useIntersectionObserver({
    threshold: 0.2
  });

  useEffect(() => {
    if (sectionRef.current) {
      observe(sectionRef.current, 'projects-section');
    }
  }, [observe]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2>My Projects</h2>
          <p>Explore my recent work and creative solutions</p>
        </motion.div>

        <ProjectFilter 
          categories={categories} 
          activeFilter={activeFilter} 
          onFilterChange={filterProjects} 
        />

        {isLoading ? (
          <div className="loading-spinner">Loading projects...</div>
        ) : (
          <motion.div 
            className="projects-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map(project => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;