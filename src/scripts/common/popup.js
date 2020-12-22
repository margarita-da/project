const getCurrentZone = require("./getCurrentZone");
// const obj = require("../data/obj");

function popup() {
  function filter(obj, id) {
    let filtered = [];

    for (key in obj) {
      if (obj[key][["id"]] == id) {
        filtered.push(obj[key]);
      }
    }
    return filtered;
  }
  function addDOM(filtered, id) {
    let time = $("#popup-pr").find(".tags__content__date-txt");
    let hall = $("#popup-pr").find(".tags__content__info__hall");
    let title = $("#popup-pr").find(".tags__content__info__section");
    let titleSecond = $("#popup-pr").find(".tags__content__info__title");
    let body = $("#popup-pr").find(".tags__content__info__descr");
    let wishlist = $("#popup-pr").find(".wishlist");
    const list = document.querySelector(".popup-list");
    $(time).text("");
    $(hall).text("");
    $(title).text("");
    $(titleSecond).text("");
    $(body).text("");
    $(wishlist).attr("data-id", "");
    list.innerHTML = "";
    for (key in filtered) {
      $(time).text(filtered[key]["time"]);
      $(hall).text(filtered[key]["hall"]);
      $(title).text(filtered[key]["title"]);
      $(titleSecond).text(filtered[key]["titleSecond"]);
      $(body).html(filtered[key]["body"]);
      $(wishlist).attr("data-id", filtered[key]["id"]);

      filtered[key]["speakers"].map(function (a) {
        list.innerHTML += `
          <div class="popup-item">
          <div class="popup-pr__speakers-name">${a["name"]}</div>
          <div class="popup-pr__speakers-position"> 
            <div class="popup-pr__speakers-position-left">${a["position"]}</div>
            <div class="popup-pr__speakers-position-right">${a["company"]}</div>
          </div>
        </div>
          `;
      });
    }
    if (
      JSON.parse(localStorage.getItem("wishlist")) &&
      JSON.parse(localStorage.getItem("wishlist")).length != 0
    ) {
      const a = JSON.parse(localStorage.getItem("wishlist"));
      a.map(function (b) {
        if (b == id) {
          // $("#popup-pr .wishlist").addClass("wishlist-active");
          // $("#popup-pr .wishlist").removeClass("add-wishlist");
          $(".wishlist[data-id=" + b + "]").addClass("wishlist-active");
          $(".wishlist[data-id=" + b + "]").removeClass("add-wishlist");
        }
      });
    }
    $("#popup-pr").show();
  }
  $(
    ".tags__content__info, .recommendations__first__title, .recommendations__first__pic, .recommendations__first__more, .recommendations__second__descr, .recommendations__second__pic, .recommendations__second__more__pic"
  ).on("click", function (e) {
    e.preventDefault();
    const elem = getCurrentZone(e.target, "popup-js");
    const attr = $(elem).data("id");

    // fetch("http://localhost:3000/obj.json")
    // fetch("https://adindex.ru/_vv/city_2020/obj.json")
    fetch("/adindex-city-conference-2020/json/")
      .then((response) => response.json())
      .then((json) => filter(json, attr))
      .then((filtered) => addDOM(filtered, attr))
      .catch((e) => console.log(e));
  });
  $(".popup-pr__title-space__close").on("click", function (e) {
    e.preventDefault();
    $("#popup-pr").hide();

    $("#popup-pr .wishlist").removeClass("wishlist-active");
    $("#popup-pr .wishlist").addClass("add-wishlist");
  });
}
function init() {
  if (
    document.querySelector(
      ".tags__content__info, .recommendations__first__title, .recommendations__first__pic, .recommendations__first__more, .recommendations__second__descr, .recommendations__second__pic, .recommendations__second__more__pic"
    )
  ) {
    return popup();
  }
}
module.exports = init;
