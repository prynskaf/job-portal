'use client'
import React, { useState } from 'react';
import "./ContactForms.scss";
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const ContactForms = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add form submission logic here
        console.log('Form submitted:', formData);
    };

    return (
        <div className='contactForms'>
            <div className="contactForms__wrapper">
                <div className="header">
                    <h2>Get in <span>touch</span></h2>
                    <p>Have questions? We're ready to help!</p>
                </div>

                <div className="forms-section">
                    <form onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Full Name"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    placeholder="Phone Number"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                >
                                    <option value="">Subject</option>
                                    <option value="featured">Featured Job</option>
                                    <option value="general">General Inquiry</option>
                                </select>
                            </div>

                            <div className="form-group full-width">
                                <textarea
                                    name="message"
                                    placeholder="Hello, I would like to get in touch."
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                        </div>

                        <button type="submit" className="send-message-btn">
                            Send Message
                        </button>
                    </form>

                    <div className="contact-info">
                        <div className="general-questions">
                            <h3>General Questions</h3>
                            <p>For general questions including job application support</p>
                            <a href="mailto:support@jobs.com">support@jobs.com</a>
                        </div>

                        <div className="featured-jobs">
                            <h3>Featured Job Openings</h3>
                            <p>For more details about current job openings</p>
                            <a href="mailto:featured@jobs.com">featured@jobs.com</a>
                        </div>

                        <div className="social-links">
                            <h3>Follow Us</h3>
                            <div className="social-icons">
                            <a href="#" aria-label="LinkedIn">
                                    <FaLinkedin />
                                </a>
                                <a href="#" aria-label="Instagram">
                                    <FaInstagram />
                                </a>
                                <a href="#" aria-label="Twitter">
                                    <FaTwitter />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactForms;