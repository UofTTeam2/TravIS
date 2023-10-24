// Initiated by: login.handlebars
// Purpose: This file is used to handle the login and signup forms on the login.handlebars page. It is used to send the user's input to the server to be validated and then redirect the user to the homepage if the login/signup is successful. If the login/signup is unsuccessful, the user will be alerted with a message.
//==============================================================

// Creating a function to handle the error message
// if the user's login/signup is unsuccessful, using a modal
// =========================================================
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
            const responseData = await response.json();
            const message = responseData.message.value;
            displayErrorModal(message);
            setTimeout(() => {
                document.location.replace('/');
            }, 3000);
        } else {
            //adding an error message if the user's login is unsuccessful
            const errorData = await response.json();
            const errorMessage = errorData.message.value;
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
            const responseData = await response.json();
            const message = responseData.message.value;
            displayErrorModal(message);
            setTimeout(() => {
                document.location.replace('/');
            }, 3000);
        } else {
            //adding an error message if the user's signup is unsuccessful
            const errorData = await response.json();
            const errorMessage = errorData.message.value;
            displayErrorModal(errorMessage);
        }
    }
};
// =========================================================

// Get request to get response from server to render login/signup page
// =========================================================
const getLogin = async () => {
    const response = await fetch('/login', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/login');
    }
};

const getSignup = async () => {
    const response = await fetch('/signup', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/signup');
    }
};
// =========================================================

// Event listeners
// =========================================================
document.querySelector('.loginForm').addEventListener('submit', loginHandler);
document.querySelector('.signupForm').addEventListener('submit', signupHandler);
document.querySelector('#loginBtn').addEventListener('click', getLogin);
document.querySelector('#signupBtn').addEventListener('click', getSignup);
