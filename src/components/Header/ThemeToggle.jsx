
import { useTheme } from '../../hooks/useTheme';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const handleToggle = () => {
    toggleTheme();
  };

  return (
    <div className="theme-toggle">
      <button 
        onClick={handleToggle}
        className={`toggle-button ${theme}`}
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <span className="toggle-icon">☀️</span>
        ) : (
          <span className="toggle-icon">🌙</span>
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;