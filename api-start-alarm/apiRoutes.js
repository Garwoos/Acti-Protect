const express = require('express');
const router = express.Router();

const equipementsRoutes = require('./routes/equipements');
const authRoutes = require('./routes/auth');

router.use('/equipements', equipementsRoutes);
router.use('/auth', authRoutes);

module.exports = router;