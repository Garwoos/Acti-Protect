/**
 * @file apiRoutes.js
 * @description Fichier de définition des routes pour l'API Acti-Protect.
 * 
 * @requires express
 * @requires express.Router
 * @requires jsonwebtoken
 * @requires ./routes/equipements
 * @requires ./routes/auth
 */


const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const equipementsRoutes = require('./routes/equipements');
const authRoutes = require('./routes/auth');


const secretKey = process.env.SECRET_KEY; // Utiliser la clé secrète depuis les variables d'environnement

 /**
    * Middleware pour authentifier le jeton JWT.
    * 
    * @function authenticateToken
    * @param {Object} req - L'objet de requête HTTP.
    * @param {Object} res - L'objet de réponse HTTP.
    * @param {Function} next - La fonction middleware suivante.
    * @returns {void}
    */
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403); // Le jeton est invalide ou a expiré
    req.user = user;
    next();
  });
};

router.use('/equipements', authenticateToken, equipementsRoutes);
router.use('/auth', authRoutes);

module.exports = router;