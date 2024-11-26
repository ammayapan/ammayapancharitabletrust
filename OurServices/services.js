window.onload = function () {
    const galleryContainer = document.querySelector('.gallery_container');
    const galleryControlsContainer = document.querySelector('.gallery_controls');
    const galleryControls = ['previous', 'next'];
    const galleryItems = document.querySelectorAll('.gallery_item'); // Fixed typo
    
    class Carousel {
        constructor(container, items, controls) { // Changed 'iteam' to 'items'
            this.carouselContainer = container;
            this.carouselControls = controls;
            this.carouselArray = [...items]; // Changed 'iteam' to 'items'
        }

        updateGallery() {
            this.carouselArray.forEach(el => {
                el.classList.remove('gallery_item-1'); // Fixed typo
                el.classList.remove('gallery_item-2'); // Fixed typo
                el.classList.remove('gallery_item-3'); // Fixed typo
                el.classList.remove('gallery_item-4'); // Fixed typo
                el.classList.remove('gallery_item-5'); // Fixed typo
            });

            this.carouselArray.slice(0, 5).forEach((el, i) => {
                el.classList.add(`gallery_item-${i + 1}`); // Fixed typo
            });
        }

        setCurrentState(direction) {
            if (direction.className === 'gallery_controls-previous') {
                this.carouselArray.unshift(this.carouselArray.pop());
            } else {
                this.carouselArray.push(this.carouselArray.shift());
            }
            this.updateGallery();
        }

        setControls() {
            this.carouselControls.forEach(control => {
                const button = document.createElement('button');
                button.className = `gallery_controls-${control}`;
                button.innerText = control;
                galleryControlsContainer.appendChild(button);
            });
        }

        useControls() {
            const triggers = [...galleryControlsContainer.childNodes];
            triggers.forEach(control => {
                control.addEventListener('click', e => {
                    e.preventDefault();
                    this.setCurrentState(control);
                });
            });
        }
    }
    const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

    exampleCarousel.setControls();
    exampleCarousel.useControls();
}

