// Desc: This file will be used to seed the TripSection table in the database.
// =============================================================

// Import the TripSection model
// =============================================================
const { TripSection } = require('../models');
// =============================================================

// TripSection data
// =============================================================
const tripSectionData = [
    {
        title: 'Day 1',
        trip_id: 1,
    },
    {
        title: 'Day 2',
        trip_id: 1,
    },
    {
        title: 'Day 3',
        trip_id: 1,
    },
    {
        title: 'Day 1',
        trip_id: 2,
    },
    {
        title: 'Day 2',
        trip_id: 2,
    },
    {
        title: 'Day 3',
        trip_id: 2,
    },
    {
        title: 'Day 1',
        trip_id: 3,
    },
    {
        title: 'Day 2',
        trip_id: 3,
    },
    {
        title: 'Day 3',
        trip_id: 3,
    },
    {
        title: 'Day 1',
        trip_id: 4,
    },
    {
        title: 'Day 2',
        trip_id: 4,
    },
    {
        title: 'Day 3',
        trip_id: 4,
    },
    {
        title: 'Day 1',
        trip_id: 5,
    },
    {
        title: 'Day 2',
        trip_id: 5,
    },
    {
        title: 'Day 3',
        trip_id: 5,
    },
];
// =============================================================

// Creating the tripSectionData array
// =============================================================
const seedTripSections = () => TripSection.bulkCreate(tripSectionData);
// =============================================================

// Export the seedTripSections function
// =============================================================
module.exports = seedTripSections;
