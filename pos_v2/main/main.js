//TODO: Please write code in this file.
function printReceipt(Tags) {

  var tag = new Tag(Tags);

  var cart = new Cart(tag.getTags());

  var cartItems = cart.getCartItems();

  var promotions = loadPromotions();


  setPromotions(promotions, cartItems);
  //console.log(cartItems);

  // console.log(cartItems);
  var receipt = new Receipt(cartItems);
  receipt.print();

}


function setPromotions(promotions, CartItems) {
  for (var i = 0; i < promotions.length; i++) {
    promotions[i].setPromotion(CartItems);
  }
}
