import { render } from '@testing-library/react';

import Podcasts from './podcasts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('Podcasts', () => {
  it('should render successfully', () => {
    const queryClient = new QueryClient();
    const { baseElement } = render(
      <QueryClientProvider client={queryClient}>
        <Podcasts />
      </QueryClientProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
