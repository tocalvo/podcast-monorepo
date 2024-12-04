import {
  EpisodesTable,
  PodcastBar,
  useItunesPodcastDetail,
  useItunesPodcasts,
} from '@org/podcasts';
import styles from './podcastDetailPage.module.css';

import { useParams } from 'react-router';

export const PodcastDetailPage: React.FC = () => {
  const { podcastId } = useParams();

  const { getPodcastResumeById } = useItunesPodcasts();
  const itunesPodcastResume = getPodcastResumeById(podcastId);

  const { episodes } = useItunesPodcastDetail(podcastId);

  if (!podcastId || !itunesPodcastResume) {
    return; // redirect to home or to 404
  }

  return (
    <div className={styles['container']}>
      <PodcastBar podcast={itunesPodcastResume} />
      <EpisodesTable podcastId={podcastId} episodes={episodes} />
    </div>
  );
};
export default PodcastDetailPage;
