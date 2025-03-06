document.addEventListener("DOMContentLoaded", function () {
    const eventDropdown = document.getElementById("event-dropdown");
    const slideshowContainer = document.querySelector(".slideshowevent");
    const selectedDateText = document.getElementById("selected-date");
    let currentEventImages = [];
    let index = 0;

    const events = [
        { date: "2022-08-07", folder: "2022-08-07-Annadhanam", name: "Annadhanam" },
        { date: "2022-08-07", folder: "2022-08-07-MedicalCamp", name: "Medical Camp" },
        { date: "2023-04-23", folder: "2023-04-23-Inauguration", name: "Inauguration" }
    ];

    // Populate dropdown with formatted event names
    events.forEach(event => {
        let option = document.createElement("option");
        option.value = event.folder;
        option.textContent = `${event.date} - ${event.name}`;
        eventDropdown.appendChild(option);
    });

    // Event listener for dropdown selection
    eventDropdown.addEventListener("change", function () {
        if (this.value) {
            const selectedEvent = events.find(event => event.folder === this.value);
            loadEventPhotos(selectedEvent.folder, selectedEvent.date);
        }
    });

    function loadEventPhotos(folder, date) {
        selectedDateText.textContent = "Event Date: " + date;
        slideshowContainer.innerHTML = ""; // Clear previous images
        currentEventImages = [];
        index = 0;

        console.log(`Loading images for folder: ${folder}`); // Debugging

        let i = 1;
        function loadNextImage() {
            let img = new Image();
            img.src = `./images/events/${folder}/image${i}.jpg`;
            img.alt = `Event Image ${i}`;
            img.style.position = "absolute";
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.objectFit = "cover";
            img.style.transition = "opacity 1s ease-in-out";
            img.style.opacity = 0;

            img.onload = function () {
                console.log(`Loaded: ${img.src}`);
                slideshowContainer.appendChild(img);
                currentEventImages.push(img);
                
                if (currentEventImages.length === 1) {
                    img.style.opacity = 1;
                    img.classList.add("active");
                }

                i++;
                loadNextImage(); // Try loading the next image
            };

            img.onerror = function () {
                console.log(`No more images found after image${i - 1}`);
                if (currentEventImages.length === 0) {
                    slideshowContainer.innerHTML = "<p>No images available for this event.</p>";
                }
            };
        }

        loadNextImage();
    }

    function changeImage(direction) {
        if (currentEventImages.length > 1) {
            console.log("Switching Image");
            currentEventImages[index].style.opacity = 0; // Hide current
            currentEventImages[index].style.display = "none";

            index = (index + direction + currentEventImages.length) % currentEventImages.length;

            currentEventImages[index].style.display = "block";
            setTimeout(() => {
                currentEventImages[index].style.opacity = 1; // Show next image
            }, 100);
        }
    }

    document.getElementById("prev").addEventListener("click", () => changeImage(-1));
    document.getElementById("next").addEventListener("click", () => changeImage(1));
});

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

});
