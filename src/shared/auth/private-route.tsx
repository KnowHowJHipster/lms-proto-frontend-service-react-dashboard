import React from 'react';
import { useLocation, Navigate, PathRouteProps } from 'react-router-dom';
import { Translate } from 'react-jhipster';

import { useAppSelector } from '../../config/store';
import ErrorBoundary from '../error/error-boundary';

interface IOwnProps extends PathRouteProps {
  hasAnyAuthorities?: string[];
  children: React.ReactNode;
}

export const PrivateRoute = ({
  children,
  hasAnyAuthorities = [],
  ...rest
}: IOwnProps) => {
  const isAuthenticated = useAppSelector(
    (state: { authentication: { isAuthenticated: any } }) =>
      state.authentication.isAuthenticated
  );
  const sessionHasBeenFetched = useAppSelector(
    (state: { authentication: { sessionHasBeenFetched: any } }) =>
      state.authentication.sessionHasBeenFetched
  );
  const account = useAppSelector(
    (state: { authentication: { account: any } }) =>
      state.authentication.account
  );
  const isAuthorized = hasAnyAuthority(account.authorities, hasAnyAuthorities);
  const pageLocation = useLocation();

  if (!children) {
    throw new Error(
      `A component needs to be specified for private route for path ${(rest as any).path}`
    );
  }

  if (!sessionHasBeenFetched) {
    return <div />;
  }

  if (isAuthenticated) {
    if (isAuthorized) {
      return <ErrorBoundary>{children}</ErrorBoundary>;
    }

    return (
      <div className="insufficient-authority">
        <div className="alert alert-danger">
          <Translate contentKey="error.http.403">
            You are not authorized to access this page.
          </Translate>
        </div>
      </div>
    );
  }

  return (
    <Navigate
      replace
      state={{ from: pageLocation }}
      to={{
        pathname: '/login',
        search: pageLocation.search,
      }}
    />
  );
};

export const hasAnyAuthority = (
  authorities: any,
  hasAnyAuthorities: string[]
) => {
  if (authorities && authorities.length !== 0) {
    if (hasAnyAuthorities.length === 0) {
      return true;
    }
    return hasAnyAuthorities.some((auth) => authorities.includes(auth));
  }
  return false;
};

/**
 * Checks authentication before showing the children and redirects to the
 * login page if the user is not authenticated.
 * If hasAnyAuthorities is provided the authorization status is also
 * checked and an error message is shown if the user is not authorized.
 */
export default PrivateRoute;
