(function(){
  'use strict';

  // I use 2 controllers and 2 services to separate states of views and data
  angular.module('ShoppingListCheckOff', [])
  .controller('PrePopulateListController', PrePopulateListController)
  .controller('BoughtListController', BoughtListController)
  .service('PrePopulateListService', PrePopulateListService)
  .service('BoughtListService', BoughtListService);

  // first controller is responsible for displaying the view of pre populate items
  PrePopulateListController.$inject = ['$scope', 'PrePopulateListService', 'BoughtListService']
  function PrePopulateListController ($scope, PrePopulateListService, BoughtListService) {
      var preListCtl = this;
      preListCtl.MSG_EVERYTHING_BOUGHT = "Everything is bought!";
      preListCtl.isEmptyBuyList = false;
      preListCtl.prePopulateList = PrePopulateListService.getItems();

      preListCtl.toBuy = function(index) {
        var itemBought = preListCtl.prePopulateList[index];
        BoughtListService.addItem(itemBought.name, itemBought.quantity);
        PrePopulateListService.removeItem(index);

        if (PrePopulateListService.getItems().length == 0) {
          preListCtl.isEmptyBuyList = true;
        }

      };
  }

  // second controller is responsible for updating views of bought item list
  BoughtListController.$inject = ['$scope', 'BoughtListService']
  function BoughtListController ($scope, BoughtListService) {
      var boughtListCtl = this;
      boughtListCtl.PRE_MSG_NOTHING_BOUGHT = "Nothing bought yet.";
      boughtListCtl.boughtList = BoughtListService.getItems();
      boughtListCtl.isEmptyBoughtList = function(){
        if (boughtListCtl.boughtList.length == 0)
          return true;
        return false;
      };
  }


  // first service is reponsible for preparing prepopulate shopping item list
  function PrePopulateListService() {
    var service1 = this;
    var items = [
      {name: "Chocolate", quantity:10},
      {name: "cookie", quantity:20},
      {name: "Peanut Butter", quantity:30},
      {name: "Pepto Bismol", quantity:40},
      {name: "Donut", quantity:50}
    ];

    service1.getItems = function() {
      return items;
    };

    service1.removeItem = function(index) {
      items.splice(index, 1);
    };
  }


  // second service is reponsible for updating data which is bought item list
  function BoughtListService() {
    var service = this;
    var items = [];

    service.addItem = function(itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      items.push(item);
    };

    service.getItems = function() {
      return items;
    };
  }

})();
