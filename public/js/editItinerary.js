//waits until window is finished loading before running code
window.onload = () => {

    const userChosenImage = $('.user-uploaded-image'); //gets a reference to all inputs used for uploading a file

    //event listener for when a change is made using the input a user uses to upload an image file
    userChosenImage.on('change', function() {
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
    });

    //applies datepicker & timepicker widgets to the appropriate input fields once the document is finished loading
    $('.timepicker').timepicker();
    $('.datepicker').datepicker();
};