import { render, screen } from '@testing-library/react';

import { PodcastCard } from './podcastCard';
import { podcastMock } from '../../__mocks__/podcast.mock';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router';

describe('PodcastCard', () => {
  it('should render successfully', () => {
    const queryClient = new QueryClient();
    const { baseElement } = render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <PodcastCard podcast={podcastMock} />
        </QueryClientProvider>
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render the content', () => {
    const queryClient = new QueryClient();
    const { container } = render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <PodcastCard podcast={podcastMock} />
        </QueryClientProvider>
      </BrowserRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it('should have a link', () => {
    const queryClient = new QueryClient();
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <PodcastCard podcast={podcastMock} />
        </QueryClientProvider>
      </BrowserRouter>
    );
    const link = screen.getByRole('link', {
      name: 'Ir al detalle del podcast',
    });
    expect(link.getAttribute('href')).toBe('/podcast/1535809341');
  });
});
