function speakers() {
  let _window = $(window);
  let speakers = $(".dbd20-speakers__item");
  let btn = $(".dbd20-speakers-load-more__btn");
  let total = speakers.length;
  let perPage = 10;
  let active = perPage;

  _window
    .on("resize", function (event) {
      let wWidth = _window.outerWidth();
      speakers.removeClass(
        "dbd20-speakers__item_active dbd20-speakers__item_visible"
      );

      if (wWidth >= 1600) {
        perPage = 10;
      } else if (wWidth >= 1200 && wWidth < 1600) {
        perPage = 8;
      } else if (wWidth >= 992 && wWidth < 1200) {
        perPage = 6;
      } else if (wWidth < 992) {
        perPage = 4;
      }

      active = perPage;
      speakers
        .slice(0, active)
        .addClass("dbd20-speakers__item_active dbd20-speakers__item_visible");
      btn.toggle(active < total);
    })
    .trigger("resize");

  btn.on("click", function (event) {
    event.preventDefault();
    active = active + perPage;
    let itemsToShow = speakers.slice(active - perPage, active);
    itemsToShow.addClass("dbd20-speakers__item_active");

    setTimeout(function () {
      itemsToShow.addClass("dbd20-speakers__item_visible");
    }, 100);
    btn.toggle(active < total);
  });
}

function init() {
  if (document.querySelector(".dbd20-speakers")) {
    return speakers();
  }
}

module.exports = init;
