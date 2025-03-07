import Header from './Header';
import Navigation from './Navigation';
import ThemeToggle from './ThemeToggle';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Styled components for the Header
export const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: ${({ theme }) => theme.headerBackground};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  
  a {
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  img {
    height: 2rem;
    width: auto;
  }
`;

export const NavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

// Animation variants for header elements
export const headerVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      duration: 0.5
    }
  }
};

export const logoVariants = {
  initial: { opacity: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: 'easeInOut'
    }
  }
};

// Header scroll behavior
export const useHeaderScroll = () => {
  const [scrollDirection, setScrollDirection] = useState('none');
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollY > prevScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < prevScrollY) {
        setScrollDirection('up');
      }
      
      // Check if at top of page
      setIsAtTop(currentScrollY < 10);
      
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY]);

  return { scrollDirection, isAtTop };
};

export { Header, Navigation, ThemeToggle };
export default Header;