const express = require('express');
const router = express.Router();
const connection = require('../db');

// Sélectionner toutes les ouvertures
router.get('/', (req, res) => {
  const query = 'SELECT * FROM Ouvertures';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      return res.status(500).json({ message: 'Error executing query' });
    }
    res.status(200).json(results);
  });
});

// Sélectionner une ouverture par son ID
router.get('/:id', (req, res) => {
  const query = 'SELECT * FROM Ouvertures WHERE id_ouverture = ?';
  connection.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      return res.status(500).json({ message: 'Error executing query' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Ouverture not found' });
    }
    res.status(200).json(results[0]);
  });
});

// Ajouter une nouvelle ouverture
router.post('/', (req, res) => {
  const { type_ouverture, materiau } = req.body;
  if (!type_ouverture || !materiau) {
    return res.status(400).json({ message: 'Missing required information' });
  }
  const query = 'INSERT INTO Ouvertures (type_ouverture, materiau) VALUES (?, ?)';
  connection.query(query, [type_ouverture, materiau], (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      return res.status(500).json({ message: 'Error executing query' });
    }
    res.status(201).json({ message: 'Ouverture added' });
  });
});

// Mettre à jour une ouverture existante
router.put('/:id', (req, res) => {
  const { type_ouverture, materiau } = req.body;
  if (!type_ouverture || !materiau) {
    return res.status(400).json({ message: 'Missing required information' });
  }
  const query = 'UPDATE Ouvertures SET type_ouverture = ?, materiau = ? WHERE id_ouverture = ?';
  connection.query(query, [type_ouverture, materiau, req.params.id], (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      return res.status(500).json({ message: 'Error executing query' });
    }
    res.status(200).json({ message: 'Ouverture updated' });
  });
});

// Supprimer une ouverture par son ID
router.delete('/:id', (req, res) => {
  const query = 'DELETE FROM Ouvertures WHERE id_ouverture = ?';
  connection.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      return res.status(500).json({ message: 'Error executing query' });
    }
    res.status(200).json({ message: 'Ouverture deleted' });
  });
});

module.exports = router;