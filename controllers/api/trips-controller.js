// Desc: This file will handle all the post, put, and delete routes for trips
// =============================================================

// Dependencies, Models
// =============================================================
const router = require('express').Router();
const multer = require('multer');
const { Trip, TripSection, ItineraryItem } = require('../../models');
const loginAuth = require('../../utils/auth');
const userIdAuth = require('../../utils/userIdAuth');
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
        let fileNames = req.files.map((file) => file.originalname);

        //if no files were uploaded, set fileNames to an array with an empty string
        //this will prevent an error when the response attempts to return nothing
        if (!fileNames) {
            fileNames = [''];
        }

        res.status(200).json(fileNames);
    } catch (err) {
        res.status(500).json(err);
    }
});
// =============================================================

// Update a trip
// =============================================================
router.put('/edit/:id', [loginAuth, userIdAuth], async (req, res) => {
    try {
        const tripId = req.params.id;
        const { titleData, sectionData, itineraryData } = req.body;

        console.log(tripId);

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
            }
        }

        // Loop through itineraryData to update each itinerary item
        for (const item of itineraryData) {
            await ItineraryItem.update(item, {
                where: { id: item.id },
            });
        }

        //sets up redirect address for user to see updated trip details in view mode
        const redirectAddress = `/trips/view/${tripId}`;

        //returns address to front end for redirection
        res.status(200).json(redirectAddress);
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
            title: title,
        });

        const newSectionId = newSection.id;

        res.status(200).json(newSectionId);
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
        const { trip_section_id, category } = req.body;

        const newItem = await ItineraryItem.create({
            trip_section_id: trip_section_id,
            category: category,
        });

        const newItemID = newItem.id;

        res.status(200).json(newItemID);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// =============================================================

// Update public status of a trip itinerary page
// =============================================================
router.post('/update-public', loginAuth, async (req, res) => {
    try {
        const tripId = req.body.id;
        const public = req.body.public;

        //to the value of the public variable passed in the request body
        if (public) {
            public = true;
        } else {
            public = false;
        }
        //update the public field of the trip with the matching tripId
        await Trip.update(
            { public: public },
            {
                where: { id: tripId },
            }
        );

        res.status(200).json({ message: 'Public status updated' });
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
