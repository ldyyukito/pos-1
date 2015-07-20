//TODO: Please write code in this file.
function printReceipt(inputs) {
  var cartItems = [];
  var allItems = loadAllItems();

  inputs.forEach(function (inputItem) {
    var cartItem = findCartItem(cartItems, inputItem);
    if (cartItem) {
      cartItem.count++;
    }
    else {
      cartItems.push({item: getItem(allItems, inputItem), count: 1});
    }
  });


  var receipt =
    '***<没钱赚商店>收据***\n' +
    getItemsString(cartItems) +
    '----------------------\n' +
    '总计：' + formatPrice(getAmount(cartItems)) + '(元)\n' +
    '**********************';

  console.log(receipt);
}


function getItem(allItems, inputItem) {
  var founditem = undefined;

  allItems.forEach(function (item) {
    if (item.barcode === inputItem) {
      founditem = item;
      return false;
    }
  });

  return founditem;
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
