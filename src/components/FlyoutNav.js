import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import '../css/FlyoutNav.css';
import Logo from '../assets/img_desktop.svg';

const FlyoutNav = () => {
  const [opacity, setOpacity] = useState(0);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = () => {
    const currentScroll = window.scrollY;
    const newOpacity = Math.min(1, currentScroll / 500);  // Adjust the 300 to control the fade effect
    setOpacity(newOpacity);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar" style={{ top: 0, position: 'sticky', zIndex: 1, backgroundColor: `rgba(51, 51, 51, ${opacity})` }}> 
    {/* boxShadow: '0 2px 4px rgba(0,0,0,0.1)',  */}
      <div className="nav-content">
        <img className="navbar-logo" id='logo' alt='NW Logo' src={Logo}/>
        <ul className="nav-links">
          <li className="nav-item">
            <NavLink to="home" className="nav-link">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="experience" className="nav-link">Experience</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="about" className="nav-link">About</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="contact" className="nav-link">Contact</NavLink>
          </li>
          {/* <li className="nav-item">
            <NavLink to="blog" className="nav-link">Blog</NavLink>
          </li> */}
          <li className="nav-item">
            <NavLink to="resume" className="nav-link">Resume</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="skills" className="nav-link">Skills</NavLink>
          </li>
          {/* <li className="nav-item">
            <NavLink to="portfolio" className="nav-link">Portfolio</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="faq" className="nav-link">FAQ</NavLink>
          </li> */}
        </ul>
        <button className="mobile-menu-icon" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? '✖' : '☰'}
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <NavLink to="">Home</NavLink>
          <NavLink to="experience">Services</NavLink>
          <NavLink to="about">About</NavLink>
          <NavLink to="contact">Contact</NavLink>
          <NavLink to="blog">Blog</NavLink>
          <NavLink to="resume">Resume</NavLink>
          <NavLink to="skills">Skills</NavLink>
          <NavLink to="portfolio">Portfolio</NavLink>
          <NavLink to="faq">FAQ</NavLink>
        </div>
      )}
    </nav>
  );
};

export default FlyoutNav;
