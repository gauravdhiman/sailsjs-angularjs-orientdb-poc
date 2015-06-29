var addStudentFormCtrl = angularApp.controller('addStudentFormCtrl', function($scope, AppDataService) {
  $scope.data = AppDataService;
  AppDataService.getStudents();

  $scope.addStudent = function() {
    AppDataService.addStudentToClass($scope.selectedClassId, $scope.selectedStudentId)
  }
});
