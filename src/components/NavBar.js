import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Ensure you're using react-router-dom for navigation
import '../css/NavBar.css'; // This will be our CSS file for styling the navbar

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <h1 className="logo">Nick Wolk</h1>
      <div className={`nav-items ${isOpen ? 'open' : ''}`}>
        <Link to="/" onClick={toggleMenu}>Home</Link>
        <Link to="/about" onClick={toggleMenu}>About Me</Link>
        <Link to="/experience" onClick={toggleMenu}>Experience</Link>
        <Link to="/contact" onClick={toggleMenu}>Contact</Link>
        <Link to="/portfolio" onClick={toggleMenu}>Portfolio</Link>
        <Link to="/skills" onClick={toggleMenu}>Skills</Link>
        <Link to="/blog" onClick={toggleMenu}>Blog</Link>
        <Link to="/testimonials" onClick={toggleMenu}>Testimonials</Link>
        <Link to="/resume" onClick={toggleMenu}>Resume</Link>
        <Link to="/faq" onClick={toggleMenu}>FAQ</Link>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </nav>
  );
}

export default Navbar;