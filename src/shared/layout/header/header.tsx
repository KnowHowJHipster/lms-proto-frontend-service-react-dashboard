import './header.scss';

import { useState } from 'react';
import { Translate, Storage } from 'react-jhipster';
import { Navbar, Nav, NavbarToggler, Collapse } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';

import { Home, Brand } from './header-components';
import { AdminMenu, AccountMenu, LocaleMenu } from '../menus';
import { useAppDispatch } from '../../../config/store';
import { setLocale } from '../../reducers/locale';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isInProduction: boolean;
  currentLocale: string;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useAppDispatch();

  const handleLocaleChange = (event) => {
    const langKey = event.target.value;
    Storage.session.set('locale', langKey);
    dispatch(setLocale(langKey));
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div id="app-header">
      <LoadingBar className="loading-bar" />
      <Navbar
        className="jh-navbar"
        dark
        data-cy="navbar"
        expand="md"
        fixed="top"
      >
        <NavbarToggler aria-label="Menu" onClick={toggleMenu} />
        <Brand />
        <Collapse isOpen={menuOpen} navbar>
          <Nav className="ms-auto" id="header-tabs" navbar>
            <Home />
            {props.isAuthenticated && props.isAdmin ? <AdminMenu /> : null}
            <LocaleMenu
              currentLocale={props.currentLocale}
              onClick={handleLocaleChange}
            />
            <AccountMenu isAuthenticated={props.isAuthenticated} />
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
