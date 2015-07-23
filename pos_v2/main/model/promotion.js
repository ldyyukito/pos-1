function Promotion(type, barcodes) {
  this.type = type;
  this.barcodes = barcodes || [];
}

Promotion.prototype.getType = function () {
  return this.type;
};

Promotion.prototype.getBarcodes = function () {
  return this.barcodes;
};
