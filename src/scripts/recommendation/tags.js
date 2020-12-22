function tags() {
  $(".lds-ripple").hide();
  $(".tags__link").slice(0, 1).addClass("tags__link-active");
  $(".content").fadeOut();

  function tagsFilter(attr = $(".tags__link").slice(0, 1).data("sort")) {
    const items = $(".content");
    let result = [];
    $(".content").fadeOut();

    result = items.filter(function (a, b) {
      if (b.dataset.sort.indexOf(attr) + 1) {
        // if (b.dataset.sort.toLowerCase().indexOf(attr.toLowerCase()) + 1) {
        return b;
      }
    });
    $(".lds-ripple").show(10);
    if ($(result).length <= 4) {
      $("#loadMore").hide();
    } else {
      $("#loadMore").show();
    }
    setTimeout(function () {
      $(result).slice(0, 4).fadeIn(1000);
      $(".lds-ripple").hide();
    }, 1000);
  }
  tagsFilter();
  $(".tags__link").on("click", function (e) {
    e.preventDefault();
    const target = e.target;
    const attrTag = $(target).data("sort");
    $(".content").hide();

    tagsFilter(attrTag);
    $(".tags__link").removeClass("tags__link-active");
    $(target).addClass("tags__link-active");
    $("#loadMore").text("Показать еще");
  });
}
module.exports = tags;
