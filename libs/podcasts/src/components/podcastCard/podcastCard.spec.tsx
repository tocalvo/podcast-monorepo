import { render, screen } from '@testing-library/react';

import { PodcastCard } from './podcastCard';
import { podcastMock } from '../../__mocks__/podcast.mock';
import { BrowserRouter } from 'react-router';

describe('PodcastCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <PodcastCard podcast={podcastMock} />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render the content', () => {
    const { container } = render(
      <BrowserRouter>
        <PodcastCard podcast={podcastMock} />
      </BrowserRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it('should have a link', () => {
    render(
      <BrowserRouter>
        <PodcastCard podcast={podcastMock} />
      </BrowserRouter>
    );
    const link = screen.getByRole('link', {
      name: 'Ir al detalle del podcast',
    });
    expect(link.getAttribute('href')).toBe('/podcast/1535809341');
  });
});
