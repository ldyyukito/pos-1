/**
 * Created by sialvsic on 7/22/15.
 */
function Tag(barcodes) {
  this.Tags = [];
  this.addTags(barcodes);
}

Tag.prototype.getTags = function () {
  return this.Tags;
};


Tag.prototype.calculateCount = function (barcode) {
  var existHyphen = isHyphen(barcode);
  var count = barcode.split('-');

  if (existHyphen) {
    return count[1];
  }
  else {
    return 1;
  }
};

Tag.prototype.analyseBarcode = function (barcode) {
  var existHyphen = isHyphen(barcode);
  if (existHyphen) {
    return getBarcode(barcode);
  }
  else {
    return barcode;
  }


};

Tag.prototype.addTags = function (barcodes) {
  var Tag = this;
  barcodes.forEach(function (barcode) {
    var count = Tag.calculateCount(barcode);
    var barcodeResult = Tag.analyseBarcode(barcode);
    Tag.Tags.push({barcode: barcodeResult, count: count});
  });

};

function isHyphen(tag) {
  return tag.indexOf('-') != -1;
}

function getHyphenPositon(barcode) {
  return barcode.indexOf('-');
}

function getBarcode(barcode) {
  return barcode.substring(0, getHyphenPositon(barcode));
}
