// Initiate logout process
// purpose: to log out the user and redirect to the homepage
//==============================================================

// Creating a function to handle the error message
// if the user's login/signup is unsuccessful, using a modal
//==============================================================
const displayErrorModal = (errorMessage) => {
    const modal = document.querySelector('#errorModal');
    const modalContent = document.querySelector('#modalErrorMessage');
    const closeModalButton = document.querySelector('#closeModal');

    modal.style.display = 'block';
    modalContent.textContent = errorMessage;

    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
};

const logout = async () => {
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
document.querySelector('#logout').addEventListener('click', logout);
