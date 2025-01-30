const express = require('express');
const router = express.Router();

const equipementsRoutes = require('./routes/equipements');
const authRoutes = require('./routes/auth');
const ouverturesRoutes = require('./routes/ouvertures');
const projetsRoutes = require('./routes/projets');
const elementsRoutes = require('./routes/elements'); // Ajoutez cette ligne

router.use('/equipements', equipementsRoutes);
router.use('/auth', authRoutes);
router.use('/ouvertures', ouverturesRoutes);
router.use('/projets', projetsRoutes);
router.use('/elements', elementsRoutes); // Ajoutez cette ligne

module.exports = router;