import React, { useState, useEffect } from 'react';
import '../css/FlyoutNav.css';

const FlyoutNav = () => {
  const [opacity, setOpacity] = useState(0);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = () => {
    const currentScroll = window.pageYOffset;
    const newOpacity = Math.min(1, currentScroll / 300);  // Adjust the 300 to control the fade effect
    setOpacity(newOpacity);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Logo />
        <ul className="nav-links">
          <li className="nav-item">
            <a href="home" className="nav-link">Home</a>
          </li>
          <li className="nav-item">
            <a href="experience" className="nav-link">Experience</a>
          </li>
          <li className="nav-item">
            <a href="about" className="nav-link">About</a>
          </li>
          <li className="nav-item">
            <a href="contact" className="nav-link">Contact</a>
          </li>
          <li className="nav-item">
            <a href="blog" className="nav-link">Blog</a>
          </li>
          <li className="nav-item">
            <a href="resume" className="nav-link">Resume</a>
          </li>
          <li className="nav-item">
            <a href="skills" className="nav-link">Skills</a>
          </li>
          <li className="nav-item">
            <a href="portfolio" className="nav-link">Portfolio</a>
          </li>
          <li className="nav-item">
            <a href="faq" className="nav-link">FAQ</a>
          </li>
        </ul>
        <button className="mobile-menu-icon" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? '✖' : '☰'}
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <a href="home">Home</a>
          <a href="experience">Services</a>
          <a href="about">About</a>
          <a href="contact">Contact</a>
          <a href="contact">Contact</a>
          <a href="contact">Contact</a>
          <a href="contact">Contact</a>
        </div>
      )}
    </nav>
  );
};

export default FlyoutNav;

const Logo = () => {
  return (
    <div className="logo">
      <img src="/assets/img_desktop.png" alt="NW Logo" style={{ height: '50px' }} />
    </div>
  );
};
