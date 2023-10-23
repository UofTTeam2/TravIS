// Desc: The index file is the centeral hub for all of the seeds files. It is used to import all of the seeds files and export them as one object.
// =============================================================

// Importing the seeds files
// =============================================================
const sequelize = require('../config/connection');
//const seedComments = require('./comment-seeds');
const seedMessages = require('./message-seeds');
const seedItineraryItems = require('./itineraryitem-seeds');
const seedTrip = require('./trip-seeds');
const seedUsers = require('./user-seeds');
const seedTripSections = require('./tripsection-seeds');
// =============================================================

// Syncing the seeds files
// =============================================================
const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
    await seedTrip();
    console.log('\n----- TRIPS SEEDED -----\n');
    await seedTripSections();
    console.log('\n----- TRIP SECTIONS SEEDED -----\n');
    await seedItineraryItems();
    console.log('\n----- ITINERARY ITEMS SEEDED -----\n');
    await seedMessages();
    console.log('\n----- MESSAGES SEEDED -----\n');
    //await seedComments();
    //console.log('\n----- COMMENTS SEEDED -----\n');

    process.exit(0);
};

seedAll();
