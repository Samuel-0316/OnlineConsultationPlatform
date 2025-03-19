import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isDarkTheme, toggleTheme, showSearch = false, onSearch = () => {} }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));

    const handleLoginClick = () => {
        navigate('/login');
        setIsMobileMenuOpen(false);
    };

    const handleConsultantsClick = () => {
        if (user) {
            navigate('/consultants');
        } else {
            navigate('/login', { state: { returnUrl: '/consultants' } });
        }
        setIsMobileMenuOpen(false);
    };

    const handleDashboardClick = () => {
        if (user) {
            navigate('/dashboard');
        } else {
            navigate('/login', { state: { returnUrl: '/dashboard' } });
        }
        setIsMobileMenuOpen(false);
    };

    const handleLogout = async () => {
        const user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
        
        try {
            // Notify the server about the logout
            const response = await fetch('http://localhost:5000/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: user.email }),
            });

            if (response.ok) {
                console.log('Logout successful');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }

        // Clear user data from storage
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        
        // Redirect to login page
        navigate('/login');
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleProfileDropdown = (e) => {
        e.stopPropagation();
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = () => {
            if (isProfileDropdownOpen) {
                setIsProfileDropdownOpen(false);
            }
        };
        
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isProfileDropdownOpen]);

    return (
        <header className="header">
            <div className="container header-content">
                <div className="logo-container" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
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
                        {user ? (
                            <>
                                <a className="nav-link" onClick={handleDashboardClick}>Dashboard</a>
                                <div className="profile-container" onClick={(e) => toggleProfileDropdown(e)}>
                                    <User size={24} className="profile-icon" />
                                    <div className={`profile-dropdown ${isProfileDropdownOpen ? 'active' : ''}`}>
                                        <p>{user.name}</p>
                                        <p>{user.email}</p>
                                        <button onClick={handleLogout}>Logout</button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <a className="nav-link">About Us</a>
                                <button className="login-button" onClick={handleLoginClick}>
                                    Login
                                </button>
                            </>
                        )}
                        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                            {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
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
                    {user ? (
                        <>
                            <a className="mobile-nav-link" onClick={handleDashboardClick}>Dashboard</a>
                            <div className="profile-container">
                                <User size={24} className="profile-icon" onClick={(e) => toggleProfileDropdown(e)} />
                                <div className={`profile-dropdown ${isProfileDropdownOpen ? 'active' : ''}`}>
                                    <p>{user.name}</p>
                                    <p>{user.email}</p>
                                    <button onClick={handleLogout}>Logout</button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <a className="mobile-nav-link">About Us</a>
                            <button className="mobile-login-button" onClick={handleLoginClick}>
                                Login
                            </button>
                        </>
                    )}
                    <button className="mobile-theme-toggle" onClick={toggleTheme}>
                        {isDarkTheme ? 'Light Mode' : 'Dark Mode'}
                        {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;