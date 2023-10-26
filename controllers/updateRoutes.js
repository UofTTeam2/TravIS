const router = require('express').Router();

// Displays the handlebars page for updating a user
router.get('/', (req, res) => {
    res.render('update', {loggedIn: req.session.loggedIn});
});

module.exports = router;
