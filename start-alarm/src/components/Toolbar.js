import React, { useEffect, useState } from 'react';
import './Toolbar.css';

const Toolbar = ({ setToolInHand, nextStep, prevStep, step }) => {
  const [elements, setElements] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState({});

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
          const groupedData = data.reduce((acc, item) => {
            if (!acc[item.type_ouverture]) {
              acc[item.type_ouverture] = [];
            }
            acc[item.type_ouverture].push(item);
            return acc;
          }, {});
          setElements(groupedData);

          // Initialize selectedMaterial with the first material for each label
          const initialSelectedMaterial = {};
          Object.keys(groupedData).forEach(label => {
            if (groupedData[label].length > 0) {
              initialSelectedMaterial[label] = groupedData[label][0].materiau;
            }
          });
          setSelectedMaterial(initialSelectedMaterial);
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

  const handleMaterialChange = (label, material) => {
    setSelectedMaterial(prev => ({ ...prev, [label]: material }));
  };

  const handleClick = (label, id, material) => {
    setToolInHand({ label, id, material });
    console.log('Tool selected:', { label, id, material });
  };

  return (
    <div style={styles.toolbarContainer}>
      <div style={styles.toolbarSpacing}></div>
      <div style={styles.toolbar}>
        <h2>Étapes</h2>
        <div style={step === 1 ? styles.activeStep : styles.step}>1. Pose des murs</div>
        <div style={step === 2 ? styles.activeStep : styles.step}>2. Pose des ouvertures</div>
        <div style={step === 3 ? styles.activeStep : styles.step}>3. Pose des capteurs</div>
        <h2>Éléments</h2>
        <button style={styles.nextButton} onClick={prevStep}>Étape précédente</button>
        <button style={styles.nextButton} onClick={nextStep}>Étape suivante</button>
        <ul style={styles.list}>
          {step === 2 ? (
            Object.keys(elements).map(label => (
              <li key={label} style={styles.listItem}>
                <div>{label}</div>
                {Array.isArray(elements[label]) && elements[label].length > 1 ? (
                  <select
                    value={selectedMaterial[label] || ''}
                    onChange={(e) => handleMaterialChange(label, e.target.value)}
                  >
                    {elements[label].map(item => (
                      <option key={item.id_ouverture} value={item.materiau}>
                        {item.materiau}
                      </option>
                    ))}
                  </select>
                ) : (
                  elements[label].length === 1 && (
                    <div onClick={() => handleClick(label, elements[label][0].id_ouverture, elements[label][0].materiau)}>
                      {elements[label][0].materiau}
                    </div>
                  )
                )}
                {Array.isArray(elements[label]) && elements[label].length > 1 && (
                  <div onClick={() => handleClick(label, elements[label].find(item => item.materiau === selectedMaterial[label]).id_ouverture, selectedMaterial[label])}>
                    Sélectionner
                  </div>
                )}
              </li>
            ))
          ) : (
            Array.isArray(elements) && elements.map((el) => (
              <li
                key={el.id}
                onClick={() => handleClick(el.label, el.id)}
                style={styles.listItem}
              >
                {el.label}
                <div style={styles.stats}>{el.stats}</div>
              </li>
            ))
          )}
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
  step: {
    padding: '10px',
    backgroundColor: '#2a2e33',
    borderRadius: '5px',
    textAlign: 'center',
    margin: '10px 0',
  },
  activeStep: {
    padding: '10px',
    backgroundColor: '#005f8c',
    borderRadius: '5px',
    textAlign: 'center',
    margin: '10px 0',
    color: 'white',
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