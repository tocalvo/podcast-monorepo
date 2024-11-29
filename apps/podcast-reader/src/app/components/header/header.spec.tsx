import { act, screen, render } from '@testing-library/react';

import Header from './header';
import { BrowserRouter } from 'react-router';
import { useIsFetching } from '@tanstack/react-query';
import { Mock } from 'vitest';

vi.mock('@tanstack/react-query', () => ({
  useIsFetching: vi.fn(() => false),
}));

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

  it('should show the spinner if is fetching', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.queryByTestId('loader')).toBeFalsy();

    act(() => {
      (useIsFetching as Mock).mockReturnValue(true);
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );
    });
    expect(screen.queryByTestId('loader')).toBeTruthy();
  });
});
