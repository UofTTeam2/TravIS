console.log("Login script loaded!");
// Initiated by: login.handlebars
// Purpose: This file is used to handle the login and signup forms on the login.handlebars page. It is used to send the user's input to the server to be validated and then redirect the user to the homepage if the login/signup is successful. If the login/signup is unsuccessful, the user will be alerted with a message.
//==============================================================

// Creating a function to handle the error message
// if the user's login/signup is unsuccessful, using a modal
// =========================================================
displayErrorModal = (errorMessage) => {
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
// =========================================================

// Creating functions to handle the login and signup forms
// =========================================================
const loginHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#emailLogin').value.trim();
    const password = document.querySelector('#passwordLogin').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            //adding an error message if the user's login is unsuccessful
            const errorData = await response.json();
            console.log(errorData);
            const errorMessage = errorData.name;
            displayErrorModal(errorMessage);
        }
    }
};

const signupHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#usernameSignup').value.trim();
    const email = document.querySelector('#emailSignup').value.trim();
    const password = document.querySelector('#passwordSignup').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            //adding an error message if the user's signup is unsuccessful
            const errorData = await response.json();
            const errorMessage = errorData.name;
            displayErrorModal(errorMessage);
        }
    }
};
// =========================================================

// Get request to get response from server to render login/signup page
// =========================================================
const getLogin = async () => {
    try {
        const response = await fetch('/login', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/login');
        } else {
            console.log(response.statusText);
        }
    } catch (err) {
        console.error('An error occurred:', err);
    }
};

const getSignup = async () => {
    try {
        const response = await fetch('/signup', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/signup');
        } else {
            console.log(response.statusText);
        }
    } catch (err) {
        console.error('An error occurred:', err);
    }
};
// =========================================================

// Event listeners
// =========================================================
document.querySelector('.loginForm').addEventListener('submit', loginHandler);
document.querySelector('.signupForm').addEventListener('submit', signupHandler);
document.querySelector('#loginBtn').addEventListener('click', getLogin);
document.querySelector('#signupBtn').addEventListener('click', getSignup);
