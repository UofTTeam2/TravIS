// Desc: Creating fetch request to delete and update user
// =============================================================

// Creating a function to handle the error message
// if the user's login/signup is unsuccessful, using a modal
// =========================================================
displayErrorModal = (errorMessage) => {
    const modal = document.querySelector('#errorModal');
    const modalContent = document.querySelector('#modalErrorMessage');
    const closeModalButton = document.querySelector('#closeModal');

    let errorDetails;

    //adds additional error details depending on the type of error
    if (errorMessage === 'SequelizeValidationError') {
        errorDetails = 'Note that your username must be alphanumeric & 3-30 characters long. Additionally, your password must be at least 8 characters long, and contain at least 1 letter & number.';
    } else if (errorMessage === 'SequelizeUniqueConstraintError') {
        errorDetails = 'Your chosen username and / or email is already in use.';
    } else {
        errorDetails = errorMessage;
    }

    modal.style.display = 'block';
    modalContent.textContent = `Error: ${errorDetails}`;

    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
};
// =========================================================

// A function to handle the delete user button
// =============================================================
const delUserHandler = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/users/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        document.location.replace('/');
    } else {
        //adding an error message if the user's deletion request is unsuccessful
        const errorData = await response.json();
        const errorMessage = errorData.message;
        displayErrorModal(errorMessage);
    }
};
// =============================================================

// A function to handle the update user button
// =============================================================
const updateUserHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#updateUsername').value.trim();
    const password = document.querySelector('#updatePassword').value.trim();

    if (!username || !password) {
        return;
    }

    const response = await fetch('/api/users/', {
        method: 'PUT',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
    });

    //if the user's data was successfully updated, they will subsequently be logged out
    //thus, reroute them to the login page if the PUT request went through
    if (response.ok) {
        document.location.replace('/login');
    } else {
        //adding an error message if the user's signup is unsuccessful
        const errorData = await response.json();
        const errorMessage = errorData.name;
        displayErrorModal(errorMessage);
    }
};
// =============================================================

// Event listeners
// =============================================================
document.querySelector('#deleteUser').addEventListener('click', delUserHandler);
document.querySelector('#updateUser').addEventListener('click', updateUserHandler);