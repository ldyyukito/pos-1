//TODO: Please write code in this file.
function printReceipt(Tags) {
  var cartItems = [];
  var allItems = loadAllItems();
  var allItemsResults = getAllItems(Tags, allItems);

  getCartItems(allItemsResults, cartItems);
  setPromotions(cartItems);
  var receipt = getReceipt(cartItems);

  console.log(receipt);
}

function getReceipt(cartItems) {
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
  return receipt;
}

function getFreeItem(cartItems) {
  var Freeitem = "";
  var isfree;
  cartItems.forEach(function (cartItem) {
    cartItem.freeCount > 0 ? isfree = true : isfree = false;
    if (isfree) {
      Freeitem += '名称：' + cartItem.item.name + '，数量：' + cartItem.freeCount + cartItem.item.unit + '\n';
    }
  });

  return Freeitem;
}

function getSave(cartItems) {
  var savePrice = 0;

  cartItems.forEach(function (cartItem) {
    if (cartItem.freeCount > 0)
      savePrice += cartItem.item.price;
  });
  return savePrice;
}

function setPromotions(cartItems) {

  var promotions = loadPromotions();
  promotions.forEach(function (promotion) {
    if (promotion.type === 'BUY_TWO_GET_ONE_FREE') {
      buyTwoOneFree(promotion, cartItems);
    }
  });

}

function buyTwoOneFree(promotion, cartItems) {
  cartItems.forEach(function (item) {
    getPromotionItem(item, promotion);
  });
}

function getPromotionItem(item, promotion) {
  promotion.barcodes.forEach(function (barcode) {
    if (barcode === item.item.barcode) {
      item.freeCount = Math.floor(item.count / 3);
    }
  });
}

function getAllItems(Tags, allItems) {
  var cartItems = [];
  var newTag;

  Tags.forEach(function (tag) {
    var existHyphen = isHyphen(tag);
    var tagNumber = 1;
    newTag = tag;

    if (existHyphen) {
      newTag = tag.split('-');
      tagNumber = newTag[1];
      newTag = newTag[0];
    }
    item = findItem(newTag, allItems);
    if (item) {
      for (var x = 1; x <= tagNumber; x++) {
        cartItems.push(item);
      }
    }
  });

  return cartItems;
}

function isHyphen(tag) {
  return tag.indexOf('-') != -1;
}

function findItem(barcode, allItems) {
  var foundItem = undefined;
  allItems.forEach(function (item) {
    if (item.barcode === barcode) {
      foundItem = item;
      return true;
    }
  });
  return foundItem;
}

function getCartItems(allItemsResults, cartItems) {

  allItemsResults.forEach(function (allItem) {
    var Item = findCartItem(cartItems, allItem.barcode);
    if (Item) {
      Item.count++;
    }
    else {
      cartItems.push({item: allItem, count: 1, freeCount: 0});
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


function getSubTotal(count, freecount, price) {
  return (count - freecount) * price;
}

function getAmount(cartItems) {
  var amount = 0;

  cartItems.forEach(function (item) {
    amount += getSubTotal(item.count, item.freeCount, item.item.price);
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
      '(元)，小计：' + formatPrice(getSubTotal(cartitem.count, cartitem.freeCount, cartitem.item.price)) + '(元)\n';
  });

  return itemsString;
}

function formatPrice(price) {
  return price.toFixed(2);
}
