function CartItem(item,count){
  this.item=item;
  this.count=count;
}

CartItem.prototype.getPrice=function(){
  return this.count * this.item.getPrice();
};

CartItem.prototype.getCartItemBarcode=function()
{
  return this.item.getItemBarcode();
};
