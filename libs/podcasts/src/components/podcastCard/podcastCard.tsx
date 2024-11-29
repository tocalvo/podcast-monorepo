import { ITunesPodcastEntry } from '../../models';
import styles from './podcastCard.module.css';
import { getImageFromEntry } from '../../utils';
import { Link } from 'react-router';

interface PodcastCardProps {
  podcast: ITunesPodcastEntry;
}
export const PodcastCard: React.FC<PodcastCardProps> = ({ podcast }) => {
  if (!podcast) {
    return; // return skeleton
  }
  const image = getImageFromEntry(podcast);
  return (
    <Link
      data-testid="podcast-card"
      className={styles['card']}
      aria-label="Ir al detalle del podcast"
      to={`/podcast/${podcast.id.attributes['im:id']}`}
    >
      <img className={styles['image']} alt="podcast logo" src={image.label} />
      <p className={styles['title']}>{podcast['im:name'].label}</p>
      <p className={styles['artist']}>Author: {podcast['im:artist'].label}</p>
    </Link>
  );
};

export default PodcastCard;
