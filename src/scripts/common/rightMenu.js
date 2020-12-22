const getCurrentZone = require("./getCurrentZone");


function rightMenu() {
  var PANEL = $(".dbd20-right-panel");
  var WINDOW = $(window);
  var HEADER = $(".dbd20-header");
  var headerHeight = HEADER.length ? HEADER.height() : 230;
  var isScrolledHeader = false;
  var isOpened = false;
  var isActive = true;

  WINDOW.on("scroll", function () {
    var scrollTop = WINDOW.scrollTop();

    if (!isScrolledHeader && scrollTop > headerHeight) {
      toggleActive();
      isScrolledHeader = true;
    }

    $(".dbd20-gotop").toggleClass(
      "dbd20-gotop_active",
      scrollTop > headerHeight
    );

    if (isOpened) {
      toggleOpened();
    }
  });

  setTimeout(function () {
    if (!isScrolledHeader) {
      toggleActive();
      isScrolledHeader = true;
    }
  }, 1500);

  $(".dbd20-gotop").on("click", function (event) {
    event.preventDefault();
    goTo();
  });

  $(".dbd20-right-panel__btn_menu").on("click", function () {
    toggleOpened();

    if (isActive) {
      toggleActive();
    }
  });

  // $(".dbd20-right-panel__menu").on(
  //   "click",
  //   "a:not(.dbd20-right-panel__menu-link_subtoggle)",
  $(".goto_section").on(
    "click",
    function (e) {
      e.preventDefault();

      const target = getCurrentZone(e.target, "goto_section");
      const attr = $(target).find('.dbd20-right-panel__menu-link').attr("href");
      const elem = $(attr);
      console.log(target);
      
      if ($(elem).length != 0) {
        $("body,html").animate({ scrollTop: $(elem).offset().top }, 500);
      }
  
    }
  );

  $(
    ".dbd20-right-panel__menu-link_subtoggle, .dbd20-right-panel__menu-item-toggle"
  ).on("click", function (event) {
    event.preventDefault();
    $(this)
      .closest(".toggle_submenu")
      .toggleClass("dbd20-right-panel__menu-item_active");
      
  });

  function toggleOpened() {
    isOpened = !isOpened;
    PANEL.toggleClass("dbd20-right-panel_opened", isOpened);
  }

  function toggleActive() {
    isActive = !isActive;
    PANEL.toggleClass("dbd20-right-panel_active", isActive);
  }
  function goTo(b) {
    var top = b ? b.offset().top + 30 : 0;
    $("html, body").animate(
      {
        scrollTop: top,
      },
      300
    );
  }
}

function init() {
  if (document.querySelector(".dbd20-right-panel")) {
    return rightMenu();
  }
}
module.exports = init;
