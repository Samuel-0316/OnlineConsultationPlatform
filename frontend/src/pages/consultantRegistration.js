import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Upload, MapPin, Star, Calendar, Award, X, Check, AlertCircle, Mail, Phone } from 'lucide-react';
import '../assets/styles/consultantRegistration.css';
import Navbar from '../components/Navbar';
import Footer from '../components/footer.js';

const ConsultantRegistration = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        profession: '',
        experience: '',
        location: '',
        country: '',
        profilePhoto: null,
        skills: [''],
        rating: 0,
        reviewCount: 0,
    });
    const [errors, setErrors] = useState({});
    const [photoPreview, setPhotoPreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    // Theme setup
    useEffect(() => {
        window.scrollTo(0, 0);
        const savedTheme = localStorage.getItem('theme');
        setIsDarkTheme(savedTheme === 'dark');
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDarkTheme;
        setIsDarkTheme(newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    // Handle photo upload
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        // Check file size (less than 1MB)
        if (file.size > 1048576) {
            setErrors({
                ...errors,
                profilePhoto: 'Image size should be less than 1MB'
            });
            fileInputRef.current.value = '';
            return;
        }
        
        setFormData({
            ...formData,
            profilePhoto: file
        });
        
        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPhotoPreview(reader.result);
        };
        reader.readAsDataURL(file);
        
        // Clear error
        if (errors.profilePhoto) {
            setErrors({
                ...errors,
                profilePhoto: null
            });
        }
    };

    // Handle skills input
    const handleSkillChange = (index, value) => {
        const updatedSkills = [...formData.skills];
        updatedSkills[index] = value;
        
        setFormData({
            ...formData,
            skills: updatedSkills
        });
        
        if (errors.skills) {
            setErrors({
                ...errors,
                skills: null
            });
        }
    };

    // Add new skill field
    const addSkillField = () => {
        if (formData.skills.length < 10) {
            setFormData({
                ...formData,
                skills: [...formData.skills, '']
            });
        }
    };

    // Remove skill field
    const removeSkillField = (index) => {
        if (formData.skills.length > 1) {
            const updatedSkills = formData.skills.filter((_, i) => i !== index);
            setFormData({
                ...formData,
                skills: updatedSkills
            });
        }
    };

    // Form validation
    const validateForm = () => {
        const newErrors = {};
        
        // Required fields
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email is invalid';
        
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        else if (!/^[0-9+\-\s()]{8,20}$/.test(formData.phone)) newErrors.phone = 'Phone number is invalid';
        
        if (!formData.profession.trim()) newErrors.profession = 'Profession is required';
        if (!formData.experience.trim()) newErrors.experience = 'Experience is required';
        if (!formData.location.trim()) newErrors.location = 'City is required';
        if (!formData.country.trim()) newErrors.country = 'Country is required';
        
        // Profile photo is now optional, so we remove this validation
        // if (!formData.profilePhoto) newErrors.profilePhoto = 'Profile photo is required';
        
        // Check skills
        if (formData.skills.filter(skill => skill.trim()).length === 0) {
            newErrors.skills = 'At least one skill is required';
        }
        
        // Validate rating
        const rating = parseFloat(formData.rating);
        if (isNaN(rating) || rating < 0 || rating > 5) {
            newErrors.rating = 'Rating must be between 0 and 5';
        }
        
        // Validate review count
        const reviewCount = parseInt(formData.reviewCount);
        if (isNaN(reviewCount) || reviewCount < 0) {
            newErrors.reviewCount = 'Review count must be a positive number';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            // Scroll to first error
            const firstError = document.querySelector('.error-message');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        
        setIsSubmitting(true);
        
        // Filter out empty skills
        const filteredSkills = formData.skills.filter(skill => skill.trim());
        
        try {
            // Use default placeholder image if no photo was uploaded
            const photoBase64 = photoPreview || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzZiNzI4MCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtdXNlciI+PGNpcmNsZSBjeD0iMTIiIGN5PSI4IiByPSI1Ii8+PHBhdGggZD0iTTIwIDIxdi0yYTcgNyAwIDAgMC0xNC0wdi0yIi8+PC9zdmc+';
            
            // Create submission data
            const submissionData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                profession: formData.profession,
                experience: formData.experience,
                location: formData.location,
                country: formData.country,
                profilePhoto: photoBase64,
                skills: filteredSkills,
                rating: parseFloat(formData.rating) || 0,
                reviewCount: parseInt(formData.reviewCount) || 0
            };
            
            console.log('Sending data to backend:', submissionData);
            
            // Send data to the backend
            const response = await fetch('http://localhost:5000/consultant-registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData)
            });
            
            const data = await response.json();
            console.log('Registration response:', response.status, data);
            
            if (response.ok) {
                // Handle successful submission
                setSubmissionStatus('success');
                
                // Update the success message to indicate redirection to landing page
                const notificationContent = document.querySelector('.notification-content p');
                if (notificationContent) {
                    notificationContent.textContent = 'Registration successful! Redirecting to home page...';
                }
                
                // Reset form after success and redirect to landing page
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                // Handle errors
                console.error('Registration failed:', data);
                setSubmissionStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmissionStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Add a new function to handle form reset
    const handleResetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            profession: '',
            experience: '',
            location: '',
            country: '',
            profilePhoto: null,
            skills: [''],
            rating: 0,
            reviewCount: 0,
        });
        setPhotoPreview(null);
        setErrors({});
        
        // Reset file input if it exists
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        
        // Scroll back to top
        window.scrollTo(0, 0);
    };

    return (
        <div className={`consultant-registration-container ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
            <Navbar 
                isDarkTheme={isDarkTheme} 
                toggleTheme={toggleTheme} 
                showSearch={false}
            />
            
            <div className="registration-content">
                <div className="registration-header">
                    <h1>Join Our Consultant Network</h1>
                    <p className="registration-description">
                        Share your expertise and connect with clients looking for your professional guidance
                    </p>
                </div>
                
                <div className="registration-form-container">
                    <form className="registration-form" onSubmit={handleSubmit}>
                        {/* Personal Information Section */}
                        <div className="form-section">
                            <h2>Personal Information</h2>
                            
                            <div className="form-group">
                                <label htmlFor="name">
                                    <User size={18} />
                                    Full Name <span className="required">*</span>
                                </label>
                                <input 
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                    className={errors.name ? 'error' : ''}
                                />
                                {errors.name && <div className="error-message">{errors.name}</div>}
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="email">
                                    <Mail size={18} />
                                    Email Address <span className="required">*</span>
                                </label>
                                <input 
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="your.email@example.com"
                                    className={errors.email ? 'error' : ''}
                                />
                                {errors.email && <div className="error-message">{errors.email}</div>}
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="phone">
                                    <Phone size={18} />
                                    Phone Number <span className="required">*</span>
                                </label>
                                <input 
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="e.g. +1 (234) 567-8901"
                                    className={errors.phone ? 'error' : ''}
                                />
                                {errors.phone && <div className="error-message">{errors.phone}</div>}
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="profession">
                                    <Award size={18} />
                                    Profession/Specialization <span className="required">*</span>
                                </label>
                                <input 
                                    type="text"
                                    id="profession"
                                    name="profession"
                                    value={formData.profession}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Business Strategist, Dermatologist"
                                    className={errors.profession ? 'error' : ''}
                                />
                                {errors.profession && <div className="error-message">{errors.profession}</div>}
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="experience">
                                    <Calendar size={18} />
                                    Experience (years) <span className="required">*</span>
                                </label>
                                <input 
                                    type="text"
                                    id="experience"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 5 years"
                                    className={errors.experience ? 'error' : ''}
                                />
                                {errors.experience && <div className="error-message">{errors.experience}</div>}
                            </div>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="location">
                                        <MapPin size={18} />
                                        City <span className="required">*</span>
                                    </label>
                                    <input 
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        placeholder="e.g. New York"
                                        className={errors.location ? 'error' : ''}
                                    />
                                    {errors.location && <div className="error-message">{errors.location}</div>}
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="country">
                                        Country <span className="required">*</span>
                                    </label>
                                    <input 
                                        type="text"
                                        id="country"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        placeholder="e.g. USA"
                                        className={errors.country ? 'error' : ''}
                                    />
                                    {errors.country && <div className="error-message">{errors.country}</div>}
                                </div>
                            </div>
                        </div>
                        
                        {/* Profile Photo Section */}
                        <div className="form-section">
                            <h2>Profile Photo (Optional)</h2>
                            
                            <div className="photo-upload-container">
                                <div className="photo-preview">
                                    {photoPreview ? (
                                        <img src={photoPreview} alt="Profile preview" />
                                    ) : (
                                        <div className="no-photo">
                                            <User size={40} />
                                        </div>
                                    )}
                                </div>
                                
                                <div className="photo-upload-actions">
                                    <label className="file-upload-label">
                                        <Upload size={18} />
                                        Upload Photo
                                        <input 
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            onChange={handlePhotoChange}
                                            hidden
                                        />
                                    </label>
                                    <div className="photo-requirements">
                                        File size should be less than 1MB
                                    </div>
                                    {errors.profilePhoto && <div className="error-message">{errors.profilePhoto}</div>}
                                </div>
                            </div>
                        </div>
                        
                        {/* Expertise Section */}
                        <div className="form-section">
                            <h2>Professional Expertise</h2>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="rating">
                                        <Star size={18} />
                                        Rating (out of 5)
                                    </label>
                                    <input 
                                        type="number"
                                        id="rating"
                                        name="rating"
                                        value={formData.rating}
                                        onChange={handleInputChange}
                                        min="0"
                                        max="5"
                                        step="0.1"
                                        placeholder="e.g. 4.7"
                                        className={errors.rating ? 'error' : ''}
                                    />
                                    {errors.rating && <div className="error-message">{errors.rating}</div>}
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="reviewCount">
                                        Review Count
                                    </label>
                                    <input 
                                        type="number"
                                        id="reviewCount"
                                        name="reviewCount"
                                        value={formData.reviewCount}
                                        onChange={handleInputChange}
                                        min="0"
                                        placeholder="e.g. 25"
                                        className={errors.reviewCount ? 'error' : ''}
                                    />
                                    {errors.reviewCount && <div className="error-message">{errors.reviewCount}</div>}
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label>
                                    Key Skills <span className="required">*</span>
                                </label>
                                {formData.skills.map((skill, index) => (
                                    <div key={index} className="skill-input-container">
                                        <input 
                                            type="text"
                                            value={skill}
                                            onChange={(e) => handleSkillChange(index, e.target.value)}
                                            placeholder={`e.g. ${index === 0 ? 'Strategic Planning' : index === 1 ? 'Market Analysis' : 'Leadership'}`}
                                            className={errors.skills ? 'error' : ''}
                                        />
                                        {formData.skills.length > 1 && (
                                            <button 
                                                type="button" 
                                                className="remove-skill-btn"
                                                onClick={() => removeSkillField(index)}
                                            >
                                                <X size={16} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                {errors.skills && <div className="error-message">{errors.skills}</div>}
                                
                                {formData.skills.length < 10 && (
                                    <button 
                                        type="button" 
                                        className="add-skill-btn"
                                        onClick={addSkillField}
                                    >
                                        + Add another skill
                                    </button>
                                )}
                            </div>
                        </div>
                        
                        {/* Form Actions */}
                        <div className="form-actions">
                            <button 
                                type="button" 
                                className="reset-btn" 
                                onClick={handleResetForm}
                            >
                                Reset
                            </button>
                            <button 
                                type="submit" 
                                className="submit-btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Register as Consultant'}
                            </button>
                        </div>
                    </form>
                </div>
                
                {/* Success/Error Notification */}
                {submissionStatus && (
                    <div className={`submission-notification ${submissionStatus}`}>
                        {submissionStatus === 'success' ? (
                            <div className="notification-content">
                                <Check size={24} />
                                <p>Registration successful! Redirecting to home page...</p>
                            </div>
                        ) : (
                            <div className="notification-content">
                                <AlertCircle size={24} />
                                <p>There was an error submitting your registration. Please try again.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            
            <Footer />
        </div>
    );
};

export default ConsultantRegistration;