import { ITunesPodcastDetailExtended } from '../../models';
import parse from 'html-react-parser';
import styles from './episodeContent.module.css';

export const EpisodeContent: React.FC<{
  episode: ITunesPodcastDetailExtended;
}> = ({ episode }) => {
  return (
    <div
      data-testid="episode_content"
      className={`${styles['card']} ${styles['episode-content']}`}
    >
      <h1>
        <b>{episode.trackName}</b>
      </h1>
      <p>
        <i data-testid="episode_content_text">
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
  );
};

export default EpisodeContent;
