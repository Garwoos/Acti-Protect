import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './navBar.css'; // Assurez-vous de lier votre CSS

const NavBar = () => {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container className="navbar-container">
        <Navbar.Brand href="/accueil">StartAlarm</Navbar.Brand>
        <Nav className="me-auto">
        <Nav.Link href="/accueil">Accueil</Nav.Link>
        <Nav.Link href="#link">Parrainer</Nav.Link>
        <NavDropdown
            title="Configurateur"
            id="basic-nav-dropdown"
            className="custom-dropdown"
        >
            <NavDropdown.Item href="/simulateur">
            Dessiner Mes Plans
            </NavDropdown.Item>
            <NavDropdown.Item className='a-circle' href="/simulateur">
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
