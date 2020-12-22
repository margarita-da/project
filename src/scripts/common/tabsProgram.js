let getCurrentZone = require("./getCurrentZone");
function tabsProgram() {
  $(".dbd20-tabs__tab").fadeOut(100);
  $(".dbd20-program__full").fadeToggle(100);
  // $("#zal-1").fadeIn(100); //в верстке
  $(".dbd20-tabs__tab:first-child").fadeIn(100) //боевой сайт

  // переключение стрелки и раскрытие спикеров
  $(".dbd20-program__descr, .dbd20-program-speakers__button").on(
    "click",
    (e) => {
      let target = getCurrentZone(e.target, "dbd20-program__item");
      $(target).children(".dbd20-program__full").fadeToggle(300);
      $(target).find(".dbd20-program__show-full-btn").fadeToggle(0);
      $(target)
        .children(".dbd20-program__item-wr")
        .toggleClass("programm-arrow-active");
    }
  );

  // переключение табов
  $(".dbd20-tabs").on("click", ".dbd20-tabs__index-item", function (event) {
    let that = $(this);

    if (that.hasClass("dbd20-tabs__index-item_external")) {
      return;
    }

    event.preventDefault();
    let tabs = that.closest(".dbd20-tabs");
    let href = that.attr("href");
    let top = tabs.offset().top;

    tabs
      .children(".dbd20-tabs__index")
      .find(".dbd20-tabs__index-item_active")
      .removeClass("dbd20-tabs__index-item_active");
    $('a[href="' + href + '"]').addClass("dbd20-tabs__index-item_active");

    if (href) {
      $(".dbd20-tabs__tab").fadeOut(100);
    }

    $(href).fadeIn();

    // $('html, body').animate({
    //     scrollTop: top
    // }, 300);
  });
}
function init() {
  if (document.querySelector(".dbd20-tabs__index-item")) {
    return tabsProgram();
  }
}
module.exports = init;
