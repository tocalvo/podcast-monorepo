import { render, screen } from '@testing-library/react';

import { EpisodeDetail } from './episodeDetail';
import { podcastListMock } from '../../__mocks__/podcast.mock';
import { podcastDetailMock } from '../../__mocks__/podcastDetail.mock';
import { BrowserRouter } from 'react-router';
import { ITunesPodcastKind } from '../../models';

vi.mock('../../hooks', () => ({
  useItunesPodcasts: vi.fn(() => ({
    podcasts: podcastListMock.feed.entry,
    getPodcastResumeById: vi
      .fn()
      .mockReturnValue(podcastListMock.feed.entry[0]),
  })),
  useItunesPodcastDetail: vi.fn(() => ({
    podcastDetail: podcastDetailMock,
    episodes: podcastDetailMock.results.filter(
      (podcast) => podcast.kind === ITunesPodcastKind['podcast-episode']
    ),
    findEpisodeById: vi.fn().mockReturnValue(podcastDetailMock.results[1]),
  })),
}));

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useParams: vi.fn(() => ({
      podcastId: podcastListMock.feed.entry[0].id.attributes['im:id'],
      episodeId: podcastDetailMock.results[1].trackId,
    })),
  };
});

describe('EpisodeDetail', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should render successfully', () => {
    const { baseElement, container } = render(
      <BrowserRouter>
        <EpisodeDetail />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('should render the podcasts bar', () => {
    render(
      <BrowserRouter>
        <EpisodeDetail />
      </BrowserRouter>
    );

    expect(screen.queryByTestId('podcasts_bar')).toBeTruthy();
  });

  it('should render the episode title', () => {
    render(
      <BrowserRouter>
        <EpisodeDetail />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(
      'Episode 778 | "Bottom Of The 9th"'
    );
  });

  it('should render the audio', () => {
    const { container } = render(
      <BrowserRouter>
        <EpisodeDetail />
      </BrowserRouter>
    );
    const audio = container.querySelector('audio');
    expect(audio?.querySelector('source')?.getAttribute('src')).toBe(
      'https://verifi.podscribe.com/rss/p/traffic.libsyn.com/secure/jbpod/Joe_Budden_Podcast_778.mp3?dest-id=2422538'
    );
  });
});
