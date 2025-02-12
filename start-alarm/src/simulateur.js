import React, { useState, useEffect } from 'react';
import GridCanvas from './components/GridCanvas';
import Toolbar from './components/Toolbar';
import './simulateur.css';
import NavBar from './navBar';

const Simulateur = () => {
  const [toolInHand, setToolInHand] = useState(null); // Élément en main
  const [step, setStep] = useState(1); // Étape actuelle

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  useEffect(() => {
    document.body.classList.add("no-scroll");
  
    return () => {
      document.body.classList.remove("no-scroll"); // Nettoyage quand on quitte la page
    };
  }, []);
    

  return (
    <div className="main-container">
      <div className='simulateur-navbar'>
        <NavBar />
      </div>
      <div className='simulateur-container'>
        <div className='simulateur-grid-container'>
          <GridCanvas toolInHand={toolInHand} setToolInHand={setToolInHand} prevStep={prevStep} step={step} />
        </div>
        <div className='simulateur-toolbar'>
          <Toolbar setToolInHand={setToolInHand} nextStep={nextStep} prevStep={prevStep} step={step} />
        </div>
      </div>
    </div>
  );
};

export default Simulateur;