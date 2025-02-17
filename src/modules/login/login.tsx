import { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../config/store';
import { login } from '../../shared/reducers/authentication';
import LoginModal from './login-modal';

export const Login = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(
    (state) => state.authentication.isAuthenticated
  );
  const loginError = useAppSelector((state) => state.authentication.loginError);
  const showModalLogin = useAppSelector(
    (state) => state.authentication.showModalLogin
  );
  const [showModal, setShowModal] = useState(showModalLogin);
  const navigate = useNavigate();
  const pageLocation = useLocation();

  useEffect(() => {
    setShowModal(true);
  }, []);

  const handleLogin = (username, password, rememberMe = false) =>
    dispatch(login(username, password, rememberMe));

  const handleClose = () => {
    setShowModal(false);
    navigate('/');
  };

  const { from } = pageLocation.state || {
    from: { pathname: '/', search: pageLocation.search },
  };
  if (isAuthenticated) {
    return <Navigate replace to={from} />;
  }
  return (
    <LoginModal
      handleClose={handleClose}
      handleLogin={handleLogin}
      loginError={loginError}
      showModal={showModal}
    />
  );
};

export default Login;
