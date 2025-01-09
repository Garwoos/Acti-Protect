import React from 'react';
import {Link} from 'react-router-dom';
import './accueil.css'; // Pour le style
import { motion } from 'framer-motion';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Accueil = () => {
  return (
    <div className="accueil-main">
      <div className="accueil-navbar">
        <Navbar expand="lg" className="custom-navbar">
          <Container className='navbar-container'>
            <Navbar.Brand href="/accueil">StartAlarm</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/accueil">Accueil</Nav.Link>
                <Nav.Link href="#link">Parrainer</Nav.Link>
                <NavDropdown title="Configurateur" id="basic-nav-dropdown"  className='custom-dropdown'>
                  <NavDropdown.Item href="#action/3.1">Dessiner Mes Plans</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Consulter Mes Plans</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/login">Se Connecter</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div className="accueil-container">
      {/* Le MENU de navigation */}
        <section className="accueil-content">
          <header className="accueil-header">
            <h1 className='animated-text'>StartAlarm</h1>
            <h2 className='animated-subtext'>Le premier configurateur en ligne</h2>
          </header>
          <div className="accueil-features">
            <motion.button className="btn-conf" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }}>
              <Link to="/configurateur" className="btn-link">Tester le configurateur</Link>
            </motion.button>
          </div>
        </section>
      </div>
      <footer className="accueil-footer">
        <p>&copy; 2025 StartAlarm. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default Accueil;
