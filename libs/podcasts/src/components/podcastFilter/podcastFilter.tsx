import { ITunesPodcastEntry } from '../../models';
import styles from './podcastFilter.module.css';

interface PodcastFilterProps {
  podcasts: ITunesPodcastEntry[];
  filterValue: string;
  onChangeFilter: (st: string) => void;
}

export const PodcastFilter: React.FC<PodcastFilterProps> = ({
  podcasts,
  filterValue,
  onChangeFilter,
}) => {
  return (
    <div className={styles['form']}>
      <p data-testid="num-podcasts" className={styles['number']}>
        {podcasts.length}
      </p>
      <input
        className={styles['filter']}
        type="text"
        placeholder="Filter podcasts..."
        value={filterValue}
        onChange={(e) => onChangeFilter(e.target.value)}
      ></input>
    </div>
  );
};

export default PodcastFilter;
