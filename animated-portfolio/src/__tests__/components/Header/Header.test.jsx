import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import Header from '@components/Header/Header';
import { ThemeContext } from '@contexts/ThemeContext';

// Mock the ThemeContext
const mockThemeContext = {
  theme: 'light',
  toggleTheme: vi.fn(),
};

// Mock the useHeaderScroll hook
vi.mock('@components/Header/index', () => ({
  ...vi.importActual('@components/Header/index'),
  useHeaderScroll: () => ({
    scrollDirection: 'none',
    isAtTop: true,
  }),
}));

// Mock the intersection observer
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

// Light theme for testing
const lightTheme = {
  primary: '#6200ea',
  secondary: '#03dac6',
  background: '#ffffff',
  text: '#121212',
  headerBackground: 'rgba(255, 255, 255, 0.95)',
  footerBackground: '#f5f5f5',
  footerText: '#333333',
};

describe('Header Component', () => {
  const renderHeader = (scrollDirection = 'none', isAtTop = true) => {
    // Override the mock if needed for specific tests
    vi.mocked(useHeaderScroll).mockReturnValue({
      scrollDirection,
      isAtTop,
    });

    return render(
      <ThemeContext.Provider value={mockThemeContext}>
        <ThemeProvider theme={lightTheme}>
          <Header />
        </ThemeProvider>
      </ThemeContext.Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the header with logo and navigation', () => {
    renderHeader();
    
    // Check if logo is rendered
    expect(screen.getByText(/portfolio/i)).toBeInTheDocument();
    
    // Check if navigation links are rendered
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
    expect(screen.getByText(/projects/i)).toBeInTheDocument();
    expect(screen.getByText(/skills/i)).toBeInTheDocument();
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
  });

  it('includes the theme toggle button', () => {
    renderHeader();
    
    // Check if theme toggle button exists
    const themeToggle = screen.getByRole('button', { name: /toggle theme/i });
    expect(themeToggle).toBeInTheDocument();
    
    // Test theme toggle functionality
    fireEvent.click(themeToggle);
    expect(mockThemeContext.toggleTheme).toHaveBeenCalledTimes(1);
  });

  it('applies correct styles when scrolling down', async () => {
    renderHeader('down', false);
    
    // Get the header element
    const headerElement = screen.getByRole('banner');
    
    // Check if the header has the correct transform style for hiding
    await waitFor(() => {
      expect(headerElement).toHaveStyle('transform: translateY(-100%)');
    });
  });

  it('applies correct styles when scrolling up', async () => {
    renderHeader('up', false);
    
    // Get the header element
    const headerElement = screen.getByRole('banner');
    
    // Check if the header is visible when scrolling up
    await waitFor(() => {
      expect(headerElement).toHaveStyle('transform: translateY(0)');
    });
  });

  it('applies transparent styles when at the top of the page', async () => {
    renderHeader('none', true);
    
    // Get the header element
    const headerElement = screen.getByRole('banner');
    
    // Check if the header has transparent background when at top
    await waitFor(() => {
      expect(headerElement).toHaveStyle('background-color: transparent');
      expect(headerElement).toHaveStyle('box-shadow: none');
    });
  });

  it('opens mobile menu when hamburger is clicked', async () => {
    // Mock window.innerWidth to simulate mobile view
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });
    
    // Trigger resize event to update responsive components
    window.dispatchEvent(new Event('resize'));
    
    renderHeader();
    
    // Find and click the hamburger menu button
    const hamburgerButton = screen.getByRole('button', { name: /menu/i });
    expect(hamburgerButton).toBeInTheDocument();
    
    fireEvent.click(hamburgerButton);
    
    // Check if mobile menu is open
    await waitFor(() => {
      const mobileMenu = screen.getByRole('navigation');
      expect(mobileMenu).toHaveAttribute('data-open', 'true');
    });
  });

  it('closes mobile menu when clicking outside', async () => {
    // Mock window.innerWidth to simulate mobile view
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });
    
    // Trigger resize event
    window.dispatchEvent(new Event('resize'));
    
    renderHeader();
    
    // Open the mobile menu
    const hamburgerButton = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(hamburgerButton);
    
    // Verify menu is open
    await waitFor(() => {
      const mobileMenu = screen.getByRole('navigation');
      expect(mobileMenu).toHaveAttribute('data-open', 'true');
    });
    
    // Click outside the menu
    fireEvent.mouseDown(document.body);
    
    // Verify menu is closed
    await waitFor(() => {
      const mobileMenu = screen.getByRole('navigation');
      expect(mobileMenu).toHaveAttribute('data-open', 'false');
    });
  });

  it('navigates to the correct section when nav link is clicked', () => {
    renderHeader();
    
    // Mock scrollIntoView
    const scrollIntoViewMock = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoViewMock;
    
    // Click on About link
    const aboutLink = screen.getByText(/about/i);
    fireEvent.click(aboutLink);
    
    // Check if scrollIntoView was called
    expect(scrollIntoViewMock).toHaveBeenCalled();
  });
});