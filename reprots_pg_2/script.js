document.addEventListener('DOMContentLoaded', () => {
    const navDataSelection = document.getElementById('nav-data-selection');
    const navMyTemplate = document.getElementById('nav-my-template');

    const viewDataSelection = document.getElementById('view-data-selection');
    const viewMyTemplate = document.getElementById('view-my-template');

    function setActive(activeNav, activeView) {
        // Reset Navs
        navDataSelection.classList.remove('active');
        navMyTemplate.classList.remove('active');

        // Reset Views
        viewDataSelection.style.display = 'none';
        viewMyTemplate.style.display = 'none';

        // Set Active
        activeNav.classList.add('active');
        activeView.style.display = 'block';
    }

    navDataSelection.addEventListener('click', () => {
        setActive(navDataSelection, viewDataSelection);
    });

    navMyTemplate.addEventListener('click', () => {
        setActive(navMyTemplate, viewMyTemplate);
    });
});
