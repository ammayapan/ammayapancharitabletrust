
const galleryContainer = document.querySelector('.gallery_container');
const galleryItems = document.querySelectorAll('.gallery_item');

class Carousel {
    constructor(container, items) {
        this.carouselContainer = container;
        this.carouselArray = [...items];
        this.initCarousel();
    }

    initCarousel() {
        this.updateGallery();
        this.setControls();
        this.useControls();
    }

    updateGallery() {
        this.carouselArray.forEach((el, i) => {
            el.className = `gallery_item gallery_item-${(i % 15) + 1}`;
        });
    }

    setCurrentState(direction) {
        if (direction === 'left') {
            this.carouselArray.unshift(this.carouselArray.pop());
        } else if (direction === 'right') {
            this.carouselArray.push(this.carouselArray.shift());
        }
        this.updateGallery();
    }

    setControls() {
        const leftArrow = document.createElement('div');
        leftArrow.className = 'gallery_arrow gallery_arrow-left';
        leftArrow.innerHTML = '&#8249'; // Left arrow character
        this.carouselContainer.appendChild(leftArrow);

        const rightArrow = document.createElement('div');
        rightArrow.className = 'gallery_arrow gallery_arrow-right';
        rightArrow.innerHTML = '&#8250;'; // Right arrow character
        this.carouselContainer.appendChild(rightArrow);
    }

    useControls() {
        this.carouselContainer.addEventListener('click', (event) => {
            if (event.target.closest('.gallery_arrow-left')) {
                this.setCurrentState('left');
            } else if (event.target.closest('.gallery_arrow-right')) {
                this.setCurrentState('right');
            }
        });

        // Add event listener for keydown events
        document.addEventListener('keydown', this.throttle((event) => {
            if (event.key === 'ArrowLeft') {
                this.setCurrentState('left');
            } else if (event.key === 'ArrowRight') {
                this.setCurrentState('right');
            }
        }, 200));

        // Add swipe support
        this.addSwipeSupport();
    }

    addSwipeSupport() {
        let touchStartX = 0;
        let touchEndX = 0;

        this.carouselContainer.addEventListener('touchstart', (event) => {
            touchStartX = event.changedTouches[0].screenX;
        });

        this.carouselContainer.addEventListener('touchend', (event) => {
            touchEndX = event.changedTouches[0].screenX;
            this.handleGesture();
        });

        this.handleGesture = () => {
            if (touchEndX < touchStartX) {
                this.setCurrentState('right');
            }
            if (touchEndX > touchStartX) {
                this.setCurrentState('left');
            }
        };
    }

    throttle(fn, wait) {
        let time = Date.now();
        return function (...args) {
            if ((time + wait - Date.now()) < 0) {
                fn(...args);
                time = Date.now();
            }
        };
    }
}

const exampleCarousel = new Carousel(galleryContainer, galleryItems);
