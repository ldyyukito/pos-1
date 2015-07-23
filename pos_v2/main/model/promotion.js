function Promotion(type, barcodes) {
  this.type = type;
  this.barcodes = barcodes || [];
}

Promotion.findPromotionByType = function (promotionType) {
  var promotions = Promotion.getPromotions();
  for (var i = 0; i < promotions.length; i++) {
    if (promotions[i].type === promotionType) {
      return promotions[i];
    }
  }
};

Promotion.findBarcodes = function (promotion) {
  return promotion.barcodes;
};

Promotion.getPromotions = function () {
  return loadPromotions();
};
