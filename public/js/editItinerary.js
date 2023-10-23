
//waits until window is finished loading before running main code
window.onload = () => {
    const multerSubmissionForm = $('.multer-submission-form');
    const saveItineraryButton = $('.save-itinerary-button');
    const addTripSectionButton = $('.create-new-section-button');
    let deleteSectionButtons = $('.delete-itinerary-section-button');
    let deleteItineraryItemButtons = $('.delete-itinerary-item-button');
    let addItineraryItemButtons = $('.add-itinerary-item-button');
    let allFileInputs = $('.user-uploaded-image'); //gets a reference to all inputs used for uploading a file
    let removeChosenImageButton = $('.clear-preview-image-button');
    let removeCurrentImageButton = $('.clear-current-image-button');

    //function to render a preview image of a file chosen by a user before it is uploaded to the database
    function renderPreviewImage() {
        const fileUpload = this.files[0]; //gets a reference to the file held by the input
        const uploadConverter = new FileReader(); //creates a new FileReader instance to read the above file

        //gets a reference to the sibling (grand-nephew?) preview image element in the container that recieved a file upload
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

        for (fileInput = 0; fileInput < allFileInputs.length; fileInput++) {
            allFileUploads.push(allFileInputs[fileInput].files[0]);
        }

        allFileUploads.forEach(fileUpload => {
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
        function determineImage() {
            let image; //variable to hold a reference to an image

            //checks if the current image input had a file uploaded to it
            if (allFileUploads[currentFileInput]) {
                //if a file was uploaded, set the source of the current object's image to the next unassigned image in the array
                image = fileNames[currentFileUpload];
                currentFileUpload++; //increase the index by 1 to indicate that +1 more image has been assigned to an object
            } else { //otherwise (i.e the current image input did not have a file uploaded), run the following;
                //gets a reference to the container housing the preview image for the current image input,
                //and the image already assigned to the current object (if it exists)
                const imageContainer = $(allFileInputs[currentFileInput]).siblings('.edit-page-image-container')[0];

                //checks if the above container has two children, i.e. an image is already assigned to the current
                //object item, and an <img> element to display the current image exists
                if ($(imageContainer).children().length === 2) {
                    //if such an image exists, keep the source file the same by setting it to the src of the already-assigned image
                    const imageContainerChildren = $(imageContainer).children()[1];
                    existingImageSRC = $($(imageContainerChildren).children()[2]).attr('src');

                    //an already-existing image with have an 'src' like './images/multer-uploads/image-upload-1697848850663-957708811'
                    //the below code splits it and takes the [3] index of the resulting array -> image-upload-1697848850663-957708811
                    image = existingImageSRC.split('/')[3];
                } else {
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

        const tripID = $('.trip-title-container').attr('data-id');
        const tripTitle = $('.trip-title-input').val();
        const tripStartDate = $('.trip-start-date-input').val();
        const tripEndDate = $('.trip-end-date-input').val();
        const titleCardImage = determineImage();

        console.log('title image name: ' + titleCardImage);

        const titleData = {
            id: tripID,
            title: tripTitle,
            start_date: tripStartDate,
            end_date: tripEndDate,
            image: titleCardImage
        };

        const sectionTitles = $('.section-title-input');
        let sectionData = [];

        for (section = 0; section < sectionTitles.length; section++) {
            const currentSectionData = {
                id: $(sectionTitles[section]).attr('data-id'),
                title: $(sectionTitles[section]).val()
            };
            sectionData.push(currentSectionData);
        }

        const itineraryItems = $('.itinerary-item-container');
        let itineraryData = [];

        for (itineraryItem = 0; itineraryItem < itineraryItems.length; itineraryItem++) {
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

            console.log('itinerary file #' + [itineraryItem] + ' name: ' + image);

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
            };
            //append the new itinerary item object to the array of itinerary item data
            itineraryData.push(currentItineraryItemData);
        }

        console.log(titleData);
        console.log(sectionData);
        console.log(itineraryData);

        const fetchAddress = `/api/trips/edit/${tripID}`;

        console.log(fetchAddress);

        //send the above title, section, & itinerary item data to the database for processing
        await fetch(fetchAddress, {
            method: 'PUT',
            body: JSON.stringify({titleData, sectionData, itineraryData}),
            headers: {'Content-Type': 'application/json'},
        });
    }

    async function deleteItineraryItem() {
        const itemID = $(this).parent().attr('data-id');

        const itemData = {
            id: itemID
        };

        try {
            await fetch('/api/trips/delete-item', {
                method: 'DELETE',
                body: JSON.stringify(itemData),
                headers: {'Content-Type': 'application/json'},
            });
        } catch (err) {
            console.log(err);
        }

        //removes parent itinerary item
        $(this).parent().remove();

        //updates deleteItineraryItemButtons & allFileInputs references to account for the deleted itinerary item
        deleteItineraryItemButtons = $('.delete-itinerary-item-button');
        allFileInputs = $('.user-uploaded-image');

        console.log(allFileInputs.length);
    }

    async function deleteTripSection() {
        const sectionID = $(this).siblings('.section-title-container').children().attr('data-id');

        console.log(this);
        console.log($(this).siblings('.section-title-container'));
        console.log($(this).siblings('.section-title-container').children());
        console.log($(this).parent()[0]);

        console.log(sectionID);

        const sectionData = {
            id: sectionID
        };

        console.log(sectionData);

        try {
            await fetch('/api/trips/delete-section', {
                method: 'DELETE',
                body: JSON.stringify(sectionData),
                headers: {'Content-Type': 'application/json'},
            });
        } catch (err) {
            console.log(err);
        }

        //removes parent section block
        $(this).parent().remove();

        //updates deleteSectionButtons & addItineraryItemButtons references to account for the deleted section
        deleteSectionButtons = $('.delete-itinerary-section-button');
        addItineraryItemButtons = $('.add-itinerary-item-button');

        console.log(addItineraryItemButtons.length);
        console.log(deleteSectionButtons.length);
    }

    function removeChosenImage() {
        $(this).siblings('img').attr('src', './images/no-image-stock-photo.png');
        $(this).parent().parent().siblings('.user-uploaded-image').val('');
    }

    function removeCurrentImage() {
        $(this).parent().remove();
    }

    async function addItineraryItem() {
        //retrieves the name of the category the user is attempting to add an itinerary item to
        const itineraryCategory = $(this).siblings('.item-category-title').text();

        //retrieves the ID of the section the user is attempting to add an itinerary item to
        const section_id = $(this).parent().parent().siblings('.section-title-container').children().attr('data-id');

        const newItemData = {
            category: itineraryCategory,
            trip_section_id: section_id
        };

        console.log(newItemData);

        let itemID;

        try {
            const response = await fetch('/api/trips/create-item', {
                method: 'POST',
                body: JSON.stringify(newItemData),
                headers: {'Content-Type': 'application/json'},
            });
            itemID = await response.json();
        } catch (err) {
            console.log(err);
        }

        const newItineraryItemHTML = `
        <div class = "itinerary-item-container" data-id = ${itemID}>

            <button class = "delete-itinerary-item-button">Delete Item</button>
        
            <h4>Title:</h4>
            <input class = "item-title">
        
            <h4>Title Link:</h4>
            <input class = "item-link">
        
            <h4>Start Date:</h4>
            <input class = "item-date-time item-start-date datepicker">
        
            <h4>Start Time:</h4>
            <input class = "item-date-time item-start-time timepicker">
        
            <h4>End Date:</h4>
            <input class = "item-date-time item-end-date datepicker">
        
            <h4>End Time:</h4>
            <input class = "item-date-time item-end-time timepicker">
        
            <h4>Cost:</h4>
            <input type = "number" class = "item-expense">
        
            <h4>Notes:</h4>
            <textarea class = "item-notes"></textarea>
        
            <h4>Choose an Image (up to 10 MB):</h4>
            <input type = "file" accept = "image/*" class = "user-uploaded-image">
        
            <div class = "edit-page-image-container">
        
            <div class = "edit-page-image-block">
        
                <button class = "clear-preview-image-button">Clear Chosen Image</button>
                <h4>Preview:</h4>
                <img class = "preview-image" src = './images/no-image-stock-photo.png'>
        
            </div>
        
            </div>
        </div>`;

        //adds new itinerary item to the current category
        const itemCategory = $(this).parent();
        itemCategory.append(newItineraryItemHTML);

        //gets reference to the newly-added itinerary item
        const newItineraryItem = itemCategory.children().last();

        //updates references to file inputs & delete itinerary item buttons to account for new itinerary item
        allFileInputs = $('.user-uploaded-image');
        deleteItineraryItemButtons = $('.delete-itinerary-item-button');

        //add appropriate event listeners to newly-created itinerary item elements
        const newFileInput = newItineraryItem.find('.user-uploaded-image');
        const newRemoveChosenImageButton = newItineraryItem.find('.clear-preview-image-button');
        const newDeleteItineraryItemButton = newItineraryItem.find('.delete-itinerary-item-button');
        newFileInput.on('change', renderPreviewImage);
        newRemoveChosenImageButton.on('click', removeChosenImage);
        newDeleteItineraryItemButton.on('click', deleteItineraryItem);

        //reapplies datepicker & timepicker functionality such that it applies to newly-created elements
        $('.timepicker').timepicker();
        $('.datepicker').datepicker({dateFormat: 'yy-mm-dd'});
    }

    async function addTripSection() {
        const trip_id = $(this).siblings('.trip-title-container').attr('data-id');
        console.log('trip ID: ' + trip_id);

        const newSectionData = {
            trip_id: trip_id
        };

        let sectionID;

        try {
            const response = await fetch('/api/trips/create-section', {
                method: 'POST',
                body: JSON.stringify(newSectionData),
                headers: {'Content-Type': 'application/json'},
            });
            sectionID = await response.json();
        } catch (err) {
            console.log(err);
        }

        const newSectionHTML = `
        <div class = "itinerary-section-container">

            <button class = "delete-itinerary-section-button">Delete Section</button>

            <div class = "section-title-container">

                <input class = "section-title-input" data-id = ${sectionID}>

            </div>

            <div class = "trip-categories-container">
            
                <div class = "trip-section-category">

                    <h3 class = "item-category-title">Transport</h3>
                    <button class = "add-itinerary-item-button">+</button>

                </div>
                
                <div class = "trip-section-category">

                    <h3 class = "item-category-title">Accommodation</h3>
                    <button class = "add-itinerary-item-button">+</button>

                </div>

                <div class = "trip-section-category">

                    <h3 class = "item-category-title">Food</h3>
                    <button class = "add-itinerary-item-button">+</button>

                </div>

                <div class = "trip-section-category">

                    <h3 class = "item-category-title">Activities</h3>
                    <button class = "add-itinerary-item-button">+</button>

                </div>

                <div class = "trip-section-category">

                    <h3 class = "item-category-title">Misc</h3>
                    <button class = "add-itinerary-item-button">+</button>

                </div>
            </div>
        </div>`;

        //adds new itinerary item to the current category
        const sectionsContainer = $(this).siblings('.trip-sections-container');
        sectionsContainer.append(newSectionHTML);

        //updates 'add itinerary items' & 'delete trip section' button references to include new section
        deleteSectionButtons = $('.delete-itinerary-section-button');
        addItineraryItemButtons = $('.add-itinerary-item-button');

        //gets a reference to the newly-added section
        const newSection = sectionsContainer.children().last();

        //adds event listener functionality to new section buttons
        const newAddItineraryItemButtons = newSection.find('.add-itinerary-item-button');
        const newDeleteSectionButton = newSection.find('.delete-itinerary-section-button');
        newDeleteSectionButton.on('click', deleteTripSection);
        newAddItineraryItemButtons.on('click', addItineraryItem);
    }

    //event listener for when a change is made using the input a user uses to upload an image file
    allFileInputs.on('change', renderPreviewImage);

    //prevents page from redirecting when itinerary data is saved & form is submitted
    multerSubmissionForm.on('submit', (event) => event.preventDefault());

    saveItineraryButton.on('click', saveItineraryData);
    addItineraryItemButtons.on('click', addItineraryItem);
    deleteItineraryItemButtons.on('click', deleteItineraryItem);
    addTripSectionButton.on('click', addTripSection);
    deleteSectionButtons.on('click', deleteTripSection);
    removeChosenImageButton.on('click', removeChosenImage);
    removeCurrentImageButton.on('click', removeCurrentImage);

    //applies datepicker & timepicker widgets to the appropriate input fields once the document is finished loading
    $('.timepicker').timepicker();
    $('.datepicker').datepicker({dateFormat: 'yy-mm-dd'});
};