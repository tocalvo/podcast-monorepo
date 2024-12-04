import {
  ITunesPodcastKind,
  podcastDetailMock,
  podcastListMock,
} from '@org/podcasts';
import { render, screen } from '@testing-library/react';
import { EpisodeDetailPage } from './episodeDetailPage';

import { BrowserRouter } from 'react-router';

vi.mock('@org/podcasts', async () => ({
  ...(await vi.importActual('@org/podcasts')),
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
        <EpisodeDetailPage />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('should render the podcasts bar', () => {
    render(
      <BrowserRouter>
        <EpisodeDetailPage />
      </BrowserRouter>
    );

    expect(screen.queryByTestId('podcasts_bar')).toBeTruthy();
  });
  it('should render the episode content', () => {
    render(
      <BrowserRouter>
        <EpisodeDetailPage />
      </BrowserRouter>
    );

    expect(screen.queryByTestId('episode_content')).toBeTruthy();
  });
});
