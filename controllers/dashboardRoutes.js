const router = require('express').Router();

// This route will render the homepage.handlebars
router.get('/dashboard', (req, res) => {
    // You can pass additional data if required
    res.render('dashboard');
});

module.exports = router;
