function printReceipt(tags) {
  var cart = new Cart();
  var scanner = new Scanner();
  var pos = new Pos(scanner, cart);
  pos.scan(tags);
  pos.process();
  console.log(pos.printReceipt());

}
