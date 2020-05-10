import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const AppNavbar = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <>
      <Navbar color="dark" dark>
        <NavbarBrand href="/" className="mr-auto">
          Covid-19 India
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <React.StrictMode>
              <NavItem>
                <NavLink href="https://github.com/ezra-moses/covid-19-india">
                  GitHub
                </NavLink>
              </NavItem>
            </React.StrictMode>
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
};

export default AppNavbar;
