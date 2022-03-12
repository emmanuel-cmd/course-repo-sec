(function () {
'use strict';

angular.module('SearchMenuItemApp', [])
.controller('SearchMenuItemController', SearchMenuItemController)
.factory('SearchMenuItemFactory', SearchMenuItemFactory)
.component('foundItems', {
  templateUrl: 'foundItems.html',
  controller: SearchMenuItemComponentController,
  bindings: {
    items: '<',
    message: '@message',
    onRemove: '&'
  }
});

SearchMenuItemComponentController.$inject = ['$scope', '$element']
function SearchMenuItemComponentController($scope, $element) {
  var $ctrl = this;

  $ctrl.remove = function (indx) {
    $ctrl.onRemove({ index: indx });
  };
}


SearchMenuItemController.$inject = ['SearchMenuItemFactory', '$http'];
function SearchMenuItemController(SearchMenuItemFactory, $http) {
  var searchCtl = this;

  var foundList = SearchMenuItemFactory();

  searchCtl.items = SearchMenuItemService.getItems;
  searchCtl.message = "";

  searchCtl.getFoundItems = function() {
    searchCtl.message = "";
    if (searchCtl.searchStr == null || searchCtl.searchStr == "") {
      searchCtl.message = "Nothing found";
      return;
    }


    var response = $http({
      method: ("GET"),
      url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
    }).then(function (responseData) {
        var allItemList = responseData.data.menu_items;
        searchCtl.items = [];

        for (var index in allItemList) {
          if (allItemList[index].description.includes(searchCtl.searchStr)) {
            var item = {};
            item = {
              'name': allItemList[index].name,
              'short_name' : allItemList[index].short_name,
              'description' : allItemList[index].description,
            };

            searchCtl.items.push(item);
      //      SearchMenuItemService.addItem(item);
      //      foundList.addItem(item);
          }
        }
        if (searchCtl.items.length == 0) {
          searchCtl.items = [];
          searchCtl.message = "Nothing found";
        }

        //  searchCtl.items = foundList.getItems;
    })
    .catch(function (error) {
      console.log("Request to web server failed. " + error);
    });
  };


  searchCtl.removeItem = function (itemIndex) {
//    foundList.removeItem(itemIndex);
      searchCtl.items.splice(itemIndex, 1);
  };
}


// If not specified, maxItems assumed unlimited
function SearchMenuItemService(maxItems) {
  var service = this;

  // List of shopping items
  var items = [];

  service.addItem = function (item) {
      items.push(item);
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
}


function SearchMenuItemFactory() {
  var factory = function (maxItems) {
    return new SearchMenuItemService(maxItems);
  };

  return factory;
}

})();



// (function () {
// 'use strict';
//
// angular.module('NarrowItDownApp', [])
// .controller('NarrowItDownController', NarrowItDownController)
// .service('MenuSearchService', MenuSearchService)
// .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com')
// .component('foundItems', {
//   templateUrl: 'foundItems.html',
//   controller: NarrowItDownComponentController,
//   bindings: {
//     found: '<',
//     onRemove: '&',
//     message: '@message'
//   }
// });
//
// NarrowItDownComponentController.$inject = ['$scope', '$element']
// function NarrowItDownComponentController($scope, $element) {
//   var ndc = this;
//
//   ndc.remove = function (indx) {
//     ndc.onRemove({ index: indx });
//   };
// }
//
//
//
// NarrowItDownController.$inject = ['MenuSearchService'];
// function NarrowItDownController(MenuSearchService) {
//
//   var ndc = this;
//
//   ndc.searchTerm = "tons";
//
//   ndc.setmenu = MenuSearchService.getMatchedMenuItems;
//
//   ndc.found = MenuSearchService.getItems();
//
//   ndc.message = "Nothing found";
//
//   console.log(ndc.found);
//
//   ndc.removeItem = function(itemIndex){
//     MenuSearchService.removeItem(itemIndex);
//   };
// }
//
// MenuSearchService.$inject = ['$http', 'ApiBasePath'];
// function MenuSearchService($http, ApiBasePath) {
//
//   var service = this;
//   var foundItems = [];
//
//   service.getMatchedMenuItems = function (searchTerm) {
//
//     $http({
//       method: "GET",
//       url: (ApiBasePath + "/menu_items.json")
//     }).then(function (response) {
//
//
//       var result = response.data.menu_items;
//       //console.log(result[0].description.indexOf("tons") !== -1);
//       for(var i=0; i<result.length; i++){
//
//         if(result[i].description.indexOf(searchTerm) !== -1){
//           foundItems.push(result[i]);
//         }
//       }
//
//     })
//     .catch(function (error) {
//       console.log("Something went terribly wrong.");
//     });
//     //console.log(foundItems);
//   };
//
//   service.removeItem = function (itemIndex) {
//     foundItems.splice(itemIndex, 1);
//   };
//
//   service.getItems = function () {
//     return foundItems;
//   };
//
// }
//
//
// })();




// ToBuyController.$inject = ['ShoppingListCheckOffService'];
// function ToBuyController(ShoppingListCheckOffService){
//   var tbc = this;
//
//   tbc.errorMessage = "Everything is bought!";
//   tbc.errorMessageCond = false;
//
//   tbc.ToBuyItems = ShoppingListCheckOffService.getToBuyItems();
//
//   tbc.toBuy = function(index){
//     var itemBought = tbc.ToBuyItems[index];
//     ShoppingListCheckOffService.addItems(itemBought.name, itemBought.quantity);
//     ShoppingListCheckOffService.removeItem(index);
//     if(ShoppingListCheckOffService.getToBuyItems().length === 0){
//       tbc.errorMessageCond = true;
//     }
//   };
//
// }
//
//
// AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
// function AlreadyBoughtController(ShoppingListCheckOffService) {
//
//   var abc = this;
//
//   abc.errorMessage = "Nothing bought yet!";
//
//   abc.AlreadyBoughtItems = ShoppingListCheckOffService.getAlreadyBoughtItems();
//
//   abc.errorMessageCond = function (){
//     if(abc.AlreadyBoughtItems.length === 0){
//       return true;
//     }
//     return false;
//   };
//
// }
//
// function ShoppingListCheckOffService() {
//   var service = this;
//
//   var ToBuyItems = [
//   {
//     name: "Milk",
//     quantity: "2"
//   },
//   {
//     name: "Donuts",
//     quantity: "200"
//   },
//   {
//     name: "Cookies",
//     quantity: "300"
//   },
//   {
//     name: "Chocolate",
//     quantity: "5"
//   },
//   {
//     name: "Butter",
//     quantity: "10"
//   }];
//
//   // Add removed items to AlreadyBoughtItems array
//   var AlreadyBoughtItems = [];
//
//
//   // Remove items from ToBuyItems
//   service.removeItem = function (itemIndex) {
//     ToBuyItems.splice(itemIndex, 1);
//   };
//
//   service.addItems = function (name, quantity) {
//     var item = {
//       name: name,
//       quantity: quantity
//     };
//     AlreadyBoughtItems.push(item);
//   }
//
//   //return ToBuyItems
//   service.getToBuyItems = function () {
//     return ToBuyItems;
//   };
//   //return AlreadyBoughtItems
//   service.getAlreadyBoughtItems = function () {
//     return AlreadyBoughtItems;
//   };
//
// }
