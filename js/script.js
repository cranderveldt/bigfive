var getToday = function() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd
  } 
  if (mm < 10) {
    mm = '0' + mm
  } 
  return mm + '.' + dd + '.' + yyyy;
};
var today = getToday();
var Main = function ($scope, $interval) {
  $scope.history = [];
  $scope.workout = {
      date: today
    , active: 0
    , routine: [
        { name: 'Row', weight: '', time: -5000, reps: '', id: ''}
      , { name: 'Chest Press', weight: '', time: -5000, reps: '', id: ''}
      , { name: 'Pulldown', weight: '', time: -5000, reps: '', id: ''}
      , { name: 'Overhead Press', weight: '', time: -5000, reps: '', id: ''}
      , { name: 'Leg Press', weight: '', time: -5000, reps: '', id: ''}
    ]
  };
  $scope.finished = false;
  $scope.loadWorkout = function(item, should_reset_time) {
    should_reset_time = should_reset_time || false;
    var index = _.indexOf($scope.history, item);
    $scope.remove($scope.history, index);
    if (should_reset_time) {
      for (var r in item.routine) {
        item.routine[r].time = -5000;
      }
    }
    $scope.workout = item;
  };
  $scope.remove = function(array, index){
    array.splice(index, 1);
  }
  $scope.loadData = function() {
    var data = localStorage.getItem('bigfive');
    if (data !== null) {
      $scope.history = JSON.parse(data);
    }
    var currentWorkout = _.find($scope.history, function(item) {
      return item.date === today;
    });
    if (currentWorkout !== undefined) {
      $scope.loadWorkout(currentWorkout);
    } else if ($scope.history.length > 0) {
      $scope.loadWorkout($scope.history[$scope.history.length -1], true);
    }
  };
  $scope.saveData = function() {
    $scope.history.push($scope.workout);
    localStorage.setItem('bigfive', JSON.stringify($scope.history));
    $scope.finished = true;
  };
  $scope.loadData();
  $scope.changeRoutine = function(num) {
    $scope.workout.active = $scope.workout.active + num;
  };
  $scope.convertTimeMins = function(mil) {
    var secs = Math.floor(mil / 1000);
    var mins = Math.floor(secs / 60);
    var seconds = secs % 60;
    if (seconds < 10) {
      seconds = '0' + seconds
    } 
    return mins + ':' + seconds;
  };
  $scope.convertTimeSecs = function(ex) {
    var secs = Math.floor(ex.time / 1000);
    if (secs < 0) {
      ex.status = 'countdown';
    }
    if (secs >= 0 && secs < 60) {
      ex.status = 'workout';
    }
    if (secs >= 60 && secs <= 90) {
      ex.status = 'golden';
    }
    if (secs > 90) {
      ex.status = 'over';
    }
    return secs + ' secs';
  };
  $scope.toggleTimer = function(ex) {
    if (ex.id === '') {
      ex.id = $interval(function(){
        ex.time = ex.time + 50;
      }, 50); 
    } else {
      if (angular.isDefined(stop)) {
        $interval.cancel(ex.id);
        ex.id = '';
      }
    }
  };
  $scope.resetTimer = function(ex) {
    if (ex.id !== '') {
      $interval.cancel(ex.id);
      ex.id = '';
    }
    ex.time = -5000;
  };
  $scope.reviewWorkout = function() {
    location.reload();
  };
};
var app = angular.module('bigfive', ['ngTouch']);
app.controller('Main',['$scope','$interval', Main]);
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