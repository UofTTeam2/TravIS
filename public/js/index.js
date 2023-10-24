document.addEventListener("DOMContentLoaded", function() {
   

    // For Index Page
    const toggler = document.querySelector(".toggler");
    const navMenu = document.querySelector("#navMenu");
    const scroll = document.getElementById("scroll");

    if (toggler && navMenu) {
        toggler.addEventListener('click', function () {
            console.log("Toggler clicked!");
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
        window.location.href = "login#login";
    });
}
const signupBtn = document.getElementById("signupBtn");

if (signupBtn) {
    signupBtn.addEventListener('click', () => {
        window.location.href = "login#signup"; // Append #signup to the URL to distinguish between login and signup
    });
}

});
