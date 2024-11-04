import 'react-toastify/dist/ReactToastify.css';
import './app.scss';
import '../../config/dayjs';

import { useEffect } from 'react';
import { Card } from 'reactstrap';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { useAppDispatch, useAppSelector } from './config/store';
import { getSession } from './shared/reducers/authentication';
import { getProfile } from './shared/reducers/application-profile';
import Header from './shared/layout/header/header';
import Footer from './shared/layout/footer/footer';
import { hasAnyAuthority } from './shared/auth/private-route';
import ErrorBoundary from './shared/error/error-boundary';
import { AUTHORITIES } from './config/constants';
import AppRoutes from './routes';

const baseHref = document
  .querySelector('base')
  .getAttribute('href')
  .replace(/\/$/, '');

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSession());
    dispatch(getProfile());
  }, []);

  const currentLocale = useAppSelector((state) => state.locale.currentLocale);
  const isAuthenticated = useAppSelector(
    (state) => state.authentication.isAuthenticated
  );
  const isAdmin = useAppSelector((state) =>
    hasAnyAuthority(state.authentication.account.authorities, [
      AUTHORITIES.ADMIN,
    ])
  );
  const isInProduction = useAppSelector(
    (state) => state.applicationProfile.inProduction
  );

  const paddingTop = '60px';
  return (
    <BrowserRouter basename={baseHref}>
      <div className="app-container" style={{ paddingTop }}>
        <ToastContainer
          className="toastify-container"
          position="top-left"
          toastClassName="toastify-toast"
        />
        <ErrorBoundary>
          <Header
            currentLocale={currentLocale}
            isAdmin={isAdmin}
            isAuthenticated={isAuthenticated}
            isInProduction={isInProduction}
          />
        </ErrorBoundary>
        <div className="container-fluid view-container" id="app-view-container">
          <Card className="jh-card">
            <ErrorBoundary>
              <AppRoutes />
            </ErrorBoundary>
          </Card>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
