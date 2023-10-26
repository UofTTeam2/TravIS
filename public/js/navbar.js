document.addEventListener("DOMContentLoaded", function() {
    // Botones y contenedor
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('registerChange');
    const logBtn = document.getElementById('loginChange');

    if (container && registerBtn && logBtn) {
        // Check URL hash
        if (window.location.hash === "#signup") {
            container.classList.add("active");
        } else if (window.location.hash === "#login") {
            container.classList.remove("active");
        }
        registerBtn.addEventListener('click', () => {
            container.classList.add("active");
        });
    
        logBtn.addEventListener('click', () => {
            container.classList.remove("active");
        });
    }

});