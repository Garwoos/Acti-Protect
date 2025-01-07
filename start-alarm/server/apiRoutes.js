// filepath: /d:/Users/Sam/Documents/Acti-Protect/Acti-Protect/start-alarm/server/apiRoutes.js
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json()); // Middleware to parse JSON bodies
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

// Connexion à la base de données MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'start-alarm-bdd',  
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Définir les routes API
router.get('/users', (req, res) => {
  connection.query('SELECT * FROM utilisateurs', (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
    } else {
      res.json(results);
    }
  });
});


router.post('/loginin', (req, res) => {
    // Extract username and password from the request body 
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    const table = 'utilisateurs';

    // Use prepared statements to prevent SQL injection
    const query = `SELECT * FROM ${table} WHERE email = ?`;

    // Execute the query
    connection.query(query, [email], (err, results) => {
        if (err) {
            console.error('Error executing query: ', err);
            return res.status(500).send('Error executing query');
        }

        if (results.length === 0) {
            return res.status(401).send('User not found');
        }

        const user = results[0];
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                console.error('Error comparing passwords: ', err);
                return res.status(500).send('Error comparing passwords');
            }

            if (result) {
                // Add security headers
                res.setHeader('Content-Security-Policy', "default-src 'self'");
                res.setHeader('X-Content-Type-Options', 'nosniff');
                res.setHeader('X-Frame-Options', 'DENY');
                res.setHeader('X-XSS-Protection', '1; mode=block');

                return res.send('Login successful');
            } else {
                return res.status(401).send('Invalid password');
            }
        });
    });
});

router.post('/register', (req, res) => {
    // Extract username and password from the request body
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    const table = 'utilisateurs';

    // Hash the password
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error('Error hashing password: ', err);
            return res.status(500).send('Error hashing password');
        }

        // Insert the user into the database
        const query = `INSERT INTO ${table} (username, password) VALUES (?, ?)`;
        connection.query(query, [username, hash], (err, results) => {
            if (err) {
                console.error('Error executing query: ', err);
                return res.status(500).send('Error executing query');
            }

            res.send('User registered');
        });
    });
});

router.post('/insertequipment', (req, res) => {
    // insert equipment into the database
    



// Exporter le router
module.exports = router;