import { Link } from 'react-router';
import styles from './header.module.css';
import { useIsFetching } from '@tanstack/react-query';
import Loader from '../loader/loader';

export function Header() {
  const isFetching = useIsFetching();
  return (
    <header className={styles['header']}>
      <nav className={styles['nav']}>
        <Link className={styles['name']} to="/" aria-label="Página de inicio">
          Podcaster
        </Link>
        {!!isFetching && <Loader />}
      </nav>
    </header>
  );
}

export default Header;
