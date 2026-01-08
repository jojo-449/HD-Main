import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaInstagram, 
  FaTiktok, 
  FaWhatsapp, 
  FaPhone, 
  FaEnvelope, 
  FaLocationDot,
  FaThreads // Using Threads icon if available, or fallback
} from 'react-icons/fa6';
import { FaXTwitter } from 'react-icons/fa6'; 

import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-card">
        
        {/* Social Media Icons (Top Row) */}
        <div className="social-header">
          <a href="https://www.instagram.com/_hdmodels?igsh=MWh6ZGY3M2N2YTA4ag%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" className="social-btn">
            <FaInstagram />
          </a>
          <a href="https://www.tiktok.com/@hdmodels?_r=1&_t=ZS-9208dR2LLWR" target="_blank" rel="noreferrer" className="social-btn">
            <FaTiktok />
          </a>
          <a href="https://x.com/_hdmodels?s=21" target="_blank" rel="noreferrer" className="social-btn">
            <FaXTwitter />
          </a>
          <a href="https://www.threads.net/@_hdmodels" target="_blank" rel="noreferrer" className="social-btn">
            <FaThreads />
          </a>
          <a href="https://wa.me/message/3JHXKZRYEFK3K1" target="_blank" rel="noreferrer" className="social-btn">
            <FaWhatsapp />
          </a>
        </div>

        {/* Main Content Grid */}
        <div className="footer-grid">
            
          {/* Column 1: Quick Links */}
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              {/* <li><Link to="/terms">Terms & Conditions</Link></li> */}
              <li><Link to="/booking-history">Bookings</Link></li>
              <li><Link to="/models">Browse Models</Link></li>                    
              <li><Link to="/model-enquiry">Model Enquiry</Link></li>
            </ul>
          </div>

          {/* Column 2: Contact Info */}
          <div className="footer-col">
            <h3>Contact Info</h3>
            
            <div className="contact-item">
              <FaLocationDot className="contact-icon" />
              <div className="contact-text">
                Surulere<br />
                Lagos, Nigeria
              </div>
            </div>

            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <div className="contact-text">
                <a href="tel:+2348146518310">+234 814 651 8310</a>
              </div>
            </div>

            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <div className="contact-text">
                <a href="mailto:Hdmodels821@gmail.com">Hdmodels821@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Column 3: Business Hours */}
          <div className="footer-col">
            <h3>Business Hours</h3>
            <ul className="hours-list">
              <li>
                <span>Mon - Sat:</span>
                <span>9:00 AM - 9:00 PM</span>
              </li>
              <li>
                <span>Sunday:</span>
                <span>12:00 PM - 8:00 PM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Section */}
        <div className="copyright">
          <p>&copy; 2024 Honey Drop Models. All rights reserved.</p>
          
          {/* Developer Credit */}
          <div className="developer-credit">
            <span>Developed by keiestadesigns</span>
            
          

            <a href="https://wa.me/+2349018912194" target="_blank" rel="noreferrer" aria-label="Developer WhatsApp" style={{ color: '#25D366' }}>
              <FaWhatsapp />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;