angularApp.factory('AppDataService', function($http, $q) {
  var serverURL = 'http://localhost:1337';
  var apiURL = serverURL+'/api/v1';

  var fac = {
    students: [],
    classes: [],
    selectedClass: {},
    notification: {
      show: false,
      type: '',
      message: ''
    },
    showNotification: function(data, status) {
      fac.notification.type = 'danger';
      if (status == '500') {
        fac.notification.message = "Fatal server error. Don't panic. Report this as critical error.";
      } else if (status == '200') {
        fac.notification.type = 'success';
        fac.notification.message = 'Success: '+data;
      } else {
        fac.notification.message = 'Error: '+data;
      }
      fac.notification.show = true;
    },
    getClasses: function() {
      // fetch all classes from server and returns to controller
      $http.get(apiURL+'/classes')
        .success(function(data, status) {
          if (status == "200") {
            fac.classes = data;
          }
        })
        .error(function() {
          fac.showNotification(data, status);
        });
    },
    addClass: function(classObj) {
      $http.post(apiURL+'/classes', classObj)
        .success(function(data, status) {
          if (status == "200") {
            // add the class into classes array
            var len = fac.classes.push(data[0]);
            fac.classes[len-1].students = [];
            fac.showNotification('New class ('+data[0]._id+') created successfully.', status);
          }
        })
        .error(function() {
          fac.showNotification(data, status);
        });
    },
    deleteClass: function(classId) {
      // delete the given class from server
      $http.delete(apiURL+'/classes/'+classId)
        .success(function(data, status) {
          if (status == "200") {
            //fac.classes = data;
            for (var i = 0; i < fac.classes.length; i++) {
              if (fac.classes[i]._id == classId) {
                // remove class from classes array
                fac.classes.splice(i, 1);
                fac.selectedClassIndx =  fac.classes[0];
                fac.showNotification('Class ('+classId+') has been deleted successfully.', status);
                break;
              }
            }
          }
        })
        .error(function() {
          fac.showNotification(data, status);
        });
    },
    selectClass: function(id) {
      for (var i = 0; i < fac.classes.length; i++) {
        if (fac.classes[i]._id == id) {
          fac.selectedClass = fac.classes[i];
        }
      }
    },
    getStudents: function() {
      // Get students from external service
      if (this.students.length == 0) {
        $http.get(apiURL+'/students')
          .success(function(data, status) {
            if (status == "200") {
              fac.students = data;
            }
          })
          .error(function() {
            fac.showNotification(data, status);
          });
      }
    },
    addStudentToClass: function(classId, studentId) {
      var indx, studentObj;
      for (indx = 0; indx < fac.students.length; indx++) {
        if (fac.students[indx].id == studentId) {
          studentObj = fac.students[indx];
          break;
        }
      }
      if (classId && studentObj) {
        // Assign student to class
        $http.post(apiURL+'/classes/'+classId+'/students', studentObj)
          .success(function(data, status) {
            if (status == "200") {
              for (indx = 0; indx < fac.classes.length; indx++) {
                if (fac.classes[indx]._id == classId) {
                  fac.classes[indx].students.push(data[0]);
                  fac.showNotification('Student ('+studentId+') has been successfully added to class'+classId+'.', status);
                  break;
                }
              }
            }
          })
          .error(function(data, status) {
            fac.showNotification(data, status);
          });
      }
    },
    removeStudentFromClass: function(studentId, classId) {
      // Remove student from class
      $http.delete(apiURL+'/classes/'+classId+'/students/'+studentId)
        .success(function(data, status) {
          if (status == "200") {
            for(var i =0; i < fac.selectedClass.students.length; i++) {
              if (fac.selectedClass.students[i]._id == studentId) {
                fac.selectedClass.students.splice(i, 1);
                fac.showNotification('Successfully removed student ('+studentId+') from class ('+classId+').', status);
                break;
              }
            }
          }
        })
        .error(function(data, status) {
          fac.showNotification(data, status);
        });
    }
  };
  return fac;
});
