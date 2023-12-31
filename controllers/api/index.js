// Desc: Creating an index file in the api folder allows us to collect the endpoints from all of the files and package them up for us, so we don't have to import each one individually.
//==============================================================

// Dependencies:
//==============================================================
const router = require('express').Router();
const userRoutes = require('./user-controller');
const tripsRoutes = require('./trips-controller');
const forumRoutes = require('./forumApi-controller');
//==============================================================

// Routes:
//==============================================================
router.use('/users', userRoutes);
router.use('/trips', tripsRoutes);
router.use('/forum', forumRoutes);
//==============================================================

// Export:
//==============================================================
module.exports = router;