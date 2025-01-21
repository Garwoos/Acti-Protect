import React, { useState, useEffect } from 'react';
import GridCanvas from './components/GridCanvas';
import Toolbar from './components/Toolbar';
import './simulateur.css';
import NavBar from './navBar';

const Simulateur = () => {
  const [tool] = useState('wall'); // Outil sélectionné (exemple)
  const [toolInHand, setToolInHand] = useState(null); // Élément en main

  const [progress, setProgress] = useState(33);
  const [isVisible, setIsVisible] = useState(true); // Contrôle la visibilité

  useEffect(() => {
    // Animation de progression fluide de 33% à 66%
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 66 ? prev + 0.5 : 66));
    }, 20); // Augmente de 0.5% toutes les 20ms

    // Démarre l'animation de disparition après 2 secondes
    const timeoutFade = setTimeout(() => {
      setIsVisible(false);
    }, 5000); // 5 secondes avant de commencer à disparaître

    return () => {
      clearInterval(interval);
      clearTimeout(timeoutFade);
    };
  }, []);

  return (
    <div className="main-container">
      <div className="simulateur-navbar">
        <NavBar />
      </div>
      <div className="simulateur-container">
        <div className="simulateur-grid-container">
          <GridCanvas tool={tool} toolInHand={toolInHand} setToolInHand={setToolInHand} />
        </div>
        <div className="simulateur-toolbar">
          <Toolbar setToolInHand={setToolInHand} />
        </div>
      </div>
      <div style={{ padding: "20px" }}>
        {isVisible && (
          <progress
            className={`animated-progress ${!isVisible ? "fade-out" : ""}`}
            value={progress}
            max={100}
          />
        )}
      </div>
    </div>
  );
};

export default Simulateur;
