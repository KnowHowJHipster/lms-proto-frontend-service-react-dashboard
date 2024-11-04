import React from 'react';

import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const NavDropdown = (props) => (
  <UncontrolledDropdown data-cy={props['data-cy']} id={props.id} inNavbar nav>
    <DropdownToggle caret className="d-flex align-items-center" nav>
      <FontAwesomeIcon icon={props.icon} />
      <span>{props.name}</span>
    </DropdownToggle>
    <DropdownMenu end style={props.style}>
      {props.children}
    </DropdownMenu>
  </UncontrolledDropdown>
);
