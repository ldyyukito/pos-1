function Scanner(){

}

Scanner.prototype.scan=function(tag){
   //console.log(tag);
   var tagSplit = tag.split('-');
   var barcode = tagSplit[0];
   var count = parseFloat(tagSplit[1]) || 1;
  //console.log(barcode);
   var item =Item.find(barcode);
   //console.log(item);
   var cartItem;
   if (item) {
      cartItem = new CartItem(item,count);
   }

   return cartItem;
};
