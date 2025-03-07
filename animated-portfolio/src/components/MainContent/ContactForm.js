import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedSection from '../Animation/AnimatedSection';
import { ANIMATIONS } from '../Animation';

const FormContainer = styled(motion.div)`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
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
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled(motion.div)`
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
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const formItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const formRef = useRef(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formState.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formState.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setSubmitSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setErrors({ form: 'Failed to send message. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const successVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <AnimatedSection animation={ANIMATIONS.FADE_UP}>
      <FormContainer
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={formVariants}
      >
        {submitSuccess && (
          <SuccessMessage
            variants={successVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            Thank you! Your message has been sent successfully.
          </SuccessMessage>
        )}
        
        <StyledForm ref={formRef} onSubmit={handleSubmit}>
          <FormGroup variants={formItemVariants}>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              value={formState.name}
              onChange={handleChange}
              error={errors.name}
              disabled={isSubmitting}
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup variants={formItemVariants}>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Your email address"
              value={formState.email}
              onChange={handleChange}
              error={errors.email}
              disabled={isSubmitting}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup variants={formItemVariants}>
            <Label htmlFor="subject">Subject</Label>
            <Input
              type="text"
              id="subject"
              name="subject"
              placeholder="Subject of your message"
              value={formState.subject}
              onChange={handleChange}
              error={errors.subject}
              disabled={isSubmitting}
            />
            {errors.subject && <ErrorMessage>{errors.subject}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup variants={formItemVariants}>
            <Label htmlFor="message">Message</Label>
            <TextArea
              id="message"
              name="message"
              placeholder="Your message"
              value={formState.message}
              onChange={handleChange}
              error={errors.message}
              disabled={isSubmitting}
            />
            {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
          </FormGroup>
          
          {errors.form && (
            <ErrorMessage style={{ marginBottom: '1rem' }}>{errors.form}</ErrorMessage>
          )}
          
          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            variants={formItemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </SubmitButton>
        </StyledForm>
      </FormContainer>
    </AnimatedSection>
  );
};

export default ContactForm;