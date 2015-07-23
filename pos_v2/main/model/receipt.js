function Receipt(cartItems) {
  this.cartItems = cartItems;
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


Receipt.prototype.getItemsString = function () {
  var itemsString = '';

  for (var i = 0; i < this.cartItems.length; i++) {
    itemsString +=
      '名称：' + this.cartItems[i].item.getName() +
      '，数量：' + this.cartItems[i].count + this.cartItems[i].item.getUnit() +
      '，单价：' + formatPrice(this.cartItems[i].item.price) +
      '(元)，小计：' + formatPrice(this.getSubTotal(this.cartItems[i].count, this.cartItems[i].freeCount, this.cartItems[i].item.getPrice())) + '(元)\n';
  }

  return itemsString;
};

