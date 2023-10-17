// Dec: The centeral hub for all routing files
// Notes: This file is used to collect the packaged group of
// API endpoints and prefix them with the path / api.
// -----------------------------------------------------

const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
