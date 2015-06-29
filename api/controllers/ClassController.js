/**
 * ClassController
 *
 * @description :: Server-side logic for managing Classes and Students in Classes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  addClass: function (req, res) {
    if (!(req.body)) {
        res.json(412, "No Class data recevied.");
        return;
    }

    if (typeof(req.body) == "object") {
        jsonObj = req.body;
    } else {
        try {
          jsonObj = JSON.parse(req.body);
        } catch (exception) {
          res.json(412, "Could not add class as data recevied seems to be an invalid format.");
        return;
        }
    }

    var options = {
        funcName: "addClass",
        protocol: "http",
        method: "POST",
        params: jsonObj
    };

    Classes.callDBFunction(options, function(err, results) {
      var classes;
      if (err) {
          res.json(err.code, err.message);
      } else {
          classes = results.result;
          res.json(classes);
      }
    });
  },
  getClasses: function(req, res) {
    var options = {};
    if (req.params.classId) {
      options.where._id = req.params.classId;
    } else {
      options.where = {'null':'null'};
    }
    options.fetchPlan = '*:-1';

    Classes.find(options).exec(function(err, results) {
        if (err) {
          res.json(err);
        } else {
          res.json(results);
        }
    });
  },
  deleteClass: function(req, res) {

    if (!req.params.classId) {
        res.json(412, "Can not delete class as it could not be identified.");
        return;
    }

    var options = {
        funcName: "deleteClass",
        protocol: "http",
        method: "POST",
        params: {
          classId: req.params.classId
        }
    };

    Classes.callDBFunction(options, function(err, results) {
      var classes;
      if (err) {
          res.json(err.code, err.message);
      } else {
          classes = results.result;
          res.json(classes);
      }
    });
  }
};
