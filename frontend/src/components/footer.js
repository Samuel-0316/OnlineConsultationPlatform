import React from 'react';
import { Twitter, Linkedin, Facebook, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Update the import path to match the file name exactly

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand-section">
            <span className="footer-brand">ConsultPro</span>
            <p className="footer-description">
              Connect with expert consultants for professional guidance
            </p>
          </div>
          
          <div className="footer-links">
            <div className="footer-links-group">
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </div>
            
            <Link to="/consultant-registration" className="consultant-registration-link">
              Become a Consultant
            </Link>
          </div>
          
          <div className="footer-social">
            <a href="#" className="social-link" aria-label="Twitter">
              <Twitter size={18} />
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="#" className="social-link" aria-label="Facebook">
              <Facebook size={18} />
            </a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ConsultPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;