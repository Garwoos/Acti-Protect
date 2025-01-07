// server/server.js
const express = require('express');
const path = require('path');
const app = express();
const port = 5000; // Choisir un port pour ton serveur Express (ici 5000)

// Sert le dossier public
app.use(express.static(path.join(__dirname, 'public')));

// Middleware pour servir les fichiers statiques (images, CSS, JS, etc.)
app.use(express.static(path.join(__dirname, '../build'))); // Le dossier "build" est généré par React lors de la construction

// Route par défaut pour servir l'index de React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// Démarrer le serveur Express
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});