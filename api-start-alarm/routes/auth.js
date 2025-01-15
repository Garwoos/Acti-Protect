require('dotenv').config(); // Charger les variables d'environnement

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../db');

const secretKey = process.env.SECRET_KEY; // Utiliser la clé secrète depuis les variables d'environnement
const refreshSecretKey = process.env.REFRESH_SECRET_KEY; // Clé secrète pour les jetons de rafraîchissement

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  const query = 'SELECT * FROM utilisateurs WHERE email = ?';
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      return res.status(500).send('Error executing query');
    }
    if (results.length === 0) {
      return res.status(404).send('User not found');
    }

    const user = results[0];
    bcrypt.compare(password, user.mot_de_passe, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords: ', err);
        return res.status(500).send('Error comparing passwords');
      }
      if (isMatch) {
        const accessToken = jwt.sign(
          { id: user.id_utilisateur, email: user.email },
          secretKey,
          { expiresIn: '3m' } // Jeton d'accès expire après 3 minutes
        );
        const refreshToken = jwt.sign(
          { id: user.id_utilisateur, email: user.email },
          refreshSecretKey,
          { expiresIn: '7d' } // Jeton de rafraîchissement expire après 7 jours
        );
        return res.status(200).json({ accessToken, refreshToken });
      } else {
        return res.status(401).send('Invalid password');
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