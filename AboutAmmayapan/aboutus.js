window.onload = function () {
    document.body.classList.add("remove-scrolling");

    var swiper = new Swiper(".slide_members_content", {
        slidesPerView: 3,
        spaceBetween: 50,
        // slidesPerGroup: 3,
        loop: true,
        // centerSlide: 'true',
        fade: 'true',
        grabCursor: 'true',
        // loopFillGroupWithBlank: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 70,
            },
            520: {
                slidesPerView: 2,
                spaceBetween: 60,
            },
            950: {
                slidesPerView: 3,
                spaceBetween: 45,
            },
            1600: {
                slidesPerView: 4,
                spaceBetween: 8,
            },
        },
    });
}

function percentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
}

function round(n) {
    // Smaller multiple
    let a = parseInt(n / 10, 10) * 10;

    // Larger multiple
    let b = a + 10;

    // Return of closest of two
    return (n - a >= b - n) ? b : a;
}

function navigate_testimonial_right() {
    left_button = document.querySelector('.first_slide')
    testimonial_slides = document.querySelector('.testimonial_slides')

    left_button_style = getComputedStyle(left_button)
    testimonial_slides_style = getComputedStyle(testimonial_slides)

    current_margin_left = left_button_style.marginLeft
    total_width = testimonial_slides_style.width

    curr_percentage = (round(percentage(Math.abs(parseFloat(current_margin_left)), parseFloat(total_width))))

    console.log(curr_percentage)
    if (curr_percentage < 80) {
        left_button.style.setProperty("margin-left", `${-curr_percentage - 20}%`)
        console.log(current_margin_left)
    }
    else{
        left_button.style.setProperty("margin-left", `${0}%`)
    }
    console.log(current_margin_left)
}

function navigate_testimonial_left() {
    left_button = document.querySelector('.first_slide')
    testimonial_slides = document.querySelector('.testimonial_slides')

    left_button_style = getComputedStyle(left_button)
    testimonial_slides_style = getComputedStyle(testimonial_slides)

    current_margin_left = left_button_style.marginLeft
    total_width = testimonial_slides_style.width

    curr_percentage = (round(percentage(Math.abs(parseFloat(current_margin_left)), parseFloat(total_width))))

    console.log(curr_percentage)
    if (curr_percentage > 0) {
        left_button.style.setProperty("margin-left", `${-curr_percentage + 20}%`)
        console.log(current_margin_left)
    }
    else{
        left_button.style.setProperty("margin-left", `${-80}%`)
    }
    console.log(current_margin_left)
}

setTimeout(() => {
    $('.splash').fadeOut('fast');
    document.body.classList.remove("remove-scrolling");
}, 1500);