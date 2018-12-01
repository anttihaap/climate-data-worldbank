import React from "react";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";

const Header = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">CO2 Emissions</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <IndexLinkContainer to="/">
        <NavItem eventKey={1}>Compare countries</NavItem>
      </IndexLinkContainer>
      <IndexLinkContainer to="/compare-years">
        <NavItem eventKey={2}>Compare by year</NavItem>
      </IndexLinkContainer>
    </Nav>
  </Navbar>
);

export default Header;
