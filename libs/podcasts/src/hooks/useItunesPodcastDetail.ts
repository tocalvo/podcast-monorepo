import { useQuery } from '@tanstack/react-query';
import {
  ITunesPodcastDetailQuery,
  ITunesPodcastDetailQueryExtended,
} from '../models';
import { formatMillisecondsToMinSec } from '../utils';

export const ITUNES_PODCAST_DETAIL_QUERY = 'ITUNES_PODCAST_DETAIL_QUERY';

export function useItunesPodcastDetail(id?: string) {
  return useQuery<ITunesPodcastDetailQueryExtended>({
    queryKey: [ITUNES_PODCAST_DETAIL_QUERY, id],
    queryFn: async () => {
      const res = await fetch(
        'https://api.allorigins.win/get?url=' +
          encodeURIComponent(
            `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limite=20`
          )
      );
      const allOriginsResponse: { contents: string } = await res.json();
      const parsed: ITunesPodcastDetailQuery = JSON.parse(
        allOriginsResponse.contents
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
