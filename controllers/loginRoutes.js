const router = require('express').Router();

// This route will render the homepage.handlebars
router.get('/login', (req, res) => {
    // You can pass additional data if required
    res.render('login');
});

module.exports = router;
