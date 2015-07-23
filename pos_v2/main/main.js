function printReceipt(tags) {
  var cart = new Cart();
  var scanner = new Scanner();
  var pos = new Pos(scanner, cart);
  pos.scan(tags);
  console.log(pos.printReceipt());

}
