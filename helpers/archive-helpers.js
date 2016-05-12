var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpHelpers = require(path.join(__dirname, '../web/http-helpers.js'));
console.log(path.join(__dirname, '../web/http-helpers.js'))

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function() {
  //access the sites.txt file
  // fs.readFile(exports.paths.list, 'utf-8', function(err, data) {
  // })
  //create an array
  //store all values in array 
  //return array
};

exports.isUrlInList = function(url, callback, res) {
  //call this SOMEWHERE please1
  fs.readFile(exports.paths.list, 'utf-8', function(err, data) {
    var dataArr = data.trim().split('\n');
    for (var i = 0; i < dataArr.length; i++) {
      if (dataArr[i] === url) {
        callback(true);
        return;
      }
    }
    callback(false);
    return;
  });
};

exports.addUrlToList = function(data, callback, res) {
  callback(data, function(doesExist) { 
    if (!doesExist) {
      fs.appendFile(exports.paths.list, data, 'utf-8', function(err) {
        if (err) {
          throw err;
        } else {
          httpHelpers.sendResponse(res, data, 302);
        }
      });
    } else {
      console.log('does exist'); 
    }
  });
  // fs.appendFile(exports.paths.list, data, 'utf-8', function(err) {
  //   if (err) {
  //     throw err;
  //   }
  // });

};

exports.isUrlArchived = function(url, callback) {

  fs.readdir(exports.paths.archivedSites, function(err, files) {
    if (err) {
      throw err;
    }
    for (var i = 0; i < files.length; i++) {
      if (('/' + files[i]) === url) {
        callback(true);
        return;
      } 
    }
    callback(false); 
  });
};

exports.downloadUrls = function() {
};
