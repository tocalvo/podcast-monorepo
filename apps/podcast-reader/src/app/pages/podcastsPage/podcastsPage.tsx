import styles from './podcasts.module.css';

import { useMemo, useState } from 'react';
import { PodcastCard, PodcastFilter, useItunesPodcasts } from '@org/podcasts';

export const PodcastsPage: React.FC = () => {
  const { podcasts } = useItunesPodcasts();

  const [filter, setFilter] = useState('');

  const filteredEntries = useMemo(() => {
    const lowerCaseFilter = filter.toLowerCase();
    return podcasts.filter(
      (entry) =>
        entry['im:name'].label.toLowerCase().includes(lowerCaseFilter) ||
        entry['im:artist'].label.toLowerCase().includes(lowerCaseFilter)
    );
  }, [podcasts, filter]);

  return (
    <div className={styles['container']}>
      <PodcastFilter
        podcasts={filteredEntries}
        filterValue={filter}
        onChangeFilter={setFilter}
      />
      <div className={styles['podcasts-grid']}>
        {filteredEntries.map((entry, i) => (
          <PodcastCard key={i} podcast={entry} />
        ))}
      </div>
    </div>
  );
};

export default PodcastsPage;
