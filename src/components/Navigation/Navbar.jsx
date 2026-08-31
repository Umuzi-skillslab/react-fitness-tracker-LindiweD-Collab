import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const NAV_ITEMS = [
  { to: '/', label: 'Home', match: (path) => path === '/' },
  { to: '/exercises', label: 'Exercises', match: (path) => path.startsWith('/exercises') },
  { to: '/workout-planner', label: 'Workout Planner', match: (path) => path === '/workout-planner' },
  { to: '/history', label: 'History', match: (path) => path === '/history' },
  { to: '/progress', label: 'Progress', match: (path) => path === '/progress' },
];


const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand} onClick={closeMenu}>
          <span className={styles.pulseDot} aria-hidden="true" />
          Pulse
        </Link>

        <button
          type="button"
          className={styles.hamburger}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? '✕' : '☰'}
        </button>

        <div className={`${styles.links} ${isOpen ? styles.linksOpen : ''}`}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={closeMenu}
              className={`${styles.link} ${item.match(location.pathname) ? styles.active : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
