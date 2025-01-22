const express = require('express');
const router = express.Router();

const equipementsRoutes = require('./routes/equipements');
const authRoutes = require('./routes/auth');
const ouverturesRoutes = require('./routes/ouvertures');

router.use('/equipements', equipementsRoutes);
router.use('/auth', authRoutes);
router.use('/ouvertures', ouverturesRoutes);

module.exports = router;