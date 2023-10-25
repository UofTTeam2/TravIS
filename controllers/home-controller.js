// Desc: This file will handle all of the home routes for the application
// =============================================================

// Dependencies, Models, and Middleware
// =============================================================
const router = require('express').Router();
const { User, Trip, Location } = require('../models');
const loginAuth = require('../utils/auth');

//Get route for the signup page
// =============================================================
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
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
router.get('/search', (req, res) => {
    res.render('search');
});

router.get('/', (req, res) => {
    res.render('homepage');
});

router.get('/explore', (req, res) => {
    res.render('explore');
});

module.exports = router;
