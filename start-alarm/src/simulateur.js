import React, { useState } from 'react';
import GridCanvas from './components/GridCanvas';
import Toolbar from './components/Toolbar';
import './simulateur.css';
import NavBar from './navBar';
import Modal from './components/Modal'; // Importer le composant Modal

const Simulateur = () => {
  const [toolInHand, setToolInHand] = useState(null); // Élément en main
  const [step, setStep] = useState(1); // Étape actuelle
  const [protectionRate, setProtectionRate] = useState(null); // Taux de protection
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour contrôler la visibilité du popup
  const [elements, setElements] = useState([]); // État pour les éléments

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSimulateProtection = (rate) => {
    setProtectionRate(rate);
    setIsModalOpen(true); // Ouvrir le popup lorsque le score de protection est calculé
  };

  return (
    <div className="main-container">
      <div className='simulateur-navbar'>
        <NavBar />
      </div>
      <div className='simulateur-container'>
        <div className='simulateur-grid-container'>
          <GridCanvas toolInHand={toolInHand} setToolInHand={setToolInHand} prevStep={prevStep} step={step} setElementsInToolbar={setElements} />
        </div>
        <div className='simulateur-toolbar'>
          <Toolbar setToolInHand={setToolInHand} nextStep={nextStep} prevStep={prevStep} step={step} setProtectionRate={handleSimulateProtection} elements={elements} setElements={setElements} />
        </div>
      </div>
      {step === 4 && protectionRate !== null && (
        <div className="protection-rate">
          <div className="protection-circle">
            <div className="circle" style={{ '--percentage': protectionRate }}>
              <div className="inner-circle">
                {protectionRate}%
              </div>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2>Taux de protection</h2>
          <div className="protection-circle">
            <div className="circle" style={{ '--percentage': protectionRate }}>
              <div className="inner-circle">
                {protectionRate}%
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Simulateur;