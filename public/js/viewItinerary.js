//waits until window is finished loading before running main code
window.onload = () => {
    //gets references to elements necessary for application functionality
    const openSettingsButton = $('.open-menu-button');
    const settingsModal = $('.settings-modal');
    const closeSettingsButton = $('.itinerary-settings-close');
    const switchToEditModeButton = $('.edit-itinerary-button');
    const publicToggleSwitch = $('.public-checkbox');
    const publicAddressContainer = $('.public-address-container');
    const publicAddressLink = $('.public-address');

    //retrieves trip ID
    const tripID = $('.trip-title-container').attr('data-id');

    //if a trip is set to public, the 'public' switch will be on by default
    if (publicToggleSwitch[0].checked) {
        publicAddressLink.text(window.location.hostname + `/trips/public-view/${tripID}`); //constructs full link to public itinerary page
        publicAddressLink.attr('href', `/trips/public-view/${tripID}`); //creates link to public itinerary page
        publicAddressContainer.attr('style', 'display: block'); //displays link to public itinerary page
    }

    //function to open the settings menu modal
    function openMenu() {
        settingsModal.attr('style', 'display: block');
    }

    //function to switch to edit mode
    function switchToEditMode() {
        //redirects to the matching edit page for the current trip
        const redirectAddress = `/trips/edit/${tripID}`;
        window.location.pathname = redirectAddress;
    }

    //function to update the public status of a trip
    async function updatePublicStatus() {
        //checks if the 'public' switch is on or off
        //if it is checked, public = true, otherwise, public = false
        const public = publicToggleSwitch[0].checked;

        if (public) { //if the switch is toggled on;
            publicAddressLink.text(window.location.hostname + `/trips/public-view/${tripID}`); //constructs full link to public itinerary page
            publicAddressLink.attr('href', `/trips/public-view/${tripID}`); //creates link to public itinerary page
            publicAddressContainer.attr('style', 'display: block'); //displays link to public itinerary page
        } else {
            publicAddressContainer.attr('style', 'display: none'); //otherwise, hide the link to the public itinerary page
        }

        const newPublicData = {
            id: tripID,
            public: public
        };

        //attempt to update the trip's public status in the database
        try {
            await fetch('/api/trips/update-public', {
                method: 'POST',
                body: JSON.stringify(newPublicData),
                headers: {'Content-Type': 'application/json'},
            });
        } catch (err) {
            console.log(err);
        }
    }

    openSettingsButton.on('click', openMenu);
    switchToEditModeButton.on('click', switchToEditMode);

    //if the user clicks the 'close' button on the settings modal, it closes the modal
    closeSettingsButton.on('click', function() {
        settingsModal.attr('style', 'display: none');
    });

    //updates the public status of the trip whenever the toggle is clicked
    publicToggleSwitch.on('click', updatePublicStatus);

    //if the user clicks outside the settings modal, close the modal
    window.onclick = function(event) {
        if (event.target === settingsModal[0]) {
            settingsModal.attr('style', 'display: none');
        }
    };
};