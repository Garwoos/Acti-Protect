import React, { useEffect, useState } from 'react';
import './Toolbar.css';

const Toolbar = ({ setToolInHand, nextStep, prevStep, step }) => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    if (step === 1) {
      setElements([
        { id: 'mur', label: 'Mur' },
        { id: 'mur-mitoyen', label: 'Mur Mitoyen' },
        { id: 'cloison', label: 'Cloison' },
      ]);
    } else if (step === 2) {
      const fetchDoorsAndWindows = async () => {
        try {
          const response = await fetch('/api/ouvertures');
          const data = await response.json();
          const formattedData = data.map(item => ({
            id: item.id_ouverture,
            label: item.type_ouverture,
            stats: `Matériau: ${item.materiau}`
          }));
          setElements(formattedData);
        } catch (error) {
          console.error('Error fetching doors and windows:', error);
        }
      };

      fetchDoorsAndWindows();
    } else if (step === 3) {
      const fetchEquipments = async () => {
        try {
          const response = await fetch('/api/equipements');
          const data = await response.json();
          const formattedData = data.map(equipment => ({
            id: equipment.id_equipement,
            label: equipment.nom_equipement,
            stats: `Catégorie: ${equipment.categorie}, Prix: ${equipment.prix}€`,
          }));
          setElements(formattedData);
        } catch (error) {
          console.error('Error fetching equipments:', error);
        }
      };

      fetchEquipments();
    }
  }, [step]);

  const handleClick = (label, id) => {
    setToolInHand({label, id});
    console.log('Tool selected:', {label, id}); // Ajoutez cette ligne pour vérifier que l'outil est sélectionné
  };

  return (
    <div style={styles.toolbarContainer}>
      <div style={styles.toolbarSpacing}></div>
      <div style={styles.toolbar}>
        <h2>Éléments</h2>
        <button style={styles.nextButton} onClick={prevStep}>Étape précédente</button>
        <button style={styles.nextButton} onClick={nextStep}>Étape suivante</button>
        <ul style={styles.list}>
          {elements.map((el) => (
            <li
              key={el.id}
              onClick={() => handleClick(el.label, el.id)}
              style={styles.listItem}
            >
              {el.label}
              <div style={styles.stats}>{el.stats}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

  const styles = {
    toolbarContainer: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
      width: '100%',
    },
    toolbarSpacing: {
      width: '80%',
    },
    toolbar: {
      width: '20%',
      backgroundColor: '#070f17',
      padding: '0rem 1rem 0rem 1rem',
      position: 'absolute',
      right: 0,
      top: 64,
      height: '100vh',
      overflowY: 'auto',
    },
    list: {
      listStyleType: 'none',
      padding: 0,
    },
    listItem: {
      margin: '10px 0',
      padding: '10px',
      backgroundColor: '#070f17',
      borderRadius: '5px',
      textAlign: 'center',
      cursor: 'pointer',
    },
    listItemActive: {
      backgroundColor: '#2a2e33',
      borderRadius: '20px',
    },
    stats: {
      marginTop: '5px',
      fontSize: '12px',
      color: '#555',
    },
    nextButton: {
      marginTop: '20px',
      padding: '10px',
      backgroundColor: '#005f8c',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

export default Toolbar;