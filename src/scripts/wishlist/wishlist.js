const getCurrentZone = require("../common/getCurrentZone");
function wishlist() {
  // localStorage.clear();
  console.log(localStorage.wishlist);
  $(".wishlist").addClass("add-wishlist");
  if (
    JSON.parse(localStorage.getItem("wishlist")) &&
    JSON.parse(localStorage.getItem("wishlist")).length != 0
  ) {
    const a = JSON.parse(localStorage.getItem("wishlist"));
    for (let i = 0; i < a.length; i++) {
      $(".wishlist[data-id=" + a[i] + "]").addClass("wishlist-active");
      $(".wishlist[data-id=" + a[i] + "]").removeClass("add-wishlist");
    }
  }

  $(".recommendations-wr, .tags__content__list, .programm__content").on(
    "click",
    ".add-wishlist",
    function (e) {
      e.preventDefault();
      const target = getCurrentZone(e.target, "add-wishlist");

      let arrId = JSON.parse(localStorage.getItem("wishlist")) || [];
      const id = target.dataset.id;
      arrId.push(id);

      localStorage.setItem("wishlist", JSON.stringify(arrId));

      $(".wishlist[data-id=" + id + "]").addClass("wishlist-active");
      $(".wishlist[data-id=" + id + "]").removeClass("add-wishlist");

      // $(target).addClass("wishlist-active");
      // $(target).removeClass("add-wishlist");
    }
  );
  $(".recommendations-wr, .tags__content__list, .programm__content").on(
    "click",
    ".wishlist-active",
    function (e) {
      e.preventDefault();
      const target = getCurrentZone(e.target, "wishlist-active");
      const id = target.dataset.id;

      const filtered = JSON.parse(localStorage.getItem("wishlist")).filter(
        function (a) {
          return Number(id) != Number(a);
        }
      );
      localStorage.setItem("wishlist", JSON.stringify(filtered));

      $(".wishlist[data-id=" + id + "]").removeClass("wishlist-active");
      $(".wishlist[data-id=" + id + "]").addClass("add-wishlist");

      // $(target).removeClass("wishlist-active");
      // $(target).addClass("add-wishlist");
    }
  );
}
function init() {
  if (
    document.querySelector(".wishlist") ||
    document.querySelector(".personal-area__program-list")
  ) {
    return wishlist();
  }
}
module.exports = init;
