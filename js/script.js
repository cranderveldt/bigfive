var Main = function ($scope) {
  $scope.history = [];
  $scope.workout = {};
  $scope.date = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
  $scope.loadData = function() {
    var data = localStorage.getItem('bigfive');
    if (data !== null) {
      $scope.history = JSON.parse(data);
    }
    var date = Date();
    $scope.date = ;
    var currentWorkout = _.find($scope.selection.conditionStats, function(item) {
      return item.date === label;
    });
  };
  $scope.saveData = function() {
    localStorage.setItem('bigfive', JSON.stringify($scope.workout));
  };
  $scope.loadData();
};
var app = angular.module('bigfive', []);
app.controller('Main',['$scope','$http', Main]);
app.directive('tlRotate', function () {
  return {
    replace: false,
    transclude: false,
    restrict: 'A',
    scope: false,
    link: function ($scope, element, attrs) {
      
    }
  };
});