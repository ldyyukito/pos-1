function Promotion(type, barcodes) {
  this.type = type;
  this.barcodes = barcodes || [];
}


Promotion.prototype.getType = function () {
  return this.type;
};


Promotion.prototype.getBarcodes = function () {
  return this.barcodes;
};


Promotion.prototype.setPromotion = function (CartItems) {
  if (this.getType() === 'BUY_TWO_GET_ONE_FREE') {
    this.buyTwoOneFree(this.getBarcodes(), CartItems);
  }

};


Promotion.prototype.buyTwoOneFree = function (barcodes, cartItems) {
  var who = this;
  cartItems.forEach(function (cartItem) {
    who.getPromotionItem(cartItem, barcodes);
  });
};

Promotion.prototype.getPromotionItem = function (cartItem, barcodes) {

  for (var i = 0; i < barcodes.length; i++) {

    if (barcodes[i] === cartItem.item.getBarcode()) {
      cartItem.freeCount = Math.floor(cartItem.count / 3);
      break;
    }
    else {
      cartItem.freeCount = 0;
    }
  }

  /*
   barcodes.forEach(function (barcode) {
   if (barcode === item.item.getBarcode()) {
   item.freeCount = Math.floor(item.count / 3);
   }
   else {
   item.freeCount = 0;
   }
   });*/
};
