const router = require('express').Router();

// This route will render the homepage.handlebars
router.get('/homepage', (req, res) => {
    // You can pass additional data if required
    res.render('homepage');
});

module.exports = router;
