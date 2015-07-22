//TODO: Please write code in this file.
function printReceipt(Tags) {

  var tag = new Tag(Tags);
  var cart = new Cart(tag.getTags());
  console.log(cart.getCartItems());

  //return console.log(cart.getCartItems());
}

