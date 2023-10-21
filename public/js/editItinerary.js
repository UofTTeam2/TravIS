
//waits until window is finished loading before running main code
window.onload = () => {
    const allFileInputs = $('.user-uploaded-image'); //gets a reference to all inputs used for uploading a file
    const multerSubmissionForm = $('.multer-submission-form');

    //function to render a preview image of a file chosen by a user before it is uploaded to the database
    function renderPreviewImage() {
        const fileUpload = this.files[0]; //gets a reference to the file held by the input
        const uploadConverter = new FileReader(); //creates a new FileReader instance to read the above file

        //gets a reference to the sibling (grand-nephew?) preview image element in the itinerary item that recieved a file upload
        const previewImageElement = $($(this).siblings('.edit-page-image-container').children()[0]).children('img');

        //if the input contains a file, convert the upload to a usable URL as an 'src' attribute
        if (fileUpload) {
            uploadConverter.readAsDataURL(fileUpload);
        }

        //upon the above conversion completing, set the 'src' attribute of the preview image element to the resulting URL
        //i.e. renders a preview of the uploaded file to the page
        uploadConverter.addEventListener('load', () => {
            previewImageElement.attr('src', uploadConverter.result);
        });
    }

    async function saveItineraryData() {
        let allFileUploads = [];
        let formData = new FormData();

        for (fileInput = 0; fileInput < allFileInputs.length; fileInput++)
        {
            allFileUploads.push(allFileInputs[fileInput].files[0]);
        }

        allFileUploads.forEach(fileUpload =>
        {
            formData.append('image-upload', fileUpload);
        });

        let fileNames;

        try {
            const response = await fetch('/api/trips/image', {
                method: 'POST',
                body: formData
            });
            fileNames = await response.json();
        } catch (err) {
            console.log(err);
        }

        console.log(allFileUploads);
        console.log(fileNames);

        let currentFileInput = 0; //variable to track how many inputs & their file contents have been accounted for
        let currentFileUpload = 0; //variable to track how many uploaded files have been assigned to an object

        //function to deterimine what the image property of an object should be
        function determineImage()
        {
            let image; //variable to hold a reference to an image

            //checks if the current image input had a file uploaded to it
            if (allFileUploads[currentFileInput]) {
                //if a file was uploaded, set the source of the current object's image to the next unassigned image in the array
                image = fileNames[currentFileUpload]; 
                currentFileUpload++; //increase the index by 1 to indicate that +1 more image has been assigned to an object
            }
            else { //otherwise (i.e the current image input did not have a file uploaded), run the following;
                //gets a reference to the container housing the preview image for the current image input,
                //and the image already assigned to the current object (if it exists)
                const imageContainer = $(allFileInputs[currentFileInput]).siblings('.edit-page-image-container')[0];
                
                //checks if the above container has two children, i.e. an image is already assigned to the current
                //object item, and an <img> element to display the current image exists
                if ($(imageContainer).children().length === 2) {
                    //if such an image exists, keep the source file the same by setting it to the src of the already-assigned image
                    const imageContainerChildren = $(imageContainer).children()[1];
                    existingImageSRC = $($(imageContainerChildren).children()[1]).attr('src');

                    //an already-existing image with have an 'src' like './images/multer-uploads/image-upload-1697848850663-957708811'
                    //the below code splits it and takes the [3] index of the resulting array -> image-upload-1697848850663-957708811
                    image = existingImageSRC.split("/")[3];
                }
                else {
                    //otherwise (i.e. an image was not selected by the user, and there is not an image already assigned),
                    //set the image to be an empty string, indicating that there is no image
                    image = '';
                }
            }

            currentFileInput++; //increase the file input index by 1, to indicate that +1 more file inputs have been accounted for
            
            console.log('current input #: ' + currentFileInput);
            console.log('current file #: ' + currentFileUpload);
            
            return image; //return the appropriate image reference
        }

        const tripTitle = $('.trip-title-input').val();
        const tripID = $('.trip-title-container').attr('data-id');
        const titleCardImage = determineImage();

        console.log('title image name: ' + titleCardImage);

        const titleData = {
            id: tripID,
            title: tripTitle,
            image: titleCardImage
        }

        const sectionTitles = $('.section-title-input');
        let sectionData = [];

        for (section = 0; section < sectionTitles.length; section++)
        {
            const currentSectionData = {
                id: $(sectionTitles[section]).attr('data-id'),
                title: $(sectionTitles[section]).val()
            }
            sectionData.push(currentSectionData);
        }

        const itineraryItems = $('.itinerary-item-container');
        let itineraryData = [];

        for (itineraryItem = 0; itineraryItem < itineraryItems.length; itineraryItem++)
        {
            const id = $(itineraryItems[itineraryItem]).attr('data-id');
            const title = $(itineraryItems[itineraryItem]).children('.item-title');
            const link = $(itineraryItems[itineraryItem]).children('.item-link');
            const start_date = $(itineraryItems[itineraryItem]).children('.item-start-date');
            const start_time = $(itineraryItems[itineraryItem]).children('.item-start-time');
            const end_date = $(itineraryItems[itineraryItem]).children('.item-end-date');
            const end_time = $(itineraryItems[itineraryItem]).children('.item-end-time');
            const expense = $(itineraryItems[itineraryItem]).children('.item-expense');
            const notes = $(itineraryItems[itineraryItem]).children('.item-notes');
            const image = determineImage();

            console.log('file #' + [itineraryItem] + ' name: ' + image);

            //construct a new itinerary item object based on the current itinerary item's data
            const currentItineraryItemData = {
                id: id,
                title: title.val(),
                link: link.val(),
                start_date: start_date.val(),
                start_time: start_time.val(),
                end_date: end_date.val(),
                end_time: end_time.val(),
                expense: expense.val(),
                notes: notes.val(),
                image: image
            }
            //append the new itinerary item object to the array of itinerary item data
            itineraryData.push(currentItineraryItemData);
        }

        console.log(titleData);
        console.log(sectionData);
        console.log(itineraryData);

        //send the above title, section, & itinerary item data to the database for processing
        await fetch('/api/trips/edit', {
            method: 'PUT',
            body: JSON.stringify({titleData, sectionData, itineraryData}),
            headers: {'Content-Type': 'application/json'},
        });
    }

    //event listener for when a change is made using the input a user uses to upload an image file
    allFileInputs.on('change', renderPreviewImage);

    //prevents page from redirecting when itinerary data is saved & form is submitted
    multerSubmissionForm.on('submit', (event) => {
        event.preventDefault();
        saveItineraryData();
    });

    //applies datepicker & timepicker widgets to the appropriate input fields once the document is finished loading
    $('.timepicker').timepicker();
    $('.datepicker').datepicker();
};

 //retrieve all SubTrip items
    //create new, empty array (e.g. ARRAY_1, will hold all trip sections (SubTrip) after data is organized)
    //start a for / forEach loop to run on each SubTrip item
        //create new, empty array (e.g. ARRAY_2, will hold all categories of the current SubTrip)
        //start a for loop that runs 5 times total
            //create a new, empty array (e.g. ARRAY_3, will hold all SubCat items of the current category)
            //retrieve all SubCat that belong to the 'Accommodation' category, which also belong to the current SubTrip
            //start a for / forEach loop to run on each SubCat item
                //constructs a new object based on the properties of the current SubCat item (title, link, image, expense, notes, etc.)
                //appends new object to ARRAY_3
                //repeats until an object has been created for each SubCat item in the current category
            //appends ARRAY_3 to ARRAY_2 (i.e. an array of objects containing all items in the 'Accommodation' category has been added to ARRAY_2)
            //repeats four more times, creating an ARRAY_3 of objects for all items in the 'Activity', 'Transportation', 'Restaurant', and 'Misc'
            //categories, and appending them to ARRAY_2
        //after the above for loop completes, ARRAY_2 should contain five objects; one for each category, each of which contains objects for
        //each itinerary item (SubCat)
            //note that several fields / items / categories may have no data; this is intended, as any category / item / field that is missing will
            //simply not be displayed by handlebars in the view page, and will be displayed as an empty input the user can fill out in the edit page
        //appends ARRAY_2 to ARRAY_1 (i.e an array of objects containing all categories of the current SubTrip, each of which contains objects for each itinerary item belonging to that category, has been added to ARRAY_1)
        //repeats until an ARRAY_2 has been created for each SubTrip of the current Trip
    //ARRAY_1 (contains all SubTrip objects) should now contain an ARRAY_2 (contains all category objects for one SubTrip) for each SubTrip
        //each ARRAY_2 should now contain five ARRAY_3's (contains all SubCat items, should have exactly five; one for accommodation, activities, transportation, restaurant, and misc)
            //each ARRAY_3 should now contain a series of objects; one for each itinerary item (SubCat) that belongs to the appropriate category (i.e. the first ARRAY_3 contains objects for all Accommodation SubCat items, the second contains objects for all Activity SubCat items, etc.)*/
