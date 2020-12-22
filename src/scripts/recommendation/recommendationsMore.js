function recommendationsMore() {
  let result = [];

  $("#loadMore").on("click", function (e) {
    e.preventDefault();
    const items = $(".content");
    const attr = $(".tags__link-active").data("sort");
    result = items.filter(function (a, b) {
      // if (b.dataset.sort.toLowerCase().indexOf(attr.toLowerCase()) + 1) {
      if (b.dataset.sort.indexOf(attr) + 1) {
        return b;
      }
    });
    $(result).filter(":hidden").slice(0, 4).slideDown();
    if ($(result).filter(":hidden").length == 0) {
      $("#loadMore").text("Финиш");
    }
  });
}

module.exports = recommendationsMore;
