const router = require('express').Router();

router.get('/', async (req, res) => {
    console.log('test');
    res.status(200).json({message: 'test'});
});


module.exports = router;