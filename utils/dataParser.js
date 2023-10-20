// Desc: Creating a middleware to parse the data from the request body
// Input: req, res, next
// Output: none
// ================================================================

//Dependencies
// ================================================================
const bodyParser = require('body-parser');
// ================================================================

//Define the middleware
// ================================================================
const dataParser = (req, res, next) => {
    // parse JSON data
    bodyParser.json()(req, res, (err) => {
        if (err) {
            console.log(err);
            res.status(400).send('Bad Request');
            return next(err);
        }

        // parse URL encoded data
        bodyParser.urlencoded({ extended: true })(req, res, (err) => {
            if (err) {
                console.log(err);
                res.status(400).send('Bad Request');
                return next(err);
            }
            // if there is no error, proceed
            return next();
        });
    });
};
// ================================================================

//Export the middleware
// ================================================================
module.exports = dataParser;
