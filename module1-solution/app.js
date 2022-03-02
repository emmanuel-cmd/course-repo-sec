(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
  $scope.lunchitems = "";
  $scope.outMessage = "";
  $scope.color = "black";

  $scope.countitems = function () {

    $scope.vecItems = $scope.lunchitems.split(',');

    //drop empty string
    //const empindex = $scope.vecItems.indexOf(' ');
    //$scope.vecItems.splice(empindex-1, 1);
    for(var i=0; i<$scope.vecItems.length; i++){
      if(!/^[a-zA-Z]/.test($scope.vecItems[i])){
        $scope.vecItems.splice(i, 1);
      }
    }
    console.log($scope.vecItems);

    $scope.numItems = $scope.vecItems.length;

    //count items and return length
    if($scope.numItems == 0) {
      $scope.outMessage = "Please enter data first";
      $scope.color = "red";
    } else if($scope.numItems<=3) {
      $scope.outMessage = "Enjoy!";
      // $(".message").css('color', 'red');
      $scope.color = "green";
    } else {
      $scope.outMessage = "Too much!";
      $scope.color = "green";
    }

  };


}

})();
