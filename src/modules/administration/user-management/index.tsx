import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from '../../../shared/error/error-boundary-routes';
import UserManagement from './user-management';
import UserManagementDetail from './user-management-detail';
import UserManagementUpdate from './user-management-update';
import UserManagementDeleteDialog from './user-management-delete-dialog';

const UserManagementRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route element={<UserManagement />} index />
    <Route element={<UserManagementUpdate />} path="new" />
    <Route path=":login">
      <Route element={<UserManagementDetail />} index />
      <Route element={<UserManagementUpdate />} path="edit" />
      <Route element={<UserManagementDeleteDialog />} path="delete" />
    </Route>
  </ErrorBoundaryRoutes>
);

export default UserManagementRoutes;
