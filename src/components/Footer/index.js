import Footer from './Footer';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styled components for the Footer
export const FooterContainer = styled(motion.footer)`
  width: 100%;
  padding: 2rem 0;
  background-color: ${({ theme }) => theme.footerBackground};
  color: ${({ theme }) => theme.footerText};
  transition: background-color 0.3s ease, color 0.3s ease;
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
`;

export const FooterInfo = styled.div`
  flex: 1;
  min-width: 250px;
`;

export const SocialLinksContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin: 1rem 0;
  
  a {
    color: ${({ theme }) => theme.footerText};
    font-size: 1.5rem;
    transition: color 0.2s ease, transform 0.2s ease;
    
    &:hover {
      color: ${({ theme }) => theme.primary};
      transform: translateY(-3px);
    }
  }
`;

export const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  
  a {
    color: ${({ theme }) => theme.footerText};
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const FooterAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default Footer;