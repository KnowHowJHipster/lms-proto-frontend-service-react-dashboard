import { Translate, translate } from 'react-jhipster';
import MenuItem from './menu-item';
import { NavDropdown } from './menu-components';

const accountMenuItemsAuthenticated = () => (
  <>
    <MenuItem data-cy="settings" icon="wrench" to="/account/settings">
      <Translate contentKey="global.menu.account.settings">Settings</Translate>
    </MenuItem>
    <MenuItem data-cy="passwordItem" icon="lock" to="/account/password">
      <Translate contentKey="global.menu.account.password">Password</Translate>
    </MenuItem>
    <MenuItem data-cy="logout" icon="sign-out-alt" to="/logout">
      <Translate contentKey="global.menu.account.logout">Sign out</Translate>
    </MenuItem>
  </>
);

const accountMenuItems = () => (
  <>
    <MenuItem data-cy="login" icon="sign-in-alt" id="login-item" to="/login">
      <Translate contentKey="global.menu.account.login">Sign in</Translate>
    </MenuItem>
    <MenuItem data-cy="register" icon="user-plus" to="/account/register">
      <Translate contentKey="global.menu.account.register">Register</Translate>
    </MenuItem>
  </>
);

export const AccountMenu = ({ isAuthenticated = false }) => (
  <NavDropdown
    data-cy="accountMenu"
    icon="user"
    id="account-menu"
    name={translate('global.menu.account.main')}
  >
    {isAuthenticated ? accountMenuItemsAuthenticated() : null}
    {!isAuthenticated ? accountMenuItems() : null}
  </NavDropdown>
);

export default AccountMenu;
