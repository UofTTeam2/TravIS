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
    destination: './public/images/multer-uploads', //setting file path
    filename: function(req, file, cb) {
        const fileSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); //creates a suffix using the current UNIX time + a random 9-digit number
        const fileName = file.fieldname + '-' + fileSuffix; //uses field name + suffix to create new file name
        file.originalname = fileName;
        cb(null, fileName);
    }
});

const uploadFolder = multer({storage: storage});

// POST route for multer image uploads
// =============================================================
router.post('/image', uploadFolder.array('image-upload'), async (req, res) => {
    try {
        let fileNames = req.files.map((file) => file.originalname); //creates an array containing the names of all uploaded files

        //if no files were uploaded, set fileNames to an array with an empty string
        //this will prevent an error when the response attempts to return nothing
        if (!fileNames) {
            fileNames = [''];
        }

        res.status(200).json(fileNames); //returns the array of file names
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
        const {titleData, sectionData, itineraryData} = req.body;

        // Update trip data
        await Trip.update(titleData, {
            where: { id: tripId },
        });

        // Create a map to associate section IDs with their data
        const sectionMap = new Map();
        sectionData.forEach((section) => {
            sectionMap.set(section.id, section);
        });

        // Loop through sectionData to update each section
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
                where: {id: item.id},
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
        const {trip_id} = req.body;

        //create a new section associated with the given trip ID
        const newSection = await TripSection.create({
            trip_id: trip_id,
        });

        const newSectionId = newSection.id; //retrieve ID of new section

        res.status(200).json(newSectionId); //return new section ID to front end
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
        const {trip_section_id, category} = req.body;

        //create a new itinerary item under the provided trip section & category
        const newItem = await ItineraryItem.create({
            trip_section_id: trip_section_id,
            category: category,
        });

        const newItemID = newItem.id; //retrieve the ID of the new item

        res.status(200).json(newItemID); //return new item ID to front end
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

// Delete a section using a given section ID
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

// Delete an itinerary item using a given itinerary item ID
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