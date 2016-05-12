var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var publicF;

  if (req.method === 'GET') {
    if (req.url === '/') {
      publicF = __dirname + '/public/index.html';
      httpHelpers.serveAssets(res, publicF, fs.readFile);
    } else {
      var archiveUrl = archive.paths.archivedSites + req.url;
      archive.isUrlArchived(req.url, function(doesExist) {
        if (doesExist) {
          httpHelpers.sendResponse(res, archiveUrl, 200);
        } else {
          httpHelpers.sendResponse(res, null, 404);
        }
      });
   
    }
  } else if (req.method === 'POST') {
    httpHelpers.collectData(req, archive.addUrlToList, res);
    // httpHelpers.collectData(req);
    // console.log(data, '-----------DATA')
    // archive.isUrlInList(data, function(doesExist) {
    //   if (!doesExist) {
    //     archive.addUrlToList(data);
    //     httpHelpers.sendResponse(res, null, 302);
    //   } 
    // });
    // httpHelpers.sendResponse(res, null, 302);


  } else {
    httpHelpers.sendResponse(res, null, 404);
  } 

  
  // res.end(archive.paths.list);
};
