import { useItunesPodcasts } from '../../hooks';
import styles from './podcasts.module.css';
import PodcastCard from '../podcastCard/podcastCard';
import { useMemo, useState } from 'react';

export const Podcasts: React.FC = () => {
  const podcastsQuery = useItunesPodcasts();

  const entries = useMemo(
    () => podcastsQuery.data?.feed.entry || [],
    [podcastsQuery.data]
  );
  const [filter, setFilter] = useState('');

  const filteredEntries = useMemo(() => {
    const lowerCaseFilter = filter.toLowerCase();
    return entries.filter(
      (entry) =>
        entry['im:name'].label.toLowerCase().includes(lowerCaseFilter) ||
        entry['im:artist'].label.toLowerCase().includes(lowerCaseFilter)
    );
  }, [entries, filter]);

  return (
    <div className={styles['container']}>
      <div className={styles['form']}>
        <p data-testid="num-podcasts" className={styles['number']}>{filteredEntries.length}</p>
        <input
          className={styles['filter']}
          type="text"
          placeholder="Filter podcasts..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        ></input>
      </div>
      <div className={styles['podcasts-grid']}>
        {filteredEntries.map((entry, i) => (
          <PodcastCard key={i} podcast={entry} />
        ))}
      </div>
    </div>
  );
};

export default Podcasts;
