function Scanner(){

}

Scanner.prototype.scan=function(tag){
  var cartItem;

   var tagSplit = tag.split('-');
   var barcode = tagSplit[0];
   var count = parseFloat(tagSplit[1]) || 1;

  var item =Item.find(barcode);
   if (item) {
      cartItem = new CartItem(item,count);
   }

   return cartItem;
};
