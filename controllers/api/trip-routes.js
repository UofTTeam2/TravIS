// Desc: This file will handle all of the trip routes for the application
// =============================================================
// Dependencies
// =============================================================
const router = require('express').Router();
const multer = require('multer');
// =============================================================

// Setting up folder to receive and format uploads via multer
// =============================================================
const storage = multer.diskStorage({
    destination: './public/images/multer-uploads',
    filename: function(req, file, cb) {
        const fileSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileName = file.fieldname + '-' + fileSuffix;
        file.originalname = fileName;
        cb(null, fileName);
    }
});

const uploadFolder = multer({storage: storage});

// POST route for multer image uploads
// =============================================================
router.post('/image', uploadFolder.array('image-upload'), async (req, res) => {
    try {
        let fileNames = req.files.map(file => file.originalname);

        //if no files were uploaded, set fileNames to an array with one empty string
        //this will prevent an error when the response attempts to return nothing
        if (!fileNames)
        {
            fileNames = [''];
        }

        console.log('file names in multer:');
        console.log(fileNames);

        res.status(200).json(fileNames);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET route for data to view a trip
// NOTE: this route will only be used when the user clicks an
// already-existing trip in the trips list dashboard page
// when switching from edit -> view mode, a PUT request will be used instead
// =============================================================
router.get('/view/:id', async (req, res) => {
    try {
        //the route parameter (:id) will be the ID of the trip you should retrieve the data from

        //this is where the gigantic list of 30 bullet points i sent in slack
        //would come in, where you get all sections of the current trip, then
        //all itinerary items for each section, group them by category, construct
        //a larger object with them, redirect the page to '/trips/view', and
        //then render the data to 'view-itinerary.handlebars'

        //make sure to attach the appropriate IDs for the trip, the sections, and
        //the itinerary items, as per the sample itinerary data (GET)

        //NOTE: this should not redirect the user to a page with a /:id at the
        //end, e.g. /trips/view/624 -> just trips/view
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET route for data to edit a trip
// this route will be used when the user clicks on the 'edit' button
// while on the 'view' page of a specific trip
// =============================================================
router.get('/edit:id', async (req, res) => {
    try {
        //the route parameter (:id) will be the ID of the trip you should retrieve the data from

        //this is where the gigantic list of 30 bullet points i sent in slack
        //would come in, where you get all sections of the current trip, then
        //all itinerary items for each section, group them by category, construct
        //a larger object with them, redirect the page to '/trips/edit', and
        //then render the data to 'edit-itinerary.handlebars'

        //make sure to attach the appropriate IDs for the trip, the sections, and
        //the itinerary items, as per the sample itinerary data (GET)

        //NOTE: this should not redirect the user to a page with a /:id at the
        //end, e.g. /trips/edit/624 -> just trips/edit
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST route for creating a new trip
// this route will be used when a user clicks the 'Create New Trip'
// button on the trips list dashboard page
// =============================================================
router.post('/create-trip', async (req, res) => {
    try {
        //included in the request body should be the user's ID
        //carlos is the one who this request will come from, though, so we should discuss
        //this with him before implementing it fully

        //create new, empty Trip in SQL database
            //assign user_id foreign key using req.body.user_id (or however we end up attaching
            //the user's ID; it could come directly from the session if we wanted)
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST route for creating a new trip section
// this route will be used when a user clicks the 'Create New Section'
// button on the itinerary edit page
// =============================================================
router.post('/create-section', async (req, res) => {
    try {
        //included in the request body, i will send you the ID of
        //the trip you should add this new section to as 'trip_id'

        //create new, empty TripSection in SQL database
            //assign trip_id foreign key using req.body.trip_id

        //return the ID of the new section as a JSON response
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST route for creating a new itinerary item
// this route will be used when a user clicks the '+' button to the
// side of one of the categories of a trip section (accommodation,
// food, transportation, etc.) on the itinerary edit page
// =============================================================
router.post('/create-item', async (req, res) => {
    try {
        //included in the request body, i will send you the ID of
        //the trip section you should add this new itinerary item to 
        //as 'section_id', and the category it should be assigned
        //as 'category'

        //create new, empty ItineraryItem in SQL database
            //assign category field using req.body.category
            //assign trip_section_id foreign key using req.body.section_id

        //return the ID of the new item as a JSON response

        //FOR (ETHAN'S) TESTING
        console.log(req.body.category);
        console.log(req.body.section_id);
        res.status(200).json(Math.round(Math.random() * 1E2));
    } catch (err) {
        res.status(500).json(err);
    }
});

// PUT route for updating trip data in the database
// this route will be used when a user clicks the 'save' button
// while on itinerary edit page
// =============================================================
router.put('/edit', async (req, res) => {
    try {
        //included in the request body will be three objects;
        //titleData, sectionData, and itineraryData
        //titleData will include;
            //'id'
            //'title'
            //'image'
        //sectionData will include a list of all section objects for the current trip
            //each object in sectionData will include;
                //'id'
                //'title'
        //itineraryData will include a list of all itinerary item objects for the current section
            //each object in itineraryData will include;
                //'id'
                //'title'
                //'link'
                //'image'
                //'start_date'
                //'start_time'
                //'end_date'
                //'end-time'
                //'expense'
                //'notes'
        
        //titleData will be a single object, so you can directly update the
        //appropriate entry using the attached 'id'

        //use a for / forEach loop on sectionData to update each section
        //within using the attached 'id'

        //use a for / forEach loop on itineraryData to update each itinerary item
        //within using the attached 'id'

        //this is where the gigantic list of 30 bullet points i sent in slack
        //would come in, ultimately rendering the /view:id route

        //FOR (ETHAN'S) TESTING
        console.log(req.body);
        res.status(200).json(req.body);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;