import { useMemo } from 'react';
import { useItunesPodcastDetail, useItunesPodcasts } from '../../hooks';
import styles from './episodeDetail.module.css';
import PodcastBar from '../podcastBar/podcastBar';
import { useParams } from 'react-router';
import parse from 'html-react-parser';

type EpisodeDetailParams = {
  episodeId?: string;
  podcastId?: string;
};
export const EpisodeDetail: React.FC = () => {
  const { episodeId, podcastId } = useParams<EpisodeDetailParams>();

  const podcastDetailQuery = useItunesPodcastDetail(podcastId);

  const episode = useMemo(
    () =>
      podcastDetailQuery.data?.results.find(
        (podcast) => podcast.trackId === parseInt(episodeId || '')
      ),
    [podcastDetailQuery.data, episodeId]
  );

  const itunesPodcastsQuery = useItunesPodcasts();
  const itunesPodcast = useMemo(() => {
    return itunesPodcastsQuery.data?.feed.entry.find(
      (podcast) => podcast.id.attributes['im:id'] === podcastId
    );
  }, [itunesPodcastsQuery.data, podcastId]);
  if (!episode || !itunesPodcast) {
    return; // go to home or 404
  }
  console.log('epido', episode);

  return (
    <div className={styles.container}>
      <PodcastBar podcast={itunesPodcast} />

      <div className={`${styles['card']} ${styles['episode-container']}`}>
        <h1>
          <b>{episode.trackName}</b>
        </h1>
        <p>
          <i data-testid="episode_content">
            {parse(episode.sanitizedDescription || '')}
          </i>
        </p>
        <audio className={styles['audio']} controls>
          <source
            src={episode.episodeUrl}
            type={`audio/${episode.episodeFileExtension}`}
          />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};
export default EpisodeDetail;
