const getCurrentZone = require("../common/getCurrentZone");

function delWishlist() {
  $(".personal-area__program-list").on(
    "click",
    ".personal-area__program__del",
    function (e) {
      e.preventDefault();
      const target = getCurrentZone(e.target, "personal-area__program__del");
      const attr = $(target).data("id");
      const item = getCurrentZone(e.target, "personal-area__program-item");
      $(item).addClass("del-inimate");

      setTimeout(function () {
        $(item).remove();
      }, 2000);

      const filtered = JSON.parse(localStorage.getItem("wishlist")).filter(
        function (a) {
          return Number(a) != attr;
        }
      );
      localStorage.setItem("wishlist", JSON.stringify(filtered));
    }
  );
}

function init() {
  if (document.querySelector(".personal-area__program-list")) {
    return delWishlist();
  }
}
module.exports = init;
