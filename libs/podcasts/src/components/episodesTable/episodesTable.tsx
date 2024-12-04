import styles from './episodesTable.module.css';
import { Link } from 'react-router';
import { ITunesPodcastDetailExtended } from '../../models';

interface EpisodesTableProps {
  podcastId: string;
  episodes: ITunesPodcastDetailExtended[];
}
export const EpisodesTable: React.FC<EpisodesTableProps> = ({
  episodes,
  podcastId,
}) => {
  return (
    <div data-testid="podcasts_table" className={styles['episodes-container']}>
      <div className={styles['card']}>
        <p>
          <b>Episodes: {episodes?.length}</b>
        </p>
      </div>
      <div className={`${styles['card']} ${styles['striped-table']}`}>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {episodes.map((episode, i) => (
              <tr key={i}>
                <td>
                  <Link
                    className={styles['link']}
                    to={`/podcast/${podcastId}/episode/${episode.trackId}`}
                  >
                    {episode.trackName}
                  </Link>
                </td>
                <td>{episode.releaseDateLocaleString}</td>
                <td>{episode.trackTimeMinsSegs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default EpisodesTable;
