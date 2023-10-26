document.addEventListener('DOMContentLoaded', function () {
    // Sidebar Toggle

    var sidebarOpen = false;
    var sidebar = document.getElementById('sidebar');

    document.querySelector('.menu-icon').addEventListener('click', openSidebar);
    document
        .getElementById('dashClose')
        .addEventListener('click', closeSidebar);

    function openSidebar() {
        if (!sidebarOpen) {
            sidebar.classList.add('sidebar-responsive');
            sidebarOpen = true;
        }
    }

    function closeSidebar() {
        if (sidebarOpen) {
            sidebar.classList.remove('sidebar-responsive');
            sidebarOpen = false;
        }
    }
});
