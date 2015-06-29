/**
 * ClassController
 *
 * @description :: Server-side logic for managing Classes and Students in Classes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var request = require('request');
module.exports = {
  getStudents: function(req, res) {
    request('https://s3-ap-southeast-2.amazonaws.com/teremstudents/students.json', function (error, response, body) {
      if (error) {
        res.json({
          type: 'error',
          message: 'Error: Could not get Students from remote web service'
        });
      } else if (response.statusCode == 200) {
        body = JSON.parse(body);
        res.json(body.Students);
      }
    });
  },
  addStudentToClass: function(req, res) {
    var jsonObj = {};
    if (!(req.body)) {
        res.json(412, "No Student data recevied.");
        return;
    }

    if (typeof(req.body) == "object") {
        jsonObj.studentObj = req.body;
    } else {
        try {
          jsonObj.studentObj = JSON.parse(req.body);
        } catch (exception) {
          res.json(412, "Could not add student to class as data recevied seems to be in an invalid format.");
        return;
        }
    }

    if (!req.params.classId) {
        res.json(412, "Can not add student to class, as classId is not provided.");
        return;
    } else {
      jsonObj.classId = req.params.classId;
    }

    var options = {
        funcName: "addStudentToClass",
        protocol: "http",
        method: "POST",
        params: jsonObj
    };

    Classes.callDBFunction(options, function(err, results) {
        var student;
        if (err) {
            res.json(err.code, err.message);
        } else {
            student = results.result;
            res.json(student);
        }
    });
  },
  removeStudentFromClass: function(req, res) {
    if ((!req.params.classId) || (!req.params.studentId)) {
        res.json(412, "Can not remove student from class as iformation provided is incomplete.");
        return;
    }

    var jsonObj = {
      classId: req.params.classId,
      studentId: req.params.studentId
    }

    var options = {
        funcName: "removeStudentFromClass",
        protocol: "http",
        method: "POST",
        params: jsonObj
    };

    Classes.callDBFunction(options, function(err, results) {
        var student;
        if (err) {
            res.json(err.code, err.message);
        } else {
            student = results.result;
            res.json(student);
        }
    });
  }
};
