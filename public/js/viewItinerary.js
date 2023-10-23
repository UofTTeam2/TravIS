//waits until window is finished loading before running main code
window.onload = () => {
    const openSettingsButton = $('.open-menu-button');
    const switchToEditModeButton = $('.edit-itinerary-button');

    function openMenu() {
        //modal moment!
    }

    function switchToEditMode() {
        const tripID = $(this).siblings('.trip-title-container').attr('data-id');
        console.log(tripID);

        const redirectAddress = `/trips/edit/${tripID}`;
        console.log(redirectAddress);

        window.location.pathname = redirectAddress;
    }

    openSettingsButton.on('click', openMenu);
    switchToEditModeButton.on('click', switchToEditMode);
};