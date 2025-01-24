import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './accueil.css';
import NavBar from './navBar';
import Carrousel from './carrousel';

const Accueil = () => {
  const updateVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  
  window.addEventListener('resize', updateVh);
  updateVh();
  const [selectedImage, setSelectedImage] = useState(null);
  const { ref: container2Ref, inView } = useInView({ triggerOnce: true });
  const [animationKey, setAnimationKey] = useState(0);
  const handleSelectImage = (image) => {
    setSelectedImage(image);
    setAnimationKey((prevKey) => prevKey + 1); // Change la clé d'animation
  };
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

      {/* Header remplacé dynamiquement */}
      <header className="accueil-header">
        {selectedImage ? (
          <div key={animationKey} className="selected-content">
            <h2 className="animated-text">Image {selectedImage.id}</h2>
            <p className="animated-subtext">{selectedImage.specs}</p>
            <motion.button
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              onClick={() => setSelectedImage(null)}
              className="btn-retour"
            >
              Retour
            </motion.button>
          </div>
          ) : (
          <div className="default-header">
            <h1 className="animated-text">Start-Alarm</h1>
            <h2 className="animated-subtext">
              <span className='text'>Le premier configurateur<br /> & <br />simulateur d'efficacité d'alarme en ligne</span>
            </h2>
            <div className="accueil-features">
              <Link to="/simulateur-specs" className="btn-link">
                <motion.button
                  className="btn-conf"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                >
                  Tester le configurateur
                </motion.button>
              </Link>
            </div>
          </div>
        )}
        {/* Carrousel */}
        <div className="accueil-carousel">
          <Carrousel onSelectImage={handleSelectImage} />
        </div>
      </header>

      {/* Container 2 */}
      <section className="accueil-container2-bg">
        <motion.div
          className="accueil-container2"
          ref={container2Ref}
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 1, delay: 0.25 }}
          style={{margin: '0 0 0 0', padding: '0 0 0 0', overflow: 'hidden'}}
        >
          <div className="accueil-about">
            <h2>À votre disposition</h2>
            <p>
              StartAlarm est un configurateur en ligne qui vous permet de dessiner vos plans de maison
              et de les équiper d'un système d'alarme. Vous pouvez ensuite consulter vos plans et les partager
              avec vos proches.
            </p>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
              et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat.
            </p>
          </div>
          <div className="accueil-about-img">
            <img src="/images/icons/icon13.png" alt="À propos de StartAlarm" />
          </div>
        </motion.div>
      </section>

      {/* Container 3 */}
      <section className="accueil-container3-bg">
        <motion.div
          className="accueil-container3"
          ref={container2Ref}
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 1, delay: 0.5 }}
          style={{margin: '0 0 0 0', padding: '0 0 0 0', overflow: 'hidden'}}
        >
          <div className="accueil-about-img2">
            <img src="/images/icons/icon12.png" alt="Description supplémentaire" />
          </div>
          <div className="accueil-about2">
            <h2>Disponible à travers le pays</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
              et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat.
            </p>
          </div>
        </motion.div>
      </section>
      <footer className="accueil-footer">
        <p>&copy; 2025 StartAlarm. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default Accueil;