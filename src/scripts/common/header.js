const getCurrentZone = require("./getCurrentZone");

function header() {
  $(".menu-scroll").on("click", (e) => {
    e.preventDefault();

    const target = getCurrentZone(e.target, "header__nav__link");
    const attr = $(target).attr("href");
    const elem = $(attr);

    if ($(elem).length != 0) {
      $("body,html").animate({ scrollTop: $(elem).offset().top }, 500);
    }
  });
  $(".submenu-js").on("click", function (e) {
    e.preventDefault();
    $(".submenu-list").fadeToggle();
  });
}

function init() {
  if (document.querySelector(".header")) {
    return header();
  }
}
module.exports = init;
