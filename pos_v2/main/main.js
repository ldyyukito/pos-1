//TODO: Please write code in this file.
function printReceipt(Tags) {

  var tag = new Tag(Tags);

  var cart = new Cart(tag.getTags());

  var CartItems = cart.getCartItems();

  var promotions = loadPromotions();

  setPromotions(promotions, CartItems);

  var receipt = new Receipt(CartItems);
  receipt.getReceipt();
}


function setPromotions(promotions, CartItems) {
  for (var i = 0; i < promotions.length; i++) {
    promotions[i].setPromotion(CartItems);
  }
}
