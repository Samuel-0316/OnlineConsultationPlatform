import React, { useState, useEffect } from 'react';
import { Sun, Moon, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import '../assets/styles/login.css'
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempted with:', { email, password, rememberMe });
  };

  const handleSignupClick = () => {
    navigate('/signup');
  }

  return (
    <div className={`home-container ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      {/* Header - Updated to center logo and remove nav links */}
      <header className="header">
        <div className="container header-content login-header">
          <div className="logo-container centered-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <div className="logo">
              <span>C</span>
            </div>
            <span className="brand-name">ConsultPro</span>
          </div>
          
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* Login Section */}
      <section className="login-section">
        <div className={`container login-container ${isVisible ? 'visible' : 'hidden'}`}>
          <div className="login-card">
            <h1 className="login-title">Welcome Back Users</h1>
            <p className="login-subtitle">Login in to access your account</p>
            
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <div className="input-container">
                  <Mail size={18} className="input-icon" />
                  <input 
                    type="email" 
                    id="email" 
                    className="form-input" 
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-container">
                  <Lock size={18} className="input-icon" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    id="password" 
                    className="form-input" 
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button" 
                    className="password-toggle" 
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <div className="form-options">
                <div className="remember-me">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>
              
              <button type="submit" className="login-btn">
                Login In
                <ArrowRight size={18} className="login-icon" />
              </button>
            </form>
            
            <div className="login-divider">
              <span>OR</span>
            </div>
            
            <div className="social-login">
              <button className="social-login-btn google">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign in with Google
              </button>
            </div>
            
            <div className="register-prompt">
              <span>Don't have an account?</span>
              <a className="register-link" onClick={handleSignupClick}>Sign In</a>
            </div>
          </div>
        </div>
        
        {/* Animated Shapes */}
        <div className="shape-container">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
      </section>

      {/* Simplified Footer */}
      <footer className="footer login-footer">
        <div className="container">
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} ConsultPro. All rights reserved.</p>
          </div>
        </div>
      </footer>

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
          <a href="#" className="mobile-nav-link">Appointments</a>
          <a href="#" className="mobile-nav-link">About Us</a>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;