const express = require('express');
const router = express.Router();
const connection = require('../db');

// Route pour récupérer tous les équipements
router.get('/', (req, res) => {
  const query = 'SELECT * FROM equipements';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      return res.status(500).json({ message: 'Error executing query' });
    }
    res.status(200).json(results);
  });
});

// Route pour récupérer un équipement par son ID
router.get('/:id', (req, res) => {
  const query = 'SELECT * FROM equipements WHERE id_equipement = ?';
  connection.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      return res.status(500).json({ message: 'Error executing query' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Equipment not found' });
    }
    res.status(200).json(results[0]);
  });
});

// Route pour ajouter un équipement
router.post('/', (req, res) => {
  const { nom_equipement, categorie, description, prix } = req.body;
  if (!nom_equipement || !categorie || !description || !prix) {
    return res.status(400).json({ message: 'Missing required information' });
  }
  const query = 'INSERT INTO equipements (nom_equipement, categorie, description, prix) VALUES (?, ?, ?, ?)';
  connection.query(query, [nom_equipement, categorie, description, prix], (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      return res.status(500).json({ message: 'Error executing query' });
    }
    res.status(201).json({ message: 'Equipment added' });
  });
});

// Route pour mettre à jour un équipement
router.put('/:id', (req, res) => {
  const { nom_equipement, categorie, description, prix } = req.body;
  if (!nom_equipement || !categorie || !description || !prix) {
    return res.status(400).json({ message: 'Missing required information' });
  }
  const query = 'UPDATE equipements SET nom_equipement = ?, categorie = ?, description = ?, prix = ? WHERE id_equipement = ?';
  connection.query(query, [nom_equipement, categorie, description, prix, req.params.id], (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      return res.status(500).json({ message: 'Error executing query' });
    }
    res.status(200).json({ message: 'Equipment updated' });
  });
});

module.exports = router;