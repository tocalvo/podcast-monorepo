import {
  EpisodeContent,
  PodcastBar,
  useItunesPodcastDetail,
  useItunesPodcasts,
} from '@org/podcasts';
import styles from './episodeDetailPage.module.css';

import { useParams } from 'react-router';

type EpisodeDetailPageParams = {
  episodeId?: string;
  podcastId?: string;
};
export const EpisodeDetailPage: React.FC = () => {
  const { episodeId, podcastId } = useParams<EpisodeDetailPageParams>();

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
      <EpisodeContent episode={episode} />
    </div>
  );
};
export default EpisodeDetailPage;
