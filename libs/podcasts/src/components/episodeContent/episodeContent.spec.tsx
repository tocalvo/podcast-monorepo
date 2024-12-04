import { render, screen } from '@testing-library/react';
import EpisodeContent from './episodeContent';
import { podcastDetailMock } from '../../__mocks__/podcastDetail.mock';

describe('EpisodeContent', () => {
  it('should render the episode title', () => {
    render(<EpisodeContent episode={podcastDetailMock.results[1]} />);

    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(
      'Episode 778 | "Bottom Of The 9th"'
    );
  });

  it('should render the audio', () => {
    const { container } = render(
      <EpisodeContent episode={podcastDetailMock.results[1]} />
    );
    const audio = container.querySelector('audio');
    expect(audio?.querySelector('source')?.getAttribute('src')).toBe(
      'https://verifi.podscribe.com/rss/p/traffic.libsyn.com/secure/jbpod/Joe_Budden_Podcast_778.mp3?dest-id=2422538'
    );
  });
});
