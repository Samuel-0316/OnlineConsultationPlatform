import React, { useState, useEffect } from 'react';
import { 
  Sun, Moon, Calendar, Clock, User, Filter, 
  ChevronDown, LogOut, Settings, CheckCircle, XCircle, Twitter, Linkedin, Facebook
} from 'lucide-react';
import '../assets/styles/dashboard.css'
import { Link, useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [appointments, setAppointments] = useState({
    upcoming: [
      {
        id: 1,
        consultantName: "Dr. Sarah Johnson",
        consultantSpecialty: "Business Strategy",
        date: "2025-03-15",
        time: "10:00 AM",
        duration: "60 min",
        status: "confirmed",
        notes: "Quarterly business review",
        location: "Virtual",
        imageUrl: "/api/placeholder/40/40"
      },
      {
        id: 2,
        consultantName: "Mark Williams",
        consultantSpecialty: "Financial Planning",
        date: "2025-03-18",
        time: "2:30 PM",
        duration: "45 min",
        status: "pending",
        notes: "Investment portfolio discussion",
        location: "Office - Room 305",
        imageUrl: "/api/placeholder/40/40"
      },
      {
        id: 3,
        consultantName: "Dr. Emily Chen",
        consultantSpecialty: "Marketing Strategy",
        date: "2025-03-25",
        time: "9:00 AM",
        duration: "90 min",
        status: "confirmed",
        notes: "Product launch campaign planning",
        location: "Virtual",
        imageUrl: "/api/placeholder/40/40"
      }
    ],
    past: [
      {
        id: 4,
        consultantName: "James Rodriguez",
        consultantSpecialty: "Legal Consultation",
        date: "2025-02-28",
        time: "11:00 AM",
        duration: "60 min",
        status: "completed",
        notes: "Contract review",
        feedback: 4.5,
        location: "Office - Room 210",
        imageUrl: "/api/placeholder/40/40"
      },
      {
        id: 5,
        consultantName: "Dr. Sarah Johnson",
        consultantSpecialty: "Business Strategy",
        date: "2025-02-15",
        time: "3:00 PM",
        duration: "60 min",
        status: "completed",
        notes: "Initial strategy consultation",
        feedback: 5,
        location: "Virtual",
        imageUrl: "/api/placeholder/40/40"
      },
      {
        id: 6,
        consultantName: "Lisa Wong",
        consultantSpecialty: "HR Consultation",
        date: "2025-01-20",
        time: "1:00 PM",
        duration: "45 min",
        status: "cancelled",
        notes: "Team structure planning",
        location: "Office - Room 101",
        imageUrl: "/api/placeholder/40/40"
      }
    ]
  });
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  
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

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'confirmed':
        return 'status-confirmed';
      case 'pending':
        return 'status-pending';
      case 'completed':
        return 'status-completed';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'confirmed':
      case 'completed':
        return <CheckCircle size={16} />;
      case 'cancelled':
        return <XCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  const handleLogout = () => {
    // Add any logout logic here (e.g., clearing tokens, user data)
    localStorage.clear(); // Clear any stored data
    navigate('/'); // Redirect to home page
  };

  return (
    <div className={`dashboard-container ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      {/* Header */}
      <header className="dashboard-header">
        <div className="container dashboard-header-content">
          <div className="logo-container" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <div className="logo">
              <span>C</span>
            </div>
            <span className="brand-name">ConsultPro</span>
          </div>
          
          <div className="dashboard-header-right">
            <div className="dashboard-actions">
              <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <div className="logout-container">
                <button className="logout-btn" onClick={handleLogout}>
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="dashboard-main">
        <div className="container">
          <div className="dashboard-welcome">
            <div>
              <h1>Welcome back, John!</h1>
              <p className="welcome-subtitle">Here's an overview of your appointments</p>
            </div>
            <button 
              className="new-appointment-btn" 
              onClick={() => navigate('/consultants')}
            >
              <Calendar size={18} />
              <span>New Appointment</span>
            </button>
          </div>
          
          {/* Dashboard Summary Cards */}
          <div className="dashboard-summary">
            <div className="summary-card">
              <div className="summary-icon upcoming-icon">
                <Calendar size={24} />
              </div>
              <div className="summary-details">
                <h3>{appointments.upcoming.length}</h3>
                <p>Upcoming Appointments</p>
              </div>
            </div>
            
            <div className="summary-card">
              <div className="summary-icon completed-icon">
                <CheckCircle size={24} />
              </div>
              <div className="summary-details">
                <h3>{appointments.past.filter(a => a.status === 'completed').length}</h3>
                <p>Completed Sessions</p>
              </div>
            </div>
            
            <div className="summary-card">
              <div className="summary-icon consultants-icon">
                <User size={24} />
              </div>
              <div className="summary-details">
                <h3>4</h3>
                <p>Consultants Engaged</p>
              </div>
            </div>
          </div>
          
          {/* Appointments Section */}
          <section className="appointments-section">
            <div className="appointments-header">
              <div className="appointment-tabs">
                <button 
                  className={`appointment-tab ${activeTab === 'upcoming' ? 'active' : ''}`}
                  onClick={() => handleTabChange('upcoming')}
                >
                  Upcoming
                </button>
                <button 
                  className={`appointment-tab ${activeTab === 'past' ? 'active' : ''}`}
                  onClick={() => handleTabChange('past')}
                >
                  Past
                </button>
              </div>
              
              <div className="appointments-actions">
                <div className="filter-dropdown">
                  <button className="filter-btn" onClick={toggleFilter}>
                    <Filter size={18} />
                    <span>Filter</span>
                    <ChevronDown size={16} />
                  </button>
                  
                  {filterOpen && (
                    <div className="filter-menu">
                      <div className="filter-group">
                        <h4>Status</h4>
                        <label>
                          <input type="checkbox"/>
                          <span>Confirmed</span>
                        </label>
                        <label>
                          <input type="checkbox"/>
                          <span>Pending</span>
                        </label>
                        <label>
                          <input type="checkbox"/>
                          <span>Completed</span>
                        </label>
                        <label>
                          <input type="checkbox"/>
                          <span>Cancelled</span>
                        </label>
                      </div>
                      <div className="filter-actions">
                        <button className="reset-filter">Reset</button>
                        <button className="apply-filter">Apply</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="appointments-list">
              {appointments[activeTab].length === 0 ? (
                <div className="no-appointments">
                  <p>No {activeTab} appointments found.</p>
                </div>
              ) : (
                appointments[activeTab].map(appointment => (
                  <div className="appointment-card" key={appointment.id}>
                    <div className="appointment-left">
                      <img 
                        src={appointment.imageUrl} 
                        alt={appointment.consultantName} 
                        className="consultant-img" 
                      />
                      <div className="appointment-details">
                        <h3 className="consultant-name">{appointment.consultantName}</h3>
                        <p className="consultant-specialty">{appointment.consultantSpecialty}</p>
                        <div className="appointment-meta">
                          <span className="appointment-location">
                            {appointment.location}
                          </span>
                          <span className="appointment-duration">
                            {appointment.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="appointment-right">
                      <div className="appointment-datetime">
                        <p className="appointment-date">{formatDate(appointment.date)}</p>
                        <p className="appointment-time">{appointment.time}</p>
                      </div>
                      <div className={`appointment-status ${getStatusBadgeClass(appointment.status)}`}>
                        {getStatusIcon(appointment.status)}
                        <span>{appointment.status}</span>
                      </div>
                      
                      {activeTab === 'upcoming' && (
                        <div className="appointment-actions">
                          <button className="action-btn reschedule-btn">Reschedule</button>
                          <button className="action-btn cancel-btn">Cancel</button>
                        </div>
                      )}
                      
                      {activeTab === 'past' && appointment.status === 'completed' && !appointment.feedback && (
                        <div className="appointment-actions">
                          <button className="action-btn feedback-btn">Leave Feedback</button>
                        </div>
                      )}
                      
                      {activeTab === 'past' && appointment.feedback && (
                        <div className="appointment-rating">
                          <div className="stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span 
                                key={star} 
                                className={star <= Math.floor(appointment.feedback) ? 'star filled' : 'star'}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="rating-value">{appointment.feedback}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="container">
          <div className="footer-content">
              <span>ConsultPro</span>
            
            <div className="footer-links">
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
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
    </div>
  );
};

export default UserDashboard;