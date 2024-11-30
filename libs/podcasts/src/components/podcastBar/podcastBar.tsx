import { Link } from 'react-router';
import { ITunesPodcastEntry } from '../../models';
import { getImageFromEntry } from '../../utils';
import styles from './podcastBar.module.css';

interface PodcastBarProps {
  podcast?: ITunesPodcastEntry;
}
export const PodcastBar: React.FC<PodcastBarProps> = ({ podcast }) => {
  if (!podcast) {
    return; // skeleton
  }
  const image = getImageFromEntry(podcast);
  const urlToPodcastDetail = `/podcast/${podcast.id.attributes['im:id']}`;
  return (
    <div data-testid="podcasts_bar" className={styles['card']}>
      <Link className={styles['image-link']} to={urlToPodcastDetail}>
        <img className={styles['image']} alt="" src={image.label} />
      </Link>
      <hr className={styles['line']} />
      <Link to={urlToPodcastDetail}>
        <p className={styles['title']}>{podcast['im:name'].label}</p>
      </Link>
      <Link to={urlToPodcastDetail}>
        <p className={styles['italic']}>by {podcast['im:artist'].label}</p>
      </Link>
      <hr className={styles['line']} />
      <p className={styles['title2']}>Description:</p>
      <p className={styles['italic']}>{podcast.summary.label}</p>
    </div>
  );
};

export default PodcastBar;
