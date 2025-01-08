import React, { useState } from 'react';
import GridCanvas from './components/GridCanvas';
import Toolbar from './components/Toolbar';

const Simulateur = () => {
  const [tool] = useState('wall'); // Outil sélectionné (exemple)

  return (
    <div style={styles.container}>
      <div style={styles.gridContainer}>
        <h1 style={styles.title}>Simulateur d'Alarme</h1>
        <GridCanvas tool={tool} />
      </div>
      <Toolbar />
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
    flex: 1, // Prend tout l'espace restant
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