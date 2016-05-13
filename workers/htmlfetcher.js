// var path = require('path');
var archive = require('../helpers/archive-helpers.js');
var httpHelpers = require('../web/http-helpers.js');
var fs = require('fs');
var $ = require('jquery');
var http = require('http');
// var archive = require('/Users/student/Desktop/2016-04-web-historian/helpers/archive-helpers.js');
// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

exports.getList = function (callback) {
  
  archive.readListOfUrls(function(dataArr) {
    callback(dataArr);
  });

};


exports.getPage = function (url) {
  console.log("IM IN htmlfetch", JSON.stringify(url));
  // var arr = exports.getList();
  // archive.downloadUrls(arr, function(url) {
  //   $.get(url, function(data) {
  //     console.log(data);
    // });
  return http.get({
    host: url,
  }, function(response) {
    var body = '';
    response.on('data', function(d) {
      body += d;
    });
    response.on('end', function() {
      fs.writeFile(archive.paths.archivedSites + '/' + url, body, function(err) {
        if (err) {
          console.log(err);
        }
      });
    });
  });
};

