import React, { useState } from 'react';
import GridCanvas from './components/GridCanvas';
import Toolbar from './components/Toolbar';
import './simulateur.css';
import NavBar from './navBar';

const Simulateur = () => {
  const [tool] = useState('wall'); // Outil sélectionné (exemple)
  const [toolInHand, setToolInHand] = useState(null); // Élément en main

  return (
    <div className="main-container">
      <NavBar />
      <div className='simulateur-container'>
        <h1 className='simulateur-title'>Configurateur</h1>
        <div className='simulateur-grid-container'>
          <GridCanvas tool={tool} toolInHand={toolInHand} setToolInHand={setToolInHand} />
        </div>
        <div className='simulateur-toolbar'>
          <Toolbar setToolInHand={setToolInHand} />
        </div>
      </div>
    </div>
  );
};

export default Simulateur;