import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import { 
  FaBriefcase, FaGraduationCap, FaGlobeAfrica, 
  FaWalking, FaCamera, FaBullhorn, FaVideo, FaQuoteLeft 
} from 'react-icons/fa'; 
import './Home.css';

// --- MEDIA IMPORTS ---
import bannerVideo from '../assets/videos/banner.mp4'; 
import vid1 from '../assets/videos/vid1.mp4'; 
import vid2 from '../assets/videos/vid2.mp4'; 
import vid3 from '../assets/videos/vid3.mp4';

// Featured Models (1-6)
import latest1 from '../assets/images/latest1.jpg';
import latest2 from '../assets/images/latest2.jpg';
import latest3 from '../assets/images/latest3.jpg';
import latest4 from '../assets/images/latest4.jpg';
import latest5 from '../assets/images/latest5.jpg';
import latest6 from '../assets/images/latest6.jpg';

// Slideshow Images (7-9)
import latest7 from '../assets/images/latest7.jpg';
import latest8 from '../assets/images/latest8.jpg';
import latest9 from '../assets/images/latest9.jpg';

import group1 from '../assets/images/group1.jpg';
import group2 from '../assets/images/group2.jpg';

// --- SERVICE OFFER IMAGES (Replace these paths with your actual images) ---
import runwayImg from '../assets/images/runway-offer.jpg'; 
import editorialImg from '../assets/images/editorial-offer.jpg'; 
import brandImg from '../assets/images/brand-offer.jpg'; 
import commercialImg from '../assets/images/commercial-offer.jpg'; 

const Home = () => {
  // 1. SLIDESHOW DATA (3 Videos + 3 Images)
  const slides = [
    { type: 'video', src: vid1 },
    { type: 'image', src: latest7 },
    { type: 'video', src: vid2 },
    { type: 'image', src: latest8 },
    { type: 'video', src: vid3 },
    { type: 'image', src: latest9 },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to move to next slide
  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  // Logic: Wait for video to finish, or set 5s timer for images
  useEffect(() => {
    const slideData = slides[currentSlide];
    if (slideData.type === 'image') {
      const timer = setTimeout(() => goToNextSlide(), 5000); 
      return () => clearTimeout(timer);
    }
  }, [currentSlide, goToNextSlide, slides]);

  // 2. CAROUSEL DATA
  const featuredModels = [
    { id: 1, img: latest1 }, { id: 2, img: latest2 }, { id: 3, img: latest3 },
    { id: 4, img: latest4 }, { id: 5, img: latest5 }, { id: 6, img: latest6 },
  ];

  const groupShoots = [
    { id: 1, img: group1 }, { id: 2, img: group2 },
    { id: 3, img: group1 }, { id: 4, img: group2 },
  ];

  return (
    <div className="home-main-wrapper">
      <Navbar />

      {/* Hero Banner (Full Width) */}
      <header className="home-hero">
        <video className="hero-video" autoPlay loop muted playsInline>
          <source src={bannerVideo} type="video/mp4" />
        </video>
      </header>

      <div className="container">
        
        {/* Featured Models Carousel (Small & Elegant) */}
        <section className="section-wrapper">
          <h3 className="section-title">Featured Models</h3>
          <div className="carousel-track">
            {[...featuredModels, ...featuredModels].map((model, index) => (
              <div key={index} className="model-card">
                <img src={model.img} alt="Model" className="card-img" />
              </div>
            ))}
          </div>
        </section>

        {/* Group Shoots Carousel */}
        <section className="section-wrapper" style={{animationDelay: '0.2s'}}>
          <h3 className="section-title">Latest Group Shoots</h3>
          <div className="carousel-track">
            {[...groupShoots, ...groupShoots].map((group, index) => (
              <div key={index} className="group-card">
                <img src={group.img} alt="Group" className="group-img" />
              </div>
            ))}
          </div>
        </section>

        {/* Our Story Section */}
        <section id="about" className="about-section">
          <div className="about-header">
            <h2 className="about-main-title">Our Story</h2>
            <p className="about-subtitle">Built to Elevate. Inspired to Empower.</p>
          </div>

          <div className="about-narrative">
            <p>
              HDMODELS is a premier fashion modeling agency dedicated to connecting talented models with top brands, 
              photographers, and creative professionals. Founded with a vision to redefine beauty standards and 
              promote diversity in the fashion industry.
            </p>
            <p>
              Founded in Lagos in 2019, Honeydrop Beauty League is Nigeria’s premier platform for discovering, 
              nurturing, and celebrating the next generation of beauty and fashion talent.
            </p>
          </div>

          <div className="quote-container">
            <FaQuoteLeft className="quote-icon" />
            <h3>“We don’t just model beauty. We shape it.”</h3>
            <span>Empowering a new generation since 2019</span>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <FaBriefcase className="stat-icon" />
              <h4>2,000+</h4>
              <p>Clients Served</p>
            </div>
            <div className="stat-card">
              <FaGraduationCap className="stat-icon" />
              <h4>500+</h4>
              <p>Models Trained</p>
            </div>
            <div className="stat-card">
              <FaGlobeAfrica className="stat-icon" />
              <h4>10+ Cities</h4>
              <p>Global Reach</p>
            </div>
          </div>
        </section>
      </div>

      {/* Cinematic Slideshow Section (100% Mobile Responsive) */}
      <section className="slideshow-section">
        {slides.map((slide, index) => (
          <div key={index} className={`slide-item ${index === currentSlide ? 'active' : ''}`}>
            {slide.type === 'video' ? (
              <video 
                src={slide.src} 
                className="slide-media" 
                autoPlay 
                muted 
                playsInline
                onEnded={goToNextSlide} 
              />
            ) : (
              <img src={slide.src} alt="Slide" className="slide-media" />
            )}
          </div>
        ))}

        <div className="slideshow-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      <div className="container">
        {/* Services Section with Dedicated Category Images */}
        <section className="section-wrapper" style={{marginBottom: '5rem'}}>
          <h3 className="section-title">What We Offer</h3>
          <div className="services-grid">
            
            <div className="service-card">
              <FaWalking className="offer-icon" />
              <h4>Runway Models</h4>
              <p>Poised for catwalks & fashion week brilliance.</p>
              <div className="service-img-box">
                <img src={runwayImg} alt="Runway" />
              </div>
            </div>

            <div className="service-card">
              <FaCamera className="offer-icon" />
              <h4>Editorial Faces</h4>
              <p>Perfect for magazines, lookbooks, & campaigns.</p>
              <div className="service-img-box">
                <img src={editorialImg} alt="Editorial" />
              </div>
            </div>

            <div className="service-card">
              <FaBullhorn className="offer-icon" />
              <h4>Brand Influencer</h4>
              <p>Trained for impactful product representation.</p>
              <div className="service-img-box">
                <img src={brandImg} alt="Brand Influencer" />
              </div>
            </div>

            <div className="service-card">
              <FaVideo className="offer-icon" />
              <h4>Commercials</h4>
              <p>Video and commercial productions.</p>
              <div className="service-img-box">
                <img src={commercialImg} alt="Commercial" />
              </div>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;