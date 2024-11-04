import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from '../../shared/error/error-boundary-routes';

import Settings from './settings/settings';
import Password from './password/password';

const AccountRoutes = () => (
  <div>
    <ErrorBoundaryRoutes>
      <Route element={<Settings />} path="settings" />
      <Route element={<Password />} path="password" />
    </ErrorBoundaryRoutes>
  </div>
);

export default AccountRoutes;
