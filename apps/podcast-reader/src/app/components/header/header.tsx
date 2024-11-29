
import { Link } from 'react-router';
import styles from './header.module.css';

export function Header() {
  return (
    <header className={styles['header']}>
      <nav className={styles['nav']}>
        <Link className={styles['name']} to="/" aria-label="Página de inicio">
          Podcaster
        </Link>
      </nav>
    </header>
  );
}

export default Header;
