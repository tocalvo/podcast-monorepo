import { render, screen, within } from '@testing-library/react';

import { PodcastDetail } from './podcastDetail';
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
    })),
  };
});

describe('PodcastDetail', () => {
  it('should render successfully', () => {
    const { baseElement, container } = render(
      <BrowserRouter>
        <PodcastDetail />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('should render the podcasts bar', () => {
    render(
      <BrowserRouter>
        <PodcastDetail />
      </BrowserRouter>
    );

    expect(screen.queryByTestId('podcasts_bar')).toBeTruthy();
  });

  it('should render the episodes from the mock', () => {
    render(
      <BrowserRouter>
        <PodcastDetail />
      </BrowserRouter>
    );
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(podcastDetailMock.results.length);
    // check titles
    const { getAllByRole } = within(rows[0]);
    const cells = getAllByRole('columnheader');

    expect(cells.length).toBe(3);
    expect(cells[0].textContent).toBe('Title');
    expect(cells[1].textContent).toBe('Date');
    expect(cells[2].textContent).toBe('Duration');

    // check content
    const { getAllByRole: getAllByRole2 } = within(rows[1]);
    const contentCells = getAllByRole2('cell');

    expect(contentCells.length).toBe(3);
    expect(contentCells[0].querySelector('a')?.getAttribute('href')).toBe(
      '/podcast/1535809341/episode/1000677977070'
    );
    expect(contentCells[0].textContent).toBe(
      'Episode 778 | "Bottom Of The 9th"'
    );
    expect(contentCells[1].textContent).toBe('08/07/1987');
    expect(contentCells[2].textContent).toBe('12:00');
  });
});
