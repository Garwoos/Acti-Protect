import React from 'react';

const Toolbar = () => {
  const elements = [
    { id: 'sensor', label: 'Capteur' },
    { id: 'door', label: 'Porte' },
    { id: 'window', label: 'Fenêtre' },
  ];

  const handleDragStart = (e, type) => {
    e.dataTransfer.setData('elementType', type);
  };

  return (
    <div style={styles.toolbar}>
      <h2>Éléments</h2>
      <ul style={styles.list}>
        {elements.map((el) => (
          <li
            key={el.id}
            draggable
            onDragStart={(e) => handleDragStart(e, el.id)}
            style={styles.listItem}
          >
            {el.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  toolbar: {
    width: '300px',
    backgroundColor: '#f4f4f4',
    padding: '20px',
    borderLeft: '1px solid #ddd',
    position: 'fixed',
    right: 0,
    top: 0,
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
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
    textAlign: 'center',
    cursor: 'grab',
  },
};

export default Toolbar;