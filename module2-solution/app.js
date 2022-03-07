(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
  var tbc = this;

  tbc.errorMessage = "Everything is bought!";
  tbc.errorMessageCond = false;

  tbc.ToBuyItems = ShoppingListCheckOffService.getToBuyItems();

  tbc.toBuy = function(index){
    var itemBought = tbc.ToBuyItems[index];
    ShoppingListCheckOffService.addItems(itemBought.name, itemBought.quantity);
    ShoppingListCheckOffService.removeItem(index);
    if(ShoppingListCheckOffService.getToBuyItems().length === 0){
      tbc.errorMessageCond = true;
    }
  };

}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {

  var abc = this;

  abc.errorMessage = "Nothing bought yet!";

  abc.AlreadyBoughtItems = ShoppingListCheckOffService.getAlreadyBoughtItems();

  abc.errorMessageCond = function (){
    if(abc.AlreadyBoughtItems.length === 0){
      return true;
    }
    return false;
  };

}

function ShoppingListCheckOffService() {
  var service = this;

  var ToBuyItems = [
  {
    name: "Milk",
    quantity: "2"
  },
  {
    name: "Donuts",
    quantity: "200"
  },
  {
    name: "Cookies",
    quantity: "300"
  },
  {
    name: "Chocolate",
    quantity: "5"
  },
  {
    name: "Butter",
    quantity: "10"
  }];

  // Add removed items to AlreadyBoughtItems array
  var AlreadyBoughtItems = [];


  // Remove items from ToBuyItems
  service.removeItem = function (itemIndex) {
    ToBuyItems.splice(itemIndex, 1);
  };

  service.addItems = function (name, quantity) {
    var item = {
      name: name,
      quantity: quantity
    };
    AlreadyBoughtItems.push(item);
  }

  //return ToBuyItems
  service.getToBuyItems = function () {
    return ToBuyItems;
  };
  //return AlreadyBoughtItems
  service.getAlreadyBoughtItems = function () {
    return AlreadyBoughtItems;
  };

}
})();
