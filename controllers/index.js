const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-controller.js');
const forumRoutes = require('./forum-routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/forum', forumRoutes);

module.exports = router;
