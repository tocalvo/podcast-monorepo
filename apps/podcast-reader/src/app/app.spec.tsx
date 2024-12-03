import { render } from '@testing-library/react';

import App from './app';
import { BrowserRouter } from 'react-router';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
