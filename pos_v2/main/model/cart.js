/**
 * Created by sialvsic on 7/22/15.
 */
function Cart(Tags) {
  this.cartItems = [];
  this.init(Tags);
}

Cart.prototype.getCartItems = function () {
  return this.cartItems;
};

Cart.prototype.getAllItems = function () {
  return loadAllItems();
};


Cart.prototype.init = function (Tags) {
  /* var tag = new Tag();
   var tags = tag.getTags();
   //console.log(tags);*/
  var allItems = this.getAllItems();
  this.setCartItems(Tags, allItems);

};


Cart.prototype.setCartItems = function (tags, allItems) {
  var cart = this;
  //console.log()
  tags.forEach(function (tag) {
    var item = cart.findItem(tag, allItems);
    if (item) {
      cart.cartItems.push({item: item, count: item.count});
    }
  });

};

Cart.prototype.findItem = function (barcode, allItems) {
  var foundItem = undefined;
  allItems.forEach(function (item) {
    if (item.barcode === barcode) {
      foundItem = item;
      return true;
    }
  });
  return foundItem;
};
