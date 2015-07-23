function Cart() {
  this.cartItems = [];

}

Cart.prototype.addCartItem = function (cartItem) {
  var item = this.findCartItem(cartItem.getCartItemBarcode());
  if (item) {
    item.count++;
  }
  else {
    this.cartItems.push(cartItem);
  }
};

Cart.prototype.findCartItem = function (barcode) {
  for (var i = 0; i < this.cartItems.length; i++) {
    if (this.cartItems[i].getCartItemBarcode() === barcode) {
      return this.cartItems[i];
    }
  }
};




