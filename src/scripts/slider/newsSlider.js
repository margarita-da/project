const Swiper = require("../../../node_modules/swiper/js/swiper.js");
function newsSlider() {
  const mySwiper2 = new Swiper(".swiper-container2", {
    navigation: {
      nextEl: ".swiper-news-button-next",
      prevEl: ".swiper-news-button-prev",
    },
    paginationClickable: true,
    loop: true,
    // effect: 'fade',
    autoplay: 3500,
    autoplayDisableOnInteraction: false,
    slidesPerView: 3,
    breakpoints: {
      988: {
        slidesPerView: 3,
      },

      480: {
        slidesPerView: 2,
      },
      320: {
        slidesPerView: 1,
      },
    },
  });
}
function init() {
  if (document.querySelector(".swiper-container2")) {
    return newsSlider();
  }
}
module.exports = init;
