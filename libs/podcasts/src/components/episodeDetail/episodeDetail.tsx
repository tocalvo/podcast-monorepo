import { useMemo } from 'react';
import { useItunesPodcastDetail, useItunesPodcasts } from '../../hooks';
import styles from './episodeDetail.module.css';
import PodcastBar from '../podcastBar/podcastBar';
import DOMPurify from 'isomorphic-dompurify';
import { useParams } from 'react-router';

type EpisodeDetailParams = {
  episodeId?: string;
  podcastId?: string;
};
export const EpisodeDetail: React.FC = () => {
  const { episodeId, podcastId } = useParams<EpisodeDetailParams>();

  const podcastDetailQuery = useItunesPodcastDetail(podcastId);

  const { episode, sanitizedDescription } = useMemo(() => {
    const episode = podcastDetailQuery.data?.results.find(
      (podcast) => podcast.trackId === parseInt(episodeId || '')
    );
    return {
      episode,
      sanitizedDescription: DOMPurify.sanitize(episode?.description || ''),
    };
  }, [podcastDetailQuery.data, episodeId]);

  const itunesPodcastsQuery = useItunesPodcasts();
  const itunesPodcast = useMemo(() => {
    return itunesPodcastsQuery.data?.feed.entry.find(
      (podcast) => podcast.id.attributes['im:id'] === podcastId
    );
  }, [itunesPodcastsQuery.data, podcastId]);
  if (!episode || !itunesPodcast) {
    return; // go to home or 404
  }

  return (
    <div className={styles['container']}>
      <PodcastBar podcast={itunesPodcast} />

      <div className={`${styles['card']} ${styles['episode-container']}`}>
        <h1>
          <b>{episode.trackName}</b>
        </h1>
        <p>
          <i
            data-testid="episode_content"
            dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
          ></i>
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
