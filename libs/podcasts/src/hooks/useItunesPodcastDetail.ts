import { useQuery } from '@tanstack/react-query';
import {
  ITunesPodcastDetailQuery,
  ITunesPodcastDetailQueryExtended,
} from '../models';
import { formatMillisecondsToMinSec } from '../utils';
import { processAllOriginsResponse, wrapUrl } from '../utils/url-prefixer';

export const ITUNES_PODCAST_DETAIL_QUERY = 'ITUNES_PODCAST_DETAIL_QUERY';

export function useItunesPodcastDetail(id?: string) {
  return useQuery<ITunesPodcastDetailQueryExtended>({
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
          releaseDateLocaleString: new Date(
            result.releaseDate
          ).toLocaleDateString(),
          trackTimeMinsSegs: formatMillisecondsToMinSec(result.trackTimeMillis),
        })),
      };
    },
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnWindowFocus: false,
  });
}

export default useItunesPodcastDetail;
