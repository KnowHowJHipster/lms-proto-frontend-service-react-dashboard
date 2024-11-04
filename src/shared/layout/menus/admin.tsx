import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';
import MenuItem from './menu-item';

const adminMenuItems = () => (
  <>
    <MenuItem icon="users" to="/admin/user-management">
      <Translate contentKey="global.menu.admin.userManagement">
        User management
      </Translate>
    </MenuItem>
    <MenuItem icon="tachometer-alt" to="/admin/metrics">
      <Translate contentKey="global.menu.admin.metrics">Metrics</Translate>
    </MenuItem>
    <MenuItem icon="heart" to="/admin/health">
      <Translate contentKey="global.menu.admin.health">Health</Translate>
    </MenuItem>
    <MenuItem icon="cogs" to="/admin/configuration">
      <Translate contentKey="global.menu.admin.configuration">
        Configuration
      </Translate>
    </MenuItem>
    <MenuItem icon="tasks" to="/admin/logs">
      <Translate contentKey="global.menu.admin.logs">Logs</Translate>
    </MenuItem>
  </>
);

export const AdminMenu = () => (
  <NavDropdown
    data-cy="adminMenu"
    icon="users-cog"
    id="admin-menu"
    name={translate('global.menu.admin.main')}
  >
    {adminMenuItems()}
  </NavDropdown>
);

export default AdminMenu;
