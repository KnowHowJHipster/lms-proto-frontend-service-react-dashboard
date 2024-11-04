import { Route } from 'react-router-dom';
import ErrorBoundaryRoutes from '../../shared/error/error-boundary-routes';
import UserManagement from './user-management';
import Logs from './logs/logs';
import Health from './health/health';
import Metrics from './metrics/metrics';
import Configuration from './configuration/configuration';

const AdministrationRoutes = () => (
  <div>
    <ErrorBoundaryRoutes>
      <Route element={<UserManagement />} path="user-management/*" />
      <Route element={<Health />} path="health" />
      <Route element={<Metrics />} path="metrics" />
      <Route element={<Configuration />} path="configuration" />
      <Route element={<Logs />} path="logs" />
    </ErrorBoundaryRoutes>
  </div>
);

export default AdministrationRoutes;
