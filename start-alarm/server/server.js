// server/server.js
const express = require('express');
const path = require('path');
const app = express();
const port = 7000; // Choisir un port pour ton serveur Express (ici 7000)
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const cors = require('cors');

app.use(express.json());
app.use(cors());
// Charger la clé API SendGrid depuis le fichier .env
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Sert le dossier public
app.use(express.static(path.join(__dirname, 'public')));

// Middleware pour servir les fichiers statiques (images, CSS, JS, etc.)
app.use(express.static(path.join(__dirname, '../public'))); // Le dossier "public" est généré par React lors de la construction

// Middleware pour servir les fichiers statiques (images, CSS, JS, etc.)
app.use(express.static(path.join(__dirname, '../build'))); // Le dossier "build" est généré par React lors de la construction

// Utiliser les routes API
const apiRoutes = require('../../api-start-alarm/apiRoutes');
app.use('/api', apiRoutes);

// Route par défaut pour servir l'index de React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// PARTIE API SENDGRID POUR MAIL //

app.use(express.json()); // Nécessaire pour lire les requêtes JSON

app.post("/api/send-invite", async (req, res) => {
  const { recipient, senderName, referralLink } = req.body;

  if (!recipient || !senderName || !referralLink) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  const msg = {
    to: recipient,
    from: process.env.EMAIL_SENDER,
    subject: `${senderName} t'invite à rejoindre !`,
    html: `
      <h2>Hey ${recipient},</h2>
      <p>${senderName} t'invite à découvrir notre plateforme.</p>
      <p><a href="${referralLink}">Clique ici pour t'inscrire</a></p>
      <p>À bientôt !</p>
    `,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: "Email envoyé avec succès !" });
  } catch (error) {
    console.error("Erreur SendGrid :", error.response ? error.response.body : error);
    res.status(500).json({ message: "Erreur lors de l'envoi de l'email." });
  }
});


// Démarrer le serveur Express
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});