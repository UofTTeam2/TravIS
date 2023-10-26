const router = require('express').Router();

// This route will render the homepage.handlebars
router.get('/', (req, res) => {
    // You can pass additional data if required
    res.render('update', {loggedIn: req.session.loggedIn});
});

module.exports = router;
