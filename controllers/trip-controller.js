/* eslint-disable indent */
// Desc: This file will handle all the get routes for trips
// =============================================================

// Dependencies, Models
// =============================================================
const router = require('express').Router();
const { Trip, TripSection, ItineraryItem } = require('../models');
const loginAuth = require('../utils/auth');
// =============================================================

// Get one trip with all associated trip sections and itinerary items
// =============================================================
router.get('/view/:id', loginAuth, async (req, res) => {
    try {
        // Retrieve the trip with the specified ID and include its sections and items
        const trip = await Trip.findByPk(req.params.id, {
            include: [
                {
                    model: TripSection,
                    as: 'tripsections',
                    include: [
                        {
                            model: ItineraryItem,
                            as: 'itineraryitems',
                        },
                    ],
                },
            ],
        });

        // Check if the trip exists
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        // Initialize the data structure
        const responseData = {
            id: trip.id,
            title: trip.title,
            start_date: trip.start_date,
            end_date: trip.end_date,
            image: trip.image,
            sections: [],
        };

        // Initialize the total expenses for the trip
        let totalExpenses = 0;

        // Iterate through sections and items to categorize them
        trip.tripsections.forEach((section) => {
            const categorizedItems = {
                accommodationItems: [],
                foodItems: [],
                transportItems: [],
                activityItems: [],
                miscItems: [],
            };

            section.itineraryitems.forEach((item) => {
                switch (item.category) {
                    case 'Accommodation':
                        categorizedItems.accommodationItems.push(item);
                        break;
                    case 'Food':
                        categorizedItems.foodItems.push(item);
                        break;
                    case 'Transportation':
                        categorizedItems.transportItems.push(item);
                        break;
                    case 'Activities':
                        categorizedItems.activityItems.push(item);
                        break;
                    default:
                        categorizedItems.miscItems.push(item);
                        break;
                }
                totalExpenses += parseFloat(item.expense);
            });

                // Add the categorized items to the response
            responseData.sections.push({
                id: section.id,
                title: section.title,
                ...categorizedItems,
            });
        });

        console.log(responseData);
        console.log(totalExpenses);

        //destructure response data
        const {id, title, start_date, end_date, image, sections} = responseData;

        // Send the response
        res.render('view-itinerary', {
            layout: 'main',
            id,
            title,
            start_date,
            end_date,
            image,
            sections,
            totalExpenses,
            loggedIn: req.session.loggedIn,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// =============================================================

// Get edit page for a trip
// =============================================================
router.get('/edit/:id', loginAuth, async (req, res) => {
    try {
        // Retrieve the trip with the specified ID and include its sections and items
        const trip = await Trip.findByPk(req.params.id, {
            include: [
                {
                    model: TripSection,
                    as: 'tripsections',
                    include: [
                        {
                            model: ItineraryItem,
                            as: 'itineraryitems',
                        },
                    ],
                },
            ],
        });

        // Check if the trip exists
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        // Initialize the data structure
        const responseData = {
            id: trip.id,
            title: trip.title,
            start_date: trip.start_date,
            end_date: trip.end_date,
            image: trip.image,
            sections: [],
        };

        // Iterate through sections and items to categorize them
        trip.tripsections.forEach((section) => {
            const categorizedItems = {
                accommodationItems: [],
                foodItems: [],
                transportItems: [],
                activityItems: [],
                miscItems: [],
            };

            section.itineraryitems.forEach((item) => {
                switch (item.category) {
                    case 'Accommodation':
                        categorizedItems.accommodationItems.push(item);
                        break;
                    case 'Food':
                        categorizedItems.foodItems.push(item);
                        break;
                    case 'Transportation':
                        categorizedItems.transportItems.push(item);
                        break;
                    case 'Activities':
                        categorizedItems.activityItems.push(item);
                        break;
                    default:
                        categorizedItems.miscItems.push(item);
                        break;
                }
            });

            // Add the categorized items to the response
            responseData.sections.push({
                id: section.id,
                title: section.title,
                ...categorizedItems,
            });
        });

        //destructure response data
        const {id, title, start_date, end_date, image, sections} = responseData;

        // Send the response
        res.render('edit-itinerary', {
            layout: 'main',
            id,
            title,
            start_date,
            end_date,
            image,
            sections,
            loggedIn: req.session.loggedIn,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// =============================================================

// Get route for edit page when the user clicks on the create new trip button
// =============================================================
router.get('/create-trip', loginAuth, async (req, res) => {
    try {
        //WHEN YOU CONNECT THIS TO CARLOS'S PAGE, YOU'LL NEED TO USE
        //THE USER_ID IN SESSION STORAGE FOR THE user_id FIELD OF THE
        //NEWLY-CREATED TRIP

        // create a new trip with empty sections and items
        const trip = await Trip.create({
            title: '',
            start_date: '',
            end_date: '',
            image: '',
        });

        // retrive the id of the newly created trip
        const tripId = trip.id;

        // Initialize the data structure
        const responseData = {
            id: tripId,
            title: trip.title,
            start_date: trip.start_date,
            end_date: trip.end_date,
            image: trip.image,
            sections: [],
        };

        //destructure response data
        const {id, title, start_date, end_date, image, sections} = responseData;

        res.render('edit-itinerary', {
            layout: 'main',
            id,
            title,
            start_date,
            end_date,
            image,
            sections,
            loggedIn: req.session.loggedIn,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// =============================================================

// Export router
// =============================================================
module.exports = router;
