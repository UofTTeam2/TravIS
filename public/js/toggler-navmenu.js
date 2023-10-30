console.log('aquí el index');
document.addEventListener('DOMContentLoaded', function () {
    // Lógica para el menú de navegación
    const toggler = document.querySelector('.toggler');
    const navMenu = document.querySelector('#navMenu');
    const altLinks = document.querySelector('.alt-nav-links');

    if (toggler && navMenu) {
        console.log('Toggler and navMenu exist.');
        toggler.addEventListener('click', function () {
            console.log('Toggler clicked.');
            navMenu.classList.toggle('active');
            altLinks.classList.toggle('active');
        });
    }
});