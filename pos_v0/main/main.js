//TODO: Please write code in this file.
function printReceipt(inputs) {
  var result = '***<没钱赚商店>收据***\n';
  var sum = {price: 0};

  for (var i = 0; i < inputs.length; i++) {
    result += processItem(inputs[i], sum);
  }
  showReceipt(result, sum);

}

function processItem(item, sum) {

  var count = item.count * item.price;
  count = count.toFixed(2);
  var temp = item.price;
  temp = temp.toFixed(2);
  sum.price += parseInt(count);
  return '名称：' + item.name + '，' + '数量：' + item.count + item.unit + '，' + '单价：' + temp + '(元)，' + '小计：' + count + '(元)' + '\n';

}


function showReceipt(result, sum) {

  sum.price = sum.price.toFixed(2);
  result += '----------------------\n';
  result += '总计：' + sum.price + '(元)\n';
  result += '**********************';
  console.log(result);

}
