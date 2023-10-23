// Desc: This file will be used to seed the Trip table in the database.
// =============================================================

// Import the Trip model
// =============================================================
const { Trip } = require('../models');
// =============================================================

// Trip data
// =============================================================
const tripData = [
    {
        title: 'Trip to the Bahamas',
        start_date: '2021-01-01',
        end_date: '2021-01-05',
        image: 'https://i.imgur.com/2nCt3Sbl.jpg',
        user_id: 1,
    },
    {
        title: 'Trip to Germany',
        start_date: '2022-05-10',
        end_date: '2022-05-20',
        image: 'https://i.imgur.com/8nCt3Sbl.jpg',
        user_id: 1,
    },
    {
        title: 'Trip to Japan',
        start_date: '2022-06-15',
        end_date: '2022-06-25',
        image: 'https://i.imgur.com/5nCt3Sbl.jpg',
        user_id: 2,
    },
    {
        title: 'Trip to the US',
        start_date: '2022-07-20',
        end_date: '2022-07-30',
        image: 'https://i.imgur.com/4nCt3Sbl.jpg',
        user_id: 3,
    },
    {
        title: 'Trip to the UK',
        start_date: '2023-08-25',
        end_date: '2023-09-05',
        image: 'https://i.imgur.com/3nCt3Sbl.jpg',
        user_id: 4,
    },
];
// =============================================================

// Creating the tripData array
// =============================================================
const seedTrips = () => Trip.bulkCreate(tripData);
// =============================================================

// Export the seedTrips function
// =============================================================
module.exports = seedTrips;
