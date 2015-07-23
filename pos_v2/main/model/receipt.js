/**
 * Created by sialvsic on 7/23/15.
 */
function Receipt(cartItems) {
  this.cartItems = cartItems;
}


Receipt.prototype.print = function () {
  var receiptString =
    '***<没钱赚商店>收据***\n' +
    '打印时间：' + this.getTimeNow() + '\n' +
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


Receipt.prototype.getAmount = function () {
  var amount = 0;
  var who = this;
  this.cartItems.forEach(function (item) {
    amount += who.getSubTotal(item.count, item.freeCount, item.item.getPrice());
  });

  return amount;
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

  /*this.cartItems.forEach(function (cartitem) {
   itemsString +=
   '名称：' + cartitem.item.getName() +
   '，数量：' + cartitem.count + cartitem.item.getUnit() ;
   */
  /*'*/
  /**/
  /*，单价：' + formatPrice(cartitem.item.price) +
   '(元)，小计：' + formatPrice(getSubTotal(cartitem.count, cartitem.freeCount, cartitem.item.price)) + '(元)\n';*/
  /**/
  /*
   */
  /*});*/

  return itemsString;
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

Receipt.prototype.getTimeNow = function () {
  var currentDate = new Date(),
    year = this.dateDigitToString(currentDate.getFullYear()),
    month = this.dateDigitToString(currentDate.getMonth() + 1),
    date = this.dateDigitToString(currentDate.getDate()),
    hour = this.dateDigitToString(currentDate.getHours()),
    minute = this.dateDigitToString(currentDate.getMinutes()),
    second = this.dateDigitToString(currentDate.getSeconds()),
    formattedDateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;
  return formattedDateString;
};

Receipt.prototype.dateDigitToString = function (num) {
  return num < 10 ? '0' + num : num;
};


function formatPrice(price) {
  return price.toFixed(2);
  //return price;
}













