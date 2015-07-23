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
  var allItems = this.getAllItems();
  this.setCartItems(Tags, allItems);
  this.cartItems = this.countSameCartItems();
};

Cart.prototype.countSameCartItems = function () {
  var who = this;
  var countSameCartItems = [];
  
  this.cartItems.forEach(function (cartItem) {
    var item = who.find(cartItem, countSameCartItems);
    if (item) {
      item.count++;
    }
    else {
      countSameCartItems.push(cartItem);
    }
  });
  return countSameCartItems;
};

Cart.prototype.find = function (cartItem, countSameCartItems) {
  var foundItem = undefined;
  countSameCartItems.forEach(function (SameCartItem) {
    if (SameCartItem.item.getBarcode() === cartItem.item.getBarcode()) {
      foundItem = SameCartItem;
      return true;
    }
  });
  return foundItem;

};


Cart.prototype.setCount = function (tags) {
  return tags.count;
};

Cart.prototype.setCartItems = function (tags, allItems) {
  var who = this;

  tags.forEach(function (tag) {
    var item = who.findItem(tag.barcode, allItems);
    if (item) {
      who.cartItems.push({item: item, count: who.setCount(tag)});
    }
  });

};

Cart.prototype.findItem = function (barcode, allItems) {
  var foundItem = undefined;

  allItems.forEach(function (item) {
    if (item.getBarcode() === barcode) {
      foundItem = item;
      return true;
    }
  });
  return foundItem;
};
