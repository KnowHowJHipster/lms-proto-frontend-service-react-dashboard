import React from 'react';
import { Translate } from 'react-jhipster';

import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JSX } from 'react/jsx-runtime';

export const BrandIcon = (
  props: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLDivElement> &
    React.HTMLAttributes<HTMLDivElement>
) => <div {...props} className="brand-icon" />;

export const Brand = () => (
  <NavbarBrand className="brand-logo" tag={Link} to="/">
    <BrandIcon />
    <span className="brand-title">
      <Translate contentKey="global.title">Dashboard</Translate>
    </span>
    <span className="navbar-version">
      {VERSION.toLowerCase().startsWith('v') ? VERSION : `v${VERSION}`}
    </span>
  </NavbarBrand>
);

export const Home = () => (
  <NavItem>
    <NavLink className="d-flex align-items-center" tag={Link} to="/">
      <FontAwesomeIcon icon="home" />
      <span>
        <Translate contentKey="global.menu.home">Home</Translate>
      </span>
    </NavLink>
  </NavItem>
);
