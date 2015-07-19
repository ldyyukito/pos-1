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

  for (var x = 0; x < inputsResult.length; x++) {
    if (item === inputsResult[x].barcode) {
      inputsResult[x].count++;
      return;
    }
  }

  inputsResult.push({barcode: item, count: 1});
}

function receiptInfo(inputsResult) {
  var receiptContent = '***<没钱赚商店>收据***\n';
  var allItem = loadAllItems();
  var sumPrice = {price: 0};

  for (var y = 0; y < inputsResult.length; y++) {
    var itemContent = findSameItem(inputsResult[y], allItem, sumPrice);
    if (itemContent) {
      receiptContent += itemContent;
    }
  }
  sumPrice.price = sumPrice.price.toFixed(2);
  receiptContent += '----------------------\n';
  receiptContent += '总计：' + sumPrice.price + '(元)\n';
  receiptContent += '**********************';

  return receiptContent;
}


function findSameItem(inputsResult, allItem, sumPrice) {
  var receiptContent = "";
  var itemPrice = 0.0;

  for (var z = 0; z < allItem.length; z++) {
    if (inputsResult.barcode === allItem[z].barcode) {
      itemPrice = inputsResult.count * allItem[z].price;
      itemPrice = itemPrice.toFixed(2);
      sumPrice.price += parseFloat(itemPrice);
      receiptContent += '名称：' + allItem[z].name + '，' + '数量：' + inputsResult.count + allItem[z].unit + '，' + '单价：' +
      allItem[z].price.toFixed(2) + '(元)，' + '小计：' + itemPrice + '(元)\n';
    }
  }

  return receiptContent;
}

function showResult(receipt) {
  console.log(receipt);
}
