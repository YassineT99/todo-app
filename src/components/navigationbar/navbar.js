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
  
  // Ref to store current GSAP animation for cleanup
  const currentAnimation = useRef(null);

  /**
   * Animate the highlight to the active link.
   * @param {boolean} snap - If true, move instantly (no animation).
   */
  const animateHighlight = (snap = false) => {
    const activeLink = navLinksRef.current.find(link => link && link.classList.contains('active'));
    const highlight = highlightRef.current;
    const navLinks = activeLink?.closest('.navbar_links');
    
    if (!activeLink || !highlight || !navLinks) return;

    // Kill any existing animation to prevent conflicts
    if (currentAnimation.current) {
      currentAnimation.current.kill();
    }

    const isMobile = window.innerWidth <= 1219;
    const linkRect = activeLink.getBoundingClientRect();
    const navRect = navLinks.getBoundingClientRect();

    // Snap instantly if requested, otherwise animate
    const duration = snap ? 0 : (isMobile ? 0.15 : 0.3);

    if (isMobile) {
      // Mobile: highlight matches link width and position in column
      currentAnimation.current = gsap.to(highlight, {
        x: activeLink.offsetLeft,
        y: activeLink.offsetTop,
        width: activeLink.offsetWidth,
        height: activeLink.offsetHeight,
        opacity: 1,
        duration,
        ease: 'power2.out',
        overwrite: true // Ensure this animation overwrites any conflicting ones
      });
    } else {
      // Desktop: highlight matches link size and position in row
      currentAnimation.current = gsap.to(highlight, {
        x: linkRect.left - navRect.left,
        y: linkRect.top - navRect.top,
        width: linkRect.width,
        height: linkRect.height,
        opacity: 1,
        duration,
        ease: 'power2.out',        overwrite: true // Ensure this animation overwrites any conflicting ones
      });
    }
  };

  // Animate or snap highlight on route/menu changes
  useEffect(() => {
    if (menuOpen) {
      // Use requestAnimationFrame instead of setTimeout for better timing
      requestAnimationFrame(() => {
        animateHighlight(true);
      });
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
        // Use requestAnimationFrame for better timing
        requestAnimationFrame(() => {
          animateHighlight(true);
        });
      } else {
        // Use requestAnimationFrame for smoother animations
        requestAnimationFrame(() => {
          animateHighlight();
        });
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [location]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (currentAnimation.current) {
        currentAnimation.current.kill();
      }
    };
  }, []);

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