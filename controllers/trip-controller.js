// Desc: This file will handle all the get routes for the dashboard
// =============================================================

// Dependencies, Models
// =============================================================
const router = require('express').Router();
const { Trip, User, TripSection, Message } = require('../models');
const loginAuth = require('../utils/auth');
// =============================================================

// Get one trip
// =============================================================
router.get('/:id', loginAuth, async (req, res) => {
    try {
        const tripData = await Trip.findByPk(req.params.id, {
            include: [
                {
                    model: TripSection,
                    attributes: ['id', 'title', 'date'],
                },
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const trip = tripData.get({ plain: true });

        res.render('trip', {
            trip,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
// =============================================================
