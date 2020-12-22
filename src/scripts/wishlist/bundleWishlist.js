const addWishlistInDOM = require("./addWishlistInDOM");
const wishlist = require("./wishlist");
const delWishlist = require("./delWishlist");

function bundleWishlist() {
  addWishlistInDOM();
  wishlist();
  delWishlist();
}
module.exports = bundleWishlist;
