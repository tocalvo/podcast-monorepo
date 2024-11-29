import { useQuery } from '@tanstack/react-query';
import { ITunesPodcasts } from '../models';

export const ITUNES_PODCASTS_QUERY = 'ITUNES_PODCASTS_QUERY';

export function useItunesPodcasts() {
  return useQuery<ITunesPodcasts>({
    queryKey: [ITUNES_PODCASTS_QUERY],
    queryFn: () =>
      fetch(
        'https://api.allorigins.win/get?url=' +
          encodeURIComponent(
            'https://itunes.apple.com/us/rss/toppodcasts/limite=100/genre=1310/json'
          )
      ).then((res) => {
        return res.json().then((allOriginsResponse: { contents: string }) => {
          return JSON.parse(allOriginsResponse.contents);
        });
      }),
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnWindowFocus: false,
  });
}
