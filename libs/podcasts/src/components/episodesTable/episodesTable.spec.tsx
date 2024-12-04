import { BrowserRouter } from 'react-router';
import EpisodesTable from './episodesTable';
import { render, screen, within } from '@testing-library/react';
import { podcastDetailMock } from '../../__mocks__/podcastDetail.mock';
import { ITunesPodcastKind } from '../../models';

describe('Episodes table', () => {
  it('should render the episodes with the three specific columns', () => {
    render(
      <BrowserRouter>
        <EpisodesTable
          podcastId="1535809341"
          episodes={podcastDetailMock.results.filter(
            (podcast) => podcast.kind === ITunesPodcastKind['podcast-episode']
          )}
        />
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
