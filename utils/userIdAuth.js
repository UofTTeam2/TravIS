// Description: Middleware to check if the user is the owner of the trip
// =====================================================================

const db = require('../models');

const userIdAuth = async (req, res, next) => {
    try {
        const trip = await db.Trip.findOne({
            where: {
                id: req.params.id,
            },
        });
        if (trip.user_id === req.session.user_id) {
            next();
        } else {
            //
            res.redirect('/');
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

module.exports = userIdAuth;
