// Description: Middleware to check if a trip's view page is public
// =====================================================================
const db = require('../models');
const publicAuth = async (req, res, next) => {
    try {
        const trip = await db.Trip.findOne({
            where: {
                id: req.params.id,
            },
        });
        if (trip.public === true) {
            next();
        } else {
            //
            res.status(400).redirect('/bad-request');
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

module.exports = publicAuth;