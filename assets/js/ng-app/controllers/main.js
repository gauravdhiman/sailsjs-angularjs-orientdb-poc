var mainCtrl = angularApp.controller('appCtrl', function($scope, AppDataService) {
  $scope.data = AppDataService;
  AppDataService.getClasses();
  $scope.rightComponent = '';

  $scope.hideNotification = function() {
    $scope.data.notification.show = false;
  };

  $scope.showNewClassForm = function() {
    $scope.rightComponent = 'New Class';
  };

  $scope.showAddStudentForm = function() {
    $scope.rightComponent = 'Add Student';
  };

  $scope.showClassDetailsGrid = function(classId) {
    AppDataService.selectClass(classId);
    $scope.rightComponent = 'Class Details';
  };

  $scope.deleteClass = function(classId) {
    AppDataService.deleteClass(classId);
  }
});
