function PromotionHandle(cart) {
  this.cart = cart;

}

PromotionHandle.setPromotion = function (CartItems) {

  var promotionType = 'BUY_TWO_GET_ONE_FREE';
  for (var i = 0; i < CartItems.length; i++) {
    var ExistPromotion = Promotion.findPromotionByType(promotionType);
    if (ExistPromotion) {
      this.buyTwoOneFree(ExistPromotion, CartItems[i]);
    }
  }

  return CartItems;

};

PromotionHandle.buyTwoOneFree = function (promotion, cartItem) {

  var barcodes = Promotion.findBarcodes(promotion);

  for (var i = 0; i < barcodes.length; i++) {
    if (barcodes[i] === cartItem.getCartItemBarcode()) {
      cartItem.freeCount = Math.floor(cartItem.count / 3);
      break;
    }
    else {
      cartItem.freeCount = 0;
    }
  }

};
