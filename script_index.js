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

    function initHamburgerMenu() {
        const menuToggle = document.getElementById("menu-toggle");
        const navMenu = document.getElementById("nav-menu");

        if (menuToggle && navMenu) {
            menuToggle.addEventListener("click", function () {
                navMenu.classList.toggle("active");
            });
        }
    }

    let slideshowContainer = document.querySelector(".slideshow");
    let images = [];
    let index = 0;

    // Fetch images from image_list.json
    fetch('image_list.json')
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                console.error("No images found in image_list.json");
                return;
            }

            // Load images dynamically
            data.forEach((src, i) => {
                let img = document.createElement("img");
                img.src = src;
                img.alt = `Slide ${i + 1}`;
                img.style.opacity = i === 0 ? 1 : 0;  // First image visible, others hidden
                img.style.position = "absolute";
                img.style.transition = "opacity 1s ease-in-out";
                slideshowContainer.appendChild(img);
                images.push(img);
            });

            // Start the slideshow
            setInterval(changeImage, 2500);
        })
        .catch(error => console.error("Error loading image list:", error));

    function changeImage() {
        if (images.length === 0) return;

        images[index].style.opacity = 0; // Hide current image
        index = (index + 1) % images.length;
        images[index].style.opacity = 1; // Show next image
    }
});