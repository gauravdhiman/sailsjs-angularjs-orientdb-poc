var newClassFormCtrl = angularApp.controller('newClassFormCtrl', ['$scope', 'AppDataService', function($scope, AppDataService) {
  $scope.classObj = {
    _id: null,
    name: '',
    maxStudentCount: 30,
    startDate: ''
  };

  $scope.spinUp = function() {
    $scope.classObj.maxStudentCount++;
  };
  $scope.spinDown = function() {
    $scope.classObj.maxStudentCount--;
  };
  $scope.addClass = function() {
    AppDataService.addClass($scope.classObj);
    $scope.classObj = {
      _id: null,
      name: '',
      maxStudentCount: 30,
      startDate: ''
    };
  };
}]);
