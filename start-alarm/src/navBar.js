import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import './navBar.css';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Navbar
      expand="lg"
      className={`custom-navbar ${isScrolled ? 'navbar-transparent' : ''}`}
    >
      <Container className="navbar-container">
        <Navbar.Brand href="/accueil"><img style={{ width:'5rem' }} src='/images/LOGO-START-ALARM-Q.png'/></Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/accueil">Accueil</Nav.Link>
          <Nav.Link href="/parrainage">Parrainer</Nav.Link>
          <NavDropdown
            title="Configurateur"
            id="basic-nav-dropdown"
            className="custom-dropdown"
          >
            <NavDropdown.Item href="/simulateur-specs">
              Dessiner Mes Plans
            </NavDropdown.Item>
            <NavDropdown.Item className="a-circle" href="/simulateur">
              Consulter Mes Plans
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/login">Se Connecter</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;