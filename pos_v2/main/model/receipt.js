function Receipt(cartItems) {
  this.cartItems = cartItems;
}

Receipt.prototype.print = function () {
  var receiptString =
    '***<没钱赚商店>收据***\n' +
    '打印时间：' + Utlis.Time() + '\n' +
    '----------------------\n' +
    this.getItemsString() +
    '----------------------\n' +
    '挥泪赠送商品：\n' +
    this.getFreeItem() +
    '----------------------\n' +
    '总计：' + formatPrice(this.getAmount()) + '(元)\n' +
    '节省：' + formatPrice(this.getSave()) + '(元)\n' +
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


Receipt.prototype.getAmount = function () {
  var amount = 0;
  var who = this;

  this.cartItems.forEach(function (item) {
    amount += who.getSubTotal(item.count, item.freeCount, item.item.getPrice());
  });

  return amount;
};


Receipt.prototype.getSubTotal = function (count, freecount, price) {
  return (count - freecount) * price;
};

Receipt.prototype.getFreeItem = function () {
  var Freeitem = "";
  var isfree;

  this.cartItems.forEach(function (cartItem) {
    cartItem.freeCount > 0 ? isfree = true : isfree = false;
    if (isfree) {
      Freeitem += '名称：' + cartItem.item.getName() + '，数量：' + cartItem.freeCount + cartItem.item.getUnit() + '\n';
    }
  });

  return Freeitem;
};

Receipt.prototype.getSave = function () {
  var savePrice = 0;

  this.cartItems.forEach(function (cartItem) {
    if (cartItem.freeCount > 0)
      savePrice += cartItem.item.getPrice();
  });
  return savePrice;
};


function formatPrice(price) {
  return price.toFixed(2);
}
