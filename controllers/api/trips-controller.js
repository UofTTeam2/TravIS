// Desc: This file will handle all the post, put, and delete routes for trips
// =============================================================

// Dependencies, Models
// =============================================================
const router = require('express').Router();
const { Trip, TripSection, ItineraryItem } = require('../models');
const loginAuth = require('../utils/auth');
// =============================================================

// Create a new trip
// =============================================================
router.post('/create-trip', loginAuth, async (req, res) => {});
// =============================================================

// Update a trip
// =============================================================
router.put('/edit/:id', loginAuth, async (req, res) => {
    try {
        const tripId = req.params.id;
        const { titleData, sectionData, itineraryData } = req.body;

        // Update trip data
        await Trip.update(titleData, {
            where: { id: tripId },
        });

        // Create a map to associate section IDs with their data
        const sectionMap = new Map();
        sectionData.forEach((section) => {
            sectionMap.set(section.id, section);
        });

        // Loop through sectionData to update each section and associated itinerary items
        for (const section of sectionData) {
            const sectionId = section.id;
            const sectionToUpdate = sectionMap.get(sectionId);

            if (sectionToUpdate) {
                // Update section data
                await TripSection.update(sectionToUpdate, {
                    where: { id: sectionId },
                });

                // Filter itinerary items by section ID
                const itemsToUpdate = itineraryData.filter(
                    (item) => item.section_id === sectionId
                );

                // Loop through itemsToUpdate to update each itinerary item
                for (const item of itemsToUpdate) {
                    await ItineraryItem.update(item, {
                        where: { id: item.id },
                    });
                }
            }
        }

        // Construct the response data (responseData) based on updated data
        const updatedTrip = await Trip.findByPk(tripId, {
            include: [
                {
                    model: TripSection,
                    as: 'sections',
                    include: [
                        {
                            model: ItineraryItem,
                            as: 'items',
                        },
                    ],
                },
            ],
        });

        // Construct responseData based on the updatedTrip and related data
        const responseData = {
            id: updatedTrip.id,
            title: updatedTrip.title,
            start_date: updatedTrip.start_date,
            end_date: updatedTrip.end_date,
            image: updatedTrip.image,
            sections: updatedTrip.sections.map((section) => ({
                id: section.id,
                title: section.title,
                accommodationItems: section.items
                    .filter((item) => item.category === 'Accommodation')
                    .map((item) => ({ ...item, category: item.category })),
                foodItems: section.items
                    .filter((item) => item.category === 'Food')
                    .map((item) => ({ ...item, category: item.category })),
                transportItems: section.items
                    .filter((item) => item.category === 'Transportation')
                    .map((item) => ({ ...item, category: item.category })),
                activityItems: section.items
                    .filter((item) => item.category === 'Activities')
                    .map((item) => ({ ...item, category: item.category })),
                miscItems: section.items
                    .filter(
                        (item) =>
                            ![
                                'Accommodation',
                                'Food',
                                'Transportation',
                                'Activities',
                            ].includes(item.category)
                    )
                    .map((item) => ({ ...item, category: item.category })),
            })),
        };

        // Save the session and render the page
        req.session.save(() => {
            // Render the 'edit-itinerary' page with responseData
            const { id, title, start_date, end_date, image, sections } =
                responseData;
            // Redirect to the edit page for the trip
            res.render('view-itinerary', {
                layout: 'main',
                id,
                title,
                start_date,
                end_date,
                image,
                sections,
                loggedIn: req.session.loggedIn,
            });
            res.redirect(`/trips/view/${req.params.id}`);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// =============================================================

// Export the router
// =============================================================
module.exports = router;
