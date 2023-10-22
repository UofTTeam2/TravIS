// Desc: This file will handle all the post, put, and delete routes for trips
// =============================================================

// Dependencies, Models
// =============================================================
const router = require('express').Router();
const multer = require('multer');
const { Trip, TripSection, ItineraryItem } = require('../models');
const loginAuth = require('../utils/auth');
// =============================================================

// Setting up folder to receive and format uploads via multer
// =============================================================
const storage = multer.diskStorage({
    destination: './public/images/multer-uploads',
    filename: function (req, file, cb) {
        const fileSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileName = file.fieldname + '-' + fileSuffix;
        file.originalname = fileName;
        cb(null, fileName);
    },
});
const uploadFolder = multer({ storage: storage });
// =============================================================

// POST route for multer image uploads
// =============================================================
router.post('/image', uploadFolder.array('image-upload'), async (req, res) => {
    try {
        const fileNames = req.files.map((file) => file.originalname);
        res.status(200).json(fileNames);
    } catch (err) {
        res.status(500).json(err);
    }
});
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

        // deconstruct responseData
        const { id, title, start_date, end_date, image, sections } =
            responseData;
        // Render the 'edit-itinerary' page with responseData
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
        // res.redirect(`/trips/view/${req.params.id}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// =============================================================

// Create a section for a trip
// =============================================================
router.post('/create-section', loginAuth, async (req, res) => {
    try {
        const { trip_id, title } = req.body;

        const newSection = await TripSection.create({
            trip_id: trip_id,
            title,
        });

        const responseData = {
            id: newSection.id,
            title: newSection.title,
            items: [],
        };

        res.status(200).json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// =============================================================

// Create an itinerary item
// =============================================================
router.post('/create-item', loginAuth, async (req, res) => {
    try {
        const { section_id, category } = req.body;

        const newItem = await ItineraryItem.create({
            section_id,
            category,
        });

        const responseData = {
            section_id: newItem.section_id,
            category: newItem.category,
        };

        res.status(200).json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// =============================================================

// Delete a section
// =============================================================
router.delete('/delete-section', loginAuth, async (req, res) => {
    try {
        const sectionId = req.body.id;

        await TripSection.destroy({
            where: { id: sectionId },
        });

        res.status(200).json({ message: 'Section deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// =============================================================

// Delete an itinerary item
// =============================================================
router.delete('/delete-item', loginAuth, async (req, res) => {
    try {
        const itemId = req.body.id;

        await ItineraryItem.destroy({
            where: { id: itemId },
        });

        res.status(200).json({ message: 'Item deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// =============================================================

// Export the router
// =============================================================
module.exports = router;
