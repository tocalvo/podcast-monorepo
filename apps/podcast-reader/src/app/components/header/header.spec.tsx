import { render } from '@testing-library/react';

import Header from './header';
import { BrowserRouter } from 'react-router';

describe('Header', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should contain the title to home', () => {
    const { getByRole } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const link = getByRole('link', { name: 'Página de inicio' });

    expect(link.textContent).toBe('Podcaster');
    expect(link.getAttribute('href')).toBe('/');
  });
});
