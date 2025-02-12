const express = require('express');
const router = express.Router();
const connection = require('../db');

// Route pour enregistrer les éléments d'un projet
router.post('/enregistrer', (req, res) => {
  const { id_projet, elements } = req.body;

  if (!id_projet || !elements || !Array.isArray(elements)) {
    return res.status(400).json({ message: 'Missing required information' });
  }

  const query = 'INSERT INTO Elements (id_projet, type_element, x, y, orientation, materiau) VALUES ?';
  const values = elements.map(el => [id_projet, el.type, el.x, el.y, el.orientation, el.materiau]);

  connection.query(query, [values], (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      return res.status(500).json({ message: 'Error executing query' });
    }
    res.status(201).json({ message: 'Elements saved successfully' });
  });w
});

module.exports = router;