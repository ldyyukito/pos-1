//TODO: Please write code in this file.
function printReceipt(barcodes) {
  var cartItems = [];
  var allItems = loadAllItems();
  var itemsResults = getAllItems(barcodes, allItems);

  buyTwoOneFree(itemsResults);
  getCartItems(itemsResults, cartItems);

  var receipt =
    '***<没钱赚商店>收据***\n' +
    getItemsString(cartItems) +
    '----------------------\n' +
    '挥泪赠送商品：\n' +
    getFreeItem(cartItems) +
    '----------------------\n' +
    '总计：' + formatPrice(getAmount(cartItems)) + '(元)\n' +
    '节省：' + formatPrice(getSave(cartItems)) + '(元)\n' +
    '**********************';

  console.log(receipt);
}

function getFreeItem(cartItems) {
  var Freeitem = "";
  cartItems.forEach(function (cartItem) {
    if (cartItem.item.freeFlag === 1) {
      Freeitem += '名称：' + cartItem.item.name + '，数量：1' + cartItem.item.unit + '\n';
    }
  });
  return Freeitem;
}

function getSave(cartItems) {
  var savePrice = 0;
  cartItems.forEach(function (cartItem) {
    if (cartItem.item.freeFlag === 1)
      savePrice += cartItem.item.price;
  });
  return savePrice;
}

function buyTwoOneFree(cartItems) {
  var promotions = loadPromotions();

  cartItems.forEach(function (item) {
    getPromotionItem(item, promotions);
  });
}

function getPromotionItem(item, promotions) {
  promotions[0].barcodes.forEach(function (barcode) {
    if (barcode === item.barcode) {
      item.freeFlag = 1;
    }
  });
}

function getAllItems(barcodes, allItems) {
  var cartItems = [];
  var index = 0;
  var newBarcode;

  barcodes.forEach(function (barcode) {
    if ((index = barcode.indexOf('-')) == -1) {
      item = findItems(barcode, allItems);
      if (item)
        cartItems.push(item);
    }
    else {
      newBarcode = barcode.substring(0, index);
      item = findItems(newBarcode, allItems);
      if (item) {
        for (var x = 0; x < barcode.charAt(index + 1); x++)
          cartItems.push(item);
      }
    }
  });
  return cartItems;
}

function findItems(barcode, allItems) {
  var foundItems = undefined;
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


function getSubTotal(count, price, freeFlag) {

  if (freeFlag === 1)
    return (count - 1) * price;
  else
    return count * price;

}

function getAmount(cartItems) {
  var amount = 0;

  cartItems.forEach(function (item) {
    amount += getSubTotal(item.count, item.item.price, item.item.freeFlag);
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
      '(元)，小计：' + formatPrice(getSubTotal(cartitem.count, cartitem.item.price, cartitem.item.freeFlag)) + '(元)\n';
  });

  return itemsString;
}

function formatPrice(price) {
  return price.toFixed(2);
}
