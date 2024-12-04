import { fireEvent, render, screen } from '@testing-library/react';

import Podcasts from './podcastsPage';
import { BrowserRouter } from 'react-router';
import { podcastListMock } from '@org/podcasts';

vi.mock('@org/podcasts', async () => ({
  ...(await vi.importActual('@org/podcasts')),
  useItunesPodcasts: vi.fn(() => ({
    podcasts: podcastListMock.feed.entry,
    getPodcastResumeById: vi
      .fn()
      .mockReturnValue(podcastListMock.feed.entry[0]),
  })),
}));

describe('Podcasts', () => {
  it('should render successfully', () => {
    const { baseElement, container } = render(
      <BrowserRouter>
        <Podcasts />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('should render one card by podcast', () => {
    render(
      <BrowserRouter>
        <Podcasts />
      </BrowserRouter>
    );
    const cards = screen.getAllByTestId('podcast-card'); // Asegúrate de agregar el data-testid="podcast-card" en PodcastCard
    expect(cards).toHaveLength(2);
  });

  it('should filter the cards using their input', () => {
    render(
      <BrowserRouter>
        <Podcasts />
      </BrowserRouter>
    );
    const initCards = screen.getAllByTestId('podcast-card'); // Asegúrate de agregar el data-testid="podcast-card" en PodcastCard
    expect(initCards).toHaveLength(2);
    fireEvent.change(screen.getByPlaceholderText('Filter podcasts...'), {
      target: { value: 'Joe Budden' },
    });
    const filteredCards = screen.getAllByTestId('podcast-card');
    expect(filteredCards).toHaveLength(1);

    expect(screen.queryByText('The Joe Budden Podcast')).toBeTruthy();
    expect(screen.queryByText('New Rory')).toBeNull();
  });

  it('should show the podcast number', () => {
    render(
      <BrowserRouter>
        <Podcasts />
      </BrowserRouter>
    );
    expect(screen.getByTestId('num-podcasts').textContent).toBe('2');
    fireEvent.change(screen.getByPlaceholderText('Filter podcasts...'), {
      target: { value: 'Joe Budden' },
    });
    expect(screen.getByTestId('num-podcasts').textContent).toBe('1');
  });
});
