import React from 'react';
import './Toolbar.css';

const Toolbar = ({ setToolInHand }) => {
  const elements = [
    { id: 'sensor', label: 'Capteur', range: 500, stats: 'Distance de détection: 10m' },
    { id: 'door', label: 'Porte', stats: 'Largeur: 1m' },
    { id: 'window', label: 'Fenêtre', stats: 'Largeur: 1.5m' },
  ];

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
    cursor: 'grab',
  },
  stats: {
    marginTop: '5px',
    fontSize: '12px',
    color: '#555',
  },
};

export default Toolbar;