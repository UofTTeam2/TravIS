// Desc: Creating an index file in the api folder allows us to collect the endpoints from all of the files and package them up for us, so we don't have to import each one individually.
//==============================================================

// Dependencies:
//==============================================================
const router = require('express').Router();
const userRoutes = require('./user-routes');
//const tripRoutes = require('./trip-routes');
//const locationRoutes = require('./location-routes');
//const commentRoutes = require('./comment-routes');

// Routes:
//==============================================================
router.use('/users', userRoutes);
//router.use('/trips', tripRoutes);
//router.use('/locations', locationRoutes);
//router.use('/comments', commentRoutes);
//==============================================================

module.exports = router;
