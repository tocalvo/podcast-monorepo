import { useMemo } from 'react';
import { useItunesPodcastDetail, useItunesPodcasts } from '../../hooks';
import styles from './podcastDetail.module.css';
import { ITunesPodcastKind } from '../../models';
import PodcastBar from '../podcastBar/podcastBar';
import { Link, useParams } from 'react-router';

export const PodcastDetail: React.FC = () => {
  const { podcastId } = useParams();

  const itunesPodcastsQuery = useItunesPodcasts();
  const itunesPodcast = useMemo(() => {
    return itunesPodcastsQuery.data?.feed.entry.find(
      (podcast) => podcast.id.attributes['im:id'] === podcastId
    );
  }, [itunesPodcastsQuery.data, podcastId]);

  const podcastDetailQuery = useItunesPodcastDetail(podcastId);
  const podcastEpisodes = useMemo(() => {
    return (
      podcastDetailQuery.data?.results.filter(
        (podcast) => podcast.kind === ITunesPodcastKind['podcast-episode']
      ) || []
    );
  }, [podcastDetailQuery.data]);

  if (!itunesPodcast) {
    return; // redirect to home or to 404
  }

  return (
    <div className={styles['container']}>
      <PodcastBar podcast={itunesPodcast} />
      <div className={styles['episodes-container']}>
        <div className={styles['card']}>
          <p>
            <b>Episodes: {podcastEpisodes?.length}</b>
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
              {podcastEpisodes.map((episode, i) => (
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
