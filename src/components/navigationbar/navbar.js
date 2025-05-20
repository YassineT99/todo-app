import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import './navbar.css';

// Navigation items
const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Tasks', path: '/todos' },
  { name: 'About', path: '/about' }
];

export default function Navbar() {
  // State for hamburger menu (mobile)
  const [menuOpen, setMenuOpen] = useState(false);

  // Refs for highlight and nav links
  const highlightRef = useRef(null);
  const navLinksRef = useRef([]);
  const location = useLocation();

  // Track previous layout mode (mobile/desktop)
  const prevIsMobile = useRef(window.innerWidth <= 1219);

  /**
   * Animate the highlight to the active link.
   * @param {boolean} snap - If true, move instantly (no animation).
   */
  const animateHighlight = (snap = false) => {
    const activeLink = navLinksRef.current.find(link => link && link.classList.contains('active'));
    const highlight = highlightRef.current;
    const navLinks = activeLink?.closest('.navbar_links');
    if (!activeLink || !highlight || !navLinks) return;

    const isMobile = window.innerWidth <= 1219;
    const linkRect = activeLink.getBoundingClientRect();
    const navRect = navLinks.getBoundingClientRect();

    // Snap instantly if requested, otherwise animate
    const duration = snap ? 0 : (isMobile ? 0.15 : 0.3);

    if (isMobile) {
      // Mobile: highlight matches link width and position in column
      gsap.to(highlight, {
        x: activeLink.offsetLeft,
        y: activeLink.offsetTop,
        width: activeLink.offsetWidth,
        height: activeLink.offsetHeight,
        opacity: 1,
        duration,
        ease: 'power2.out'
      });
    } else {
      // Desktop: highlight matches link size and position in row
      gsap.to(highlight, {
        x: linkRect.left - navRect.left,
        y: linkRect.top - navRect.top,
        width: linkRect.width,
        height: linkRect.height,
        opacity: 1,
        duration,
        ease: 'power2.out'
      });
    }
  };

  // Animate or snap highlight on route/menu changes
  useEffect(() => {
    if (menuOpen) {
      // Snap instantly when opening hamburger panel
      setTimeout(() => {
        animateHighlight(true);
      }, 0);
    } else {
      animateHighlight();
    }
  }, [location, menuOpen]);

  // Handle layout changes (desktop <-> mobile)
  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth <= 1219;
      // If layout mode changed, close menu and snap highlight
      if (isNowMobile !== prevIsMobile.current) {
        setMenuOpen(false);
        prevIsMobile.current = isNowMobile;
        animateHighlight(true);
      } else {
        animateHighlight();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [location]);

  return (
    <nav className="navbar">
      <div className="navbar__container">
        {/* Hamburger button for mobile */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </button>

        {/* Nav links: always rendered, visibility controlled by CSS */}
        <ul
          className={`navbar_links${(menuOpen || window.innerWidth > 1219) ? ' active' : ''}`}
        >
          {navItems.map((item, idx) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                ref={el => (navLinksRef.current[idx] = el)}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
          {/* Animated highlight */}
          <div ref={highlightRef} className="nav-slide-highlight" />
        </ul>
      </div>
    </nav>
  );
}