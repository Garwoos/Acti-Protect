import React, { useEffect, useState } from 'react';
import './Toolbar.css';

const Toolbar = ({ setToolInHand }) => {
  const [elements, setElements] = useState([
    { id: 'sensor', label: 'Capteur', range: 500, stats: 'Distance de détection: 10m' },
    { id: 'door', label: 'Porte', stats: 'Largeur: 1m' },
    { id: 'window', label: 'Fenêtre', stats: 'Largeur: 1.5m' },
  ]);

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await fetch('/api/equipements');
        const data = await response.json();
        const formattedData = data.map(equipment => ({
          id: equipment.id_equipement,
          label: equipment.nom_equipement,
          stats: `Catégorie: ${equipment.categorie}, Prix: ${equipment.prix}€`,
        }));
        setElements(prevElements => [...prevElements, ...formattedData]);
      } catch (error) {
        console.error('Error fetching equipments:', error);
      }
    };

    fetchEquipments();
  }, []);

  const handleDragStart = (e, type) => {
    e.dataTransfer.setData('elementType', type);
  };

  const handleClick = (type) => {
    setToolInHand(type);
  };

  return (
    <div style={styles.toolbarContainer}>
      <div style={styles.toolbarSpacing}>
      </div>
      <div style={styles.toolbar}>
        <h2>Éléments</h2>
        <ul style={styles.list}>
          {elements.map((el) => (
            <li
              key={el.id}
              draggable
              onDragStart={(e) => handleDragStart(e, el.id)}
              onClick={() => handleClick(el.id)}
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
    padding: '1rem',
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
    cursor: 'grab',
  },
  stats: {
    marginTop: '5px',
    fontSize: '12px',
    color: '#555',
  },
};

export default Toolbar;