var addStudentFormCtrl = angularApp.controller('studentsOfClass', function($scope, AppDataService) {
  $scope.data = AppDataService;
  $scope.removeStudentFromClass= function(studentId, classId) {
    AppDataService.removeStudentFromClass(studentId, classId);
  };
});
