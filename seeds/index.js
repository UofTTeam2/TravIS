// Desc: The index file is the centeral hub for all of the seeds files. It is used to import all of the seeds files and export them as one object.
// =============================================================

// Importing the seeds files
// =============================================================
const sequelize = require('../config/connection');
const seedItineraryItems = require('./itineraryitem-seeds');
const seedTrip = require('./trip-seeds');
const seedUsers = require('./user-seeds');
const seedTripSections = require('./tripsection-seeds');
const seedTopic = require('./topicData');
const seedPost = require('./postData');
const seedComment = require('./commentData');
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
    await seedTopic();
    console.log('\n----- TOPICS SEEDED -----\n');  
    await seedPost();
    console.log('\n----- POSTS SEEDED -----\n');  
    await seedComment();
    console.log('\n----- COMMENTS SEEDED -----\n');  
    process.exit(0);
};

seedAll();
