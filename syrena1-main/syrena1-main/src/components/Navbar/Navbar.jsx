import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Magnetic from '../Magnetic/Magnetic';
import styles from './Navbar.module.css';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Work' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      {/* Scroll Progress Bar */}
      <div className={styles.progressBar} style={{ width: `${scrollProgress}%` }} />

      <div className={styles.inner}>
        <Magnetic strength={0.2}>
          <Link to="/" className={styles.logo} aria-label="Syrena Home" data-hover>
            <div className={styles.logoMark}>
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M20 8c-2 4-6 8-6 14 0 4 2.5 7 6 10 3.5-3 6-6 6-10 0-6-4-10-6-14z" fill="currentColor" opacity="0.2" />
                <path d="M20 8c-2 4-6 8-6 14 0 4 2.5 7 6 10 3.5-3 6-6 6-10 0-6-4-10-6-14z" stroke="currentColor" strokeWidth="1.2" fill="none" />
              </svg>
            </div>
            <span className={styles.logoText}>Syrena</span>
          </Link>
        </Magnetic>

        <nav className={styles.desktopNav} aria-label="Main navigation">
          {navLinks.map((link) => (
            <Magnetic key={link.to} strength={0.25}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ''}`
                }
                end={link.to === '/'}
                data-hover
              >
                {link.label}
              </NavLink>
            </Magnetic>
          ))}
          <Magnetic strength={0.35}>
            <Link to="/contact" className={styles.navCta} data-hover>
              <span>Get Started</span>
              <div className={styles.ctaGlow} />
            </Link>
          </Magnetic>
        </nav>

        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          data-hover
        >
          <div className={`${styles.hamburgerLines} ${mobileOpen ? styles.hamburgerOpen : ''}`}>
            <span />
            <span />
            <span />
          </div>
        </button>
      </div>

      {/* Mobile Overlay */}
      <div className={`${styles.mobileOverlay} ${mobileOpen ? styles.open : ''}`}>
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          {navLinks.map((link, i) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `${styles.mobileLink} ${isActive ? styles.mobileActive : ''}`
              }
              end={link.to === '/'}
              style={{ '--delay': `${0.1 + i * 0.07}s` }}
            >
              <span className={styles.mobileLinkNumber}>0{i + 1}</span>
              {link.label}
            </NavLink>
          ))}
          <Link to="/contact" className={styles.mobileCta} style={{ '--delay': '0.5s' }}>
            Get Started
          </Link>
        </nav>
        {/* Decorative blobs */}
        <div className={styles.mobileBlob1} />
        <div className={styles.mobileBlob2} />
      </div>
    </header>
  );
}
