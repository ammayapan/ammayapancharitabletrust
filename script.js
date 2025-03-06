document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".hamburger"); 
    const navMenu = document.querySelector(".nav-menu"); 

    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });
});

function toggleMenu() {
    const menu = document.querySelector(".nav-menu");
    menu.classList.toggle("active");
}

