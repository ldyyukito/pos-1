//TODO: Please write code in this file.
function printReceipt(inputs) {
  var cartResult = countCartInput(inputs);
  countDiscount(cartResult);
  console.log(countReceiptPrice(cartResult));
}

function countCartInput(inputs) {
  var cartResult = [];
  for (var i = 0; i < inputs.length; i++) {
    findSameItem(inputs[i], cartResult);
  }
  return cartResult;
}

function findSameItem(item, cartResult) {

  for (var x = 0; x < cartResult.length; x++) {
    if (item === cartResult[x].barcode) {
      cartResult[x].count++;
      return;
    }
  }

  if ((index = item.indexOf('-')) != -1) {
    cartResult.push({barcode: item.substring(0, index), count: item.charAt(index + 1), free: 0, freegive: 0});
    return;
  }

  cartResult.push({barcode: item, count: 1, free: 0, freegive: 0});

}


function countDiscount(cartResult) {

  var promotion = loadPromotions();
  for (var y = 0; y < cartResult.length; y++) {
    findDiscountItem(cartResult[y], promotion);
  }

}

function findDiscountItem(discountItem, promotion) {

  for (var z = 0; z < promotion[0].barcodes.length; z++) {
    if (discountItem.barcode === promotion[0].barcodes[z]) {
      discountItem.free = 1;
      return;
    }
  }

}

function countReceiptPrice(cartResult) {
  var allItem = loadAllItems();
  var receiptContent = '***<没钱赚商店>收据***\n';
  var sumPrice = {sumPrice: 0, savePrice: 0};

  for (var j = 0; j < cartResult.length; j++) {
    receiptContent += recepitInfo(cartResult[j], allItem, sumPrice);
  }
  receiptContent += '----------------------\n';
  receiptContent += '挥泪赠送商品：\n';
  for (var z = 0; z < cartResult.length; z++) {
    if (cartResult[z].freegive === 1)
      receiptContent += '名称：' + cartResult[z].name + '，' + '数量：' + cartResult[z].freegive + cartResult[z].unit + '\n';
  }
  receiptContent += '----------------------\n';
  receiptContent += '总计：' + sumPrice.sumPrice.toFixed(2) + '(元)\n';
  receiptContent += '节省：' + sumPrice.savePrice.toFixed(2) + '(元)\n';
  receiptContent += '**********************';

  return receiptContent;
}

function recepitInfo(recepitItem, allItem, sumPrice) {
  var receipt = "";

  for (var y = 0; y < allItem.length; y++) {
    receipt += countRecepitItem(recepitItem, allItem[y], sumPrice);
  }

  return receipt;
}

function countRecepitItem(recepitItem, item, sumPrice) {
  var receipt = "";
  var price = 0.0;
  var number = 0.0;

  if (recepitItem.free === 0 && recepitItem.barcode === item.barcode) {
    number = recepitItem.count;
    price = number * item.price;
  }
  else if (recepitItem.free === 1 && recepitItem.barcode === item.barcode) {
    if (recepitItem.count > 2) {
      number = recepitItem.count - 1;
      price = number * item.price;
      recepitItem.freegive = 1;
      sumPrice.savePrice += item.price;
      recepitItem.name = item.name;
      recepitItem.unit = item.unit;
    }
    else {
      number = recepitItem.count;
      price = number * item.price;
    }
  }
  else {
    return receipt;
  }
  sumPrice.sumPrice += parseInt(price.toFixed(2));
  receipt = '名称：' + item.name + '，' + '数量：' + recepitItem.count + item.unit + '，单价：' + item.price.toFixed(2) + '(元)，' + '小计：' + price.toFixed(2) + '(元)\n';

  return receipt;
}
