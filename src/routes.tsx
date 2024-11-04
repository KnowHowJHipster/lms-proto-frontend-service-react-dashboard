import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import Login from './modules/login/login';
import Register from './modules/account/register/register';
import Activate from './modules/account/activate/activate';
import PasswordResetInit from './modules/account/password-reset/init/password-reset-init';
import PasswordResetFinish from './modules/account/password-reset/finish/password-reset-finish';
import Logout from './modules/login/logout';
import Home from './modules/home/home';
import PrivateRoute from './shared/auth/private-route';
import ErrorBoundaryRoutes from './shared/error/error-boundary-routes';
import PageNotFound from './shared/error/page-not-found';
import { AUTHORITIES } from './config/constants';

const loading = <div>loading ...</div>;

const Account = Loadable({
  loader: () => import('./modules/account'),
  loading: () => loading,
});

const Admin = Loadable({
  loader: () => import('./modules/administration'),
  loading: () => loading,
});
const AppRoutes = () => {
  return (
    <div className="view-routes">
      <ErrorBoundaryRoutes>
        <Route element={<Home />} index />
        <Route element={<Login />} path="login" />
        <Route element={<Logout />} path="logout" />
        <Route path="account">
          <Route
            element={
              <PrivateRoute
                hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}
              >
                <Account />
              </PrivateRoute>
            }
            path="*"
          />
          <Route element={<Register />} path="register" />
          <Route element={<Activate />} path="activate" />
          <Route path="reset">
            <Route element={<PasswordResetInit />} path="request" />
            <Route element={<PasswordResetFinish />} path="finish" />
          </Route>
        </Route>
        <Route
          element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN]}>
              <Admin />
            </PrivateRoute>
          }
          path="admin/*"
        />
        <Route element={<PageNotFound />} path="*" />
      </ErrorBoundaryRoutes>
    </div>
  );
};

export default AppRoutes;
