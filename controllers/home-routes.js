const router = require('express').Router();

router.get('/', async (req, res) => {
  res.render('homepage');
});

// Start of Dashboard Demo
router.get('/dashboard', async (req, res) => {
  try {
    res.render('dashboard');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// End of Dashboard Demo

module.exports = router;
