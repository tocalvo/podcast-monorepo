import { useItunesPodcasts } from '../../hooks';
import styles from './podcasts.module.css';

export function Podcasts() {
  const podcastsQuery = useItunesPodcasts();
  console.log(podcastsQuery.data);
  return (
    <div className={styles['container']}>
      <h1>Welcome to Podcasts!</h1>
    </div>
  );
}

export default Podcasts;
