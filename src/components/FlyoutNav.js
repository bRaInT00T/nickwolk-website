import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { FaBars, FaTimes } from 'react-icons/fa';
import { AnimatePresence, motion } from "framer-motion";
import '../css/FlyoutNav.css';
import Logo from '../assets/img_desktop.svg';

const FlyoutNav = () => {
  const [opacity, setOpacity] = useState(0);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [dir, setDir] = useState(null);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleScroll = () => {
    const currentScroll = window.scrollY;
    const newOpacity = Math.min(.85, currentScroll / 300);
    setOpacity(newOpacity);
  };

  const handleSetSelected = (val) => {
    if (typeof selected === "number" && typeof val === "number") {
      setDir(selected > val ? "r" : "l");
    } else if (val === null) {
      setDir(null);
    }
    setSelected(val);
  };

  const handleLinkClick = () => {
    setDropdownOpen(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar" style={{ top: 0, position: 'sticky', zIndex: 1, backgroundColor: `rgba(24, 30, 38, ${opacity})` }}>
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
          <li className="nav-item">
            <NavLink to="resume" className="nav-link">Resume</NavLink>
          </li>
          <li
            className="nav-item dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              id="shift-tab-kanban"
              onMouseEnter={() => handleSetSelected(1)}
              onClick={() => handleSetSelected(1)}
              className="navButton nav-link"
            >
              <span>Just<span className='fun'>4</span>Fun</span>
              <FiChevronDown
                className={`chevron-icon transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isDropdownOpen && (
              <AnimatePresence>
                <Content dir={dir} handleLinkClick={handleLinkClick} />
              </AnimatePresence>
            )}
          </li>
        </ul>
        <button className="mobile-menu-icon" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <div className="nav-spacer"></div>

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

const Content = ({ dir, handleLinkClick }) => {
  return (
    <motion.div
      id="overlay-content"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="dropdown-content"
    >
      <Bridge />
      <Nub />

      <div className="misc-container">
        <Misc handleLinkClick={handleLinkClick} />
      </div>
      <div className="apis-container">
        <APIs handleLinkClick={handleLinkClick} />
      </div>
    </motion.div>
  );
};

const Bridge = () => (
  <div className="bridge" />
);

const Nub = () => {
  return (
    <motion.span
      style={{ clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)", left: "100%" }}
      className="nub"
    />
  );
};

const Misc = ({ handleLinkClick }) => (
  <div>
    <div className="misc-container">
      <div>
        <h3 className="misc-section-title">Misc</h3>
        <NavLink to="kanban" className="misc-link" onClick={handleLinkClick}>Kanban</NavLink>
      </div>
    </div>
  </div>
);

const APIs = ({ handleLinkClick }) => (
  <div>
    <div className="apis-container">
      <div>
        <h3 className="apis-section-title">APIs</h3>
        <NavLink to="vehicle" className="apis-link" onClick={handleLinkClick}>My Vehicle</NavLink>
        <NavLink to="phillies" className="apis-link" onClick={handleLinkClick}><img src={`https://www.mlbstatic.com/team-logos/143.svg`} alt="P" style={{ position: "relative", height: "20px" }}/>hillies</NavLink>
      </div>
    </div>
  </div>
);

export default FlyoutNav;
