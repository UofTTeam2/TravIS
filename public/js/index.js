console.log('aquí el index');
document.addEventListener('DOMContentLoaded', function () {
    // Lógica para el menú de navegación
    const scroll = document.getElementsByClassName('scroll');

    console.log(scroll);

    if (scroll) {
        $(scroll).on('click', () => {
            document.querySelector('.about-us').scrollIntoView({ behavior: 'smooth' });
        });
    }

    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            window.location.href = 'login#login';
        });
    }

    const signupBtn = document.getElementById('signupBtn');
    if (signupBtn) {
        signupBtn.addEventListener('click', () => {
            window.location.href = 'login#signup';
        });
    }
});