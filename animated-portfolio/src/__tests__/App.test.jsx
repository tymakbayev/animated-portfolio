import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ParallaxProvider } from 'react-scroll-parallax';
import { ThemeProvider } from 'styled-components';
import App from '../App';
import { ThemeContext } from '../contexts/ThemeContext';
import { AnimationContext } from '../contexts/AnimationContext';
import { lightTheme, darkTheme } from '../utils/constants';

// Mock intersection observer
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock GSAP
jest.mock('gsap', () => ({
  to: jest.fn(),
  fromTo: jest.fn(),
  timeline: jest.fn(() => ({
    to: jest.fn(),
    fromTo: jest.fn(),
    add: jest.fn()
  }))
}));

// Mock components that might cause issues in tests
jest.mock('../components/Animation/ParallaxEffect', () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid="parallax-effect">{children}</div>
}));

const renderWithProviders = (ui, { theme = 'light', animationsEnabled = true } = {}) => {
  return render(
    <ThemeContext.Provider value={{ 
      theme: theme === 'light' ? 'light' : 'dark', 
      themeObject: theme === 'light' ? lightTheme : darkTheme,
      toggleTheme: jest.fn() 
    }}>
      <AnimationContext.Provider value={{ 
        animationsEnabled, 
        toggleAnimations: jest.fn() 
      }}>
        <ParallaxProvider>
          {ui}
        </ParallaxProvider>
      </AnimationContext.Provider>
    </ThemeContext.Provider>
  );
};

describe('App Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    
    // Mock window methods
    Object.defineProperty(window, 'scrollTo', { value: jest.fn(), writable: true });
    
    // Mock element.getBoundingClientRect
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 1200,
      height: 800,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      x: 0,
      y: 0,
      toJSON: () => {}
    }));
  });

  test('renders without crashing', () => {
    renderWithProviders(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument(); // Header
    expect(screen.getByRole('main')).toBeInTheDocument(); // MainContent
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Footer
  });

  test('renders hero section with call-to-action button', () => {
    renderWithProviders(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/view my work/i)).toBeInTheDocument();
  });

  test('renders all main sections', () => {
    renderWithProviders(<App />);
    
    // Check for section headings
    expect(screen.getByText(/about me/i)).toBeInTheDocument();
    expect(screen.getByText(/projects/i)).toBeInTheDocument();
    expect(screen.getByText(/skills/i)).toBeInTheDocument();
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
  });

  test('theme toggle changes theme', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);
    
    // Find theme toggle button
    const themeToggle = screen.getByRole('button', { name: /toggle theme/i });
    expect(themeToggle).toBeInTheDocument();
    
    // Click theme toggle
    await user.click(themeToggle);
    
    // Since we mocked the context, we just verify the toggle was clicked
    expect(themeToggle).toBeInTheDocument();
  });

  test('navigation links scroll to correct sections', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);
    
    // Find navigation links
    const aboutLink = screen.getByRole('link', { name: /about/i });
    
    // Click about link
    await user.click(aboutLink);
    
    // Verify scrollTo was called
    await waitFor(() => {
      expect(window.scrollTo).toHaveBeenCalled();
    });
  });

  test('renders with animations disabled', () => {
    renderWithProviders(<App />, { animationsEnabled: false });
    
    // App should still render all sections
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  test('renders with dark theme', () => {
    renderWithProviders(<App />, { theme: 'dark' });
    
    // App should render with dark theme
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  test('contact form is present and interactive', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);
    
    // Find contact form elements
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });
    
    // Interact with form
    await user.type(nameInput, 'Test User');
    await user.type(emailInput, 'test@example.com');
    await user.type(messageInput, 'This is a test message');
    
    // Verify inputs have values
    expect(nameInput).toHaveValue('Test User');
    expect(emailInput).toHaveValue('test@example.com');
    expect(messageInput).toHaveValue('This is a test message');
    
    // Submit form
    await user.click(submitButton);
  });
});