import { useState } from 'react'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import NavLink from '../Components/NavLink';
import NavButton from '../Components/NavButton';
import AuthButton from '../Components/AuthButton';

function Header() {
  return (<header className="position-fixed top-0 start-0">
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary navbar-fixed-top">
      <Container fluid>
        <Navbar.Brand className="justify-left"><h1>CraftShoppe</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <div className="me-auto"></div>
          <Nav>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/products">Products</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <AuthButton/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>);
}

export default Header;
