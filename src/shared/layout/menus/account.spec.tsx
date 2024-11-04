import { render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { AccountMenu } from './account';

describe('AccountMenu', () => {
  let mountedWrapper:
    | string
    | RenderResult<
        typeof import('@testing-library/dom/types/queries'),
        HTMLElement,
        HTMLElement
      >
    | undefined;

  const authenticatedWrapper = () => {
    if (!mountedWrapper) {
      const { container } = render(
        <MemoryRouter>
          <AccountMenu isAuthenticated />
        </MemoryRouter>
      );
      mountedWrapper = container.innerHTML;
    }
    return mountedWrapper;
  };
  const guestWrapper = () => {
    if (!mountedWrapper) {
      const { container } = (mountedWrapper = render(
        <MemoryRouter>
          <AccountMenu />
        </MemoryRouter>
      ));
      mountedWrapper = container.innerHTML;
    }
    return mountedWrapper;
  };

  beforeEach(() => {
    mountedWrapper = undefined;
  });

  // All tests will go here

  it('Renders a authenticated AccountMenu component', () => {
    const html = authenticatedWrapper();

    expect(html).not.contain('/login');
    expect(html).contain('/logout');
  });

  it('Renders a guest AccountMenu component', () => {
    const html = guestWrapper();

    expect(html).contain('/login');
    expect(html).not.contain('/logout');
  });
});
