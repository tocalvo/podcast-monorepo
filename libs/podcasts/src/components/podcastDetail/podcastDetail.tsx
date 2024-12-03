import { useItunesPodcastDetail, useItunesPodcasts } from '../../hooks';
import styles from './podcastDetail.module.css';
import PodcastBar from '../podcastBar/podcastBar';
import { Link, useParams } from 'react-router';

export const PodcastDetail: React.FC = () => {
  const { podcastId } = useParams();

  const { getPodcastResumeById } = useItunesPodcasts();
  const itunesPodcastResume = getPodcastResumeById(podcastId);

  const { episodes } = useItunesPodcastDetail(podcastId);

  if (!itunesPodcastResume) {
    return; // redirect to home or to 404
  }

  return (
    <div className={styles['container']}>
      <PodcastBar podcast={itunesPodcastResume} />
      <div className={styles['episodes-container']}>
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
    </div>
  );
};
export default PodcastDetail;
