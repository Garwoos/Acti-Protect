import React, { useState } from 'react';
import GridCanvas from './components/GridCanvas';
import Toolbar from './components/Toolbar';
import { color } from 'framer-motion';

const Simulateur = () => {
  const [tool] = useState('wall'); // Outil sélectionné (exemple)
  const [toolInHand, setToolInHand] = useState(null); // Élément en main

  return (
    <div style={styles.container}>
      <div style={styles.gridContainer}>
        <h1 style={styles.title}>Simulateur d'Alarme</h1>
        <GridCanvas tool={tool} toolInHand={toolInHand} setToolInHand={setToolInHand} />
      </div>
      <Toolbar setToolInHand={setToolInHand} />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
  },
  gridContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  title: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#fff',
    zIndex: 1,
  },
};

export default Simulateur;