// const obj = require("../data/obj");

function addWishlistInDOM() {
  fetch("/adindex-city-conference-2020/json/")
    .then((response) => response.json())
    .then((json) => filter(json))
    .then((filtered) => addDOM(filtered))
    .catch((e) => errorFn());

  function filter(obj) {
    if (
      JSON.parse(localStorage.getItem("wishlist")) &&
      JSON.parse(localStorage.getItem("wishlist")).length != 0
    ) {
      const arr = JSON.parse(localStorage.getItem("wishlist"));
      let filtered = [];

      for (key in obj) {
        arr.map(function (a) {
          if (obj[key]["id"] == a) {
            filtered.push(obj[key]);
          }
        });
      }

      return filtered;
    } else {
      return false;
    }
  }
  function addDOM(filtered) {
    const list = document.querySelector(".personal-area__program-list");
    if (
      JSON.parse(localStorage.getItem("wishlist")) &&
      JSON.parse(localStorage.getItem("wishlist")).length != 0 &&
      filtered
    ) {
      for (key in filtered) {
        const html = ` <div class="personal-area__program-item">
      <div class="personal-area__program__time">${filtered[key]["time"]}</div><a class="personal-area__program__link" href="#">
        <div class="personal-area__program__place">${filtered[key]["hall"]}</div>
        <div class="personal-area__program__title">${filtered[key]["title"]}</div>
        </a>
      <div class="personal-area__program__del-wr"><a class="personal-area__program__del" data-id="${filtered[key]["id"]}" href="#">
          <svg class="personal-area__program__del-img">
            <use xlink:href="/bitrix/templates/city_2020/assets/sprite/sprite.svg#delete"></use>
          </svg></a></div>
    </div>`;
        list.innerHTML += html;
      }
    } else {
      list.innerHTML = `<p class="wishlist-error">Программа не добавлена</p>`;
    }
  }
  function errorFn() {
    const list = document.querySelector(".personal-area__program-list");
    list.innerHTML = `<p class="wishlist-error">Что-то пошло не так</p>`;
  }
}

function init() {
  if (document.querySelector(".personal-area__program-list")) {
    return addWishlistInDOM();
  }
}
module.exports = init;
