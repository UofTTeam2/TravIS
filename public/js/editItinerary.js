//waits until window is finished loading before running main code
window.onload = () => {
    //gets references to all elements necessary for application functionality
    const multerSubmissionForm = $('.multer-submission-form');
    const saveItineraryButton = $('.save-itinerary-button');
    const confirmationModal = $('.confirmation-modal');
    const confirmationYesButton = $('.confirmation-yes-button');
    const confirmationNoButton = $('.confirmation-no-button');
    const imageUploadErrorModal = $('.image-upload-error-modal');
    const imageUploadErrorMessage = $('.upload-error-message');
    const closeImageErrorModalButton = $('.image-upload-error-close');
    const addTripSectionButton = $('.create-new-section-button');
    const sectionsContainer = $('.trip-sections-container');
    let deleteSectionButtons = $('.delete-itinerary-section-button');
    let deleteItineraryItemButtons = $('.delete-itinerary-item-button');
    let addItineraryItemButtons = $('.add-itinerary-item-button');
    let allFileInputs = $('.user-uploaded-image');
    let removeChosenImageButton = $('.clear-preview-image-button');
    let removeCurrentImageButton = $('.clear-current-image-button');
    const tripID = $('.trip-title-container').attr('data-id');

    //variable to count how many itinerary items have been added to the page in this visit
    //used to assign unique IDs to each item input such that they can be associated with a specific label element
    let addedItemCount = 0;

    //function to display an error modal if the user uploads an invalid file to an image input
    function openImageErrorModal(error) {
        imageUploadErrorMessage.text(error);
        imageUploadErrorModal.attr('style', 'display: block');
    }

    //function to render a preview image of a file chosen by a user before it is uploaded to the database
    function renderPreviewImage() {
        const fileUpload = this.files[0]; //gets a reference to the file held by the input

        //checks if file is smaller than 10 MB, displays an error and clears the file otherwise
        if (fileUpload.size > 10485760) {
            openImageErrorModal('File must be smaller than 10 MB');
            $(this).val('');
            return;
        }

        //checks if file is an image, displays an error and clears the file otherwise
        if (!fileUpload.type.match('image.*')) {
            openImageErrorModal('File must be an image');
            $(this).val('');
            return;
        }

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

    //checks each file input to see if there is already an image attached (i.e. the user attached an image & refreshed the page)
    //note; this only applies to Firefox & similar browsers; on Chrome & the like, all attached files are automatically cleared
    allFileInputs.each(function() {
        if (this.files[0]) {
            renderPreviewImage.call(this);
        }
    });

    //function to save the itinerary's date to the database
    async function saveItineraryData() {
        let allFileUploads = []; //array to hold all files uploaded by user
        let formData = new FormData(); //new FormData to be used to upload files via multer

        //appends each uploaded file to the file array
        for (fileInput = 0; fileInput < allFileInputs.length; fileInput++) {
            allFileUploads.push(allFileInputs[fileInput].files[0]);
        }

        //appends each file upload to the new form data
        allFileUploads.forEach(fileUpload => {
            formData.append('image-upload', fileUpload);
        });

        let fileNames; //variable to hold array of file names

        //attempts to upload files to server via multer
        try {
            const response = await fetch('/api/trips/image', {
                method: 'POST',
                body: formData
            });
            fileNames = await response.json(); //recieves list of uploaded file names in response
        } catch (err) {
            console.log(err);
        }

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
                console.log(imageContainer);

                //checks if the above container has two children, i.e. an image is already assigned to the current
                //object item, and an <img> element to display the current image exists
                if ($(imageContainer).children().length === 2) {
                    //if such an image exists, keep the source file the same by setting it to the src of the already-assigned image
                    const imageContainerChildren = $(imageContainer).children()[1];
                    console.log(imageContainerChildren);
                    existingImageSRC = $($(imageContainerChildren).children()[1]).attr('src');

                    //an already-existing image with have an 'src' like '/images/multer-uploads/image-upload-1697848850663-957708811'
                    //the below code splits it and takes the [3] index of the resulting array -> image-upload-1697848850663-957708811
                    image = existingImageSRC.split('/')[3];
                } else {
                    //otherwise (i.e. an image was not selected by the user, and there is not an image already assigned),
                    //set the image to be an empty string, indicating that there is no image
                    image = '';
                }
            }

            currentFileInput++; //increase the file input index by 1, to indicate that +1 more file inputs have been accounted for
            return image; //return the appropriate image reference
        }

        //defines constants for trip title data
        const tripTitle = $('.trip-title-input').val();
        const tripStartDate = $('.trip-start-date').val();
        const tripEndDate = $('.trip-end-date').val();
        const titleCardImage = determineImage();

        //constructs an object using trip title data
        const titleData = {
            id: tripID,
            title: tripTitle,
            start_date: tripStartDate,
            end_date: tripEndDate,
            image: titleCardImage
        };

        const sectionTitles = $('.section-title-input'); //gets a reference to all section title inputs
        let sectionData = []; //initalizes array to hold all section data

        //constructs an object for each section of the trip, and adds them to the above array
        for (section = 0; section < sectionTitles.length; section++) {
            const currentSectionData = {
                id: $(sectionTitles[section]).attr('data-id'),
                title: $(sectionTitles[section]).val()
            };
            sectionData.push(currentSectionData);
        }

        const itineraryItems = $('.itinerary-item-container'); //gets a reference to all itinerary items
        let itineraryData = []; //initializes array to hold all itinerary item data

        //constructs an object for each itinerary item of the trip, and adds them to the above array
        for (itineraryItem = 0; itineraryItem < itineraryItems.length; itineraryItem++) {
            const id = $(itineraryItems[itineraryItem]).attr('data-id');
            const title = $(itineraryItems[itineraryItem]).children('.item-title');
            const link = $(itineraryItems[itineraryItem]).children('.item-link');
            const start_date = $(itineraryItems[itineraryItem]).children('.item-start-date');
            const start_time = $(itineraryItems[itineraryItem]).children('.item-start-time');
            const end_date = $(itineraryItems[itineraryItem]).children('.item-end-date');
            const end_time = $(itineraryItems[itineraryItem]).children('.item-end-time');
            const expenseInput = $(itineraryItems[itineraryItem]).children('.item-expense').val();
            const notes = $(itineraryItems[itineraryItem]).children('.item-notes');
            const image = determineImage();

            const expenseValue = parseFloat(expenseInput); //attempts to convert the string retrieve the expense input to a float

            let expense; //variable to hold expense of itinerary item

            //if the string was not able to be parsed, set the expense to $0
            if (isNaN(expenseValue)) {
                expense = 0;
            } else { //otherwise, set the expense to the parsed float
                expense = expenseValue;
            }

            //construct a new itinerary item object based on the current itinerary item's data
            const currentItineraryItemData = {
                id: id,
                title: title.val(),
                link: link.val(),
                start_date: start_date.val(),
                start_time: start_time.val(),
                end_date: end_date.val(),
                end_time: end_time.val(),
                expense: expense,
                notes: notes.val(),
                image: image
            };
            //append the new itinerary item object to the array of itinerary item data
            itineraryData.push(currentItineraryItemData);
        }

        //constructs fetch address to update the current trip using the trip's ID
        const fetchAddress = `/api/trips/edit/${tripID}`;

        let redirectAddress; //variable to hold address to redirect to

        //send the above title, section, & itinerary item data to the database for processing
        //receives an address to redirect to as a response
        try {
            const response = await fetch(fetchAddress, {
                method: 'PUT',
                body: JSON.stringify({titleData, sectionData, itineraryData}),
                headers: {'Content-Type': 'application/json'},
            });
            redirectAddress = await response.json(); //receives redirect address from back end
        } catch (err) {
            console.log(err);
        }

        //redirects page to the appropriate address to view the updated itinerary page
        window.location.pathname = redirectAddress;
    }

    //function to delete an itinerary item
    async function deleteItineraryItem(item) {
        const itemID = $(item).parent().attr('data-id'); //retrieves the ID of the itinerary item to delete

        const itemData = {
            id: itemID
        };

        //attempts to delete the itinerary item
        try {
            await fetch('/api/trips/delete-item', {
                method: 'DELETE',
                body: JSON.stringify(itemData),
                headers: {'Content-Type': 'application/json'},
            });
        } catch (err) {
            console.log(err);
        }

        //removes parent itinerary item from the page
        $(item).parent().remove();

        //hides deletion confirmation modal
        confirmationModal.attr('style', 'display: none');

        //updates deleteItineraryItemButtons & allFileInputs references to account for the deleted itinerary item
        deleteItineraryItemButtons = $('.delete-itinerary-item-button');
        allFileInputs = $('.user-uploaded-image');
    }

    //function to delete an itinerary section
    async function deleteTripSection(section) {
        const sectionID = $(section).siblings('.section-title-container').children().attr('data-id'); //retrieves ID of section to delete

        const sectionData = {
            id: sectionID
        };

        //attempts to delete section
        try {
            await fetch('/api/trips/delete-section', {
                method: 'DELETE',
                body: JSON.stringify(sectionData),
                headers: {'Content-Type': 'application/json'},
            });
        } catch (err) {
            console.log(err);
        }

        //removes parent section block from page
        $(section).parent().remove();

        //hides deletion confirmation modal
        confirmationModal.attr('style', 'display: none');

        //updates deleteSectionButtons & addItineraryItemButtons references to account for the deleted section
        deleteSectionButtons = $('.delete-itinerary-section-button');
        addItineraryItemButtons = $('.add-itinerary-item-button');
    }

    //function to open the deletion confirmation modal for a section / itinerary item
    function openDeletionModal(objectType, object) {
        //removes any already-existing event listeners from modal's 'Yes' button
        confirmationYesButton.off();

        //sets the type of deletion operation based on what type of delete button was clicked
        if (objectType === 'item') {
            confirmationYesButton.on('click', function() {
                deleteItineraryItem(object);
            });
        } else {
            confirmationYesButton.on('click', function() {
                deleteTripSection(object);
            });
        }

        //displays the confirmation modal
        confirmationModal.attr('style', 'display: block');
    }

    //function to remove the currently-chosen image for an object
    function removeChosenImage() {
        $(this).siblings('img').attr('src', '/images/no-image-stock-photo.png'); //resets the preview image to the stock photo
        $(this).parent().parent().siblings('.user-uploaded-image').val(''); //clears the appropriate input's file
    }

    //function to remove the image element displaying an object's currently assigned image
    function removeCurrentImage() {
        $(this).parent().remove(); //removes the parent image element from the page
    }

    //function to create a new itinerary item
    async function addItineraryItem() {
        //retrieves the name of the category the user is attempting to add an itinerary item to
        const itineraryCategory = $(this).siblings('.item-category-title').text();

        //retrieves the ID of the section the user is attempting to add an itinerary item to
        const section_id = $(this).parent().parent().parent().siblings('.section-title-container').children().attr('data-id');

        const newItemData = {
            category: itineraryCategory,
            trip_section_id: section_id
        };

        let itemID; //variable to hold the new item's ID

        //attempts to add the new item to the database
        try {
            const response = await fetch('/api/trips/create-item', {
                method: 'POST',
                body: JSON.stringify(newItemData),
                headers: {'Content-Type': 'application/json'},
            });
            itemID = await response.json(); //receives the new item's ID
        } catch (err) {
            console.log(err);
        }

        //creates a new itinerary item, with the appropriate ID as a data-attribute
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
        
            <input type = "file" accept = "image/*" class = "user-uploaded-image" id = "newFileInput${addedItemCount}" style = "display: none;">
            <label for = "newFileInput${addedItemCount}" class = "custom-file-upload">Choose File</label>
        
            <div class = "edit-page-image-container">
        
                <div class = "edit-page-image-block">
            
                <h4>Preview:</h4>
                <img class = "preview-image" src = '/images/no-image-stock-photo.png'>
                <button class = "clear-preview-image-button">Clear Chosen Image</button>
            
                </div>
        
            </div>
        </div>`;

        //adds new itinerary item to the current category
        const itemCategory = $(this).parent().parent();
        itemCategory.append(newItineraryItemHTML);

        //increase counter for number of items added by 1
        addedItemCount += 1;

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
        newDeleteItineraryItemButton.on('click', function() {
            openDeletionModal('item', this);
        });

        //reapplies datepicker & timepicker functionality such that it applies to newly-created elements
        $('.timepicker').timepicker();
        $('.datepicker').datepicker({dateFormat: 'yy-mm-dd'});
    }

    //function to add a new trip section
    async function addTripSection() {
        const newSectionData = {
            trip_id: tripID
        };

        let sectionID; //variable to hold the new section's ID

        //attempts to add new section to the database
        try {
            const response = await fetch('/api/trips/create-section', {
                method: 'POST',
                body: JSON.stringify(newSectionData),
                headers: {'Content-Type': 'application/json'},
            });
            sectionID = await response.json(); //receives new section's ID
        } catch (err) {
            console.log(err);
        }

        //constructs a new trip section using the appropriate section ID as a data-attribute
        const newSectionHTML = `
        <div class = "itinerary-section-container">

            <button class = "delete-itinerary-section-button">Delete Section</button>

            <div class = "section-title-container">

                <input class = "section-title-input" data-id = ${sectionID}>

            </div>

            <div class = "trip-categories-container">
            
                <div class = "trip-section-category">

                    <div class = "category-title-add-button-container">    

                        <h3 class = "item-category-title edit-title">Transportation</h3>
                        <button class = "add-itinerary-item-button"><span class="material-symbols-outlined">add</span></button>
                    
                    </div>
                </div>

                <div class = "trip-section-category">

                    <div class = "category-title-add-button-container">

                        <h3 class = "item-category-title edit-title">Accommodation</h3>
                        <button class = "add-itinerary-item-button"><span class="material-symbols-outlined">add</span></button>

                    </div>
                </div>

                <div class = "trip-section-category">

                    <div class = "category-title-add-button-container">
                    
                        <h3 class = "item-category-title edit-title">Food</h3>
                        <button class = "add-itinerary-item-button"><span class="material-symbols-outlined">add</span></button>

                    </div>
                </div>

                <div class = "trip-section-category">

                    <div class = "category-title-add-button-container">
                    
                        <h3 class = "item-category-title edit-title">Activities</h3>
                        <button class = "add-itinerary-item-button"><span class="material-symbols-outlined">add</span></button>

                    </div>
                </div>

                <div class = "trip-section-category">

                    <div class = "category-title-add-button-container">
                    
                        <h3 class = "item-category-title edit-title">Misc</h3>
                        <button class = "add-itinerary-item-button"><span class="material-symbols-outlined">add</span></button>

                    </div>
                </div>
            </div>
        </div>`;

        //adds new section to the sections container
        sectionsContainer.append(newSectionHTML);

        //updates 'add itinerary items' & 'delete trip section' button references to include new section
        deleteSectionButtons = $('.delete-itinerary-section-button');
        addItineraryItemButtons = $('.add-itinerary-item-button');

        //gets a reference to the newly-added section
        const newSection = sectionsContainer.children().last();

        //adds event listener functionality to new section buttons
        const newAddItineraryItemButtons = newSection.find('.add-itinerary-item-button');
        const newDeleteSectionButton = newSection.find('.delete-itinerary-section-button');
        newAddItineraryItemButtons.on('click', addItineraryItem);
        newDeleteSectionButton.on('click', function() {
            openDeletionModal('section', this);
        });
    }

    //event listener for when a change is made using the input a user uses to upload an image file
    allFileInputs.on('change', renderPreviewImage);

    //prevents page from redirecting when itinerary data is saved & form is submitted
    multerSubmissionForm.on('submit', (event) => event.preventDefault());

    saveItineraryButton.on('click', saveItineraryData);
    addItineraryItemButtons.on('click', addItineraryItem);
    addTripSectionButton.on('click', addTripSection);
    removeChosenImageButton.on('click', removeChosenImage);
    removeCurrentImageButton.on('click', removeCurrentImage);

    //initiates confirmation before deleting an itinerary item
    deleteItineraryItemButtons.on('click', function() {
        openDeletionModal('item', this);
    });

    //initiates confirmation before deleting an itinerary section
    deleteSectionButtons.on('click', function() {
        openDeletionModal('section', this);
    });

    //if the user clicks the modal's 'No' button, hides the confirmation modal
    confirmationNoButton.on('click', function() {
        confirmationModal.attr('style', 'display: none');
    });

    //if the user clicks the small 'x' in the top right of the image upload error modal, close the modal
    closeImageErrorModalButton.on('click', function() {
        imageUploadErrorModal.attr('style', 'display: none');
    });

    //if the user clicks outside a modal, close the modal
    window.onclick = function(event) {
        if (event.target === confirmationModal[0] || event.target === imageUploadErrorModal[0]) {
            confirmationModal.attr('style', 'display: none');
            imageUploadErrorModal.attr('style', 'display: none');
        }
    };

    //applies datepicker & timepicker widgets to the appropriate input fields once the document is finished loading
    $('.timepicker').timepicker();
    $('.datepicker').datepicker({dateFormat: 'yy-mm-dd'});
};