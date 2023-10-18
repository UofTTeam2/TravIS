// Desc: This file will handle all of the user routes for the application
// =============================================================

// Dependencies, Models
// =============================================================
const router = require('express').Router();
const { User } = require('../../models');
// =============================================================

// POST route for creating a new user
// =============================================================
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body, {
            individualHooks: true,
        });

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});
// =============================================================

// POST route for logging in a user
// =============================================================
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: { email: req.body.email },
        });

        if (!userData) {
            res.status(400).json({
                message: 'Incorrect email or password, please try again',
            });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({
                message: 'Incorrect email or password, please try again',
            });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            res.json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});
// =============================================================

// PUT route for updating a user
// =============================================================
router.put('/:id', async (req, res) => {
    try {
        const userData = await User.update(req.body, {
            where: { id: req.params.id },
            individualHooks: true,
        });

        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            res.json(userData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
// =============================================================

// DELETE route for deleting a user
// =============================================================
router.delete('/:id', async (req, res) => {
    try {
        const userData = await User.destroy({
            where: { id: req.params.id },
        });

        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});
// =============================================================

// POST route for logging out a user
// =============================================================
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});
// =============================================================

module.exports = router;
