import { render } from '@testing-library/react';

import { PodcastBar } from './podcastBar';
import { podcastMock } from '../../__mocks__/podcast.mock';
import { BrowserRouter } from 'react-router';

describe('podcastBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <PodcastBar podcast={podcastMock} />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
