/*jQuery(document).ready(function(){
  
});*/

var Main = function ($scope) {
  $scope.maps = [{ name: 'Default', fog: false, tiles: [] }];
  $scope.alltiles = [
    { name: "White", num: 1 }
    , { name: "Black", num: 2 }
    , { name: "Left Turn", num: 3 }
    , { name: "Right Turn", num: 4 }
    , { name: "Straight", num: 5 }
    , { name: "T", num: 6 }
    , { name: "4 Corners", num: 7 }
    , { name: "2 Corners", num: 8 }
    , { name: "Pong Left", num: 9 }
    , { name: "Pong Right", num: 10 }
    , { name: "One wall", num: 11 }
    , { name: "Two walls", num: 12 }
    , { name: "Three Walls", num: 13 }
  ];
  $scope.initialize = function() {
    var data = localStorage.getItem('tiles');
    if (data !== null) {
      $scope.maps = JSON.parse(data);
      // for (var i in $scope.maps[0].tiles) {
      //   $scope.maps[0].tiles[i].poi = false;
      // }
    }
  };
  $scope.rotateClockwise = function(str) {
    var num = parseInt(str, 10);
    if (num === 270) {
      return 0;
    } else {
      return num + 90;
    }
  };
  $scope.saveMap = function() {
    localStorage.setItem('tiles', JSON.stringify($scope.maps));
  };
  $scope.nextSource = function(src) {
    if (src === $scope.alltiles.length) {
      return 1;
    } else {
      return src + 1;
    }
  };
  $scope.addTile = function() {
    $scope.$apply(function() {
      $scope.maps[0].tiles.push({
        src: 1, rotate: 0
      });
    });
  };
  $scope.sortableOptions = {
    items: "> .tile"
  };
  $scope.initialize();
};
var app = angular.module('dnd-tiles', ['ui.sortable']);
app.controller('Main',['$scope','$http', Main]);
app.directive('tlRotate', function () {
  return {
    replace: false,
    transclude: false,
    restrict: 'A',
    scope: false,
    link: function ($scope, element, attrs) {
      element.on('click', function(e) {
        var tileIndex = $('.tile').index(element.parent());
        $scope.$apply(function() {
          $scope.maps[0].tiles[tileIndex].rotate = $scope.rotateClockwise(attrs.tlRotate);
          $scope.saveMap();
        });
      });
    }
  };
});
app.directive('tlSource', function () {
  return {
    replace: false,
    transclude: false,
    restrict: 'A',
    scope: false,
    link: function ($scope, element, attrs) {
      element.on('change', function(e) {
        var tileIndex = $('.tile').index(element.parent().parent());
        $scope.$apply(function() {
          $scope.maps[0].tiles[tileIndex].src = element.val();
          $scope.saveMap();
        });
      });
    }
  };
});
app.directive('tlAddTile', function () {
  return {
    replace: false,
    transclude: false,
    restrict: 'A',
    scope: false,
    link: function ($scope, element, attrs) {
      element.on('click', function(e) {
        $scope.addTile();
        $('#tiles').sortable("refresh");
        $scope.saveMap();
      });
    }
  };
});
app.directive('tlToggleGlobalFog', function () {
  return {
    replace: false,
    transclude: false,
    restrict: 'A',
    scope: false,
    link: function ($scope, element, attrs) {
      element.on('click', function(e) {
        $scope.$apply(function() {
          $scope.map.fog = !$scope.map.fog;
          $scope.saveMap();
        });
      });
    }
  };
});
app.directive('tlToggleFog', function () {
  return {
    replace: false,
    transclude: false,
    restrict: 'A',
    scope: false,
    link: function ($scope, element, attrs) {
      element.on('click', function(e) {
        var tileIndex = $('.tile').index(element.parent());
        var fogStatus = $scope.maps[0].tiles[tileIndex].fog;
        $scope.$apply(function() {
          $scope.maps[0].tiles[tileIndex].fog = !fogStatus;
        });
        $scope.saveMap();
      });
    }
  };
});
app.directive('tlTogglePoi', function () {
  return {
    replace: false,
    transclude: false,
    restrict: 'A',
    scope: false,
    link: function ($scope, element, attrs) {
      element.on('click', function(e) {
        var tileIndex = $('.tile').index(element.parent());
        var poiStatus = $scope.maps[0].tiles[tileIndex].poi;
        $scope.$apply(function() {
          $scope.maps[0].tiles[tileIndex].poi = !poiStatus;
        });
        $scope.saveMap();
      });
    }
  };
});
app.directive('tlSetFlag', function () {
  return {
    replace: false,
    transclude: false,
    restrict: 'A',
    scope: false,
    link: function ($scope, element, attrs) {
      element.on('change', function(e) {
        var tileIndex = $('.tile').index(element.parent().parent());
        $scope.$apply(function() {
          $scope.maps[0].tiles[tileIndex].flag = element.val();
          $scope.saveMap();
        });
      });
    }
  };
});
app.directive('tlSortable', function () {
  return {
    replace: false,
    transclude: false,
    restrict: 'A',
    scope: false,
    link: function ($scope, element, attrs) {
      element.on('sortchange', function(e) {
        $scope.saveMap();
      });
    }
  };
});