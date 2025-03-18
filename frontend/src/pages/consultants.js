import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Award, ChevronRight, X, Calendar, Clock, MessageSquare } from 'lucide-react';
import '../assets/styles/consultants.css';
import Footer from '../components/footer.js';
import Navbar from '../components/Navbar';

const Consultants = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedConsultant, setSelectedConsultant] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('');
    const [bookingMessage, setBookingMessage] = useState('');
    const navigate = useNavigate();

    // Sample consultants data
    const consultants = [
        {
            id: 1,
            name: "Dr. Sarah Johnson",
            profilePicture: "https://randomuser.me/api/portraits/women/1.jpg",
            specialization: "Business Strategy",
            category: "Business",
            rating: 4.9,
            reviewCount: 128,
            experience: "15+ years",
            location: "New York, USA",
            expertise: ["Strategic Planning", "Growth Strategy", "Market Analysis"]
        },
        {
            id: 2,
            name: "Mark Williams",
            profilePicture: "https://img.mensxp.com/media/content/2020/Mar/YouTube-Famous-Doctor-Mikhail-Varshavski-Is-Now-Going-Viral-For-His-Content-On-Coronavirus-1400x653_5e7ca6f69973f.jpeg?w=1100&h=513&cc=1",
            specialization: "Dermatologist",
            category: "Finance",
            rating: 4.8,
            reviewCount: 93,
            experience: "12 years",
            location: "London, UK",
            expertise: ["Acne", "Hyperpigmentation", "Rash"]
        },
        {
            id: 3,
            name: "Dr. Sarah Johnson",
            profilePicture: "https://randomuser.me/api/portraits/women/1.jpg",
            specialization: "Business Strategy",
            category: "Business",
            rating: 4.9,
            reviewCount: 128,
            experience: "15+ years",
            location: "New York, USA",
            expertise: ["Strategic Planning", "Growth Strategy", "Market Analysis"]
        },
        {
            id: 4,
            name: "Mark Williams",
            profilePicture: "https://img.mensxp.com/media/content/2020/Mar/YouTube-Famous-Doctor-Mikhail-Varshavski-Is-Now-Going-Viral-For-His-Content-On-Coronavirus-1400x653_5e7ca6f69973f.jpeg?w=1100&h=513&cc=1",
            specialization: "Dermatologist",
            category: "Finance",
            rating: 4.8,
            reviewCount: 93,
            experience: "12 years",
            location: "London, UK",
            expertise: ["Acne", "Hyperpigmentation", "Rash"]
        },
        {
            id: 5,
            name: "Dr. Sarah Johnson",
            profilePicture: "https://randomuser.me/api/portraits/women/1.jpg",
            specialization: "Business Strategy",
            category: "Business",
            rating: 4.9,
            reviewCount: 128,
            experience: "15+ years",
            location: "New York, USA",
            expertise: ["Strategic Planning", "Growth Strategy", "Market Analysis"]
        },
        {
            id: 6,
            name: "Mark Williams",
            profilePicture: "https://img.mensxp.com/media/content/2020/Mar/YouTube-Famous-Doctor-Mikhail-Varshavski-Is-Now-Going-Viral-For-His-Content-On-Coronavirus-1400x653_5e7ca6f69973f.jpeg?w=1100&h=513&cc=1",
            specialization: "Dermatologist",
            category: "Finance",
            rating: 4.8,
            reviewCount: 93,
            experience: "12 years",
            location: "London, UK",
            expertise: ["Acne", "Hyperpigmentation", "Rash"]
        }
    ];

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
        
        const savedTheme = localStorage.getItem('theme');
        setIsDarkTheme(savedTheme === 'dark');
        
        // Add animation class to cards after mount
        const cards = document.querySelectorAll('.consultant-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 100);
        });

        // Prevent scrolling when modal is open
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showModal]);

    const toggleTheme = () => {
        const newTheme = !isDarkTheme;
        setIsDarkTheme(newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleSearch = (searchText) => {
        setSearchQuery(searchText);
    };

    const filteredConsultants = consultants.filter(consultant => {
        const matchesCategory = selectedCategory === 'All' || consultant.category === selectedCategory;
        const matchesSearch = consultant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            consultant.specialization.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const openBookingModal = (consultant) => {
        setSelectedConsultant(consultant);
        setShowModal(true);
    };

    const closeBookingModal = () => {
        setShowModal(false);
        setBookingDate('');
        setBookingTime('');
        setBookingMessage('');
    };

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        
        // Here you would typically send the booking data to your backend
        console.log('Booking submitted:', {
            consultant: selectedConsultant,
            date: bookingDate,
            time: bookingTime,
            message: bookingMessage
        });
        
        // Show success message
        alert('Booking request sent successfully!');
        closeBookingModal();
    };

    return (
        <div className={`consultants-container ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
            <Navbar 
                isDarkTheme={isDarkTheme} 
                toggleTheme={toggleTheme} 
                showSearch={true}
                onSearch={handleSearch}
            />

            <div className="consultants-content">
                <h1>Find Your Expert Consultant</h1>
                <p className="consultants-description">
                    Connect with industry-leading professionals for personalized guidance
                </p>
                
                <div className="consultants-categories">
                    {['All', 'Health Care', 'Business', 'Finance', 'Marketing', 'Technology', 'Legal'].map(category => (
                        <button 
                            key={category}
                            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="consultants-grid">
                    {filteredConsultants.map(consultant => (
                        <div key={consultant.id} className="consultant-card">
                            <div className="card-header">
                                <img 
                                    src={consultant.profilePicture} 
                                    alt={consultant.name} 
                                    className="consultant-image"
                                />
                            </div>
                            
                            <div className="card-content">
                                <h3 className="consultant-name">{consultant.name}</h3>
                                <p className="consultant-specialization">{consultant.specialization}</p>
                                
                                <div className="rating-container">
                                    <Star className="star-icon" size={16} fill="currentColor" />
                                    <span className="rating">{consultant.rating}</span>
                                    <span className="review-count">({consultant.reviewCount} reviews)</span>
                                </div>
                                
                                <div className="consultant-details">
                                    <div className="detail-item">
                                        <Award size={16} />
                                        <span>{consultant.experience}</span>
                                    </div>
                                    <div className="detail-item">
                                        <MapPin size={16} />
                                        <span>{consultant.location}</span>
                                    </div>
                                </div>
                                
                                <div className="expertise-tags">
                                    {consultant.expertise.map((skill, index) => (
                                        <span key={index} className="expertise-tag">{skill}</span>
                                    ))}
                                </div>
                                
                                <button 
                                    className="book-btn"
                                    onClick={() => openBookingModal(consultant)}
                                >
                                    Book Consultation
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Booking Modal */}
            {showModal && selectedConsultant && (
                <div className="booking-modal-overlay" onClick={closeBookingModal}>
                    <div className="booking-modal" onClick={e => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={closeBookingModal}>
                            <X size={24} />
                        </button>
                        
                        <div className="modal-consultant-info">
                            <img 
                                src={selectedConsultant.profilePicture} 
                                alt={selectedConsultant.name} 
                                className="modal-consultant-image"
                            />
                            <div className="modal-consultant-details">
                                <h2>{selectedConsultant.name}</h2>
                                <p className="modal-specialization">{selectedConsultant.specialization}</p>
                                <div className="modal-rating">
                                    <Star className="star-icon" size={16} fill="currentColor" />
                                    <span>{selectedConsultant.rating}</span>
                                    <span>({selectedConsultant.reviewCount} reviews)</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="modal-booking-form">
                            <h3>Book Your Consultation</h3>
                            <form onSubmit={handleBookingSubmit}>
                                <div className="form-group">
                                    <label>
                                        <Calendar size={18} />
                                        Select Date
                                    </label>
                                    <input 
                                        type="date" 
                                        value={bookingDate}
                                        onChange={(e) => setBookingDate(e.target.value)}
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label>
                                        <Clock size={18} />
                                        Select Time
                                    </label>
                                    <input 
                                        type="time" 
                                        value={bookingTime}
                                        onChange={(e) => setBookingTime(e.target.value)}
                                        required
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label>
                                        <MessageSquare size={18} />
                                        Message
                                    </label>
                                    <textarea 
                                        rows="4"
                                        placeholder="Describe your needs or questions for the consultant..."
                                        value={bookingMessage}
                                        onChange={(e) => setBookingMessage(e.target.value)}
                                    ></textarea>
                                </div>
                                
                                <button type="submit" className="modal-submit-btn">
                                    Confirm Booking
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            
            <Footer />
        </div>
    );
};

export default Consultants;
