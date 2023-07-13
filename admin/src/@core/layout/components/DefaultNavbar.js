import React from 'react';
import { Navbar, Nav, NavItem, SidebarTrigger } from './../../components';

import { NavbarUser } from './NavbarUser';

export function DefaultNavbar() {
  return (
    <Navbar light expand="xs" fluid>
      <Nav navbar>
        <NavItem className="mr-3">
          <SidebarTrigger />
        </NavItem>
        {/* <NavItem className="d-none d-md-block">
          <span className="navbar-text">
            <i className="fa fa-home"></i>
          </span>
          <span className="navbar-text px-2">
            <i className="fa fa-angle-right"></i>
          </span>
        </NavItem> */}
      </Nav>
      <Nav navbar className="ml-auto">
        <NavbarUser />
      </Nav>
    </Navbar>
  );
}
