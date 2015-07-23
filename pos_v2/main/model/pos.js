function Pos(scanner,cart){
  this.scanner = scanner;
  this.cart = cart;
}

Pos.prototype.scan=function(tags){

  for (var i=0; i < tags.length; i++){
    var cartItem=this.scanner.scan(tags[i]);
    this.cart.addCartItem(cartItem);
  }
};

Pos.prototype.printReceipt=function(){
 var receipt= new Receipt(this.cart);
  return receipt.print();
};
