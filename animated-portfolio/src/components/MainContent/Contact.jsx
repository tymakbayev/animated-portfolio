import React, { useState, useRef, useEffect } from 'react';
import ContactForm from './ContactForm';
import SocialLinks from './SocialLinks';
import { useAnimation } from '../../hooks/useAnimation';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const contactRef = useRef(null);
  const { animateIn } = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateIn(contactRef.current);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, [animateIn]);

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

  return (
    <section id="contact" className="contact-section" ref={contactRef}>
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Let's talk about your project</h3>
            <p>
              I'm always open to discussing new projects, creative ideas or
              opportunities to be part of your vision.
            </p>
            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <span>email@example.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📱</span>
                <span>+1 (123) 456-7890</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>New York, NY</span>
              </div>
            </div>
            <SocialLinks />
          </div>
          
          <ContactForm 
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            isSubmitting={isSubmitting}
            submitSuccess={submitSuccess}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;