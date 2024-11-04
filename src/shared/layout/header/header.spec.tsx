import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import initStore from '../../../config/store';
import Header from './header';

describe('Header', () => {
  let mountedWrapper: string | undefined;
  const devProps = {
    isAuthenticated: true,
    isAdmin: true,
    currentLocale: 'en',
    isInProduction: false,
  };
  const prodProps = {
    ...devProps,
    isInProduction: true,
  };
  const userProps = {
    ...prodProps,
    isAdmin: false,
  };
  const guestProps = {
    ...prodProps,
    isAdmin: false,
    isAuthenticated: false,
  };

  const wrapper = (props = devProps) => {
    if (!mountedWrapper) {
      const store = initStore();
      const { container } = render(
        <Provider store={store}>
          <MemoryRouter>
            <Header {...props} />
          </MemoryRouter>
        </Provider>
      );
      mountedWrapper = container.innerHTML;
    }
    return mountedWrapper;
  };

  beforeEach(() => {
    mountedWrapper = undefined;
  });

  // All tests will go here
  it('Renders a Header component in dev profile with LoadingBar, Navbar.', () => {
    const html = wrapper();

    // Find Navbar component
    expect(html).contain('navbar');
    // Find AdminMenu component
    expect(html).contain('admin-menu');
    // Find AccountMenu component
    expect(html).contain('account-menu');
  });

  it('Renders a Header component in prod profile with LoadingBar, Navbar, Nav.', () => {
    const html = wrapper(prodProps);

    // Find Navbar component
    expect(html).contain('navbar');
    // Find AdminMenu component
    expect(html).contain('admin-menu');
    // Find AccountMenu component
    expect(html).contain('account-menu');
  });

  it('Renders a Header component in prod profile with logged in User', () => {
    const html = wrapper(userProps);

    // Find Navbar component
    expect(html).contain('navbar');
    // Not find AdminMenu component
    expect(html).not.contain('admin-menu');
    // Find AccountMenu component
    expect(html).contain('account-menu');
  });

  it('Renders a Header component in prod profile with no logged in User', () => {
    const html = wrapper(guestProps);

    // Find Navbar component
    expect(html).contain('navbar');
    // Not find AdminMenu component
    expect(html).not.contain('admin-menu');
    // Find AccountMenu component
    expect(html).contain('account-menu');
  });
});
