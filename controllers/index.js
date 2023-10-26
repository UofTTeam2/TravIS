const router = require('express').Router();
const apiController = require('./api');
const homeController = require('./home-controller');
const tripController = require('./trip-controller');
const forumController = require('./forum-controller');
const updateController = require ('./updateRoutes');
//==============================================================

// Routes
// =============================================================
router.use('/', homeController);
router.use('/trips', tripController);
router.use('/api', apiController);
router.use('/forum', forumController);
router.use('/update', updateController);
//==============================================================

// Export
// =============================================================
module.exports = router;
