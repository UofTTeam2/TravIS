//waits until window is finished loading before running main code
window.onload = () => {
    const openSettingsButton = $('.open-menu-button');
    const settingsModal = $('.settings-modal');
    const closeSettingsButton = $('.itinerary-settings-close');
    const switchToEditModeButton = $('.edit-itinerary-button');
    const publicToggleSwitch = $('.public-checkbox');

    function openMenu() {
        //modal moment!
        console.log('modal button clicked!');
        settingsModal.attr('style', 'display: block');
    }

    function switchToEditMode() {
        const tripID = $(this).parent().siblings('.trip-title-container').attr('data-id');
        console.log(tripID);

        const redirectAddress = `/trips/edit/${tripID}`;
        console.log(redirectAddress);

        window.location.pathname = redirectAddress;
    }

    openSettingsButton.on('click', openMenu);
    switchToEditModeButton.on('click', switchToEditMode);

    closeSettingsButton.on('click', function() {
        settingsModal.attr('style', 'display: none');
    });

    publicToggleSwitch.on('click', function() {
        console.log(publicToggleSwitch[0].checked);
    });

    //if the user clicks outside the settings modal, close the modal
    window.onclick = function(event) {
        if (event.target === settingsModal[0]) {
            settingsModal.attr('style', 'display: none');
        }
    };
};