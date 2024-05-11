document.addEventListener('DOMContentLoaded', function () {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            navbarPlaceholder.innerHTML = data;
            const currentPage = document.title.toLowerCase();
            const links = document.querySelectorAll('#navbar a');
            links.forEach(link => {
                if (link.textContent.toLowerCase() === currentPage || (currentPage === 'homepage' && link.textContent.toLowerCase() === 'home')) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        })
        .catch(error => console.error('Error fetching navbar:', error));
});