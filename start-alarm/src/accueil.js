import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './accueil.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
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
  const [carouselKey, setCarouselKey] = useState(0); // Ajoutez cette ligne pour gérer la clé du carrousel
  const [showCookiePolicy, setShowCookiePolicy] = useState(false);

  const handleSelectImage = (image) => {
    setSelectedImage(image);
    setAnimationKey((prevKey) => prevKey + 1); // Change la clé d'animation
  };

  const showHomePage = () => {
    setSelectedImage(null);
    setAnimationKey((prevKey) => prevKey + 1); // Change la clé d'animation
  };

  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  const resetCarousel = () => {
    setSelectedImage(null);
    setCarouselKey((prevKey) => prevKey + 1); // Change la clé du carrousel pour forcer le reset
  };

  return (
    <div className="accueil-main">
      <div className="accueil-navbar" style={{ zIndex: '999' }}>
        <NavBar />
      </div>

      {/* Header remplacé dynamiquement */}
      <header className="accueil-header">
        {selectedImage ? (
          <motion.div
            key={animationKey}
            className="selected-content"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="selected-content-img">
              <img src={selectedImage.src} alt={`Image ${selectedImage.id}`} />
            </div>
            <div>
              <h2 className="animated-text">Image {selectedImage.id}</h2>
              <p className="animated-subtext">{selectedImage.specs}</p>
              <motion.button
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                onClick={resetCarousel}
                className="btn-retour"
              >
                Retour
              </motion.button>
            </div>
          </motion.div>
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
          <Carrousel key={carouselKey} onSelectImage={handleSelectImage} showHomePage={showHomePage} />
        </div>
        <Popup 
          open={true}  // Ouvre le popup dès le chargement de la page
          position="center center" // Le popup est centré
          closeOnDocumentClick
          contentStyle={{backgroundColor: 'transparent', width: '30%', padding: '0', borderColor: 'transparent', zIndex: '1001'}}
        >
          <div className="popup-content" style={{width: '90%',padding: '0.5rem 1rem 2rem 1rem',
            border:'0px', textAlign: 'center', borderRadius: '12px 12px 0 0',
            backgroundColor: 'rgba(15, 23, 42, 0.93)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.9)',
            color: 'white'}}>
            <h2 style={{ fontSize: '2rem' }}>Bienvenue chez</h2>
            <img style={{ width: '50%' }} src='/images/LOGO-START-ALARM-Q.png'/><br/>
            <img style={{ width: '50%', marginTop: '1rem' }} src='https://static.vecteezy.com/system/resources/thumbnails/035/490/024/small/ai-generated-cookie-clipart-design-illustration-free-png.png'/>
            <p>Nous utilisons des Cookies qui contribuent au bon fonctionnement
               et à l'amélioration de la performance et de la sécurité de notre site.</p>
            <p>Avant de poursuivre votre visite, nous vous offrons la possibilité d'accepter ou de refuser
              ces cookies.
            </p>
            <img style={{ width: '50%'}} src='https://gallerypngs.com/wp-content/uploads/2024/08/Red-warning-text-png-image.png'/><br/>
            <a href='#' style={{ color: 'white' }} onClick={() => setShowCookiePolicy(true)}>Politique cookies</a>
          </div>
          <div className="popup-actions" style={{display: 'flex', justifyContent: 'center', marginTop: '0.1rem'}}>
            <button style={{backgroundColor: 'rgba(15, 23, 42, 0.93)', color: 'white',
               padding: '1rem', borderRadius: '0 0 0 8px', border: '0px', marginRight: '0.1rem',
                width:'48.5%', boxShadow: '0 0 10px rgba(0, 0, 0, 0.9)'}}>Accepter</button>
            <button style={{backgroundColor: 'rgba(15, 23, 42, 0.93)', color: 'white',
               padding: '1rem', borderRadius: '0 0 8px 0', border: '0px', width:'48.5%',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.9)'}}>Refuser</button>
          </div>
        </Popup>
        <Popup 
          open={showCookiePolicy}  // Ouvre le popup de politique de cookies
          position="center center" // Le popup est centré
          closeOnDocumentClick
          onClose={() => setShowCookiePolicy(false)}
          contentStyle={{backgroundColor: 'transparent', width: '50%', borderColor: 'transparent', zIndex: '1002'}}
        >
          <div className="popup-content" style={{width: '90%',padding: '0.5rem 2rem 2rem 2rem',
            border:'0px', textAlign: 'center', borderRadius: '12px 12px 0 0',
            backgroundColor: 'rgba(15, 23, 42, 0.93)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.9)',
            color: 'white'}}>
            <h2 style={{ 
                fontSize: '2.5rem', 
                display: 'inline-block', 
                marginRight: '2rem', 
                marginTop: 'rem', 
                verticalAlign: 'middle' // Aligne le texte verticalement au centre
              }}>
                Politique de Cookies
              </h2>
              <img 
                style={{ 
                  width: '20%', 
                  marginTop: '0rem', // Ajuste la distance uniquement pour l’image
                  verticalAlign: 'middle' 
                }} 
                src='/images/LOGO-START-ALARM-Q.png' 
              />
            <span style={{display: 'block', marginTop: '1rem', textAlign: 'left'}}>
              <p>Chez Start Alarm nous garantissons la confidentialité de vos données 
                et nous nous engageons à ne pas les revendres à des utilisateurs tiers.</p>
              <h3 style={{marginBottom:'0.5rem'}}>1. Qu'est-ce qu'un cookie ?</h3>
              <p style={{marginTop:'0rem'}}>Un cookie est un petit fichier texte envoyé avec les pages de ce site web
                et stocké par votre navigateur sur le disque dur de votre ordinateur ou d'un autre appareil.</p>
              <h3 style={{marginBottom:'1rem'}}>2. À quoi servent les cookies que nous utilisons ?</h3>
              <h4 style={{marginTop:'1rem', marginBottom:'0.5rem'}}>• Les cookies nécessaires « Toujours actifs »</h4>
              <p style={{marginTop:'0rem'}}>Ces cookies sont nécessaires pour que le site web 
                fonctionne et ne peuvent pas être désactivés dans nos systèmes.</p>
              <h4 style={{marginTop:'1rem', marginBottom:'0.5rem'}}>• Les cookies statistiques</h4>
              <p style={{marginTop:'0rem'}}>Ces cookies recueillent des informations sur la façon dont 
                vous utilisez notre site internet. Ils permettent notamment de mesurer le trafic d’audience 
                et les interactions réalisées sur notre site. Ces cookies vont ensuite nous permettre 
                de réaliser des statistiques confidentielles et anonymes afin d’améliorer votre expérience 
                sur notre site.</p>
              <h4 style={{marginTop:'1rem', marginBottom:'0.5rem'}}>• Les cookies fonctionnels</h4>
              <p style={{marginTop:'0rem'}}>Ces cookies nous permettent de mémoriser les choix que
                 vous avez effectués et de fournir des caractéristiques plus précises et personnelles.
                  Grâce à ces cookies, vous n’aurez pas besoin de saisir à plusieurs reprises les mêmes 
                  informations lors de vos visites sur notre site.</p>
            </span>
            <button style={{ backgroundColor: 'rgb(13, 19, 35)', color: 'white',
               padding: '1rem', borderRadius: '20px', marginRight: '0.1rem',
                width:'20%', borderColor:'transparent' }} onClick={() => setShowCookiePolicy(false)}>Fermer</button>
          </div>
        </Popup>
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
          transition={{ duration: 1 }}
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
          transition={{ duration: 1, delay: 0.25 }}
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