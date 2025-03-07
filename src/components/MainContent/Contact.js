import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedSection from '../Animation/AnimatedSection';

const ContactSection = styled.section`
  padding: 6rem 2rem;
  background-color: ${({ theme }) => theme.backgroundSecondary};
  color: ${({ theme }) => theme.text};
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactInfo = styled.div`
  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 60px;
      height: 4px;
      background: linear-gradient(to right, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
      border-radius: 2px;
    }
  }
  
  p {
    margin-bottom: 2rem;
    font-size: 1.1rem;
    line-height: 1.8;
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const ContactDetails = styled.div`
  margin-bottom: 2rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  svg {
    margin-right: 1rem;
    color: ${({ theme }) => theme.primary};
    font-size: 1.5rem;
  }
  
  span {
    font-size: 1.1rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SocialIcon = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.primary};
  font-size: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: white;
    transform: translateY(-5px);
  }
`;

const FormContainer = styled(motion.div)`
  width: 100%;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 0.25rem;
`;

const Input = styled.input`
  padding: 1rem;
  border-radius: 0.5rem;
  border: 2px solid ${({ theme, error }) => error ? theme.error : theme.borderColor};
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme, error }) => error ? theme.error : theme.primary};
    box-shadow: 0 0 0 3px ${({ theme, error }) => error ? `${theme.error}33` : `${theme.primary}33`};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.textTertiary};
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border-radius: 0.5rem;
  border: 2px solid ${({ theme, error }) => error ? theme.error : theme.borderColor};
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme, error }) => error ? theme.error : theme.primary};
    box-shadow: 0 0 0 3px ${({ theme, error }) => error ? `${theme.error}33` : `${theme.primary}33`};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.textTertiary};
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: linear-gradient(90deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  align-self: flex-start;
  margin-top: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background: ${({ theme }) => theme.disabled};
  }
`;

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.error};
  font-size: 0.85rem;
  margin-top: 0.25rem;
`;

const SuccessMessage = styled(motion.div)`
  background-color: ${({ theme }) => `${theme.success}15`};
  color: ${({ theme }) => theme.success};
  padding: 1rem;
  border-radius: 0.5rem;
  border-left: 4px solid ${({ theme }) => theme.success};
  margin-bottom: 1.5rem;
  font-weight: 500;
`;

const formVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setErrors({ form: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: '🔗', url: 'https://github.com', label: 'GitHub' },
    { icon: '🔗', url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: '🔗', url: 'https://twitter.com', label: 'Twitter' },
    { icon: '🔗', url: 'https://dribbble.com', label: 'Dribbble' }
  ];

  return (
    <AnimatedSection id="contact">
      <ContactSection>
        <ContactContainer>
          <ContactInfo>
            <h2>Get In Touch</h2>
            <p>
              I'm always open to discussing new projects, creative ideas or
              opportunities to be part of your vision. Feel free to contact me
              using the form or through social media.
            </p>
            
            <ContactDetails>
              <ContactItem>
                <span role="img" aria-label="Email">📧</span>
                <span>hello@example.com</span>
              </ContactItem>
              <ContactItem>
                <span role="img" aria-label="Phone">📱</span>
                <span>+1 (123) 456-7890</span>
              </ContactItem>
              <ContactItem>
                <span role="img" aria-label="Location">📍</span>
                <span>New York, NY</span>
              </ContactItem>
            </ContactDetails>
            
            <SocialLinks>
              {socialLinks.map((link, index) => (
                <SocialIcon 
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                </SocialIcon>
              ))}
            </SocialLinks>
          </ContactInfo>
          
          <FormContainer
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={formVariants}
          >
            {submitSuccess && (
              <SuccessMessage
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Thank you! Your message has been sent successfully.
              </SuccessMessage>
            )}
            
            <StyledForm onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  error={errors.name}
                />
                {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                  error={errors.email}
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="message">Message</Label>
                <TextArea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  error={errors.message}
                />
                {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
              </FormGroup>
              
              {errors.form && <ErrorMessage>{errors.form}</ErrorMessage>}
              
              <SubmitButton
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </SubmitButton>
            </StyledForm>
          </FormContainer>
        </ContactContainer>
      </ContactSection>
    </AnimatedSection>
  );
};

export default Contact;