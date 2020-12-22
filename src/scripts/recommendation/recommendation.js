const tags = require("./tags");
const recommendationsMore = require("./recommendationsMore");

function recommendation() {
  tags();
  recommendationsMore();
}
module.exports = recommendation;
