import React, { useState, useEffect } from 'react';
import { ChevronRight, Lock, Award, Clock, Sun, Moon } from 'lucide-react';
import '../assets/styles/landing.css';
import consultImage from '../assets/images/doc_consult.png';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer.js';
import Navbar from '../components/Navbar';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    setIsVisible(true);
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    setIsDarkTheme(savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLoginClick = () => {
    window.scrollTo(0, 0);
    navigate('/login');
  };

  const handleConsultantsClick = () => {
    window.scrollTo(0, 0);
    navigate('/consultants');
  }

  return (
    <div className={`home-container ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <Navbar isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />

      {/* Hero Section */}
      <section className="hero-section">
        <div className={`container hero-content ${isVisible ? 'visible' : 'hidden'}`}>
          <div className="hero-text">
            <h1 className="hero-title">
              Connect with Experts Anytime, Anywhere
            </h1>
            <p className="hero-subtitle">
              Get professional advice from verified consultants via video call
            </p>
            <button className="cta-button" onClick={handleConsultantsClick}>
              Find a Consultant
              <ChevronRight className="chevron-icon" size={20} />
            </button>
          </div>
          
          <div className="hero-image-container">
            <div className="image-wrapper">
              <img 
                src={consultImage}
                alt="Online consultation" 
                className="hero-image"
              />
            </div>
          </div>
        </div>
        
        {/* Animated Shapes */}
        <div className="shape-container">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <h2 className="section-title">Why Choose Our Platform</h2>
          
          <div className="benefits-grid">
            {[
              { icon: <Lock size={32} />, title: "Secure Video Calls", description: "End-to-end encrypted video consultations for your privacy" },
              { icon: <Award size={32} />, title: "Verified Consultants", description: "All experts are verified professionals in their fields" },
              { icon: <Clock size={32} />, title: "Flexible Scheduling", description: "Book appointments at your convenience, 24/7" }
            ].map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">{benefit.icon}</div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          
          <div className="steps-grid">
            {[
              { step: "01", title: "Find Your Expert", description: "Browse through our verified consultants and find the right match" },
              { step: "02", title: "Book Appointment", description: "Schedule a time that works for both you and the consultant" },
              { step: "03", title: "Get Consultation", description: "Connect via secure video call and receive expert advice" }
            ].map((step, index) => (
              <div key={index} className="step-item">
                <div className="step-number">
                  {step.step}
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            ))}
          </div>
          
          <div className="cta-container">
            <button className="secondary-cta-button" onClick={handleConsultantsClick}>
              Get Started Today
            </button>
          </div>
        </div>
      </section>

      {/* Use the new Footer component */}
      <Footer />

      <div className={`overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={closeMobileMenu}></div>
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <button className="mobile-menu-close" onClick={closeMobileMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="mobile-nav-links">
          <a href="#" className="mobile-nav-link">Consultants</a>
          <a href="#" className="mobile-nav-link">About Us</a>
          <button className="login-button mobile-login-button" onClick={handleLoginClick}>
            Login
          </button>
          <button className="theme-toggle mobile-theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;