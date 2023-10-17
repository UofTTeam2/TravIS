//importing packages
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
//const session = require('express-session');
//const SequelizeStore = require('connect-session-sequelize')(session.Store);

//importing routes, sequelize connection, and custom helpers
const sequelize = require('./config/connection');
//const routes = require('./controllers');
//const helpers = require('./utils/helpers');

//defines express application and PORT
const app = express();
const PORT = process.env.PORT || 3001;

/* UNCOMMENT THIS LATER WHEN THE SESSION STUFF IS SET UP
//defines express session
const sess =
{
  secret: //CREATE .ENV VARIABLE FOR SECRET AND PUT IT HERE,
  cookie: {//COOKIE PROPERTIES GO IN HERE},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore(
  {
    db: sequelize,
  }),
};

//sets express application to use the above-defined session settings
app.use(session(sess));*/

//initializes handlebars template engine
const hbs = exphbs.create({/* IF WE MAKE ANY CUSTOM HELPERS, IMPORT THEM HERE */});

//sets express application to use handlebars engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json()); //sets application to process incoming JSON data
app.use(express.urlencoded({extended: true})); //sets application to process incoming URL-encoded data
app.use(express.static(path.join(__dirname, 'public'))); //sets application's default static file path to the 'public' folder
//app.use(routes); //sets application to use our imported routing settings

//sync sequelize models to the database, then start running the server
sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});

/* ETHAN'S TEMPORARY CODE FOR TESTING HANDLEBARS BELOW, COMMENT IT OUT IF IT'S CAUSING PROBLEMS */

app.get('/', async (req, res) => {
    try {
        res.render('view-itinerary');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

/* ETHAN'S TEMPORARY CODE FOR TESTING HANDLEBARS ABOVE, COMMENT IT OUT IF IT'S CAUSING PROBLEMS */