const express = require('express');
const router = express.Router();
const apiRoutes = require('./apiRoutes');

// Grouping the routes. Access them via /api or /
router.use('/', apiRoutes);
router.use('/api', apiRoutes);

module.exports = router;