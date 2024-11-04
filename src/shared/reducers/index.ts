import { ReducersMapObject } from '@reduxjs/toolkit';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

// eslint-disable-next-line import/no-cycle
import administration from '../../modules/administration/administration.reducer';
import userManagement from '../../modules/administration/user-management/user-management.reducer';
import register from '../../modules/account/register/register.reducer';
import activate from '../../modules/account/activate/activate.reducer';
import password from '../../modules/account/password/password.reducer';
import settings from '../../modules/account/settings/settings.reducer';
import passwordReset from '../../modules/account/password-reset/password-reset.reducer';
import applicationProfile from './application-profile';
import authentication from './authentication';
import locale from './locale';

const rootReducer: ReducersMapObject = {
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  loadingBar,
};

export default rootReducer;
