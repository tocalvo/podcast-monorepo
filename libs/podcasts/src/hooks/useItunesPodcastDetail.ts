import { useQuery } from '@tanstack/react-query';
import {
  ITunesPodcastDetailQuery,
  ITunesPodcastDetailQueryExtended,
  ITunesPodcastKind,
} from '../models';
import { formatMillisecondsToMinSec } from '../utils';
import { processAllOriginsResponse, wrapUrl } from '../utils/url-prefixer';
import DOMPurify from 'isomorphic-dompurify';
import { useMemo } from 'react';

export const ITUNES_PODCAST_DETAIL_QUERY = 'ITUNES_PODCAST_DETAIL_QUERY';

export function useItunesPodcastDetail(id?: string) {
  const podcastsDetailQuery = useQuery<ITunesPodcastDetailQueryExtended>({
    queryKey: [ITUNES_PODCAST_DETAIL_QUERY, id],
    queryFn: async () => {
      const res = await fetch(
        wrapUrl(
          `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limite=20`
        )
      );
      const parsed: ITunesPodcastDetailQuery = await processAllOriginsResponse(
        res
      );
      return {
        ...parsed,
        results: parsed.results.map((result) => ({
          ...result,
          sanitizedDescription: DOMPurify.sanitize(result.description || ''),
          releaseDateLocaleString: new Date(
            result.releaseDate
          ).toLocaleDateString(),
          trackTimeMinsSegs: formatMillisecondsToMinSec(result.trackTimeMillis),
        })),
      };
    },
    gcTime: 1000 * 60 * 60 * 24, // 24 hours cache
    staleTime: 1000 * 60 * 60 * 24, // 24 hours cache
    refetchOnWindowFocus: false,
  });

  const episodes = useMemo(
    () =>
      podcastsDetailQuery.data?.results.filter(
        (podcast) => podcast.kind === ITunesPodcastKind['podcast-episode']
      ) || [],

    [podcastsDetailQuery.data]
  );

  const findEpisodeById = (id?: string) =>
    episodes.find((episode) => episode.trackId === parseInt(id || ''));

  return {
    podcastDetail: podcastsDetailQuery.data,
    episodes,
    findEpisodeById,
  };
}

export default useItunesPodcastDetail;
