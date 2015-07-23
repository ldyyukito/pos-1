/**
 * Created by sialvsic on 7/22/15.
 */
function Tag(barcodes) {
  this.Tags = [];
  this.addToTags(barcodes);
}

Tag.prototype.getTags = function () {
  return this.Tags;
};


Tag.prototype.calculateCount = function (barcode) {
  var existHyphen = isHyphen(barcode);
  var count = barcode.split('-');
  if (existHyphen) {
    return parseFloat(count[1]);
  }
  else {
    return 1;
  }
};

Tag.prototype.getBarcode = function (barcode) {
  var existHyphen = isHyphen(barcode);
  if (existHyphen) {
    return analyseBarcode(barcode);
  }
  else {
    return barcode;
  }
};

Tag.prototype.addToTags = function (barcodes) {
  var who = this;
  barcodes.forEach(function (barcode) {
    var countResult = who.calculateCount(barcode);
    var barcodeResult = who.getBarcode(barcode);
    who.Tags.push({barcode: barcodeResult, count: countResult});
  });

};

function isHyphen(tag) {
  return tag.indexOf('-') != -1;
}

function getHyphenPositon(barcode) {
  return barcode.indexOf('-');
}

function analyseBarcode(barcode) {
  return barcode.substring(0, getHyphenPositon(barcode));
}
