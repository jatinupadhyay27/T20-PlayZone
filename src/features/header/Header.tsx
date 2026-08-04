import { NavLink, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { toggleSidebar } from '@/store/slices/navigationSlice';
import { openWhatsAppChat } from '@/services/whatsappService';
import Button from '@/components/ui/Button';
import Icon from '@/components/common/Icon';
import styles from './Header.module.css';

export default function Header() {
  const dispatch = useAppDispatch();
  const navLinks = useAppSelector((state) => state.navigation.navLinks);
  const isSidebarOpen = useAppSelector((state) => state.navigation.isSidebarOpen);

  return (
    <header className={styles.header}>
      <button
        type="button"
        className={styles.menuToggle}
        aria-label={isSidebarOpen ? 'Close game lobby menu' : 'Open game lobby menu'}
        aria-expanded={isSidebarOpen}
        onClick={() => dispatch(toggleSidebar())}
      >
        <Icon name="menu" size={18} />
      </button>

      <Link to="/" className={styles.brand} aria-label="T20 Play Zone home">
        <img
          src="/images/brand/t20playzone-logo-horizontal.png"
          alt="T20 Play Zone"
          className={styles.brandLogo}
        />
      </Link>

      <nav className={styles.nav} aria-label="Primary">
        <ul className={styles.navList}>
          {navLinks.map((link) => (
            <li key={link.id}>
              <NavLink
                to={link.href}
                end={link.href === '/'}
                className={({ isActive }) =>
                  isActive ? styles.navLinkActive : styles.navLink
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.actions}>
        <Button
          variant="primary"
          onClick={() =>
            openWhatsAppChat(undefined, "Hi! I'd like to log in to my T20 Play Zone account. Could you help me?")
          }
        >
          Login
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            openWhatsAppChat(undefined, "Hi! I'd like to get ID. Could you help me get started?")
          }
        >
          Get ID
        </Button>
      </div>
    </header>
  );
}
