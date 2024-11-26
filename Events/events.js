window.onload = function () {
}

window.onload = function () {
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 35,
    // slidesPerGroup: 3,
    loop: true,
    // centerSlide: 'true',
    fade: 'true',
    grabCursor: 'true',
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
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

function on_upcoming_event_clicked(event_num) {
  var selected_event = document.getElementById(`upcoming_item_${event_num}`)
  var selected_btn = document.getElementById(`drop_down_${event_num}`)

  items = selected_event.classList["value"].split(" ")

  console.log(selected_event.classList)

  if(items.includes("selected_item"))
  {
    selected_event.classList.remove("selected_item")
    selected_btn.style.transform = 'rotate(0deg)'
  }
  else{
    selected_event.classList.add("selected_item")
    selected_btn.style.transform = 'rotate(180deg)'
  }

  console.log(selected_event.classList)
}