import { useQuery } from '@tanstack/react-query';
import { ITunesPodcasts } from '../models';

import { processAllOriginsResponse, wrapUrl } from '../utils/url-prefixer';

export const ITUNES_PODCASTS_QUERY = 'ITUNES_PODCASTS_QUERY';

export function useItunesPodcasts() {
  return useQuery<ITunesPodcasts>({
    queryKey: [ITUNES_PODCASTS_QUERY],
    queryFn: async () => {
      const res = await fetch(
        wrapUrl(
          'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
        )
      );
      return processAllOriginsResponse(res);
    },
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnWindowFocus: false,
  });
}
