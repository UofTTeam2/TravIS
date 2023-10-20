document.addEventListener("DOMContentLoaded", function() {
    // For Login Page
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('registerChange');
    const logBtn = document.getElementById('loginChange');

    if (container && registerBtn && logBtn) {
        registerBtn.addEventListener('click', () => {
            container.classList.add("active");
        });

        logBtn.addEventListener('click', () => {
            container.classList.remove("active");
        });
    }

    // For Index Page
    const toggler = document.querySelector(".toggler");
    const navMenu = document.querySelector("#navMenu");
    const scroll = document.getElementById("scroll");

    if (toggler && navMenu) {
        toggler.addEventListener('click', function () {
            navMenu.classList.toggle("active");
        });
    }

    if (scroll) {
        scroll.addEventListener('click', () => {
            document.querySelector(".about-us").scrollIntoView({ behavior: 'smooth' });
        });
    }

    const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        window.location.href = "login.html";
    });
}
});
