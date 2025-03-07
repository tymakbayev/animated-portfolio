import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { motion } from 'framer-motion';
import ProjectCard from '@components/MainContent/ProjectCard';
import { lightTheme } from '@utils/constants';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    motion: {
      ...actual.motion,
      div: ({ children, ...props }) => <div {...props}>{children}</div>,
      a: ({ children, ...props }) => <a {...props}>{children}</a>,
      img: ({ ...props }) => <img {...props} />,
    },
  };
});

const mockProject = {
  id: 'project-1',
  title: 'Test Project',
  description: 'This is a test project description',
  image: '/test-image.jpg',
  technologies: ['React', 'TypeScript', 'Styled Components'],
  liveUrl: 'https://example.com/live',
  codeUrl: 'https://github.com/example/repo',
  featured: true,
};

describe('ProjectCard Component', () => {
  const renderProjectCard = (props = {}) => {
    return render(
      <ThemeProvider theme={lightTheme}>
        <ProjectCard project={mockProject} {...props} />
      </ThemeProvider>
    );
  };

  it('renders project information correctly', () => {
    renderProjectCard();
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('This is a test project description')).toBeInTheDocument();
    expect(screen.getByAltText('Test Project')).toHaveAttribute('src', '/test-image.jpg');
    
    // Check if all technologies are displayed
    mockProject.technologies.forEach(tech => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });

  it('renders project links correctly', () => {
    renderProjectCard();
    
    const liveLink = screen.getByText('View Live');
    const codeLink = screen.getByText('View Code');
    
    expect(liveLink).toHaveAttribute('href', 'https://example.com/live');
    expect(codeLink).toHaveAttribute('href', 'https://github.com/example/repo');
    expect(liveLink).toHaveAttribute('target', '_blank');
    expect(codeLink).toHaveAttribute('target', '_blank');
    expect(liveLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(codeLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('applies featured styling when project is featured', () => {
    const { container } = renderProjectCard();
    
    // Check for featured class or attribute
    // This will depend on how you've implemented the featured styling
    // This is an example approach - adjust based on your implementation
    const cardElement = container.firstChild;
    expect(cardElement).toHaveAttribute('data-featured', 'true');
  });

  it('does not apply featured styling when project is not featured', () => {
    const nonFeaturedProject = { ...mockProject, featured: false };
    const { container } = renderProjectCard({ project: nonFeaturedProject });
    
    const cardElement = container.firstChild;
    expect(cardElement).toHaveAttribute('data-featured', 'false');
  });

  it('handles missing project links gracefully', () => {
    const projectWithoutLinks = {
      ...mockProject,
      liveUrl: '',
      codeUrl: '',
    };
    
    renderProjectCard({ project: projectWithoutLinks });
    
    // Links should not be rendered if URLs are empty
    expect(screen.queryByText('View Live')).not.toBeInTheDocument();
    expect(screen.queryByText('View Code')).not.toBeInTheDocument();
  });

  it('handles click events on project card', () => {
    const handleClick = vi.fn();
    renderProjectCard({ onClick: handleClick });
    
    // Find the clickable area (excluding links)
    const cardContent = screen.getByText('Test Project').closest('div');
    fireEvent.click(cardContent);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct animation variants', () => {
    const { container } = renderProjectCard({ index: 2 });
    
    // Check if animation delay is applied based on index
    // This will depend on how you've implemented the animation
    // This is an example approach - adjust based on your implementation
    const cardElement = container.firstChild;
    expect(cardElement).toHaveAttribute('data-index', '2');
  });

  it('renders with custom className when provided', () => {
    const { container } = renderProjectCard({ className: 'custom-card-class' });
    
    const cardElement = container.firstChild;
    expect(cardElement).toHaveClass('custom-card-class');
  });
});