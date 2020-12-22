const Swiper = require("../../../node_modules/swiper/js/swiper.js");

function homeSlider() {
  const swiperTop = new Swiper(".swiper-top", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    loop: true,
    speed: 1000,
    grabCursor: true,
    effect: "fade",
    watchSlidesProgress: true,
    mousewheelControl: true,
    keyboardControl: true,
    parallax: true,
  });
  const swiperBottom = new Swiper(".swiper-bottom", {
    loop: true,
    speed: 1000,
    grabCursor: true,
    watchSlidesProgress: true,
    mousewheelControl: true,
    keyboardControl: true,
  });

  swiperTop.controller.control = swiperBottom;
  swiperBottom.controller.control = swiperTop;
}
function init() {
  if (document.querySelector(".swiper-top")) {
    return homeSlider();
  }
}
module.exports = init;
