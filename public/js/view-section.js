document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.toggle-button');

    toggleButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const content = this.nextElementSibling;

            if(content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });
});
