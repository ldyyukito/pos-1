//TODO: Please write code in this file.
function printReceipt(barcodes) {

  var cartItems = [];
  var allItems = loadAllItems();

  itemResults = getAllItems(barcodes, allItems);
  getCartItems(itemResults, cartItems);

  var receipt =
    '***<没钱赚商店>收据***\n' +
    getItemsString(cartItems) +
    '----------------------\n' +
    '总计：' + formatPrice(getAmount(cartItems)) + '(元)\n' +
    '**********************';

  console.log(receipt);
}


function getAllItems(barcodes, allItems) {
  var cartItems = [];
  barcodes.forEach(function (barcode) {
    item = findItems(barcode, allItems);
    if (item)
      cartItems.push(item);
  });
  return cartItems;
}

function findItems(barcode, allItems) {
  var foundItems=undefined;
  allItems.forEach(function (item) {
    if (item.barcode === barcode) {
      foundItems = item;
      return true;
    }
  });
  return foundItems;
}

function getCartItems(cartInputs, cartItems) {
  cartInputs.forEach(function (inputItem) {
    var Item = findCartItem(cartItems, inputItem.barcode);
    if (Item) {
      Item.count++;
    }
    else {
      cartItems.push({item: inputItem, count: 1});
    }
  });
}

function findCartItem(cartItems, barcode) {
  var foundCartItem = undefined;

  cartItems.forEach(function (cartItem) {
    if (cartItem.item.barcode === barcode) {
      foundCartItem = cartItem;
      return false;
    }
  });
  return foundCartItem;
}


function getSubTotal(count, price) {
  return count * price;
}

function getAmount(cartItems) {
  var amount = 0;

  cartItems.forEach(function (item) {
    amount += getSubTotal(item.count, item.item.price);
  });

  return amount;
}

function getItemsString(cartitems) {
  var itemsString = '';

  cartitems.forEach(function (cartitem) {
    itemsString +=
      '名称：' + cartitem.item.name +
      '，数量：' + cartitem.count + cartitem.item.unit +
      '，单价：' + formatPrice(cartitem.item.price) +
      '(元)，小计：' + formatPrice(getSubTotal(cartitem.count, cartitem.item.price)) + '(元)\n';
  });

  return itemsString;
}

function formatPrice(price) {
  return price.toFixed(2);
}
