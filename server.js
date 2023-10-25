// Project: TravIs
// File Created: 2023-10-17
// Desc: Main server file for the application.
// This file will be used to start the server and connect to the database.
// The server will be listening on port 3001.
//==============================================================

// Dependencies
// =============================================================
const express = require('express');
const sequelize = require('./config/connection');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');
const exphbs = require('express-handlebars');
// load env variables
require('dotenv').config();
//==============================================================

//importing routes, Session model and custom middlewares
// =============================================================
const routes = require('./controllers');
const Session = require('./models/Session');
//const helpers = require('./utils/helpers');
//initializes handlebars template engine
const hbs = exphbs.create();
// import dataParser middleware
const dataParser = require('./utils/dataParser');
//==============================================================

//defines express application and PORT
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;
//==============================================================

// Access the session secret from the environment variables
// =============================================================
const sessionSecret = process.env.SESSION_SECRET;

//defining express session
const sess = {
    secret: sessionSecret,
    cookie: {
        // Session will automatically expire after one hour
        expires: 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
        model: 'session', // Name of the database table to store sessions
    }),
};

app.use(session(sess));
//==============================================================

// Registering handlebars as the template engine of choice
// =============================================================
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
//==============================================================

// Sets up the custom middleware & Express app to handle data parsing
// =============================================================
app.use(dataParser);
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);
//==============================================================

// sync sequelize models to the database, then start running the server
// =============================================================
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
