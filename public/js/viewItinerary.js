//waits until window is finished loading before running main code
window.onload = () => {
    const openSettingsButton = $('.open-menu-button');
    const settingsModal = $('.settings-modal');
    const closeSettingsButton = $('.itinerary-settings-close');
    const switchToEditModeButton = $('.edit-itinerary-button');
    const publicToggleSwitch = $('.public-checkbox');
    const publicAddressContainer = $('.public-address-container');
    const publicAddressLink = $('.public-address');
    const tripID = $('.trip-title-container').attr('data-id');

    if (publicToggleSwitch[0].checked) {
        publicAddressLink.text(window.location.hostname + `/trips/public-view/${tripID}`);
        publicAddressLink.attr('href', `/trips/public-view/${tripID}`);
        publicAddressContainer.attr('style', 'display: block');
    }

    function openMenu() {
        //modal moment!
        console.log('modal button clicked!');
        settingsModal.attr('style', 'display: block');
    }

    function switchToEditMode() {
        console.log(tripID);

        const redirectAddress = `/trips/edit/${tripID}`;
        console.log(redirectAddress);

        window.location.pathname = redirectAddress;
    }

    async function updatePublicStatus() {
        const public = publicToggleSwitch[0].checked;
        console.log(public);

        if (public) {
            publicAddressLink.text(window.location.hostname + `/trips/public-view/${tripID}`);
            publicAddressLink.attr('href', `/trips/public-view/${tripID}`);
            publicAddressContainer.attr('style', 'display: block');
        } else {
            publicAddressContainer.attr('style', 'display: none');
        }

        const newPublicData = {
            id: tripID,
            public: public
        };

        console.log(newPublicData);

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

    closeSettingsButton.on('click', function() {
        settingsModal.attr('style', 'display: none');
    });

    publicToggleSwitch.on('click', updatePublicStatus);

    //if the user clicks outside the settings modal, close the modal
    window.onclick = function(event) {
        if (event.target === settingsModal[0]) {
            settingsModal.attr('style', 'display: none');
        }
    };
};