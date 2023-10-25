const router = require('express').Router();

// This route will render the homepage.handlebars
router.get('/update', (req, res) => {
    // You can pass additional data if required
    res.render('update');
});

module.exports = router;
