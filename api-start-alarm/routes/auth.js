const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../db');

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const query = 'SELECT * FROM utilisateurs WHERE email = ?';
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      return res.status(500).json({ message: 'Error executing query' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = results[0];
    bcrypt.compare(password, user.mot_de_passe, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords: ', err);
        return res.status(500).json({ message: 'Error comparing passwords' });
      }
      if (isMatch) {
        return res.status(200).json({ message: 'Login successful', token: 'your-jwt-token' }); // Remplacez 'your-jwt-token' par le token JWT réel
      } else {
        return res.status(401).json({ message: 'Invalid password' });
      }
    });
  });
});

router.post('/register', (req, res) => {
  const { email, password, passwordConfirmation } = req.body;
  if (!email || !password || !passwordConfirmation) {
    return res.status(400).send('Email and password are required');
  }

  if (password !== passwordConfirmation) {
    return res.status(400).send('Passwords do not match');
  }

  const table = 'utilisateurs';

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Error hashing password: ', err);
      return res.status(500).send('Error hashing password');
    }

    const query = `INSERT INTO ${table} (email, mot_de_passe) VALUES (?, ?)`;
    connection.query(query, [email, hash], (err, results) => {
      if (err && err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'User already exists' });
      }
      if (err) {
        console.error('Error executing query: ', err);
        return res.status(500).send('Error executing query');
      }
      res.status(201).json({ message: 'User registered' });
    });
  });
});

module.exports = router;