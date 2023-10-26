// Initiate logout process
// purpose: to log out the user and redirect to the homepage
//==============================================================

// Creating a function to handle the error message
// if the user's login/signup is unsuccessful, using a modal
//==============================================================
displayErrorModal = (errorMessage) => {
    const modal = document.querySelector('#errorModal');
    const modalContent = document.querySelector('#modalErrorMessage');
    const modalDetails = document.querySelector('#modalErrorDetails');
    const closeModalButton = document.querySelector('#closeModal');

    let errorDetails;

    //adds additional error details depending on the type of error
    if (errorMessage === 'SequelizeValidationError') {
        errorDetails = 'Note that your username must be alphanumeric & 3-30 characters long. Additionally, your password must be at least 8 characters long, and contain at least 1 letter & number.';
    } else if (errorMessage === 'SequelizeUniqueConstraintError') {
        errorDetails = 'Your chosen username and / or email is already in use.';
    } else {
        errorDetails = '';
    }

    modal.style.display = 'block';
    modalContent.textContent = `Error: ${errorMessage}`;
    modalDetails.textContent = errorDetails;

    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
};

logout = async () => {
    console.log('attempting to log out');
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        //if the logout is unsuccessful, display an error message
        const errorMessage = 'Failed to log out';
        displayErrorModal(errorMessage);
    }
};
//==============================================================

// Adding an event listener to the logout button
//==============================================================
document.querySelector('#logOut').addEventListener('click', logout);
