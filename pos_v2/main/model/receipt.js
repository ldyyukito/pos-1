function Receipt(cart) {
  this.cart = cart;
}

Receipt.prototype.print = function () {
  var receiptString =
    '***<没钱赚商店>收据***\n' +
      //'打印时间：' + this.getNowTime() + '\n' +
    '----------------------\n' +
      //this.getItemsString() +
    '----------------------\n' +
    '挥泪赠送商品：\n' +
      //this.getFreeItem() +
    '----------------------\n' +
      //'总计：' + formatPrice(this.getAmount()) + '(元)\n' +
      //'节省：' + formatPrice(this.getSave()) + '(元)\n' +
    '**********************';
  console.log(receiptString);
};
