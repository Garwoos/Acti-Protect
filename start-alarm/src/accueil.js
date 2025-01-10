import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './accueil.css';

const Accueil = () => {
  const { ref: container2Ref, inView } = useInView({ triggerOnce: true });
  const controls = useAnimation();

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);
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
      <div className="accueil-container1">
      {/* Le MENU de navigation */}
        <section className="accueil-content">
          <header className="accueil-header">
            <h1 className='animated-text'>StartAlarm</h1>
            <h2 className='animated-subtext'>Le premier configurateur en ligne</h2>
          </header>
          <div className="accueil-features">
            <motion.button className="btn-conf" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }}>
              <Link to="/simulateur" className="btn-link">Tester le configurateur</Link>
            </motion.button>
          </div>
        </section>
      </div>
      <section className="accueil-container2-bg">
        <motion.div className="accueil-container2"
          ref={container2Ref}
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 1, delay: 0.25 }}>
          <div className="accueil-about">
            <h2 >À propos de StartAlarm</h2>
            <p>
              StartAlarm est un configurateur en ligne qui vous permet de dessiner vos plans de maison 
              et de les équiper d'un système d'alarme. Vous pouvez ensuite consulter vos plans et les partager 
              avec vos proches.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
              ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
              laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className="accueil-about-img">
            <img src="https://via.placeholder.com/300" alt="À propos de StartAlarm" />
          </div>
        </motion.div>
      </section>
      
      <section className="accueil-container3-bg">
        <motion.div className="accueil-container3"
          ref={container2Ref}
          variants={{
            hidden: { opacity: 0, y: 0 },
            visible: { opacity: 1, y: 100 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 1, delay: 0.5 }}>
          <div className="accueil-about-img2">
              <img src="https://via.placeholder.com/300" alt="À propos de StartAlarm" />
          </div>
          <div className="accueil-about2">
            <h2 >À propos de StartAlarm</h2>
            <p>
              StartAlarm est un configurateur en ligne qui vous permet de dessiner vos plans de maison 
              et de les équiper d'un système d'alarme. Vous pouvez ensuite consulter vos plans et les partager 
              avec vos proches.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
              ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
              laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </motion.div>
      </section>

      <footer className="accueil-footer">
        <p>&copy; 2025 StartAlarm. Tout droits réservés.</p>
      </footer>
    </div>
  );
};

export default Accueil;
