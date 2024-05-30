// src/components/FlyoutNav.js

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
                className={`chevron-icon transition-transform ${selected === 1 ? "rotate-180" : ""}`}
              />
            </button>
            {isDropdownOpen && (
              <AnimatePresence>
                {selected && <Content dir={dir} selected={selected} handleLinkClick={handleLinkClick} />}
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

const Content = ({ selected, dir, handleLinkClick }) => {
  return (
    <motion.div
      id="overlay-content"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="dropdown-content"
    >
      <Bridge />
      <Nub selected={selected} />

      {TABS.map((t) => (
        <div style={{ overflow: "hidden" }} key={t.id}>
          {selected === t.id && (
            <motion.div
              initial={{ opacity: 0, x: dir === "l" ? 100 : dir === "r" ? -100 : 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <t.Component handleLinkClick={handleLinkClick} />
            </motion.div>
          )}
        </div>
      ))}
    </motion.div>
  );
};

const Bridge = () => (
  <div className="bridge" />
);

const Nub = ({ selected }) => {
  const [left, setLeft] = useState(0);

  useEffect(() => {
    const moveNub = () => {
      if (selected) {
        const hoveredTab = document.getElementById(`shift-tab-${selected}`);
        const overlayContent = document.getElementById("overlay-content");

        if (!hoveredTab || !overlayContent) return;

        const tabRect = hoveredTab.getBoundingClientRect();
        const { left: contentLeft } = overlayContent.getBoundingClientRect();

        const tabCenter = tabRect.left + tabRect.width / 2 - contentLeft;

        setLeft(tabCenter);
      }
    };

    moveNub();
  }, [selected]);

  return (
    <motion.span
      style={{ clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)", left: "100%" }}
      animate={{ left }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="nub"
    />
  );
};

const Products = ({ handleLinkClick }) => (
  <div>
    <div className="products-container">
      <div>
        <h3 className="products-section-title">React</h3>
        <NavLink to="kanban" className="products-link" onClick={handleLinkClick}>Kanban</NavLink>
      </div>
    </div>
  </div>
);

const TABS = [
  {
    title: "Products",
    Component: Products,
  },
].map((n, idx) => ({ ...n, id: idx + 1 }));

export default FlyoutNav;
