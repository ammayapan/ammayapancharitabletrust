// document.addEventListener("DOMContentLoaded", function () {
//     const menuToggle = document.querySelector(".hamburger"); 
//     const navMenu = document.querySelector(".nav-menu"); 

//     menuToggle.addEventListener("click", function () {
//         navMenu.classList.toggle("active");
//     });
// });

// function toggleMenu() {
//     const menu = document.querySelector(".nav-menu");
//     menu.classList.toggle("active");
// }

// document.addEventListener("DOMContentLoaded", function () {
//     const menuToggle = document.getElementById("menu-toggle"); // Select hamburger button
//     const navMenu = document.getElementById("nav-menu"); // Select menu

//     menuToggle.addEventListener("click", function () {
//         navMenu.classList.toggle("active"); // Toggle active class
//     });
// });


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
