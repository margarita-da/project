function btnUp() {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $(".block__btn-up").fadeIn();
      } else {
        $(".block__btn-up").fadeOut();
      }
    });
  
    $(".block__btn-up").click("click", () => {
      $("html, body").animate({ scrollTop: 0 }, 500);
    });
  }
  
  function init() {
    if (document.querySelector(".block__btn-up")) {
      return btnUp();
    }
  }
  module.exports = init;
  