//TODO: Please write code in this file.
function printReceipt(inputs) {
  var inputsResult = [];

  for (var i = 0; i < inputs.length; i++) {
    countSameItem(inputs[i], inputsResult);
  }

  var receipt = receiptInfo(inputsResult);
  showResult(receipt);

}


function countSameItem(item, inputsResult) {
  var barcodeLenght = 10;

  for (var x = 0; x < inputsResult.length; x++) {
    if (item === inputsResult[x].barcode) {
      inputsResult[x].count++;
      return;
    }
  }
  if (item.length > barcodeLenght) {
    inputsResult.push({barcode: item.substr(0, barcodeLenght), count: item.charAt(barcodeLenght + 1), free: 0});
    return;
  }
  inputsResult.push({barcode: item, count: 1, free: 1, freegive: 0, name: "", unit: ""});

}

function receiptInfo(inputsResult) {
  var receiptContent = '***<没钱赚商店>收据***\n';
  var allItem = loadAllItems();
  var sumPrice = {price: 0, saveprice: 0};

  for (var y = 0; y < inputsResult.length; y++) {
    var itemContent = findSameItem(inputsResult[y], allItem, sumPrice);
    if (itemContent) {
      receiptContent += itemContent;
    }
  }
  sumPrice.price = sumPrice.price.toFixed(2);
  sumPrice.saveprice = sumPrice.saveprice.toFixed(2);
  receiptContent += '----------------------\n';
  receiptContent += '挥泪赠送商品：\n';
  for (var z = 0; z < inputsResult.length; z++) {
    if (inputsResult[z].free === 1 && inputsResult[z].freegive >= 1)
      receiptContent += '名称：' + inputsResult[z].name + '，' + '数量：' + inputsResult[z].freegive + inputsResult[z].unit + '\n';
  }
  receiptContent += '----------------------\n';
  receiptContent += '总计：' + sumPrice.price + '(元)\n';
  receiptContent += '节省：' + sumPrice.saveprice + '(元)\n';
  receiptContent += '**********************';


  return receiptContent;
}


function findSameItem(inputsResult, allItem, sumPrice) {
  var receiptContent = "";

  for (var z = 0; z < allItem.length; z++) {
    if (inputsResult.barcode === allItem[z].barcode) {
      receiptContent = processReceipt(inputsResult, allItem[z], sumPrice);
    }
  }

  return receiptContent;
}


function processReceipt(inputsResult, allItem, sumPrice) {
  var receiptContent = "";
  var itemPrice = inputsResult.count * allItem.price;


  if (inputsResult.free === 1 && inputsResult.count >= 2) {
    itemPrice -= allItem.price;
    inputsResult.freegive = 1;
    sumPrice.saveprice += parseFloat(allItem.price.toFixed(2));
    //inputsResult.push({name: allItem.name, unit: allItem.unit});
    inputsResult.name = allItem.name;
    inputsResult.unit = allItem.unit;
  }

  itemPrice = itemPrice.toFixed(2);
  sumPrice.price += parseFloat(itemPrice);

  receiptContent += '名称：' + allItem.name + '，' + '数量：' + inputsResult.count + allItem.unit + '，' + '单价：' +
  allItem.price.toFixed(2) + '(元)，' + '小计：' + itemPrice + '(元)\n';
  return receiptContent;
}


function showResult(receipt) {
  console.log(receipt);
}
