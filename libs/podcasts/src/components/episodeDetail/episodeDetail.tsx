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

  const { getPodcastResumeById } = useItunesPodcasts();
  const itunesPodcastResume = getPodcastResumeById(podcastId);

  const { findEpisodeById } = useItunesPodcastDetail(podcastId);
  const episode = findEpisodeById(episodeId);

  if (!episode || !itunesPodcastResume) {
    return; // go to home or 404
  }

  return (
    <div className={styles.container}>
      <PodcastBar podcast={itunesPodcastResume} />

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
