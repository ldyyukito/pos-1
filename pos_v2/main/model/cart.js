/**
 * Created by sialvsic on 7/22/15.
 */
function Cart(Tags) {
  this.cartItems = [];
  this.init(Tags);
  //console.log(this.cartItems);
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
  //console.log(this.cartItems);
  this.cartItems = this.countSameItems();
};

Cart.prototype.countSameItems = function () {

  var who = this;
  var temp = [];
  this.cartItems.forEach(function (cartItem) {
    var item = who.find(cartItem, temp);
    if (item) {
      item.count++;
    }
    else {
      temp.push(cartItem);
    }
  });
  return temp;
};

Cart.prototype.find = function (cartItem, temp) {
  var foundItem = undefined;
  temp.forEach(function (n) {
    if (n.item.getBarcode() === cartItem.item.getBarcode()) {
      foundItem = n;
      return true;
    }
  });
  return foundItem;

};


Cart.prototype.setCount = function (tags) {
  return tags.count;
};

Cart.prototype.setCartItems = function (tags, allItems) {
  var cart = this;
  tags.forEach(function (tag) {
    var item = cart.findItem(tag.barcode, allItems);
    if (item) {
      cart.cartItems.push({item: item, count: cart.setCount(tag)});
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
