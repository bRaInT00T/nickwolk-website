import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import '../css/FlyoutNav.css';
import Logo from '../assets/img_desktop.svg';



const FlyoutNav = () => {
  const [opacity, setOpacity] = useState(0);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  
  const closeMobileMenu = () => setMobileMenuOpen(false);

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
      <div className="nav-content">
        <NavLink to="">
        <div className='navbar-logo-card'>
        <div className='navbar-logo-card-inner'>
          <img className="navbar-logo" id='logo' alt='NW Logo' src={Logo} />
          </div>
          </div>
        </NavLink>
        <ul className="nav-links">
          <li className="nav-item">
            <NavLink to="about" className="nav-link">About</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="experience" className="nav-link">Experience</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="skills" className="nav-link">Skills</NavLink>
          </li>
          <li 
            className="nav-item dropdown" 
            onMouseEnter={() => setDropdownOpen(true)} 
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <NavLink to="kanban" className="nav-link">Kanban</NavLink>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li className="dropdown-item">
                  <NavLink to="kanban/board1" className="dropdown-link">Board 1</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink to="kanban/board2" className="dropdown-link">Board 2</NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink to="kanban/board3" className="dropdown-link">Board 3</NavLink>
                </li>
              </ul>
            )}
          </li>
          <li className="nav-item">
            <NavLink to="resume" className="nav-link">Resume</NavLink>
          </li>
        </ul>
        <button className="mobile-menu-icon" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? '✖' : '☰'}
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="mobile-menu">
            <NavLink id="NavLink" to="about" onClick={closeMobileMenu}>About</NavLink>
            <NavLink id="NavLink" to="experience" onClick={closeMobileMenu}>Experience</NavLink>
            <NavLink id="NavLink" to="skills" onClick={closeMobileMenu}>Skills</NavLink>
            <NavLink id="NavLink" to="resume" onClick={closeMobileMenu}>Resume</NavLink>
        </div>
      )}
    </nav>
  );
};

export default FlyoutNav;
