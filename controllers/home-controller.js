// Desc: This file will handle all of the home routes for the application
// =============================================================

// Dependencies, Models, and Middleware
// =============================================================
const router = require('express').Router();
const { Trip } = require('../models');
const loginAuth = require('../utils/auth');
//==============================================================

// Get route for the home page
// =============================================================
router.get('/', async (req, res) => {
    try {
        res.render('homepage', {
            loggedIn: req.session.loggedIn,
            user_id: req.session.user_id,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
//==============================================================

// Get route for the dashboard page
// =============================================================
router.get('/trips', loginAuth, async (req, res) => {
    console.log('getting trips data');
    console.log(req.session.user_id);
    try {
        const tripData = await Trip.findAll({
            where: {
                user_id: req.session.user_id,
            },
            order: [['end_date', 'DESC']],
        });
        const trips = tripData.map((trip) => trip.get({ plain: true }));
        console.log(trips);
        res.render('dashboard', {
            trips,
            loggedIn: req.session.loggedIn,
            user_id: req.session.user_id,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get route for the signup page
// =============================================================
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});
//==============================================================

//Get route for the login page
// =============================================================
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});
//==============================================================

//Get route for bad request page
//==============================================================
router.get('/bad-request', (req, res) => {
    res.render('bad-request');
});
//==============================================================

module.exports = router;
