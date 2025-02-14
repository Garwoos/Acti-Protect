import React, { useEffect, useState } from 'react';
import './Toolbar.css';

const Toolbar = ({ setToolInHand, nextStep, prevStep, step, setProtectionRate, elements, setElements }) => {
  const [selectedMaterial, setSelectedMaterial] = useState({});
  const [selectedOpenings, setSelectedOpenings] = useState([]);
  const [selectedSensors, setSelectedSensors] = useState([]);

  useEffect(() => {
    if (step === 1) {
      setElements([
        { id: 'mur', label: 'Mur', type: 'wall' },
        { id: 'mur-mitoyen', label: 'Mur Mitoyen', type: 'wall' },
        { id: 'cloison', label: 'Cloison', type: 'wall' },
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
            acc[item.type_ouverture].push({ ...item, type: 'ouverture', coefficient: item.Coefficient_vulnerabilite });
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
            coefficient: equipment.Coefficient_efficacite,
            type: 'capteur',
          }));
          setElements(formattedData);
        } catch (error) {
          console.error('Error fetching equipments:', error);
        }
      };

      fetchEquipments();
    } else if (step === 4) {
      setElements([]); // Clear elements for step 4
    }
  }, [step, setElements]);

  const handleMaterialChange = (label, material) => {
    setSelectedMaterial(prev => ({ ...prev, [label]: material }));
  };

  const handleClick = (label, id, material, type, coefficient) => {
    setToolInHand({ label, id, material, type, coefficient });
    console.log('Tool selected:', { label, id, material, type, coefficient });

    if (type === 'ouverture') {
      setSelectedOpenings(prev => [...prev, { label, id, material, type, coefficient }]);
    } else if (type === 'capteur') {
      setSelectedSensors(prev => [...prev, { label, id, material, type, coefficient }]);
    }
  };

  const handleNextStep = () => {
    if (step < 4) {
      nextStep();
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      prevStep();
    }
  };

  const handleSavePlan = () => {
    console.log('Save plan functionality to be implemented');
  };

  const handleSimulateProtection = () => {
    console.log('Selected Openings:', selectedOpenings);
    console.log('Selected Sensors:', selectedSensors);
  
    if (selectedOpenings.length === 0) {
      console.log('No openings found.');
    }
  
    if (selectedSensors.length === 0) {
      console.log('No sensors found.');
    }
  
    const numberofOpenings = selectedOpenings.length;
    const numberofSensors = selectedSensors.length;
  
    let protectionRate = (numberofSensors / numberofOpenings) * 100;
    if (protectionRate < 0 || isNaN(protectionRate)) {
      console.log('Protection rate is negative.');
      protectionRate = 0;
    } else if (protectionRate > 100) {
      console.log('Protection rate is greater than 100.');
      protectionRate = 100;
    }
  
    setProtectionRate(protectionRate.toFixed(2));
    console.log('Protection rate:', protectionRate.toFixed(2));
  };

  return (
    <div style={styles.toolbarContainer}>
      <div style={styles.toolbarSpacing}></div>
      <div style={styles.toolbar}>
        <h2>Étapes</h2>
        <div style={step === 1 ? styles.activeStep : styles.step}>1. Pose des murs</div>
        <div style={step === 2 ? styles.activeStep : styles.step}>2. Pose des ouvertures</div>
        <div style={step === 3 ? styles.activeStep : styles.step}>3. Pose des capteurs</div>
        <div style={step === 4 ? styles.activeStep : styles.step}>4. Options</div>
        <h2>Éléments</h2>
        <button style={styles.nextButton} onClick={handlePrevStep}>Étape précédente</button>
        <button style={styles.nextButton} onClick={handleNextStep}>Étape suivante</button>
        {step === 4 && (
          <div style={styles.optionsContainer}>
            <button style={styles.optionButton} onClick={handleSavePlan}>Sauvegarder le plan</button>
            <button style={styles.optionButton} onClick={handleSimulateProtection}>Simuler la protection</button>
          </div>
        )}
        <ul style={styles.list}>
          {step === 1 && Array.isArray(elements) ? (
            elements.map(el => (
              <li
                key={el.id}
                onClick={() => handleClick(el.label, el.id, undefined, el.type, undefined)}
                style={styles.listItem}
              >
                {el.label}
              </li>
            ))
          ) : step === 2 && typeof elements === 'object' ? (
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
                    <div onClick={() => handleClick(label, elements[label][0].id_ouverture, elements[label][0].materiau, elements[label][0].type, elements[label][0].Coefficient_vulnerabilite)}>
                      {elements[label][0].materiau}
                    </div>
                  )
                )}
                {Array.isArray(elements[label]) && elements[label].length > 1 && (
                  <div onClick={() => handleClick(label, elements[label].find(item => item.materiau === selectedMaterial[label]).id_ouverture, selectedMaterial[label], elements[label][0].type, elements[label][0].Coefficient_vulnerabilite)}>
                    Sélectionner
                  </div>
                )}
              </li>
            ))
          ) : step === 3 && Array.isArray(elements) ? (
            elements.map((el) => (
              <li
                key={el.id}
                onClick={() => handleClick(el.label, el.id, undefined, el.type, el.coefficient)}
                style={styles.listItem}
              >
                {el.label}
                <div style={styles.stats}>{el.stats}</div>
              </li>
            ))
          ) : null}
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
  optionsContainer: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  optionButton: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#005f8c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
  },
};

export default Toolbar;