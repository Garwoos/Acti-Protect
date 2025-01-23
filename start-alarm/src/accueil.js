import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './accueil.css';
import NavBar from './navBar';
import Carrousel from './carrousel';

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
        <NavBar />
      </div>
      <div className="accueil-container1">
      {/* Le MENU de navigation */}
        <section className="accueil-content">
          <header className="accueil-header">
            <h1 className='animated-text'>Start-Alarm</h1>
            <h2 className='animated-subtext'>Le premier configurateur en ligne</h2>
          </header>
          <div className="accueil-features">
            <Link to="/simulateur-specs" className="btn-link"><motion.button className="btn-conf" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }}>
              Tester le configurateur
            </motion.button></Link>
          </div>
        </section>
        <div className="accueil-carousel">
          <Carrousel />
        </div>
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
            <img src="https://placehold.co/400" alt="À propos de StartAlarm" />
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
              <img src="https://placehold.co/400" alt="À propos de StartAlarm" />
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
