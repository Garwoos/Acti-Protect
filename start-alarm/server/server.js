// server/server.js
const express = require('express');
const path = require('path');
const app = express();
const port = 5000; // Choisir un port pour ton serveur Express (ici 5000)

// Middleware pour servir les fichiers statiques (images, CSS, JS, etc.)
app.use(express.static(path.join(__dirname, '../public'))); // Le dossier "public" est généré par React lors de la construction

// Middleware pour servir les fichiers statiques (images, CSS, JS, etc.)
app.use(express.static(path.join(__dirname, '../build'))); // Le dossier "build" est généré par React lors de la construction

// Utiliser les routes API
const apiRoutes = require('./apiRoutes');
app.use('/api', apiRoutes);

// Route par défaut pour servir l'index de React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// Démarrer le serveur Express
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});