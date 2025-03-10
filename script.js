document.addEventListener("DOMContentLoaded", function () {
    function includeHTML(file, elementId, callback) {
        fetch(file)
            .then(response => response.text())
            .then(data => {
                document.getElementById(elementId).innerHTML = data;
                if (callback) callback(); // Ensure the script runs after content loads
            })
            .catch(error => console.error("Error loading file:", file, error));
    }

    // Load header first, then initialize menu script
    includeHTML("header.html", "header-placeholder", function () {
        initHamburgerMenu(); // Call function after header loads
    });

    // Load footer normally
    includeHTML("footer.html", "footer-placeholder");
});

function initHamburgerMenu() {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active");
        });
    }
}
