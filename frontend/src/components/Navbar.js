import React, { useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isDarkTheme, toggleTheme, showSearch = false, onSearch = () => {} }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
        setIsMobileMenuOpen(false);
    };

    const handleConsultantsClick = () => {
        navigate('/consultants');
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="header">
            <div className="container header-content">
                <div className="logo-container" onClick={() => navigate('/')}>
                    <div className="logo">
                        <span>C</span>
                    </div>
                    <span className="brand-name">ConsultPro</span>
                </div>
                
                <div className="nav-right">
                    {showSearch && (
                        <div className="search-container">
                            <input 
                                type="text"
                                placeholder="Search consultants..."
                                onChange={(e) => onSearch(e.target.value)}
                            />
                        </div>
                    )}
                    
                    <nav className="desktop-nav">
                        <a className="nav-link" onClick={handleConsultantsClick}>Consultants</a>
                        <a className="nav-link">About Us</a>
                        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                            {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button className="login-button" onClick={handleLoginClick}>
                            Login
                        </button>
                    </nav>

                    <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                {showSearch && (
                    <div className="mobile-search">
                        <input 
                            type="text"
                            placeholder="Search consultants..."
                            onChange={(e) => onSearch(e.target.value)}
                        />
                    </div>
                )}
                <nav className="mobile-nav">
                    <a className="mobile-nav-link" onClick={handleConsultantsClick}>Consultants</a>
                    <a className="mobile-nav-link">About Us</a>
                    <button className="mobile-theme-toggle" onClick={toggleTheme}>
                        {isDarkTheme ? 'Light Mode' : 'Dark Mode'}
                        {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button className="mobile-login-button" onClick={handleLoginClick}>
                        Login
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;